# Hashgraph

Hashgraph is the asynchronous Byzantine fault tolerant (aBFT) consensus proposed by Leemon Baird in 2016 and adopted by Hedera. Its signature design is **gossip-about-gossip**: what nodes propagate to each other is not "messages" but "the propagation history of messages" — each event records the two predecessor events it has seen, and the network's entire communication history forms a DAG. With this DAG, **every node can locally deduce how others would vote**, so voting messages themselves can be omitted (virtual voting).

## The Four Essentials

- **Which layer**: [Settlement](/layers/Settlement) — aBFT DAG consensus, gossip protocol + virtual voting
- **What it solves**: the message overhead of BFT voting — votes do not need to actually be sent; each node re-derives other nodes' viewpoints from the DAG and "computes" their votes
- **How well it solves it**: asynchronous Byzantine fault tolerance (the weakest network assumption) + fair ordering (consensus timestamps), with good throughput and latency performance; the cost is permissioned governance — Hedera mainnet nodes are run by a council of 39 institutions, trading permissionlessness for performance and predictability
- **Source**: Leemon Baird, "Hashgraph Consensus: Fair, Fast, Byzantine Fault Tolerance," 2016; the Hedera whitepaper, 2018

## Core Mechanism

- **gossip-about-gossip**: at each synchronization a node picks a random peer and sends it "all events it knows." A new event carries the hashes of two parent events (its own witness and the peer's witness), and the network's entire communication history forms a DAG.
- **Virtual voting**: when the DAG is dense enough, a node can see "what node X saw at what moment" — so it can locally deduce how X would vote on any issue without X actually sending a vote.
- **Consensus timestamps**: an event's ordering and timestamp are decided by the median of votes, so no single node can decide the order in advance — this yields "fair ordering," resisting MEV-style front-running.
- **aBFT**: still safe and live under a fully asynchronous network (unbounded message delay), the same assumption class as [HoneyBadgerBFT](/consensus/HoneyBadgerBFT).

## Differences from Related Protocols

| Protocol | Relationship | Key Difference |
| --- | --- | --- |
| [HoneyBadgerBFT](/consensus/HoneyBadgerBFT) | Same category (aBFT) | HoneyBadger uses threshold encryption, while Hashgraph uses a gossip DAG + virtual voting |
| [Lachesis](/consensus/Lachesis) | Same category (DAG aBFT) | Lachesis is a permissionless DAG, while Hashgraph is a permissioned council |
| [Tendermint](/consensus/Tendermint) | Contrast | Tendermint is partially synchronous with explicit voting, while Hashgraph is asynchronous with virtual voting |

## Failure Modes

- **Centralization of the permissioned council**: 39 council institutions run all nodes, so "decentralization" is guaranteed by the governance process rather than by an admission protocol — this is the structural concession paid for performance.
- **Patent and openness disputes**: Hashgraph operated early on under a patent and licensing model, limiting ecosystem adoption (it was later open-sourced, but the impression was already set).
- **The boundary of fair ordering**: consensus timestamps resist front-running, but the timing of an event entering the DAG is still affected by network topology, and absolute fairness is unattainable.

Hashgraph's value is **proving that "votes need not be sent"** — the communication history itself is voting material; at the same time it demonstrates what a council permission model buys (performance, predictability) and what it pays for (permissionlessness).
