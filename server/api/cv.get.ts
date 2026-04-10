import { readFileSync } from 'fs'
import { join } from 'path'

export default defineEventHandler(() => {
  const filePath = join(process.cwd(), 'public', 'cv.json')
  const data = JSON.parse(readFileSync(filePath, 'utf-8'))
  return data
})
