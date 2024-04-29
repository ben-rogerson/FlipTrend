import { useLocation, useParams, useSearch } from 'wouter'
import { countryPickerData, type CountryItem } from '@/data/countries'
import { COUNTRY_VALUE_ALL } from '@/constants'
import { type Filters } from '@/schemas/filters'

type UseCountryReturnType = [
  country: CountryItem,
  setCountry: (countryId: CountryItem['value']) => void,
]

/**
 * Get or set the country in the URL
 * @example
 * ```tsx
 * const [country, setCountry] = useCountry()
 * setCountry('UA')
 * console.log(country) // => { value: 'UA', label: 'Ukraine' }
 * ```
 */
export const useCountry = (): UseCountryReturnType => {
  const [, setLocation] = useLocation()
  const searchParams = new URLSearchParams(useSearch())
  const params = useParams<Filters>()
  const urlCountryId = params.countryId ? params.countryId.toLowerCase() : ''

  // Validate url param against the country picker data
  const currentCountry = urlCountryId
    ? countryPickerData.find(country => country.value === urlCountryId)
    : undefined

  // Redirect if the country is not found
  // TODO: Add a custom error instead of redirecting
  if (urlCountryId && !currentCountry) {
    setLocation('/')
  }

  // Type guard to check if the country picker data is empty
  if (countryPickerData[0] === undefined) {
    throw new Error('Country data is empty')
  }

  return [
    currentCountry ?? countryPickerData[0],
    (countryId: string) => {
      const loc = countryId === COUNTRY_VALUE_ALL ? '/' : `/${countryId}`
      const newLocation = [loc, searchParams.toString()]
        .filter(Boolean)
        .join('?')

      setLocation(newLocation)
    },
  ]
}
