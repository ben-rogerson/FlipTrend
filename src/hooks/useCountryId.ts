import { useParams } from 'wouter'

export const useCountryId = () => {
  const params = useParams<{ countryId?: string }>()
  return params.countryId ? params.countryId.toUpperCase() : ''
}
