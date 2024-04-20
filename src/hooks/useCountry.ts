import { useLocation, useParams, useSearch } from 'wouter'
import { type UrlParams } from '@/schemas/urlParams'
import { countryPickerData, type CountryItem } from '@/data/countries'

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
  const params = useParams<UrlParams>()
  const urlCountryId = params.countryId ? params.countryId.toLowerCase() : '' // TODO: Validate?
  const currentCountry = urlCountryId
    ? countryPickerData.find(country => country.value === urlCountryId)
    : countryPickerData[0]

  // Redirect if the country is not found
  if (urlCountryId && !currentCountry) {
    setLocation('/')
  }

  return [
    currentCountry as CountryItem,
    (countryId: string) => {
      const loc = countryId === 'all' ? '/' : `/${countryId}`
      const newLocation = [loc, searchParams.toString()]
        .filter(Boolean)
        .join('?')

      setLocation(newLocation)
    },
  ]
}
