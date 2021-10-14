import type { ValidateFunction, ErrorObject } from 'ajv'
import { prettyPrint } from '@base2/pretty-print-object'

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
    if (validation.errors)
        msg +=
            `Errors: ${prettyPrint(validation.errors, {
                indent: '  ',
                inlineCharacterLimit: 64,
                singleQuotes: true,
            })}`
    else msg += 'Object passed validation.'
    return {
        pass: pass,
        message: () => msg,
    }
}

expect.extend({ toPass })
declare global {
    namespace jest {
        interface Matchers<R> {
            toPass<E = any>(validation: ValidateFunction<E>): R
        }
    }
}
