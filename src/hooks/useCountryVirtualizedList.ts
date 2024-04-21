import { useRef } from 'react'
import { useVirtualizer } from '@tanstack/react-virtual'

/**
 * Virtualized list for the country dropdown.
 */
export const useCountryVirtualizedList = (rowCount: number) => {
  const parentRef = useRef(null)

  const virtualizer = useVirtualizer({
    getScrollElement: () => parentRef.current,
    estimateSize: () => 50,
    count: rowCount,
    overscan: 7,
  })

  return {
    parentRef,
    virtualOptions: virtualizer.getVirtualItems(),
    parentHeightStyle: { height: `${virtualizer.getTotalSize()}px` },
  }
}
