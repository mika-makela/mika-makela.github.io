#!/usr/bin/env node
// Updates meta.lastUpdated in public/cv.json to today's date.
// Run manually or via GitHub Actions before nuxt generate.

const fs = require('fs')
const path = require('path')

const cvPath = path.join(__dirname, '..', 'public', 'cv.json')
const cv = JSON.parse(fs.readFileSync(cvPath, 'utf-8'))

cv.meta.lastUpdated = new Date().toISOString().split('T')[0]

fs.writeFileSync(cvPath, JSON.stringify(cv, null, 2) + '\n')
console.log(`✓ lastUpdated set to ${cv.meta.lastUpdated}`)
