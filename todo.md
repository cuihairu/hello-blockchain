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

- [x] **P4 共识覆盖面补齐与成网核验（续做单 2026-10-13）**
  - 期次：P4
  - 验收口径：对照覆盖面清单（PoW/PoS/DPoS/PBFT·RAFT·Paxos/PoH/PoA/PoSpace·PoRep·PoSt/Tendermint/HotStuff/Narwhal·Bullshark/Mysticeti/Optimistic·ZK 排序与结算/PoA 系/DAG 类·IOTA/VRF 系/许可链 IBFT·CFT/shared sequencing/restaking）补齐缺口；抽查 5 条四要素（含公开事故或"未找到公开记录"）；知识卡片孤卡为 0；分层章每层补设计要点卡片；构建绿再推。
  - 来源：用户 2026-10-13（续做单）
  - 进度：已完成。缺口清单：Paxos、Mysticeti、IOTA Tangle、Optimistic/ZK 排序与结算（含 shared sequencing）、restaking 预算五项缺页 → 新增 5 页（consensus/Paxos、Mysticeti、IOTA、Sequencing、Restaking），共识页 39 → 44，五处计数声明同步；IBFT 已由 QBFT 页覆盖（明示"又称 Istanbul BFT"）。抽查 PoET/Snowball/Algorand/TowerBFT/PoST 五条四要素齐全，补齐 Snowball（Avalanche 2023-02 停摆）、TowerBFT（Solana 多次全网停摆）事故记录，Algorand/PoST 标"未找到公开记录"。孤卡脚本统计 16 → 修复后 0（41 卡全部满足同层链 + 同主题链 + 跨章链）。分层章四页各补「设计要点」节。索引/侧栏/术语表(+10)/卡片(+5)/knowledge 论文表(+6 行)同步。
  - 证据：`npm run docs:check` ok、`npm run docs:links` ok、`npm run docs:build` complete、`npm run docs:walkthrough` 无错误（见 commit 记录）。

- [x] **P5 meshio 调研合并（合并调研单 2026-10-13）**
  - 期次：P5
  - 验收口径：以 meshio docs/research/comparable-chains.md（563 行，十家四节）为源，通用部分按四要素模板落成/并入对应页（不重复造页）；分层章补「服务网络对照」节（标源 meshio research）；知识卡片与时间线同步；条目标「源：meshio research（2026-10-13 合并）」；Grass 白皮书 404 的"不可考"标注保留。
  - 来源：用户 2026-10-13（合并调研单）
  - 进度：已完成。新增 4 页（consensus/SPORA、ProofOfCoverage、MultiLevelBFT、Yuma，各含四要素 + 机制 + 同族差异，均标「源：meshio research（2026-10-13 合并）」）；并入 3 页（PoST.md 补 Filecoin EC 落地样本、Tendermint.md 补 Akash 落地样本、DPOS.md 补 Livepeer 落地样本）；Layers.md 新增「服务网络对照」表（十家 × 四层，Grass 原白皮书 404 不可考标注保留）；共识页 44 → 48，时间线 +5 节点（39）+5 年表行（56），五处计数声明同步；卡片 41 → 45（孤卡 0）、术语表 80 → 86；knowledge.md 补 6 行出处。
  - 证据：`npm run docs:check` ok（113 pages）；`npm run docs:links` ok；`npm run docs:build` complete；`npm run docs:walkthrough` 无错误。

