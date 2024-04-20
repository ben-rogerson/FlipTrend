import { useLocation, useSearch } from 'wouter'
import { PARAM_SORT } from '@/constants'
import { type Filters } from '@/schemas/filters'

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
  sort: Filters['sort'],
  setSort: (setSort?: Filters['sort']) => void,
] => {
  const [location, setLocation] = useLocation()
  const searchParams = new URLSearchParams(useSearch())

  return [
    (searchParams.get('sort') ?? DEFAULT_SORT) as Filters['sort'],
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
