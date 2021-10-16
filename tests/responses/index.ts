import { Responses, dataPath } from './fetch-data'
import { readFileSync } from 'fs'

export default JSON.parse(readFileSync(dataPath, 'utf-8')) as {
    [key in keyof Responses]: Exclude<Responses[key], undefined>
}
