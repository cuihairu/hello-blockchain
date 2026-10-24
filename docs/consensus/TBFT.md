# TBFT

TBFT is the Byzantine fault tolerant consensus algorithm used by Chang'an Chain (ChainMaker), designed from the same source as Tendermint: it achieves second-scale deterministic block production with BFT three-phase voting, with performance and engineering improvements for consortium chains.

## Four Key Points

- **Which layer**: [Settlement layer](/layers/Settlement) — three-phase BFT from the same source as Tendermint, aimed at consortium chains
- **What it solves**: Provide second-scale deterministic block production inside a permissioned network — BFT three-phase voting, irreversible once 2/3 is reached, with performance and engineering improvements for consortium chains
- **How well it works**: Low latency, stable throughput, pluggable (Chang'an Chain can switch between RAFT/SOLO); the cost is that it depends on permissioned node identities, the node count is limited by BFT communication complexity, and it does not fit permissionless networks
- **Sources**: Chang'an Chain (ChainMaker) technical documentation; the same family's theoretical source: Jae Kwon "Tendermint" 2014

## Basic Flow

1. **Propose**: the leader, rotated by weight, packs transactions into a proposed block.
2. **Prevote / Precommit**: validators vote on the proposal in two rounds, each collecting $2f+1$ votes to form a QC; a timeout or a conflicting proposal moves to the next round with a new leader.
3. **Commit**: once a block obtains a commit QC it is written to the ledger immediately, **finality is determined**, with no rollback window.

## Characteristics

- **Deterministic finality + high throughput**: one message phase is dropped compared with PBFT (prepare/commit votes are merged), keeping thousands to tens of thousands of TPS with up to 100 nodes.
- **Combined with pipelining**: voting on block $k$ can be pipelined over block $k-1$, compressing both the block interval and confirmation latency further.
- **Pluggable**: Chang'an Chain lists TBFT, RAFT and Solo as switchable consensus modules, chosen by consortium size and trust model (BFT for safety redundancy, RAFT for very low latency).

## Similarities and Differences with Tendermint

Similar: the three-phase structure, the locking mechanism, round-based leader change, and the 2/3 threshold. Different: TBFT targets a permissioned set (certificate-based admission, a CA system) and does no public staking or slashing; message aggregation and the persistence layer are optimized for the Chang'an Chain storage engine.
