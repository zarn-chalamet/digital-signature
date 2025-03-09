import { createRoot } from 'react-dom/client'
import './index.css'
import AuthContextProvider from './context-api/AuthContextProvider'
import Router from './router'
import ThemeContextProvider from './context-api/ThemeContextProvider'

createRoot(document.getElementById('root')).render(
  <ThemeContextProvider>
    <AuthContextProvider>
      <Router />
    </AuthContextProvider>
  </ThemeContextProvider>
)
