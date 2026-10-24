# Stellar

Stellar is an open-source blockchain payments network that aims to connect banks, payment systems, and people by lowering the cost of cross-border payments and speeding up transactions. The following is a detailed introduction to the Stellar project:

## Whitepaper and Specifications

"The Stellar Consensus Protocol: A Federated Model for Low-Finality Contracts" — David Mazieres, 2015-05/2016 ([stellar-consensus-protocol.pdf](https://www.stellar.org/papers/stellar-consensus-protocol.pdf), the FBA quorum slice model); the Stellar whitepaper dates to 2014 (Jed McCaleb). Mainnet launched on 2014-07-31.

## What Problem It Solves

Cross-border settlement has to be fast, cheap, and accessible to banks and individuals alike — without mining and without every validator having to talk to every other one.

## Technical Achievements and Contributions

- **SCP/FBA**: an open-membership BFT built on quorum slices — each node picks its own trusted combination, and network-wide agreement is guaranteed by slice intersection — see [FBA](/consensus/FBA) and the same-family comparison in [RPCA](/consensus/RPCA).
- **The anchor gateway model**: fiat on-ramps and off-ramps are honored by anchors — compliance is outsourced to specialized institutions.
- **Fixed ultra-low fees + 3-5 second finality**: a payments-grade experience — see the finality trade-offs in the [settlement layer](/layers/Settlement).
- **Soroban (2023-24)**: a Rust/WASM contract runtime added to the network.

## Limitations and Public Incidents

- Quorum slice configuration is complex and error-prone — safety depends on configuring it correctly; ecosystem adoption is limited.
- Public incidents: a version upgrade defect took the whole network down for about 2 hours on 2017-11-27 (an emergency downgrade fix plus a bounty); a validator bug halted the network for about 2 hours on 2019-05-14.

## Supplementary Notes
### An Overview of Stellar

1. **Background and goals**:
   - Stellar is a blockchain project created in 2014 by Jed McCaleb and Joyce Kim, initially to address the high fees and delays of cross-border payments between traditional banks and financial institutions. Its goal is fast, secure, and low-cost money exchange over a decentralized network.

2. **Core technology and architecture**:
   - **Consensus protocol**: Stellar uses a consensus protocol called the Stellar Consensus Protocol (SCP). SCP is a decentralized, fault-tolerant, and efficient consensus mechanism that lets network nodes reach agreement on transaction confirmation over the internet.
   - **Distributed ledger**: Stellar's distributed ledger records all transactions and account balances; this information is shared and synchronized across the nodes of the network, keeping the whole network consistent and secure.

3. **Payment gateways and asset issuance**:
   - Stellar lets users issue and exchange all kinds of assets on its network through payment gateways (anchors) — fiat currencies, cryptocurrencies, and commodity tokens. This allows users to move and exchange assets on the Stellar network quickly and at low cost.

4. **Decentralized exchange and the DEX**:
   - Stellar includes a built-in decentralized exchange (DEX) that lets users swap assets directly on the network without an intermediary. The DEX provides liquidity and price discovery, supporting market trading across all kinds of assets.

5. **Application scenarios and ecosystem**:
   - Stellar's main application scenarios include cross-border payments, micropayments, financial inclusion, and asset tokenization. By lowering transaction costs and increasing transaction speed, it offers an effective payments solution for individuals, businesses, and financial institutions worldwide.
   - Stellar also lets developers build and deploy decentralized applications (DApps), which can use its payment and asset exchange capabilities to create new financial services and tools.

6. **Development and future outlook**:
   - Stellar's development team and community are committed to advancing the network's scalability, security, and user experience. In the future, Stellar may continue refining its technical architecture, strengthening network interoperability, and extending its presence in global payments and financial services.

### Summary

Stellar is an open-source blockchain project focused on cross-border payments and financial inclusion. Through its efficient consensus protocol and decentralized exchange platform, it gives users worldwide a fast, secure, and low-cost payments solution. It supports the issuance and exchange of many asset types, and its built-in decentralized exchange provides the infrastructure for market liquidity and asset circulation. Stellar has broad applications and prospects in fintech innovation and blockchain application development.
