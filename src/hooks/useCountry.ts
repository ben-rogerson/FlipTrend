import { useLocation, useParams, useSearch } from 'wouter'
import { countryPickerData, type CountryItem } from '@/data/countries'
import { type Filters } from '@/schemas/filters'
import { COUNTRY_VALUE_ALL } from '@/constants'

/**
 * Get or set the country in the URL
 * @example
 * ```tsx
 * const [country, setCountry] = useCountry()
 * setCountry('UA')
 * console.log(country) // => { value: 'UA', label: 'Ukraine' }
 * ```
 */
export const useCountry = (): [
  country: CountryItem,
  setCountry: (countryId: CountryItem['value']) => void,
] => {
  const [, setLocation] = useLocation()
  const searchParams = new URLSearchParams(useSearch())
  const params = useParams<Filters>()
  const urlCountryId = params.countryId ? params.countryId.toLowerCase() : ''

  // Validate url param against the country picker data
  const currentCountry = urlCountryId
    ? countryPickerData.find(country => country.value === urlCountryId)
    : countryPickerData[0]

  // Redirect if the country is not found
  // TODO: Add a custom error instead of redirecting
  if (urlCountryId && !currentCountry) {
    setLocation('/')
  }

  return [
    currentCountry as CountryItem,
    (countryId: string) => {
      const loc = countryId === COUNTRY_VALUE_ALL ? '/' : `/${countryId}`
      const newLocation = [loc, searchParams.toString()]
        .filter(Boolean)
        .join('?')

      setLocation(newLocation)
    },
  ]
}
