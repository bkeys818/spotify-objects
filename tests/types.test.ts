import responses from '../responses'
import { ajv, idFor } from '../jest-extension/schemas'

const responseNames = Object.keys(responses) as (keyof typeof responses)[]
test.concurrent.each(responseNames)('Schema for %s responses', responseName => {
    const response = responses[responseName]
    expect(response).toEqual(expect.any(Object))

    const id = idFor(responseName)
    const validate = ajv.getSchema<typeof response>(id)!
    expect(validate).toBeDefined()

    expect(response).toPass(validate)
})
