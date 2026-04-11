import { readFileSync } from 'fs'
import { join } from 'path'

export default defineEventHandler((event) => {
  setResponseHeader(event, 'Content-Type', 'application/xml; charset=utf-8')

  const cv = JSON.parse(readFileSync(join(process.cwd(), 'public', 'cv.json'), 'utf-8'))

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>https://mikam.info/</loc>
    <lastmod>${cv.meta.lastUpdated}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
  </url>
</urlset>`
})
