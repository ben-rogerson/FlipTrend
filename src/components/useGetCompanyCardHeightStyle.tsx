import { useRef } from 'react'

/**
 * Get the height of the first company card in the list.
 * TODO: Recalculate height on browser resize.
 */
export const useGetCompanyCardHeightStyle = () => {
  const companyListRef = useRef<HTMLDivElement>(null)
  const companyCardHeight =
    companyListRef.current?.firstElementChild?.clientHeight
  const companyCardStyle =
    (companyCardHeight ?? 0) > 0
      ? { height: `${companyCardHeight}px` }
      : undefined
  return { companyListRef, companyCardStyle }
}
