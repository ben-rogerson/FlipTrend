import { type Company } from '@/schemas/companies'
import { IconGem } from '@/components/SvgIcons'
import { SnowflakeChart } from '@/components/SnowflakeChart'
import { getRadarColors } from '@/utils/graphs'
import { getAbbreviatedNumber } from '@/utils/numbers'

const MAX_SCORE = 30

const getScore = (score: Company['score']) =>
  Math.round((score.data.total / MAX_SCORE) * 100)

const highColor = { h: 90, s: 76, l: 50 }
const lowColor = { h: 0, s: 76, l: 61 }
const radarColors = getRadarColors(highColor, lowColor, MAX_SCORE)

export const CompanyCard = (props: Company) => {
  const colorSet = radarColors.get(props.score.data.total)
  const marketCapData = getAbbreviatedNumber(props.grid.data.market_cap)
  const score = getScore(props.score)

  return (
    <a
      href={`https://simplywall.st${props.primary_canonical_url}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group/card @container/card"
    >
      <article className="group-hover/card:border-light grid h-full gap-3 rounded-3xl border-2 bg-gradient-to-b from-bg-highlight px-8 py-7 text-lg @sm/card:gap-6 @sm/card:pb-10 @sm/card:pt-7 @sm/card:text-2xl">
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
