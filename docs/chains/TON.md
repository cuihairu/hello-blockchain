# TON (The Open Network)

TON began as Telegram's 2018 TON whitepaper (led by Nikolai Durov): a "blockchain of blockchains" designed for a billion users — the masterchain handles consensus and configuration, workchains process transactions, and native sharding supports an arbitrary number of workchains. After Telegram withdrew in 2020 amid the SEC lawsuit, the open-source community carried the development forward, and mainnet launched in 2021 — today's The Open Network.

## Whitepaper and Specifications

"The Open Network" whitepaper — Dr. Nikolai Durov (Telegram team), 2019; after Telegram abandoned the project in 2020-05, the community-run TON Foundation took over, and mainnet (Toncoin) launched in 2021; current documentation is at [docs.ton.org](https://docs.ton.org).

## What Problem It Solves

An entry point for hundreds of millions of instant-messaging users plus massive concurrency — using unbounded sharding to make TPS "scale with user growth."

## Technical Achievements and Contributions

- **Unbounded sharding architecture**: masterchain + workchain + shardchain splitting and merging dynamically — see the heterogeneous contrast in [DAG](/model/DAG) and sharded execution in the [compute layer](/layers/Compute).
- **Catchain BFT**: a Byzantine fault tolerant consensus variant — see [BFT](/consensus/BFT).
- **TVM + FunC/Tact**: an asynchronous, message-driven contract model.
- **Telegram Wallet integration**: a proving ground for distribution channels (an embedded wallet plus the mini-app ecosystem).

## Limitations and Public Incidents

- The ecosystem is deeply dependent on the single point of Telegram; the validator set is small and decentralization is weak.
- Public incidents: a network-wide halt of about 6 hours on 2024-08-27 (triggered by the load of the DOGS airdrop; recovered through validator-coordinated restarts).

## Supplementary Notes
### Fundamental Principles and Technical Characteristics

1. **Catchain consensus (BFT)**:
   - Validators reach Byzantine fault tolerant agreement on blocks through the Catchain consensus protocol, and block production rights are determined by PoS stake: stake Toncoin to stand for validator — see [BFT](/consensus/BFT) and [PoS](/consensus/POS).

2. **The masterchain + workchain architecture**:
   - The **masterchain** carries network configuration and final consensus, while **workchains** process transactions and can be sharded further; this is a design that makes "sharding" a first-class citizen, a counterpoint to the DAG route of the [accounting models](/model/Models).
   - Smart contracts run on the TON Virtual Machine (TVM), with FunC/Fift as the contract languages.

3. **The Telegram distribution channel**:
   - TON is deeply integrated with Telegram (embedded wallet, bot payments, mini apps), and is the representative of the "instant messaging app ships a chain" approach.

### Ecosystem and Development

- **Project history**: the 2018 whitepaper and a roughly $1.7 billion private placement → the 2019 SEC lawsuit → in 2020 Telegram withdrew and refunded investor funds → the community (TON Foundation) carried on, with mainnet launching in 2021. Ownership of a chain comes down to who maintains the client, not to who announced it first.
- **Toncoin**: the native token, used for staking, paying transaction fees, and governance.
- **Official materials**: [TON documentation](https://docs.ton.org/) (including an outline of Catchain consensus); the original whitepaper lives in the [ton-blockchain/ton](https://github.com/ton-blockchain/ton) repository.

### Application Scenarios

- **Payments and social integration**: transfers, tipping, and bot payments built on Telegram's user base.
- **High-throughput sharded applications**: large-scale consumer applications that need horizontal scaling.

### Summary

TON's technical core is Catchain consensus built on BFT+PoS, layered over native multi-chain sharding; its historical note is a rare case of "the project sponsor withdrew and the community carried on." For its place in the consensus genealogy, see the [consensus algorithm evolution timeline](/zh/consensus-timeline).
