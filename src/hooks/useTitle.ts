import { useEffect, useRef } from 'react'

/**
 * Set the title of the page
 * @param title - The title of the page
 * @example
 * ```tsx
 * useTitle('My Page Title')
 * ```
 */
export const useTitle = (title: string) => {
  const documentDefined = typeof document !== 'undefined'
  const originalTitle = useRef(documentDefined ? document.title : null)

  useEffect(() => {
    if (!documentDefined) return

    if (document.title !== title) document.title = title

    const restoredTitle = originalTitle.current ?? ''

    return () => {
      document.title = restoredTitle
    }
  }, [documentDefined, title])
}
