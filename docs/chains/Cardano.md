# Cardano

Cardano is an open-source blockchain platform aimed at providing more secure, more scalable, and more sustainable blockchain infrastructure. The following is a detailed introduction to the Cardano project:


## Whitepaper and Specifications

"Ouroboros: A Provably Secure Proof-of-Stake Blockchain Protocol"— Aggelos Kiayias, Alexander Russell, Bernardo David, Roman Oliynykov, CRYPTO 2017 ([eprint.iacr.org/2016/889](https://eprint.iacr.org/2016/889)); the Cardano whitepaper in 2017 (IOHK). Mainnet launched on 2017-09-29.

## What Problem It Solves

Early PoS had no provable security — Cardano anchored the chain on peer-reviewed formal proofs, treating "academic driven" as the engineering roadmap itself.

## Technical Contributions

- **The Ouroboros family**: VRF lotteries elect the slot leader, with a two-tier epoch/slot clock; successive upgrades (Praos, Genesis) — see [Ouroboros](/consensus/Ouroboros).
- **eUTXO + Plutus**: validation scripts attached to UTXO, with deterministic parallel verification; see [UTXO](/model/UTXO).
- **Formally verifiable orientation**: Haskell throughout the full stack, Ledger specification machine-checked.
- **Hydra scaling**: channelized Isomorphic State Channels (in progress).

## Limitations and Public Incidents

- Slow delivery pace (smart contracts only went live in 2021-09), a small DeFi ecosystem, and low throughput.
- Public incidents: during the transition to decentralization on mainnet in 2021-09, block production briefly slowed (a node defect, recovered within hours); no other network-wide incident records found.

## Additional Notes
### Overview of Cardano

1. **Background and goals**:
   - Cardano was developed by the IOHK (Input Output Hong Kong) team, written in Haskell, and built on a scientific and engineering methodology. Its design philosophy includes a layered architecture, modular design, and an emphasis on security, scalability, and sustainability.

2. **Blockchain hierarchy**:
   - Cardano's architecture comprises two blockchain layers: the Cardano Settlement Layer (CSL) and the Cardano Computation Layer (CCL). CSL handles ADA token transactions, while CCL supports smart contract execution.

3. **Consensus algorithm**:
   - Cardano uses a consensus algorithm called Ouroboros. Ouroboros is a proof-of-stake (PoS) based consensus protocol designed to provide a secure, decentralized, and energy-efficient mechanism for blockchain validation.

4. **Smart contract platform**:
   - Cardano's computation layer provides a smart contract platform supporting multiple programming languages. It originally used a smart contract language called Plutus, which later developed into Plutus Core, supporting Haskell-based programming.

5. **Governance and sustainability**:
   - Cardano emphasizes a community-driven governance model in which ADA token holders can participate in proposing and voting on decisions to drive the network's development and improvement. Cardano's design also takes the network's sustainability and long-term development into account.

6. **Project development and milestones**:
   - Cardano's development has gone through multiple stages and important milestones, including the Shelley mainnet launch (introducing proof of stake and decentralization) and the release of the Goguen era (realizing smart contract functionality). More features and upgrades are planned for the future, such as Voltaire (enhanced governance) and Basho (optimized network performance).

### Applications and Ecosystem of Cardano

- **Financial services**: Cardano's security and scalability make it an attractive platform for financial services, supporting applications such as cross-border payments, identity verification, and asset management.

- **Decentralized applications**: Cardano's smart contract platform offers broad room for decentralized application development, covering areas such as DeFi, NFT marketplaces, and supply chain management.

- **Social impact**: The Cardano project also actively explores how to play a role in the social impact space, such as infrastructure improvement, improved voting systems, and educational support.

Overall, as a pioneering blockchain platform, Cardano is committed to providing global users and developers with secure, efficient, and sustainable blockchain infrastructure through advanced technology and innovative governance models, promoting the development and application of blockchain technology worldwide.
