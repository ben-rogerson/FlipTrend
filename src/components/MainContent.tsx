import { COUNTRY_VALUE_ALL, PROJECT_NAME } from '@/constants'
import { useTitle } from '@/hooks/useTitle'
import { LoaderFetch } from '@/components/Loader/LoaderFetch'
import { LoaderCard } from '@/components/Loader/LoaderCard'
import { CompanyCard } from '@/components/CompanyCard/CompanyCard'
import { CountryPicker } from '@/components/CountryPicker/CountryPicker'
import { SortMarketCap } from '@/components/SortMarketCap'
import { ErrorDisplay } from '@/components/ErrorDisplay'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { useCompanyData } from '@/hooks/useCompanyData'
import { cn } from '@/utils/styles'
import { useEffect, useRef } from 'react'
import { useGetCompanyCardHeightStyle } from './useGetCompanyCardHeightStyle'

export const MainContent = () => {
  const observeRef = useRef<HTMLDivElement>(null)
  const observer = useIntersectionObserver(observeRef)
  const { companyListRef, companyCardStyle } = useGetCompanyCardHeightStyle()
  const data = useCompanyData()

  useEffect(() => {
    if (!observer?.isIntersecting) return
    void data.fetchNextPage()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- Avoid triggering additional page fetches
  }, [observer?.isIntersecting])

  const pageTitle = `${data.country.label[0]} Market Stock Analysis`
  useTitle(`${pageTitle} | ${PROJECT_NAME}`)

  return (
    <div className="grid select-none gap-12">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 md:gap-6">
        <div className="grid h-fit gap-2">
          <h1 className="text-base font-bold uppercase tracking-wide text-muted sm:text-xl md:text-2xl">
            Company stock analysis
            {data.country.value !== COUNTRY_VALUE_ALL && (
              <span className="sr-only">{` in ${data.country.label[0]}`}</span>
            )}
          </h1>
          <CountryPicker />
        </div>
        <SortMarketCap />
      </div>
      <article className="grid gap-8 pb-10 md:gap-12">
        {/* // TODO: Style error card */}
        <ErrorDisplay error={data.error?.message} />

        {data.companies.length === 0 && !data.isFetching && (
          <div>
            Sorry, no stock data exists for that country, try another one.
          </div>
        )}

        <LoaderCard isLoading={data.isPending} message="Grabbing data" />
        <div
          className={cn(
            'grid gap-x-8 gap-y-12 sm:grid-cols-2 xl:grid-cols-3',
            data.isPlaceholderData &&
              'duration-100 ease-in animate-out fade-out-50 fill-mode-forwards'
          )}
          role="feed"
          aria-busy={data.isFetching || data.isFetchingNextPage}
          ref={companyListRef}
        >
          {data.companies.map(item => (
            <CompanyCard key={item.id} {...item} style={companyCardStyle} />
          ))}
        </div>
        <div ref={observeRef}>
          <LoaderFetch isLoading={data.isFetchingNextPage} />
        </div>
      </article>
    </div>
  )
}
