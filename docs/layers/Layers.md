# Layered Architecture

Reading a blockchain as four layers builds intuition faster than reading it by "protocol family": each layer guarantees exactly one thing, upper layers depend on the guarantees of the layer below, and a lower layer's failure propagates up to its callers unchanged. This page covers the four layers' overview, their dependencies, and selection intuition. For each layer's definition, problems, existing systems, open-source list and failure modes, see [Compute Layer](/layers/Compute), [Storage Layer](/layers/Storage), [Settlement Layer](/layers/Settlement) and [Service Discovery](/layers/ServiceDiscovery).

## The Four-Layer Model

Ordered top to bottom. Each layer states only the one thing it guarantees and nothing else.

| Layer | One-sentence guarantee | What upper layers see when it fails | Detailed page |
| --- | --- | --- | --- |
| Service discovery | Who owns this name now, and what it points to | Name resolves to a wrong address, or resolution fails | [Service Discovery](/layers/ServiceDiscovery) |
| Compute | Given the same input, every honest node computes the same output | Contract behavior diverges, or transactions are refused execution | [Compute Layer](/layers/Compute) |
| Storage | Is the data still there, can it be fetched, and is what you fetch the same thing | State is unreachable, data has been deleted, metadata is lost off-chain | [Storage Layer](/layers/Storage) |
| Settlement | Which state is irreversible | Confirmations get rolled back, a reorg happens, cross-chain breaks | [Settlement Layer](/layers/Settlement) |

The settlement layer is the trust anchor. None of the upper three layers has an independent source of trust: contract execution is "correct" because some block settled it; data is "fetchable" because some block committed to its hash; a name is "owned" because it was recorded in some immutable ledger. So the security floor of a chain is set by its settlement layer, and the guarantees of the other three layers can only be inherited, never exceeded.

The network layer (P2P networking, gossip propagation, discovery protocols) is not part of these four layers — it is not on the "guarantee" list, only on the "how messages get delivered" list. But it does have failure modes (DoS, partitions, selective blocking), and the settlement layer's liveness assumptions sit on top of it.

## Inter-layer Dependencies and Trust Transfer

```
  Service discovery   name → address / content     depends on: records settled by the settlement layer
  ─────────────────────────────────────────────────
  Compute layer       input → deterministic output depends on: state read from the storage layer, output packed by the settlement layer
  ─────────────────────────────────────────────────
  Storage layer       state tree / data / DA       depends on: root commitment included by the settlement layer
  ─────────────────────────────────────────────────
  Settlement layer    consensus → finality         depends on: none (trust anchor)
```

Three common trust mismatches. When reading a case study, ask first "which layer does this commitment settle into":

- **L2 → L1**: Layer 2 commits state to L1, but executes state transitions on its own layer. An L2's security ceiling is L1's finality, and an L2's fraud or proof bug only loses L2's funds (see the failure modes in [Settlement Layer](/layers/Settlement)).
- **Compute → oracle**: The "external facts" a contract reads are not guaranteed by the settlement layer. When an oracle is manipulated, the contract still executes the polluted data correctly — the compute layer is not at fault; the responsibility sits with whichever layer the data came from.
- **Service discovery → browser**: On-chain name records cannot be tampered with, but browsers must resolve through a gateway. When a gateway is blocked, hijacked or censored, the on-chain record is unchanged yet what the user sees is wrong.

## Who Handles What: Mapping to Other Chapters

| Chapter | Main layer | Notes |
| --- | --- | --- |
| [Consensus Algorithms](/consensus/Consensus) | Settlement | Consensus mechanisms live in the settlement layer; PoW and PoS are its two routes |
| [Ledger Models](/model/Models) | Settlement + Storage | UTXO/account are transaction shapes at the settlement layer, and also the state structures the storage layer indexes |
| [Merkle Tree](/algo/MerkleTree) | Storage | Both the state tree root and the transaction tree root are committed by the settlement layer |
| [Scripts and Opcodes](/opcode/OP_CHECKSIG) | Compute | Scripting is the earliest, most restricted implementation of the compute layer |
| [Bitcoin Mechanics](/btc/BIPS) | Settlement | Most BIPs change settlement rules (block production, confirmations, difficulty) |
| [Privacy and Security](/Privacy/Privacy) | Compute + Storage | Zero-knowledge proofs change the compute layer's "provable invisibility"; stealth addresses change the storage layer's queryability |
| [Hacker Attacks](/hacking/Attack) | Full stack | 51% and reorgs hit the settlement layer, reentrancy and overflows hit the compute layer, dusting attacks hit storage-layer indexing |
| [NFTs and Asset Issuance](/nft/ColoredCoins) | Service discovery + Storage | Token identity is in the compute layer, metadata persistence in the storage layer, human-readable names in service discovery |
| [Well-Known Public Chains](/chains/Chain) | Full-stack examples | Each chain is one concrete selection across the four layers |

