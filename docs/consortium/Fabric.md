# Hyperledger Fabric

Fabric is the most widely adopted permissioned-chain framework in the Hyperledger foundation: it treats the "organization" as a first-class citizen (one member = one organization), uses a **channel** to draw a data-isolation boundary between members, uses the **MSP (Membership Service Provider)** to map X.509 certificates onto network identity, and then uses an **endorsement policy** to decide "which organizations must have signed for this transaction to count". The ordering service is responsible for packaging transactions into blocks, and from Fabric v2 the default is **Raft** consensus (the old Kafka implementation is deprecated) — note that Raft is crash-fault-tolerant consensus, so Fabric's ordering service is not Byzantine-fault-tolerant, and the security boundary is "ordering nodes are operated by trusted members".

Unlike voting consensuses such as [PBFT](/consensus/PBFT) and [QBFT](/consensus/QBFT), Fabric's strength is not malicious-adversary resistance but **organization-level isolation + policy composition**: one supply-chain company can share assets only with its upstream and downstream inside a channel, without exposing them to the whole consortium.

## The Four Essentials

- **Which layer**: [Settlement](/layers/Settlement) — how state between organizations becomes settled, and which organizations can see what
- **What it solves**: cross-organization collaboration needs both a shared ledger and data isolation; Fabric uses channels to split "one ledger for the whole network" into "one ledger per organization subset"
- **How well it solves it**: channel isolation takes effect between members while the ordering service is shared globally (Raft broadcasts within a group); endorsement policies can be composed per organization and support fine-grained authorization by role (admin / peer); the price is that ordering nodes are not Byzantine-fault-tolerant, identity depends on a member-operated CA, and channel growth amplifies state-synchronization overhead
- **Source**: [Hyperledger Fabric docs · network structure](https://hyperledger-fabric.readthedocs.io/en/latest/network/network.html), [· identity and MSP](https://hyperledger-fabric.readthedocs.io/en/latest/identity/identity.html), [· ledger and world state](https://hyperledger-fabric.readthedocs.io/en/latest/ledger/ledger.html), [· ordering service and Raft](https://hyperledger-fabric.readthedocs.io/en/release-2.5/orderer/ordering_service.html), [glossary](https://hyperledger-fabric.readthedocs.io/en/latest/glossary.html)

## Core Mechanisms

- **Organizations and membership**: an organization is a set of nodes (peers) plus a certificate authority (CA). The CA issues X.509 digital certificates for the organization's peers, users and applications; identity in the network is determined by the organization identifier in the certificate.
- **MSP (Membership Service Provider)**: the MSP maps X.509 certificates onto identities inside the network and defines "who belongs to which organization". Policies and endorsement decisions inside a channel all resolve identity through the MSP.
- **Channel**: a channel is a subset of organizations that share the same ledger. A member can join multiple channels; an organization that has not joined a channel cannot see that channel's data. Fabric's privacy is not encryption but **structural isolation** — an organization not in the channel never obtains the data at all.
- **Endorsement policy**: the endorsement policy in a chaincode definition specifies "which organizations must endorse this transaction before the others accept it." It can be set to combinations such as "any 2 organizations" or "organization A must be included". Endorsement happens on a peer: the peer simulates the transaction, verifies permissions, signs, and then submits the result to the ordering service.
- **Ordering service (Raft)**: ordering nodes package endorsed transactions into blocks in global order and broadcast them. From Fabric v2, Raft is the default implementation (Kafka is deprecated). Raft is crash-fault-tolerant and does not resist Byzantine malice — Fabric's ordering service assumes ordering nodes are operated by trusted members.
- **World state and KVDB**: a peer maintains a local ledger (blockchain + world state). The world state is a key-value view of chaincode data, using **LevelDB** by default (embedded, suitable for simple key-value) with **CouchDB** optional (supports rich queries, such as range queries by field).
- **Chaincode lifecycle**: from Fabric v2 the chaincode lifecycle is split into three steps — install / approve / commit: install onto the peer first, then after organization endorsement and approval, commit to the channel to take effect.
- **Private data**: on top of a channel there is a further layer, "private data collections", letting a subset of members share data without exposing it to everyone in the channel — private data never enters a block of the ordering service, only the participants' world states.

## Failure Modes

- **Ordering nodes are not BFT**: Raft tolerates crashes, not malice. If an ordering node is maliciously controlled, the global ordering may be tampered with — Fabric delegates this line of defense to "member governance" rather than to cryptography.
- **Identity and CA single point**: a CA outage or a leaked certificate affects the identity availability of the entire organization; revoking a certificate must go through the CRL mechanism, and the delay depends on CA configuration.
- **Channel fragmentation**: each channel is a ledger copy, so cross-channel queries need application-layer cooperation across channels. Channel growth amplifies state synchronization and operational overhead.
- **Endorsement performance**: endorsement is local simulation on a peer, so under high throughput endorsement latency becomes the bottleneck; the more complex the endorsement policy, the higher the cross-organization coordination cost.
- **Major mainnet-level incidents**: Fabric is an open-source framework, and no public record of a major on-chain incident against Fabric itself was found (for incidents in specific applications, see the [consortium chain pages](/consortium/Consortium) and [cross-chain bridge attacks](/hacking/CrossChainBridgeAttack)).

## How It Differs from Other Consortium Chains

| Dimension | Fabric | [FISCO BCOS](/consortium/FiscoBcos) | [Corda](/consortium/Corda) | [Besu](/consortium/Besu) |
| --- | --- | --- | --- | --- |
| Data isolation | Channel (organization subset) | Group (similar to a channel) | Shared per contract definition | Privacy partition (transaction-based) |
| Identity | X.509 + MSP | SM / standard certificates | Real-name identity + notary | Permissioning |
| Consensus | Raft (not BFT) | PBFT / CFT | Notary consensus | QBFT (BFT) |
| Smart contracts | Go / Java | Go / Solidity / Java | Kotlin / Java contracts | Solidity (EVM) |
| Privacy | Channel + private data collections | Group + SM national cryptography | Shared per contract scope | Private transactions (based on Ethereum privacy) |
