# Near

## Whitepaper and Specifications

"Nightshade: Near Protocol Sharding Design" and the protocol whitepaper, Alexander Skidanov and Illia Polosukhin, 2018-2019 ([github.com/nearprotocol/nearcore](https://github.com/nearprotocol/nearcore) and [docs.near.org](https://docs.near.org)); mainnet launched in 2020-04.

## What Problem It Solves

Sharding is the explicit route to scaling, but in a sharded chain cross-shard transactions, state consistency, and validator assignment are all tangled together — Near set out to get "the experience of a single chain" and "the throughput of sharding" right at the same time: the ledger and state are sharded, but developers and users are not.

## Technical Achievements and Contributions

- **Nightshade sharding**: state and execution are split into multiple shards, and each block is assembled from the chunks produced by each shard — cross-shard transactions execute asynchronously via receipts.
- **Doomslug finality**: a two-round "half-step (doomslug) → full-step (finality)" design that gives fast confirmation first and deterministic finality after — a lightweight take on the same idea as the BFT family (see [BFT](/consensus/BFT)).
- **WASM contracts + human-readable account names**: contracts in Rust/AssemblyScript compile to WASM (see the [compute layer](/layers/Compute) for execution); `alice.near`-style naming is the on-chain native form of [service discovery](/layers/ServiceDiscovery).
- **Phased rollout**: Nightshade's gradual path from sharded execution to sharded state (Phase 2+ discussion since 2023).

## Limitations and Public Incidents

- The full sharding form (stateless validation + dynamic resharding) has shipped slowly.
- Ecosystem TVL and developer headcount have long trailed the leading EVM and Solana ecosystems.
- Public incidents: none found in the public record.
