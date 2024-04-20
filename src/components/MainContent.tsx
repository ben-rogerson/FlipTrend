import { PROJECT_NAME } from '@/constants'
import { useTitle } from '@/hooks/useTitle'
import { CompanyCard } from '@/components/CompanyCard/CompanyCard'
import { LoaderMore } from '@/components/Loader/LoaderMore'
import { CountryPicker } from '@/components/CountryPicker/CountryPicker'
import { LoaderCard } from '@/components/Loader/LoaderCard'
import { SortMarketCap } from '@/components/SortMarketCap'
import { ErrorDisplay } from '@/components/ErrorDisplay'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { useCountryData } from '@/hooks/useCountryData'
import { cn } from '@/utils/styles'

export const MainContent = () => {
  const [observeRef, isIntersecting] = useIntersectionObserver({
    rootMargin: '100px',
  })

  const data = useCountryData(isIntersecting)

  const pageTitle = `${data.country.value === 'all' ? 'Global' : data.country.label[0]} Market Stock Analysis`
  const seoTitleSuffix =
    data.country.value === 'all' ? '' : ` in ${data.country.label[0]}`

  useTitle(`${pageTitle} | ${PROJECT_NAME}`)

  return (
    <div className="grid select-none gap-12">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-4 md:gap-6">
        <div className="grid h-fit gap-2">
          <h1 className="text-base font-bold uppercase tracking-wide text-muted sm:text-xl md:text-2xl">
            Company stock analysis
            <span className="sr-only">{seoTitleSuffix}</span>
          </h1>
          <CountryPicker />
        </div>
        <SortMarketCap />
      </div>
      <article className="grid gap-8 pb-10 md:gap-12">
        {/* <div className="text-muted">
        {response.meta.real_total_records} results
      </div> */}

        {/* // TODO: Style error card */}
        <ErrorDisplay error={data.error?.message} />

        {data.flatData.length === 0 && !data.isFetching && (
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
        >
          {data.flatData.map(company => (
            <CompanyCard key={company.id} {...company} />
          ))}
        </div>
        <div ref={data.totalFetched < data.totalDBRowCount ? observeRef : null}>
          <LoaderMore isLoading={data.isFetchingNextPage} />
        </div>
      </article>
    </div>
  )
}
