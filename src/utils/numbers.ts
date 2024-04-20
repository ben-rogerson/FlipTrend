/**
 * Reduce a number with a million, billion, trillion suffix.
 * @param num - The number to abbreviate.
 * @returns The abbreviated number and a word-based equivalent, eg: 1m, 1 million, 1b, 1 billion, etc
 * @example
 * ```ts
 * const num = 1000000
 * const { abbrNumber, abbrWords } = getAbbreviatedNumber(num)
 * console.log(abbrNumber) // => '1m'
 * console.log(abbrWords) // => '1 million'
 * ```
 */
export const getAbbreviatedNumber = (num: number) => {
  if (num >= 1_000_000_000_000) {
    const abbrNum = formatNumber(num / 1_000_000_000_000)
    return { abbrNumber: `${abbrNum}t`, abbrWords: `${abbrNum} trillion` }
  }

  if (num >= 1_000_000_000) {
    const abbrNum = formatNumber(num / 1_000_000_000)
    return { abbrNumber: `${abbrNum}b`, abbrWords: `${abbrNum} billion` }
  }

  if (num >= 1_000_000) {
    const abbrNum = formatNumber(num / 1_000_000)
    return { abbrNumber: `${abbrNum}m`, abbrWords: `${abbrNum} million` }
  }

  if (num >= 1_000) {
    const abbrNum = formatNumber(num / 1_000)
    return { abbrNumber: `${abbrNum}k`, abbrWords: `${abbrNum} thousand` }
  }

  return { abbrNumber: num.toString(), abbrWords: num.toString() }
}

const formatNumber = (num: number) => num.toFixed(1).replace(/\.0$/, '')
