import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

/**
 * A utility function to de-dupe and merge classes into a single string.
 * @param inputs - The classes to merge.
 * @returns The merged, de-duped classes.
 * @example
 * ```tsx
 * const className = cn('text-center', isLarge && 'text-lg')
 * ```
 */
export const cn = (...inputs: ClassValue[]) => twMerge(clsx(inputs))

/**
 * Get a current CSS property value from the :root element.
 * @param propertyName - The name of the CSS property to get the value of.
 * @returns The value of the CSS property.
 * @example
 * ```ts
 * const color = getRootCssValue('--color-primary')
 * ```
 * @see https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle
 */
export const getRootCssValue = (propertyName: string) =>
  getComputedStyle(document.documentElement).getPropertyValue(propertyName)
