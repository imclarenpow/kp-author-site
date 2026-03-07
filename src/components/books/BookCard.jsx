function stripHtmlTags(value = '') {
    return value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

function truncateText(value = '', maxLength = 50) {
    if (value.length <= maxLength) {
        return value
    }

    return `${value.slice(0, maxLength).trimEnd()}...`
}

function BookCard({ book }) {
    const blurbText = truncateText(stripHtmlTags(book.blurb), 50)
    const hasBlurb = Boolean(blurbText)
    const hasPrimaryLink = Boolean(book.link1 && book.link1name)
    const coverSrc = `/assets/img/covers/${book.cover}`

    return (
        <article className="book">
            <img src={coverSrc} alt={`${book.title} Cover`} className="cover" />

            <h2 className="title">{book.title}</h2>
            <h4 className="subtitle">{book.subtitle}</h4>

            <p className="series">
                <b>Series:</b> {book.series}
            </p>

            <p className="book-year">
                <b>Publication Date:</b> {book.year}
            </p>

            {hasBlurb ? <p className="blurb">{blurbText}</p> : null}

            {hasPrimaryLink ? (
                <a href={book.link1} className="buy-link page-link header-link header-link-active">
                    {book.link1name}
                </a>
            ) : null}
        </article>
    )
}

export default BookCard