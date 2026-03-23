const DEFAULT_SANITY_API_VERSION = '2024-01-01'
const DEFAULT_BOOKS_QUERY =
    '*[_type=="book"]{_id,title,subtitle,series,year,blurb,"coverImageUrl":coverImage.asset->url,buttonLinks}'
const DEFAULT_NEWS_QUERY = '*[_type=="post"]{title,publishedAt,_id,body}'

function createSanityQuerySource({
    sanityProjectId = import.meta.env.VITE_SANITY_PROJECT_ID || '',
    sanityDataset = import.meta.env.VITE_SANITY_DATASET || '',
    sanityApiVersion = import.meta.env.VITE_SANITY_API_VERSION || DEFAULT_SANITY_API_VERSION,
    query = '',
} = {}) {
    return {
        type: 'sanity-query',
        projectId: sanityProjectId,
        dataset: sanityDataset,
        apiVersion: sanityApiVersion,
        query,
    }
}

function createBooksSource({
    sanityProjectId,
    sanityDataset,
    sanityApiVersion,
    booksQuery = DEFAULT_BOOKS_QUERY,
} = {}) {
    return createSanityQuerySource({
        sanityProjectId,
        sanityDataset,
        sanityApiVersion,
        query: booksQuery,
    })
}

function createNewsSource({
    sanityProjectId,
    sanityDataset,
    sanityApiVersion,
    newsQuery = DEFAULT_NEWS_QUERY,
} = {}) {
    return createSanityQuerySource({
        sanityProjectId,
        sanityDataset,
        sanityApiVersion,
        query: newsQuery,
    })
}

export {
    DEFAULT_BOOKS_QUERY,
    DEFAULT_NEWS_QUERY,
    DEFAULT_SANITY_API_VERSION,
    createSanityQuerySource,
    createBooksSource,
    createNewsSource,
}
