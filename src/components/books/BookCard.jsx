function BookCard({ book }) {
    const hasBlurb = Boolean(book.blurb)
    const hasPrimaryLink = Boolean(book.link1)
    const coverSrc = `/assets/img/covers/${book.cover}`

    return (
        <article className={`book${hasPrimaryLink ? ' has-button' : ''}`}>
            <img src={coverSrc} alt={`${book.title} Cover`} className="cover" />

            <h2 className="title">{book.title}</h2>
            <h4 className="subtitle">{book.subtitle}</h4>

            <p className="series">
                <b>Series:</b> {book.series}
            </p>

            <p className="book-year">
                <b>Publication Date:</b> {book.year}
            </p>

            {hasBlurb ? (
                <p className="blurb" dangerouslySetInnerHTML={{ __html: book.blurb }}></p>
            ) : null}

            {hasPrimaryLink ? (
                <>
                    <br />
                    <br />
                    <a href={book.link1} className="buy-link">
                        {book.link1name}
                    </a>
                </>
            ) : null}
        </article>
    )
}

export default BookCard