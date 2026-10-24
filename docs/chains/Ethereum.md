# Ethereum

Ethereum is an open-source blockchain platform that lets developers build and deploy smart contracts and decentralized applications (DApps). The following is a detailed introduction to Ethereum:

## Whitepaper and Specifications

"A Next-Generation Smart Contract and Decentralized Application Platform" — Vitalik Buterin, 2013-11; the "Ethereum Yellow Paper" — Gavin Wood, 2014 ([yellowpaper/paper.pdf](https://ethereum.github.io/yellowpaper/paper.pdf), the formal specification of the EVM and the state transition). Mainnet launched on 2015-07-30.

## What Problem It Solves

Bitcoin script only describes "how money moves," never "how state changes" — what was needed was a world computer that anyone can program and no one can stop: Turing-complete contracts plus a global state machine.

## Technical Achievements and Contributions

- **EVM + account model**: contracts are accounts, state is storage, and gas metering prevents halting attacks — see the [compute layer](/layers/Compute).
- **Smart contract ecosystem primitives**: the ERC-20/721 token standards turned asset issuance into a protocol.
- **The Merge (2022-09)**: the switch from PoW to [Gasper](/consensus/Gasper) ([Casper FFG](/consensus/Gasper) finality + LMD-[GHOST](/consensus/GHOST) block selection), cutting energy use by ~99.95%.
- **Rollup-centric roadmap (since 2020-10)**: L1 does settlement and [data availability](/model/Models) (EIP-4844 blobs, 2024-03), with execution outsourced to L2s such as [Optimism](/chains/Optimism), [Arbitrum](/chains/Arbitrum), and [zkSync](/chains/zkSync).

## Limitations and Public Incidents

- Gas prices swing wildly, MEV front-running is endemic, and scaling depends on the security layering of L2s.
- Public incidents: in 2016-06 The DAO was drained of 3.6 million ETH, and the hard-fork rollback split ETH/ETC permanently; in the autumn of 2016 a run of DoS attacks crippled early clients; on 2023-05-11 and 2023-09-21 finality was briefly lost twice (consensus client defects / load).

## Supplementary Notes
### The Fundamentals and Technical Characteristics of Ethereum

1. **Smart contracts**:
   - One of Ethereum's most distinctive features is its support for smart contracts. A smart contract is a self-executing contract whose terms and conditions are encoded on the blockchain and trigger automatically when specific conditions are met. This allows a wide range of complex applications to run on the blockchain, from simple digital payments to complex financial derivatives and decentralized autonomous organizations (DAOs).

2. **The Ethereum Virtual Machine (EVM)**:
   - Ethereum smart contracts run on the Ethereum Virtual Machine (EVM). The EVM is a global network of public nodes, and anyone can run smart contracts by connecting to the Ethereum network. Contract code is compiled into EVM bytecode and then executed on every node in the network, which guarantees the consistency and reliability of contracts across all nodes.

3. **Consensus algorithms**:
   - **Proof of Work (PoW)**: Ethereum's original consensus algorithm, similar to Bitcoin's proof of work. Miners compete for the right to create new blocks by solving computationally hard mathematical problems, which secures the network.
   - **Proof of Stake (PoS)**: Ethereum completed its move to PoS in September 2022 with The Merge. The beacon chain is responsible for consensus, validators stake 32 ETH to take part in block production and attestation, and energy use fell by roughly 99.95%. Scaling now goes through Layer 2 rollups, gradually introducing data availability schemes such as Proto-Danksharding (EIP-4844).

4. **Decentralized applications (DApps)**:
   - Ethereum lets developers build and deploy all kinds of decentralized applications (DApps), which use smart contracts to achieve transparent, secure, and trustless interaction. Common DApps include decentralized exchanges (DEXs), crypto collectibles, games, and financial services.

5. **The ERC-20 and ERC-721 standards**:
   - Ethereum provides standardized interfaces for digital assets and token issuance, such as ERC-20 and ERC-721. ERC-20 is the general-purpose standard for issuing and managing tokens, while ERC-721 is the standard for unique, non-fungible assets (such as crypto art and in-game items).

### Ethereum's Ecosystem and Application Scenarios

- **Financial services and DeFi**: Ethereum provides the infrastructure for DeFi applications such as lending protocols, stablecoins, and liquidity pools, allowing conventional financial services to operate on a decentralized platform.

- **Decentralized identity**: Ethereum enables decentralized identity verification and digital identity management, letting users control their own identity information and data privacy.

- **Gaming and digital art**: Smart contracts and non-fungible tokens (NFTs) on Ethereum allow digital content such as artwork, game assets, and virtual real estate to be uniquely identified and traded.

- **Supply chain tracking and transparency**: Ethereum smart contracts can be used to establish supply chain transparency and traceability, ensuring product provenance and quality.

### Ethereum's Development and Future Outlook

- **Technical upgrades and scaling**: Ethereum continues to pursue its rollup-centric scaling roadmap, improving network performance, security, and scalability through upgrades such as sharded data availability.

- **Ecosystem growth**: The Ethereum ecosystem keeps growing rapidly, attracting large numbers of developers and projects and driving the adoption and innovation of blockchain technology worldwide.

- **Challenges ahead**: these include challenges around network scalability, transaction costs, and security, as well as how to balance decentralization against user experience.

Overall, as the first blockchain platform to apply smart contracts at scale, Ethereum has opened up new possibilities for innovation worldwide. Its ecosystem and technology continue to evolve, opening broad prospects for future blockchain applications and the digital economy.
