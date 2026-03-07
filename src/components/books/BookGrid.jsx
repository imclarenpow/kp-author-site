import BookCard from './BookCard'

function getBookKey(book) {
    return `${book.title}-${book.series}`
}

function BookGrid({ books, onBookSelect, hiddenBookKey }) {
    return (
        <div id="library">
            {books.map((book) => {
                const bookKey = getBookKey(book)

                return (
                    <BookCard
                        key={bookKey}
                        book={book}
                        onSelect={onBookSelect}
                        isHidden={bookKey === hiddenBookKey}
                    />
                )
            })}
        </div>
    )
}

export default BookGrid