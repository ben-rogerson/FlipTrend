import { type Company } from '@/schemas/companies'
import { IconGem } from '@/components/SvgIcons'
import { CompanyChart } from '@/components/CompanyCard/CompanyChart'
import { getRadarColors } from '@/utils/graphs'
import { getAbbreviatedNumber } from '@/utils/numbers'
import { useRef } from 'react'
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver'
import { useRefHeightMeasure } from '@/hooks/useRefHeightMeasure'

const MAX_SCORE = 30

const getScore = (score: Company['score']) =>
  Math.round((score.data.total / MAX_SCORE) * 100)

const highColor = { h: 90, s: 76, l: 50 }
const lowColor = { h: 0, s: 76, l: 61 }
const radarColors = getRadarColors(highColor, lowColor, MAX_SCORE)

export const CompanyCard = (props: Company & { hasObserver: boolean }) => {
  const observeRef = useRef<HTMLDivElement>(null)
  const observer = useIntersectionObserver(observeRef)

  const colorSet = radarColors.get(props.score.data.total)
  const marketCapData = getAbbreviatedNumber(props.grid.data.market_cap)
  const score = getScore(props.score)

  const { refCallback, height } = useRefHeightMeasure<HTMLDivElement>()

  return (
    <article
      ref={observeRef}
      style={
        // Calculate the height of the card based on the content.
        // `minHeight` attempts to improve scroll behaviour on small screens
        (height ?? 0) > 0 ? { height: `${height}px` } : { minHeight: '356px' }
      }
      className="group/card block @container/card"
    >
      {(!props.hasObserver || observer?.isIntersecting) && (
        <div
          className="grid h-full gap-3 rounded-3xl border-2 bg-gradient-to-b from-bg-highlight px-8 py-7 text-lg @sm/card:gap-6 @sm/card:pb-10 @sm/card:pt-7 @sm/card:text-2xl"
          ref={refCallback}
        >
          <header className="grid items-start text-center @sm/card:grid-cols-[minmax(0,1fr)_auto] @sm/card:text-left">
            <div className="grid gap-1">
              <div className="text-muted">{props.unique_symbol}</div>
              <h2>
                <a
                  href={`https://simplywall.st${props.primary_canonical_url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block truncate text-2xl font-bold tracking-tight hover:underline @xs/card:text-3xl @md/card:text-4xl"
                >
                  {props.name}
                </a>
              </h2>
            </div>
            <div className="absolute -top-2.5 left-0 w-full text-center @sm/card:relative @sm/card:top-0">
              <div
                className="absolute inset-x-0 -top-1 bottom-0 mx-auto inline-block w-12 rounded-xl @sm/card:w-auto"
                style={{ backgroundColor: colorSet?.color }}
              />
              <div
                className="peer relative px-2 font-heading font-bold"
                aria-hidden
              >
                {score}
              </div>
              <div className="pointer-events-none absolute left-1/2 mt-1 hidden w-fit -translate-x-1/2 whitespace-nowrap rounded-lg border bg-background px-3.5 py-2 text-lg duration-300 ease-out fade-in-0 peer-hover:block @sm/card:left-auto @sm/card:right-0 @sm/card:translate-x-0 @sm/card:animate-in @sm/card:slide-in-from-top-1">
                Snowflake Score {score}/100
              </div>
            </div>
          </header>
          <div className="mx-auto w-full max-w-xs select-none pt-2 md:px-7">
            <CompanyChart graphData={props.score.data} {...colorSet} />
          </div>
          <div className="group absolute inset-x-0 -bottom-4 text-center">
            <div className="pointer-events-none mx-auto mb-1 hidden w-fit whitespace-nowrap rounded-lg border bg-background px-3.5 py-2 text-lg duration-300 ease-out animate-in fade-in-0 group-hover:block @sm/card:slide-in-from-bottom-1">
              {`Market cap ${props.grid.data.currency_info.reporting_currency_symbol}${marketCapData.abbrWords}`}
            </div>
            <div
              className="peer inline-flex items-center gap-1.5 rounded-xl bg-button-hover px-2.5 py-0.5"
              aria-hidden
            >
              <IconGem className="-mt-px text-muted" />
              {props.grid.data.currency_info.reporting_currency_symbol}
              {marketCapData.abbrNumber}
            </div>
          </div>
        </div>
      )}
    </article>
  )
}
