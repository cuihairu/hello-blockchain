# Storage Layer

The storage layer is responsible for persisting state and data verifiably: on-chain global state (Merkle trees), state rent, data availability (DA), and off-chain/decentralized storage networks (content addressing + proofs). It answers three questions: **is the data still there, can it be retrieved, and is what you retrieve the same thing**.

## Definition

Storage layer = state tree + data availability + persistence incentives.

- **State tree**: global state (accounts, contract storage) is organized into a Merkle tree whose root hash is committed by the [Settlement Layer](/layers/Settlement). Every state change shows up as a change in the root, so a light node can verify that some state exists with just the root.
- **Data availability (DA)**: block producers must actually publish the data, otherwise light nodes cannot verify it. DA sampling + erasure coding let light nodes confirm with high probability that "the data has been published" from a few random samples.
- **Persistence incentives**: for off-chain storage, someone has to keep storing long term. Filecoin uses Proof of Replication (PoRep) + Proof of SpaceTime (PoSt) to make "stored, and still storing" verifiable; Arweave uses an endowment model of pay once, store forever.

Above the storage layer are the [Compute Layer](/layers/Compute) (reading and writing state) and [Service Discovery](/layers/ServiceDiscovery) (content addressing); below it is the [Settlement Layer](/layers/Settlement) (committing the state root).

## Problems It Solves

1. **State explosion**: a full node has to store all historical state; after a few years only large institutions can afford to run one → node centralization. Solutions are state expiry, statelessness (witnesses instead of full state) and state rent.
2. **Data availability**: how does a light node confirm that block data was really published and not withheld? Solutions are DA sampling and erasure coding (2D Reed-Solomon).
3. **Persistence incentives**: for off-chain storage, who stores, and how do they prove they still do? Solutions are storage proofs (PoRep/PoSt) and storage markets.
4. **Content addressing**: address by content hash — if the content changes the hash changes, so tampering is prevented by construction. The chain stores only the hash and the content lives off-chain: on-chain commits to the hash, off-chain guarantees retrievability.

## Existing Systems

| Category | System | Mechanism |
| --- | --- | --- |
| On-chain state | Ethereum Merkle Patricia Trie | State root committed by blocks; roadmap is statelessness and state expiry |
| Decentralized storage | Filecoin | PoRep + PoSt, storage market and retrieval market kept separate |
| Permanent storage | Arweave | blockweave, pay once, endowment interest funds permanent storage |
| Ethereum-ecosystem storage | Swarm | Incentive layer aligned with Ethereum, content addressing |
| Data availability layers | Celestia, EigenDA, EIP-4844 blobs | DA only, no execution; modular layering |
| Indexing and query | The Graph | Subgraphs index on-chain data, GraphQL queries |
| Traditional decentralized storage | Storj, Sia | Erasure coding + contracts, no on-chain proofs |

## Open-Source List

- [go-ethereum](https://github.com/ethereum/go-ethereum): Merkle Patricia Trie and state tree implementation
- [lotus](https://github.com/filecoin-project/lotus): Filecoin node implementation (PoRep/PoSt)
- [arweave](https://github.com/ArweaveTeam/arweave): Arweave node and blockweave
- [celestia-node](https://github.com/celestiaorg/celestia-node): Celestia DA node
- [kubo](https://github.com/ipfs/kubo): IPFS reference implementation, content addressing
- [graph-node](https://github.com/graphprotocol/graph-node): The Graph indexing node
- [bee](https://github.com/ethersphere/bee): Swarm node implementation

## Failure Modes

- **State bloat → node centralization**: the higher the bar for running a full node, the fewer people can verify independently, and the more the network depends on a few large nodes. This is the storage layer's stealthiest and deadliest failure.
- **Sybil attacks on storage proofs**: forging PoSpace/PoRep earns rewards for free, so a proof must be bound to a hardware assumption (PoRep's sealing cost) or a cryptographic assumption (PoSt's continuous challenges).
- **Data withholding**: a miner/validator publishes the block header but not the data, and light nodes cannot tell. DA sampling and erasure coding make withholding statistically visible.
- **Pinning dependence**: IPFS is a content-addressed cache; unpinned data disappears. NFT metadata on IPFS that nobody pins leaves the chain holding a hash pointing at thin air.
- **Rent model design failure**: too expensive and nobody uses it, too cheap and garbage data floods in. Arweave's endowment model bets on storage costs falling over the long run.
- **Proof-of-time games**: PoT (verifiable delay functions) must prevent "accelerating the serial computation with dedicated hardware" — pull that off and you can forge time itself.
- **L2 data availability committee collusion**: hand DA to a small committee, the committee colludes to withhold data, and the L2 halts. That is the trust assumption "modularity" buys.

Storage-layer failures almost all follow one pattern: **on-chain only ever committed to a hash, and nobody off-chain guarantees the content still exists**. When reading a storage-layer case, ask first "which layer holds the hash commitment, who guarantees the content is retrievable, and what incentive does that party have to keep storing".

## Design Points

- On-chain commitment and off-chain retrievability are two different things: the state root goes into consensus, but data availability needs its own proof (sampling + erasure coding) — "on-chain" does not equal "retrievable".
- Long-term retention needs a closed incentive loop: storage proofs (PoRep/PoST) turn "is it still there" into an ongoing settleable challenge; goodwill pinning cannot carry permanence.
- State growth decides the node bar: full-node storage grows monotonically and slowly crowds out independent verification; design for state expiry/statelessness early.
- Content addressing prevents tampering but not disappearing: the address is the hash, which makes integrity verifiable for free, while availability needs replication and a pinning economy.
