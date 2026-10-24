# Sui

## Whitepaper and Specifications

"Sui Lutris: A Blockchain with Combined Order and Execution" (whitepaper 2022-07) along with the object model documentation, Mysten Labs (Evan Cheng, George Danezis, Adeniyi Abiodun, et al., [docs.sui.io](https://docs.sui.io)); mainnet launched on 2023-05-03.

## What Problem It Solves

Most chains bind "ordering transactions" to "executing transactions" and pay full price for both — yet many operations (such as transferring a solely-owned object) never need network-wide ordering at all. Sui spends consensus only on the transactions that require it.

## Technical Achievements and Contributions

- **The Move object model**: assets are linear resource objects (see the [compute layer](/layers/Compute)); owned-object transfers take the **fastpath**, bypassing consensus, while shared objects are the only ones entering global ordering.
- **DAG mempool consensus**: started with Narwhal/Bullshark, and since 2024 switched to [Mysticeti](/consensus/Mysticeti), bringing finality to about 400 ms — see [Narwhal and Bullshark](/consensus/NarwhalBullshark).
- **zkLogin**: generate an on-chain account from a Web2 login (Google and others) plus a ZK proof — an innovation at the entry layer.
- **SuiBridge and native randomness**: a built-in cross-chain bridge and verifiable random numbers.

## Limitations and Public Incidents

- The fastpath covers only single-owner object operations; complex DeFi still goes through global consensus.
- The early mainnet had few validators and centralization concerns persist; the Move ecosystem toolchain has a higher barrier to entry than EVM.
- Public incidents: in 2025-05 the Cetus protocol was attacked (about $220 million, a protocol-level defect) — validators voted to freeze the attacker's funds, sparking a governance debate over the boundary of "chain-level intervention"; no public record found at the consensus layer itself.
