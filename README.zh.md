<div align="center">

[English](README.md) | [中文](README.zh.md)

<p align="center"><img src="docs/public/logo.svg" width="64" height="64" alt="logo" /></p>

# Hello Blockchain

[![Docs](https://github.com/cuihairu/hello-blockchain/actions/workflows/deploy-docs.yml/badge.svg)](https://cuihairu.github.io/hello-blockchain/)
[![License](https://img.shields.io/badge/license-Apache--2.0-green.svg)](LICENSE)

区块链知识体系 · [在线阅读](https://cuihairu.github.io/hello-blockchain/)

</div>

---

从记账模型到共识算法、从隐私技术到攻防实践的区块链知识站点，覆盖 UTXO 与账户模型、52 种共识算法、零知识证明等隐私技术、主流公链设计与 NFT 资产发行。[共识算法演进时间线](https://cuihairu.github.io/hello-blockchain/consensus-timeline)与[知识点总纲](https://cuihairu.github.io/hello-blockchain/knowledge)两页把各主题收拢串联。

## 本地开发

```bash
npm install        # 安装依赖
npm run docs:dev   # 本地开发
npm run docs:build # 构建产物
npm run docs:preview # 本地预览构建结果
npm run docs:check   # 校验侧栏路由、页面覆盖与站内链接
npm run docs:backlinks # 重建反向链接索引（docs:build 内部会自动执行）
npm run docs:links   # 校验站外论文 / 文档链接可达（需要网络）
npm run docs:og      # 重新生成社交预览图（og-image.png）
npm run docs:walkthrough # 全站交互走查（自动起预览服务，逐页检查）
```

## 目录结构

```
docs/                 # VitePress 站点源
├── .vitepress/       # 主题与配置（sidebar.json 是站点侧栏唯一真源）
├── public/           # 品牌资产（logo.svg / favicon.svg / og-image.png / robots.txt / badges）
├── img/              # 正文引用的图片
├── SUMMARY.md        # 保留的导航维护说明，不是侧栏数据源
├── sidebar-maintenance.md # 侧栏唯一来源与维护规则
├── review/           # 结构审计报告
├── index.md          # 首页：各栏目入口卡片
├── Introduction.md   # 简介：主题范围与作者视角
├── timeline.md           # 发展史时间线（49 个节点五段分期）
├── consensus-timeline.md  # 共识算法演进时间线（64 条年表）
├── knowledge.md           # 知识点总纲：概念、来源、场景、易错点
├── cards/              # 知识卡片索引（跨章成网）与术语表
├── layers/           # 分层架构：计算、存储、结算、服务发现
├── nav/              # 跨章导航：按共识算法、按主网上线时间
├── trends/            # 共识趋势展望：九条趋势各带出处与可验证观察点
├── model/            # 记账模型：UTXO、账户、DAG
├── algo/             # 数据结构：Merkle 树
├── opcode/           # 脚本与操作码
├── btc/              # 比特币机制：BIP、P2PK
├── consensus/        # 共识算法：PoW、PoS、PBFT、Tendermint 等 52 篇
├── Privacy/          # 隐私技术：零知识证明、环签名、同态加密等
├── hacking/          # 攻击与防御
├── nft/              # 资产发行与 NFT
├── chains/           # 有名的区块链项目
├── consortium/       # 联盟链：Fabric、FISCO BCOS、Corda、Besu、WeBASE
├── dcny/             # 数字人民币：e-CNY 架构与试点
├── chain-games/      # 区块链游戏：项目、经济设计、事故
└── dapp/             # DApp 架构：前端、钱包、合约、索引器
```

```
scripts/              # 由 npm 脚本与 CI 调用的维护检查
├── check-nav.mjs     # 侧栏路由 / 站内链接 / 总纲覆盖 / README 数字与目录树一致
├── check-links.mjs   # 站外论文与文档链接可达
├── build-backlinks.mjs # 收集站内链接生成 backlinks.json，驱动每页底部反向链接区块
├── make-og-image.mjs # 重新生成 public/og-image.png
└── walkthrough.mjs   # 浏览器逐页走查构建产物
```

## License

Apache-2.0