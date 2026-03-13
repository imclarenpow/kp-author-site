import { useRef } from 'react'
import Modal from '../common/Modal'
import ExternalLink from '../links/ExternalLink'
import './BookCover.css'
import './BookDetailsModal.css'

function BookDetailsModal({ book, originRect, isClosing, onClose }) {
    const modalRef = useRef(null)

    if (!book) {
        return null
    }

    const coverSrc = `/assets/img/covers/${book.cover}`
    const hasPrimaryLink = Boolean(book.link1 && book.link1name)
    const hasSecondaryLink = Boolean(book.link2 && book.link2name)
    const hasBlurb = Boolean(book.blurb)

    return (
        <Modal
            isOpen={Boolean(book)}
            onClose={onClose}
            labelledBy="book-modal-title"
            closeLabel="Close book details"
            modalRef={modalRef}
            originRect={originRect}
            isClosing={isClosing}
        >
            <div className="book-modal-content">
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
                        <div className="book-modal-blurb">
                            {book.blurb.split(/<br\s*\/?>/).map((line, index) => (
                                <p key={index}>{line}</p>
                            ))}
                        </div>
                    ) : null}

                    {hasPrimaryLink || hasSecondaryLink ? (
                        <div className="book-modal-links">
                            {hasPrimaryLink ? (
                                <ExternalLink href={book.link1} className="book-modal-link book-modal-link-primary">
                                    {book.link1name}
                                </ExternalLink>
                            ) : null}

                            {hasSecondaryLink ? (
                                <a
                                    href={book.link2}
                                    className="book-modal-link book-modal-link-secondary"
                                    {...(!book.link2.startsWith('mailto:') && {
                                        target: '_blank',
                                        rel: 'noopener noreferrer',
                                    })}
                                >
                                    {book.link2name}
                                </a>
                            ) : null}
                        </div>
                    ) : null}
                </div>
            </div>
        </Modal>
    )
}

export default BookDetailsModal