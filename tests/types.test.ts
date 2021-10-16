import responses from '../responses'

// const { getUserTopArtistsAndTracks, searchForItem, ...responses } = _responses

const responseNames = Object.keys(responses) as (keyof typeof responses)[]
test.concurrent.each(responseNames)('Schema for %s responses', responseName => {
    const response = responses[responseName]
    expect(response).toEqual(expect.any(Object))

    expect(response).toMatchSchemaForType(responseName)
})
