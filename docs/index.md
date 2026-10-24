---
layout: home

hero:
  name: Hello Blockchain
  text: Blockchain knowledge base
  tagline: Personal blockchain notes and engineering experience — ledger models, 52 consensus algorithms, zero-knowledge proofs, the public-chain ecosystem, and the timelines that tie it together (64 timeline entries, 49 timeline nodes across five periods, 35 main-chain mapping rows).
  image:
    src: /illustrations/hero.png
    alt: hello-blockchain hero illustration
  actions:
    - theme: brand
      text: Browse the notes
      link: /Introduction
    - theme: alt
      text: GitHub
      link: https://github.com/cuihairu/hello-blockchain

features:
  - title: Ledger Models
    details: "UTXO, account model, and DAG — three bookkeeping paradigms, plus the hybrid forms of Cardano's EUTXO and Nervos's Cell. Understand how a ledger actually records state."
    link: /model/Models
  - title: Merkle Tree
    details: "The binary hash tree that compresses a block's entire transaction set into a single 32-byte root — the foundation for SPV proofs and cross-node synchronization."
    link: /algo/MerkleTree
  - title: OP_CHECKSIG
    details: "The core opcode of Bitcoin Script: stack semantics, sighash types, and how every standard payment method from P2PK through P2TR builds on it."
    link: /opcode/OP_CHECKSIG
  - title: Bitcoin Mechanics
    details: "The BIP improvement-proposal system that governs protocol change, and the P2PK transaction script that started it all."
    link: /btc/BIPS
---
