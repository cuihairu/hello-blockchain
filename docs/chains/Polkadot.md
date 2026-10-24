# Polkadot

Polkadot is a blockchain platform developed by Parity Technologies that aims to deliver interoperability and scalability between different blockchains. Its design goal is to use a multi-chain architecture and consensus algorithms to let different chains communicate and transfer assets with one another, building a multi-chain blockchain ecosystem. The following is a detailed introduction to Polkadot:

## Whitepaper and Specifications

"Polkadot: Vision for a Heterogeneous Multi-chain Framework" — drafted by Gavin Wood in 2016-11, whitepaper v1.0 in 2019; the current specification is maintained on the [Wiki](https://wiki.polkadot.network). Mainnet launched on 2020-05-26.

## What Problem It Solves

Chains are siloed islands, and having every chain build its own validator set and security budget is too expensive — Polkadot turns "security" into a public good of the relay chain, rented out to parachains.

## Technical Achievements and Contributions

- **Shared security + parachains**: one unified validator pool on the relay chain, with parachains supplying only their state transition — the strict form of heterogeneous multi-chain (contrast [Avalanche](/chains/Avalanche) subnets).
- **BABE block production + GRANDPA finality**: block production and finalization split between two mechanisms — see [BABE](/consensus/BABE) and [GRANDPA](/consensus/GRANDPA).
- **XCMP/HRMP cross-chain messaging**: message channels between parachains with no intermediary token — see the well-designed counterpart in [cross-chain bridge attacks](/hacking/CrossChainBridgeAttack).
- **NPoS + Agile Coretime (2024-25)**: nominated staking evolved into buying core time by the block, retiring the slot auctions.

## Limitations and Public Incidents

- The model is complex (slots / core time / open Gov), the ecosystem has long underperformed expectations, and the debate over parachain economic value capture goes on.
- Public incidents: an upgrade defect on 2021-05-24 briefly halted block production on the relay chain (fixed quickly); no other network-wide incidents found in the public record.

## Supplementary Notes
### The Fundamentals and Technical Characteristics of Polkadot

1. **Multi-chain architecture**:
   - Polkadot uses an architecture built around a Relay Chain, which can support multiple parallel blockchains at once (called Parachains). Each Parachain can be an independent blockchain with its own rules and functionality. The Relay Chain manages the shared security and interoperability of these Parachains.

2. **Consensus algorithm**:
   - **Nominated Proof of Stake (NPoS)**: Polkadot uses a consensus algorithm called NPoS to secure and scale the network. Token holders participate in validation and network security by staking DOT with validators. Validators earn rewards by producing blocks and taking part in governance, and unstaking DOT requires an unbonding period of about 28 days.

3. **Cross-chain interoperability**:
   - One of Polkadot's core design goals is interoperability between different blockchains. Through message passing and state sharing between the Relay Chain and Parachains, different chains can interact and transfer value and data securely, enabling more complex decentralized application scenarios.

4. **Governance model**:
   - Polkadot has a layered governance model that lets token holders take part in important network decisions. Holders can submit proposals, vote, change network parameters, and elect validators, driving the network's development and upgrades.

5. **Security and scalability**:
   - By separating security from scalability, Polkadot aims to solve the scalability problem of traditional blockchains. Each Parachain shares the security of the Relay Chain instead of maintaining the whole network's security alone, raising overall throughput and efficiency.

### Polkadot's Ecosystem and Application Scenarios

- **Decentralized finance (DeFi)**: Polkadot gives DeFi a multi-chain framework, letting different financial services run on independent Parachains and interoperate through Polkadot's cross-chain features.

- **Asset tokenization and trading**: on Polkadot, users can create their own Parachain to tokenize assets and use cross-chain bridges to swap assets with other chains.

- **Identity and data management**: Polkadot also supports a range of applications including identity verification and data management, which can share data across multiple Parachains and verify identity in a secure way.

### Polkadot's Development and Future Outlook

- **Continued technical progress**: Polkadot's development team and community keep investing in technical innovation and improvement to strengthen the network's capabilities and performance.

- **Ecosystem expansion**: over time, the Polkadot ecosystem will keep growing, attracting more developers and projects and driving more application scenarios and innovation.

- **Market recognition**: as a major cross-chain technology platform, Polkadot's standing and influence in the blockchain industry will be further consolidated and extended.

All in all, with its innovative multi-chain architecture, consensus algorithms, and cross-chain interoperability, Polkadot has opened up new possibilities for blockchain technology and aims to be a next-generation blockchain platform able to support a wide range of application scenarios and complexity.
