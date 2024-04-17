import { ErrorBoundary } from 'react-error-boundary'
import { Redirect, Route, Switch, useParams } from 'wouter'
import { ErrorDisplay } from '@/components/ErrorDisplay'
import { findFlagUrlByIso2Code } from 'country-flags-svg'

// =============================
// TEMP

import allDataTemp from '@/data/all.json'
import countryDataTemp from '@/data/au.json'
import {
  CompaniesResponse,
  Company,
  companiesResponseSchema,
} from '@/schemas/companies'
import { countriesIsoAlpha2 } from '@/data/countryListIsoAlpha2'
import { useTitle } from '@/hooks/useTitle'
import { SITE_NAME } from '@/constants'
import { IconDownArrow } from '@/components/SvgIcons'
import { api } from '@/api'
import { parseJson } from '@/utils/Bk/parseJson'
import { z } from 'zod'
import { useQuery } from '@tanstack/react-query'

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

const getScoreOutOfOneHundred = (score: Company['score']) => {
  const MAX_SCORE = 30
  return Math.round((score.data.total / MAX_SCORE) * 100)
}

const CompanyCard = (props: Company) => {
  return (
    <article className="grid gap-6 rounded-3xl border-2 bg-gradient-to-b from-bg-highlight to-bg p-8">
      <header className="grid grid-cols-[auto_minmax(0,1fr)_auto] gap-6">
        <div className="">
          <div className="text-muted">{props.unique_symbol}</div>
          <h2 className="truncate text-4xl font-bold tracking-tight">
            {props.name}
          </h2>
        </div>
        <div className="text-right">
          <div className="inline-block rounded-xl bg-button-hover px-2.5 py-1 pb-1">
            <div className="font-heading font-bold opacity-80">
              {getScoreOutOfOneHundred(props.score)}
            </div>
          </div>{' '}
          ({props.score.data.total})
        </div>
      </header>
      {JSON.stringify(props, null, 2)}
    </article>
  )
}

const CompanyList = (props: { companies: Company[] }) => {
  return (
    <div className="grid gap-20">
      {props.companies.map(companyData => (
        <CompanyCard key={companyData.id} {...companyData} />
      ))}
    </div>
  )
}

const countryNames = countriesIsoAlpha2()

const Flag = (props: { className?: string }) => {
  const params = useParams<{ countryId?: string }>()
  const countryId = params.countryId ? params.countryId.toUpperCase() : ''

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

const Main = () => {
  const params = useParams<{ countryId?: string }>()
  const countryId = params.countryId ? params.countryId.toUpperCase() : ''

  const countryName = countryNames.get(countryId)
  const pageTitle = `${countryName ?? 'Global'} Market`

  useTitle(`${pageTitle} | ${SITE_NAME}`)
  if (params.countryId && !countryName) return <Redirect to="/" />

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
      <div>{response.meta.real_total_records} results</div>
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
