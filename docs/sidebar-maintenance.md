# Site navigation maintenance

Each locale's sidebar is maintained in exactly one file: the English sidebar is [`docs/.vitepress/sidebar.en.json`](.vitepress/sidebar.en.json) and the Chinese sidebar is [`docs/.vitepress/sidebar.zh.json`](.vitepress/sidebar.zh.json). The VitePress config imports both directly. `docs/SUMMARY.md` is a leftover from the mdBook era that now only carries the navigation maintenance note; it is no longer a hand-written table of contents.

When adding, removing or restructuring a page, update the `sidebar.*.json` of the locale that owns the page, then run `npm run docs:check`: it verifies that every sidebar route exists, that every page is listed in the sidebar, that internal links resolve, and that the README directory trees and headline numbers still match the content. Do not edit `SUMMARY.md` as if it were a second navigation source; if a compatibility tool needs a table of contents, derive it from the sidebar files.

When a sidebar group's title is the same as its first page, keep the route link on the child item only, so one route never shows up twice in the same sidebar. Reusing a route across groups is still fine when content discovery calls for it.
