# zkSync

## Whitepaper and Specifications

"zkSync: Scaling with SNARKs" (Matter Labs, Alex Gluchowski et al., 2019); the proof system and VM specifications for Era are at [docs.zksync.io](https://docs.zksync.io) and [github.com/matter-labs/zksync-era](https://github.com/matter-labs/zksync-era); the zkSync 1.0 mainnet launched in 2020-06, and Era (the zkEVM) on 2023-03-24.

## What Problem It Solves

The optimistic route has to wait 7 days for finality — the ZK route uses validity proofs to turn "correct" into a cryptographic fact: once the L1 contract verifies the proof, it is final, with no challenge window. The price is proof-generation cost and the engineering of VM compatibility.

## Technical Achievements and Contributions

- **zkEVM (Era)**: executes EVM-compatible bytecode on a SNARK-friendly VM (costs dropped sharply after the Boojum rewrite) — see the proof system in [zero-knowledge proofs](/Privacy/ZeroKnowledgeProof).
- **A shared bridge and native account abstraction**: an L1/L2 shared asset bridge, with account abstraction as the default.
- **ZK Stack → Elastic Chain (2024)**: the modular narrative of interoperable ZK chains (contrast the modular branch of [sequencing and settlement](/consensus/Sequencing)).
- **Boojum (2023-12)**: the proof circuits moved to STARK-backed pyramid-style recursion, cutting proof costs by an order of magnitude.

## Limitations and Public Incidents

- Proof generation is centralized (sequencer and prover in one), and a decentralized prover is still on the roadmap.
- EVM compatibility has semantic differences (a compiling zkEVM), so developer migration involves friction.
- The 2024-06 token airdrop allocation dispute (reputational damage in the community, not a technical incident).
- Public incidents: none found in the public record (no mainnet-scale loss of funds; the 2024-06 airdrop allocation dispute was a governance and community matter, not a chain failure).
