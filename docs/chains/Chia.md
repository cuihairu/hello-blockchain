# Chia

Chia is a project aiming to deliver an energy-efficient blockchain and smart contract platform through Proof of Space and Proof of Time consensus algorithms. It was created in 2017 by Bram Cohen, the founder of BitTorrent, and its mainnet was released in March 2021. The following is a detailed introduction to the Chia project:


## Whitepaper and Specifications

The Chia Network whitepaper and green paper — Bram Cohen, 2017-08 (author of the BitTorrent protocol); mainnet launched on 2021-03-19; see [docs.chia.net](https://docs.chia.net) and GitHub ([Chia-Network/chia-blockchain](https://github.com/Chia-Network/chia-blockchain)) for specifications.

## What Problem It Solves

PoW's energy consumption and the concentration of mining hardware — using idle disk space as the consensus resource, so that "farming" replaces "mining."

## Technical Contributions

- **The PoSpace + PoT (VDF) combination**: space proofs select blocks, while a verifiable delay function counters the hash-power arms race; see [PoSpace](/consensus/PoSpace) and [PoT](/consensus/POT).
- **Chialisp**: a CLVM-based contract language with persistent state.
- **Separation of plotting and farming**: decoupling the creation of proofs (heavy) from farming (light) creates a layered miner hierarchy.

## Limitations and Public Incidents

- Disk wear from plotting (SSD destruction) triggered controversy over the 2021 storage shortage; the coin price has declined for a long time, and the farming economy never scaled up.
- Public incidents: no public record found (network-wide).

## Additional Notes
### Chia's Basic Principles and Technical Characteristics

1. **Proof of Space and Proof of Time**:
   - **Proof of Space**: Chia's mining process is based on Proof of Space, which uses proofs of disk space to guarantee block creation and the security of the chain. Miners pre-store large amounts of random data (called a Plot) and generate a proof demonstrating that they have enough storage capacity to compete for block production.
   - **Proof of Time**: Proof of Time is an additional security layer used to ensure that miners submit new blocks in the agreed time order. Proof of Time uses verifiable time-delay functions to generate valid proofs that a given piece of data has existed after a certain amount of time has elapsed.

2. **Environmental friendliness and energy efficiency**:
   - Chia claims that its Proof of Space mining algorithm is more environmentally friendly and energy-efficient than a Proof of Work algorithm, because the mining process relies mainly on disk storage space rather than computing power, thereby reducing energy consumption.

3. **Smart contract platform**:
   - The Chia mainnet supports Chialisp-based smart contracts from launch, and developers can build and execute smart contracts on it. These contracts exploit Chia's security and decentralized properties to carry out various kinds of trustless application logic.

4. **The Chialisp smart contract language**:
   - Chia includes a built-in functional smart contract language called Chialisp, supporting on-chain primitives such as escrow payments, multisignature, and atomic swaps; combined with the Coin Set ledger model, it enables composable on-chain logic.

### Chia's Ecosystem and Development

- **Chia Network**: The Chia project is developed and maintained by Chia Network, a company founded in 2017 and headquartered in California, United States.

- **Chia Coin (XCH)**: The native token of the Chia network is Chia Coin (XCH), used to pay transaction fees and reward miners. The launch of Chia Coin attracted widespread attention and discussion.

- **Ecosystem building**: The Chia project is actively building its ecosystem, attracting developers and users to participate. This includes developing and promoting a variety of tools, applications, and services to support the use and expansion of Chia's application scenarios.

### Chia's Application Scenarios and Prospects

- **Digital payments and storage**: Chia Coin can be used as a means of digital payment, and at the same time its tiered storage system offers a new solution for data storage and management.

- **Smart contracts and decentralized applications**: Backed by Chialisp, Chia can already support a wide range of decentralized applications (DApps), such as trustless financial services, supply chain tracking, and data notarization.

- **Environmentally friendly blockchain solutions**: As a more energy-efficient blockchain, Chia may find broad application in scenarios concerned with sustainability and environmental friendliness.

### Summary

Through its innovative Proof of Space and Proof of Time consensus algorithms and its environmentally friendly mining model, the Chia project attempts to offer a new solution for blockchain technology. Its goal extends beyond being merely a means of digital payment; it also aspires to become an ecosystem supporting smart contracts and complex applications. As the project develops and the community participates, Chia's position and influence in the blockchain industry may be further strengthened.
