import { ajv, idFor } from './schemas'
import type { ResponseName } from '../global'
import type { ValidateFunction, ErrorObject } from 'ajv'

function toMatchSchemaForType<T>(
    this: jest.MatcherContext,
    received: T,
    name: ResponseName
) {
    const { utils } = this
    let pass: boolean = false
    let msg = utils.matcherHint(
        toMatchSchemaForType.name,
        undefined,
        'validation',
        { isNot: this.isNot, promise: this.promise }
    )
    msg += '\n\n'

    const id = idFor(name)
    const validate = ajv.getSchema<T>(id)

    if (validate) {
        pass = validate(received) as boolean
        let errMsgs: string[]
        if (validate.errors) {
            const errorMsg = getErrorHandler(validate, received)
            const errors = validate.errors
            if (errors[errors.length - 1].keyword == 'anyOf') {
                errMsgs = [errorMsg(errors.pop()!)]
                const tab = '  '
                errMsgs.push(
                    ...errors.map(
                        err =>
                            tab +
                            errorMsg(err)
                                .split('\n')
                                .join('\n' + tab)
                    )
                )
            } else {
                errMsgs = validate.errors.map(errorMsg)
            }

            msg += errMsgs.join('\n\n')
        } else {
            msg += 'Error: Value matched schema.'
        }
    } else {
        msg += 'Error: No schema found for type.' + `\n  id: ${id}`
    }

    return {
        pass: pass,
        message: () => msg,
    }
}

function getErrorHandler(validate: ValidateFunction, received: any) {
    return function (error: ErrorObject) {
        let errMsg = `Error: ${error.message ?? 'unknown'}`
        if (error.keyword == 'anyOf') return errMsg
        for (const key in error.params) {
            errMsg += `\n  ${key}: ${error.params[key]}`
        }

        const schema = error.schemaPath.startsWith('#/definitions/')
            ? validate.schemaEnv.root.schema
            : error.schema ?? validate.schema
        let schemaErr
        if (error.keyword == 'anyOf') {
            schemaErr = followPath(schema, error.schemaPath)
        } else {
            schemaErr = followPath(schema, error.schemaPath, true)
        }
        errMsg +=
            `\nSchema: ` + (schemaErr ? printObj(schemaErr, 2) : 'unknown')

        const instance = followPath(received, error.instancePath)
        errMsg += `\nInstance: ` + (instance ? printObj(instance) : 'unknown')

        return errMsg
    }
}

function followPath(_value: any, path: string, skipLast = false) {
    let value = JSON.parse(JSON.stringify(_value))
    if (!path) return value
    if (path[0] == '#') path = path.slice(2)
    else if (path[0] == '/') path = path.slice(1)

    const steps = path.split('/')
    if (skipLast) steps.pop()

    for (const step of steps) {
        if (step in value) value = value[step]
        else return
    }

    return value
}

function printObj(obj: any, foldAtLevel = 1): string {
    foldObject(obj, 1)

    const msg = JSON.stringify(obj, null, 2)
    return msg
        .replace(/"___arr___"/g, '[ ... ]')
        .replace(/"___obj___"/g, '{ ... }')
        .replace(/"___...___"/g, '...')

    function foldObject(obj: any, level: number) {
        for (const key in obj) {
            const value = obj[key]
            if (Array.isArray(value)) {
                if (level < foldAtLevel) {
                    if (value.length > 8) {
                        obj[key] = [value[0], value[1], value[2]]
                        obj[key].map(foldObject)
                        obj[key].push('___...___')
                    } else foldObject(obj[key], level + 1)
                } else obj[key] = '___arr___'
            } else if (typeof value == 'object') {
                if (level < foldAtLevel) foldObject(obj[key], level + 1)
                else obj[key] = '___obj___'
            }
        }
    }
}

expect.extend({ toMatchSchemaForType })
declare global {
    namespace jest {
        interface Matchers<R> {
            toMatchSchemaForType(name: ResponseName): R
        }
    }
}
