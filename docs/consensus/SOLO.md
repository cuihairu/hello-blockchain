# SOLO

SOLO is a literal rendering of "single-node consensus" and refers to the consensus mode in which a **single node independently produces and confirms blocks**: there is no voting and no fork handling, and every block is produced sequentially by that one node. It is not a Byzantine-resistant protocol, but an engineering choice for development, testing, and extremely centralized scenarios.

## Four Key Points

- **Which layer**: [Settlement layer](/layers/Settlement) — a single node independently produces and confirms blocks, with no voting and no fork handling
- **What it solves**: Drop multi-node coordination in development, testing, and demo environments — one node produces blocks in sequence, and iteration is fastest
- **How well it works**: The simplest, lowest latency, zero consensus overhead; the price is a single point of failure, zero fault tolerance, and total centralization — it is not a Byzantine-resistant protocol, only an engineering choice, and must never go to production
- **Sources**: the ordering configuration in the Hyperledger Fabric / Chang'an Chain documentation (an engineering name, with no standalone paper)

## Characteristics

- **Zero communication overhead**: block time is limited only by local I/O and can easily reach thousands of TPS, and blocks are "final" instantly (because the sole recorder decides).
- **Extremely simple implementation**: no leader election, no signature aggregation, no view change; the consensus module degenerates into "write the ledger in sequence".
- **Security depends entirely on that node**: if the node misbehaves or crashes, the ledger is distorted or stalls — there is no redundancy at all.

## Use Cases

1. **Development and unit testing**: Chang'an Chain (ChainMaker), Hyperledger Fabric's solo / development mode, and the Tendermint kvstore demo all provide solo consensus for local functional verification.
2. **Private chain PoC**: a single-organization bookkeeping pilot inside an enterprise, later upgraded to RAFT or PBFT.
3. **Indexing / audit chains**: scenarios that only need a tamper-evident hash chain and do not need mutual trust between parties (such as local forensic evidence).

## Boundary with RAFT

SOLO has no replicas and no failover; when you need "high availability but no Byzantine fault tolerance", the next step is [RAFT](/consensus/RAFT) (multiple replicas, crash fault tolerance); only when the participants do not trust one another do you use a BFT consensus of the PBFT/Tendermint family (see [BFT](/consensus/BFT)).
