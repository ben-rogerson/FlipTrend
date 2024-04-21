import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ErrorBoundary } from 'react-error-boundary'
import { AppRoutes } from '@/AppRoutes'
import { ErrorDisplay } from '@/components/ErrorDisplay'
import { BaseLayout } from '@/layouts/BaseLayout'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

const queryClient = new QueryClient({
  defaultOptions: { queries: { retry: 1 } },
})

const App = () => (
  <div data-testid="app">
    <ErrorBoundary FallbackComponent={ErrorDisplay}>
      <QueryClientProvider client={queryClient}>
        <BaseLayout>
          <AppRoutes />
        </BaseLayout>
        {/* <ReactQueryDevtools initialIsOpen={false} /> */}
      </QueryClientProvider>
    </ErrorBoundary>
  </div>
)

export default App
