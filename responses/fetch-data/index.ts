import authorize from '../../authorize'
import { writeFileSync, readFileSync } from 'fs'
import * as Requests from './requests/methods'
import { basicReq } from './requests'

export const dataPath = 'responses/data.json'
if (module.id == '.') updateData()

export default async function updateData() {
    await authorize()
    const responses: Responses = {
        ...(await basicRes()),
    }
    const str = JSON.stringify(responses)
    writeFileSync(dataPath, str)
}

async function basicRes() {
    const keys = Object.keys(basicReq) as BasicReqName[]
    const responses = (
        await Promise.all(
            Object.values(basicReq).map((func) =>
                runSafely<BasicResponses>(func)
            )
        )
    ).map((value, i) => [keys[i], value] as const)
    return Object.fromEntries(responses) as {
        [key in BasicReqName]: Reponse<typeof basicReq[key]>
    }
    type BasicReqName = keyof typeof basicReq
    type BasicResponses = {
        [key in BasicReqName]: Reponse<typeof basicReq[key]>
    }[BasicReqName]
}

let oldData: any
export async function runSafely<T>(
    method: () => Promise<T>
): Promise<T | string | undefined> {
    try {
        return await method()
    } catch (err) {
        if (!oldData) oldData = JSON.parse(readFileSync(dataPath, 'utf-8'))
        let msg: string
        if (err instanceof Error) msg = err.message
        else if (typeof err == 'string') msg = err
        else throw err
        if (method.name in oldData)
            console.warn(`Error at ${method.name}: ${msg}`)
        else return msg
    }
}

// #region types
type RequestNames = Exclude<keyof typeof Requests, VoidRequests>
type Unwrap<P> = P extends Promise<infer T> ? T : never
type Reponse<F extends (...args: any[]) => any> = Unwrap<ReturnType<F>>
type Responses = {
    [key in RequestNames]: Reponse<typeof Requests[key]> | string | undefined
}
// prettier-ignore
type VoidRequests = 'followPlaylist' | 'unfollowPlaylist' | 'followArtistsOrUsers' | 'unfollowArtistsOrUsers' | 'saveAlbumsForCurrentUser' | 'removeAlbumsForCurrentUser' | 'saveTracksForCurrentUser' | 'removeTracksForCurrentUser' | 'saveEpisodesForCurrentUser' | 'removeEpisodesForCurrentUser' | 'saveShowsForCurrentUser' | 'removeShowsForCurrentUser' | 'transferUserPlayback' | 'startOrResumeUserPlayback' | 'pauseUserPlayback' | 'skipUserPlaybackToNextTrack' | 'skipUserPlaybackToPreviousTrack' | 'seekToPositionInCurrentlyPlayingTrack' | 'setRepeatModeOnUserPlayback' | 'setVolumeForUserPlayback' | 'toggleShuffleForUserPlayback' | 'addItemToQueue' | 'changePlaylistDetails' | 'uploadCustomPlaylistCoverImage'
// #endregion
