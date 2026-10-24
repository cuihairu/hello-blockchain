---
title: Knowledge Point Master Outline
---

# Knowledge Point Master Outline

> This page consolidates the knowledge points scattered across the topic pages into one place: core concepts, the papers and whitepapers behind them, official documentation, application scenarios, and common pitfalls. Each entry cites its source and links back to the original; entries without verifiable evidence are marked "source unverified." The full version of the evolution timeline is at [Consensus Algorithm Evolution Timeline](/consensus-timeline). The network view of how concepts connect is at [Knowledge Card Index](/cards/Cards), and single-term lookups at [Glossary](/cards/Glossary). Seven topics have been consolidated so far: layered architecture, consensus algorithms, ledger models (including data structures and scripting), privacy and security, attack and defense, NFTs and asset issuance, and well-known public chains.

## Core Concepts

### Security Model

- Consensus must preserve two properties at once (overview at [Consensus Algorithms](/consensus/Consensus)): **safety** (honest nodes agree on a single ledger) and **liveness** (new transactions keep getting committed). The FLP impossibility result (1985) proves that a purely asynchronous, deterministic system cannot have both; the only way out is to introduce a timing assumption (partial synchrony, the PBFT route) or randomness (the HoneyBadger and Avalanche route).
- Tolerating f Byzantine nodes requires **n ≥ 3f+1** (the 1982 Byzantine Generals result); tolerating only crashes (CFT, RAFT) needs 2f+1. This premium is what decides whether a consortium chain picks RAFT or BFT for its trust model.
- The golden line for BFT voting weight: below 1/3 malicious, both safety and liveness hold; between 1/3 and 2/3, safety holds but the chain may stall; above 2/3, final state can be forged. Avalanche is the exception — its probabilistic safety threshold is 1/2.
- **Finality comes in two kinds**: probabilistic (PoW + longest chain; the more confirmations, the harder to roll back) and deterministic (BFT votes reaching 2/3 make the result irreversible). After the Ethereum Merge, mainstream public chains have largely converged on "PoS picks the participants + BFT settles finality."

### Evolution Logic

