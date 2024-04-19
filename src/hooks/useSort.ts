import { useLocation, useSearch } from 'wouter'
import { PARAM_SORT } from '@/constants'
import { type UrlParams } from '@/schemas/urlParams'

const DEFAULT_SORT = 'desc'

/**
 * Get or set the sort parameter in the URL
 * @example
 * ```tsx
 * const [sort, setSort] = useSort()
 * setSort({ sort: 'asc' })
 * console.log(sort) // => 'asc'
 * ```
 */
export const useSort = (): [
  sort: UrlParams['sort'],
  setSort: (setSort: UrlParams['sort']) => void,
] => {
  const [location, setLocation] = useLocation()
  const searchParams = new URLSearchParams(useSearch())

  return [
    (searchParams.get('sort') ?? DEFAULT_SORT) as UrlParams['sort'],
    setSort => {
      if (setSort) {
        if (setSort === DEFAULT_SORT) {
          searchParams.delete(PARAM_SORT)
        } else {
          searchParams.set(PARAM_SORT, setSort)
        }
      }

      const newLocation = [location, searchParams.toString()]
        .filter(Boolean)
        .join('?')

      setLocation(newLocation)
    },
  ]
}
