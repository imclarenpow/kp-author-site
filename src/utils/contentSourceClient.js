function buildSanityQueryEndpoint({ projectId, dataset, apiVersion, query }) {
    const encodedQuery = encodeURIComponent(query)
    return `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}?query=${encodedQuery}`
}

function isSourceConfigured(source) {
    if (!source || typeof source !== 'object') {
        return false
    }

    if (source.type === 'json') {
        return typeof source.endpoint === 'string' && source.endpoint.length > 0
    }

    if (source.type === 'sanity-query') {
        return (
            typeof source.projectId === 'string' &&
            source.projectId.length > 0 &&
            typeof source.dataset === 'string' &&
            source.dataset.length > 0 &&
            typeof source.query === 'string' &&
            source.query.length > 0
        )
    }

    return false
}

function getSourceKey(source) {
    if (!source || typeof source !== 'object') {
        return 'unknown-source'
    }

    if (source.type === 'json') {
        return `json:${source.endpoint || ''}`
    }

    if (source.type === 'sanity-query') {
        return `sanity-query:${source.projectId || ''}:${source.dataset || ''}:${source.apiVersion || ''}:${source.query || ''}`
    }

    return 'unknown-source'
}

async function fetchSourcePayload(source, signal) {
    if (source.type === 'json') {
        const response = await fetch(source.endpoint, { signal })

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }

        return response.json()
    }

    if (source.type === 'sanity-query') {
        const endpoint = buildSanityQueryEndpoint(source)
        const response = await fetch(endpoint, { signal })

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`)
        }

        return response.json()
    }

    throw new Error(`Unsupported source type: ${source?.type}`)
}

export { fetchSourcePayload, getSourceKey, isSourceConfigured }
