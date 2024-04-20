import { ErrorBoundary } from 'react-error-boundary'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { AppRoutes } from '@/AppRoutes'
import { ErrorDisplay } from '@/components/ErrorDisplay'
import { BaseLayout } from '@/layouts/BaseLayout'

const queryClient = new QueryClient()

const App = () => (
  <ErrorBoundary FallbackComponent={ErrorDisplay}>
    <QueryClientProvider client={queryClient}>
      <BaseLayout>
        <AppRoutes />
      </BaseLayout>
    </QueryClientProvider>
  </ErrorBoundary>
)

export default App
