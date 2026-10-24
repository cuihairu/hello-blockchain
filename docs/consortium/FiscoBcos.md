# FISCO BCOS

FISCO BCOS is an open-source consortium-chain platform, jointly initiated in 2016 by WeBank, Baidu and other institutions. Its positioning is "a domestic consortium chain for financial scenarios": it uses a **group** for data isolation, the **SM national cryptographic algorithms** (SM2/SM3/SM4) as its cryptographic foundation, and BFT consensus such as **PBFT** for deterministic finality. It is close to the channel model of [Fabric](/consortium/Fabric), but FISCO BCOS designs multiple groups as **sharded execution** — different groups can process in parallel, and throughput rises with the number of groups.

## The Four Essentials

- **Which layer**: [Settlement](/layers/Settlement) — transaction ordering and state settlement between multiple groups
- **What it solves**: a financial consortium needs both cross-institution collaboration and data isolation plus SM-cryptography compliance; FISCO BCOS isolates with groups, parallelizes with sharded execution, and meets regulation with SM algorithms
- **How well it solves it**: a shared ledger within a group, extended across groups through cross-group calls; sharded execution lets multiple groups run in parallel, so throughput rises with the number of groups; SM algorithms are optional (SM2 signatures, SM3 digests, SM4 symmetric encryption); the price is cross-group call latency, the compatibility cost between SM and standard cryptography, and the operational complexity of many groups
- **Source**: [FISCO BCOS docs · group architecture](https://fisco-bcos-documentation.readthedocs.io/en/latest/docs/design/architecture/group.html), [· consensus algorithms](https://fisco-bcos-documentation.readthedocs.io/en/latest/docs/design/consensus/index.html), [· SM national cryptography](https://fisco-bcos-documentation.readthedocs.io/en/latest/docs/manual/guomi_crypto.html)

## Core Mechanisms

- **Group**: a group is a set of nodes sharing the same ledger. Nodes inside a group execute the same transactions and reach the same state. FISCO BCOS supports one node joining multiple groups at the same time — this is the foundation of sharded execution.
- **Multi-group sharded execution**: because one node can belong to several groups, different groups can execute transactions in parallel on the same set of nodes without blocking each other. Throughput rises nearly linearly with the number of groups — this is FISCO BCOS's core advantage over a single-group architecture.
- **PBFT consensus**: FISCO BCOS adopts PBFT-class BFT consensus (supporting variants such as [PBFT](/consensus/PBFT) and [SBFT](/consensus/PBFT)). The fault-tolerance threshold is n ≥ 3f+1 with strong deterministic finality — once votes reach a 2/3 majority the result is irreversible.
- **SM national cryptographic algorithms**: an optional SM suite — SM2 (asymmetric signatures, counterpart to ECDSA), SM3 (cryptographic digest, counterpart to SHA-256), SM4 (symmetric encryption, counterpart to AES). SM algorithms satisfy compliance requirements in Chinese financial scenarios but are incompatible with international standard cryptography (such as Ethereum's secp256k1); interoperability requires conversion.
- **Pluggable consensus**: FISCO BCOS is designed as a pluggable consensus architecture — besides PBFT it also supports CFT-class consensus (such as [Raft](/consensus/RAFT)) for internal testnets or single-node scenarios.
- **Cross-group calls**: groups access other groups' state through cross-group invocation, whose latency is higher than in-group calls — the main price of FISCO BCOS's multi-group design.

## Failure Modes

- **Cross-group latency**: cross-group calls are slower than in-group ones, and the end-to-end latency of a cross-group business path is hard to settle within a single group — latency is decided by routing and serialization, not guaranteed by consensus.
- **SM compatibility**: SM algorithms are incompatible with international standards, so cross-chain interoperability needs an extra conversion layer; SM key management also adds operational complexity.
- **Multi-group operations**: sharded execution depends on multi-group orchestration, so a growing number of groups amplifies node configuration and state-synchronization overhead.
- **PBFT communication overhead**: PBFT does fully connected communication among 2f+1 nodes, so traffic grows as O(n²) with node count — a constraint shared by all BFT consensuses; FISCO BCOS's group isolation keeps each group's node count in the single to double digits.
- **Major mainnet-level incidents**: no public record found.

## How It Differs from Other Consortium Chains

| Dimension | FISCO BCOS | [Fabric](/consortium/Fabric) | [Corda](/consortium/Corda) | [Besu](/consortium/Besu) |
| --- | --- | --- | --- | --- |
| Data isolation | Group (sharded execution) | Channel | Shared per contract scope | Private transactions |
| Consensus | PBFT (BFT) | Raft (not BFT) | Notary | QBFT (BFT) |
| Cryptography | SM + standard | X.509 + standard | Standard | secp256k1 (EVM) |
| Smart contracts | Go / Solidity / Java | Go / Java | Kotlin / Java | Solidity |
| Sharding | Multi-group parallelism | None | None | None |
