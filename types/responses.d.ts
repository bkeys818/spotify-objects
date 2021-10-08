import {
    Album,
    Artist,
    AudioAnalysis,
    AudioFeatures,
    Category,
    CurrentlyPlaying,
    CurrentlyPlayingContext,
    CursorPaging,
    Device,
    Episode,
    Image,
    Paging,
    Playlist,
    PlaylistTrack,
    PrivateUser,
    PublicUser,
    Recommendations,
    SavedAlbum,
    SavedEpisode,
    SavedShow,
    SavedTrack,
    Show,
    SimplifiedAlbum,
    SimplifiedEpisode,
    SimplifiedPlaylist,
    SimplifiedShow,
    SimplifiedTrack,
    Track,
} from './objects'
// Albums
export type getMultipleAlbums = { albums: (Album | null)[] }
export type getAlbum = Album
export type getAlbumTracks = Paging<Track>
// Artists
export type getMultipleArtists = { artists: (Artist | null)[] }
export type getArtist = Artist
export type getArtistTopTracks = { tracks: Track[] }
export type getArtistRelatedArtists = { artists: Artist[] }
export type getArtistAlbums = Paging<SimplifiedAlbum>
// Browse
export type getAllNewReleases = { albums: Paging<SimplifiedAlbum> }
export type getAllFeaturedPlaylists = {
    message: string
    playlists: Paging<SimplifiedPlaylist>
}
export type getAllCategories = { categories: Paging<Category> }
export type getCategory = Category
export type getCategoryPlaylists = { playlists: Paging<SimplifiedPlaylist> }
export type getRecommendations = Recommendations
export type getRecommendationGenres = { genres: string[] }
// Episodes
export type getMultipleEpisodes = { episodes: (Episode | null)[] }
export type getEpisode = Episode
// Follow
export type followPlaylist = void
export type unfollowPlaylist = void
export type checkIfUsersFollowPlaylist = boolean[]
export type getUserFollowedArtists = { artists: CursorPaging<Artist> }
export type followArtistsOrUsers = void
export type unfollowArtistsOrUsers = void
export type getFollowingStateForArtistsOrUsers = boolean[]
// Library
export type getCurrentUserSavedAlbums = Paging<SavedAlbum>
export type saveAlbumsForCurrentUser = void
export type removeAlbumsForCurrentUser = void
export type checkCurrentUserSavedAlbums = boolean[]
export type getCurrentUserSavedTracks = Paging<SavedTrack>
export type saveTracksForCurrentUser = void
export type removeTracksForCurrentUser = void
export type checkCurrentUserSavedTracks = boolean[]
export type getCurrentUserSavedEpisodes = Paging<SavedEpisode>
export type saveEpisodesForCurrentUser = void
export type removeEpisodesForCurrentUser = void
export type checkCurrentUserSavedEpisodes = boolean[]
export type getCurrentUserSavedShows = Paging<SavedShow>
export type saveShowsForCurrentUser = void
export type removeShowsForCurrentUser = void
export type checkCurrentUserSavedShows = boolean[]
// Markets
export type getAvailableMarkets = { markets: string[] }
// Personalization
export type getUserTopArtistsAndTracks<T extends 'artists' | 'tracks'> = Paging<
    T extends 'artists' ? Artist : Track
>
// Player
export type getInformationAboutUserCurrentPlayback = CurrentlyPlayingContext
export type transferUserPlayback = void
export type getUserAvailableDevices = { devices: Device[] }
export type getUserCurrentlyPlayingTrack = CurrentlyPlaying
export type startOrResumeUserPlayback = void
export type pauseUserPlayback = void
export type skipUserPlaybackToNextTrack = void
export type skipUserPlaybackToPreviousTrack = void
export type seekToPositionInCurrentlyPlayingTrack = void
export type setRepeatModeOnUserPlayback = void
export type setVolumeForUserPlayback = void
export type toggleShuffleForUserPlayback = void
export type getCurrentUserRecentlyPlayedTracks = CursorPaging<SimplifiedTrack>
export type addItemToQueue = void
// Playlists
export type getListOfCurrentUserPlaylists = Paging<SimplifiedPlaylist>
export type getListOfUserPlaylists = Paging<SimplifiedPlaylist>
export type createPlaylist = Playlist
export type getPlaylist = Playlist
export type changePlaylistDetails = void
export type getPlaylistItems = Paging<PlaylistTrack>
export type addItemsToPlaylist = { snapshot_id: string }
export type reorderOrReplacePlaylistItems = { snapshot_id: string }
export type removeItemsFromPlaylist = { snapshot_id: string }
export type getPlaylistCoverImage = Image[]
export type uploadCustomPlaylistCoverImage = void
// Search
export type searchForItem<T extends SearchKeys | SearchKeys[]> =
    SearchResponse<T>
interface ResponseObject {
    albums: Paging<SimplifiedAlbum>
    artists: Paging<Artist>
    playlists: Paging<SimplifiedPlaylist>
    tracks: Paging<Track>
    shows: Paging<SimplifiedShow>
    episodes: Paging<SimplifiedEpisode>
}
type SearchKeys = keyof ResponseObject
type SearchResponse<T extends SearchKeys | SearchKeys[]> = T extends SearchKeys
    ? Pick<ResponseObject, T>
    : T extends SearchKeys[]
    ? Pick<ResponseObject, T[number]>
    : never
// Shows
export type getMultipleShows = { shows: SimplifiedShow }
export type getShow = Show
export type getShowEpisodes = Paging<SimplifiedEpisode>
// Tracks
export type getMultipleTracks = { tracks: (Track | null)[] }
export type getTrack = Track
export type getAudioFeaturesForSeveralTracks = {
    audio_features: AudioFeatures[]
}
export type getAudioFeaturesForTrack = AudioFeatures
export type getAudioAnalysisForTrack = AudioAnalysis
// Profile
export type getCurrentUserProfile = PrivateUser
export type getUserProfile = PublicUser
