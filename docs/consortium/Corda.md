# R3 Corda

Corda is a distributed-ledger platform designed by the R3 consortium (founded by financial institutions in 2015): it bills itself as "built for business" — transactions are **not broadcast globally** and are shared peer-to-peer only among the transaction's stakeholders; global uniqueness (double-spend prevention) is delegated to a separate **notary** infrastructure. The ledger model is [UTXO](/model/UTXO) (state + contract) rather than the [account model](/model/Account), and business processes are orchestrated by a deterministic **flow framework**. It is written in Kotlin and runs on the JVM; contracts can be written in Java and other JVM languages.

Corda's classical difference from a "blockchain" is that it has **no global ledger**: each node sees only the transactions relevant to itself, so privacy is a structural default rather than an add-on layer.

## The Four Essentials

- **Which layer**: [Settlement](/layers/Settlement) — state uniqueness and ordering are guaranteed by the notary, and the ledger is partitioned by stakeholders
- **What it solves**: collaboration between financial institutions needs "only stakeholders see the transaction + global double-spend prevention"; Corda splits these two jobs with peer-to-peer sharing plus a notary signature
- **How well it solves it**: privacy by default (non-stakeholders cannot even obtain the data), a pluggable notary (two modes: validating / non-validating), and a JVM ecosystem that is friendly to financial IT; the price is that "no global ledger" weakens global observability, the notary becomes a trust anchor requiring separate governance, and cross-network interoperability needs an extra layer (the network map and the trust root)
- **Source**: [corda/corda repository](https://github.com/corda/corda) (official README: the Features section lists the flow framework, the peer-to-peer network, the notary infrastructure that "validate uniqueness and sequencing of transactions without global broadcast", and CorDapps); the official documentation site docs.r3.com was unreachable when this site was written (403, no public mirror found as a substitute)

## Core Mechanisms

- **State and contracts (UTXO family)**: the atomic unit of the ledger is a "state" — a typed piece of data plus an owner. A transaction consumes input states and produces output states; each state type is paired with a contract (contract) that verifies "this consumption and this production are business-legal." This belongs to the same family as [Bitcoin's UTXO](/model/UTXO), except that a state can carry arbitrary business data (invoices, agreements, positions).
- **Notary**: the double-spend-prevention component — a transaction is first sent to the notary, which confirms the input states are unconsumed and then signs the transaction (providing a timestamp and an ordering). Two modes: a validating notary re-executes the transaction to verify it is legal; a non-validating notary only checks that states are unconsumed and never looks at the transaction content (better privacy, but more trust shifted to the initiating party). The notary is an independent trust anchor and may be formed into a cluster across several institutions.
- **Peer-to-peer sharing (no global broadcast)**: a transaction is sent only to its stakeholders (the owner of the input states, the participants of the output states, the notary). There is no global mempool and no network-wide block broadcast — the "ledger" is each node's own subgraph of transactions.
- **Flow framework**: business processes (initiation, negotiation, signature collection, notarization, settlement) are written as deterministic flows — a state machine spanning multiple rounds of message exchange, with the JVM runtime responsible for suspend/resume and error retries. A CorDapp (a Corda application) = contracts + flows + state, packaged together.
- **Two generations of architecture**: the first-generation implementation in the repository covers Corda 1-4; from Corda 5 onward the platform switches to a second-generation architecture (a reorganization decoupling applications from the cluster; the official README notes that the second-generation implementation has moved elsewhere).
- **Network and admission**: node identity is managed by the network map service, and admission relies on a membership policy — Corda Network is its global network, on top of which a business network (BN) can establish its own governance.

## How It Differs from Other Consortium Chains

| Dimension | Corda | [Fabric](/consortium/Fabric) | [FISCO BCOS](/consortium/FiscoBcos) | [Besu](/consortium/Besu) |
| --- | --- | --- | --- | --- |
| Data visibility | Peer-to-peer, no global ledger | Channels (one ledger per organization subset) | Groups (one ledger per node subset) | Chain is globally visible + optional private transactions |
| Double-spend prevention / ordering | Notary signature | Ordering service (Raft) | PBFT within a group | QBFT voting |
| Ledger model | UTXO (state + contract) | KVDB world state | Shared ledger within a group | Account model (EVM) |
| Contract language | Java / JVM family | Go / Java | Solidity / Go / Java | Solidity |
| Implementation language | Kotlin / JVM | Go | C++ | Java |

## Failure Modes

- **The notary as a trust anchor**: in non-validating mode the notary guarantees uniqueness but does not validate content — when an initiator submits an illegal transaction, the line of defense is the receivers' local validation; validating mode lets the notary see the transaction content, narrowing privacy. The mode choice is itself a trade-off.
- **Weak global observability**: without a global ledger, regulatory audit and network-wide risk control need an additional data-reporting layer (each party exports its own data), and cross-institution reconciliation depends on stakeholders honestly executing the protocol.
- **Network-map single point**: failures of the network map and identity service affect establishing new connections and member admission; operations require multi-instance deployment.
- **Version-migration cost**: Corda 1-4 and Corda 5 are two generations of architecture, so migration is not a smooth upgrade (the official README explicitly notes that the two generations are in separate repositories).
- **Major mainnet-level incidents**: no public record found.
