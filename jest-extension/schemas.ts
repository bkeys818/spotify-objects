import * as tsj from 'ts-json-schema-generator'
import Ajv from 'ajv'

const tsjConfig: tsj.Config = {
    path: `types/responses.d.ts`,
    tsconfig: 'tsconfig.json',
    type: '*',
    expose: 'all',
    jsDoc: 'none',
    schemaId: `http://example.com/schemas/responses.json`,
}

function createSchema() {
    try {
        return tsj.createGenerator(tsjConfig).createSchema(tsjConfig.type)
    } catch (err) {
        let msg = 'Failed to create schemas for types'
        if (err instanceof Error) msg += `\n  Internal error: ${err.message}`
        throw Error(msg)
    }
}

export const ajv = new Ajv({ schemas: [createSchema()] })
export const idFor = (name: string) =>
    tsjConfig.schemaId + '#/definitions/' + name
