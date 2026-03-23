import { DEFAULT_BOOKS_QUERY } from '../config/contentSources'
import { compareObjectsByTitle } from '../utils/sortUtils'
import useSanityCollection from './useSanityCollection'

const LOAD_ERROR_MESSAGE = 'Unable to load books right now.'
const MISSING_CONFIG_MESSAGE = 'Sanity books are not configured yet.'
const FALLBACK_COVER_FILENAME = 'temp.png'

function normalizeBooks(payload) {
    if (!Array.isArray(payload?.result)) {
        return []
    }

    const normalizedBooks = payload.result.map((book) => {
        const links = Array.isArray(book?.buttonLinks)
            ? book.buttonLinks.filter(
                (link) => typeof link?.label === 'string' && typeof link?.url === 'string',
            )
            : []

        const primaryLink = links[0]
        const secondaryLink = links[1]
        const rawBlurb = typeof book?.blurb === 'string' ? book.blurb : ''

        return {
            id: typeof book?._id === 'string' ? book._id : '',
            title: typeof book?.title === 'string' ? book.title : '',
            subtitle: typeof book?.subtitle === 'string' ? book.subtitle : '',
            series: typeof book?.series === 'string' ? book.series : '',
            year: typeof book?.year === 'string' ? book.year : '',
            blurb: rawBlurb.replace(/\r?\n/g, '<br>'),
            cover:
                typeof book?.coverImageUrl === 'string' && book.coverImageUrl.length > 0
                    ? book.coverImageUrl
                    : FALLBACK_COVER_FILENAME,
            link1: primaryLink?.url || '',
            link1name: primaryLink?.label || '',
            link2: secondaryLink?.url || '',
            link2name: secondaryLink?.label || '',
        }
    })

    normalizedBooks.sort((leftBook, rightBook) => {
        return compareObjectsByTitle(leftBook, rightBook, {
            sensitivity: 'base',
        })
    })

    return normalizedBooks
}

function useBooksData(options = {}) {
    const sanityProjectId = options.sanityProjectId
    const sanityDataset = options.sanityDataset
    const sanityApiVersion = options.sanityApiVersion
    const booksQuery = options.booksQuery || DEFAULT_BOOKS_QUERY
    const { items, errorMessage } = useSanityCollection({
        sanityProjectId,
        sanityDataset,
        sanityApiVersion,
        query: booksQuery,
        parsePayload: normalizeBooks,
        loadErrorMessage: LOAD_ERROR_MESSAGE,
        missingConfigMessage: MISSING_CONFIG_MESSAGE,
        errorLabel: 'books',
    })

    return {
        books: items,
        errorMessage,
    }
}

export default useBooksData