- [x] **P6 著名链章与时间线强化（新增章单 2026-10-13）**
  - 期次：P6
  - 验收口径：chains 章补齐代表性链（候选：Avalanche、Near、Sui、Aptos、Filecoin、Arweave、Lightning、Optimism、Arbitrum、zkSync——用户可增删）；每条四节：白皮书出处（只链接与要点讲解，不搬 PDF 全文）/解决什么/技术成果/局限与公开事故；与共识页、分层章交叉链接；时间线按年份强化并带出处、链接到链页与共识页；与知识卡片互通。
  - 来源：用户 2026-10-13（新增章单）
  - 进度：已完成。新增 10 页（chains/Avalanche、Near、Sui、Aptos、Filecoin、Arweave、Lightning、Optimism、Arbitrum、zkSync，各含四节 + 共识页/分层章交叉链接，白皮书只收链接与要点、标注章节，未搬任何 PDF 全文）；旧 16 链页（Bitcoin…TON）全部插入同款四节区块，原内容保留在「补充说明」。白皮书出处共 34 条外链全部 curl 验证 200（7 条失效链接已换源：nearprotocol/nearcore、aptos.dev、ethereum-optimism/specs、matter-labs/zksync-era、cosmos WHITEPAPER.md、anza-xyz/agave 等）。未找到公开事故的条目均标「未找到公开记录」（zkSync、Litecoin、Bytom、Chia、Monero 停机面、Arweave 等）。时间线强化：timeline.ts +7 节点（2016 闪电网络、2020 Near/Avalanche、2021 Arbitrum/OP、2022 Aptos、2023 zkSync Era，每条链链页 + 共识页出处）39 → 46 节点；consensus-timeline.md 总表 +7 行（含 2024 欺诈证明去许可、2025 BoLD）56 → 63 条年表；计数声明六处同步（README×2、index、Introduction、timeline、consensus-timeline）。互通：knowledge.md「有名的公链」新增 10 链清单引用与 L2 演进线（每页以 (/chains/X) 被收录）；卡片索引 45 张未动、孤卡复检 0。SUMMARY.md 与 sidebar.json 各 +10 条（26 链全量入侧栏）。
  - 证据：`npm run docs:check` ok（123 pages / 129 sidebar links）；`npm run docs:links` ok（98 external URLs reachable）；`npm run docs:build` complete（61s）；`npm run docs:walkthrough` 124 pages visited / 0 consoleErrors / 0 pageErrors / 0 badLinks / 0 sidebarFailures / timeline ok；孤卡 45/0。

- [x] **P7 三个导航维度（导航单 2026-10-13）**
  - 期次：P7
  - 验收口径：双向链接（每页底部自动生成反向链接区块 + 检查脚本，孤卡 0、断链 0）；按共识算法导航索引页（算法 → 链/首次出现/所在层/解决什么）；按时间导航（时间轴可点击 + 链按主网上线时间排序表）；三个入口进侧栏/导航栏；构建绿。
  - 来源：用户 2026-10-13（导航单）
  - 进度：已完成。①双链：新增 scripts/build-backlinks.mjs（扫描 docs/**/*.md 的站内 `](/path)` 链接——排除围栏代码块与自引用——生成 docs/.vitepress/backlinks.json，构建日志输出页数/链接实例数/无反链页数），config.mts 注入 markdown-it core 规则在每页底部自动渲染「反向链接」h2 区块（124/125 页有区块，/Introduction 无反链故无区块；链接走 VitePress link 规则自动带 base 前缀）；docs:backlinks 独立脚本 + docs:build 内部自动执行，README 两份已登记。②按共识算法导航：docs/nav/ByConsensus.md——48 行一张表（首次出现年份/算法→详解页/所在层/解决什么一句话/用了它的链→链页），行按年份排序，解决什么取自各页四要素区块。③按时间导航：docs/nav/ByTime.md——24 条链按首次主网上线排序（Tether 资产/Lightning 通道网络单列注明），共识列带算法链接；发展史时间线 46 节点本就可点击（含链页/共识页链接）。④入口：导航栏新增「导航索引」，侧栏新增同组（按共识算法/按时间），首页新增 feature 卡，SUMMARY/knowledge/README 树同步。断链 0（VitePress ignoreDeadLinks=false + walkthrough badLinks 0）、孤卡 0（45 张复检）。
  - 证据：`node scripts/build-backlinks.mjs` → 123 pages / 907 link instances / 121 pages have backlinks / 1 none；`npm run docs:check` ok（125 pages / 132 sidebar links）；`npm run docs:links` ok（98 external URLs）；`npm run docs:build` complete（47s，含反链索引）；构建产物 grep 验证 124 个 HTML 含「反向链接」区块（chains/Bitcoin、consensus/POW 抽样见报告）；`npm run docs:walkthrough` 126 pages visited / 0 consoleErrors / 0 pageErrors / 0 badLinks / 0 sidebarFailures / ok。

