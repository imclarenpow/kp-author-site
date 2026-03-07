import { useEffect, useRef, useState } from 'react'
import BookDetailsModal from '../components/books/BookDetailsModal'
import BookGrid from '../components/books/BookGrid'
import './HomePage.css'

const BOOK_MODAL_ANIMATION_MS = 280
const BOOK_CARD_REVEAL_DELAY_MS = 120

function getBookKey(book) {
    return `${book.title}-${book.series}`
}

function HomePage() {
    const [books, setBooks] = useState([])
    const [errorMessage, setErrorMessage] = useState('')
    const [selectedBook, setSelectedBook] = useState(null)
    const [hiddenBookKey, setHiddenBookKey] = useState(null)
    const [modalOriginRect, setModalOriginRect] = useState(null)
    const [isModalClosing, setIsModalClosing] = useState(false)
    const closeTimeoutRef = useRef(null)
    const revealTimeoutRef = useRef(null)
    const modalTriggerRef = useRef(null)

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

            if (revealTimeoutRef.current) {
                window.clearTimeout(revealTimeoutRef.current)
            }
        }
    }, [])

    function handleBookSelect(book, sourceElement) {
        if (closeTimeoutRef.current) {
            window.clearTimeout(closeTimeoutRef.current)
            closeTimeoutRef.current = null
        }

        if (revealTimeoutRef.current) {
            window.clearTimeout(revealTimeoutRef.current)
            revealTimeoutRef.current = null
        }

        modalTriggerRef.current = sourceElement ?? null

        const rect = sourceElement?.getBoundingClientRect()

        setHiddenBookKey(getBookKey(book))
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

    function handleModalClose() {
        if (!selectedBook || isModalClosing) {
            return
        }

        setIsModalClosing(true)

        revealTimeoutRef.current = window.setTimeout(() => {
            setHiddenBookKey(null)
            revealTimeoutRef.current = null
        }, BOOK_CARD_REVEAL_DELAY_MS)

        closeTimeoutRef.current = window.setTimeout(() => {
            setSelectedBook(null)
            setHiddenBookKey(null)
            setModalOriginRect(null)
            setIsModalClosing(false)

            if (modalTriggerRef.current && document.contains(modalTriggerRef.current)) {
                window.requestAnimationFrame(() => {
                    window.requestAnimationFrame(() => {
                        modalTriggerRef.current.focus()
                    })
                })
            }

            modalTriggerRef.current = null
            closeTimeoutRef.current = null
        }, BOOK_MODAL_ANIMATION_MS)
    }

    return (
        <section className="page-container home-page-container">
            {errorMessage ? <p className="home-page-status">{errorMessage}</p> : null}

            <BookGrid books={books} onBookSelect={handleBookSelect} hiddenBookKey={hiddenBookKey} />

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