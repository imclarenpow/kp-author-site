import BookCard from './BookCard'

function BookGrid({ books, onBookSelect }) {
    return (
        <div id="library">
            {books.map((book) => (
                <BookCard key={`${book.title}-${book.series}`} book={book} onSelect={onBookSelect} />
            ))}
        </div>
    )
}

export default BookGrid