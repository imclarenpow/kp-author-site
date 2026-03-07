import { useCallback, useEffect, useRef, useState } from 'react'
import BookDetailsModal from '../components/books/BookDetailsModal'
import BookGrid from '../components/books/BookGrid'
import './HomePage.css'

const BOOK_MODAL_ANIMATION_MS = 280

function HomePage() {
    const [books, setBooks] = useState([])
    const [errorMessage, setErrorMessage] = useState('')
    const [selectedBook, setSelectedBook] = useState(null)
    const [modalOriginRect, setModalOriginRect] = useState(null)
    const [isModalClosing, setIsModalClosing] = useState(false)
    const closeTimeoutRef = useRef(null)

    useEffect(() => {
        let isMounted = true

        async function loadBooks() {
            try {
                const response = await fetch('/assets/docs/books.json')

                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`)
                }

                const data = await response.json()

                if (isMounted) {
                    setBooks(Array.isArray(data.books) ? data.books : [])
                    setErrorMessage('')
                }
            } catch (error) {
                if (isMounted) {
                    setErrorMessage('Unable to load books right now.')
                    console.error('Error loading books:', error)
                }
            }
        }

        loadBooks()

        return () => {
            isMounted = false
        }
    }, [])

    useEffect(() => {
        return () => {
            if (closeTimeoutRef.current) {
                window.clearTimeout(closeTimeoutRef.current)
            }
        }
    }, [])

    function handleBookSelect(book, sourceElement) {
        if (closeTimeoutRef.current) {
            window.clearTimeout(closeTimeoutRef.current)
            closeTimeoutRef.current = null
        }

        const rect = sourceElement?.getBoundingClientRect()

        setModalOriginRect(
            rect
                ? {
                    top: rect.top,
                    left: rect.left,
                    width: rect.width,
                    height: rect.height,
                }
                : null,
        )
        setIsModalClosing(false)
        setSelectedBook(book)
    }

    const handleModalClose = useCallback(() => {
        if (!selectedBook || isModalClosing) {
            return
        }

        setIsModalClosing(true)

        closeTimeoutRef.current = window.setTimeout(() => {
            setSelectedBook(null)
            setModalOriginRect(null)
            setIsModalClosing(false)
            closeTimeoutRef.current = null
        }, BOOK_MODAL_ANIMATION_MS)
    }, [selectedBook, isModalClosing])

    return (
        <section className="page-container home-page-container">
            {errorMessage ? <p className="home-page-status">{errorMessage}</p> : null}

            <BookGrid books={books} onBookSelect={handleBookSelect} />

            <BookDetailsModal
                book={selectedBook}
                originRect={modalOriginRect}
                isClosing={isModalClosing}
                onClose={handleModalClose}
            />
        </section>
    )
}

export default HomePage