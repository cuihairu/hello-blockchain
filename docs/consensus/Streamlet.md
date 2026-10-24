# Streamlet

Streamlet is the **minimal pipelined BFT** published by Benjamin Chan and Elaine Shi in 2020, aiming to write blockchain consensus in "textbook" form: a protocol on one page, a safety proof on one page. It has no production deployment, but it became the standard teaching benchmark in BFT research.

## Four Key Points

- **Which layer**: [Settlement layer](/layers/Settlement) — minimal pipelined BFT (a teaching and research benchmark, with no production deployment)
- **What it solves**: Push the complexity of BFT consensus to the limit — express safety and liveness with the fewest mechanisms (random leader + vote extension + three-chain confirmation), so that both protocol and proof are short enough to read on one page
- **How well it works**: The protocol is minimal, the proof is very short, and it is easy to formalize and teach; the cost is that liveness holds only under partial synchrony, nothing is optimized for real performance, and there is no production implementation
- **Sources**: Chan, Shi "Streamlet: Textbook Streamlined Blockchains" 2020 (ePrint 2020/088)

## Core Mechanisms

The protocol has only three rules:

1. **Propose**: in every round (with known clocks) a randomly chosen leader broadcasts a proposal that extends the longest voted-on chain it has seen.
2. **Vote**: a validator votes when it receives a proposal that extends "the longest voted-on chain it has seen" (simple greedy, no three phases needed).
3. **Confirm**: once three consecutive blocks each collect 2/3 of the votes, the earliest of the three is finalized — votes are "inherited" along the chain, so one vote implicitly covers ancestors.

When a timeout occurs, a new leader is drawn. That is all — there is no prepare/commit phase split, no view change subprotocol, and no checkpoints.

## Why It Matters

- **Teaching value**: PBFT's three phases, HotStuff's QCs, and Tendermint's locking rules each take several pages to explain; Streamlet preserves the core intuition of "why BFT is safe" (vote extension + 2/3 threshold + three-chain confirmation) in just three rules.
- **Research benchmark**: new protocols' proof techniques, liveness assumptions, and network model discussions all use Streamlet as the reference point.
- **Formalization friendly**: the protocol is small enough to be verified as a whole directly in a formal verification tool (TLA+, Ivy).

## Comparison with Related Protocols

| Protocol | Relation | Key difference |
| --- | --- | --- |
| [HotStuff](/consensus/HotStuff) | Both are pipelined BFT | HotStuff uses QCs to optimize performance and has linear view change; Streamlet wants simplicity, not performance |
| [Tendermint](/consensus/Tendermint) | Same class (partially synchronous BFT) | Tendermint has locking rules and instant finality and is complete as engineering; Streamlet is a teaching skeleton |
| [DiemBFT](/consensus/DiemBFT) | Production-grade evolution | DiemBFT's three-chain commit is isomorphic to Streamlet's three-chain confirmation, but adds timeout QCs, pipelining, and execution decoupling |

## Failure Modes (as Design Boundaries)

- **Liveness depends on partial synchrony**: in a purely asynchronous network Streamlet may wait for a leader forever — inside the FLP boundary.
- **No performance engineering**: no signature aggregation, no pipelined amortization, no checkpoints, so directly deployed throughput is entirely unusable.
- **Fairness of the random leader**: leader rotation is driven by an external random source, and the protocol does not itself govern randomness quality.

The value of Streamlet is not that "it runs" but **stripping the minimal core of a consensus protocol out and showing it**: vote extension + three-chain confirmation is the entire skeleton of BFT finality, and the rest is engineering.
