import BookCard from './BookCard'

function BookGrid({ books }) {
    return (
        <div id="library">
            {books.map((book) => (
                <BookCard key={`${book.title}-${book.series}`} book={book} />
            ))}
        </div>
    )
}

export default BookGrid