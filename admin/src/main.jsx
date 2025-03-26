import { createRoot } from 'react-dom/client'
import './index.css'
import AuthContextProvider from './context-api/AuthContextProvider'
import Router from './router'
import ThemeContextProvider from './context-api/ThemeContextProvider'
import { Provider } from 'react-redux'
import store from './store/store'

createRoot(document.getElementById('root')).render(
  <ThemeContextProvider>
    <AuthContextProvider>
      <Provider store={store}>
        <Router />
      </Provider>
    </AuthContextProvider>
  </ThemeContextProvider>
)
