import { useEffect, useState } from 'react'

/**
 * Use the IntersectionObserver API to observe an element.
 */
export const useIntersectionObserver = (
  ref: React.RefObject<HTMLElement>,
  options?: IntersectionObserverInit
) => {
  const [state, setState] = useState<IntersectionObserverEntry>()

  useEffect(() => {
    if (!ref.current) return

    const observer = new IntersectionObserver(
      ([elementState]) => {
        setState(elementState)
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0,
        ...options,
      }
    )

    observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [ref, options])

  return state
}
