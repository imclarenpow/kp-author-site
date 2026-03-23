import { useMemo } from 'react'
import { createSanityQuerySource } from '../config/contentSources'
import { getSourceKey } from '../utils/contentSourceClient'
import useSourceCollection from './useSourceCollection'

function useSanityCollection({
    sanityProjectId,
    sanityDataset,
    sanityApiVersion,
    query,
    parsePayload,
    loadErrorMessage,
    missingConfigMessage,
    errorLabel,
    initialItems,
}) {
    const source = useMemo(
        () =>
            createSanityQuerySource({
                sanityProjectId,
                sanityDataset,
                sanityApiVersion,
                query,
            }),
        [query, sanityApiVersion, sanityDataset, sanityProjectId],
    )
    const sourceKey = useMemo(() => getSourceKey(source), [source])

    return useSourceCollection({
        source,
        sourceKey,
        parsePayload,
        loadErrorMessage,
        missingConfigMessage,
        errorLabel,
        initialItems,
    })
}

export default useSanityCollection
