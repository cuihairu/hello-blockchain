# Arbitrum

## Whitepaper and Specifications

"Arbitrum: Scale with Off-chain Fraud Proofs", Ed Felten, Harry Kalodner, et al. (Offchain Labs), 2018; the Nitro specification ([docs.arbitrum.io](https://docs.arbitrum.io)) and the BoLD validation whitepaper in 2023; One mainnet launched on 2021-08-31 and Nitro on 2022-08-31.

## What Problem It Solves

Same problem as Optimism — moving Ethereum execution off-chain — but betting on **interactive fraud proofs**: a challenge is a bisection game between two parties rather than a single-round proof, dropping the cost of "proving one execution" from "replaying it in the EVM" to "playing it out on-chain."

## Technical Contributions

- **Interactive fraud proofs (Nitro)**: the challenge protocol bisections down to the WASM instruction level, with single-step assertions arbitrated on-chain — one of the strongest implementations of optimistic settlement; see [Sequencing and Settlement](/consensus/Sequencing).
- **BoLD permissionless validation (2025-02)**: challenges change from one-on-one to a multi-party race, eliminating delay attacks.
- **Stylus (2024-09)**: WASM contracts coexist with EVM contracts in the same VM (an execution-layer extension; see the [Compute Layer](/layers/Compute)).
- **Orbit chains**: one-click chain deployment on the Arbitrum stack (the L3/appchain route).

## Limitations and Public Incidents

- A single sequencer (with a history of availability incidents) and controversy over large treasury motions in DAO governance (2023-03 AIP-1).
- Public incidents: on 2023-02-25 a sequencer failure halted writes across the network for about 10 hours; on 2023-12-15 writes were partially halted again for about 2 hours; in 2024-10 an ArbOS upgrade defect briefly stopped block production (fixed quickly).
