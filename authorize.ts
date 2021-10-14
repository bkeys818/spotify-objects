import * as dotenv from 'dotenv'
import { createServer, RequestListener } from 'http'
import fetch from 'node-fetch'
import open from 'open'
import { readFileSync, writeFileSync } from 'fs'
import type { Token, RefreshToken } from './types'

const envPath = './.env'
const env = dotenv.parse(readFileSync(envPath))
const { CLIENT_ID, CLIENT_SECRET, REFRESH_TOKEN, EXPIRES_AT } = env
const scopes = [
    'ugc-image-upload',
    'user-read-recently-played',
    'user-top-read',
    'user-read-playback-position',
    'user-read-playback-state',
    'user-modify-playback-state',
    'user-read-currently-playing',
    'app-remote-control',
    'streaming',
    'playlist-modify-public',
    'playlist-modify-private',
    'playlist-read-private',
    'playlist-read-collaborative',
    'user-follow-modify',
    'user-follow-read',
    'user-library-modify',
    'user-library-read',
    'user-read-email',
    'user-read-private',
]

export default async function authorize() {
    // make sure client_id and client_state are defined
    if (!CLIENT_ID) {
        throw new Error(
            'Authentication Error! The .env file is missing a CLIENT_ID'
        )
    } else if (!CLIENT_SECRET) {
        throw new Error(
            'Authentication Error! The .env file is missing a CLIENT_SECRET'
        )
    }

    // 1. client_id and client_secret only
    if (!REFRESH_TOKEN) {
        const refreshToken = await getRefreshToken()
        saveToEnv(refreshToken)
    }

    // 2. has refresh_token but token is expired
    else if (!EXPIRES_AT || parseInt(EXPIRES_AT) < new Date().valueOf()) {
        const token = await getNewToken()
        saveToEnv(token)
    }

    // 3. token is valid
    dotenv.config()
}

function getRefreshToken() {
    const host = 'localhost'
    const port = 8080
    const redirectUri = `http://${host}:${port}/callback`

    return new Promise((resolve: (value: RefreshToken) => void) => {
        const requestListener: RequestListener = function (req, res) {
            const [path, query] = (req.url ?? '').split('?')

            // callback page
            if (path == '/callback') {
                if (query && query == '') {
                    console.error(
                        'Authorization Error! Redirected to "%s" without authoizing',
                        req.url
                    )
                    process.exit(1)
                }

                const queryObj = parseQuery(query)

                if ('error' in queryObj) {
                    console.error(`Authoization Error! ${queryObj.error}`)
                    process.exit(1)
                }

                if (!('code' in queryObj)) {
                    console.error(
                        "Authoization Error! Couldn't find code for authorization\nquery: O",
                        queryObj
                    )
                    process.exit(1)
                }

                postRequest({
                    grant_type: 'authorization_code',
                    code: queryObj.code,
                    redirect_uri: redirectUri,
                }).then((value) => resolve(value))

                res.writeHead(200).end('<script>window.close()</script>')
                server.close()
            }

            // main page
            else {
                const url = new URL('https://accounts.spotify.com/authorize')
                url.searchParams.set('client_id', CLIENT_ID!)
                url.searchParams.set('response_type', 'code')
                url.searchParams.set('redirect_uri', redirectUri)
                url.searchParams.set('scope', scopes.join())

                res.writeHead(302, { Location: url.href })
                res.end()
            }
        }

        const server = createServer(requestListener)

        server.listen(port, host, () => {
            console.log(`Server is running on http://${host}:${port}`)
        })

        open(`http://${host}:${port}`)
    })
}

function getNewToken() {
    return postRequest({
        grant_type: 'refresh_token',
        refresh_token: REFRESH_TOKEN!,
    })
}

async function postRequest<
    T extends 'refresh_token' | 'authorization_code'
>(body: {
    grant_type: T
    [key: string]: string
}): Promise<T extends 'refresh_token' ? Token : RefreshToken> {
    const auth =
        'Basic ' +
        Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')
    const response = await fetch('https://accounts.spotify.com/api/token', {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
            Authorization: auth,
        },
        method: 'POST',
        body: Object.entries(body)
            .map(([key, value]) => `${key}=${value}`)
            .join('&'),
    })
    if (response.ok) {
        return await response.json()
    } else {
        let msg
        try {
            msg = (await response.json()).error
        } catch {
            msg = 'Unable to send POST request.'
        }
        console.error(`Authorization error! ${msg}`)
        process.exit(1)
    }
}

function saveToEnv(value: Token | RefreshToken) {
    delete value.scope
    const expiresAt = new Date().valueOf() + value.expires_in * 1000
    // @ts-ignore
    delete value.expires_in

    try {
        const obj = dotenv.parse(readFileSync(envPath))
        delete obj.ACCESS_TOKEN
        delete obj.TOKEN_TYPE
        delete obj.EXPIRES_AT
        const updatedData = Object.entries({
            ...obj,
            ...value,
            expires_at: expiresAt.valueOf(),
        })
            .map(([key, value]) => `${key.toUpperCase()}=${value}`)
            .join('\n')

        writeFileSync(envPath, updatedData)
    } catch (error) {
        console.error(`Authorization Error! ${error}`)
        process.exit(1)
    }
}

function parseQuery(query: string) {
    const queryObj: { [key: string]: string } = {}
    for (const param of query.split('&')) {
        const [key, value] = param.split('=')
        queryObj[key] = value
    }
    return queryObj
}
