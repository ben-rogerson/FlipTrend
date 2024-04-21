import { describe, it, expect } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useSort } from '@/hooks/useSort'
import { act } from 'react-dom/test-utils'

describe('useSort', () => {
  it('should have a default sort of desc', () => {
    const { result } = renderHook(() => useSort())
    const [sort] = result.current

    expect(sort).toBe('desc')
  })

  it('should set the url search params to sort=asc', async () => {
    const { result } = renderHook(() => useSort())
    const [, setSort] = result.current

    act(() => {
      setSort('asc')
    })

    await waitFor(() => {
      expect(window.location.search).toBe('?sort=asc')
    })
  })

  it('should set the url search params back to default', () => {
    const { result } = renderHook(() => useSort())
    const [, setSort] = result.current

    act(() => {
      setSort('desc')
    })

    expect(window.location.search).toBe('')
  })
})
