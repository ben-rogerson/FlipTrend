import { useLocation, useSearch } from 'wouter'
import { DEFAULT_SORT, PARAM_SORT } from '@/constants'
import { type Filters } from '@/schemas/filters'

type UseSortReturnType = [
  // `NonNullable<unknown>` is makes TS show the true types
  sort: NonNullable<Filters['sort']> & NonNullable<unknown>,
  setSort: (sort: Filters['sort']) => void,
]

/**
 * Get or set the sort parameter in the URL
 * @example
 * ```tsx
 * const [sort, setSort] = useSort()
 * setSort('asc')
 * console.log(sort) // => 'asc'
 * ```
 */
export const useSort = (): UseSortReturnType => {
  const [location, setLocation] = useLocation()
  const searchParams = new URLSearchParams(useSearch())
  const sortParam = searchParams.get(PARAM_SORT)

  // Only allow 'asc' as 'desc' is the default and not shown
  if (sortParam && sortParam !== 'asc') {
    setLocation(location)
  }

  return [
    sortParam === 'asc' ? 'asc' : DEFAULT_SORT,
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
