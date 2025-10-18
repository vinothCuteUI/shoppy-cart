import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import "./assets/dist/ebx.style.css"
import './index.css'
import App from './App.jsx'
import { Provider } from 'react-redux'
import store from './store/store.js'
import { setupInterceptorsApi } from './services/api.js'

setupInterceptorsApi(store);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
)
