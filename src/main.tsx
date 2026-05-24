import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import '@styles/global.css'
import favicon32 from '@assets/fav-icon.png'
import favicon16 from '@assets/fav-icon.png'
import appleTouchIcon from '@assets/fav-icon.png'
import App from './App'

const setLink = (rel: string, href: string, type: string, sizes: string) => {
  const link = document.createElement('link')
  link.rel = rel
  link.href = href
  link.type = type
  link.sizes = sizes
  document.head.appendChild(link)
}
setLink('icon', favicon32, 'image/png', '32x32')
setLink('icon', favicon16, 'image/png', '16x16')
setLink('apple-touch-icon', appleTouchIcon, 'image/png', '180x180')

const root = document.getElementById('root')

if (!root) {
  throw new Error('Root element #root not found in the document.')
}

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
