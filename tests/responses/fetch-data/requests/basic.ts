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

// Albums
export const getAlbum = () => sendRequest({ endpoint: `albums/${albumIds[0]}` })
export const getSeveralAlbums = () =>
    sendRequest({
        endpoint: `albums`,
        query: { ids: albumIds },
    })
export const getAlbumTracks = () =>
    sendRequest({
        endpoint: `albums/${albumIds[0]}/tracks`,
    })
export const getSavedAlbums = () => sendRequest({ endpoint: `me/albums` })
export const checkSavedAlbums = () =>
    sendRequest({
        endpoint: `me/albums/contains`,
        query: { ids: albumIds },
    })
export const getNewReleases = () =>
    sendRequest({ endpoint: `browse/new-releases` })

// Artists
export const getArtist = () =>
    sendRequest({ endpoint: `artists/${artistIds[0]}` })
export const getSeveralArtists = () =>
    sendRequest({
        endpoint: `artists`,
        query: { ids: artistIds },
    })
export const getArtistAlbums = () =>
    sendRequest({
        endpoint: `artists/${artistIds[0]}/albums`,
    })
export const getArtistTopTracks = () =>
    sendRequest({
        endpoint: `artists/${artistIds[0]}/top-tracks`,
        query: { market: market },
    })
export const getArtistRelatedArtists = () =>
    sendRequest({
        endpoint: `artists/${artistIds[0]}/related-artists`,
    })

// Shows
export const getShow = () => sendRequest({ endpoint: `shows/${showIds[0]}` })
export const getSeveralShows = () =>
    sendRequest({
        endpoint: `shows`,
        query: { ids: showIds },
    })
export const getShowEpisodes = () =>
    sendRequest({
        endpoint: `shows/${showIds[0]}/episodes`,
    })
export const getSavedShows = () => sendRequest({ endpoint: `me/shows` })
export const checkSavedShows = () =>
    sendRequest({
        endpoint: `me/shows/contains`,
        query: { ids: showIds },
    })

// Episodes
export const getEpisode = () =>
    sendRequest({ endpoint: `episodes/${episodeIds[0]}` })
export const getSeveralEpisodes = () =>
    sendRequest({
        endpoint: `episodes`,
        query: { ids: episodeIds },
    })
export const getSavedEpisodes = () => sendRequest({ endpoint: `me/episodes` })
export const checkSavedEpisodes = () =>
    sendRequest({
        endpoint: `me/episodes/contains`,
        query: { ids: episodeIds },
    })

// Tracks
export const getTrack = () => sendRequest({ endpoint: `tracks/${trackIds[0]}` })
export const getSeveralTracks = () =>
    sendRequest({
        endpoint: `tracks`,
        query: { ids: trackIds },
    })
export const getSavedTracks = () => sendRequest({ endpoint: `me/tracks` })
export const checkSavedTracks = () =>
    sendRequest({
        endpoint: `me/tracks/contains`,
        query: { ids: trackIds },
    })
export const getTracksAudioFeatures = () =>
    sendRequest({
        endpoint: `audio-features`,
        query: { ids: trackIds },
    })
export const getTrackAudioFeatures = () =>
    sendRequest({
        endpoint: `audio-features/${trackIds[0]}`,
    })
export const getTrackAudioAnalysis = () =>
    sendRequest({
        endpoint: `audio-analysis/${trackIds[0]}`,
    })
export const getRecommendations = () =>
    sendRequest({
        endpoint: `recommendations`,
        query: {
            seed_artists: [artistIds[0]],
            seed_genres: [genres[0]],
            seed_tracks: [trackIds[0]],
        },
    })

// Search
export const searchForItem = () =>
    sendRequest({
        endpoint: `search`,
        query: {
            q: 'roadhouse blues',
            type: 'album,track',
        },
    })

// Users
export const getCurrentUserProfile = () => sendRequest({ endpoint: `me` })
export const getUserTopItems = () =>
    sendRequest({
        endpoint: `me/top/artists`,
    })
export const getUserProfile = () =>
    sendRequest({ endpoint: `users/${userIds[0]}` })
export const getFollowedArtists = () =>
    sendRequest({
        endpoint: `me/following`,
        query: { type: 'artist' },
    })
export const checkIfUserFollowsArtistsOrUsers = () =>
    sendRequest({
        endpoint: `me/following/contains`,
        query: { type: 'user', ids: userIds },
    })
export const checkIfUsersFollowPlaylist = () =>
    sendRequest({
        endpoint: `playlists/${playlistIds[0]}/followers/contains`,
        query: { ids: userIds },
    })

// Playlists
export const getPlaylist = () =>
    sendRequest({
        endpoint: `playlists/${playlistIds[0]}`,
    })
export const getPlaylistItems = () =>
    sendRequest({
        endpoint: `playlists/${playlistIds[0]}/tracks`,
    })
export const getCurrentUserPlaylists = () =>
    sendRequest({
        endpoint: `me/playlists`,
    })
export const getUserPlaylists = () =>
    sendRequest({
        endpoint: `users/${userIds[0]}/playlists`,
    })
export const getFeaturedPlaylists = () =>
    sendRequest({
        endpoint: `browse/featured-playlists`,
    })
export const getCategoryPlaylists = () =>
    sendRequest({
        endpoint: `browse/categories/${categoryIds[0]}/playlists`,
    })
export const getPlaylistCoverImage = () =>
    sendRequest({
        endpoint: `playlists/${playlistIds[0]}/images`,
    })

// Categories
export const getSeveralBrowseCategories = () =>
    sendRequest({ endpoint: `browse/categories` })
export const getSingleBrowseCategory = () =>
    sendRequest({
        endpoint: `browse/categories/${categoryIds[0]}`,
    })

// Genres
export const getAvailableGenreSeeds = () =>
    sendRequest({
        endpoint: `recommendations/available-genre-seeds`,
    })

// Player
export const getAvailableDevices = () =>
    sendRequest({ endpoint: `me/player/devices` })
export const getCurrentlyPlayingTrack = () =>
    sendRequest({ endpoint: `me/player/recently-played` })

// Markets
export const getAvailableMarkets = () => sendRequest({ endpoint: `markets` })
