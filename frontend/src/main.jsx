import { createRoot } from 'react-dom/client'
import './index.css'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import Router from './router/index'
import { Toaster } from 'react-hot-toast'
import AuthContextProvider from './context-api/AuthContextProvider'
import ThemeContextProvider from './context-api/ThemeContextProvider'

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
    <ThemeContextProvider>
      <AuthContextProvider>
        <Router />
        <Toaster position="top-center" toastOptions={{
          duration: 3000,
          removeDelay: 1000,
          style: {
            textAlign: 'center',
            background: "#ffffff",
            color: "#333",
            padding: "12px",
            borderRadius: "8px",
          },
        }} />
      </AuthContextProvider>
    </ThemeContextProvider>
  </QueryClientProvider>
)
