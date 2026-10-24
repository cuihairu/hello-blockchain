# Introduction

A blockchain is, at its core, a **distributed, append-only, cryptographically integrity-protected ledger**: transactions are packed into blocks, blocks are chained together one by one through hash pointers, and every node in the network independently validates and stores a copy of the ledger under the same consensus rules, thereby reaching agreement on "a single shared ledger" without any trusted third party.

These pages are personal blockchain study notes and engineering experience, focused on technical lineages, design trade-offs, and questions encountered in practice. The content is organized into ten sections and is best read horizontally by following the cross-links between pages:

| Section | Content |
| --- | --- |
| Ledger Models | The three bookkeeping paradigms — UTXO, account model, and DAG — plus hybrid forms such as Cardano's EUTXO and Nervos's Cell |
| Data Structures | The Merkle tree: how transactions within a block are organized and the basis for light-client proofs |
| Scripts and Opcodes | Taking Bitcoin Script as an example, understanding verification primitives such as `OP_CHECKSIG` |
| Bitcoin Mechanics | The BIP improvement-proposal system and P2PK transaction scripts |
| Consensus Algorithms | The principles and trade-offs of 52 consensus algorithms including PoW, PoS, PBFT, Tendermint, and Avalanche |
| Privacy and Security | Privacy technologies such as zero-knowledge proofs, ring signatures, and homomorphic encryption |
| Hacker Attacks | Attack surfaces such as 51% attacks, Sybil attacks, and cross-chain bridge attacks, and their defenses |
| Asset Issuance and NFT | Tokenization protocols such as Colored Coins and Open Assets |
| Notable Blockchain Projects | Design and consensus choices of public chains such as Bitcoin, Ethereum, Polkadot, and Solana |
| Development Timeline | From the cryptographic prehistory of 1976 to today: 49 timeline nodes across 5 periods, each entry answering why it happened when it did |

## A Few Ways to Start

- To understand how a ledger organizes state, start with [Ledger Models](/model/Models) and [Data Structures](/algo/MerkleTree), then follow the page links to see consensus and per-chain trade-offs.
- For developer implementation, start with notes on [Scripts and Opcodes](/opcode/OP_CHECKSIG), [Bitcoin Mechanics](/btc/BIPS), or **Blockchain Games**.
- To look up concept origins and algorithm evolution, see the **Knowledge Outline** and the **Consensus Algorithm Evolution Timeline** (64 timeline entries, 35 main-chain mapping rows).
- For quick reference, browse the **Knowledge Cards** (54 concept cards arranged in a four-layer network) and the **Glossary** (114 terms with a flat lookup table).

## Prerequisites

Where networking and cryptography fundamentals are involved, the relevant pages supply the necessary background; pairing-based cryptography, zero-knowledge proofs, and similar topics likewise include concept explanations and sources in their notes.
