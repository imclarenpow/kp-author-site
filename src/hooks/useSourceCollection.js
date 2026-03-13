import { useEffect, useState } from 'react'
import { fetchSourcePayload, isSourceConfigured } from '../utils/contentSourceClient'

const EMPTY_ITEMS = []

function isAbortError(error) {
    return error instanceof DOMException && error.name === 'AbortError'
}

function useSourceCollection({
    source,
    sourceKey,
    parsePayload,
    loadErrorMessage,
    missingConfigMessage = '',
    errorLabel = 'content',
    initialItems = EMPTY_ITEMS,
}) {
    const [items, setItems] = useState(initialItems)
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState('')

    useEffect(() => {
        if (!isSourceConfigured(source)) {
            setItems(initialItems)
            setIsLoading(false)
            setErrorMessage(missingConfigMessage)
            return undefined
        }

        const abortController = new AbortController()

        async function loadCollection() {
            setIsLoading(true)

            try {
                const payload = await fetchSourcePayload(source, abortController.signal)
                setItems(parsePayload(payload))
                setErrorMessage('')
            } catch (error) {
                if (isAbortError(error)) {
                    return
                }

                setItems(initialItems)
                setErrorMessage(loadErrorMessage)
                console.error(`Error loading ${errorLabel}:`, error)
            } finally {
                if (!abortController.signal.aborted) {
                    setIsLoading(false)
                }
            }
        }

        loadCollection()

        return () => {
            abortController.abort()
        }
    }, [errorLabel, initialItems, loadErrorMessage, missingConfigMessage, parsePayload, source, sourceKey])

    return {
        items,
        isLoading,
        errorMessage,
    }
}

export default useSourceCollection
