import * as tsj from 'ts-json-schema-generator'
import Ajv from 'ajv'

const tsjConfig: tsj.Config = {
    tsconfig: 'tsconfig.json',
    type: '*',
    expose: 'all',
    jsDoc: 'none',
    schemaId: `http://example.com/schemas/responses.json`,
}

function createSchemasForTypes(file: string) {
    try {
        return tsj
            .createGenerator({ path: file, ...tsjConfig })
            .createSchema(tsjConfig.type)
    } catch (err) {
        let msg = 'Failed to create schemas for types'
        if (err instanceof Error) msg += `\n  Internal error: ${err.message}`
        throw Error(msg)
    }
}

function schemas() {
    const schemas = createSchemasForTypes('src/responses.ts')
    const otherSchemas = createSchemasForTypes(
        'tests/jest-extension/generic-replacements.d.ts'
    )
    schemas.definitions = {
        ...schemas.definitions,
        ...otherSchemas.definitions,
    }
    return schemas
}

export const ajv = new Ajv({ schemas: [schemas()] })
export const idFor = (name: string) =>
    tsjConfig.schemaId + '#/definitions/' + name
