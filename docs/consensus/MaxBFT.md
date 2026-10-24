# MaxBFT

MaxBFT is the consensus algorithm used by AntChain, an engineering variant of the HotStuff-style three-phase BFT consensus, optimized for high throughput and low latency in consortium-chain scenarios.

## The Four Essentials

- **Which layer**: [Settlement](/layers/Settlement) — an engineering variant of the HotStuff-style three-phase BFT, aimed at consortium chains
- **What it solves**: engineering HotStuff's linear communication complexity (QC aggregation + chained pipeline) to give consortium chains deterministic finality with high throughput and low latency
- **How well it solves it**: measured throughput and latency performance are good in consortium-chain scenarios, and view change is linearized; the cost is that it is designed for permissioned networks, its safety depends on node identity and admission governance, and it does not apply to permissionless environments
- **Source**: AntChain technical documentation; same-family theoretical source: Yin, Malkhi et al., "HotStuff," CCS 2019

## Protocol Shape

- **Three-phase voting**: as in HotStuff, a block goes through three voting rounds, `Prepare → Pre-commit → Commit`, each collecting a quorum (QC, Quorum Certificate, of $2f+1$ aggregated signatures).
- **Chained pipeline (Chained HotStuff)**: the three voting rounds are spread across consecutive blocks — the Prepare vote for the $k$-th block simultaneously serves as the Pre-commit for the $(k-1)$-th block and the Commit for the $(k-2)$-th, so one vote does triple duty, markedly reducing the number of communication rounds and latency.
- **Leader rotation**: the leader changes on a view timeout; the new leader uses the highest QC (highQC) as proof for continuing to extend.

## Differences from PBFT

| Dimension | PBFT | MaxBFT / HotStuff family |
| --- | --- | --- |
| View change | A complex dedicated sub-protocol | Routine: changing the leader is changing the view |
| Communication complexity | Network-wide broadcast $O(n^2)$ per phase | Signatures aggregated into a QC, relayed by the leader $O(n)$ |
| Voting target | Different messages voted on in each of the three phases | A unified vote on "the block," chained and reused |

## Engineering Trade-offs in Consortium Chains

- Signature aggregation requires threshold signatures (such as BLS), trading computation overhead for network overhead, with clear benefit at the scale of tens to hundreds of nodes.
- Paired with a transaction pool and a parallel execution engine (AntChain's parallel contract execution) to reach tens of thousands of TPS.
- Similar implementations include the MaxBFT module of Chang'an Chain ChainMaker (also a chained HotStuff variant).
