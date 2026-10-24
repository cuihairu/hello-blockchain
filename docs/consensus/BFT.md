# BFT

Byzantine Fault Tolerance (BFT) originates from the Byzantine Generals Problem posed by Lamport, Shostak, and Pease in 1982: in a distributed system containing arbitrarily behaving nodes (traitorous generals), how can the loyal generals agree on the same battle plan. BFT is the umbrella term for a class of protocols, and it is the theoretical foundation of the voting layers of consortium chains and PoS public chains.

## The Four Essentials

- **Which layer**: [Settlement](/layers/Settlement) — the theoretical umbrella for a class of voting protocols, the shared foundation of the voting layers of consortium chains and PoS public chains
- **What it solves**: when arbitrarily behaving nodes (traitorous generals) exist, how honest nodes agree on a single state; it gives the boundaries of safety and liveness — tolerating f malicious nodes requires n ≥ 3f+1
- **How well it solves it**: the theoretical lower bounds are clear and insurmountable; but early protocols had excessively high message complexity (exponential, or O(n²) with poor performance), and practicality had to wait for variants such as PBFT (1999) and HotStuff (2018)
- **Source**: Lamport, Shostak, Pease, "The Byzantine Generals Problem," 1982; the FLP impossibility theorem, 1985

## Problem Setup

- The system has $n$ nodes in total, at most $f$ of which are **Byzantine nodes** — they can misbehave arbitrarily: sending no messages, sending false messages, sending different messages to different nodes.
- Conclusion (the oral message protocol OM(m) and the signed message protocol): to tolerate $f$ Byzantine nodes, $n \geq 3f + 1$ is required.
- Intuition: voting needs a strict majority to suppress the interference of adversaries; 2 of every 3 groups must be honest to distinguish "who is lying."

## Two Major Schools

1. **Classical deterministic BFT** (PBFT, Tendermint, and others): state machine replication + multi-round voting, communication complexity $O(n^2)$, node count limited (tens to hundreds), deterministic finality within seconds.
2. **Asynchronous / randomized BFT** (HoneyBadgerBFT, the ABFT class): uses threshold signatures and randomization to break the FLP impossibility limit in asynchronous environments, tolerating weaker network assumptions.

## Integration with Blockchain

- **Permissioned chains**: Hyperledger Fabric (pluggable BFT), FISCO BCOS (a PBFT variant), and others adopt it directly.
- **Public chain PoS**: Ethereum's Casper FFG, Cosmos Tendermint, and Solana's Tower BFT all run BFT voting over a PoS validator set, with stake penalties replacing identity-based accountability.
- **Hybrid architectures**: block production (leader) and finality voting (BFT) are separated, as in Gasper's propose-and-prove structure.

## Safety Thresholds

- Voting weight converges above 2/3: can tolerate < 1/3 adversarial weight while keeping safety and liveness.
- Weight between 1/3 and 2/3: safe but liveness may be lost (a halt).
- Above 2/3: any final state can be forged at will (this is the "golden attack line" of all BFT-class chains; see [long-range attack](/hacking/LongRangeAttack) and [sybil attack](/hacking/SybilAttack)).
