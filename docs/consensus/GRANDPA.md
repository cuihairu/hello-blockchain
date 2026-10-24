# GRANDPA

GRANDPA (GHOST-based Recursive ANcestor Deriving Prefix Agreement) is Polkadot's finality gadget, separated from the block production protocol [BABE](/consensus/BABE). It answers only one question: **which prefix is irreversible**. Block production and fork choice are handled by other components.

## The Four Essentials

- **Which layer**: [Settlement](/layers/Settlement) — Polkadot's finality gadget, separated from the block production protocol BABE
- **What it solves**: splitting "block production" and "finality" into two independent components — block production can be fast and can fork, and finality is supplied by a separate voting layer; the gadget is replaceable and upgradable
- **How well it solves it**: finality is independent of the block production protocol, so Polkadot's block production frequency can far exceed its finality frequency; the costs are that the gadget must be run and verified separately, finality latency is determined by the voting cycle, and when finality stalls the chain keeps producing blocks (a side effect of decoupling liveness from finality)
- **Source**: Gavin Wood, "The Polkadot Whitepaper," 2016; the GRANDPA specification, 2020 (Parity/Polkadot documentation)

## Why Separate Finality Out

[Ethereum's Gasper](/consensus/Gasper) combines fork choice (LMD-GHOST) and finality (Casper FFG) on the same chain. Polkadot goes further: **the block production protocol and the finality gadget are entirely independent**. BABE produces blocks by VRF lottery, and GRANDPA only votes to finalize prefixes. The two can be upgraded and replaced separately — this is the typical form of "modular consensus."

## Voting Mechanism

- Validators vote on "the highest block they have seen" rather than on every block — a single vote covers the prefix back to genesis.
- Votes accumulate by the GHOST rule: when an edge receives 2/3 of validator votes, the prefix below that edge is finalized.
- Voting is recursive — a validator's vote carries the highest ancestor chain it has seen, so one vote implicitly covers the prefix of the whole chain.

## Differences from Related Protocols

| Protocol | Relationship | Key Difference |
| --- | --- | --- |
| [Casper FFG](/consensus/Gasper) | Same category (finality gadget) | FFG votes only on checkpoints, while GRANDPA votes on prefixes, finalizing a long stretch at once |
| [BABE](/consensus/BABE) | Paired (block production protocol) | BABE produces blocks and GRANDPA finalizes; the two run independently |
| [Tendermint](/consensus/Tendermint) | Parallel route | Tendermint finalizes on block production, while Polkadot separates the two |

## Failure Modes

- **Finality stalls**: when validators are offline or the network is partitioned, GRANDPA cannot reach 2/3 of the votes, and the chain keeps producing blocks while no block is finalized — users see "confirmations disappear."
- **Voting conflicts**: accumulation of voting weight is sensitive to vote order, and edge cases can produce an intermediate state where "two prefixes are both near 2/3."
- **Side effects of decoupling from block production**: fast block production and slow finality, so users must distinguish "it appeared on the chain" from "it is irreversible" — wallets and exchanges must handle the confirmation logic separately.

GRANDPA's design philosophy is consistent with HotStuff's — **covering a stretch of prefix with a single vote** reduces communication cost — but GRANDPA pushes the idea to the extreme: one vote implicitly covers the entire chain.
