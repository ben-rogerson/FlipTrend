import { useState, useCallback } from 'react'

/**
 * Measure the height of a DOM element using a ref callback.
 */
export const useRefHeightMeasure = <T extends HTMLElement>() => {
  const [height, setHeight] = useState<number>()

  const refCallback = useCallback((node: T | null) => {
    if (node !== null) {
      const companyCardHeight = node.getBoundingClientRect().height
      setHeight(companyCardHeight)
    }
  }, [])

  return { height, refCallback }
}
