import { useCallback, useEffect, useRef } from 'react'

function getCacheBustedSrc(src) {
    if (!src) {
        return src
    }

    const separator = src.includes('?') ? '&' : '?'
    return `${src}${separator}retry=${Date.now()}`
}

function useImageFallback(primarySrc, fallbackSrc) {
    const hasRetriedRef = useRef(false)

    useEffect(() => {
        hasRetriedRef.current = false
    }, [primarySrc])

    const handleError = useCallback(
        (event) => {
            const image = event.currentTarget

            if (!hasRetriedRef.current) {
                hasRetriedRef.current = true
                image.src = getCacheBustedSrc(primarySrc)
                return
            }

            image.onerror = null
            image.src = fallbackSrc
        },
        [fallbackSrc, primarySrc],
    )

    return {
        onError: handleError,
    }
}

export default useImageFallback