- [x] **P8 补漏与共识趋势展望（补漏+展望单 2026-10-13）**
  - 期次：P8
  - 验收口径：Chia 的 PoSpace+PoT 双共识写成一页（四要素齐，出处 chia.net 白皮书与官方 docs，解决得怎么样含农民成本结构与已知问题）；对照常见共识清单列缺页清单并补齐（Chia、Kaspa BlockDAG、Zilliqa 分片、Grass 带宽证明等），已有页核四要素；新增「共识趋势展望」（独立 docs/trends/ 或 consensus 章末），九条趋势各带出处、现状证据、代表项目、未来 3 年可验证观察点；与时间线互通（Chia 2021 等带出处进时间线）、知识卡片同步；构建绿才推，单 commit（英文简短）。
  - 来源：用户 2026-10-13（补漏+展望单）
  - 进度：已完成。①Chia 双共识：既有 PoSpace.md 与 POT.md 两页互链，按验收口径增强而非新建第三页——两页各补官方出处（docs.chia.net/proof-of-space/、docs.chia.net/proof-of-time/、github.com/Chia-Network/chia-blockchain），PoSpace 新增「农民（farmer）成本结构」节（k32 101.4 GiB、绘图 5min-12h、SSD 磨损、farming 7-9 次磁盘寻道 ~70-90ms、plot filter 511/512、已知问题：绘图集中化/replotting/二手硬盘/网络总空间稀释），POT 新增「时间之主（timelord）成本结构」节（VDF 类群重复平方 1024-bit 判别式无需可信设置、Wesolowski 1-64 阶段、串行耗时单线程门槛、infusion 链式结构）。②覆盖面补缺：新增 4 页——GHOSTDAG.md（BlockDAG 排序，eprint 2018/104 + kaspa repos，Kaspa 主网日期未找到公开记录如实标注）、Sharding.md（Zilliqa 网络分片，官方白皮书）、BandwidthProof.md（Grass 带宽证明，白皮书 404 不可考如实保留）、NPoS.md（Polkadot 提名权益证明，wiki.polkadot.com 出处）；18 项清单全部覆盖（Chia✓ Kaspa✓ Zilliqa✓ Grass✓ NPoS✓ + 既有 14 项）。③趋势展望：新增 docs/trends/Trends.md，九条趋势（模块化/Restaking/Shared sequencing/ZK 最终性/DAG 账本/BFT 拓扑/VRF/绿色共识/跨链互操作）各带现状证据、代表项目、未来 3 年可验证观察点、出处。④时间线互通：timeline.ts +3 节点（GHOSTDAG 2018、Zilliqa 2019、Chia 2021，46→49），consensus-timeline.md +1 行（63→64），计数六处同步（52 算法/49 节点/64 年表）；卡片 +5（45→50），术语 +9（86→96），knowledge.md 引文 +8 行，ByConsensus.md +4 行（48→52）。
  - 证据：`npm run docs:check` ok（130 pages / 138 sidebar links）；`npm run docs:links` ok（123 external URLs）；`npm run docs:build` complete（11.60s）；`npm run docs:walkthrough` 131 pages visited / 0 consoleErrors / 0 pageErrors / 0 badLinks / 0 sidebarFailures / timeline ok（chips 6, periods 5）；孤卡 50/0；反链 130 pages / 1188 link instances / 128 pages have backlinks。

