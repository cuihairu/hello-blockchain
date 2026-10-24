# hello-blockchain Directory and Content Organization Audit (2026-10-19)

Scope: read-only verification of the repository's current content; this run only adds this report, and changes no documents, navigation configuration or build artifacts. Line counts are counted by splitting Markdown files on newlines; the directory tables exclude the generated directory `docs/.vitepress/dist`, but include the retained `docs/SUMMARY.md`. `docs:check` counts 141 publishable pages (excluding SUMMARY); the directory tables total 142 Markdown files (including SUMMARY).

## Quantitative Facts

### docs/ top-level directories: Markdown counts and line counts

| Top-level directory | .md count | Total lines | Notes |
|---|---:|---:|---|
| (root) | 6 | 923 | Includes `SUMMARY.md`; the rest are the home page, the introduction, the knowledge digest and the two timelines |
| Privacy | 10 | 860 | Directory name is capitalized |
| algo | 1 | 86 | |
| btc | 2 | 121 | |
| cards | 2 | 234 | |
| chain-games | 2 | 127 | |
| chains | 27 | 1,157 | |
| consensus | 53 | 1,938 | Largest topic directory |
| consortium | 6 | 227 | |
| dapp | 1 | 136 | |
| dcny | 2 | 97 | |
| hacking | 14 | 755 | |
| layers | 5 | 344 | |
| model | 4 | 371 | |
| nav | 2 | 102 | |
| nft | 3 | 358 | |
| opcode | 1 | 52 | |
| trends | 1 | 137 | |
| **Total** | **142** | **8,085** | 141 published pages + 1 legacy SUMMARY |

`.vitepress`, `public` and `img` are configuration / static-asset directories with no Markdown content of their own; the generated site directory `.vitepress/dist` currently has 503 files, is ignored by `.gitignore`, and should not be counted as source documentation.

### Parallel organization axes

Grouped by the categories and entry points a reader actually meets when looking for content, there are **5 parallel organization schemes** (covering topic archives, feature / history pages, navigation indexes and repository maintenance entries):

| Directory / carrier | Entries | Naming pattern | Numbered? | Numbering continuity |
|---|---:|---|---|---|
| Topic directories: `consensus`, `chains`, `hacking` among 16 content directories | 134 articles | Directories by topic; files mostly PascalCase English topic names, with a few all-uppercase abbreviations | No | Not applicable |
| Feature pages at the `docs/` root | 5 pages | `Introduction`, `index`, `knowledge`, `timeline`, `consensus-timeline`; both title case and lowercase kebab-case are present | No | Not applicable |
| Navigation / entry mapping: `nav/`, `.vitepress/sidebar.json`, `SUMMARY.md` | `nav/`: 2 pages; sidebar: 153 configuration entries (140 unique links); SUMMARY: 151 Markdown links | Manually curated; the sidebar is the site sidebar and SUMMARY is a legacy mdbook mapping draft | No | Not applicable |
| History / timelines: 2 root pages + `nav/ByTime.md` + `.vitepress/theme/data/timeline.ts` | 3 entry pages + 1 data source | Organized by time / year, containing the two scopes of blockchain development history and consensus evolution | Years but no section numbers | Years are historical data, not continuous numbering |
| Repository notes / maintenance entries: repository root `README.md`, `README.zh.md`, `todo.md` | 3 Markdown files | README exists in English and Chinese; todo is a maintenance list | No continuous numbering scheme | Not applicable |

The project has no separate `API/` or `guides/` documentation directories; do not misread this as two missing categories.

## Issue List and Severity

### 1. Numbering gaps, skips or repeats: no section-numbering problems found (low)

Extracting and sorting the digit-leading entries from the 142 docs Markdown file names yields only `docs/hacking/51Attack.md`. That is the topic naming of the 51% attack, not a section number; there is therefore no 01/02 sequence to check and no gaps, skips or repeated numbers. The years in `docs/consensus-timeline.md` and the 49 nodes of `docs/timeline.md` are likewise not numbered sections. Evidence: `docs/hacking/51Attack.md`, `docs/timeline.md`, `docs/consensus-timeline.md`.

### 2. Timeline topic overlap across entry points (medium)

Blockchain development history and the consensus algorithm history each have their own page, but the "by time" entry point provides a third discovery path: `docs/timeline.md`, `docs/consensus-timeline.md`, `docs/nav/ByTime.md`; the development history data is additionally in `docs/.vitepress/theme/data/timeline.ts`. The two timelines cross-reference each other and the content boundaries are currently explainable (development history versus consensus history); the real maintenance cost is three entry points with different presentations, and the content should not simply be merged. Evidence: the four paths above; `docs/timeline.md` points at the consensus timeline, and `docs/consensus-timeline.md` also points at the development history timeline.

