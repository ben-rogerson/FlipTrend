import { Redirect } from 'wouter'
import { PROJECT_NAME } from '@/constants'
import { useTitle } from '@/hooks/useTitle'
import { CompanyCard } from '@/components/CompanyCard/CompanyCard'
import { LoaderMore } from '@/components/Loader/LoaderMore'
import {
  type CompaniesResponse,
  companiesResponseSchema,
} from '@/schemas/companies'
import { CountryPicker } from '@/components/CountryPicker/CountryPicker'
import { LoaderCard } from '@/components/Loader/LoaderCard'
import { IconArrowDown, IconArrowUp, IconGem } from '@/components/SvgIcons'
import { cn } from '@/utils/styles'
import { useSort } from '@/hooks/useSort'

// const companySuggestionSchema = z.array(
//   z.object({ name: z.string(), domain: z.string(), logo: z.string() })
// )
// type CompanySuggestion = z.infer<typeof companySuggestionSchema>
// const fetchLogo = (companyName: string) =>
//   api.fetchLogo(companyName).then(async data => {
//     const suggestions = await parseJson<CompanySuggestion[]>(data)
//     const suggestionsParsed = companySuggestionSchema.safeParse(suggestions)
//     if (!suggestionsParsed.success)
//       throw new Error('Failed to parse suggestions')
//     return suggestionsParsed.data[0]?.logo
//   })
// const useCompanyLogo = (companyName: string) => {
//   const queryData = useQuery({
//     queryKey: ['companySuggestions', companyName],
//     queryFn: () => fetchLogo(companyName),
//     // placeholderData: keepPreviousData,
//     // enabled: Boolean(filters?.search),
//     retry: 1,
//   })
//   return queryData
// }

import allDataTemp from '@/data/all.json'
import countryPickerDataTemp from '@/data/au.json'
import { useCountry } from '@/hooks/useCountry'

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const dataAll: CompaniesResponse = JSON.parse(JSON.stringify(allDataTemp))
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const dataCountry: CompaniesResponse = JSON.parse(
  JSON.stringify(countryPickerDataTemp)
)

// Validate the response
const dataCountryParsed = companiesResponseSchema.safeParse(dataCountry)
if (!dataCountryParsed.success) throw new Error('Failed to parse dataCountry')
// Validate the response
const dataAllParsed = companiesResponseSchema.safeParse(dataAll)
if (!dataAllParsed.success) throw new Error('Failed to parse dataAll')

const SortMarketCap = () => {
  const [sort, setSort] = useSort()

  return (
    <div className="mb-3 grid items-end self-end">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-6">
        <div className="grid gap-1" aria-hidden>
          <div className="flex items-center justify-end gap-2">
            <div className="text-xl font-bold uppercase tracking-wide text-muted">
              Market cap
            </div>
            <IconGem className="text-xl text-muted" />
          </div>
          <div className="text-right font-heading text-3xl font-bold">
            {sort === 'asc' ? 'Smallest first' : 'Largest first'}
          </div>
        </div>
        <div className="-mt-1 grid gap-1">
          <fieldset
            className="my-1.5 flex w-24 rounded-2xl border-2 p-1.5 text-muted has-[:focus-visible]:border-white"
            onChange={e => {
              const target = e.target as HTMLInputElement
              if (target.value !== 'desc' && target.value !== 'asc') return
              setSort(target.value)
            }}
          >
            <legend className="sr-only">Sort companies by market cap</legend>
            <input
              className="peer/desc sr-only"
              id="sort-desc"
              type="radio"
              name="sort"
              value="desc"
              checked={sort === 'desc'}
            />
            <input
              className="peer/asc sr-only"
              id="sort-asc"
              type="radio"
              name="sort"
              value="asc"
              checked={sort === 'asc'}
            />
            <label
              className={cn(
                'peer-checked/desc:bg-selected peer-checked/desc:text-active rounded-l-xl',
                'grid w-1/2 place-content-center'
              )}
              htmlFor="sort-desc"
            >
              <IconArrowDown className="text-2xl" />
              <div className="sr-only">Sort descending</div>
            </label>
            <label
              className={cn(
                'peer-checked/asc:bg-selected peer-checked/asc:text-active rounded-r-xl',
                'grid w-1/2 place-content-center'
              )}
              htmlFor="sort-asc"
            >
              <IconArrowUp className="text-2xl" />
              <div className="sr-only">Sort ascending</div>
            </label>
          </fieldset>
        </div>
      </div>
    </div>
  )
}

export const MainContent = () => {
  const [country] = useCountry()

  const pageTitle = `${country.value === 'ALL' ? 'Global' : country.label} Market Stock Analysis`

  useTitle(`${pageTitle} | ${PROJECT_NAME}`)
  if (country.value && !country.label) return <Redirect to="/" />

  const response = country.value ? dataCountryParsed.data : dataAllParsed.data

  const isLoading = false
  const isLoadingMore = false

  return (
    <div className="grid select-none gap-8 md:gap-12">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-6">
        <div className="grid gap-4">
          <h1 className="font-bold uppercase tracking-wide text-muted">
            Company stock analysis
          </h1>
          <CountryPicker />
        </div>
        <SortMarketCap />
      </div>
      <article className="grid gap-8 md:gap-12">
        {/* <div className="text-muted">
        {response.meta.real_total_records} results
      </div> */}
        <LoaderCard isLoading={isLoading} message="Grabbing data" />
        <div
          className="grid gap-x-8 gap-y-12 sm:grid-cols-2 xl:grid-cols-3"
          role="feed"
          aria-busy={isLoading || isLoadingMore}
        >
          {response.data.map((company, index) => (
            <CompanyCard
              key={company.id}
              {...company}
              style={{ animationDelay: `${0.1 + index * 0.15}s` }}
            />
          ))}
        </div>
        <div className="xs:py-10 py-10 md:py-10">
          <LoaderMore isLoading={isLoadingMore} />
        </div>
      </article>
    </div>
  )
}
