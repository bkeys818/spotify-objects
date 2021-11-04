import type { Responses } from '../../src'

// Albums
export function getAlbum(...args: any[]): Promise<Responses.getAlbum>
export function getSeveralAlbums(...args: any[]): Promise<Responses.getSeveralAlbums>
export function getAlbumTracks(...args: any[]): Promise<Responses.getAlbumTracks>
export function getSavedAlbums(...args: any[]): Promise<Responses.getSavedAlbums>
export function saveAlbums(...args: any[]): Promise<Responses.saveAlbums>
export function removeAlbums(...args: any[]): Promise<Responses.removeAlbums>
export function checkSavedAlbums(...args: any[]): Promise<Responses.checkSavedAlbums>
export function getNewReleases(...args: any[]): Promise<Responses.getNewReleases>

// Artists
export function getArtist(...args: any[]): Promise<Responses.getArtist>
export function getSeveralArtists(...args: any[]): Promise<Responses.getSeveralArtists>
export function getArtistAlbums(...args: any[]): Promise<Responses.getArtistAlbums>
export function getArtistTopTracks(...args: any[]): Promise<Responses.getArtistTopTracks>
export function getArtistRelatedArtists(...args: any[]): Promise<Responses.getArtistRelatedArtists>

// Shows
export function getShow(...args: any[]): Promise<Responses.getShow>
export function getSeveralShows(...args: any[]): Promise<Responses.getSeveralShows>
export function getShowEpisodes(...args: any[]): Promise<Responses.getShowEpisodes>
export function getSavedShows(...args: any[]): Promise<Responses.getSavedShows>
export function saveShows(...args: any[]): Promise<Responses.saveShows>
export function removeShows(...args: any[]): Promise<Responses.removeShows>
export function checkSavedShows(...args: any[]): Promise<Responses.checkSavedShows>

// Episodes
export function getEpisode(...args: any[]): Promise<Responses.getEpisode>
export function getSeveralEpisodes(...args: any[]): Promise<Responses.getSeveralEpisodes>
export function getSavedEpisodes(...args: any[]): Promise<Responses.getSavedEpisodes>
export function saveEpisodes(...args: any[]): Promise<Responses.saveEpisodes>
export function removeEpisodes(...args: any[]): Promise<Responses.removeEpisodes>
export function checkSavedEpisodes(...args: any[]): Promise<Responses.checkSavedEpisodes>

// Tracks
export function getTrack(...args: any[]): Promise<Responses.getTrack>
export function getSeveralTracks(...args: any[]): Promise<Responses.getSeveralTracks>
export function getSavedTracks(...args: any[]): Promise<Responses.getSavedTracks>
export function saveTracks(...args: any[]): Promise<Responses.saveTracks>
export function removeTracks(...args: any[]): Promise<Responses.removeTracks>
export function checkSavedTracks(...args: any[]): Promise<Responses.checkSavedTracks>
export function getTracksAudioFeatures(...args: any[]): Promise<Responses.getTracksAudioFeatures>
export function getTrackAudioFeatures(...args: any[]): Promise<Responses.getTrackAudioFeatures>
export function getTrackAudioAnalysis(...args: any[]): Promise<Responses.getTrackAudioAnalysis>
export function getRecommendations(...args: any[]): Promise<Responses.getRecommendations>

// Search
export function searchForItem(...args: any[]): Promise<Responses.searchForItem<['tracks', 'albums']>>

// Users
export function getCurrentUserProfile(...args: any[]): Promise<Responses.getCurrentUserProfile>
export function getUserTopItems(...args: any[]): Promise<Responses.getUserTopItems<'tracks'>>
export function getUserProfile(...args: any[]): Promise<Responses.getUserProfile>
export function followPlaylist(...args: any[]): Promise<Responses.followPlaylist>
export function unfollowPlaylist(...args: any[]): Promise<Responses.unfollowPlaylist>
export function getFollowedArtists(...args: any[]): Promise<Responses.getFollowedArtists>
export function followArtistsOrUsers(...args: any[]): Promise<Responses.followArtistsOrUsers>
export function unfollowArtistsOrUsers(...args: any[]): Promise<Responses.unfollowArtistsOrUsers>
export function checkIfUserFollowsArtistsOrUsers(...args: any[]): Promise<Responses.checkIfUserFollowsArtistsOrUsers>
export function checkIfUsersFollowPlaylist(...args: any[]): Promise<Responses.checkIfUsersFollowPlaylist>

// Playlists
export function getPlaylist(...args: any[]): Promise<Responses.getPlaylist>
export function changePlaylistDetails(...args: any[]): Promise<Responses.changePlaylistDetails>
export function getPlaylistItems(...args: any[]): Promise<Responses.getPlaylistItems>
export function addItemsToPlaylist(...args: any[]): Promise<Responses.addItemsToPlaylist>
export function updatePlaylistItems(...args: any[]): Promise<Responses.updatePlaylistItems>
export function removePlaylistItems(...args: any[]): Promise<Responses.removePlaylistItems>
export function getCurrentUserPlaylists(...args: any[]): Promise<Responses.getCurrentUserPlaylists>
export function getUserPlaylists(...args: any[]): Promise<Responses.getUserPlaylists>
export function createPlaylist(...args: any[]): Promise<Responses.createPlaylist>
export function getFeaturedPlaylists(...args: any[]): Promise<Responses.getFeaturedPlaylists>
export function getCategoryPlaylists(...args: any[]): Promise<Responses.getCategoryPlaylists>
export function getPlaylistCoverImage(...args: any[]): Promise<Responses.getPlaylistCoverImage>
export function addCustomPlaylistCoverImage(...args: any[]): Promise<Responses.addCustomPlaylistCoverImage>

// Categories
export function getSeveralBrowseCategories(...args: any[]): Promise<Responses.getSeveralBrowseCategories>
export function getSingleBrowseCategory(...args: any[]): Promise<Responses.getSingleBrowseCategory>

// Genres
export function getAvailableGenreSeeds(...args: any[]): Promise<Responses.getAvailableGenreSeeds>

// Player
export function getPlaybackState(...args: any[]): Promise<Responses.getPlaybackState>
export function transferPlayback(...args: any[]): Promise<Responses.transferPlayback>
export function getAvailableDevices(...args: any[]): Promise<Responses.getAvailableDevices>
export function getCurrentlyPlayingTrack(...args: any[]): Promise<Responses.getCurrentlyPlayingTrack>
export function startOrResumePlayback(...args: any[]): Promise<Responses.startOrResumePlayback>
export function pausePlayback(...args: any[]): Promise<Responses.pausePlayback>
export function skipToNext(...args: any[]): Promise<Responses.skipToNextTrack>
export function skipToPrevious(...args: any[]): Promise<Responses.skipToPreviousTrack>
export function seekToPosition(...args: any[]): Promise<Responses.seekToPosition>
export function setRepeatMode(...args: any[]): Promise<Responses.setRepeatMode>
export function setPlaybackVolume(...args: any[]): Promise<Responses.setPlaybackVolume>
export function togglePlaybackShuffle(...args: any[]): Promise<Responses.togglePlaybackShuffle>
export function getRecentlyPlayedTracks(...args: any[]): Promise<Responses.getRecentlyPlayedTracks>
export function addItemToPlaybackQueue(...args: any[]): Promise<Responses.addItemToPlaybackQueue>


// Markets
export function getAvailableMarkets(...args: any[]): Promise<Responses.getAvailableMarkets>


