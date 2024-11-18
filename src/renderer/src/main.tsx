import App from './App'
import * as React from 'react'
import { createRoot } from 'react-dom/client'
import EnvironmentProvider from './contexts/EnvironmentContext'

const root = createRoot(document.getElementById('root') as HTMLElement)
root.render(
  <React.StrictMode>
    <EnvironmentProvider>
      <App />
    </EnvironmentProvider>
  </React.StrictMode>
)
