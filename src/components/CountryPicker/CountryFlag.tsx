import { findFlagUrlByIso2Code } from 'country-flags-svg'
import { useCountry } from '@/hooks/useCountry'

export const CountryFlag = (props: { className?: string }) => {
  const [country] = useCountry()

  if (country.value === 'ALL')
    return (
      <img
        src="https://upload.wikimedia.org/wikipedia/commons/d/d4/World_Flag_%282004%29.svg"
        alt="" // Avoid announcing
        className={props.className}
        width="1000"
        height="600"
      />
    )

  const flagUrl = findFlagUrlByIso2Code(country.value)
  if (!flagUrl) return null

  return (
    <img
      src={flagUrl}
      className={props.className}
      alt="" // Avoid announcing
      width="1000"
      height="600"
    />
  )
}
