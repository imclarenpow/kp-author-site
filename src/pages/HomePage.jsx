import { useEffect, useState } from 'react'
import BookDetailsModal from '../components/books/BookDetailsModal'
import BookGrid from '../components/books/BookGrid'
import './HomePage.css'

function HomePage() {
    const [books, setBooks] = useState([])
    const [errorMessage, setErrorMessage] = useState('')
    const [selectedBook, setSelectedBook] = useState(null)

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

    return (
        <section className="page-container home-page-container">
            {errorMessage ? <p className="home-page-status">{errorMessage}</p> : null}

            <BookGrid books={books} onBookSelect={setSelectedBook} />

            <BookDetailsModal book={selectedBook} onClose={() => setSelectedBook(null)} />
        </section>
    )
}

export default HomePage