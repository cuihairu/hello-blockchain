<div align="center">

[English](README.md) | [中文](README.zh.md)

<p align="center"><img src="docs/public/logo.svg" width="64" height="64" alt="logo" /></p>

# Hello Blockchain

[![Docs](https://github.com/cuihairu/hello-blockchain/actions/workflows/deploy-docs.yml/badge.svg)](https://cuihairu.github.io/hello-blockchain/)
[![License](https://img.shields.io/badge/license-Apache--2.0-green.svg)](LICENSE)

区块链知识体系 · [在线阅读](https://cuihairu.github.io/hello-blockchain/)

</div>

---

从记账模型到共识算法、从隐私技术到攻防实践的区块链知识站点，覆盖 UTXO 与账户模型、23 种共识算法、零知识证明等隐私技术、主流公链设计与 NFT 资产发行。[共识算法演进时间线](https://cuihairu.github.io/hello-blockchain/consensus-timeline)与[知识点总纲](https://cuihairu.github.io/hello-blockchain/knowledge)两页把各主题收拢串联。

## 本地开发

```bash
npm install        # 安装依赖
npm run docs:dev   # 本地开发
npm run docs:build # 构建产物
npm run docs:preview # 本地预览构建结果
npm run docs:walkthrough # 全站交互走查（自动起预览服务，逐页检查）
```

## 目录结构

```
docs/                 # VitePress 站点源
├── .vitepress/       # 主题与配置（sidebar.json 由 SUMMARY.md 映射生成）
├── public/           # 品牌资产（logo.svg / favicon.svg）
├── SUMMARY.md        # 目录底稿（sidebar 映射来源）
├── timeline.md           # 发展史时间线（30 个节点五段分期）
├── consensus-timeline.md  # 共识算法演进时间线（48 条年表）
├── knowledge.md           # 知识点总纲（共识算法起步）
├── model/            # 记账模型：UTXO、账户、DAG
├── algo/             # 数据结构：Merkle 树
├── opcode/           # 脚本与操作码
├── btc/              # 比特币机制：BIP、P2PK
├── consensus/        # 共识算法：PoW、PoS、PBFT、Tendermint 等 23 篇
├── privacy/          # 隐私技术：零知识证明、环签名、同态加密等
├── hacking/          # 攻击与防御
├── nft/              # 资产发行与 NFT
└── chains/           # 有名的区块链项目
```

## License

Apache-2.0