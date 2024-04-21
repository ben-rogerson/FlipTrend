import { getAbbreviatedNumber } from '@/utils/numbers'
import { describe, it, expect } from 'vitest'

describe('getAbbreviatedNumber', () => {
  it('should abbreviate a number in the trillions', () => {
    const num = 1_100_000_000_000
    const { abbrNumber, abbrWords } = getAbbreviatedNumber(num)

    expect(abbrNumber).toBe('1.1t')
    expect(abbrWords).toBe('1.1 trillion')
  })

  it('should abbreviate a number in the billions', () => {
    const num = 1_100_000_000
    const { abbrNumber, abbrWords } = getAbbreviatedNumber(num)

    expect(abbrNumber).toBe('1.1b')
    expect(abbrWords).toBe('1.1 billion')
  })

  it('should abbreviate a number in the millions', () => {
    const num = 1_100_000
    const { abbrNumber, abbrWords } = getAbbreviatedNumber(num)

    expect(abbrNumber).toBe('1.1m')
    expect(abbrWords).toBe('1.1 million')
  })

  it('should abbreviate a number in the thousands', () => {
    const num = 1_100
    const { abbrNumber, abbrWords } = getAbbreviatedNumber(num)

    expect(abbrNumber).toBe('1.1k')
    expect(abbrWords).toBe('1.1 thousand')
  })

  it('should not abbreviate a number less than 1,000', () => {
    const num = 999
    const { abbrNumber, abbrWords } = getAbbreviatedNumber(num)

    expect(abbrNumber).toBe('999')
    expect(abbrWords).toBe('999')
  })

  it('should strip a trailing .0', () => {
    const num = 1_000_000
    const { abbrNumber, abbrWords } = getAbbreviatedNumber(num)

    expect(abbrNumber).toBe('1m')
    expect(abbrWords).toBe('1 million')
  })
})
