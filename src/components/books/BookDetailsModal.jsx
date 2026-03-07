import { useEffect } from 'react'
import './BookCover.css'
import './BookDetailsModal.css'

function BookDetailsModal({ book, onClose }) {
    useEffect(() => {
        if (!book) {
            return undefined
        }

        function handleEscape(event) {
            if (event.key === 'Escape') {
                onClose()
            }
        }

        const previousOverflow = document.body.style.overflow
        document.body.style.overflow = 'hidden'

        window.addEventListener('keydown', handleEscape)

        return () => {
            document.body.style.overflow = previousOverflow
            window.removeEventListener('keydown', handleEscape)
        }
    }, [book, onClose])

    if (!book) {
        return null
    }

    const coverSrc = `/assets/img/covers/${book.cover}`
    const hasPrimaryLink = Boolean(book.link1 && book.link1name)
    const hasSecondaryLink = Boolean(book.link2 && book.link2name)
    const hasBlurb = Boolean(book.blurb)

    function handleBackdropClick(event) {
        if (event.target === event.currentTarget) {
            onClose()
        }
    }

    return (
        <div className="book-modal-backdrop" onClick={handleBackdropClick} role="presentation">
            <div
                className="book-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="book-modal-title"
            >
                <div className="book-modal-content">
                    <button
                        type="button"
                        className="book-modal-close"
                        onClick={onClose}
                        aria-label="Close book details"
                    >
                        X
                    </button>

                    <img src={coverSrc} alt={`${book.title} Cover`} className="book-modal-cover" />

                    <div className="book-modal-details">
                        <h2 id="book-modal-title" className="book-modal-title">
                            {book.title}
                        </h2>
                        <h3 className="book-modal-subtitle">{book.subtitle}</h3>

                        <p className="book-modal-meta">
                            <b>Series:</b> {book.series}
                        </p>

                        <p className="book-modal-meta">
                            <b>Publication Date:</b> {book.year}
                        </p>

                        {hasBlurb ? (
                            <p
                                className="book-modal-blurb"
                                dangerouslySetInnerHTML={{ __html: book.blurb }}
                            ></p>
                        ) : null}

                        {hasPrimaryLink || hasSecondaryLink ? (
                            <div className="book-modal-links">
                                {hasPrimaryLink ? (
                                    <a
                                        href={book.link1}
                                        className="book-modal-link book-modal-link-primary"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                    >
                                        {book.link1name}
                                    </a>
                                ) : null}

                                {hasSecondaryLink ? (
                                    <a
                                        href={book.link2}
                                        className="book-modal-link book-modal-link-secondary"
                                    >
                                        {book.link2name}
                                    </a>
                                ) : null}
                            </div>
                        ) : null}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default BookDetailsModal