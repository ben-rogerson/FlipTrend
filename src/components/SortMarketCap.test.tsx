import { describe, it, expect } from 'vitest'
import { render, screen, within } from '@testing-library/react'
import { SortMarketCap } from '@/components/SortMarketCap'
import { act } from 'react-dom/test-utils'

describe('SortMarketCap', () => {
  it('should have a default sort of desc', () => {
    render(<SortMarketCap />)

    expect(window.location.search).toBe('')

    const container = within(screen.getByTestId('market-cap-status'))

    // Test pressing the low to high label
    act(() => {
      screen.getByLabelText('Sort low to high').click()
    })
    expect(window.location.search).toBe('?sort=asc')
    // GOTCHA: Have to check presence of class instead of .toBeVisible() as jsdom doesn’t read the css
    expect(container.getByText('Low to High')).not.toHaveClass('opacity-0')
    expect(container.getByText('High to Low')).toHaveClass('opacity-0')

    // Test pressing the high to low label
    act(() => {
      screen.getByLabelText('Sort high to low').click()
    })
    expect(window.location.search).toBe('')
    expect(container.getByText('Low to High')).toHaveClass('opacity-0')
    expect(container.getByText('High to Low')).not.toHaveClass('opacity-0')
  })
})
