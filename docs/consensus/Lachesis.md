# Lachesis

Lachesis is the asynchronous Byzantine fault tolerant (aBFT) consensus of Fantom (now Fantasma). Its core trait is **no fixed block production period** — validators may produce micro-blocks at any time, finalization is determined by the evolution of DAG topology and voting weight, and the irreversible prefix is marked by "super-checkpoints."

## The Four Essentials

- **Which layer**: [Settlement](/layers/Settlement) — the DAG form of asynchronous BFT, with no fixed block period
- **What it solves**: letting block production and finalization happen naturally in an asynchronous network — no fixed block period is enforced, finalization is determined by the evolution of DAG topology and voting weight, and nodes can produce blocks at any time
- **How well it solves it**: the absence of a fixed period lowers latency and the impact of network jitter, and node count is not constrained by network-wide broadcast voting; the costs are that finalization rules are sensitive to DAG topology and voting weight parameters, liveness depends on the super-checkpoint mechanism, and in 2022 there was a validator voting conflict and a chain split
- **Source**: Fantom, "The Lachesis Protocol" whitepaper, 2019; the Fantom developer documentation (Agoric protocol specification)

## Core Mechanism

- **DAG block production**: a validator can produce a micro-block at any time, stringing all previous micro-blocks in as parent nodes into a directed acyclic graph, without waiting for a time slot.
- **Super-checkpoint**: when the DAG evolves to a state of "stable voting weight," the network derives an irreversible prefix, called a super-checkpoint. Finalization does not depend on fixed voting rounds.
- **Asynchronous assumption**: Lachesis does not depend on timeout synchrony assumptions and can be both safe and live in a fully asynchronous network — this is its key distinction from [PBFT](/consensus/PBFT) and [Tendermint](/consensus/Tendermint).
- **Weighted voting**: validators vote by stake weight, and votes are inherited through DAG topology — voting for a parent node implicitly covers its child nodes.

## Differences from Related Protocols

| Protocol | Relationship | Key Difference |
| --- | --- | --- |
| [HoneyBadgerBFT](/consensus/HoneyBadgerBFT) | Same category (asynchronous BFT) | HoneyBadgerBFT achieves asynchronous atomic broadcast with threshold encryption and shared randomness, while Lachesis derives finalization from DAG topology |
| [Snowman](/consensus/Snowman) | Adjacent | Snowman strings a linear chain with probabilistic voting, while Lachesis derives finalization directly on a DAG |
| [TowerBFT](/consensus/TowerBFT) | Parallel route | TowerBFT compresses messages with PoH timing, while Lachesis relies on asynchronous DAG topology |
| [Algorand](/consensus/Algorand) | Adjacent (no fixed period) | Algorand produces blocks in BA\* rounds, while Lachesis has no fixed rounds |

## Failure Modes

- **Parameter sensitivity of super-checkpoint derivation**: the evolution of DAG topology and voting weight decides when a super-checkpoint is derived, and poor parameter settings can delay finalization or even stall it.
- **The 2022 validator voting conflict**: Fantom experienced a fork and restart caused by a conflict between the validator set and voting, teaching that the engineering boundary of the "asynchronous assumption" is narrower than the theoretical model.
- **Side effects of voting inheritance**: when a parent node's vote covers its children, an adversary can amplify its own voting weight by carefully constructing the DAG topology.
- **Impact of a fixed-free period on clients**: wallets, RPC, and state sync must all handle the "irregularly produced" model, raising the adaptation cost for the ecosystem toolchain.

Lachesis's value is **an engineering attempt to bring asynchronous BFT onto a public chain** — it demonstrated the feasibility of "no block period," and also demonstrated that the engineering boundary is far narrower than the theoretical model.
