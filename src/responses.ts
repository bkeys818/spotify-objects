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
export type getSeveralAlbums = { albums: (Album | null)[] }
export type getAlbumTracks = Paging<SimplifiedTrack>
export type getSavedAlbums = Paging<SavedAlbum>
export type saveAlbums = void
export type removeAlbums = void
export type checkSavedAlbums = boolean[]
export type getNewReleases = { albums: Paging<SimplifiedAlbum> }
// #endregion

// #region Artists
export type getArtist = Artist
export type getSeveralArtists = { artists: (Artist | null)[] }
export type getArtistAlbums = Paging<SimplifiedAlbum>
export type getArtistTopTracks = { tracks: Track[] }
export type getArtistRelatedArtists = { artists: Artist[] }
// #endregion

// #region Shows
export type getShow = Show
export type getSeveralShows = { shows: SimplifiedShow[] }
export type getShowEpisodes = Paging<SimplifiedEpisode>
export type getSavedShows = Paging<SavedShow>
export type saveShows = void
export type removeShows = void
export type checkSavedShows = boolean[]
// #endregion

// #region Episodes
export type getEpisode = Episode
export type getSeveralEpisodes = { episodes: (Episode | null)[] }
export type getSavedEpisodes = Paging<SavedEpisode>
export type saveEpisodes = void
export type removeEpisodes = void
export type checkSavedEpisodes = boolean[]
// #endregion

// #region Tracks
export type getTrack = Track
export type getSeveralTracks = { tracks: (Track | null)[] }
export type getSavedTracks = Paging<SavedTrack>
export type saveTracks = void
export type removeTracks = void
export type checkSavedTracks = boolean[]
export type getTracksAudioFeatures = {
    audio_features: AudioFeatures[]
}
export type getTrackAudioFeatures = AudioFeatures
export type getTrackAudioAnalysis = AudioAnalysis
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
export type getUserTopItems<T extends 'artists' | 'tracks'> = Paging<
    T extends 'artists' ? Artist : Track
>
export type getUserProfile = PublicUser
export type followPlaylist = void
export type unfollowPlaylist = void
export type getFollowedArtists = { artists: CursorPaging<Artist> }
export type followArtistsOrUsers = void
export type unfollowArtistsOrUsers = void
export type checkIfUserFollowsArtistsOrUsers = boolean[]
export type checkIfUsersFollowPlaylist = boolean[]
// #endregion

// #region Playlists
export type getPlaylist = Playlist
export type changePlaylistDetails = void
export type getPlaylistItems = Paging<PlaylistTrack>
export type addItemsToPlaylist = { snapshot_id: string }
export type updatePlaylistItems = { snapshot_id: string }
export type removePlaylistItems = { snapshot_id: string }
export type getCurrentUserPlaylists = Paging<SimplifiedPlaylist>
export type getUserPlaylists = Paging<SimplifiedPlaylist>
export type createPlaylist = Playlist
export type getFeaturedPlaylists = {
    message: string
    playlists: Paging<SimplifiedPlaylist>
}
export type getCategoryPlaylists = { playlists: Paging<SimplifiedPlaylist> }
export type getPlaylistCoverImage = Image[]
export type addCustomPlaylistCoverImage = void
// #endregion

// #region Categories
export type getSeveralBrowseCategories = { categories: Paging<Category> }
export type getSingleBrowseCategory = Category
// #endregion

// #region Genres
export type getAvailableGenreSeeds = { genres: string[] }
// #endregion

// #region Player
export type getPlaybackState =
    CurrentlyPlayingContext | void
    
export type transferPlayback = void
export type getAvailableDevices = { devices: Device[] }
export type getCurrentlyPlayingTrack = CurrentlyPlayingContext | void
export type startOrResumePlayback = void
export type pausePlayback = void
export type skipToNextTrack = void
export type skipToPreviousTrack = void
export type seekToPosition = void
export type setRepeatMode = void
export type setPlaybackVolume = void
export type togglePlaybackShuffle = void
export type getRecentlyPlayedTracks = Omit<
    CursorPaging<PlayHistory>,
    'total'
>
export type addItemToPlaybackQueue = void
// #endregion


// #region Markets
export type getAvailableMarkets = { markets: string[] }
// #endregion


