import {
    sendRequest,
    albumIds,
    artistIds,
    categoryIds,
    episodeIds,
    playlistIds,
    showIds,
    trackIds,
    userIds,
    market,
    genres,
} from './global'

// albums
export const getMultipleAlbums = () => sendRequest({
    endpoint: `albums`,
    query: { ids: albumIds },
})
export const getAlbum = () => sendRequest({ endpoint: `albums/${albumIds[0]}` })
export const getAlbumTracks = () => sendRequest({
    endpoint: `albums/${albumIds[0]}/tracks`,
})

// artists
export const getMultipleArtists = () => sendRequest({
    endpoint: `artists`,
    query: { ids: artistIds },
})
export const getArtist = () => sendRequest({ endpoint: `artists/${artistIds[0]}` })
export const getArtistTopTracks = () => sendRequest({
    endpoint: `artists/${artistIds[0]}/top-tracks`,
    query: { market: market },
})
export const getArtistRelatedArtists = () => sendRequest({
    endpoint: `artists/${artistIds[0]}/related-artists`,
})
export const getArtistAlbums = () => sendRequest({
    endpoint: `artists/${artistIds[0]}/albums`,
})

// browse
export const getAllNewReleases = () => sendRequest({
    endpoint: `browse/new-releases`,
})
export const getAllFeaturedPlaylists = () => sendRequest({
    endpoint: `browse/featured-playlists`,
})
export const getAllCategories = () => sendRequest({ endpoint: `browse/categories` })
export const getCategory = () => sendRequest({
    endpoint: `browse/categories/${categoryIds[0]}`,
})
export const getCategoryPlaylists = () => sendRequest({
    endpoint: `browse/categories/${categoryIds[0]}/playlists`,
})
export const getRecommendations = () => sendRequest({
    endpoint: `recommendations`,
    query: {
        seed_artists: [artistIds[0]],
        seed_genres: [genres[0]],
        seed_tracks: [trackIds[0]],
    },
})
export const getRecommendationGenres = () => sendRequest({
    endpoint: `recommendations/available-genre-seeds`,
})

// episodes
export const getMultipleEpisodes = () => sendRequest({
    endpoint: `episodes`,
    query: { ids: episodeIds },
})
export const getEpisode = () => sendRequest({ endpoint: `episodes/${episodeIds[0]}` })

// follow
export const checkIfUsersFollowPlaylist = () => sendRequest({
    endpoint: `playlists/${playlistIds[0]}/followers/contains`,
    query: { ids: userIds },
})
export const getUserFollowedArtists = () => sendRequest({
    endpoint: `me/following`,
    query: { type: 'artist' },
})
export const getFollowingStateForArtistsOrUsers = () => sendRequest({
    endpoint: `me/following/contains`,
    query: { type: 'user', ids: userIds },
})

// library
export const getCurrentUserSavedAlbums = () => sendRequest({ endpoint: `me/albums` })
export const checkCurrentUserSavedAlbums = () => sendRequest({
    endpoint: `me/albums/contains`,
    query: { ids: albumIds },
})
export const getCurrentUserSavedTracks = () => sendRequest({ endpoint: `me/tracks` })
export const checkCurrentUserSavedTracks = () => sendRequest({
    endpoint: `me/tracks/contains`,
    query: { ids: trackIds },
})
export const getCurrentUserSavedEpisodes = () => sendRequest({ endpoint: `me/episodes` })
export const checkCurrentUserSavedEpisodes = () => sendRequest({
    endpoint: `me/episodes/contains`,
    query: { ids: episodeIds },
})
export const getCurrentUserSavedShows = () => sendRequest({ endpoint: `me/shows` })
export const checkCurrentUserSavedShows = () => sendRequest({
    endpoint: `me/shows/contains`,
    query: { ids: showIds },
})

// market
export const getAvailableMarkets = () => sendRequest({ endpoint: `markets` })

// personalization
export const getUserTopArtistsAndTracks = () => sendRequest({
    endpoint: `me/top/artists`,
})

// player
export const getUserAvailableDevices = () => sendRequest({
    endpoint: `me/player/devices`,
})
export const getCurrentUserRecentlyPlayedTracks = () => sendRequest({
    endpoint: `me/player/recently-played`,
})

// playlists
export const getListOfCurrentUserPlaylists = () => sendRequest({
    endpoint: `me/playlists`,
})
export const getListOfUserPlaylists = () => sendRequest({
    endpoint: `users/${userIds[0]}/playlists`,
})
export const getPlaylist = () => sendRequest({
    endpoint: `playlists/${playlistIds[0]}`,
})
export const getPlaylistItems = () => sendRequest({
    endpoint: `playlists/${playlistIds[0]}/tracks`,
})
export const getPlaylistCoverImage = () => sendRequest({
    endpoint: `playlists/${playlistIds[0]}/images`,
})

// search
export const searchForItem = () => sendRequest({
    endpoint: `search`,
    query: {
        q: 'roadhouse blues',
        type: 'album,track',
    },
})

// shows
export const getMultipleShows = () => sendRequest({
    endpoint: `shows`,
    query: { ids: showIds },
})
export const getShow = () => sendRequest({ endpoint: `shows/${showIds[0]}` })
export const getShowEpisodes = () => sendRequest({
    endpoint: `shows/${showIds[0]}/episodes`,
})

// tracks
export const getMultipleTracks = () => sendRequest({
    endpoint: `tracks`,
    query: { ids: trackIds },
})
export const getTrack = () => sendRequest({ endpoint: `tracks/${trackIds[0]}` })
export const getAudioFeaturesForSeveralTracks = () => sendRequest({
    endpoint: `audio-features`,
    query: { ids: trackIds },
})
export const getAudioFeaturesForTrack = () => sendRequest({
    endpoint: `audio-features/${trackIds[0]}`,
})
export const getAudioAnalysisForTrack = () => sendRequest({
    endpoint: `audio-analysis/${trackIds[0]}`,
})

// users
export const getCurrentUserProfile = () => sendRequest({ endpoint: `me` })
export const getUserProfile = () => sendRequest({ endpoint: `users/${userIds[0]}` })
