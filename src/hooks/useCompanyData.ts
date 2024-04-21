import { useMemo } from 'react'
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query'
import {
  type CompaniesResponse,
  companiesResponseSchema,
} from '@/schemas/companies'
import { useCountry } from '@/hooks/useCountry'
import { useSort } from '@/hooks/useSort'
import { api } from '@/api'
import { type CountryItem } from '@/data/countries'
import { type Filters } from '@/schemas/filters'

const FETCH_SIZE = 12

/**
 * Fetch and paginate company data based on the country and sort.
 */
export const useCompanyData = () => {
  const [sort] = useSort()
  const [country] = useCountry()

  const queryData = useInfiniteQuery<CompaniesResponse>({
    queryKey: ['companies', country.value, sort],
    queryFn: async ({ pageParam = 0 }) => {
      const offset = (pageParam as number) * FETCH_SIZE
      const fetchedData = await fetchData(
        offset,
        FETCH_SIZE,
        sort,
        country.value
      )
      return fetchedData
    },
    refetchOnWindowFocus: false,
    initialPageParam: 0,
    getNextPageParam: (_, groups) => groups.length,
    placeholderData: keepPreviousData,
  })

  /**
   * Flatten the data for easier access.
   */
  const companies = useMemo(
    () => queryData.data?.pages.flatMap(page => page.data) ?? [],
    [queryData.data]
  )

  const totalCount = queryData.data?.pages[0]?.meta.real_total_records ?? 0
  const hasNextPage = companies.length < totalCount
  // Avoid callable fetch function when there is no more data to fetch
  const fetchNextPage = hasNextPage ? queryData.fetchNextPage : () => null

  return {
    companies,
    country,
    status: queryData.status,
    error: queryData.error,
    isPending: queryData.isPending,
    isFetching: queryData.isFetching,
    isRefetching: queryData.isRefetching,
    isFetchingNextPage: queryData.isFetchingNextPage,
    isPlaceholderData: queryData.isPlaceholderData,
    fetchStatus: queryData.fetchStatus,
    fetchNextPage,
    hasNextPage,
    totalCount,
  }
}

const fetchData = async (
  offset: number,
  size: number,
  sort: Filters['sort'],
  country: CountryItem['value']
) => {
  const response = await api.fetchCompanies(offset, size, sort, country)

  if (!response.ok) throw new Error('Failed to fetch company data')

  const companies = (await response.json()) as CompaniesResponse

  // Verify and trim the data
  const dataAllParsed = companiesResponseSchema.safeParse(companies)
  if (!dataAllParsed.success)
    throw new Error('The stock data couldn’t be verified')

  return dataAllParsed.data
}
