import type { Responses } from '../types'
// Albums
export function getMultipleAlbums(
    ...args: any[]
): Promise<Responses.getMultipleAlbums>
export function getAlbum(...args: any[]): Promise<Responses.getAlbum>
export function getAlbumTracks(
    ...args: any[]
): Promise<Responses.getAlbumTracks>
// Artists
export function getMultipleArtists(
    ...args: any[]
): Promise<Responses.getMultipleArtists>
export function getArtist(...args: any[]): Promise<Responses.getArtist>
export function getArtistTopTracks(
    ...args: any[]
): Promise<Responses.getArtistTopTracks>
export function getArtistRelatedArtists(
    ...args: any[]
): Promise<Responses.getArtistRelatedArtists>
export function getArtistAlbums(
    ...args: any[]
): Promise<Responses.getArtistAlbums>
// Browse
export function getAllNewReleases(
    ...args: any[]
): Promise<Responses.getAllNewReleases>
export function getAllFeaturedPlaylists(
    ...args: any[]
): Promise<Responses.getAllFeaturedPlaylists>
export function getAllCategories(
    ...args: any[]
): Promise<Responses.getAllCategories>
export function getCategory(...args: any[]): Promise<Responses.getCategory>
export function getCategoryPlaylists(
    ...args: any[]
): Promise<Responses.getCategoryPlaylists>
export function getRecommendations(
    ...args: any[]
): Promise<Responses.getRecommendations>
export function getRecommendationGenres(
    ...args: any[]
): Promise<Responses.getRecommendationGenres>
// Episodes
export function getMultipleEpisodes(
    ...args: any[]
): Promise<Responses.getMultipleEpisodes>
export function getEpisode(...args: any[]): Promise<Responses.getEpisode>
// Follow
export function followPlaylist(
    ...args: any[]
): Promise<Responses.followPlaylist>
export function unfollowPlaylist(
    ...args: any[]
): Promise<Responses.unfollowPlaylist>
export function checkIfUsersFollowPlaylist(
    ...args: any[]
): Promise<Responses.checkIfUsersFollowPlaylist>
export function getUserFollowedArtists(
    ...args: any[]
): Promise<Responses.getUserFollowedArtists>
export function followArtistsOrUsers(
    ...args: any[]
): Promise<Responses.followArtistsOrUsers>
export function unfollowArtistsOrUsers(
    ...args: any[]
): Promise<Responses.unfollowArtistsOrUsers>
export function getFollowingStateForArtistsOrUsers(
    ...args: any[]
): Promise<Responses.getFollowingStateForArtistsOrUsers>
// Library
export function getCurrentUserSavedAlbums(
    ...args: any[]
): Promise<Responses.getCurrentUserSavedAlbums>
export function saveAlbumsForCurrentUser(
    ...args: any[]
): Promise<Responses.saveAlbumsForCurrentUser>
export function removeAlbumsForCurrentUser(
    ...args: any[]
): Promise<Responses.removeAlbumsForCurrentUser>
export function checkCurrentUserSavedAlbums(
    ...args: any[]
): Promise<Responses.checkCurrentUserSavedAlbums>
export function getCurrentUserSavedTracks(
    ...args: any[]
): Promise<Responses.getCurrentUserSavedTracks>
export function saveTracksForCurrentUser(
    ...args: any[]
): Promise<Responses.saveTracksForCurrentUser>
export function removeTracksForCurrentUser(
    ...args: any[]
): Promise<Responses.removeTracksForCurrentUser>
export function checkCurrentUserSavedTracks(
    ...args: any[]
): Promise<Responses.checkCurrentUserSavedTracks>
export function getCurrentUserSavedEpisodes(
    ...args: any[]
): Promise<Responses.getCurrentUserSavedEpisodes>
export function saveEpisodesForCurrentUser(
    ...args: any[]
): Promise<Responses.saveEpisodesForCurrentUser>
export function removeEpisodesForCurrentUser(
    ...args: any[]
): Promise<Responses.removeEpisodesForCurrentUser>
export function checkCurrentUserSavedEpisodes(
    ...args: any[]
): Promise<Responses.checkCurrentUserSavedEpisodes>
export function getCurrentUserSavedShows(
    ...args: any[]
): Promise<Responses.getCurrentUserSavedShows>
export function saveShowsForCurrentUser(
    ...args: any[]
): Promise<Responses.saveShowsForCurrentUser>
export function removeShowsForCurrentUser(
    ...args: any[]
): Promise<Responses.removeShowsForCurrentUser>
export function checkCurrentUserSavedShows(
    ...args: any[]
): Promise<Responses.checkCurrentUserSavedShows>
// Markets
export function getAvailableMarkets(
    ...args: any[]
): Promise<Responses.getAvailableMarkets>
// Personalization
export function getUserTopArtistsAndTracks(
    ...args: any[]
): Promise<Responses.getUserTopArtistsAndTracks<'tracks'>>
// Player
export function getInformationAboutUserCurrentPlayback(
    ...args: any[]
): Promise<Responses.getInformationAboutUserCurrentPlayback>
export function transferUserPlayback(
    ...args: any[]
): Promise<Responses.transferUserPlayback>
export function getUserAvailableDevices(
    ...args: any[]
): Promise<Responses.getUserAvailableDevices>
export function getUserCurrentlyPlayingTrack(
    ...args: any[]
): Promise<Responses.getUserCurrentlyPlayingTrack>
export function startOrResumeUserPlayback(
    ...args: any[]
): Promise<Responses.startOrResumeUserPlayback>
export function pauseUserPlayback(
    ...args: any[]
): Promise<Responses.pauseUserPlayback>
export function skipUserPlaybackToNextTrack(
    ...args: any[]
): Promise<Responses.skipUserPlaybackToNextTrack>
export function skipUserPlaybackToPreviousTrack(
    ...args: any[]
): Promise<Responses.skipUserPlaybackToPreviousTrack>
export function seekToPositionInCurrentlyPlayingTrack(
    ...args: any[]
): Promise<Responses.seekToPositionInCurrentlyPlayingTrack>
export function setRepeatModeOnUserPlayback(
    ...args: any[]
): Promise<Responses.setRepeatModeOnUserPlayback>
export function setVolumeForUserPlayback(
    ...args: any[]
): Promise<Responses.setVolumeForUserPlayback>
export function toggleShuffleForUserPlayback(
    ...args: any[]
): Promise<Responses.toggleShuffleForUserPlayback>
export function getCurrentUserRecentlyPlayedTracks(
    ...args: any[]
): Promise<Responses.getCurrentUserRecentlyPlayedTracks>
export function addItemToQueue(
    ...args: any[]
): Promise<Responses.addItemToQueue>
// Playlists
export function getListOfCurrentUserPlaylists(
    ...args: any[]
): Promise<Responses.getListOfCurrentUserPlaylists>
export function getListOfUserPlaylists(
    ...args: any[]
): Promise<Responses.getListOfUserPlaylists>
export function createPlaylist(
    ...args: any[]
): Promise<Responses.createPlaylist>
export function getPlaylist(...args: any[]): Promise<Responses.getPlaylist>
export function changePlaylistDetails(
    ...args: any[]
): Promise<Responses.changePlaylistDetails>
export function getPlaylistItems(
    ...args: any[]
): Promise<Responses.getPlaylistItems>
export function addItemsToPlaylist(
    ...args: any[]
): Promise<Responses.addItemsToPlaylist>
export function reorderOrReplacePlaylistItems(
    ...args: any[]
): Promise<Responses.reorderOrReplacePlaylistItems>
export function removeItemsFromPlaylist(
    ...args: any[]
): Promise<Responses.removeItemsFromPlaylist>
export function getPlaylistCoverImage(
    ...args: any[]
): Promise<Responses.getPlaylistCoverImage>
export function uploadCustomPlaylistCoverImage(
    ...args: any[]
): Promise<Responses.uploadCustomPlaylistCoverImage>
// Search
export function searchForItem(
    ...args: any[]
): Promise<Responses.searchForItem<'tracks'>>
// Shows
export function getMultipleShows(
    ...args: any[]
): Promise<Responses.getMultipleShows>
export function getShow(...args: any[]): Promise<Responses.getShow>
export function getShowEpisodes(
    ...args: any[]
): Promise<Responses.getShowEpisodes>
// Tracks
export function getMultipleTracks(
    ...args: any[]
): Promise<Responses.getMultipleTracks>
export function getTrack(...args: any[]): Promise<Responses.getTrack>
export function getAudioFeaturesForSeveralTracks(
    ...args: any[]
): Promise<Responses.getAudioFeaturesForSeveralTracks>
export function getAudioFeaturesForTrack(
    ...args: any[]
): Promise<Responses.getAudioFeaturesForTrack>
export function getAudioAnalysisForTrack(
    ...args: any[]
): Promise<Responses.getAudioAnalysisForTrack>
// Profile
export function getCurrentUserProfile(
    ...args: any[]
): Promise<Responses.getCurrentUserProfile>
export function getUserProfile(
    ...args: any[]
): Promise<Responses.getUserProfile>
