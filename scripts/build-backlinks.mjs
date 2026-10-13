#!/usr/bin/env node
// Scans docs/**/*.md for internal links (](/route)) and writes docs/.vitepress/backlinks.json,
// which the VitePress markdown plugin (config.mts) reads to append the per-page
// 「反向链接」 block at build time. Links inside fenced code blocks are ignored.

import { readFileSync, writeFileSync, readdirSync, statSync, mkdirSync } from 'node:fs'
import { join, dirname, relative } from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..')
const DOCS = join(ROOT, 'docs')
const OUT = join(DOCS, '.vitepress', 'backlinks.json')

function walk(dir) {
  const out = []
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    const st = statSync(p)
    if (st.isDirectory()) {
      if (name === '.vitepress' || name === 'node_modules') continue
      out.push(...walk(p))
    } else if (name.endsWith('.md')) {
      out.push(p)
    }
  }
  return out
}

// docs/X.md -> /X ; docs/X/Y.md -> /X/Y ; docs/index.md -> /
function fileToRoute(file) {
  let rel = relative(DOCS, file).replace(/\.md$/, '')
  if (rel === 'index') return '/'
  return '/' + rel.replace(/\/index$/, '')
}

// first "# ..." heading as display title
function pageTitle(text) {
  const m = text.match(/^# (.+)$/m)
  return m ? m[1].trim() : fileToRoute('')
}

// strip fenced blocks so code samples never count as links
function stripFences(text) {
  return text.replace(/^```[\s\S]*?^```/gm, '')
}

const files = walk(DOCS).filter((f) => !f.endsWith('SUMMARY.md'))
const titles = {}
const backlinks = {} // route -> [{ r, t }]
let totalLinks = 0

for (const file of files) {
  const route = fileToRoute(file)
  titles[route] = pageTitle(readFileSync(file, 'utf-8'))
}

for (const file of files) {
  const src = fileToRoute(file)
  const text = stripFences(readFileSync(file, 'utf-8'))
  const re = /\]\((\/[^)#\s]+)(?:#[^)\s]*)?\)/g
  for (const m of text.matchAll(re)) {
    const target = m[1]
    if (target === src) continue
    if (!titles[target]) continue // dead link — reported by docs:build / walkthrough
    totalLinks++
    if (!backlinks[target]) backlinks[target] = []
    if (!backlinks[target].some((b) => b.r === src)) {
      backlinks[target].push({ r: src, t: titles[src] })
    }
  }
}

mkdirSync(dirname(OUT), { recursive: true })
writeFileSync(OUT, JSON.stringify({ titles, backlinks }, null, 1))

const pagesWithBacklinks = Object.keys(backlinks).length
const orphans = files
  .map(fileToRoute)
  .filter((r) => !backlinks[r] && r !== '/')
console.log(`build-backlinks: ${files.length} pages, ${totalLinks} internal link instances`)
console.log(`build-backlinks: ${pagesWithBacklinks} pages have backlinks, ${orphans.length} pages have none`)
for (const o of orphans) console.log(`  no-backlink: ${o}`)
