import { useEffect, useState } from 'react'

const DEFAULT_BOOKS_ENDPOINT = '/assets/docs/books.json'
const LOAD_ERROR_MESSAGE = 'Unable to load books right now.'

function getBooksFromPayload(payload) {
    return Array.isArray(payload?.books) ? payload.books : []
}

function isAbortError(error) {
    return error instanceof DOMException && error.name === 'AbortError'
}

function useBooksData(booksEndpoint = DEFAULT_BOOKS_ENDPOINT) {
    const [books, setBooks] = useState([])
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        const abortController = new AbortController()

        async function loadBooks() {
            try {
                const response = await fetch(booksEndpoint, {
                    signal: abortController.signal,
                })

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`)
                }

                const payload = await response.json()
                setBooks(getBooksFromPayload(payload))
                setErrorMessage('')
            } catch (error) {
                if (isAbortError(error)) {
                    return
                }

                setErrorMessage(LOAD_ERROR_MESSAGE)
                console.error('Error loading books:', error)
            }
        }

        loadBooks()

        return () => {
            abortController.abort()
        }
    }, [booksEndpoint])

    return {
        books,
        errorMessage,
    }
}

export default useBooksData
