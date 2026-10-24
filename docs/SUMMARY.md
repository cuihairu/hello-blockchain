# Navigation maintenance note

This file is kept for historical compatibility; no hand-written table of contents is maintained any more. VitePress builds the sidebars from two files, one per locale:

- `docs/.vitepress/sidebar.en.json` — the English tree at the docs root (`/`)
- `docs/.vitepress/sidebar.zh.json` — the Chinese tree under `docs/zh/` (`/zh/`)

Adding, removing or restructuring a page means editing the sidebar of the locale that owns the page, then running `npm run docs:check` to verify sidebar targets, page coverage, internal links, the knowledge digest and the headline counts. Do not rebuild a table of contents here: entries written in this file do not drive the site sidebar. The directory trees in the root README describe source directories only, not navigation data.
