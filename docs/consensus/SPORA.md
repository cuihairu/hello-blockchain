# SPoRA (Arweave)

Arweave's consensus has evolved from PoW to **SPoRA** (Succinct Proofs of Random Access, from 2023): the underlying mechanism is the **Proof of Access (PoA)** named in the yellow paper — mining must prove "you can access historical data". The ledger is also not a chain but a **blockweave**: each block links the previous block and a pseudorandomly chosen recall block, forming a graph.

## Four Key Points

- **Which layer**: the storage variant of the [Settlement layer](/layers/Settlement) plus the incentive loop of the [Storage layer](/layers/Storage) — the consensus resource is "what has been stored"
- **What it solves**: Pay once, store forever — "randomly challenge historical data" so that storage itself becomes the resource for producing blocks, making miners voluntarily retain all network data long term
- **How well it works**: more than 20 billion pieces of data in the weave are held for economic incentive, and falling storage costs are smoothly propagated by the Endowment fund pool; the cost is that block production is sensitive to disk I/O and random access, and Recall Chunk verification clearly disadvantages small miners; producing two blocks at the same height forfeits the reward and revokes the miner address. Public incidents: no public record found (consensus layer; storage cost model adjustments in 2020 once triggered community dispute)
- **Sources**: the Arweave yellow paper "Arweave: A Protocol for Economically Sustainable Information Access" (<https://www.arweave.org/whitepaper>); developer docs "Cryptographic Proofs of Storage" (<https://docs.arweave.org/developers/development/overview>)

## Core Mechanisms

- **blockweave**: each block references the previous block + a recall block determined by "previous block hash + height" — producing a block requires accessing random old data, so "storing more, storing more completely" directly decides the reward.
- **Recall Chunk challenge**: each block carries only one or two 256 KiB challenge chunks, drawn pseudorandomly from all history — what is proved is "you also hold a random location".
- **VDF rate limiting**: a verifiable delay function checkpoint unlocks the challenge once per second, so rewards track stored volume rather than retrieval speed — you cannot answer faster with faster disks.
- **Replica uniqueness**: partition packing is seeded by the miner address, and duplicate replicas earn nothing — this incentivizes physically distinct real replicas.
- **Endowment fund**: users prepay once (about 200 years of storage at current prices), and the fund pays miners replication-proof costs over time; inflation + transaction fees + fund draws form the miner's three-part income.

## Differences from Related Protocols

| Protocol | Relation | Key difference |
| --- | --- | --- |
| [PoSpace](/consensus/PoSpace) | Same class (space for consensus) | PoSpace proves "I own capacity", while SPoRA adds random historical access — beyond "owning" you must also be able to "retrieve" |
| [PoST](/consensus/PoST) | Same class (space + time) | PoST uses continuous challenges to prove "I keep holding it", while SPoRA reaches a similar goal with recall chunks + VDF, and adds a preference for rare data |
| [PoW](/consensus/POW) | Predecessor | Arweave 1.0 was PoW; PoA swaps hash power for "storage + access" |
| [GHOST](/consensus/GHOST) | Contrast | blockweave fork choice is still heaviest-chain-like, but each block carries an extra recall reference |

## Failure Modes

- **Execution outsourced to clients**: SmartWeave contracts are evaluated lazily, so the execution burden moves from nodes to users — the extreme form of "consensus does not carry execution".
- **Macro dependency of the perpetual promise**: a 200-year prepayment assumes "monotonically falling storage costs", and if the cost curve reverses the fund pool is drained early (the protocol has a built-in redenomination safety valve for this).
- **Miner centralization on large machines**: TB-scale partitions of 3.6 TB and I/O contention push small miners to the margins, and replica diversity is a hidden premise of the security model.

> Source: meshio research (merged 2026-10-13) — mechanism details, the economic system, and the sources section are taken from the Arweave section of meshio repo `docs/research/comparable-chains.md`.
