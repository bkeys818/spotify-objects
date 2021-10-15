import type { ResponseFor } from '../../../global'
import * as _basicReq from './basic'
export { complexRes } from './complex'

export const basicReq: {
    [key in keyof typeof _basicReq]: () => Promise<ResponseFor<key>>
} = _basicReq
