import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {AuthProvider }from './helper/AuthContext.jsx'

//need to replace the strict mode with the authprovider for safe login
createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <App />
  </AuthProvider>,
)
