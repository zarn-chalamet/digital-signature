import { createRoot } from 'react-dom/client'
import './index.css'
import AuthContextProvider from './context-api/AuthContextProvider'
import Router from './router'

createRoot(document.getElementById('root')).render(
  <AuthContextProvider>
    <Router />
  </AuthContextProvider>
)
