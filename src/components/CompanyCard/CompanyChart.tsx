import {
  Chart,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend,
} from 'chart.js'
import { Radar } from 'react-chartjs-2'
import { getRadarOptions, getSvgCirclePath } from '@/utils/graphs'
import { getRootCssValue } from '@/utils/styles'
import { type Company } from '@/schemas/companies'

Chart.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

/**
 * Each path requires a separate path with a custom degree.
 * Separate paths are required so each textPath can be positioned correctly.
 * Adding text to the same path and using startOffset instead of a degree
 * rotation does not work as some text will be cut off.
 */
const dividendCircle = getSvgCirclePath(125, 125, 110, 342)
const valueCircle = getSvgCirclePath(125, 125, 110, 270)
const futureCircle = getSvgCirclePath(125, 125, 110, 198)
const pastCircle = getSvgCirclePath(125, 125, 110, 125, 'inner')
const healthCircle = getSvgCirclePath(125, 125, 110, 54, 'inner')

const radarLabels = (
  <svg
    viewBox="0 0 250 250"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className="absolute inset-0 top-0 delay-200 duration-700 animate-in fade-in-0 fill-mode-backwards"
    aria-hidden
  >
    <path id="valueCurve" d={valueCircle} />
    <path id="futureCurve" d={futureCircle} />
    <path id="pastCurve" d={pastCircle} />
    <path id="healthCurve" d={healthCircle} />
    <path id="dividendCurve" d={dividendCircle} />
    <text fill="currentColor" textAnchor="middle" fontSize="20">
      <textPath xlinkHref="#valueCurve" startOffset="50%">
        Value
      </textPath>
      <textPath xlinkHref="#futureCurve" startOffset="50%">
        Future
      </textPath>
      <textPath
        xlinkHref="#pastCurve"
        startOffset="50%"
        dominantBaseline="hanging"
      >
        Past
      </textPath>
      <textPath
        xlinkHref="#healthCurve"
        startOffset="50%"
        dominantBaseline="hanging"
      >
        Health
      </textPath>
      <textPath xlinkHref="#dividendCurve" startOffset="50%">
        Dividend
      </textPath>
    </text>
  </svg>
)

const emptyDataArray = Array(5).fill(0)

export const CompanyChart = (props: {
  graphData: Company['score']['data']
  backgroundColor?: string
  borderColor?: string
}) => {
  // TODO: Look to move these to a global state (apparently no perf issues here though)
  const colorGridBg = getRootCssValue('--color-grid-bg')
  const colorGridLine = getRootCssValue('--color-grid-line')

  const data = {
    labels: emptyDataArray, // Actual labels are added via svg textPath
    datasets: [
      {
        data: [
          props.graphData.value,
          props.graphData.future,
          props.graphData.past,
          props.graphData.health,
          props.graphData.income,
          props.graphData.value, // Close the path by repeating the first value
        ],
        borderWidth: 3,
        borderColor: props.backgroundColor,
        backgroundColor: props.backgroundColor,
      },
      // Empty dataset to fill-in chart center to block the angleLines
      { data: emptyDataArray, borderWidth: 0, backgroundColor: colorGridBg },
    ],
  }

  return (
    <figure className="relative aspect-square" aria-label="Snowflake chart">
      <Radar
        data={data}
        options={getRadarOptions(colorGridBg, colorGridLine)}
        className="p-[12%] duration-700 animate-in fade-in-0 zoom-in-95 fill-mode-backwards"
      />
      <figcaption className="sr-only">
        {[
          `Total company score: ${props.graphData.total} out of 30.`,
          `Value: ${props.graphData.value}.`,
          `Future: ${props.graphData.future}.`,
          `Past: ${props.graphData.past}.`,
          `Health: ${props.graphData.health}.`,
          `Dividend: ${props.graphData.income}.`,
        ].join(' ')}
      </figcaption>
      {radarLabels}
    </figure>
  )
}
