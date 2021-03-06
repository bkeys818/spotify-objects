import type { ResponseFor } from '../../../global'
import type { Responses, Objects } from '../../../../src'
import { sendRequest, trackIds } from './global'
import { runSafely, dataContains } from '..'
import { basicReq } from '.'

const complexRequest = {
    getPlaybackState: (): Promise<Responses.getPlaybackState> =>
        sendRequest({ endpoint: `me/player` }),
    getCurrentlyPlayingTrack: (): Promise<Responses.getCurrentlyPlayingTrack> =>
        sendRequest({ endpoint: `me/player` }),
    createPlaylist: (
        userId: string,
        name: string
    ): Promise<Responses.createPlaylist> =>
        sendRequest({
            endpoint: `users/${userId}/playlists`,
            method: 'POST',
            body: { name: name },
        }),
    addItemsToPlaylist: (
        playlistId: string,
        uris: `spotify:${'track' | 'episode'}:${string}`[]
    ): Promise<Responses.addItemsToPlaylist> =>
        sendRequest({
            endpoint: `playlists/${playlistId}/tracks`,
            method: 'POST',
            query: { uris: uris.join() },
            application_json: true,
        }),
    updatePlaylistItems: (
        playlistId: string,
        snapshotId?: string,
        rangeStart?: number,
        insertBefore?: number
    ): Promise<Responses.updatePlaylistItems> =>
        sendRequest({
            endpoint: `playlists/${playlistId}/tracks`,
            method: 'PUT',
            body: {
                range_start: rangeStart,
                insert_before: insertBefore,
                snapshot_id: snapshotId,
            },
        }),
    removePlaylistItems: (
        playlistId: string,
        trackUris: `spotify:${'track' | 'episode'}:${string}`[],
        snapshotId?: string
    ): Promise<Responses.removePlaylistItems> =>
        sendRequest({
            endpoint: `playlists/${playlistId}/tracks`,
            method: 'DELETE',
            body: {
                tracks: trackUris.map(uri => ({ uri: uri })),
                snapshot_id: snapshotId,
            },
        }),
} as const

export async function complexRes(): Promise<ComplexResponses> {
    let user: Objects.PrivateUser
    try {
        user = await basicReq.getCurrentUserProfile()
    } catch {
        return errorFrom(basicReq.getCurrentUserProfile, {})
    }

    return {
        ...(await playlistResponses(user.id)),
        ...(await playerResponses(user.product == 'premium')),
    }
}

async function playlistResponses(userId: string) {
    type ComplexPlaylistResponses = Omit<
        ComplexResponses,
        'getPlaybackState' | 'getCurrentlyPlayingTrack'
    >
    const responses: ComplexPlaylistResponses = {
        createPlaylist: undefined,
        addItemsToPlaylist: undefined,
        updatePlaylistItems: undefined,
        removePlaylistItems: undefined,
    }

    responses.createPlaylist = await runSafely(
        complexRequest.createPlaylist,
        userId,
        'Test Playlist'
    )
    if (typeof responses.createPlaylist != 'object') {
        return errorFrom(complexRequest.createPlaylist, responses)
    }

    const playlistId = responses.createPlaylist.id
    const trackUris = trackIds.map(id => `spotify:track:${id}` as const)

    responses.addItemsToPlaylist = await runSafely(
        complexRequest.addItemsToPlaylist,
        playlistId,
        trackUris
    )
    if (typeof responses.addItemsToPlaylist != 'object') {
        return errorFrom(complexRequest.addItemsToPlaylist, responses)
    }

    responses.updatePlaylistItems = await runSafely(
        complexRequest.updatePlaylistItems,
        playlistId,
        responses.addItemsToPlaylist.snapshot_id,
        1,
        2
    )
    if (typeof responses.updatePlaylistItems != 'object') {
        return errorFrom(complexRequest.updatePlaylistItems, responses)
    }

    responses.removePlaylistItems = await runSafely(
        complexRequest.removePlaylistItems,
        playlistId,
        trackUris,
        responses.updatePlaylistItems.snapshot_id
    )

    // delete playlist
    sendRequest({
        endpoint: `playlists/${playlistId}/followers`,
        method: 'DELETE',
    }).catch(reason => {
        if (reason instanceof Error) reason = reason.message
        console.warn(
            `Warning: Coundn't delete test playlist` +
                `  Internal Error: ${reason}`
        )
    })

    return responses
}

async function playerResponses(isPremium: boolean) {
    const currentPlayback = await complexRequest.getPlaybackState()

    if (!(currentPlayback && currentPlayback.is_playing)) {
        if (isPremium)
            // startOrResumeUserPlayback
            await sendRequest({
                endpoint: `me/player/play`,
                method: 'PUT',
                body: { uris: trackIds },
            })
        else
            console.warn(
                `Warning: Can't remotely play track with a free account. ` +
                    `To get complex player data, play a track manually at ` +
                    `https://open.spotify.com or through the app.`
            )
    }

    return {
        getPlaybackState: await runSafely(complexRequest.getPlaybackState),
        getCurrentlyPlayingTrack: await runSafely(
            complexRequest.getCurrentlyPlayingTrack
        ),
    }
}

/**
 * @param faildFunc The function that caused the error.
 * @param responses An object with all the responses retrieved so far.
 * @returns An object with all complex method keys.
 */
function errorFrom<T extends ComplexResponses>(
    faildFunc: Function,
    responses: Partial<T>
) {
    const msg =
        "Complex request(s) couldn't run because they rely on" + faildFunc.name

    const complexRequestNames = Object.keys(
        complexRequest
    ) as ComplexRequestNames[]
    const unrunNames: ComplexRequestNames[] = []
    if (responses) {
        let name: ComplexRequestNames
        for (name of complexRequestNames) {
            if (!(name in responses || dataContains(name))) {
                responses[name] = msg
                unrunNames.push(name)
            }
        }
    }

    console.warn(msg + ':\n\t' + unrunNames.join(', '))

    return responses as T
}

type ComplexRequestNames = keyof typeof complexRequest
type ComplexResponses = {
    [key in ComplexRequestNames]: ResponseFor<key> | string | undefined
}
