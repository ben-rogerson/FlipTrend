import { ErrorBoundary } from 'react-error-boundary'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ErrorDisplay } from '@/components/ErrorDisplay'
import { AppRoutes } from '@/AppRoutes'
import { BaseLayout } from '@/layouts/BaseLayout'

const queryClient = new QueryClient()

const App = () => {
  return (
    <ErrorBoundary FallbackComponent={ErrorDisplay}>
      <QueryClientProvider client={queryClient}>
        <BaseLayout>
          <AppRoutes />
        </BaseLayout>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}

export default App
