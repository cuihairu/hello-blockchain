<div align="center">

[English](README.md) | [中文](README.zh.md)

<p align="center"><img src="docs/public/logo.svg" width="64" height="64" alt="logo" /></p>

# Hello Blockchain

[![Docs](https://github.com/cuihairu/hello-blockchain/actions/workflows/deploy-docs.yml/badge.svg)](https://cuihairu.github.io/hello-blockchain/)
[![License](https://img.shields.io/badge/license-Apache--2.0-green.svg)](LICENSE)

A blockchain knowledge base · [Read online](https://cuihairu.github.io/hello-blockchain/)

</div>

---

A blockchain knowledge site covering everything from ledger models to consensus algorithms, and from privacy techniques to attack-and-defense practice — including UTXO and account models, 23 consensus algorithms, privacy technologies such as zero-knowledge proofs, the design of major public blockchains, and NFT asset issuance. A [consensus-algorithm evolution timeline](https://cuihairu.github.io/hello-blockchain/consensus-timeline) and a [knowledge digest](https://cuihairu.github.io/hello-blockchain/knowledge) tie the sections together.

## Local Development

```bash
npm install        # Install dependencies
npm run docs:dev   # Local development
npm run docs:build # Build output
npm run docs:preview # Preview the build locally
```

## Directory Structure

```
docs/                 # VitePress site source
├── .vitepress/       # Theme and configuration (sidebar.json is generated from SUMMARY.md)
├── public/           # Brand assets (logo.svg / favicon.svg)
├── SUMMARY.md        # TOC draft (source for the sidebar mapping)
├── timeline.md           # Development history timeline (30 nodes in five eras)
├── consensus-timeline.md  # Consensus algorithm evolution timeline (48 entries)
├── knowledge.md           # Knowledge digest: concepts, sources, scenarios, pitfalls
├── model/            # Ledger models: UTXO, account, DAG
├── algo/             # Data structures: Merkle tree
├── opcode/           # Scripts and opcodes
├── btc/              # Bitcoin mechanics: BIP, P2PK
├── consensus/        # Consensus algorithms: PoW, PoS, PBFT, Tendermint, etc. — 23 articles
├── privacy/          # Privacy techniques: zero-knowledge proofs, ring signatures, homomorphic encryption, etc.
├── hacking/          # Attacks and defenses
├── nft/              # Asset issuance and NFTs
└── chains/           # Notable blockchain projects
```

## License

Apache-2.0