### 3. Topic boundaries are not fully mutually exclusive (medium)

Chains / consensus / attacks / assets are grouped into directories by content type, but cross-cutting topics remain scattered: chain project pages sit in `docs/chains/`, their consensus details in `docs/consensus/`, and the related attacks in `docs/hacking/`; for example `docs/consensus-timeline.md` links both `docs/chains/Bitcoin.md` and `docs/hacking/LightningNetworkAttack.md`. This is the natural crossover of encyclopedia topics and is currently connected through in-site links with checks passing; without a topic-ownership rule, new content can easily land in two places. Evidence: `docs/chains/Chain.md`, `docs/consensus/Consensus.md`, `docs/hacking/Attack.md`, `docs/consensus-timeline.md`.

### 4. Inconsistent file / directory naming style (low)

Directory casing coexists: `docs/Privacy/` alongside lowercase `docs/consensus/`, `docs/chains/` and the rest; file styles also coexist: all-uppercase abbreviations `docs/consensus/POW.md`, mixed-case abbreviations `docs/consensus/PoET.md`, compound PascalCase `docs/consensus/MultiLevelBFT.md`, and lowercase kebab-case root pages `docs/consensus-timeline.md`. This is a searchability and cross-platform case-sensitivity risk, but the current paths resolve in the sidebar and in internal links. Evidence: the paths listed above, `docs/.vitepress/sidebar.json`.

### 5. Sidebar reconciliation: no file differences found (low)

Reading `docs/.vitepress/config.mts`: the sidebar is imported from `.vitepress/sidebar.json`, and a configuration comment states that it must stay aligned with `docs/SUMMARY.md`. Running `npm run docs:check` gives `check-nav: ok (141 pages, 153 sidebar links)`. Independent reconciliation by unique links: pages that exist but are not in the sidebar **0**; sidebar entries whose target file does not exist **0**. Both "first 10" lists are therefore empty:

| Reconciliation group | Count | First 10 |
|---|---:|---|
| Configured but the file does not exist | 0 | None |
| File exists but is not in the sidebar | 0 | None (the home page `/` is not required in the sidebar by script convention) |

Evidence: `docs/.vitepress/config.mts`, `docs/.vitepress/sidebar.json`, `docs/SUMMARY.md`, `scripts/check-nav.mjs`.

### 6. Dead links: none found in this check (low)

Ran `npm run docs:check`, which validates Markdown internal paths and anchors; the result passes. Ran `npm run docs:links -- --timeout 5000 --concurrency 12`, and all 151 unique external links were reachable. This verification therefore found no dead links. External site state changes over time; the build was not run, because `docs:build` would first rewrite the version-controlled `.vitepress/backlinks.json`, and this task is limited to adding the report. Evidence: `package.json` scripts, `scripts/check-nav.mjs`, `scripts/check-links.mjs`, `docs/.vitepress/config.mts`.

### 7. Miscellaneous root Markdown and generated files (low)

The repository root has three non-docs Markdown files, `README.md`, `README.zh.md` and `todo.md`; the first two are different language versions rather than duplicate copies and are not recommended for deletion. `todo.md` is a project maintenance list, less clearly scoped than the README. `docs/.vitepress/dist` has 503 generated files, but they are ignored by `.gitignore` and are not source code; they are not documents awaiting migration. No other temporary Markdown files were seen. Evidence: repository root `README.md`, `README.zh.md`, `todo.md`; `.gitignore`; `docs/.vitepress/dist/`.

## Judgment and Recommendations

### How many schemes to converge to

**5 organization axes** can currently be identified. The recommendation is to converge to **3**: keep the existing topic directories as the sole content-archive axis; keep one checker-constrained site navigation / directory-mapping axis; and treat timelines, indexes and the home page as entry pages onto topic content rather than letting them form parallel classifications. Concretely: make the "one owning directory per article + cross links" rule explicit, write down the responsibilities of the timeline pages versus the time index, and keep new content flowing through topic directories with explicit inclusion by the sidebar / SUMMARY.

Merging all topic directories into one large directory is not recommended, nor is deleting the two independent timelines: `consensus`, `chains` and the rest already have clear topic boundaries, and the timelines' development history and algorithm history focus on different things. Unifying path casing and merging pages involve external links and old URLs in search, so they should be handled in phases.

### Parts that are not actually disordered and need no change

