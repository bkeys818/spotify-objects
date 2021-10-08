import type * as Requests from './methods'
import * as _basicReq from './basic'

export const basicReq: {
    [key in keyof typeof _basicReq]: () => ReturnType<typeof Requests[key]>
} = _basicReq
