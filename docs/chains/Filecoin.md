# Filecoin

## Whitepaper and Specifications

The "Filecoin: A Decentralized Storage Network" whitepaper, Protocol Labs (Juan Benet), 2017-07; the authoritative specification is [spec.filecoin.io](https://spec.filecoin.io) (the chapters on Storage Power Consensus, Proof-of-Replication, and Proof-of-Spacetime); mainnet launched on 2020-10-15.

## What Problem It Solves

IPFS answered "how to address content" but not "who is willing to store it" — Filecoin turns storage into a consensus resource, giving "keeping data retrievable" a self-sustaining economic incentive loop.

## Technical Achievements and Contributions

- **Expected Consensus (SPC)**: a secret leader election weighted by storage power, with quality-adjusted power as the vote and the drand beacon supplying randomness — the mechanics are covered in the [PoST](/consensus/PoST) deployment case.
- **PoRep + PoST, two proofs**: sectors can be sealed and reproduced and are audited continuously (WindowPoSt over a 24-hour window), with proofs SNARK-compressed before going on chain.
- **FVM/FEVM (2023-03)**: a WASM multilingual virtual machine plus an EVM-compatible runtime, putting the storage market on-chain as contracts (see the [storage layer](/layers/Storage)).
- **Retrieval market and payment channels**: off-chain streaming block delivery settled with payment vouchers (the retrieval routing key, the PayloadCID, never touches the chain).

## Limitations and Public Incidents

- Storage demand has long been driven by mining subsidies, and the share of genuinely paid-for storage is a running controversy.
- Slashing and collateral barriers are high, so miner economics swing widely.
- Public incidents: none found in the public record (at the consensus layer; retrieval and user-experience shortcomings are product issues).
