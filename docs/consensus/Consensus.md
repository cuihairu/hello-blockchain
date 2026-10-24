# Consensus Algorithms

Consensus algorithms address the core problem of distributed systems: **how several nodes that do not fully trust each other can reach agreement on the state of a single ledger in an environment with failures and adversaries.** Almost all of a blockchain's trade-offs between performance, security, and decentralization stem from the design choices of its consensus algorithm.

## Problems to Solve

1. **Safety**: all honest nodes eventually acknowledge the same chain/state, and the ledger cannot fork into mutually contradictory "facts."
2. **Liveness**: new valid transactions can keep being packaged and confirmed, so the system never halts permanently.
3. **Fault tolerance**: the system keeps running when some nodes crash (crash fault) or act maliciously (Byzantine fault). The classical result is that in a Byzantine environment, $n \geq 3f+1$ nodes are needed to tolerate $f$ malicious nodes.

## Two Major Technical Routes

### Probabilistic Finality: Nakamoto Consensus

Represented by PoW, combined with the "longest chain / heaviest chain" rule: a node always extends the chain it has seen with the highest accumulated difficulty. Forks are the norm, but the probability of being overtaken by a longer chain drops exponentially with the number of confirmations — **finality is probabilistic**. The upside is permissionlessness and that anyone can join at any time; the cost is slow confirmation and high energy consumption.

### Deterministic Finality: BFT Consensus

Represented by PBFT and Tendermint, a fixed or dynamic validator set reaches an absolute majority (>2/3) confirmation of each block through multi-round voting, so **once finally confirmed, it cannot be rolled back**. The upside is fast confirmation and low energy use; the cost is that the validator set needs identity/stake management, and the node count is bounded by $O(n^2)$ communication complexity.

## Algorithms Covered in This Directory

| Category | Algorithm | Representative Applications |
| --- | --- | --- |
| Proof of Work | PoW | Bitcoin, Litecoin |
| Proof of Stake | PoS, DPoS, PoA, Ouroboros, Algorand, SPoS | Ethereum, EOS, Cardano, Algorand, MultiversX |
| Byzantine Fault Tolerance | PBFT, Tendermint, HotStuff, DiemBFT, QBFT, Streamlet, ABFT, MaxBFT, TBFT, FBA, Snowball, HoneyBadgerBFT, SOLO | Hyperledger family, Cosmos, Aptos, Quorum/Besu |
| Crash Fault Tolerance (CFT) | Paxos, RAFT | Chubby, Spanner, etcd, consortium-chain ordering |
| Resource / Storage | PoC, PoET, PoSpace, PoT, PoST, PoH, SPoRA | Chia, Solana, Arweave |
| Fork Choice and DAG | GHOST, Hashgraph, Narwhal+Bullshark, RPCA, Mysticeti, IOTA Tangle | Ethereum (PoW era), Hedera, Sui, XRP Ledger, IOTA |
| Block Production + Finality Split | Gasper, BABE+GRANDPA, Snowman, Lachesis, Multi-Level BFT | Ethereum, Polkadot, Avalanche, Fantom, Theta |
| Physical-World Proof | Proof of Coverage (PoC) | Helium |
| Subjective Utility | Yuma Consensus | Bittensor |
| Hybrid and Evolved | TowerBFT | Solana |
| Rollup Sequencing and Settlement | Sequencer, shared sequencing, based rollups | Arbitrum, Optimism, Base, Espresso |
| Shared Security Budget | Restaking | EigenLayer |

Each algorithm page opens with a uniform "Four Essentials" block: **which layer** (mapped to the four-layer model in [layered architecture](/layers/Layers)), **what it solves**, **how well it solves it** (strengths, weaknesses, and incidents that have actually occurred), and **source** (paper or whitepaper).

## Selection Intuition

- **Public chain, permissionless**: prefer a sybil-resistance mechanism (computing power or stake) + probabilistic finality, or PoS + BFT voting.
- **Consortium chain, permissioned**: node identities are known, so PBFT-class algorithms can be used directly in exchange for deterministic finality and high throughput.
- **High concurrency, short forks tolerable**: DAG-class structures (see [ledger model · DAG](/model/DAG)).

For the order in which these algorithms appeared and which variant each main chain uses, see the [consensus algorithm timeline](/consensus-timeline); a condensed reference of concepts and sources is in the [knowledge compendium](/knowledge).
