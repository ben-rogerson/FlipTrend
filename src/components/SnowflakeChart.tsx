import {
  createCirclePath,
  defaultRadarColors,
  COLOR_GRID,
} from '@/utils/graphs'
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

Chart.register(
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
)

const labels = ['Value', 'Future', 'Past', 'Health', 'Dividend']

const data = {
  value: 2,
  income: 2,
  health: 5,
  past: 2,
  future: 1,
  management: 0,
  misc: 0,
  total: 12,
  sentence: 'Excellent balance sheet and slightly overvalued.',
}

const getDataset = (dataset: typeof data) =>
  ({
    data: [
      dataset.value,
      dataset.future,
      dataset.past,
      dataset.health,
      dataset.income,
      dataset.value, // To close the path, the last value must equal the first
    ],
    borderWidth: 3,
    ...defaultRadarColors.get(dataset.value),
  }) satisfies Parameters<typeof Radar>[0]['data']['datasets'][number]

const options: Parameters<typeof Radar>[0]['options'] = {
  animation: false,
  elements: { point: { radius: 0 } },
  plugins: { legend: { display: false } },
  layout: { padding: 30 },
  scales: {
    r: {
      beginAtZero: true,
      ticks: { display: false, count: 6 },
      grid: { circular: true, lineWidth: 2, color: COLOR_GRID },
      angleLines: { lineWidth: 2, color: COLOR_GRID },
      pointLabels: { display: false },
    },
  },
}

/**
 * Each path requires a separate path with a custom degree.
 * Separate paths are required so each textPath can be positioned correctly.
 * Adding text to the same path and using startOffset instead of a degree
 * rotation does not work as some text will be cut off.
 */
const dividendCircle = createCirclePath(125, 125, 110, 342)
const valueCircle = createCirclePath(125, 125, 110, 270)
const futureCircle = createCirclePath(125, 125, 110, 198)
const pastCircle = createCirclePath(125, 125, 110, 125, 'inner')
const healthCircle = createCirclePath(125, 125, 110, 54, 'inner')

export const SnowflakeChart = (props: { data: typeof data }) => (
  <div className="relative">
    <Radar
      data={{ labels, datasets: [getDataset(data)] }}
      options={options}
      className="inset-0"
    />
    <svg
      viewBox="0 0 250 250"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0"
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
  </div>
)
