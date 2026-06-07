import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { HelmetProvider } from 'react-helmet-async'
import { SiteProvider } from '@contexts/SiteContext'
import { AdminProvider } from '@contexts/AdminContext'
import { ScrollToTop } from '@components/ScrollToTop'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <HelmetProvider>
      <BrowserRouter>
        <ScrollToTop />
        <SiteProvider>
          <AdminProvider>
            <App />
          </AdminProvider>
        </SiteProvider>
      </BrowserRouter>
    </HelmetProvider>
  </StrictMode>,
)
