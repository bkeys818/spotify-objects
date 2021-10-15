import authorize from '../../authorize'
import { writeFileSync, readFileSync } from 'fs'
import { ResponseName, ResponseFor } from '../../global'
import { basicReq, complexRes } from './requests'

export const dataPath = 'responses/data.json'
if (module.id == '.') updateData()

export default async function updateData() {
    await authorize()
    const responses: Responses = {
        ...(await basicRes()),
        ...(await complexRes()),
    }
    let key: ResponseName
    for (key in responses) {
        if (responses[key] === undefined) delete responses[key]
    }
    const str = JSON.stringify(responses)
    writeFileSync(dataPath, str)
}

async function basicRes() {
    const keys = Object.keys(basicReq) as BasicReqName[]
    const responses = (
        await Promise.all(
            Object.values(basicReq).map((func) =>
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

let oldData: any
export function dataContains(type: ResponseName): boolean {
    if (!oldData) oldData = JSON.parse(readFileSync(dataPath, 'utf-8'))
    return type in oldData
}

export type Responses = {
    [key in ResponseName]: ResponseFor<key> | string | undefined
}
