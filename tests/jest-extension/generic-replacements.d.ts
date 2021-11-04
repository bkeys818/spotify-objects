import {
    getUserTopItems as _getUserTopItems,
    searchForItem as _searchForItem,
} from '../../src/responses'

type getUserTopItems= _getUserTopItems<'tracks'>
type searchForItem = _searchForItem<['tracks', 'albums']>