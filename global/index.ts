import type * as requests from './requests'

export { requests }
export type RequestName = keyof typeof requests
export type ResponseName = Exclude<RequestName, VoidRequests>
export type ResponseFor<N extends ResponseName> = Unwrap<ReturnType<typeof requests[N]>>
// prettier-ignore
type VoidRequests = 'followPlaylist' | 'unfollowPlaylist' | 'followArtistsOrUsers' | 'unfollowArtistsOrUsers' | 'saveAlbumsForCurrentUser' | 'removeAlbumsForCurrentUser' | 'saveTracksForCurrentUser' | 'removeTracksForCurrentUser' | 'saveEpisodesForCurrentUser' | 'removeEpisodesForCurrentUser' | 'saveShowsForCurrentUser' | 'removeShowsForCurrentUser' | 'transferUserPlayback' | 'startOrResumeUserPlayback' | 'pauseUserPlayback' | 'skipUserPlaybackToNextTrack' | 'skipUserPlaybackToPreviousTrack' | 'seekToPositionInCurrentlyPlayingTrack' | 'setRepeatModeOnUserPlayback' | 'setVolumeForUserPlayback' | 'toggleShuffleForUserPlayback' | 'addItemToQueue' | 'changePlaylistDetails' | 'uploadCustomPlaylistCoverImage'

type Unwrap<P> = P extends Promise<infer T> ? T : never
