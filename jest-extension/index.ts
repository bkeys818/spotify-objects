import type { ValidateFunction } from 'ajv'
import { prettyPrint } from '@base2/pretty-print-object'

const prettyPrintConfig: Parameters<typeof prettyPrint>[1] = {
    indent: '  ',
    inlineCharacterLimit: 64,
    singleQuotes: true,
}

function toPass<T>(
    this: jest.MatcherContext,
    received: T,
    validation: ValidateFunction<T>
): ReturnType<jest.CustomMatcher> {
    const pass = validation(received)
    let msg = this.utils.matcherHint(toPass.name, undefined, 'validation', {
        isNot: this.isNot,
        promise: this.promise,
    })
    msg += '\n\n'
    if (validation.errors) {
        const errors = validation.errors.map(error => {
            const newError: typeof error & { instance?: any } = error
            try {
                const instance = getInstance(received, error.instancePath)
                newError.instance = foldObject(instance)
            } catch {}
            return newError
        })
        msg += 'Errors: ' + format(prettyPrint(errors, prettyPrintConfig))
    } else msg += 'Object passed validation.'
    return {
        pass: pass,
        message: () => msg,
    }
}

function getInstance(_obj: any, path: string) {
    if (!path) return _obj
    let obj = JSON.parse(JSON.stringify(_obj))
    if (path.startsWith('/')) path = path.slice(1)
    const steps = path.split('/')
    for (const step of steps) {
        if (step in obj) obj = obj[step]
        else throw new Error(`Couldn't get instance`)
    }
    return obj
}

function foldObject(value: any) {
    if (value && typeof value == 'object')
        for (const key in value) {
            if (Array.isArray(value[key])) value[key] = '___arr___'
            else if (value[key] && typeof value[key] == 'object')
                value[key] = '___obj___'
        }
    return value
}

function format(value: string) {
    return value
        .replace(/'___arr___'/g, '[ ... ]')
        .replace(/'___obj___'/g, '{ ... }')
}

expect.extend({ toPass })
declare global {
    namespace jest {
        interface Matchers<R> {
            toPass<E = any>(validation: ValidateFunction<E>): R
        }
    }
}
