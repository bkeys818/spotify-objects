import {
    Album,
    Artist,
    AudioAnalysis,
    AudioFeatures,
    Category,
    CurrentlyPlayingContext,
    CursorPaging,
    Device,
    Episode,
    Image,
    Paging,
    PlayHistory,
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

// #region Albums
export type getAlbum = Album
export type getMultipleAlbums = { albums: (Album | null)[] }
export type getAlbumTracks = Paging<SimplifiedTrack>
export type getCurrentUserSavedAlbums = Paging<SavedAlbum>
export type saveAlbumsForCurrentUser = void
export type removeAlbumsForCurrentUser = void
export type checkCurrentUserSavedAlbums = boolean[]
export type getAllNewReleases = { albums: Paging<SimplifiedAlbum> }
// #endregion

// #region Artists
export type getArtist = Artist
export type getMultipleArtists = { artists: (Artist | null)[] }
export type getArtistAlbums = Paging<SimplifiedAlbum>
export type getArtistTopTracks = { tracks: Track[] }
export type getArtistRelatedArtists = { artists: Artist[] }
// #endregion

// #region Shows
export type getShow = Show
export type getMultipleShows = { shows: SimplifiedShow[] }
export type getShowEpisodes = Paging<SimplifiedEpisode>
export type getCurrentUserSavedShows = Paging<SavedShow>
export type saveShowsForCurrentUser = void
export type removeShowsForCurrentUser = void
export type checkCurrentUserSavedShows = boolean[]
// #endregion

// #region Episodes
export type getMultipleEpisodes = { episodes: (Episode | null)[] }
export type getEpisode = Episode
export type getCurrentUserSavedEpisodes = Paging<SavedEpisode>
export type saveEpisodesForCurrentUser = void
export type removeEpisodesForCurrentUser = void
export type checkCurrentUserSavedEpisodes = boolean[]
// #endregion

// #region Tracks
export type getTrack = Track
export type getMultipleTracks = { tracks: (Track | null)[] }
export type getCurrentUserSavedTracks = Paging<SavedTrack>
export type saveTracksForCurrentUser = void
export type removeTracksForCurrentUser = void
export type checkCurrentUserSavedTracks = boolean[]
export type getAudioFeaturesForSeveralTracks = {
    audio_features: AudioFeatures[]
}
export type getAudioFeaturesForTrack = AudioFeatures
export type getAudioAnalysisForTrack = AudioAnalysis
export type getRecommendations = Recommendations
// #endregion

// #region Search
export type searchForItem<T extends SearchKeys | SearchKeys[]> =
    SearchResponse<T>
interface SearchResponseObject {
    albums: Paging<SimplifiedAlbum>
    artists: Paging<Artist>
    playlists: Paging<SimplifiedPlaylist>
    tracks: Paging<Track>
    shows: Paging<SimplifiedShow>
    episodes: Paging<SimplifiedEpisode>
}
type SearchKeys = keyof SearchResponseObject
type SearchResponse<T extends SearchKeys | SearchKeys[]> = T extends SearchKeys
    ? Pick<SearchResponseObject, T>
    : T extends SearchKeys[]
    ? Pick<SearchResponseObject, T[number]>
    : never
// #endregion

// #region Users
export type getCurrentUserProfile = PrivateUser
export type getUserTopArtistsAndTracks<T extends 'artists' | 'tracks'> = Paging<
    T extends 'artists' ? Artist : Track
>
export type getUserProfile = PublicUser
export type followPlaylist = void
export type unfollowPlaylist = void
export type getUserFollowedArtists = { artists: CursorPaging<Artist> }
export type followArtistsOrUsers = void
export type unfollowArtistsOrUsers = void
export type getFollowingStateForArtistsOrUsers = boolean[]
export type checkIfUsersFollowPlaylist = boolean[]
// #endregion

// #region Playlists
export type getPlaylist = Playlist
export type changePlaylistDetails = void
export type getPlaylistItems = Paging<PlaylistTrack>
export type addItemsToPlaylist = { snapshot_id: string }
export type reorderOrReplacePlaylistItems = { snapshot_id: string }
export type removeItemsFromPlaylist = { snapshot_id: string }
export type getListOfCurrentUserPlaylists = Paging<SimplifiedPlaylist>
export type getListOfUserPlaylists = Paging<SimplifiedPlaylist>
export type createPlaylist = Playlist
export type getAllFeaturedPlaylists = {
    message: string
    playlists: Paging<SimplifiedPlaylist>
}
export type getCategoryPlaylists = { playlists: Paging<SimplifiedPlaylist> }
export type getPlaylistCoverImage = Image[]
export type uploadCustomPlaylistCoverImage = void
// #endregion

// #region Categories
export type getAllCategories = { categories: Paging<Category> }
export type getCategory = Category
// #endregion

// #region Genres
export type getRecommendationGenres = { genres: string[] }
// #endregion

// #region Player
export type getInformationAboutUserCurrentPlayback =
    CurrentlyPlayingContext | void
    
export type transferUserPlayback = void
export type getUserAvailableDevices = { devices: Device[] }
export type getUserCurrentlyPlayingTrack = CurrentlyPlayingContext | void
export type startOrResumeUserPlayback = void
export type pauseUserPlayback = void
export type skipUserPlaybackToNextTrack = void
export type skipUserPlaybackToPreviousTrack = void
export type seekToPositionInCurrentlyPlayingTrack = void
export type setRepeatModeOnUserPlayback = void
export type setVolumeForUserPlayback = void
export type toggleShuffleForUserPlayback = void
export type getCurrentUserRecentlyPlayedTracks = Omit<
    CursorPaging<PlayHistory>,
    'total'
>
export type addItemToQueue = void
// #endregion


// #region Markets
export type getAvailableMarkets = { markets: string[] }
// #endregion


