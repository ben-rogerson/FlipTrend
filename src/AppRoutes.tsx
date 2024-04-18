import { ErrorBoundary } from 'react-error-boundary'
import { Redirect, Route, Switch, useParams } from 'wouter'
import { ErrorDisplay } from '@/components/ErrorDisplay'
import { findFlagUrlByIso2Code } from 'country-flags-svg'

// =============================
// TEMP

import allDataTemp from '@/data/all.json'
import countryDataTemp from '@/data/au.json'
import {
  type CompaniesResponse,
  type Company,
  companiesResponseSchema,
} from '@/schemas/companies'
import { countriesIsoAlpha2 } from '@/data/countryListIsoAlpha2'
import { useTitle } from '@/hooks/useTitle'
import { PROJECT_NAME } from '@/constants'
import { IconDownArrow, IconGem } from '@/components/SvgIcons'
import { SnowflakeChart } from '@/components/SnowflakeChart'
import { getRadarColors } from '@/utils/graphs'
import { abbreviateNumber } from '@/utils/numbers'

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

// =============================

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

const MAX_SCORE = 30

const getScore = (score: Company['score']) => {
  return Math.round((score.data.total / MAX_SCORE) * 100)
}

const highColor = { h: 90, s: 76, l: 50 }
const lowColor = { h: 0, s: 76, l: 61 }
const radarColors = getRadarColors(highColor, lowColor, MAX_SCORE)

const CompanyCard = (props: Company) => {
  const colorSet = radarColors.get(props.score.data.total)
  const marketCapData = abbreviateNumber(props.grid.data.market_cap)
  const score = getScore(props.score)

  return (
    <a
      href={`https://simplywall.st${props.primary_canonical_url}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group/card @container/card"
    >
      <article className="group-hover/card:border-light grid h-full gap-3 rounded-3xl border-2 bg-gradient-to-b from-bg-highlight to-bg px-8 py-7 text-lg @sm/card:gap-6 @sm/card:pb-10 @sm/card:pt-7 @sm/card:text-2xl">
        <header className="grid items-start gap-6 text-center @sm/card:grid-cols-[minmax(0,1fr)_auto] @sm/card:text-left">
          <div className="grid gap-1">
            <div className="text-muted">{props.unique_symbol}</div>
            <h2 className="truncate text-2xl font-bold tracking-tight @xs/card:text-3xl @md/card:text-4xl">
              {props.name}
            </h2>
          </div>
          <div
            className="absolute -top-2.5 left-0 w-full text-center @sm/card:relative @sm/card:top-0"
            aria-label={`${score} out of 100`}
            title={`${score} out of 100`}
          >
            <div
              className="absolute inset-x-0 -top-1 bottom-0 mx-auto inline-block w-12 rounded-xl @sm/card:w-auto"
              style={{ backgroundColor: colorSet?.color }}
            />
            <div className="relative px-2 font-heading font-bold">{score}</div>
            {/* ({props.score.data.total}) */}
          </div>
        </header>
        <div className="mx-auto w-full max-w-xs pt-2 md:px-7">
          <SnowflakeChart graphData={props.score.data} {...colorSet} />
        </div>
        <div className="absolute inset-x-0 -bottom-4 text-center">
          <div
            className="inline-flex items-center gap-1.5 rounded-xl bg-button-hover px-2.5 py-0.5"
            aria-label={`${props.grid.data.currency_info.reporting_currency_symbol}${marketCapData.abbrWords}`}
            title={`${props.grid.data.currency_info.reporting_currency_symbol}${marketCapData.abbrWords}`}
          >
            <IconGem className="-mt-px text-muted" />
            {props.grid.data.currency_info.reporting_currency_symbol}
            {marketCapData.abbrNumber}
          </div>
        </div>
        {/* {JSON.stringify(props.score.data, null, 2)} */}
        {/* {JSON.stringify(props, null, 2)} */}
        {/* {JSON.stringify(props, null, 2)} */}
      </article>
    </a>
  )
}

const CompanyList = (props: { companies: Company[] }) => {
  return (
    <div className="grid gap-x-8 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
      {props.companies.map(companyData => (
        <CompanyCard key={companyData.id} {...companyData} />
      ))}
    </div>
  )
}

const countryNames = countriesIsoAlpha2()

const Flag = (props: { className?: string }) => {
  const countryId = useCountryId()

  if (!countryId)
    return (
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/d/d4/World_Flag_%282004%29.svg"
        alt="Global flag"
        className={props.className}
      />
    )

  const flagUrl = findFlagUrlByIso2Code(countryId)
  if (!flagUrl) return null

  return <img src={flagUrl} className={props.className} alt="Flag" />
}

const useCountryId = () => {
  const params = useParams<{ countryId?: string }>()
  return params.countryId ? params.countryId.toUpperCase() : ''
}

const Main = () => {
  const countryId = useCountryId()

  const countryName = countryNames.get(countryId)
  const pageTitle = `${countryName ?? 'Global'} Market`

  useTitle(`${pageTitle} | ${PROJECT_NAME}`)
  if (countryId && !countryName) return <Redirect to="/" />

  const response = countryId ? dataCountryParsed.data : dataAllParsed.data

  return (
    <article className="grid gap-5">
      <div className="grid gap-4">
        <div className="font-bold uppercase tracking-wide text-muted">
          Company Performance
        </div>
        <button
          type="button"
          className="group relative inline-flex items-center gap-4 text-7xl font-bold tracking-tight"
        >
          <div className="absolute -inset-3 -z-1 rounded-full group-hover:bg-button-hover" />
          <div
            className="relative h-20 w-20 shrink-0 items-center overflow-hidden rounded-50 border-4 shadow-inner"
            aria-hidden
          >
            <Flag className="h-full object-cover" />
          </div>
          <h1>{pageTitle}</h1>
          <IconDownArrow className="mt-2 text-5xl" aria-hidden />
        </button>
      </div>
      <div className="text-muted">
        {response.meta.real_total_records} results
      </div>
      <CompanyList companies={response.data} />
    </article>
  )
}

export const AppRoutes = () => (
  <Switch>
    <Route path="/" nest>
      <ErrorBoundary FallbackComponent={ErrorDisplay}>
        <Route path="/" component={Main} />
        <Route path="/:countryId" component={Main} />
      </ErrorBoundary>
    </Route>
    <Route>
      <ErrorDisplay error="404: No such page!" />
    </Route>
  </Switch>
)
