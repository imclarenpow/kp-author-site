import './Card.css'

function isHtmlElement(value) {
    return typeof HTMLElement !== 'undefined' && value instanceof HTMLElement
}

function getActivationElement(event) {
    if (isHtmlElement(event.currentTarget)) {
        return event.currentTarget
    }

    if (isHtmlElement(event.target)) {
        return event.target.closest('[data-card-root]')
    }

    return null
}

function Card({
    className = '',
    isInteractive = false,
    isHidden = false,
    onActivate,
    activationLabel,
    children,
}) {
    function handleActivate(event) {
        if (!isInteractive || isHidden || typeof onActivate !== 'function') {
            return
        }

        onActivate(event, getActivationElement(event))
    }

    function handleKeyDown(event) {
        if (!isInteractive || isHidden || typeof onActivate !== 'function') {
            return
        }

        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault()
            onActivate(event, getActivationElement(event))
        }
    }

    const cardClassName = [
        className,
        isInteractive ? 'book-interactive' : '',
        isHidden ? 'book-hidden' : '',
    ]
        .filter(Boolean)
        .join(' ')

    return (
        <article
            data-card-root
            className={cardClassName}
            role={isInteractive ? 'button' : undefined}
            tabIndex={isInteractive ? (isHidden ? -1 : 0) : undefined}
            aria-hidden={isHidden || undefined}
            aria-label={isInteractive ? activationLabel : undefined}
            onClick={handleActivate}
            onKeyDown={handleKeyDown}
        >
            {children}
        </article>
    )
}

export default Card
