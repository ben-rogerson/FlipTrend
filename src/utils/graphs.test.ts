import { describe, it, expect } from 'vitest'
import { getRadarColors } from '@/utils/graphs'

describe('getRadarColors', () => {
  it('should throw an error if numColors is less than 2', () => {
    const highColor = { h: 70, s: 76, l: 61 }
    const lowColor = { h: 11, s: 76, l: 61 }
    const numColors = 1

    expect(() => getRadarColors(highColor, lowColor, numColors)).toThrowError(
      'numColors must be greater than 1'
    )
  })

  it('should generate a map of colors for a radar chart', () => {
    const highColor = { h: 70, s: 76, l: 61 }
    const lowColor = { h: 11, s: 76, l: 61 }
    const numColors = 30

    const radarColors = getRadarColors(highColor, lowColor, numColors)

    expect(radarColors.size).toBe(numColors + 1)
    expect(radarColors.get(0)).toEqual({
      backgroundColor: 'hsl(11deg 76% 61% / 70%)',
      borderColor: 'hsl(11deg 76% 61%)',
      color: 'hsl(11deg 51% 41%)',
    })
    expect(radarColors.get(15)).toEqual({
      backgroundColor: 'hsl(42deg 76% 61% / 70%)',
      borderColor: 'hsl(42deg 76% 61%)',
      color: 'hsl(42deg 51% 41%)',
    })
    expect(radarColors.get(30)).toEqual({
      backgroundColor: 'hsl(72deg 76% 61% / 70%)',
      borderColor: 'hsl(72deg 76% 61%)',
      color: 'hsl(72deg 51% 41%)',
    })
  })

  it('should generate a map of colors for a radar chart with a different range', () => {
    const highColor = { h: 70, s: 76, l: 61 }
    const lowColor = { h: 11, s: 26, l: 11 }
    const numColors = 10

    const radarColors = getRadarColors(highColor, lowColor, numColors)

    expect(radarColors.size).toBe(numColors + 1)
    expect(radarColors.get(0)).toEqual({
      backgroundColor: 'hsl(11deg 26% 11% / 70%)',
      borderColor: 'hsl(11deg 26% 11%)',
      color: 'hsl(11deg 1% 0%)',
    })
    expect(radarColors.get(5)).toEqual({
      backgroundColor: 'hsl(44deg 54% 39% / 70%)',
      borderColor: 'hsl(44deg 54% 39%)',
      color: 'hsl(44deg 29% 0%)',
    })
    expect(radarColors.get(10)).toEqual({
      backgroundColor: 'hsl(77deg 82% 67% / 70%)',
      borderColor: 'hsl(77deg 82% 67%)',
      color: 'hsl(77deg 57% 0%)',
    })
  })
})
