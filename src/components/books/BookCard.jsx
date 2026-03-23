import './BookCover.css'
import Card from '../common/Card'
import { stripHtmlTags, truncateText } from '../../utils/textUtils'
import { getBookCoverSrc } from '../../utils/bookUtils'

function BookCard({ book, onSelect, isHidden = false }) {
    const blurbText = truncateText(stripHtmlTags(book.blurb), 60)
    const hasBlurb = Boolean(blurbText)
    const coverSrc = getBookCoverSrc(book.cover)
    const isInteractive = typeof onSelect === 'function'

    function handleSelect(event, activationElement) {
        if (isInteractive && !isHidden) {
            onSelect(book, activationElement || event.currentTarget)
        }
    }

    return (
        <Card className="book" isInteractive={isInteractive} isHidden={isHidden} onActivate={handleSelect}>
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
        </Card>
    )
}

export default BookCard