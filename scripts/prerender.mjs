import { launch } from 'puppeteer'
import { readFileSync, writeFileSync, existsSync, createReadStream } from 'fs'
import { resolve, join, extname } from 'path'
import { createServer } from 'http'

const PORT = 4173
const DIST = resolve('dist')

const MIME = {
  '.html': 'text/html',
  '.js': 'application/javascript',
  '.css': 'text/css',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.json': 'application/json',
  '.xml': 'application/xml',
  '.txt': 'text/plain',
  '.woff2': 'font/woff2',
}

const server = createServer((req, res) => {
  let filePath = join(DIST, req.url === '/' ? 'index.html' : req.url)
  if (!existsSync(filePath)) {
    filePath = join(DIST, 'index.html')
  }
  const ext = extname(filePath)
  res.setHeader('Content-Type', MIME[ext] || 'application/octet-stream')
  createReadStream(filePath).pipe(res)
})

server.listen(PORT, async () => {
  console.log(`Prerender server started on http://localhost:${PORT}`)

  try {
    const browser = await launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    })
    const page = await browser.newPage()
    await page.goto(`http://localhost:${PORT}`, {
      waitUntil: 'networkidle0',
      timeout: 30000,
    })
    await page.waitForSelector('#root > *', { timeout: 10000 })

    const rootHtml = await page.evaluate(() => {
      return document.getElementById('root').outerHTML
    })

    const originalHtml = readFileSync(join(DIST, 'index.html'), 'utf-8')
    const rendered = originalHtml.replace('<div id="root"></div>', rootHtml)

    writeFileSync(join(DIST, 'index.html'), rendered)
    console.log('Prerendering complete.')
    await browser.close()
  } catch (err) {
    console.error('Prerendering failed:', err.message)
    console.log('Falling back to client-side rendering.')
  }

  server.close()
})
