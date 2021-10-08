import {} from 'fs'
import { Responses, dataPath } from './fetch-data'
import { readFileSync } from 'fs'

export const responses = () =>
    JSON.parse(readFileSync(dataPath, 'utf-8')) as {
        [key in keyof Responses]: Exclude<Responses[key], undefined>
    }
