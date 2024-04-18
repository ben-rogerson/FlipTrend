import { useEffect, useState } from 'react'

interface UseMediaQueryOptions {
  defaultValue?: boolean
  initializeWithValue?: boolean
}

export const useMediaQuery = (
  query: string,
  {
    defaultValue = false,
    initializeWithValue = true,
  }: UseMediaQueryOptions = {}
): boolean => {
  const getMatches = (q: string): boolean => {
    return window.matchMedia(q).matches
  }

  const [matches, setMatches] = useState<boolean>(() => {
    if (initializeWithValue) return getMatches(query)
    return defaultValue
  })

  // Handles the change event of the media query.
  function handleChange() {
    setMatches(getMatches(query))
  }

  useEffect(() => {
    const matchMedia = window.matchMedia(query)

    // Triggered at the first client-side load and if query changes
    handleChange()

    matchMedia.addEventListener('change', handleChange)

    return () => {
      matchMedia.removeEventListener('change', handleChange)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Avoid handleChange triggering on every render
  }, [query])

  return matches
}
