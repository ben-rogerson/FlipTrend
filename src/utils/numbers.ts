/**
 * Reduce a number with a million, billion, trillion suffix.
 * @param num - The number to abbreviate.
 * @returns The abbreviated number and a word-based equivalent, eg: 1m, 1 million, 1b, 1 billion, etc
 * @example
 * ```ts
 * const num = 1000000
 * const { abbrNumber, abbrWords } = getAbbreviatedNumber(num) // '1m'
 * ```
 */
export const getAbbreviatedNumber = (num: number) => {
  if (num >= 1_000_000_000_000) {
    const abbrNum = (num / 1_000_000_000_000).toFixed(1)
    return { abbrNumber: `${abbrNum}t`, abbrWords: `${abbrNum} trillion` }
  }

  if (num >= 1_000_000_000) {
    const abbrNum = (num / 1_000_000_000).toFixed(1)
    return { abbrNumber: `${abbrNum}b`, abbrWords: `${abbrNum} billion` }
  }

  if (num >= 1_000_000) {
    const abbrNum = (num / 1_000_000).toFixed(1)
    return { abbrNumber: `${abbrNum}m`, abbrWords: `${abbrNum} million` }
  }

  return { abbrNumber: num.toString(), abbrWords: num.toString() }
}
