# HotStuff

HotStuff (The 3rd-generation Practical Byzantine Fault Tolerant Protocol) is the third-generation practical BFT protocol proposed by Yin, Malkhi, and others in 2019, cited as a theoretical source by [DiemBFT](/consensus/DiemBFT), AptosBFT, [MaxBFT](/consensus/MaxBFT), and [TBFT](/consensus/TBFT). Its core contribution is a single one: it lowers steady-state communication complexity from $O(n^2)$ in classical BFT to $O(n)$.

## The Four Essentials

- **Which layer**: [Settlement](/layers/Settlement) — the three-phase BFT of the HotStuff family, the direct ancestor of DiemBFT, AptosBFT, MaxBFT, and TBFT
- **What it solves**: in classical BFT every node must exchange messages with every other in each round of the steady state, so throughput collapses as node count grows — QC (quorum certificate) aggregation of $2f+1$ signatures lets voting chain into a pipeline
- **How well it solves it**: linear communication complexity + linear view change; the theoretical performance is the benchmark of third-generation BFT; the costs are that QC relies on the correctness of the signature aggregation primitive, the three-phase pipeline is complex to implement, and cryptographically verifiable signatures with threshold aggregation are required
- **Source**: Yin, Malkhi, Reiter, Gafni, Abraham, "HotStuff: BFT Consensus with Linearity and Responsiveness," CCS 2019

## Why Classical BFT Cannot Scale

In the three-phase voting of [PBFT](/consensus/PBFT), each node must send messages to all other nodes, so one round is $O(n^2)$. At $n=100$ that is 10,000 messages per round; at $n=1000$ it becomes 1,000,000 — even 100 nodes feel heavy in a consortium chain. HotStuff exists to solve exactly this.

## Core Mechanism: QC and the Pipeline

- **QC (Quorum Certificate)**: $2f+1$ signatures are aggregated into one verifiable object. A validator holding a QC need not collect $2f+1$ votes again; verifying a single aggregated object is enough.
- **Chained pipeline**: the QC of the previous round becomes the precondition for voting in the next round. The three phases — prepare, commit, decide — are chained, and each round depends only on the previous round's QC, with no need for a fresh network-wide handshake every round.
- **Linear view change**: when a leader fails, the number of messages needed for the new leader to take office is also $O(n)$, not the $O(n^2)$ of a PBFT view change.
- **Verifiable signature aggregation**: a QC's aggregation requires signatures that can be compressed to a fixed length and still verified — this is the cryptographic precondition for HotStuff's linear complexity.

## Differences from Related Protocols

| Protocol | Relationship | Key Difference |
| --- | --- | --- |
| [PBFT](/consensus/PBFT) | HotStuff's predecessor | $O(n^2)$ communication; PBFT is the foundation, HotStuff is the scaling answer |
| [MaxBFT](/consensus/MaxBFT) | Engineering version of HotStuff | Optimized for consortium chains with latency tuning and engineered view change |
| [DiemBFT](/consensus/DiemBFT) | HotStuff variant | Paired with the Narwhal mempool, decoupling execution from consensus |
| [Tendermint](/consensus/Tendermint) | Parallel route | Tendermint uses stake weighting + BFT voting, while HotStuff linearizes communication with QC |
| [TowerBFT](/consensus/TowerBFT) | Parallel route | TowerBFT compresses messages with PoH timing, while HotStuff uses QC aggregation |

## Deployment and Limits

HotStuff's theoretical performance has been validated by several engineering implementations, but its safety rests entirely on the correctness of QC's aggregated signature primitive — if signature aggregation can be forged or bypassed, the chain's finality fails outright. This is why HotStuff-based implementations all pair it with independent cryptographic review and redundant design for view change.
