import type * as Requests from './methods'
import type * as Responses from '../../../types/responses'
import { sendRequest, trackIds } from './global'
import { runSafely, Response } from '..'
import { basicReq } from '.'

const trackUris = trackIds.map((id) => `spotify:track:${id}`)

export async function complexRes(): Promise<{
    [key in ComplexRequestNames]: Response<typeof Requests[key]>
}> {
    const user = await basicReq.getCurrentUserProfile()
    const userId = user.id

    const createPlaylist: Responses.createPlaylist = await sendRequest({
        endpoint: `users/${userId}/playlists`,
        method: 'POST',
        body: { name: 'Test Playlist' },
    })
    const playlistId = createPlaylist.id

    const addItemsToPlaylist: Responses.addItemsToPlaylist = await sendRequest({
        endpoint: `playlists/${playlistId}/tracks`,
        method: 'POST',
        query: { uris: trackUris },
        application_json: true,
    })

    const reorderOrReplacePlaylistItems: Responses.reorderOrReplacePlaylistItems =
        await sendRequest({
            endpoint: `playlists/${playlistId}/tracks`,
            method: 'PUT',
            body: {
                range_start: 1,
                insert_before: 0,
                snapshot_id: addItemsToPlaylist.snapshot_id,
            },
        })

    const removeItemsFromPlaylist = await sendRequest({
        endpoint: `playlists/${playlistId}/tracks`,
        method: 'DELETE',
        body: {
            tracks: trackUris.map((uri) => ({ uri: uri })),
            snapshot_id: reorderOrReplacePlaylistItems.snapshot_id,
        },
    })

    return {
        ...(await playerRequests(user.product == 'premium')),
        createPlaylist: createPlaylist,
        addItemsToPlaylist: addItemsToPlaylist,
        reorderOrReplacePlaylistItems: reorderOrReplacePlaylistItems,
        removeItemsFromPlaylist: removeItemsFromPlaylist,
    }
}

async function playerRequests(isPremium: boolean) {
    const getInfoAboutPlayback: typeof Requests['getInformationAboutUserCurrentPlayback'] =
        () =>
            sendRequest({
                endpoint: `me/player`,
            })

    const currentPlayback = await getInfoAboutPlayback()

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
    const getInformationAboutUserCurrentPlayback = await getInfoAboutPlayback()
    if (getInformationAboutUserCurrentPlayback === null)
        console.warn(`Warning: Spotify account has never been used to play media.`)
    const getUserCurrentlyPlayingTrack = await sendRequest({
        endpoint: `me/player`,
    })
    return {
        getInformationAboutUserCurrentPlayback:
            getInformationAboutUserCurrentPlayback,
        getUserCurrentlyPlayingTrack: getUserCurrentlyPlayingTrack,
    }
}

// prettier-ignore
type ComplexRequestNames = 'getInformationAboutUserCurrentPlayback' | 'getUserCurrentlyPlayingTrack' | 'createPlaylist' | 'addItemsToPlaylist' | 'reorderOrReplacePlaylistItems' | 'removeItemsFromPlaylist'
