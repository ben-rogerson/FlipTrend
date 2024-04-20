import { Route, Switch } from 'wouter'
import { ErrorBoundary } from 'react-error-boundary'
import { ErrorDisplay } from '@/components/ErrorDisplay'
import { MainContent } from '@/components/MainContent'

export const AppRoutes = () => (
  <Switch>
    <Route path="/" nest>
      <ErrorBoundary FallbackComponent={ErrorDisplay}>
        <Route path="/" component={MainContent} />
        <Route path="/:countryId" component={MainContent} />
      </ErrorBoundary>
    </Route>
    <Route>
      <ErrorDisplay error="404: No such page!" />
    </Route>
  </Switch>
)
