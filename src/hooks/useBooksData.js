import { useMemo } from 'react'
import { DEFAULT_BOOKS_ENDPOINT, createBooksSource } from '../config/contentSources'
import { getSourceKey } from '../utils/contentSourceClient'
import useSourceCollection from './useSourceCollection'

const LOAD_ERROR_MESSAGE = 'Unable to load books right now.'

function getBooksFromPayload(payload) {
    return Array.isArray(payload?.books) ? payload.books : []
}

function useBooksData(booksEndpoint = DEFAULT_BOOKS_ENDPOINT) {
    const booksSource = useMemo(() => createBooksSource(booksEndpoint), [booksEndpoint])
    const booksSourceKey = useMemo(() => getSourceKey(booksSource), [booksSource])
    const { items, errorMessage } = useSourceCollection({
        source: booksSource,
        sourceKey: booksSourceKey,
        parsePayload: getBooksFromPayload,
        loadErrorMessage: LOAD_ERROR_MESSAGE,
        errorLabel: 'books',
    })

    return {
        books: items,
        errorMessage,
    }
}

export default useBooksData
