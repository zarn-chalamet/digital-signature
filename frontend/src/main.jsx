import { createRoot } from 'react-dom/client'
import './index.css'
import { AppContextProvider } from "./context-api/AppContext"
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Router from './router/index'

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 0
    }
  }
})

createRoot(document.getElementById('root')).render(
  <QueryClientProvider client={queryClient}>
    <ReactQueryDevtools initialIsOpen={false} buttonPosition='bottom-left' />
    <AppContextProvider>
      <Router />
    </AppContextProvider>
  </QueryClientProvider>
)
