# Optimism

## Whitepaper and Specifications

No single whitepaper — the OP Stack specification is the authority ([github.com/ethereum-optimism/specs](https://github.com/ethereum-optimism/specs) and the [community.optimism.io](https://community.optimism.io/docs/how-sequencers-work/) docs); the "Optimistic Rollup" concept grew out of the plasma/rollup research discussions of 2018-2019 (Vitalik Buterin's June 2019 rollup post and the Plasma family of papers); OP Mainnet launched on 2021-12-16.

## What Problem It Solves

Execution on Ethereum is expensive — so execution is moved off chain and data is published back to L1, with "fraud proofs + a challenge window" replacing expensive cryptographic proofs, getting the rollup-centric roadmap working first.

## Technical Achievements and Contributions

- **OP Stack / Superchain**: turned the rollup into a standard, forkable stack (Base and OP Mainnet run the same stack), with a cross-chain messaging layer and shared upgrade governance.
- **Permissionless fraud proofs (2024-06)**: anyone can now raise a Fault Proof challenge against an incorrect state root — completing the trust precondition of optimistic settlement, see [sequencing and settlement](/consensus/Sequencing).
- **The Law of Chains and the shared sequencing intent**: the roadmap document for decentralizing the sequencer (a driving force behind based/shared sequencing).
- **RetroPGF and bicameral governance**: a token-governance experiment in retroactive public goods funding.

## Limitations and Public Incidents

- A single centralized sequencer (an availability and censorship surface), and the 7-day challenge window makes capital inefficient.
- Public incidents: in 2021-11 an L1 contract flaw was exploited repeatedly to mint 20 million OP (mostly recovered, amid a whitehat dispute); on 2023-06-09 the sequencer was down for about 2 hours; in 2025-06 20 million OP were minted by accident (a governance error, not fully clawed back).
