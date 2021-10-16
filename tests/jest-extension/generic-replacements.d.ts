import {
    getUserTopArtistsAndTracks as _getUserTopArtistsAndTracks,
    searchForItem as _searchForItem,
} from '../../src/responses'

type getUserTopArtistsAndTracks = _getUserTopArtistsAndTracks<'tracks'>
type searchForItem = _searchForItem<['tracks', 'albums']>