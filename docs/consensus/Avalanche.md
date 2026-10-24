# Avalanche

Avalanche is a high-throughput smart contract platform whose consensus combines **Snowball-family subsampled probabilistic consensus** with **stake weighting**, launched by Ava Labs between 2018 and 2020 (the whitepaper is signed "Team Rocket," with Emin Gün Sirer among the founding team).

## The Four Essentials

- **Which layer**: [Settlement](/layers/Settlement) — subsampled probabilistic consensus + stake weighting, split across the X/P/C three chains
- **What it solves**: wanting both permissionlessness and high throughput as well as fast confirmation — random subsampling replaces network-wide broadcast voting, and stake determines weight
- **How well it solves it**: blocks take seconds and transaction confirmations are sub-second, with low communication volume; the costs are that finality is probabilistic (a safety threshold of 1/2 instead of BFT's 1/3 adversarial model), stake concentration is high, and the three-chain architecture adds comprehension and operations overhead
- **Source**: Team Rocket, "Scalable and Probabilistic Leaderless BFT Consensus through Metastability," 2018; the Ava Labs platform whitepaper, 2020

## Consensus Structure: Three-Chain Design

1. **X-Chain (Exchange)**: asset creation and transfer, running the Avalanche consensus (DAG shape, with no linear ordering between transactions).
2. **P-Chain (Platform)**: validator management, staking, and subnet creation, running Snowman (chained Snowball).
3. **C-Chain (Contract)**: an EVM-compatible contract chain, running the Snowman consensus.

This architecture, in which different subnets can choose different virtual machines and consensus parameters, is the main difference between Avalanche and monolithic chains.

## Consensus Properties

- **Subsampled voting**: a validator randomly queries $k$ peers and repeats until the confidence threshold is met; stake weight is used for selection and sybil resistance, not as a probability weight.
- **Second-level probabilistic finality**: under mainnet parameters acceptance usually takes 1-2 seconds, with no epoch or committee rotation.
- **Leaderless**: transactions are submitted by any validator, avoiding a single point of packaging censorship; fees use the EIP-1559 dynamic base fee (C-Chain).
- **Safety threshold**: adversarial weight must reach ≥ 1/2 to block consensus convergence (distinct from BFT's 1/3 — this is the threshold of the probabilistic safety model).

## Staking and Rewards

Mainnet validators stake a minimum of 2000 AVAX (post-2023 parameters), for a staking duration of 2 weeks to 1 year; staking is only an admission and governance weight, and there is no block-production reward — rewards come from fees (mainnet once subsidized early validators through inflationary issuance, later gradually moving to pure fees).

## Comparison with Contemporary Public Chains

- vs Solana: Solana relies on PoH + TowerBFT for serial high TPS, while Avalanche relies on parallel subnets and leaderless consensus.
- vs Cosmos: in Cosmos each chain has its own independent validator set, while Avalanche subnets can reuse mainnet validators (a newer model) or build their own set.