## Selection Intuition

- **You only want one tamper-proof record**: you only need the settlement layer (Bitcoin in its purest form); the upper three layers are optional add-ons.
- **You want smart contracts**: you must add the compute layer and accept its bundle of costs — gas, randomness and reentrancy (see [Compute Layer](/layers/Compute)).
- **You want cheap, high-frequency transactions**: the common approach is to move computation off-chain and settle only commitments on-chain (the L2 pattern), which shifts the bottleneck to the storage layer's data availability and the settlement layer's proof mechanism (see [Settlement Layer](/layers/Settlement)).
- **You want data that stays retrievable long-term**: the storage layer needs its own independent storage economy (rent, proofs, erasure coding) — you cannot assume "on-chain equals permanently retrievable", since the chain only commits to a hash and never stores the content.
- **You want human usability**: the service discovery layer solves readability and verifiable ownership, but censorship resistance covers only the on-chain record itself (see [Service Discovery](/layers/ServiceDiscovery)).

A useful order of questioning: **which layer does this requirement land on? Is that layer's guarantee enough? If not, is it because this layer did poorly, or because the layer it depends on collapsed first?**

## Service Network Comparison

Ten networks where "nodes deliver a real service and get settled" chose which mechanism for each of the four layers. Source: meshio research (merged 2026-10-13) — for detailed provenance, see the individual consensus pages.

| Network | Compute layer / service | Storage layer | Settlement layer (consensus and payment) | Service discovery |
| --- | --- | --- | --- | --- |
| Filecoin | Retrieval miners stream blocks off-chain, payment receipts are settled | Sector sealing + continuous [PoRep/PoST](/consensus/PoST) audits | EC: storage-weighted secret election + drand randomness + heaviest chain | CID content-addressed retrieval (routing keys are not on-chain) |
| Arweave | SmartWeave lazy evaluation, execution happens on the client | blockweave + recall chunks + Endowment fund | [SPoRA](/consensus/SPORA): random historical access + VDF rate limiting | Gateways (ArQL index, DNS/TLS) + bundler |
| Akash | Kubernetes containers, manifests transferred directly off-chain | — (no storage market) | CometBFT ([Tendermint](/consensus/Tendermint)): orders/bids/leases on-chain, escrow pays per block | On-chain provider attributes + `signedBy` audit filtering |
| Render | GPU nodes render, Creator frame review + dispute committee | S3/Dropbox integration (centralized) | No block-producing consensus: the chain only does payment escrow (burn-and-mint) | Allocation ordered by tier/hardware/reputation/benchmarks |
| Grass | Personal nodes relay encrypted web requests | — (datasets delivered to institutional buyers) | No block-producing consensus: validator-signed measurements + reputation + stake weighting¹ | Validators allocate traffic by reputation and regional demand |
| Golem | wasmtime ExeUnit / QEMU VM, execution correctness is not verified | — (image repositories) | Consensus outsourced to Ethereum; two-stage settlement, IOU → invoice | Yagna market module matches offer/demand |
| Livepeer | orchestrator/transcoder GPU transcoding, [probabilistic sampling verification](/consensus/DPOS) | — (transcoding is delivery) | DPoS contract on Arbitrum + probabilistic micropayment tickets | Gateway ordered by capability/price/latency/reliability/stake |
| Helium | — (hotspots only forward wireless packets) | — | Own chain ([HoneyBadgerBFT](/consensus/HoneyBadgerBFT)) → migrated to Solana in 2023; [Proof of Coverage](/consensus/ProofOfCoverage) made into an oracle | LongFi on-chain routing (AppEUI maps to hotspots) |
| Bittensor | Miners produce subnet commodities, execution is not verified | — (weights are on-chain) | subtensor PoA block production + [Yuma](/consensus/Yuma) ranking consensus | Validators discover axon endpoints (serve-axon) |
| Theta | Edge nodes cache/relay/GPU cloud | — (video distribution) | [Multi-Level BFT](/consensus/MultiLevelBFT): committee block production + guardian finality | Smart player picks neighbors; payment records set priority |

¹ Grass's original technical whitepaper (grass.io/whitepaper) returns 404 and cannot be verified, so this row's mechanism description follows the current official documentation.
