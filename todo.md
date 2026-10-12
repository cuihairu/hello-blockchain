# todo

登记来源：用户 2026-10-12。每条含期次、验收口径与来源；已开工的条目在其下方补进度与证据。

## hello-blockchain

- [x] **P1 分层章节：计算层 / 存储层 / 结算层 / 服务发现（对标 DNS）**
  - 期次：P1
  - 验收口径：新增「分层架构」章节，四层各一页，每页含五要素——定义、解决的问题、现有系统、开源清单、失败模式；四层自顶向下（服务发现 → 计算 → 存储 → 结算）的调用与信任关系写清，结算层为信任锚；每页与共识、记账模型、隐私、公链章节互链；进入 SUMMARY.md 与 sidebar.json，并被知识摘要（/knowledge）收录；`npm run docs:check`、`npm run docs:links`、`npm run docs:build` 全绿，README 目录树同步。
  - 来源：用户 2026-10-12
  - 进度：已完成。新增 `docs/layers/` 五页——总览（四层模型、层间信任传递、与站内章节映射、选型直觉）+ 计算层 / 存储层 / 结算层 / 服务发现（各含五要素，服务发现附对标 DNS 对照表）。已接入 SUMMARY.md、sidebar.json、knowledge.md（新增「主题：分层架构」并收录五页）、首页 feature 卡、README 与 README.zh 目录树。
  - 证据：`npm run docs:check` ok（86 pages / 91 sidebar links）；`npm run docs:links` ok（56 external URLs reachable）；`npm run docs:build` complete；`npm run docs:walkthrough` 无 console/page error、无坏链、无侧边栏失败。

- [x] **P2 共识扩充到尽量全（四要素模板，旧 23 条升模板）**
  - 期次：P2
  - 验收口径：每个共识页统一四要素模板——在哪一层（对应 P1 四层模型）、解决什么、解决得怎么样（优点、缺点、已发生的事故或失败模式）、出处（论文或白皮书，链接可访问）；现有 23 个共识页全部升级为新模板；新增页覆盖主流缺失算法（HotStuff、Casper/FFG、Gasper、GRANDPA、BABE、Ouroboros、Algorand BA、Hashgraph、Lachesis、Snowman、Narwhal/Bullshark、Streamlet、DiemBFT、QBFT/AuRa、RPCA、PoRep/PoSt、GHOST/LMD-GHOST 等）；时间线与知识点总纲同步；共识篇数声明在 README.md、README.zh.md、首页、简介、共识演进时间线五处同步更新；`npm run docs:check`、`npm run docs:links`、`npm run docs:build` 全绿。
  - 来源：用户 2026-10-12
  - 进度：已完成。旧 23 页全部插入「四要素」区块（在哪一层 / 解决什么 / 解决得怎么样 / 出处）；新增 16 页——HotStuff、Gasper、GRANDPA、BABE、Ouroboros、Algorand、DiemBFT、QBFT、Snowman、Lachesis、Hashgraph、RPCA、GHOST、NarwhalBullshark、SPOS、Streamlet，每页含四要素 + 机制 + 同族差异表。共识篇数 23 → 39，五处声明（README.md、README.zh.md、docs/index.md、docs/Introduction.md、docs/consensus-timeline.md）同步。时间线同步：timeline.ts 新增 4 节点（XRP 2012、Hashgraph 2018、Polkadot 2020、Sui 2023 → 34 节点），consensus-timeline.md 新增 2 行（Hashgraph 2018、Narwhal/Bullshark 2021 → 51 条年表），五处计数声明同步。knowledge.md 补 6 行论文出处与官方文档行。
  - 证据：`npm run docs:check` ok（104 pages / 110 sidebar links）；`npm run docs:links` ok（57 external URLs reachable）；`npm run docs:build` complete；`npm run docs:walkthrough` 无 console/page error、无坏链、无侧边栏失败。

- [x] **P3 知识卡片索引（跨章成网，时间线与术语表同步）**
  - 期次：P3
  - 验收口径：新增知识卡片索引页，把各章概念抽成卡片并互链成网（每张卡片回链到主题页与出处）；时间线（发展史时间线、共识算法演进时间线）与术语表同步补新条目与交叉引用；`npm run docs:check`、`npm run docs:links`、`npm run docs:build` 全绿。
  - 来源：用户 2026-10-12
  - 进度：已完成。新增 `docs/cards/Cards.md`（知识卡片索引：36 张卡片按结算层 / 计算层 / 存储层 / 服务发现 + 两条横切线组织，每张含一句话定义、相邻互链、详解出处）与 `docs/cards/Glossary.md`（术语表：70 个术语按六个领域平铺，每条一句话定义 + 站内详解）。已接入 SUMMARY.md、sidebar.json、knowledge.md（头部收录两页）、首页 feature 卡、README 与 README.zh 目录树。
  - 证据：`npm run docs:check` ok（104 pages / 110 sidebar links）；`npm run docs:links` ok（57 external URLs reachable）；`npm run docs:build` complete；`npm run docs:walkthrough` 无 console/page error、无坏链、无侧边栏失败。