- [x] **P9 四个分支章（补分支单 2026-10-13）**
  - 期次：P9
  - 验收口径：①联盟链 docs/consortium/（Fabric 通道/MSP/背书策略/KVDB、FISCO BCOS、Corda notary、Besu/Quorum IBFT、WeBASE；每家四要素 + 联盟链 vs 公链对照表）；②数字人民币 docs/dcny/（双层运营、可控匿名、ECNY 架构、官方口径「不依赖区块链」如实写并给出处、试点进展；官方来源：人民银行白皮书/公告）；③区块链游戏 docs/chain-games/（Axie/StepN/Sandbox/Decentraland + 国内合规形态如实写；经济设计专节：产出消耗闭环、防女巫、通胀模型、崩盘机制；公开事故给出处如 Ronin 6.2 亿）；④DApp docs/dapp/（架构图：前端→钱包→合约→索引器；开发栈；安全各给真实事故出处；L1/L2 选型与 gas；典型案例 Uniswap/Aave/ENS）；四章与共识页/分层章/时间线互链，卡片索引同步；查不到写「未找到公开资料」。
  - 来源：用户 2026-10-13（补分支单）
  - 进度：已完成。①联盟链：新增 6 页（consortium/Consortium 总览 + 联盟链 vs 公链对照表 10 维度、Fabric、FiscoBcos、Corda、Besu、Webase，各含四要素 + 核心机制 + 失败模式 + 与其他联盟链差异表；Fabric 出处 5 条 readthedocs URL，Corda 出处 github.com/corda/corda README（docs.r3.com 403 不可达如实标注），Besu 出处 github.com/besu-eth/besu + 4 条 docs.besu-eth.org URL，WeBASE 出处 webase-web.readthedocs.io；FISCO BCOS 死链 fisco-bcos.io 已移除）。②数字人民币：新增 2 页（dcny/Dcny 双层运营/可控匿名/账户与钱包双轨/可编程性/双离线/一币两库三中心 + 官方口径专节如实写「白皮书未出现『不依赖区块链』字面表述，为通俗推论」+ 与加密货币对照表；dcny/Pilot 试点时间线 10 条 + 规模数据 + 场景与生态 + 跨境试验；官方来源：pbc.gov.cn 白皮书 PDF + 试点页）。③区块链游戏：新增 2 页（chain-games/ChainGames 代表性项目 Axie/StepN/Sandbox/Decentraland + 国内合规形态如实写；chain-games/Economy 产出消耗闭环表 4 游戏 + 防女巫设计 + 通胀模型 + 崩盘机制 + Ronin 桥事故 $620M 2022-03 Lazarus Group 出处 BBC/Wikipedia）。④DApp：新增 1 页（dapp/Dapp 四层架构图 ASCII art + 开发栈 + 安全事故 The DAO/Ronin/跨链桥 + L1/L2 选型表 + Gas 费策略 + 典型案例 Uniswap/Aave/ENS）。四章互链：与共识页（PoA/QBFT/PBFT/RAFT）、分层章（结算层/计算层）、时间线（Fabric 2016/FISCO BCOS 2017/Corda 2016/Besu 2018/数字人民币 2014/Axie 2018/StepN 2021）交叉链接。卡片索引 +4（联盟链/DApp 四层/央行数字货币/链游经济，50→54），术语表 +18（96→114），knowledge.md 应用场景节收录 11 页，README 两份目录树同步，SUMMARY.md + sidebar.json 各 +11 条。
  - 证据：`npm run docs:check` ok（141 pages / 153 sidebar links）；`npm run docs:links` ok（151 external URLs reachable）；`npm run docs:build` complete（16.50s）；`npm run docs:walkthrough` 142 pages visited / 0 consoleErrors / 0 pageErrors / 0 badLinks / 0 sidebarFailures / timeline ok（chips 6, periods 5）；孤卡 54/0；反链 141 pages / 1321 link instances / 139 pages have backlinks。
