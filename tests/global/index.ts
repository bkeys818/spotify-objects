import type * as requests from './requests'

export { requests }
export type RequestName = keyof typeof requests
export type ResponseName = Exclude<RequestName, VoidRequests>
export type ResponseFor<N extends ResponseName> = Unwrap<ReturnType<typeof requests[N]>>
// prettier-ignore
type VoidRequests = 'saveAlbums' | 'removeAlbums' | 'saveShows' | 'removeShows' | 'saveEpisodes' | 'removeEpisodes' | 'saveTracks' | 'removeTracks' | 'followPlaylist' | 'unfollowPlaylist' | 'followArtistsOrUsers' | 'unfollowArtistsOrUsers' | 'changePlaylistDetails' | 'addCustomPlaylistCoverImage' | 'transferPlayback' | 'startOrResumePlayback' | 'pausePlayback' | 'skipToNext' | 'skipToPrevious' | 'seekToPosition' | 'setRepeatMode' | 'setPlaybackVolume' | 'togglePlaybackShuffle' | 'getRecentlyPlayedTracks' | 'addItemToPlaybackQueue'

type Unwrap<P> = P extends Promise<infer T> ? T : never
