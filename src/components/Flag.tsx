import { findFlagUrlByIso2Code } from 'country-flags-svg'
import { useCountryId } from '@/hooks/useCountryId'

export const Flag = (props: { className?: string }) => {
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
