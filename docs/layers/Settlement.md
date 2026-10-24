# Settlement Layer

The settlement layer is the trust anchor: it reaches finality (probabilistic or deterministic) on transaction ordering and state transitions through [consensus algorithms](/consensus/Consensus), and lets upper layers (L2s, cross-chain bridges) settle their commitments here. It answers one question — **which state is irreversible**.

## Definition

Settlement layer = consensus protocol + finality model + cross-chain commitment mechanism.

- **Consensus protocol**: how to get a set of mutually distrusting nodes to agree on transaction ordering. This site covers 23 of them, grouped by the resource being committed: compute ([PoW](/consensus/POW)), tokens ([PoS](/consensus/POS), [DPoS](/consensus/DPOS)), reputation ([PoA](/consensus/POA)), capacity and time ([PoSpace](/consensus/PoSpace), [PoT](/consensus/POT)), voting ([PBFT](/consensus/PBFT), [Tendermint](/consensus/Tendermint)).
- **Finality model**: probabilistic finality (PoW + longest chain; the more confirmations, the harder the rollback) and deterministic finality (BFT voting; at +2/3 it is irreversible).
- **Cross-chain commitment**: an L2 settles its state roots to L1, and a cross-chain bridge settles external events onto the local chain. The commitment mechanism is the conduit of trust transfer — and the place attacks concentrate.

Below the settlement layer is the network layer (not part of the four-layer model); above it are the [Storage Layer](/layers/Storage) (committing state roots), the [Compute Layer](/layers/Compute) (packing execution results) and [Service Discovery](/layers/ServiceDiscovery) (recording ownership).

## Problems It Solves

1. **Finality**: probabilistic vs deterministic. Probabilistic finality is permissionless and you can join instantly, but rollback probability decays exponentially with confirmations rather than reaching zero; deterministic finality is fast and irreversible, but the validator set needs identity management and node count is capped by communication complexity.
2. **Reorgs and rollbacks**: 51% attacks and long-range attacks can both roll back "confirmed" state. Solutions are confirmation thresholds (probabilistic) and weak subjectivity (a new PoS node must sync from a recent trusted state).
3. **Cross-chain settlement**: L2 → L1 commitments and proofs (optimistic fraud proofs vs ZK validity proofs), and verification of external events by bridges. Which layer a commitment settles into decides how much the upper layer can lose.
4. **Shared security vs independent security**: Polkadot's NPoS division of labor and Cosmos's self-governing zones — each route traded away something different.

## Existing Systems

| Shape | Systems | Finality |
| --- | --- | --- |
| PoW longest chain | Bitcoin | Probabilistic, about 6 confirmations |
| PoS + BFT voting | Ethereum Gasper (LMD-GHOST + Casper FFG), Tendermint, Aptos | Dual track: probabilistic + deterministic |
| BFT family | PBFT, MaxBFT, TowerBFT, HotStuff variants | Deterministic, 2f+1 signatures |
| Asynchronous BFT | [HoneyBadgerBFT](/consensus/HoneyBadgerBFT) | Deterministic, no dependence on timeouts |
| Probabilistic leaderless | [Avalanche](/consensus/Avalanche), [Snowball](/consensus/Snowball) | Probabilistic, sub-sampling |
| Optimistic L2 | Optimism, Arbitrum | Follows L1, plus a challenge period |
| ZK L2 | zkSync, StarkNet | Follows L1, plus proof verification |
| Modular DA chain | Celestia | Commits to data availability only, does no settlement |

## Open-Source List

- [lighthouse](https://github.com/sigp/lighthouse): Ethereum client, beacon chain and execution layer
- [reth](https://github.com/paradigmxyz/reth): an Ethereum client written in Rust
- [optimism](https://github.com/ethereum-optimism/optimism): OP Stack, optimistic rollup
- [cosmos-sdk](https://github.com/cosmos/cosmos-sdk): Cosmos zone framework, Tendermint consensus
- [ibc-go](https://github.com/cosmos/ibc-go): Go implementation of the IBC cross-chain protocol
- [polkadot-sdk](https://github.com/paritytech/polkadot-sdk): Substrate and FRAME for Polkadot/BSC
- [risc0](https://github.com/risc0/risc0) / [sp1](https://github.com/succinctlabs/sp1): ZK proving, the foundation of the validity-proof route
- [hbbft](https://github.com/poanetwork/hbbft): POA Network's Rust implementation of asynchronous BFT (HoneyBadger variant)

## Failure Modes

- **51% reorg**: see [51% Attack](/hacking/51Attack). More than half the network's hashrate and you can reorg without limit. Under probabilistic finality, the boundary of the attack is economic cost, not physical impossibility.
- **Long-range attack**: when a PoS node syncs from genesis, an attacker can forge the entire history. The solution is weak subjectivity — new nodes must start from a recent trusted state, which is itself a trust assumption.
- **Bridge attacks**: Ronin (2022, about $625 million) and Wormhole (2022, about $326 million) were both signature verification or permission flaws in cross-chain settlement contracts. Bridges are the conduit of trust transfer, and the attack surface with the largest losses.
- **Funds locked during the fraud-proof challenge window**: optimistic rollup withdrawals must wait out the challenge period, during which funds are unusable. That is the price "optimistic execution" pays for speed.
- **Trust assumptions of ZK proofs**: trusted setup (some ZK-SNARKs), circuit bugs, prover bugs — all of them put the safety of "verification is extremely fast" entirely on the correctness of the prover.
- **Cascading finality rollbacks**: an L2's finality inherits L1's. When L1 reorgs, the L2 rolls back with it, and the L2's own users see "confirmed transactions being canceled".
- **Validator collusion and failing slashing**: slashing is the core of PoS economic security, but evidence-based punishment for double signing and surround voting has boundaries; weak subjectivity makes "consensus history cannot be trusted" an unavoidable cost.
- **Shared security made into a single point**: modular architecture separates execution from settlement, but if everyone finally settles onto the same L1, that L1 is the single point.

Settlement-layer failures almost all follow one pattern: **the conduit of trust transfer itself has holes**. When reading a settlement-layer case, ask first "which layer does the commitment settle into, who verifies that commitment, and is that verifier itself trustworthy".

## Design Points

- Pick the trust assumption before the algorithm: crash fault tolerance (2f+1, [Paxos](/consensus/Paxos)/[RAFT](/consensus/RAFT)) vs Byzantine fault tolerance (3f+1, the BFT family) — the price difference sets the entire cost of the node model.
- Finality is a two-way choice: probabilistic (confirmations) has high throughput but can roll back, deterministic (voting) is irreversible but needs 2/3 online — a hybrid of block production + finality gadget can have both in stages.
- The consensus resource decides the Sybil-resistance model: compute/stake/identity/space/time — whichever resource you choose, you inherit that resource's economics and attack surface.
- Bootstrapping new nodes is PoS's built-in gap: weak subjectivity means syncing must introduce trusted checkpoints; do not pretend you can replay trustlessly from genesis.
