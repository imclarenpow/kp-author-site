const DEFAULT_BOOKS_ENDPOINT = '/assets/docs/books.json'
const DEFAULT_SANITY_API_VERSION = '2024-01-01'
const DEFAULT_NEWS_QUERY = '*[_type=="post"]{title,publishedAt,_id,body}'

function createBooksSource(endpoint = DEFAULT_BOOKS_ENDPOINT) {
    return {
        type: 'json',
        endpoint,
    }
}

function createNewsSource({
    sanityProjectId = import.meta.env.VITE_SANITY_PROJECT_ID || '',
    sanityDataset = import.meta.env.VITE_SANITY_DATASET || '',
    sanityApiVersion = import.meta.env.VITE_SANITY_API_VERSION || DEFAULT_SANITY_API_VERSION,
    newsQuery = DEFAULT_NEWS_QUERY,
} = {}) {
    return {
        type: 'sanity-query',
        projectId: sanityProjectId,
        dataset: sanityDataset,
        apiVersion: sanityApiVersion,
        query: newsQuery,
    }
}

export {
    DEFAULT_BOOKS_ENDPOINT,
    DEFAULT_NEWS_QUERY,
    DEFAULT_SANITY_API_VERSION,
    createBooksSource,
    createNewsSource,
}