- What changes between consensus generations is not the voting protocol but the **ledger resource**: compute (PoW) → tokens (PoS) → reputation (PoA) → disk (PoSpace) → time ([PoET](/consensus/PoET), VDF). The voting protocol itself (BFT) is in fact the oldest part: theory in 1982, deployable by 1999.
- PoW's direct intellectual ancestor is the anti-spam Hashcash (1997); Bitcoin's contribution was adding currency and the longest-chain rule on top of the hash budget. b-money and Bit Gold (1998) were unfinished sketches.
- PoS was opened up by Peercoin (whitepaper 2012-08-19), but it was a PoW+PoS hybrid; the first pure-PoS mainnet was Nxt (2013). PoS with a rigorous security proof only starts with Ouroboros (CRYPTO 2017).
- DPoS (2014, Larimer) turned PoS into representative democracy: 21~101 delegates take turns producing blocks. Throughput went up, and so did concerns about vote-trading cartels and vote buying.
- BFT's revival on public chains was sounded by Tendermint (2014), the first design to weld staking and BFT voting into a complete engine; [HotStuff](/consensus/HotStuff) (2018) used pipelining plus signature aggregation to cut communication complexity from O(n²) to O(n) and is regarded as third-generation BFT.
- Hybrid consensus (Decred's PoW block production + PoS tickets) never became mainstream, but it argued for an idea that survives today: block-production rights and finality can be determined by different resources independently. Polkadot (BABE+GRANDPA) and Ethereum (proposals + FFG) are refined versions of this idea.

### Key Building Blocks

- **VDF (verifiable delay function, 2018)**: must be inherently serial and slow to compute, yet instant to verify; used to build a random clock that cannot be predicted or accelerated. Chia uses it for sequencing; Ethereum's RANDAO+VDF uses it to resist grinding.
- **VRF (verifiable random function)**: secret sortition — nobody knows you are a candidate until you are picked. Algorand uses it against targeted attacks; Cardano uses it for leader selection.
- **QC (quorum certificate)**: the HotStuff family aggregates 2f+1 signatures into a single verifiable object, so one vote can serve multiple purposes (chained pipelining). ChainMaker MaxBFT, AntChain, and DiemBFT/AptosBFT all follow this idea.
- **Threshold signatures and shared randomness coins**: the ticket for asynchronous BFT (HoneyBadgerBFT, Dumbo), freeing the protocol from dependence on timeouts.
- **Slashing**: the economic-security core of PoS; double-signing and surround votes are punished with evidence. Its companion, weak subjectivity (new nodes must sync from a recent trusted state), is a cost PoS cannot escape.

## Authoritative Papers and Whitepapers

Sorted by year; the source column points to the corresponding topic page.

| Paper/Whitepaper | Authors and Year | Knowledge Points | On-site Sources |
| --- | --- | --- | --- |
| *The Byzantine Generals Problem* | Lamport, Shostak, Pease, 1982 | BFT problem definition and n≥3f+1 | [BFT](/consensus/BFT) |
| *Impossibility of Distributed Consensus with One Faulty Process* (FLP) | Fischer, Lynch, Paterson, 1985 | The impossibility boundary of asynchronous consensus | [ABFT](/consensus/ABFT) |
| *Consensus in the Presence of Partial Synchrony* | Dwork, Lynch, Stockmeyer, 1988 | Partial synchrony model; PBFT's assumption basis | [PBFT](/consensus/PBFT) |
| *Practical Byzantine Fault Tolerance* | Castro, Liskov, OSDI'99 | Three-phase voting, view change, checkpoints | [PBFT](/consensus/PBFT) |
| *Pricing via Processing* | Dwork, Naor, 1992 | Conceptual origin of PoW (anti-spam) | [PoW](/consensus/POW) |
| *Hashcash* | Adam Back, 1997 | Engineering the hash budget | [PoW](/consensus/POW) |
| *Bitcoin: A Peer-to-Peer Electronic Cash System* | Satoshi Nakamoto, 2008 | Nakamoto consensus, longest chain, difficulty adjustment | [PoW](/consensus/POW), [Bitcoin](/chains/Bitcoin) |
| *PPCoin: Peer-to-Peer Crypto-Currency with Proof-of-Stake* | King, Nadal, 2012-08-19 | PoS starting point, coin age, hybrid form | [PoS](/consensus/POS) |
| *Delegated Proof of Stake* (BitShares whitepaper) | Larimer, 2014 | DPoS representation, delegate accountability | [DPoS](/consensus/DPOS) |
| *Tendermint: Consensus without Mining* | Jae Kwon, 2014 | Staking+BFT, locking rules, ABCI | [Tendermint](/consensus/Tendermint) |
| *The Ripple Protocol Consensus Algorithm* | Schwartz, Youngs, Britto, 2014 | UNL-style consensus | [RPCA](/consensus/RPCA), [FBA](/consensus/FBA) |
| *The Stellar Consensus Protocol* | Mazières, 2015 | Quorum slices, federated admission | [FBA](/consensus/FBA) |
| *The Honey Badger of BFT Protocols* | Miller et al., CCS'16 | Asynchronous atomic broadcast, threshold encryption | [HoneyBadgerBFT](/consensus/HoneyBadgerBFT) |
| *Ouroboros: A Provably Secure Proof-of-Stake Blockchain Protocol* | Kiayias et al., CRYPTO 2017 | First rigorously proven PoS, epoch/slot, VRF | [Ouroboros](/consensus/Ouroboros), [PoS](/consensus/POS), [Cardano](/chains/Cardano) |
| *Casper the Friendly Finality Gadget* | Buterin, Griffith, 2017 | Finality gadget, PoW→PoS transition | [Gasper](/consensus/Gasper), [PoS](/consensus/POS) |
| *HotStuff: BFT Consensus with Linearity and Responsiveness* | Yin, Malkhi et al., CCS'19 | Chained pipelining, QC, linear view change | [HotStuff](/consensus/HotStuff), [MaxBFT](/consensus/MaxBFT), [DiemBFT](/consensus/DiemBFT) |
| *Scalable and Probabilistic Leaderless BFT Consensus through Metastability* (Avalanche whitepaper) | Team Rocket, 2018 | Sub-sampling, metastability, leaderless consensus | [Snowball](/consensus/Snowball), [Snowman](/consensus/Snowman), [Avalanche](/consensus/Avalanche) |
| *A Survey of Two Verifiable Delay Functions* | Boneh, Bünz, Fisch, 2018 | VDF constructions (repeated squaring + incremental proofs) | [PoT](/consensus/POT) |
| *Proofs of Space* | Dziembowski et al., CRYPTO 2015 | Formalization of proofs of space | [PoSpace](/consensus/PoSpace) |
| *Solana: A new architecture for a high performance blockchain* | Yakovenko, 2017 | PoH global clock, leader ordering | [PoH](/consensus/PoH) |
| *Filecoin: A Decentralized Storage Network* | Protocol Labs, 2017 | PoRep/PoSt, storage as consensus | [PoST](/consensus/PoST) |
| *Polkadot: Vision for a Heterogeneous Multi-Chain Framework* | Wood, 2016 draft | NPoS, BABE+GRANDPA division of labor | [BABE](/consensus/BABE), [GRANDPA](/consensus/GRANDPA), [PoS](/consensus/POS), [Polkadot](/chains/Polkadot) |
| *ALGORAND: The Efficient and Democratic Ledger* | Micali, arXiv 2016 | BA⋆, secret sortition | [Algorand](/consensus/Algorand), [PoS](/consensus/POS) |
| *In Search of an Understandable Consensus Algorithm* (RAFT) | Ongaro, Ousterhout, USENIX ATC 2014 | Leader election, log replication, election constraints | [RAFT](/consensus/RAFT) |
| *Lachesis Protocol* | Fantom team, 2019 | Asynchronous DAG block production, super-checkpoint finalization | [Lachesis](/consensus/Lachesis) |
| *Hashgraph Consensus: Fair, Fast, Byzantine Fault Tolerance* | Baird, 2016 | Gossip-about-gossip, virtual voting, fair ordering | [Hashgraph](/consensus/Hashgraph) |
| *Secure High-Rate Transaction Processing in Bitcoin* (GHOST) | Sompolinsky, Zohar, 2015 | Subtree-weight fork choice, uncle block utilization | [GHOST](/consensus/GHOST) |
| *Streamlet: Textbook Streamlined Blockchains* | Chan, Shi, 2020 | Minimal pipelined BFT, three-chain confirmation | [Streamlet](/consensus/Streamlet) |
| *Paxos Made Simple* | Lamport, 2001 | Majority two-phase; origin of crash-fault consensus | [Paxos](/consensus/Paxos), [RAFT](/consensus/RAFT) |
| *Mysticeti* (arXiv:2404.12257) | Mysten Labs, 2024 | Uncertified DAG, sub-second finality | [Mysticeti](/consensus/Mysticeti), [NarwhalBullshark](/consensus/NarwhalBullshark) |
| *The Tangle* | Popov, 2015 | DAG ledger, tip selection, the Coordinator lesson | [IOTA](/consensus/IOTA), [DAG Model](/model/DAG) |
| *EigenLayer: The Restaking Collective* | Kannan et al., 2022 | Restaking's shared security budget | [Restaking](/consensus/Restaking) |
| *Don't overload Ethereum's consensus* | Buterin, 2023 | Correlation-risk boundaries of restaking | [Restaking](/consensus/Restaking), [Settlement Layer](/layers/Settlement) |
| Arweave Yellow Paper (SPoRA/PoA) | Williams et al., 2018-2023 | Random historical access, blockweave, Endowment | [SPoRA](/consensus/SPORA), [Storage Layer](/layers/Storage) |
| Helium whitepaper and HIP-25/51/70 | Helium, 2018-2022 | Proof-of-Coverage three-party challenges, migration to Solana | [Proof of Coverage](/consensus/ProofOfCoverage), [HoneyBadgerBFT](/consensus/HoneyBadgerBFT) |
| Theta 2.0 / 3.0 whitepapers | Theta Labs, 2019-2021 | Multi-Level BFT, Uptime Mining | [Multi-Level BFT](/consensus/MultiLevelBFT) |
| Bittensor whitepaper and docs | Opentensor, 2021-2025 | Yuma median trimming, burn-based registration | [Yuma](/consensus/Yuma) |
| meshio comparable-chains survey | meshio research, 2026-10 | Whitepaper comparison of ten service networks (merged source for this repo) | [Service Network Comparison](/layers/Layers), [SPoRA](/consensus/SPORA), [Yuma](/consensus/Yuma) |
| *Narwhal: A Decentralized, High-Throughput DAG-Based Ledger* | Danezis, Kokoris-Kogias et al., 2021 | Decoupling the DAG mempool from consensus | [Narwhal and Bullshark](/consensus/NarwhalBullshark) |
| *Elrond Whitepaper* | Elrond team, 2019 | Random consensus groups within a shard, BLS random beacon | [SPoS](/consensus/SPOS) |
| *PHANTOM and GHOSTDAG: A Scalable Generalization of Nakamoto Consensus* | Sompolinsky, Wyborski, Zohar, 2018 | BlockDAG ordering, k parameter for tolerating concurrent blocks | [GHOSTDAG](/consensus/GHOSTDAG) |
| *The ZILLIQA Technical Whitepaper* | Zilliqa team, 2017-08-10 | Network sharding + DS committee + pBFT; PoW only for identity | [Sharding](/consensus/Sharding) |
| Phragmén election method and NPoS rules | Edvard Phragmén multi-winner election (1890s); Polkadot adaptation | Nomination evening-out, era re-election, slashing | [NPoS](/consensus/NPoS) |

## Official Documentation

Use these as ground truth for implementation details and current parameters; protocol papers and engineering implementations often diverge, and the engineering account takes precedence.

| Document | Coverage | On-site Sources |
| --- | --- | --- |
| [ethereum.org consensus mechanisms](https://ethereum.org/developers/docs/consensus-mechanisms/poa/) | Gasper and PoA accounts | [PoA](/consensus/POA), [PoS](/consensus/POS) |
| [ChainMaker consensus algorithms](https://docs.chainmaker.org.cn/tech/%E5%85%B1%E8%AF%86%E7%AE%97%E6%B3%95.html) | TBFT/MaxBFT/Raft/Solo pluggability | [TBFT](/consensus/TBFT), [MaxBFT](/consensus/MaxBFT) |
| Hyperledger Fabric docs | Raft ordering, SmartBFT (3.x) | [RAFT](/consensus/RAFT), [PBFT](/consensus/PBFT) |
| [CometBFT docs](https://docs.cosmos.network/cometbft/) | Tendermint protocol status and parameters | [Tendermint](/consensus/Tendermint) |
| [Hyperledger Besu repository](https://github.com/hyperledger/besu) | QBFT/Clique permissioned-chain implementation and parameters (docs/ directory) | [QBFT](/consensus/QBFT), [PoA](/consensus/POA) |
| [Optimism sequencer docs](https://community.optimism.io/docs/how-sequencers-work/) | Rollup sequencing, forced inclusion and shared sequencing | [Sequencing and Settlement](/consensus/Sequencing), [Compute Layer](/layers/Compute) |
| [Sui consensus docs](https://docs.sui.io/concepts/sui-architecture/consensus) | Mysticeti mainnet parameters and flow | [Mysticeti](/consensus/Mysticeti), [NarwhalBullshark](/consensus/NarwhalBullshark) |
| Aptos and Sui official docs | AptosBFT, Narwhal/Mysticeti | [MaxBFT](/consensus/MaxBFT) (same HotStuff lineage) |
| [Chia official docs](https://docs.chia.net/proof-of-space/) | PoSpace+PoT engineering details, farmer cost structure | [PoSpace](/consensus/PoSpace), [PoT](/consensus/POT) |
| [Zilliqa technical whitepaper](https://docs.zilliqa.com/whitepaper.pdf) | Sharding design, DS committee, pBFT and EC-Schnorr multisig | [Sharding](/consensus/Sharding) |
| [Kaspa node implementation](https://github.com/kaspanet/rusty-kaspa) | GHOSTDAG production implementation, Crescendo upgrade 1→10 BPS | [GHOSTDAG](/consensus/GHOSTDAG) |
| [Polkadot wiki · Phragmén](https://wiki.polkadot.com/docs/learn-phragmen), [· staking](https://wiki.polkadot.com/docs/learn-staking) | NPoS election algorithm, era cycles, slashing rules | [NPoS](/consensus/NPoS) |
| Grass official site | Bandwidth sharing and reward terms (whitepaper 404, not retrievable) | [Proof of Bandwidth](/consensus/BandwidthProof) |
| Decred docs | Hybrid consensus (PoW blocks + PoS tickets) | [PoS](/consensus/POS) |
| Gnosis Chain docs | POSDAO (xDai sidechain converted to PoS) | [PoA](/consensus/POA) |

## Application Scenarios

- **Permissionless public chains**: a Sybil-resistance mechanism is the entry ticket — either compute (PoW) or stake (PoS). Probabilistic finality buys open admission (Bitcoin), or PoS+BFT buys fast confirmation (the Ethereum and Cosmos families). The first selection question is whether nodes can join anonymously.
- **Consortium/permissioned chains**: identities are known, so go straight to the PBFT/HotStuff family for deterministic finality and high throughput; if mutual trust is high and only crash faults matter, use RAFT (the Fabric ordering layer); a single-institution pilot can start with [SOLO](/consensus/SOLO) and upgrade later.
- **Testnets and sidechains**: PoA's home turf — accountable validator identities, zero gas cost, fast blocks. Pioneered by Kovan/Rinkeby; BNB Smart Chain's Parlia added staking and evolved into PoSA.
- **Storage and green narratives**: [PoC](/consensus/POC)/[PoSpace](/consensus/PoSpace) draws lots with disk capacity (Burstcoin, Chia); PoSt also counts sustained holding (Filecoin, Spacemesh). Note that green credentials deserve a discount: plotting write volume and the disk arms race are real costs.
- **Time-sensitive scenarios**: where unpredictable randomness is needed (block-proposal sortition, leader election), use VDF/VRF to resist grinding; where a global clock is needed (high-throughput ordering), use a PoH-style time layer.
- **Asynchronous networks**: when nodes span continents and latency is unbounded, asynchronous BFT (HoneyBadger, Dumbo) is the theoretically correct answer; the price is the compute overhead of the cryptographic components, and production deployments remain rare.
- **Consensus trends**: nine trends, each with sources, current-status evidence, and verifiable observation points for the next three years (no return forecasts) — see [Consensus Trends Outlook](/trends/Trends).
- **Consortium chains and the digital yuan**: the four consortium-chain elements compared against public chains at [Consortium Chains](/consortium/Consortium); Fabric's [channels and endorsement](/consortium/Fabric), FISCO BCOS's [groups and SM crypto](/consortium/FiscoBcos), Corda's [notaries and point-to-point](/consortium/Corda), Besu's [QBFT and privacy](/consortium/Besu), WeBASE's [middleware stack](/consortium/Webase); the digital yuan's [two-tier operations and controllable anonymity](/dcny/Dcny) and [pilot progress](/dcny/Pilot); chain games' [projects and compliance](/chain-games/ChainGames) and [economic design](/chain-games/Economy); DApps' [four-layer architecture](/dapp/Dapp).

## Common Pitfalls

- **51% attack** (PoW): the bar for reorganizing confirmed transactions is "keep producing a heavier chain"; mining-pool concentration keeps that bar uncomfortably close — see [High-Hashrate Attacks](/hacking/51Attack).
- **Nothing-at-Stake** (PoS): signing on forks is free, so validators vote on every fork simultaneously. A PoS without slashing rules has no security.
- **Long Range Attack** (PoS): old keys rebuild an alternative chain from genesis. Checkpoints plus weak subjectivity are the standard countermeasures — see [Long Range Attacks](/hacking/LongRangeAttack).
- **Grinding**: validators try multiple forks and pick the most favorable one. VDFs locking in future challenges and VRF secret sortition both plug this hole.
- **Sybil attack**: any "one person, one vote" consensus can be flooded with mass-produced identities; votes must be weighted by hashrate/stake/identity — see [Sybil Attacks](/hacking/SybilAttack).
- **TEE trust root**: [PoET](/consensus/PoET)'s security rests on Intel SGX, which has been repeatedly broken by side channels since 2017; "how long did it wait" can be faked, so treat such designs as teaching cases.
- **Governance attacks** (DPoS): vote-trading cartels and vote buying under low turnout cannot be stopped technically, only through sustained accountability and reputation.
- **Exchange labels like "HDPoS" or "APoS"**: no official definition exists (the HyperCash whitepaper says PoW+PoS hybrid; Solana's official account is PoS+[PoH](/consensus/PoH)+[TowerBFT](/consensus/TowerBFT)); check the whitepaper before citing — see [the unsourced section of the evolution timeline](/consensus-timeline#unsourced).

## Topic: Layered Architecture

### Core Concepts

- Read a blockchain as four layers (see [Layered Architecture Overview](/layers/Layers)): **service discovery** (names → addresses/content), **compute** (deterministic state-machine execution), **storage** (state trees / data availability / persistence incentives), and **settlement** (consensus → finality). The settlement layer is the trust anchor; the guarantees of the three layers above can only be inherited, never exceeded.
- Three trust-propagation mismatches between layers: an L2 settles its commitments to L1 but executes on its own layer (see [Settlement Layer](/layers/Settlement)); external facts read by contracts are not guaranteed by the settlement layer (see [Compute Layer](/layers/Compute)); on-chain name records are immutable but browsers must go through a gateway (see [Service Discovery](/layers/ServiceDiscovery)).
- The compute layer = virtual machine + gas metering + execution semantics (see [Compute Layer](/layers/Compute)): gas is the engineering answer to the halting problem, and deterministic execution is a precondition of consensus.
- The storage layer = state trees + data availability + persistence incentives (see [Storage Layer](/layers/Storage)): the chain commits only hashes, and retrievability is guaranteed off-chain — "on-chain" is not the same as "permanently retrievable."
- The settlement layer = consensus protocol + finality model + cross-chain commitments (see [Settlement Layer](/layers/Settlement)): probabilistic finality buys open admission, deterministic finality buys fast confirmation, and cross-chain commitments are where attacks concentrate.

### Evolution Logic

- Bitcoin in 2009 needed only a settlement layer; Ethereum in 2015 added the compute layer; 2017-2020 saw the storage layer become independent (Filecoin/Arweave); after 2020 the service-discovery layer matured (ENS). The four layers grew step by step; they were not designed up front.
- Modularity splits the four layers into swappable ones (Celestia does only DA, rollups do only compute), but trust still converges on the settlement layer — modularity buys composability, not a new source of trust.

### Application Scenarios

- **Only tamper-evident records needed**: the settlement layer alone suffices (Bitcoin is the purest case).
- **Smart contracts needed**: the compute layer is mandatory; accept the gas/randomness/reentrancy cost bundle that comes with it.
- **Cheap high-frequency transactions needed**: move compute off-chain and settle only the commitments on-chain (the L2 pattern); the bottleneck becomes storage-layer DA and settlement-layer proofs.
- **Long-term retrievable data needed**: the storage layer must have an independent storage economy (rent, proofs, erasure coding).
- **Human usability needed**: the service-discovery layer solves readability and verifiable ownership, but censorship resistance only covers the on-chain record portion.

### Common Pitfalls

- **Reentrancy** (compute layer): The DAO, 2016 — see [Compute Layer](/layers/Compute).
- **State bloat → node centralization** (storage layer): the higher the full-node bar, the fewer people can verify independently — see [Storage Layer](/layers/Storage).
- **Bridge attacks** (settlement layer): Ronin 2022 about USD 625 million, Wormhole 2022 about USD 326 million — see [Settlement Layer](/layers/Settlement).
- **Resolver hijacking** (service discovery): the on-chain record is unchanged; the resolution step is swapped out — see [Service Discovery](/layers/ServiceDiscovery).
- **"On-chain = permanently retrievable"**: the chain commits only hashes; who guarantees retrievability of the content is a separate question — see [Storage Layer](/layers/Storage).

## Topic: Ledger Models (Including Data Structures and Scripts)

### Core Concepts

- Ledger models start with a binary choice (see [Ledger Model Overview](/model/Models)): **UTXO** (each coin has one source and one destination; balance = sum of unspent outputs — see [UTXO Model](/model/UTXO)) and **account** (one address, one balance, one state — see [Account Model](/model/Account)). UTXO is naturally parallel-verifiable and its transaction graph is analyzable; the account model is the foundation of smart contracts, with state managed centrally in a global tree.
- **[Merkle trees](/algo/MerkleTree)** compress a block's entire transaction set into a 32-byte root in the block header: change any single transaction and the root changes; light nodes prove "this transaction is in the block" with a Merkle path of roughly log₂(N) hashes, without downloading the whole block.
- Bitcoin Script is a **stack-based, non-Turing-complete, loop-free** validation language: [OP_CHECKSIG](/opcode/OP_CHECKSIG) is the shared foundation of every standard payment method (P2PK, P2PKH, P2SH, P2WPKH, P2TR); if validation fails, the transaction is invalid.
- **[DAG](/model/DAG)** replaces the "chain" with a "graph": new transactions confirm old ones, and confirmation and block production proceed in parallel, buying throughput and low fees — the IOTA Tangle is the classic case; the DAG mempool on the consensus side (the Narwhal family) applies the same idea at the ordering layer.

### Evolution Logic

- The parts — hash chains, signatures, Merkle trees — were all in place before 1997; Nakamoto's contribution was assembling them with UTXO + proof of work + longest chain into a system that could stay alive. The account model was the smart-contract platforms' (the Ethereum family) concession to contract state.
- Bitcoin's protocol evolution runs through the **BIP channel**: BIP-32 hierarchical deterministic wallets and BIP-39 mnemonics manage keys, BIP-141 SegWit migrates witness data, BIP-340 introduces Schnorr signatures, and BIP-341/342 pave the way for Taproot.
- Cardano's **EUTXO** and Nervos's **Cell** are hybrid forms: keep UTXO's parallelism and determinism, and attach scripts and data to outputs to buy contract expressiveness.

### Official Documentation

| Document | Coverage | On-site Sources |
| --- | --- | --- |
| [Bitcoin BIP repository](https://github.com/bitcoin/bips) | BIP-32/39/141/340/341/342 originals and status tracking | [BIP Proposals](/btc/BIPS), [P2PK Transactions](/btc/P2PK) |

### Application Scenarios

- **High-concurrency payments**: UTXO has no shared state, so unrelated transactions can be validated in parallel; in the account model every transaction may mutate global state, making concurrency scheduling complex.
- **Auditability**: UTXO transaction graphs are traceable by nature and audit-friendly — the same property is also the entry point for on-chain surveillance.
- **Smart contract platforms**: Turing-complete semantics and global state are required — choose the account model, or an EUTXO/Cell-style hybrid.

### Common Pitfalls

- **Change outputs are a privacy leak**: heuristics routinely identify change outputs in UTXO transactions and narrow the tracking window; [dusting attacks](/hacking/DustingAttack) exist precisely to tag those change outputs.
- **State explosion**: both the UTXO set and the account state tree only grow, never shrink; fee markets can delay but not stop this. Light nodes carry no state; full nodes carry all of it.
- **Treating Script as a general-purpose language**: non-Turing-completeness is a design choice — no loops, statically estimable fees; if you need loops, go to Layer 2 or change platforms.

## Topic: Privacy and Security

### Core Concepts

- **Zero-knowledge proofs**: the prover convinces the verifier that a statement is true while leaking nothing beyond that fact (see [Zero-Knowledge Proof](/Privacy/ZeroKnowledgeProof)). Blockchain deployments center on two families: zk-SNARKs have tiny proofs and very fast verification, with some schemes requiring a trusted setup; zk-STARKs need no setup and resist quantum attack, at the cost of larger proofs.
- **The anonymity set is the yardstick of every privacy technique**: the confusion range of a ring signature, the participant count of a mixing pool, the linkage difficulty of stealth addresses — all are fundamentally "hiding in a crowd." The smaller the crowd, the more penetrable.
- **[Stealth addresses](/Privacy/StealthAddresses)**: generate a one-time address per payment so outside observers cannot cluster multiple incoming payments to one recipient; Monero only gets end-to-end privacy by combining this with ring signatures and amount hiding.
- **[Homomorphic encryption](/Privacy/HomomorphicEncryption)**: compute directly on ciphertext; decryption yields the result. Paillier (1999) supports additive homomorphism only; fully homomorphic encryption (FHE) supports arbitrary computation at high cost; the blockchain intersection is encrypted contracts and cross-institution data collaboration.
- **[Differential privacy](/Privacy/DifferentialPrivacy)**: inject noise controlled by an ε parameter when publishing statistics, making "is this individual in the dataset" undecidable; combined with ZKP it enables "verifiable private statistics."

### Evolution Logic

- Ring signatures were proposed by Rivest, Shamir, and Tauman in 2001; the CryptoNote whitepaper (2012) combined them with stealth addresses into the privacy-coin template, and Monero (2014) is the lineage that survived to today.
- Amount privacy rests on **commitments + range proofs**: Monero's RingCT went live in 2017 and made amount hiding real; in 2018 [Bulletproofs](/Privacy/Bulletproofs) shrank range proofs by an order of magnitude without a trusted setup, and after Monero activated them that same year fees dropped by roughly eighty percent.
- zk-SNARKs' trusted setup was the adoption obstacle; "transparent" (setup-free) STARKs and the universal-setup PLONK family became the later mainstream; [hierarchical identity-based encryption](/Privacy/HierarchicalIdentityBasedEncryption) (HIBE) developed "initialize once, delegate per level" on the consortium-chain key-management side.

### Authoritative Papers and Whitepapers

| Paper | Authors and Year | Knowledge Points | On-site Sources |
| --- | --- | --- | --- |
| *How to Leak a Secret* | Rivest, Shamir, Tauman, 2001 | Original ring-signature definition | [Ring Signature](/Privacy/RingSignature) |
| Paillier public-key cryptosystem | Pascal Paillier, 1999 | Additive homomorphism | [Paillier](/Privacy/Paillier) |
| *Bulletproofs: Short Proofs for Confidential Transactions and More* | Bünz, Bootle, Boneh, Poelstra, Wuille, Maxwell, 2018 | Range proofs, setup-free ZKP | [Bulletproofs](/Privacy/Bulletproofs), [Monero](/chains/Monero) |

### Official Documentation

| Document | Coverage | On-site Sources |
| --- | --- | --- |
| [Monero Research Lab papers page](https://www.getmonero.org/resources/research-lab/) | CryptoNote, RingCT, and Monero's privacy components: primary literature | [Privacy Technology Overview](/Privacy/Privacy), [Monero](/chains/Monero) |

### Application Scenarios

- **Confidential payments**: amount, sender, and receiver all hidden (Monero, Zcash shielded transactions).
- **Compliance auditing**: the compliant path for privacy coins is giving the auditor a key, not the network plaintext — Monero's view key and Zcash's viewing key both support one-way auditing.
- **Encrypted computation**: cross-institution data collaboration where [homomorphic encryption](/Privacy/HomomorphicEncryption) guarantees "data usable but not visible"; [mixing services](/Privacy/MixingServices) suit individuals breaking their on-chain trail.

### Common Pitfalls

- **Privacy is a stack, not a switch**: hide addresses while leaving amounts in plaintext and on-chain analysis still clusters you; ring signature + stealth addresses + amount hiding — all three layers together make a privacy coin.
- **Custodial mixing is centralized trust**: it can abscond with funds and keep blacklists; even non-custodial CoinJoin carries coordinator-subpoena risk.
- **Address reuse is the privacy death spot**: one reuse links every historical transaction, and even stealth addresses cannot undo an exposed association.
- **Trusted-setup toxic waste**: if a zk-SNARK's ceremony is subverted, proofs can be forged — choose a setup-free scheme, or verify the ceremony's multi-party participation record.

## Topic: Hacking Attacks

### Core Concepts

- The attack surface has four layers (overview at [Attack Surface Overview](/hacking/Attack)): **network layer** ([Sybil attacks](/hacking/SybilAttack), eclipse attacks — surrounding your node with a fake network), **consensus layer** ([51% attacks](/hacking/51Attack), [selfish mining](/hacking/SelfishMiningAttack), [long range attacks](/hacking/LongRangeAttack), [consensus fork attacks](/hacking/ConsensusForkAttack)), **application layer** ([smart contract vulnerabilities](/hacking/SmartContractVulnerabilities), [cross-chain bridge attacks](/hacking/CrossChainBridgeAttack), [Lightning Network attacks](/hacking/LightningNetworkAttack)), and **user layer** ([dusting attacks](/hacking/DustingAttack), [information leakage](/hacking/InformationLeakageAttack) — attacking people is cheaper than attacking protocols).
- **The cost of 51% is money, not technology**: the attack cost ≈ the market price of renting hashrate + the attacker's own loss from the chain's price collapse afterward; on low-hashrate chains the attack cost can fall below the yield of a single contract exploit — it is pure arithmetic.
- **[Long range attacks](/hacking/LongRangeAttack) target PoS's history**: old keys rebuild an alternative chain from genesis, and new nodes cannot tell it apart; checkpoints plus weak subjectivity are the standard countermeasures.
- **Bridges are single points where value is locked**: locked assets are custodied by a validator set or multisig; the security of that set ≈ the security of the bridge — see [Cross-Chain Bridge Attacks](/hacking/CrossChainBridgeAttack).
- **Transaction denial of service**: flood packing space with large volumes of low-value transactions and slow confirmation network-wide — see [Transaction DoS Attacks](/hacking/TransactionDoSAttack).

### Evolution Logic

- In 2002 Douceur proved that a permissionless network necessarily has a Sybil problem — the first-principles constraint on open-network defense; in 2013 Eyal and Sirer formalized selfish mining, and the consensus layer moved from "hashrate economics" into game-theoretic attack and defense.
- After PoS spread, long range and grinding attacks became new surfaces (paired with the VDF/VRF countermeasures on the consensus side — see [Consensus Algorithm Evolution Timeline](/consensus-timeline)).
- In the DeFi and bridge era the main battlefield moved from the protocol layer to the application layer: oracle manipulation, reentrancy, flash-loan amplification; the Lightning Network opened a new surface of channel-balance proofs and state-extortion in the absence of watchtowers.

### Authoritative Papers and Whitepapers

| Paper | Authors and Year | Knowledge Points | On-site Sources |
| --- | --- | --- | --- |
| *The Sybil Attack* | Douceur, 2002 | The Sybil lower bound for open networks | [Sybil Attacks](/hacking/SybilAttack) |
| *Majority is not Enough: Bitcoin Mining is Vulnerable* | Eyal, Sirer, 2013 | Selfish-mining revenue model | [Selfish Mining Attacks](/hacking/SelfishMiningAttack) |

### Application Scenarios

- **Pre-launch checklist**: Sybil cost accounting (hashrate rental prices / stake concentration), bridge validator-set audits, contract audits + bounty programs, multi-source oracles.
- **Runtime monitoring**: alerts on hashrate/stake concentration, reorganization hooks, circuit breakers on abnormally large bridge transfers.

### Common Pitfalls

- **Confirmation counts are not a get-out-of-jail card**: six confirmations stop the vast majority of reorganizations, but on a low-hashrate chain even six confirmations can be reversed — translate confirmation thresholds into that chain's attack cost — see [High-Hashrate Attacks](/hacking/51Attack).
- **Finney attacks are a prepayment trap**: the miner pre-mines a block, waits for you to accept "zero-confirmation payment" and ship, then releases the double-spend chain — see [Finney Attacks](/hacking/FinneyAttack) and [Double-Spend Attacks](/hacking/DoubleSpendAttack).
- **Dust is not money; it is a tag**: a dust UTXO has no value in itself, but its tagging value is maximal — accepting it means consenting to be tracked.
- **"Code is law" provides no defense**: reentrancy, integer overflow, and oracle manipulation are all mines that explode after deployment; audits + bounties + an upgrade switch are the three-piece kit — see [Smart Contract Vulnerability Attacks](/hacking/SmartContractVulnerabilities).

## Topic: NFTs and Asset Issuance

### Core Concepts

- The essence of an NFT is "making one token non-fungible": fungible tokens record only quantity, while NFTs attach a unique ID and metadata (name, content pointer, ownership history) to each token.
- The Bitcoin route is "coloring satoshis": [Colored Coins](/nft/ColoredCoins) map off-chain assets onto specific satoshis; [OAP](/nft/OAP) (2013) stored metadata in OP_RETURN fields; [Tokenized Protocol](/nft/TokenizedProtocol) turned asset definitions, permissions, and lifecycle operations into a protocol.
- The Ethereum route is "standardization": ERC-721 (finalized 2018) defined the non-fungible token interface, and ERC-1155 (finalized 2019) unified fungible and non-fungible tokens as semi-fungible — NFTs went from a collectible experiment to an industry standard.
- Bitcoin's return route is "inscription": Ordinals (2023) engrave content directly into a satoshi's witness data with no protocol-level trust required, and BRC-20 then pushed fungible tokens back into satoshis as well.

### Official Documentation

| Document | Coverage | On-site Sources |
| --- | --- | --- |
| [EIP-721](https://eips.ethereum.org/EIPS/eip-721) | Non-fungible token standard interface | [Tokenized Protocol](/nft/TokenizedProtocol) |
| [EIP-1155](https://eips.ethereum.org/EIPS/eip-1155) | Multi-token (semi-fungible) standard | [Tokenized Protocol](/nft/TokenizedProtocol) |
| [Ordinals handbook](https://docs.ordinals.com/) | Inscriptions and satoshi numbering rules | [Colored Coins](/nft/ColoredCoins) |

### Application Scenarios

- **Digital collectibles and game assets**: uniqueness + verifiable ownership; secondary-market royalties rest on the interface conventions in the standards.
- **Ticketing and credentials**: anti-counterfeiting and transferability — one ticket, one ID.
- **RWA (real-world assets)**: mapping off-chain assets on-chain; the test is off-chain legal effect, not on-chain technology.

### Common Pitfalls

- **Off-chain metadata does not mean permanent**: un-pinned IPFS content or dead HTTP links leave the NFT as nothing but a hash on-chain — see the storage discussion under [Colored Coins](/nft/ColoredCoins).
- **Buying an NFT ≠ buying copyright**: what you usually acquire is the token and the right to transfer it; copyright is not included unless explicitly granted.
- **Indexer disagreement**: Bitcoin NFTs depend on off-chain indexers, and "which NFT this satoshi is" can differ between indexer implementations.
- **Wash trading and sniping**: self-trading to inflate volumes, bots sniping the mint — both are liquidity impersonation, not value signals.

## Topic: Well-Known Public Chains

### Core Concepts

- Public chains group into families by consensus (full listing at [Well-Known Blockchain Projects](/chains/Chain)): the PoW family ([Bitcoin](/chains/Bitcoin), [Litecoin](/chains/Litecoin), [Monero](/chains/Monero)), the PoS family ([Ethereum](/chains/Ethereum) Gasper, [Cardano](/chains/Cardano) Ouroboros), the DPoS family ([EOS](/chains/EOS) 21 BPs, [TRON](/chains/TRON) 27 super representatives), the BFT family ([Cosmos](/chains/Cosmos) Tendermint, Aptos of the HotStuff lineage), and heterogeneous designs ([Polkadot](/chains/Polkadot) NPoS division of labor, [Stellar](/chains/Stellar) SCP/FBA, [Chia](/chains/Chia) PoSpace+PoT, [TON](/chains/TON) Catchain).
- **Representative chain list (each page follows the same four sections: "whitepaper source / what it solves / technical achievements / limitations and public incidents")**: [Avalanche](/chains/Avalanche) (sub-sampled BFT + subnets), [Near](/chains/Near) (Nightshade sharding), [Sui](/chains/Sui) (Move objects + fastpath), [Aptos](/chains/Aptos) (Block-STM parallel execution), [Filecoin](/chains/Filecoin) (storage as voting rights), [Arweave](/chains/Arweave) (pay once, store forever), [Lightning Network](/chains/Lightning) (off-chain channels), [Optimism](/chains/Optimism) and [Arbitrum](/chains/Arbitrum) (the two main optimistic rollup lines), [zkSync](/chains/zkSync) (zkEVM validity proofs); cross-chapter navigation entries: [Navigate by Consensus Algorithm](/nav/ByConsensus) (algorithm → first appearance / layer / what it solves / chains) and [Navigate by Timeline](/nav/ByTime) (chains sorted by mainnet launch), with a "backlinks" block auto-generated at the bottom of each page by the build.
- **Stablecoins are not chains**: [Tether](/chains/Tether) is an asset issued on multiple chains (Omni, ERC-20, TRC-20); keep the three layers — issuer, asset, and carrying rail — distinct.
- **EVM compatibility ≠ same consensus**: [BSC](/chains/BinanceSmartChain) uses PoSA (21 validators), not Ethereum's Gasper; [TRON](/chains/TRON)'s TVM is bytecode-compatible with the EVM yet runs DPoS — the virtual machine and consensus are two independent dimensions.
- For who uses which consensus variant, see the [consensus algorithm evolution timeline](/consensus-timeline), which carries 35 main-chain mapping rows.

### Evolution Logic

- 2009 Bitcoin boots up → 2011-2014 altcoins and privacy diverge (Litecoin swaps in Scrypt, Monero moves to ring signatures) → 2015 Ethereum opens the smart-contract-platform paradigm → 2017-2019 DPoS high throughput runs parallel with consortium chains, and domestic public chains ([Bytom](/chains/Bytom) among them) also started in this period → after 2020 sharding, modularity, and DAG (Polkadot, [Near](/chains/Near), [Sui](/chains/Sui)) → 2021-2023 Ethereum's two L2 routes take shape ([Arbitrum](/chains/Arbitrum)'s interactive fraud proofs, [Optimism](/chains/Optimism)'s OP Stack standard stack, [zkSync](/chains/zkSync)'s zkEVM) → 2024-2025 sequencer decentralization and BoLD multi-party validation.
- A chain's ownership is determined by who maintains the client, not by who announced it: TON was abandoned by Telegram, taken over by the community, and its mainnet only launched in 2021 (see [TON](/chains/TON)).

### Application Scenarios

- **Store of value and payments**: Bitcoin and Litecoin; for private payments, go to [Monero](/chains/Monero).
- **Smart contract ecosystems**: Ethereum, BSC, [Solana](/chains/Solana), TON (Telegram's distribution entry point).
- **Cross-chain hubs**: [Polkadot](/chains/Polkadot) and [Cosmos](/chains/Cosmos) are two technical routes, one betting on shared security and the other on IBC autonomy.
- **Storage and green narratives**: [Chia](/chains/Chia), Filecoin.

### Common Pitfalls

- **Treating marketing TPS as real throughput**: whitepaper numbers are mostly theoretical limits or ideal network conditions; being an order of magnitude off from measured mainnet figures is the norm.
- **Confusing the "chain" with the "asset"**: USDT is the asset, Tether is the issuer, Tron and Ethereum are rails; mixing them up yields wrong conclusions like "Tether transfers are free."
- **Reading technology off market-cap rankings**: a chain's technical generation is largely unrelated to its market-cap rank; for the consensus-choice storyline, go back to the [evolution timeline](/consensus-timeline).

## Maintenance Log

- For the repo structure audit and the navigation-maintenance context, see [Structure Audit Record](/review/structure-audit-2026-10-19); for day-to-day sidebar maintenance rules, see [Site Navigation Maintenance](/sidebar-maintenance).
- For the review conclusions on the content changes in the last four commits, see [Content Review Record](/review/content-review-2026-10-19).