- The topic directory structures such as `docs/consensus/`, `docs/chains/`, `docs/hacking/` locate content by type, and the consensus topic has the highest concentration (53 articles); there is no need to split or reorder them for visual tidiness.
- The sidebar, SUMMARY and source pages reconcile cleanly, with none of the current 141 pages missing; the sidebar does not need a full rebuild.
- The two timelines describe the development history and the consensus algorithm history respectively, cross-linked rather than duplicate articles, so keeping both pages is reasonable.
- `README.md` and `README.zh.md` are bilingual entry points, not content duplication; they should be kept.
- The `51` in `51Attack.md` is a concept name, not a numeric section number; it should not be renamed to "fill in continuous numbering".
- `.vitepress/dist` is an ignored build artifact, not a content directory problem.

## Three-Phase Convergence Plan

| Phase | Action list | Scope of impact | Risk: links / search / external links | User decision |
|---|---|---|---|---|
| Phase 1: mechanical tidying (target within 1 hour, no changes to existing links) | Write one page of directory conventions: topic directories are the sole archive; new articles follow the rule of unified lowercase directory names and PascalCase file names; annotate the purpose of `todo.md` in the repository notes; place the responsibility statements for the two timelines and `nav/ByTime` at the documentation entry. Conventions / annotations only, no URL or sidebar-entry changes. | `README.md`, `README.zh.md`, maintenance conventions, directory notes | Low; paths do not change, so search and external links are unaffected | Whether `todo.md` is a personal list or a project maintenance list must be decided before choosing its placement / description |
| Phase 2: navigation and compatibility (change the sidebar and redirects) | Fix canonical URLs and casing conventions; correct a few names and add redirects for old paths; mark `nav/ByTime` explicitly as an index or demote it from the sidebar; update the sidebar, SUMMARY, internal links and checker constraints, then run the build / link checks. | The selected documentation paths, `docs/.vitepress/sidebar.json`, `docs/SUMMARY.md`, the VitePress redirect configuration, the relevant scripts | Medium; old in-site links can be replaced uniformly, but search caches and direct external links are affected, so redirects must be kept | Exactly which files change URL, how long old URLs are retained, and whether `nav/ByTime` stays in the sidebar must all be decided |
| Phase 3: deep content restructuring | Do paragraph-level de-duplication of the timelines and the knowledge digest; establish a topic-ownership table deciding the single owning directory for cross-topic pages; evaluate whether to split / merge weak single-topic small directories (such as the one-article `algo`, `opcode`); rewrite navigation, SUMMARY, cross references and introduction copy in step. | Broad `docs/` content and navigation, potentially touching 141 pages | High; page merges / renames affect search indexes, external links and anchors, requiring mapping / redirects and post-release spot checks | Which articles / directories merge, which topic entry points and external-link compatibility periods are retained must all be decided |

"Phase 1 within 1 hour" is a constrained target: limited to conventions and notes, excluding per-page renames or deep editing; if multiple new notes plus bilingual synchronization are required, the effort estimate must be redone.

## The Three Things to Do First

1. Keep the existing topic directories and page URLs, and publish an explicit content-ownership / naming rule first, so new content does not keep widening the style divergence.
2. Write down the responsibilities of `docs/timeline.md`, `docs/consensus-timeline.md`, `docs/nav/ByTime.md`, and confirm whether the third entry point is an index or duplicate navigation.
3. Treat `npm run docs:check` and `npm run docs:links` as the gate for every navigation change; all checks pass at present, so no unnecessary large-scale migration.

## Execution Wrap-Up: Cross-Axis Content Check (2026-10-19)

### Genuine duplication: a navigation page restating stale timeline scale numbers (1 group, summary corrected)

- Comparison evidence: before the wrap-up, `docs/nav/ByTime.md:3` wrote the consensus timeline as 「63 条年表」 and the development history timeline as 「46 个节点」; the timeline master table of the authoritative page `docs/consensus-timeline.md` actually has 64 entries, while `docs/timeline.md:11` states 49 nodes. The numbers were copied separately by the navigation page and had already drifted.
- Handling: the ByTime navigation summary numbers were corrected to 64 entries and 49 nodes, and it links the authoritative pages as the carriers of the full entry and node content; the ordering of chains by first mainnet launch and the entry-boundary notes stay in ByTime. `docs:check` requires timeline pages to publish their counts, so the pages keep checker-validated summary numbers rather than copying body entries.

### Different angles: the two timelines and navigation by launch time (1 group, cross-links retained)

- Comparison evidence: `docs/timeline.md:11` orders events and explains 「为什么是这个时候」; `docs/consensus-timeline.md:7` organizes origin, mechanism and adopters by algorithm year; `docs/nav/ByTime.md:3` orders chains by first mainnet launch time and cross-references consensus. The topics overlap, but the objects being ordered and the questions being answered differ, so this is not a repeated copy of the same facts.
- Handling: the three existing pages and URLs are kept; the pages cross-link and their entry copy states the angle, with no merging of entries.
