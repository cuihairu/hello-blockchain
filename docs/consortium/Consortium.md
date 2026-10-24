# Consortium Chains

A consortium chain (consortium blockchain / permissioned blockchain) is a blockchain in which "nodes are governed by known members and admission requires authorization": it keeps the distributed ledger and consensus, but turns "who may come in and keep the books" into a governance question rather than a game-theoretic one — membership is finite and identities are verifiable, so consensus degrades from "withstand arbitrary adversaries" to "tolerate f misbehaving members", which lets it trade BFT voting ([PBFT](/consensus/PBFT), [QBFT](/consensus/QBFT), [MaxBFT](/consensus/MaxBFT)) for high throughput and deterministic finality, at the cost of permissionless openness and external anonymity.

This directory covers consortium chains as "project → four essentials → mechanisms → failure modes". The "which layer" entry of the four-essentials block is uniformly attributed to [Settlement](/layers/Settlement): a consensus algorithm decides how state becomes settled, and a consortium chain merely turns "who is entitled to vote" into a governance question. For the design contrast against public chains, see the [consortium versus public-chain comparison](#consortium-vs-public-chain-comparison).

## How to Read This

- Read the [comparison table](#consortium-vs-public-chain-comparison) first to locate the "consortium versus public chain" axis, then go into individual project pages for mechanisms and failure modes.
- The core tension of consortium chains is "governance for performance": node counts drop from millions to a few dozen, so 2/3-majority voting is feasible, but the security boundary shifts from "hashing power / stake economics" to "the legal force of the member list."
- The "failure modes" sections give real risks and incidents (for projects where no public record was found, that is noted as such).
- Flat lookups of terminology and cards live in the [glossary](/cards/Glossary) and the [knowledge-card index](/cards/Cards).

## Consortium vs. Public-Chain Comparison

| Dimension | Public chain (Bitcoin / Ethereum) | Consortium chain (Fabric / FISCO BCOS / Corda / Besu) |
| --- | --- | --- |
| Admission | Permissionless, anyone may run a node | Permissioned, nodes are governed by known members |
| Identity | Anonymous addresses; Sybil resistance through resources (hashing power / stake) | Real-name or quasi-real-name, identities verifiable and accountable |
| Consensus | Permissionless consensus such as [PoW](/consensus/POW) and [PoS](/consensus/POS) | BFT voting such as [PBFT](/consensus/PBFT) and [QBFT](/consensus/QBFT) |
| Fault model | Asynchronous network + Byzantine fault tolerance; the security boundary is economic cost | Partial synchrony + Byzantine fault tolerance; the security boundary is the member list (n ≥ 3f+1) |
| Finality | Probabilistic finality (the more confirmations, the harder to revert) or a finality gadget | Deterministic finality (irreversible once the vote reaches the threshold) |
| Throughput | Single digits to the thousands of TPS | Tens to thousands of TPS (few nodes, short network round trips) |
| Privacy | Public ledger, privacy supplied by layers ([zero-knowledge proofs](/Privacy/ZeroKnowledgeProof), [mixing services](/Privacy/MixingServices)) | The ledger itself is partitioned by member/channel, so business data is isolated by construction |
| Governance | Community governance, no central entity | Member agreement, usually a consortium or industry alliance |
| Fees | gas / transaction fees | Usually no on-chain transaction fees (settled between members) |
| Typical scenarios | Public money, open finance | Cross-institution collaboration, supply-chain finance, regulatory-compliance scenarios |

## Directory

- [Hyperledger Fabric](/consortium/Fabric) — channels, MSP, endorsement policies, KVDB, Raft ordering; the IBM-led industrial benchmark
- [FISCO BCOS](/consortium/FiscoBcos) — the Chinese consortium chain: group architecture, SM national cryptography, multi-group sharding
- [R3 Corda](/consortium/Corda) — UTXO model, notary, state and contracts
- [Hyperledger Besu / Quorum](/consortium/Besu) — enterprise Ethereum, QBFT consensus, private transactions, EVM compatibility
- [WeBASE](/consortium/Webase) — the open-source middleware from WeBank, an enterprise gateway on top of FISCO BCOS
- [Consortium versus public-chain comparison](#consortium-vs-public-chain-comparison) — the governance-for-performance axis

## Failure Modes

- **Member concentration**: the security boundary of a consortium chain is its member list. If a small number of members collude beyond the fault threshold (f < n/3), the protocol cannot defend against it; the list itself is also a single point — governance failure is protocol failure.
- **The identity-versus-privacy conflict**: real-name identity supports accountability, but it also lets business data be correlated across members. [Channels in Fabric](/consortium/Fabric) and [non-public ledgers in Corda](/consortium/Corda) mitigate this, but both depend on members honouring the protocol.
- **Governance rigidity**: member exit, addition or upgrade requires consensus and legal arrangements, so upgrade costs are high.
- **The performance-versus-decentralization trade-off**: throughput rises as node count falls — adding nodes degrades performance, yet adding nodes is exactly what decentralization demands.
