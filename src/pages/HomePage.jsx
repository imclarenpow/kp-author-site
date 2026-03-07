import BookDetailsModal from '../components/books/BookDetailsModal'
import BookGrid from '../components/books/BookGrid'
import useBooksData from '../hooks/useBooksData'
import useBookModalController from '../hooks/useBookModalController'
import './HomePage.css'

function HomePage() {
    const { books, errorMessage } = useBooksData()
    const {
        selectedBook,
        hiddenBookKey,
        modalOriginRect,
        isModalClosing,
        openBookModal,
        closeBookModal,
    } = useBookModalController()

    return (
        <section className="page-container home-page-container">
            {errorMessage ? <p className="home-page-status">{errorMessage}</p> : null}

            <BookGrid books={books} onBookSelect={openBookModal} hiddenBookKey={hiddenBookKey} />

            <BookDetailsModal
                book={selectedBook}
                originRect={modalOriginRect}
                isClosing={isModalClosing}
                onClose={closeBookModal}
            />
        </section>
    )
}

export default HomePage