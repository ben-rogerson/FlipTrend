import { type ReactNode } from 'react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { describe, it, expect, vi, beforeEach } from 'vitest'
import { renderHook, waitFor } from '@testing-library/react'
import { useCompanyData } from '@/hooks/useCompanyData'
import { api } from '@/api'
import mockApiResponse from './../../test/fixtures/api.json'

const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: { queries: { retry: false } },
  })
  // eslint-disable-next-line react/display-name
  return (props: { children: ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  )
}

const apiMock = vi.spyOn(api, 'fetchCompanies')

describe('useCompanyData', () => {
  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('should fetch companies', async () => {
    apiMock.mockResolvedValue(new Response(JSON.stringify(mockApiResponse)))

    const { result } = renderHook(() => useCompanyData(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => {
      expect(result.current.companies).toHaveLength(2)
      expect(result.current.error).toBeNull()
      expect(apiMock).toHaveBeenCalledTimes(1)
    })
  })

  it('should error when api is down', async () => {
    apiMock.mockRejectedValue('Failed to fetch')

    const { result } = renderHook(() => useCompanyData(), {
      wrapper: createWrapper(),
    })

    await waitFor(() => {
      expect(result.current.companies).toStrictEqual([])
      expect(result.current.error).toBe('Failed to fetch')
      expect(apiMock).toHaveBeenCalledTimes(1)
    })
  })
})
