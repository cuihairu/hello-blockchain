# DApp Architecture

A DApp (decentralized application) is an application shape in which "the frontend interacts with contracts through a wallet, state lives on-chain, and indexers provide off-chain queries". This directory gives the architecture diagram, the development stack, security incidents, L1/L2 selection and representative cases.

## The Four Essentials

- **Which layer**: [compute](/layers/Compute) + [service discovery](/layers/ServiceDiscovery) — contract execution happens on-chain, and name resolution goes through [service discovery](/layers/ServiceDiscovery)
- **What it solves**: it puts application logic (contracts) and state (the ledger) on-chain, leaving the frontend responsible only for interaction and presentation, which eliminates single points of failure
- **How well it solves it**: the development stack is mature (Solidity, Hardhat, Ethers.js), but the frontend experience is still limited by on-chain latency and gas fees; indexers solve off-chain queries, but introduce a new trust anchor (the indexer's data source is on-chain state)
- **Source**: [Ethers.js documentation](https://docs.ethers.org), [Hardhat documentation](https://hardhat.org), [The Graph documentation](https://thegraph.com), [Aave documentation](https://docs.aave.com), [ENS documentation](https://docs.ens.domains)

## Architecture Diagram

The typical DApp architecture is "four layers":

```
┌─────────────────────────────────────────────────────────┐
│                     Frontend                             │
│   React / Vue / Next.js                                  │
│   Talks to the wallet and chain via wagmi / ethers.js    │
└────────────────────┬────────────────────────────────────┘
                     │ RPC / WebSocket
┌────────────────────▼────────────────────────────────────┐
│                     Wallet                               │
│   MetaMask / WalletConnect / Brave Wallet                │
│   Signs transactions and submits them to the chain       │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│                  On-chain contracts (Contracts)          │
│   Solidity → EVM / WASM                                  │
│   State is stored on-chain, metered in gas               │
└────────────────────┬────────────────────────────────────┘
                     │
┌────────────────────▼────────────────────────────────────┐
│                  Indexer                                 │
│   The Graph / subgraphs                                  │
│   Listens to events, builds indexes, serves GraphQL      │
└─────────────────────────────────────────────────────────┘
```

### Responsibilities of Each Component

- **Frontend**: the user-facing interface; interacts with the wallet through wagmi or ethers.js. The frontend never touches the on-chain contracts directly — all state reads go through the indexer (off-chain), and all state writes are submitted on-chain after being signed by the wallet.
- **Wallet**: manages private keys, signs transactions, submits them to the chain. The wallet is the trust anchor between the user and the chain — a leaked private key is lost assets.
- **Contracts**: on-chain smart contracts executing the application logic. Contract code cannot be upgraded (unless a proxy pattern is used); upgrades require governance.
- **Indexer**: listens to on-chain events, builds indexes, provides GraphQL queries. The indexer solves the latency problem of the frontend querying the chain directly, but the indexer's data source is still on-chain state.

## Development Stack

### Contract layer

- **Languages**: Solidity (EVM chains), Move (Aptos/Sui)
- **Test frameworks**: Hardhat, Foundry
- **Deployment**: hard-coded deployment scripts, automated deployment through CI/CD

### Frontend layer

- **Frameworks**: React + wagmi, Next.js + viem
- **Wallet integration**: wagmi (React hooks), viem (TypeScript)
- **State management**: local state + on-chain state queried through the indexer

### Off-chain indexing

- **The Graph**: a subgraph listens to on-chain events and builds a GraphQL index
- **Self-built indexers**: listen to on-chain events, store into a database, provide a custom API

## Security Incidents

### The DAO incident (2016)

- **Loss**: about 36 million ETH (roughly 60 million USD at the time)
- **Cause**: a reentrancy vulnerability — the attacker called the external function again before the contract's state was updated
- **Impact**: Ethereum hard-forked to roll back the transaction, splitting the community; [DAO](/consensus/DPOS) governance debates continue to this day
- **Source**: see [smart contract vulnerability attacks](/hacking/SmartContractVulnerabilities)

### The Ronin Bridge incident (2022)

- **Loss**: about 620 million USD
- **Cause**: forged transaction signatures, used to send unminted tokens across the Ronin bridge onto the Ethereum mainnet
- **Attribution**: the attackers were linked to North Korea's Lazarus Group
- **Source**: [BBC · Ronin Network: What a $600m hack says about the state of crypto](https://www.bbc.com/news/technology-60933174)

### Cross-chain bridge attacks (2022)

- **Loss**: about 3 billion USD (Ronin 620 million + Nomad 190 million + Harmony 100 million, among others)
- **Cause**: flaws in the bridge's signature verification or permission management
- **Impact**: bridges became the largest attack surface, and [trust-minimized bridges](/hacking/CrossChainBridgeAttack) became a research direction
- **Source**: see [cross-chain bridge attacks](/hacking/CrossChainBridgeAttack)

## L1/L2 Selection

| Dimension | L1 (Ethereum, Solana) | L2 (Optimism, Arbitrum, zkSync) |
| --- | --- | --- |
| Finality | Seconds to minutes | Minutes to hours (optimistic vs ZK) |
| Gas fees | High | Low (1-2 orders of magnitude) |
| Security model | Native BFT / PoS | Inherits L1 security + validity proofs |
| Suitable scenarios | High-value settlement, decentralized finance | High-frequency trading, on-chain games |
| Representative projects | [Ethereum](/chains/Ethereum), [Solana](/chains/Solana) | [Optimism](/chains/Optimism), [Arbitrum](/chains/Arbitrum) |

### Gas fee strategy

- **L1 gas**: paid directly by users, highly volatile
- **L2 gas**: compressed and submitted via rollups, low volatility
- **Gasless**: fee payments covered by a paymaster for a zero-gas experience, suitable for frontend applications

## Representative Cases

### Uniswap

- **Type**: decentralized exchange (DEX)
- **Architecture**: frontend (React) + wallet (MetaMask) + contracts (Solidity) + indexer (self-built)
- **Traits**: an AMM (automated market maker) model; pool liquidity is provided by users
- **Source**: [Uniswap documentation](https://docs.uniswap.org)

### Aave

- **Type**: decentralized lending protocol
- **Architecture**: frontend + wallet + contracts + indexer
- **Traits**: overcollateralized lending; risk parameters are decided by governance
- **Source**: [Aave documentation](https://docs.aave.com)

### ENS

- **Type**: decentralized naming system
- **Architecture**: frontend + wallet + contracts + indexer
- **Traits**: on-chain name resolution, the counterpart of traditional DNS
- **Source**: [ENS documentation](https://docs.ens.domains)

## Failure Modes

- **The wallet is the trust anchor**: private-key management is the largest single point of DApp security. A leaked wallet key or a frontend vulnerability leads directly to lost assets.
- **Contracts cannot be upgraded**: most smart contracts cannot have their code changed after deployment. A vulnerability can only be addressed through a governance-approved proxy upgrade, or the loss is accepted.
- **Gas fee volatility**: L1 gas fees can exceed 100 USD at peak, badly hurting the user experience. L2 mitigates this, but introduces optimistic/ZK verification delay.
- **Indexer trust**: the indexer is the data source between the frontend and the chain; a compromised indexer or bad data makes the frontend display wrong information.
- **Frontend-backend separation**: the frontend does not trust a backend (the frontend is code running locally on the user's machine), but it must trust on-chain state. This asymmetry in the trust model is an inherent tension of DApp architecture.
