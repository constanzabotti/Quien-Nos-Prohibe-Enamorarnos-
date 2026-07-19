import { Switch, Route, Router as WouterRouter } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "sonner";
import Home from "@/pages/Home";
import Archive from "@/pages/Archive";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/archivo" component={Archive} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
        <div className="film-grain" /> {/* Global noise overlay */}
        <Router />
        <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              background: 'hsl(var(--card))',
              color: 'hsl(var(--foreground))',
              border: '2px solid hsl(var(--border))',
              fontFamily: 'var(--font-sans)',
              borderRadius: '0px',
              boxShadow: '4px 4px 0px 0px rgba(26,26,27,1)',
            },
          }}
        />
      </WouterRouter>
    </QueryClientProvider>
  );
}

export default App;
