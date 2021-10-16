import authorize from '../../authorize'
import { writeFileSync, readFileSync } from 'fs'
import { ResponseName, ResponseFor } from '../../global'
import { basicReq, complexRes } from './requests'

export const dataPath = 'tests/responses/data.json'
if (module.id == '.') updateData()

export default async function updateData() {
    await authorize()
    let responses: Responses = {
        ...(await basicRes()),
        ...(await complexRes()),
    }
    let key: ResponseName
    for (key in responses) {
        const noTypeChange = sameType(responses[key], oldData()[key])
        if (responses[key] === undefined || noTypeChange) delete responses[key]
    }
    responses = { ...oldData(), ...responses }
    responses = sortObj(responses)
    const str = JSON.stringify(responses)
    writeFileSync(dataPath, str)
}

async function basicRes() {
    const keys = Object.keys(basicReq) as BasicReqName[]
    const responses = (
        await Promise.all(
            Object.values(basicReq).map(func =>
                runSafely<ResponseFor<BasicReqName>, []>(func)
            )
        )
    ).map((value, i) => [keys[i], value] as const)
    return Object.fromEntries(responses) as BasicResponses
    type BasicReqName = keyof typeof basicReq
    type BasicResponses = {
        [key in BasicReqName]: ResponseFor<key>
    }
}

export async function runSafely<T, P extends any[]>(
    method: (...args: P) => Promise<T>,
    ...params: P
): Promise<T | string | undefined> {
    try {
        return await method(...params)
    } catch (err) {
        let msg: string
        if (err instanceof Error) msg = err.message
        else if (typeof err == 'string') msg = err
        else throw err
        if (dataContains(method.name as ResponseName))
            console.warn(`Error at ${method.name}: ${msg}`)
        else return msg
    }
}

let _oldData: any
function oldData() {
    if (!_oldData) _oldData = JSON.parse(readFileSync(dataPath, 'utf-8'))
    return _oldData
}

export function dataContains(type: ResponseName): boolean {
    return type in oldData()
}

function sameType<T>(a: T, b: any): b is T {
    if (a == null || b == null) return true
    if (typeof a == typeof b) {
        if (typeof a == 'object' && typeof b == 'object') {
            if (Array.isArray(a) && Array.isArray(b)) {
                const [item1, ...items] = [...a, ...b]
                return items.every(item => sameType(item1, item))
            } else {
                if (sameObjKeys(a, b)) {
                    for (const key in a) {
                        if (!sameType(a[key], b[key])) return false
                    }
                    return true
                }
            }
            return false
        }
        return true
    }
    return false
    function sameObjKeys<K extends string | number | symbol>(
        a: { [key in K]: any },
        b: { [key: string | number | symbol]: any }
    ): b is { [key in K]: any } {
        const aKeys = Object.keys(a).sort()
        const bKeys = Object.keys(b).sort()
        if (aKeys.length !== bKeys.length) return false
        for (var i = aKeys.length; i--; ) {
            if (aKeys[i] !== bKeys[i]) return false
        }
        return true
    }
}

function sortObj(value: any) {
    const keys = Object.keys(value).sort()
    const response: any = {}
    for (const key of keys) {
        response[key] = value[key]
    }
    return response
}

export type Responses = {
    [key in ResponseName]: ResponseFor<key> | string | undefined
}
