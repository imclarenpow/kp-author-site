import { DEFAULT_NEWS_QUERY } from '../config/contentSources'
import useSanityCollection from './useSanityCollection'

const LOAD_ERROR_MESSAGE = 'Unable to load news posts right now.'
const MISSING_CONFIG_MESSAGE = 'Sanity news is not configured yet.'

function normalizePosts(payload) {
    if (!Array.isArray(payload?.result)) {
        return []
    }

    return payload.result.map((post, index) => {
        const id = typeof post?._id === 'string' ? post._id : ''
        const title = typeof post?.title === 'string' ? post.title : 'Untitled post'
        const publishedAt = typeof post?.publishedAt === 'string' ? post.publishedAt : ''
        const body = Array.isArray(post?.body) ? post.body : []

        return {
            key: id || `${title}-${publishedAt || index}`,
            id,
            title,
            publishedAt,
            body,
        }
    })
}

function useNewsPosts(options = {}) {
    const sanityProjectId = options.sanityProjectId
    const sanityDataset = options.sanityDataset
    const sanityApiVersion = options.sanityApiVersion
    const newsQuery = options.newsQuery || DEFAULT_NEWS_QUERY
    const { items, isLoading, errorMessage } = useSanityCollection({
        sanityProjectId,
        sanityDataset,
        sanityApiVersion,
        query: newsQuery,
        parsePayload: normalizePosts,
        loadErrorMessage: LOAD_ERROR_MESSAGE,
        missingConfigMessage: MISSING_CONFIG_MESSAGE,
        errorLabel: 'news posts',
    })

    return {
        posts: items,
        isLoading,
        errorMessage,
    }
}

export default useNewsPosts
