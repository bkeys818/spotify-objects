import fetch, { RequestInit } from 'node-fetch'

export const albumIds = ['7v9X4S8SFPAgbhCQOM6RuR', '4JAvwK4APPArjIsOdGoJXX']
export const artistIds = ['3Gm5F95VdRxW3mqCn8RPBJ', '6l3HvQ5sa6mXTsMTB19rO5']
export const categoryIds = ['party']
export const episodeIds = ['7o2lbVN3G3CL4bM23yDVWy', '5gLDGNLZoWHPiopDoWSAEI']
export const playlistIds = ['37i9dQZF1DZ06evO28Vxx6', '37i9dQZF1DXcGnc6d1f20P']
export const showIds = ['41zWZdWCpVQrKj7ykQnXRc', '7gozmLqbcbr6PScMjc0Zl4']
export const trackIds = ['5hTpBe8h35rJ67eAWHQsJx', '62vpWI1CHwFy7tMIcSStl8']
export const userIds = ['exampleuser', 'spotify']
export const genres = ['hip-hop']

export const market = 'US'

type UrlDict = { [key: string]: string | number | boolean | readonly string[] }
export async function sendRequest(props: {
    endpoint: string
    method?: 'GET' | 'POST' | 'PUT' | 'DELETE'
    query?: UrlDict
    body?: UrlDict
    application_json?: true
}) {
    const url = new URL('https://api.spotify.com/v1/' + props.endpoint)
    for (const key in props.query) {
        const value = props.query[key]
        const strValue =
            typeof value == 'object' ? value.join() : toString(value)

        url.searchParams.set(key, strValue)
    }

    const init: RequestInit = {
        method: props.method ?? 'GET',
        headers: { Authorization: 'Bearer ' + process.env.ACCESS_TOKEN },
    }

    if (props.application_json)
        init.headers = {
            ...init.headers,
            'Content-Type': 'application/json',
        }
    if (props.body) {
        const params = new URLSearchParams()
        for (const key in props.body) {
            params.set(key, toString(props.body[key]))
        }
        init.body = params.toString()
    }

    const res = await fetch(url.href, init)
    if (res.ok) {
        try {
            return await res.json()
        } catch {
            return null
        }
    } else {
        let msg: string
        try {
            const json = await res.json()
            if ('error' in json) msg = json.error.message
            else throw ''
        } catch {
            try {
                msg = await res.text()
            } catch {
                msg = `Unknown`
            }
        }
        throw new Error(msg)
    }

    function toString(value: UrlDict[string]) {
        return typeof value == 'object' ? value.join() : value.toString()
    }
}