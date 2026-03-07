import './BookCover.css'

function stripHtmlTags(value = '') {
    return value.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

function truncateText(value = '', maxLength = 60) {
    if (value.length <= maxLength) {
        return value
    }

    return `${value.slice(0, maxLength).trimEnd()}...`
}

function BookCard({ book, onSelect, isHidden = false }) {
    const blurbText = truncateText(stripHtmlTags(book.blurb), 60)
    const hasBlurb = Boolean(blurbText)
    const coverSrc = `/assets/img/covers/${book.cover}`
    const isInteractive = typeof onSelect === 'function'

    function handleSelect(event) {
        if (isInteractive && !isHidden) {
            onSelect(book, event.currentTarget)
        }
    }

    function handleKeyDown(event) {
        if (!isInteractive) {
            return
        }

        if (isHidden) {
            return
        }

        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            onSelect(book, event.currentTarget)
        }
    }

    return (
        <article
            className={`book${isInteractive ? ' book-interactive' : ''}${isHidden ? ' book-hidden' : ''}`}
            role={isInteractive ? 'button' : undefined}
            tabIndex={isInteractive ? (isHidden ? -1 : 0) : undefined}
            aria-hidden={isHidden || undefined}
            onClick={handleSelect}
            onKeyDown={handleKeyDown}
        >
            <img src={coverSrc} alt={`${book.title} Cover`} className="book-cover" />

            <h2 className="title">{book.title}</h2>
            <h4 className="subtitle">{book.subtitle}</h4>

            <p className="series">
                <b>Series:</b> {book.series}
            </p>

            <p className="book-year">
                <b>Publication Date:</b> {book.year}
            </p>

            {hasBlurb ? <p className="blurb">{blurbText}</p> : null}
        </article>
    )
}

export default BookCard