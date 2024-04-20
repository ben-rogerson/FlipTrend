import { useEffect, useMemo } from 'react'
import { keepPreviousData, useInfiniteQuery } from '@tanstack/react-query'
import {
  type CompaniesResponse,
  companiesResponseSchema,
} from '@/schemas/companies'
import { useCountry } from '@/hooks/useCountry'
import { useSort } from '@/hooks/useSort'
import { api } from '@/api'
import { type CountryItem } from '@/data/countries'
import { type UrlParams } from '@/schemas/urlParams'

const FETCH_SIZE = 12

const fetchData = async (
  offset: number,
  size: number,
  sort: UrlParams['sort'],
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

export const useCountryData = (isEnabled: boolean) => {
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
    initialPageParam: 0,
    getNextPageParam: (_lastGroup, groups) => groups.length,
    refetchOnWindowFocus: false,
    retry: 1,
    placeholderData: keepPreviousData,
  })

  useEffect(() => {
    if (!isEnabled) return
    if (!queryData.hasNextPage) return
    if (queryData.isFetching) return
    void queryData.fetchNextPage()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Only specific dependencies
  }, [
    queryData.fetchNextPage,
    queryData.hasNextPage,
    queryData.isFetching,
    isEnabled,
  ])

  const flatData = useMemo(
    () => queryData.data?.pages.flatMap(page => page.data) ?? [],
    [queryData.data]
  )

  const totalDBRowCount = queryData.data?.pages[0]?.meta.real_total_records ?? 0
  const totalFetched = flatData.length

  return { flatData, country, totalDBRowCount, totalFetched, ...queryData }
}
