# Content-Structure Change Review (2026-10-19)

## Review Scope

First ran `git fetch origin && git pull --rebase origin main`, which returned `Already up to date.`; the working tree was clean at the start.

Reviewed the four most recent commits against the repository's actual history (`git log --oneline -4`, range `HEAD~4..HEAD`):

- `586c208` docs: audit documentation structure
- `004c6e3` Make sidebar the navigation source
- `997a81e` Clarify distinct timeline perspectives
- `4f4fbeb` Align docs copy and overview counts

Of these, `586c208` only adds a structure audit report; the SUMMARY slimming and the sidebar changes happened in `004c6e3`; the timeline wording in `997a81e`; the README and overview copy in `4f4fbeb`. This report therefore covers the actual four most recent commits and does not speculate about A/B/C labels for earlier commits.

## Conclusions of the Four Checks

### 1. Content loss: none clearly found

- `docs/SUMMARY.md:1-5`: the previous state was a 153-line hand-written table of contents, the current state is a navigation maintenance note. The 151 Markdown links in the deleted table of contents were extracted one by one and de-duplicated, yielding 140 unique targets; all 140 targets are still present in the current `docs/.vitepress/sidebar.json`. Duplicates included cases where a table-of-contents heading and its first child pointed at the same page. The newly added maintenance note and structure-audit pages also each have their own sidebar entry. So this slimming removed no substantive page and no uniquely-reachable page entry.
- `docs/.vitepress/sidebar.json:36-39`, `:69-82`, `:555-561` and so on: the old links on group headings (for example “知识卡片与术语”→`/cards/Cards`, “数据结构”→`/algo/MerkleTree`, “联盟链”→`/consortium/Consortium`) were removed, but the same targets remain as children inside the groups; page bodies were not edited because of this.
- `docs/.vitepress/backlinks.json`: the change is a reordering of the backlink index, with reference relations added and removed and two new pages indexed; it is an index generated from page links, not body content. The changes inside the current backlink scope do not show any uniquely-reachable body paragraphs being moved or lost.

### 2. Wording changes: no clear technical-meaning reversals or number errors found

- Number recheck: the consensus directory currently has 53 Markdown files, of which `Consensus.md` is the overview, leaving 52 algorithm deep-dives; the development history data source has 49 nodes; the consensus timeline master table has 64 data rows and the main-chain mapping table has 35 data rows. These match the statements in `docs/Introduction.md:13,18,24`, `docs/index.md:30,39,42`, `README.md:46-47`, `README.zh.md:46-47`. `npm run docs:check` also passes its claim-number validation.
- `docs/Introduction.md:5` changed “系统性学习笔记” to “个人区块链学习笔记与开发经验整理”; `:22-28` recast the reading route as topical entry angles and adjusted the prerequisite-knowledge wording. A line-by-line comparison found no reversal of protocol support/non-support, technical mechanism or security conclusion.
- Timeline scope: `docs/consensus-timeline.md:346`, `docs/nav/ByTime.md:3`, `docs/timeline.md:17` describe algorithm origin/adoption, the reason for a historical event, and mainnet launch ordering respectively. Against the page titles, table contents and timeline data, the three boundaries match; nothing rewrites one topic as another's content.
- The rule removing duplicated group-level links from the sidebar is written in `docs/sidebar-maintenance.md:7` and is consistent with how the actual JSON was changed.

### 3. Links and navigation: script checks pass, manual spot checks on topic match

- Ran `npm run docs:check`: `check-nav: ok (143 pages, 142 sidebar links)`. The page count includes the home route; every non-home page has a sidebar entry, and every sidebar target exists. For the note on the single source of the sidebar, see `docs/.vitepress/config.mts:119`, `docs/sidebar-maintenance.md:3-5`.
- All 140 unique targets of the old SUMMARY are covered by the current sidebar. Manual spot checks of the rewritten entry points: `docs/Introduction.md:22-24` point respectively at the ledger models, the Merkle tree, opcodes, BIPs, chain games, the knowledge digest and the consensus timeline; `docs/consensus-timeline.md:346` points at the development history and the by-time navigation; `docs/nav/ByTime.md:3` points at both timelines. Target page topics match the link text.
- Removed sidebar targets remain as children: `/cards/Cards`, `/algo/MerkleTree`, `/opcode/OP_CHECKSIG`, `/btc/BIPS`, `/Privacy/Privacy`, `/hacking/Attack`, `/nft/TokenizedProtocol`, `/consortium/Consortium`, `/dcny/Dcny`, `/chain-games/ChainGames`, `/dapp/Dapp`, `/nav/ByConsensus`, `/trends/Trends` all correspond to an existing page and a child entry.
- The external-link reachability check was not run; this change set touches no external link targets. No per-page visual walk-through in a browser was done either, so the rendered interactive state is unverified.

### 4. Unverified items and limitations

- Live reachability of external links: unverified; the change set does not touch external URLs, and reachability varies with the state of the sites.
- Sidebar expand/collapse and visual rendering in a browser: unverified; this review is a static check over the JSON, page files and internal routes.
- The historical structure audit report `docs/review/structure-audit-2026-10-19.md` describes the state at the time of its own commit; its then-outdated statements about SUMMARY were not mistaken for current navigation rules.

## List of Issues Found

| Severity | Issue | Evidence | Fixed | Fix commit |
|---|---|---|---|---|
| — | No clearly identified content loss, number error, reversed technical meaning or misdirected navigation | The four checks above; `npm run docs:check` passes | Not applicable | Not applicable |

## Conclusion

**These structure and wording changes can be treated as accepted (within the static content and navigation scope)**: across the four commits reviewed here, no error requiring an immediate fix was found. Live external-link state and browser rendering are unverified, which does not affect the static acceptance conclusion above.
