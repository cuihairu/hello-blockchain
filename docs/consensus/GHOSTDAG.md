# GHOSTDAG

GHOSTDAG is the **BlockDAG ordering protocol** proposed by Sompolinsky, Wyborski, and Zohar in 2018: it generalizes Nakamoto consensus from a "single chain" to a "directed acyclic graph (DAG) of blocks" — block production no longer strings into one chain but weaves concurrently into a graph, which the protocol then linearizes into an irreversible ledger. It is an extension of the [GHOST](/consensus/GHOST) idea onto DAGs and is the consensus foundation of Kaspa (GHOSTDAG's first production implementation).

## The Four Essentials

- **Which layer**: [Settlement](/layers/Settlement) — block production and ordering on a BlockDAG, in the PoW family
- **What it solves**: under the longest-chain rule all concurrent blocks are discarded, so the faster the block production, the greater the waste — throughput is locked in by "single-chain seriality." GHOSTDAG keeps all concurrent blocks in the ledger, orders them by graph structure, and throughput rises with concurrency
- **How well it solves it**: the paper gives formal security guarantees (ordering is irreversible with exponentially small probability); Kaspa mainnet measures sub-second block production and instant confirmation, raising from 1 BPS to 10 BPS after the Crescendo upgrade on 2025-05-05; the costs are complex DAG ordering and k-parameter tuning, full-node memory and bandwidth overhead higher than a single chain, and attack surfaces such as selfish mining still under research
- **Source**: Sompolinsky, Wyborski, Zohar, "PHANTOM and GHOSTDAG: A Scalable Generalization of Nakamoto Consensus" (2018, [eprint 2018/104](https://eprint.iacr.org/2018/104)); Kaspa node implementations ([rusty-kaspa](https://github.com/kaspanet/rusty-kaspa), [kaspad](https://github.com/kaspanet/kaspad))

## Core Mechanism

- **From chain to graph**: each block references multiple predecessors (parent blocks), so blocks weave into a DAG rather than a single chain. Concurrent block production no longer invalidates each other; all enter the graph.
- **k-cluster**: the protocol finds a "k-cluster" on the DAG — a set of blocks in which each block has no more than k neighbors outside the set. k controls tolerance for concurrent blocks: larger k accommodates more concurrent blocks and higher throughput, but also tolerates more from an attacker.
- **Greedy linearization**: GHOSTDAG uses a greedy algorithm to order the blocks in the k-cluster into a linear sequence (selecting blocks by GHOST-style rules), yielding a totally ordered ledger. The paper proves this ordering is irreversible with exponentially small probability.
- **The relationship between PHANTOM and GHOSTDAG**: PHANTOM is the complete theoretical protocol (generalizing Nakamoto consensus to a BlockDAG, avoiding the safety-throughput trade-off), but it requires solving an NP-hard problem; GHOSTDAG is an efficient greedy algorithm that captures PHANTOM's essence and is ready for engineering.

## Kaspa: First Production Implementation

- **Design goals**: a PoW cryptocurrency with instant confirmation and sub-second block times, based on the PHANTOM protocol ([kaspad README](https://github.com/kaspanet/kaspad)).
- **Fair launch**: no pre-mine and no hidden allocation; every coin traces back to an empty genesis block ([kaspa.org](https://kaspa.org/)).
- **Crescendo upgrade (2025-05-05)**: block rate raised from 1 BPS to 10 BPS, with several KIPs introduced ([rusty-kaspa README](https://github.com/kaspanet/rusty-kaspa)).
- **Node implementations**: the Rust version (rusty-kaspa) is the recommended node; the Go version (kaspad) is deprecated.
- **Mainnet launch date**: no public record found (the official sources above list only the protocol and node implementations, not a mainnet date).

## Differences from Related Protocols

| Protocol | Structure | Fate of Concurrent Blocks | Typical User |
| --- | --- | --- | --- |
| Longest chain (Nakamoto consensus) | Single chain | All discarded (orphan blocks) | [Bitcoin](/chains/Bitcoin) |
| [GHOST](/consensus/GHOST) | Single chain + uncle references | Partially counted into weight | Ethereum's PoW era |
| [Tangle](/consensus/IOTA) | DAG | Tip approval, does not converge at low traffic | IOTA |
| GHOSTDAG | BlockDAG | All enter the graph and are ordered | Kaspa (see above) |
| [Narwhal/Bullshark](/consensus/NarwhalBullshark) | DAG mempool + BFT | Ordered after reliable propagation | [Sui](/chains/Sui) |

## Failure Modes

- **The k-parameter safety-throughput trade-off**: raising k increases tolerance for concurrency, but also enlarges the concurrency space an attacker can exploit; parameter choice is a direct exchange between security assumptions and throughput.
- **Selfish mining**: under a DAG structure the return model for an attacker withholding blocks to release them opportunistically differs from a single chain, and the paper and follow-up research are still refining the analysis.
- **Full-node overhead**: DAG storage, memory, and bandwidth costs exceed those of a single chain, and a rising node bar is a centralization pressure.
- **Major mainnet-level incidents**: no public records found.

GHOSTDAG's contribution is **turning "concurrency" from a problem into a resource**: in the single-chain era concurrent blocks were waste; in the DAG era concurrent blocks are throughput. Together with the [Narwhal/Bullshark](/consensus/NarwhalBullshark) DAG mempool and [Lachesis](/consensus/Lachesis) asynchronous DAG, it forms three landing points on the line "the ledger goes from chain to graph."
