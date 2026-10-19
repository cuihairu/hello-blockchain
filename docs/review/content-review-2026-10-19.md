# 内容结构改动复核（2026-10-19）

## 复核范围

先执行 `git fetch origin && git pull --rebase origin main`，结果为 `Already up to date.`，工作区起始时干净。

按仓库真实历史复核最近 4 个提交（`git log --oneline -4`，范围 `HEAD~4..HEAD`）：

- `586c208` docs: audit documentation structure
- `004c6e3` Make sidebar the navigation source
- `997a81e` Clarify distinct timeline perspectives
- `4f4fbeb` Align docs copy and overview counts

其中 `586c208` 只增加结构审计报告；SUMMARY 精简和侧栏改动发生在 `004c6e3`；时间线口径在 `997a81e`；README 与概览文案在 `4f4fbeb`。因此本报告覆盖实际最近四个提交，不推测更早提交的 A/B/C 标签。

## 四项核查结论

### 1. 内容丢失：未发现明确丢失

- `docs/SUMMARY.md:1-5`：前态是 153 行手写目录，现态是导航维护说明。对被删目录中的 151 个 Markdown 链接逐个抽取并去重后有 140 个唯一目标；140 个目标均仍在当前 `docs/.vitepress/sidebar.json`。重复项包括目录标题与首个子项指向同页。侧栏新增的维护说明、结构审计页面也有各自入口。故本次精简未发现内容性页面或独有页面入口被删除。
- `docs/.vitepress/sidebar.json:36-39`、`:69-82`、`:555-561` 等：组标题上的旧链接（例如“知识卡片与术语”→`/cards/Cards`、“数据结构”→`/algo/MerkleTree`、“联盟链”→`/consortium/Consortium`）被移除，但相同目标仍是组内子项；页面正文未因此删改。
- `docs/.vitepress/backlinks.json`：变化是反向链接索引的重排、增删引用关系以及新增两页索引；它是由页面链接生成的索引，不是正文内容。当前反向引用范围中的改动未显示独有正文段落迁移或丢失。

### 2. 表述被改错：未发现明确技术含义反转或数字错误

- 数字复核：当前共识目录有 53 个 Markdown 文件，其中 `Consensus.md` 是总览，故 52 篇算法详解；发展史数据源有 49 个节点；共识时间线总表有 64 条数据行、主链映射表有 35 条数据行。与 `docs/Introduction.md:13,18,24`、`docs/index.md:30,39,42`、`README.md:46-47`、`README.zh.md:46-47` 的表述相符。`npm run docs:check` 亦通过声明数字校验。
- `docs/Introduction.md:5` 将“系统性学习笔记”调整为“个人区块链学习笔记与开发经验整理”；`:22-28` 将阅读路线改为主题切入角度、调整前置知识措辞。逐句对照没有把协议支持/不支持、技术机制或安全结论改反。
- 时间线口径：`docs/consensus-timeline.md:346`、`docs/nav/ByTime.md:3`、`docs/timeline.md:17` 分别描述算法来源/采用、历史事件缘由、主网上线排序。对照页面标题、表格内容与时间线数据，三者边界相符；没有把不同主题写成同一内容。
- 侧栏分组移除重复组级链接的规则写在 `docs/sidebar-maintenance.md:7`，与实际 JSON 的改法一致。

### 3. 链接与导航：脚本检查通过，人工抽查主题相符

- 执行 `npm run docs:check`：`check-nav: ok (143 pages, 142 sidebar links)`。页面数包含首页路由；所有非首页页面均有侧栏入口，侧栏目标均存在。唯一侧栏来源说明见 `docs/.vitepress/config.mts:119`、`docs/sidebar-maintenance.md:3-5`。
- 旧 SUMMARY 的 140 个唯一目标均包含在当前侧栏。人工抽查改写入口：`docs/Introduction.md:22-24` 分别指向记账模型、Merkle 树、操作码、BIP、链游、知识总纲和共识时间线；`docs/consensus-timeline.md:346` 指向发展史和按时间导航；`docs/nav/ByTime.md:3` 指向两条时间线。目标页面主题与链接文字相符。
- 侧栏删除目标仍在子项：`/cards/Cards`、`/algo/MerkleTree`、`/opcode/OP_CHECKSIG`、`/btc/BIPS`、`/Privacy/Privacy`、`/hacking/Attack`、`/nft/TokenizedProtocol`、`/consortium/Consortium`、`/dcny/Dcny`、`/chain-games/ChainGames`、`/dapp/Dapp`、`/nav/ByConsensus`、`/trends/Trends` 均对应存在页面及子项入口。
- 未运行外链可达性检查；本次改动不涉及外链目标。也未做浏览器逐页视觉走查，因此渲染后的交互状态未核实。

### 4. 未核实项与限制

- 外部链接实时可达性：未核实，改动差异未涉及外链 URL，且可达性会随站点状态变化。
- 页面在浏览器中的侧栏展开/收起与视觉呈现：未核实，本次按 JSON、页面文件和内部路由做静态复核。
- 历史结构审计报告 `docs/review/structure-audit-2026-10-19.md` 描述的是其提交时的状态；未把其中当时关于 SUMMARY 的旧状态陈述误作当前导航规则。

## 发现的问题清单

| 严重度 | 问题 | 证据 | 是否已修 | 修复提交 |
|---|---|---|---|---|
| — | 未发现明确内容丢失、数字错误、技术含义改反或导航指错 | 见以上四项；`npm run docs:check` 通过 | 不适用 | 不适用 |

## 结论

**可将这批结构与口径改动视为已验收（静态内容与导航范围）**：在本次复核的四个提交中，没有发现需要立即修复的明确错误。外链实时状态和浏览器视觉呈现未核实，不影响上述静态验收结论。
