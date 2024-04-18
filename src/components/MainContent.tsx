import { Redirect } from 'wouter'
import { PROJECT_NAME } from '@/constants'
import { useTitle } from '@/hooks/useTitle'
import { useCountryId } from '@/hooks/useCountryId'
import { CompanyCard } from '@/components/CompanyCard'
import { LoaderBar } from '@/components/LoaderBar'
import { getCountries } from '@/data/countryListIsoAlpha2'
import {
  type CompaniesResponse,
  companiesResponseSchema,
} from '@/schemas/companies'

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
import countryDataTemp from '@/data/au.json'
import { MainHeadingComboBox } from '@/components/MainHeadingComboBox'

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const dataAll: CompaniesResponse = JSON.parse(JSON.stringify(allDataTemp))
// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
const dataCountry: CompaniesResponse = JSON.parse(
  JSON.stringify(countryDataTemp)
)

// Validate the response
const dataCountryParsed = companiesResponseSchema.safeParse(dataCountry)
if (!dataCountryParsed.success) throw new Error('Failed to parse dataCountry')
// Validate the response
const dataAllParsed = companiesResponseSchema.safeParse(dataAll)
if (!dataAllParsed.success) throw new Error('Failed to parse dataAll')

const countryNames = getCountries()

export const MainContent = () => {
  const countryId = useCountryId()

  const countryName = countryNames.get(countryId)
  const pageTitle = `${countryName ?? 'Global'} Locations`

  useTitle(`${pageTitle} | ${PROJECT_NAME}`)
  if (countryId && !countryName) return <Redirect to="/" />

  const response = countryId ? dataCountryParsed.data : dataAllParsed.data

  return (
    <article className="grid select-none gap-8 md:gap-12">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] gap-6">
        <div className="grid gap-4">
          <div className="font-bold uppercase tracking-wide text-muted">
            Company stock analysis
          </div>
          <MainHeadingComboBox />
        </div>
        <div className="grid items-end pb-3">Sort</div>
      </div>
      {/* <div className="text-muted">
        {response.meta.real_total_records} results
      </div> */}
      <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
        {response.data.map(company => (
          <CompanyCard key={company.id} {...company} />
        ))}
      </div>
      <div className="xs:py-10 py-10 md:py-10">
        <LoaderBar isLoading={false} />
      </div>
    </article>
  )
}
