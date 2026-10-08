<div align="center">

[English](README.md) | [中文](README.zh.md)

<p align="center"><img src="docs/public/logo.svg" width="64" height="64" alt="logo" /></p>

# Hello Blockchain

[![Docs](https://github.com/cuihairu/hello-blockchain/actions/workflows/deploy-docs.yml/badge.svg)](https://cuihairu.github.io/hello-blockchain/)
[![License](https://img.shields.io/badge/license-Apache--2.0-green.svg)](LICENSE)

区块链知识体系 · [在线阅读](https://cuihairu.github.io/hello-blockchain/)

</div>

---

从记账模型到共识算法、从隐私技术到攻防实践的区块链知识站点，覆盖 UTXO 与账户模型、24 种共识算法、零知识证明等隐私技术、主流公链设计与 NFT 资产发行。

## 本地开发

```bash
npm install        # 安装依赖
npm run docs:dev   # 本地开发
npm run docs:build # 构建产物
npm run docs:preview # 本地预览构建结果
```

## 目录结构

```
docs/                 # VitePress 站点源
├── .vitepress/       # 主题与配置（sidebar.json 由 SUMMARY.md 映射生成）
├── public/           # 品牌资产（logo.svg / favicon.svg）
├── SUMMARY.md        # mdbook 目录底稿（sidebar 映射来源）
├── model/            # 记账模型：UTXO、账户、DAG
├── algo/             # 数据结构：Merkle 树
├── opcode/           # 脚本与操作码
├── btc/              # 比特币机制：BIP、P2PK
├── consensus/        # 共识算法：PoW、PoS、PBFT、Tendermint 等 24 篇
├── privacy/          # 隐私技术：零知识证明、环签名、同态加密等
├── hacking/          # 攻击与防御
├── nft/              # 资产发行与 NFT
└── chains/           # 有名的区块链项目
```

## License

Apache-2.0