import { lazy, Suspense } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import AdminLogin from '@/pages/login';
import AdminDashboard from '@/pages/dashboard';

// Lazy-load secondary views to reduce initial bundle size and speed up first paint
const AdminLeads = lazy(() => import('@/pages/leads'));
const AdminUsers = lazy(() => import('@/pages/users'));
const AdminLoads = lazy(() => import('@/pages/loads'));
const AdminRateConfirmations = lazy(() => import('@/pages/rate-confirmations'));
const RateConfirmationPrint = lazy(() => import('@/pages/rate-confirmation-print'));
const AdminTodos = lazy(() => import('@/pages/todos'));

const queryClient = new QueryClient();

function ViewLoader() {
  return (
    <div className="min-h-[50vh] flex items-center justify-center">
      <div className="h-7 w-7 animate-spin rounded-full border-2 border-primary/20 border-t-primary" />
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<ViewLoader />}>
      <Switch>
        <Route path="/login" component={AdminLogin} />
        <Route path="/" component={AdminDashboard} />
        <Route path="/leads" component={AdminLeads} />
        <Route path="/users" component={AdminUsers} />
        <Route path="/loads" component={AdminLoads} />
        <Route path="/rate-confirmations" component={AdminRateConfirmations} />
        <Route path="/rate-confirmations/:id/print" component={RateConfirmationPrint} />
        <Route path="/todos" component={AdminTodos} />
        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
