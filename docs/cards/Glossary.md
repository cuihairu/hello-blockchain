# Glossary

A flat lookup table of every term on the site: a one-sentence definition plus a link to the site's deep dive. To see how concepts connect into a web, go to the [knowledge card index](/cards/Cards); to see concepts consolidated with their paper sources, go to the [knowledge compendium](/knowledge); to see the yearly thread, go to the [development timeline](/timeline) and the [consensus algorithm timeline](/consensus-timeline).

## Layers and architecture

| Term | One-sentence definition | See |
| --- | --- | --- |
| Layered architecture | The four-layer model of service discovery / compute / storage / settlement, with settlement as the trust anchor | [layered architecture](/layers/Layers) |
| Settlement layer | The trust-anchor layer that uses consensus to say "which states are irreversible" | [settlement layer](/layers/Settlement) |
| Compute layer | The layer of deterministic state-machine transaction execution (VM + gas + semantics) | [compute layer](/layers/Compute) |
| Storage layer | The layer of state trees, data availability, and storage incentives | [storage layer](/layers/Storage) |
| Service discovery | The layer that maps human-readable names to onchain addresses and content — the blockchain's DNS | [service discovery](/layers/ServiceDiscovery) |
| Modularity | The architectural route that splits execution, DA, and settlement across different chains | [settlement layer](/layers/Settlement) |

## Settlement and consensus

| Term | One-sentence definition | See |
| --- | --- | --- |
| Consensus algorithm | The protocol by which mutually distrustful nodes agree on a single ledger | [consensus algorithms](/consensus/Consensus) |
| Finality | The promise that a state is irreversible: probabilistic (by confirmation count) or deterministic (by votes) | [settlement layer](/layers/Settlement) |
| Probabilistic finality | Rollback probability falls exponentially with confirmations but never reaches zero (the PoW route) | [PoW](/consensus/POW) |
| Deterministic finality | No rollback once votes reach the threshold (the BFT route) | [PBFT](/consensus/PBFT) |
| Safety | Honest nodes never approve mutually contradictory histories | [BFT](/consensus/BFT) |
| Liveness | New transactions keep getting recorded; the system does not stall permanently | [BFT](/consensus/BFT) |
| Byzantine fault tolerance (BFT) | Consensus tolerating arbitrarily behaving nodes; f Byzantine requires n ≥ 3f+1 | [BFT](/consensus/BFT) |
| Crash fault tolerance (CFT) | Tolerates crashes but not Byzantine behavior (RAFT); needs 2f+1 | [RAFT](/consensus/RAFT) |
| Partial synchrony | Network delays are bounded but the bound is unknown (PBFT's assumption) | [PBFT](/consensus/PBFT) |
| Asynchrony | Message delays are unbounded and there is no global clock (ABFT's assumption) | [ABFT](/consensus/ABFT) |
| QC (quorum certificate) | A single verifiable object aggregating 2f+1 signatures | [HotStuff](/consensus/HotStuff) |
| Three-chain commit | Three consecutive blocks each get a 2/3 vote, finalizing the earliest of them | [DiemBFT](/consensus/DiemBFT) |
| View change | The subprotocol for replacing a failed leader — PBFT is O(n²), HotStuff linear | [PBFT](/consensus/PBFT) |
| Longest-chain rule | Always accept the chain with the highest cumulative difficulty (Nakamoto consensus) | [PoW](/consensus/POW) |
| GHOST | On a fork, choose the branch with the "heaviest subtree," so forked blocks are not wasted | [GHOST](/consensus/GHOST) |
| LMD-GHOST | Choose the subtree by validator message vote weight (Ethereum block production) | [Gasper](/consensus/Gasper) |
| Finality gadget | Block production and finalization separated: fast production, finalization by an independent voting layer | [GRANDPA](/consensus/GRANDPA) |
| Casper FFG | Ethereum's finality gadget — checkpoint finalization by two rounds of votes | [Gasper](/consensus/Gasper) |
| Gasper | LMD-GHOST (block production) + Casper FFG (finalization), Ethereum's current consensus | [Gasper](/consensus/Gasper) |
| Weak subjectivity | The inherent cost of PoS nodes having to sync from a recent trusted state | [PoS](/consensus/POS) |
| Slashing | The economic-safety mechanism that evidences and penalizes double signing and surround voting | [Gasper](/consensus/Gasper) |
| Nothing-at-Stake | The problem where copying signatures is free, so a node votes on all forks at once | [PoS](/consensus/POS) |
| VRF (verifiable random function) | Secret sortition: nobody knows the outcome before it is drawn, and anyone can verify it after | [Ouroboros](/consensus/Ouroboros) |
| VDF (verifiable delay function) | Serially slow to compute, instantly to verify — builds a random clock that cannot be accelerated | [PoT](/consensus/POT) |
| UNL (Unique Node List) | The trusted validator list in RPCA; a misconfiguration forks the network | [RPCA](/consensus/RPCA) |
| Quorum slice | The self-chosen trust set in FBA, where slices emergently produce global consensus | [FBA](/consensus/FBA) |
| aBFT (asynchronous Byzantine fault tolerance) | BFT that preserves both safety and liveness in a fully asynchronous network | [ABFT](/consensus/ABFT) |
| gossip-about-gossip | Hashgraph's design of weaving communication history into a DAG and deducing votes locally | [Hashgraph](/consensus/Hashgraph) |
| DAG mempool | Transaction propagation as its own DAG system (Narwhal) | [Narwhal and Bullshark](/consensus/NarwhalBullshark) |
| Subsampling votes | Each round queries only a random few nodes; repeated rounds converge (the Snowball family) | [Snowball](/consensus/Snowball) |
| Sharding | Splitting validation and state across multiple parallel subnets | [SPoS](/consensus/SPOS) |
| Pipelined BFT | Votes advance chained by block, amortizing communication (the HotStuff family) | [HotStuff](/consensus/HotStuff) |
| Paxos | The source of CFT consensus: two-phase majorities, tolerating crashes but not Byzantine behavior | [Paxos](/consensus/Paxos) |
| IBFT | Permissioned-chain BFT: a fixed validator set finalizes a single block — the predecessor of QBFT | [QBFT](/consensus/QBFT) |
| uncertified DAG | A DAG consensus that issues no per-round certificates, finalizing by direct parent chains and commit rules | [Mysticeti](/consensus/Mysticeti) |
| Tangle | IOTA's DAG ledger: each transaction approves two tips, with a Coordinator as backstop for years | [IOTA](/consensus/IOTA) |
| Restaking | Pledging already-staked ETH to an AVS, reusing the security budget | [Restaking](/consensus/Restaking) |
| AVS | Active validator service: an offchain component that gains economic security through restaking | [Restaking](/consensus/Restaking) |
| SPoRA | Arweave's consensus: random access to history plus a VDF rate limit — only full storage can win | [SPoRA](/consensus/SPORA) |
| Proof of coverage (PoC) | The physically falsifiable challenge for wireless coverage claims: prober, prover, and bystander | [proof of coverage](/consensus/ProofOfCoverage) |
| Multi-level BFT | Committee PBFT for block production plus guardian checkpoint BLS aggregation for the finale | [Multi-Level BFT](/consensus/MultiLevelBFT) |
| Yuma consensus | Stake-weighted median trimming of subjective-utility scores, resistant to validator collusion | [Yuma](/consensus/Yuma) |
| burn-and-mint | Burn the native coin by usage to mint stable units (DC/uact) — stable pricing and deflation at once | [proof of coverage](/consensus/ProofOfCoverage), [ordering and settlement](/consensus/Sequencing) |
| Probabilistic micropayments | Ticket face value × win probability = segment price; only winning tickets are redeemed onchain | [DPOS](/consensus/DPOS) |
| GHOSTDAG | A BlockDAG ordering protocol: all concurrent blocks enter the graph and are then linearized, avoiding the safety-throughput tradeoff | [GHOSTDAG](/consensus/GHOSTDAG) |
| BlockDAG | A directed acyclic graph of blocks where concurrent blocks do not invalidate each other (Kaspa's ledger structure) | [GHOSTDAG](/consensus/GHOSTDAG) |
| NPoS | Nominated Proof of Stake: nominators lend stake to candidate validators, with Phragmén election evening out the stake | [NPoS](/consensus/NPoS) |
| Phragmén election | A multi-objective election algorithm: maximize total stake, maximize the minimum validator's stake, minimize variance | [NPoS](/consensus/NPoS) |
| Proof of bandwidth | Prove "bandwidth was genuinely contributed," with verification in an offchain service network rather than block-producing consensus | [proof of bandwidth](/consensus/BandwidthProof) |
| PoSpace | Proof of space: exchange plotting for sortition eligibility — the prover need only show "the data is stored" | [PoSpace](/consensus/PoSpace) |
| Plotting | The process of generating a Chia plot file; the heavy writes are the real environmental cost | [PoSpace](/consensus/PoSpace) |
| PoT | Proof of time: VDF serial time guarantees challenges are unpredictable and the block cadence is fixed | [PoT](/consensus/POT) |
| Timelord | Chia's role running the VDF; serial computation is its main hardware barrier | [PoT](/consensus/POT) |
| Consortium chain | A permissioned blockchain with known member identities, reaching consensus among trusted nodes | [consortium chains](/consortium/Consortium) |
| Channel | A private subnet in Fabric, visible to members only, isolating the ledger and chaincode | [Hyperledger Fabric](/consortium/Fabric) |
| MSP | Member Services Provider: issues certificates and manages identity — the trust root of a consortium chain | [Hyperledger Fabric](/consortium/Fabric) |
| Endorsement policy | The rule for which organizations must endorse before a transaction is executed, determining its validity | [Hyperledger Fabric](/consortium/Fabric) |
| Group | A parallel-execution subnet in FISCO BCOS, similar to sharding | [FISCO BCOS](/consortium/FiscoBcos) |
| SM2/SM3/SM4 | China's commercial cryptography suite, a compliance requirement | [FISCO BCOS](/consortium/FiscoBcos) |
| Notary | A trusted node in Corda that verifies transaction uniqueness and ordering | [R3 Corda](/consortium/Corda) |
| QBFT | Ethereum's permissioned-chain BFT consensus, finalized by validator votes | [Hyperledger Besu](/consortium/Besu) |

## Compute and storage

| Term | One-sentence definition | See |
| --- | --- | --- |
| Deterministic execution | The same input yields the same output on every node; replay is consistent | [compute layer](/layers/Compute) |
| gas | The unit pricing compute resources, turning infinite loops into finite paid steps | [compute layer](/layers/Compute) |
| EVM | The Ethereum Virtual Machine — stack-based bytecode, the largest ecosystem | [compute layer](/layers/Compute) |
| Move resource model | A type system modeling assets as linear resources; prevents copying and reentrancy | [compute layer](/layers/Compute) |
| Reentrancy | The vulnerability pattern of being re-entered by an external call before the state update completes | [smart contract vulnerabilities](/hacking/SmartContractVulnerabilities) |
| MEV | Value extracted from transaction ordering rights (front-running, sandwiching) | [compute layer](/layers/Compute) |
| Oracle | The service feeding external facts to contracts; manipulation happens at the data-source layer | [compute layer](/layers/Compute) |
| Merkle tree | Leaf hashes fold pairwise upward into a root; membership is proven against the root | [Merkle tree](/algo/MerkleTree) |
| State root | The root of the global state Merkle tree, committed into block headers by the settlement layer | [storage layer](/layers/Storage) |
| Data availability (DA) | Block data must actually be published; light nodes verify by sampling plus erasure coding | [storage layer](/layers/Storage) |
| PoRep / PoST | Proof of replication / proof of space-time: you own the space and keep holding it | [PoST](/consensus/PoST) |
| Content addressing | Addressing by content hash — change the content and the address changes | [storage layer](/layers/Storage) |
| pinning | Making an IPFS node retain some content long-term — unpinned content vanishes | [storage layer](/layers/Storage) |
| State explosion | Full-node storage keeps swelling, pushing the network toward centralization | [storage layer](/layers/Storage) |
| Sequencer | The role that orders transactions on a rollup; today mostly a single point of soft confirmation | [ordering and settlement](/consensus/Sequencing) |
| Shared sequencing | Multiple rollups sharing one set of decentralized sequencing nodes | [ordering and settlement](/consensus/Sequencing) |
| Based sequencing | The route that hands ordering rights to L1 proposers | [ordering and settlement](/consensus/Sequencing) |
| Fraud proof | The optimistic-settlement challenge mechanism: falsify a bad state root within the challenge window | [ordering and settlement](/consensus/Sequencing) |
| Validity proof | ZK settlement: the proof comes first, and L1 verification passing is final | [ordering and settlement](/consensus/Sequencing) |

## Ledgers, assets, and service discovery

| Term | One-sentence definition | See |
| --- | --- | --- |
| UTXO | Unspent transaction output: a balance equals the sum of usable outputs | [UTXO model](/model/UTXO) |
| Account model | A global ledger form of one address, one balance, one state | [account model](/model/Account) |
| DAG ledger | A ledger structure where transactions form a directed acyclic graph | [DAG model](/model/DAG) |
| Turing-complete / restricted scripting | Writing arbitrary loops vs expressing only fixed logic (Bitcoin Script) | [OP_CHECKSIG](/opcode/OP_CHECKSIG) |
| NFT | Non-fungible token: uniqueness plus verifiable ownership | [colored coins](/nft/ColoredCoins) |
| BIP | Bitcoin Improvement Proposal — most changes are to settlement-layer rules | [BIP improvement proposals](/btc/BIPS) |
| Domain name / naming system | The mapping from human-readable names to onchain addresses; the name is an onchain asset | [service discovery](/layers/ServiceDiscovery) |
| Resolver | The component translating a name into an address or content; it can be hijacked | [service discovery](/layers/ServiceDiscovery) |
| ccip-read | A signature-forwarding protocol for cross-chain or offchain resolution; the trust chain grows one link | [service discovery](/layers/ServiceDiscovery) |
| Homograph | A phishing technique disguising unicode-lookalike characters as the target name | [service discovery](/layers/ServiceDiscovery) |
| Digital yuan (e-CNY) | A central-bank-issued legal-tender digital currency, two-tier operation, controllable anonymity | [digital yuan](/dcny/Dcny) |
| Two-tier operation | The two-layer operating system: central bank to commercial banks, commercial banks to the public | [digital yuan](/dcny/Dcny) |
| Controllable anonymity | A privacy design of anonymity for small amounts and traceability for large ones, balancing compliance and privacy | [digital yuan](/dcny/Dcny) |
| Digital collectible | The domestic compliance form of an NFT — no secondary trading, no financialization | [blockchain games](/chain-games/ChainGames) |
| DApp | Decentralized application: the four-layer architecture of frontend + wallet + contracts + indexer | [DApp architecture](/dapp/Dapp) |
| Indexer | An offchain indexing service turning onchain event queries into efficient APIs | [DApp architecture](/dapp/Dapp) |

## Attacks and defenses

| Term | One-sentence definition | See |
| --- | --- | --- |
| 51% attack | Majority hashrate can reorganize already confirmed transactions | [large-hashrate attack](/hacking/51Attack) |
| Long-range attack | Using old keys to rebuild an alternative chain from genesis (hits PoS weak subjectivity) | [long-range attack](/hacking/LongRangeAttack) |
| Sybil attack | Mass-forging identities to break "one person, one vote" schemes | [Sybil attack](/hacking/SybilAttack) |
| Double spend | Spending the same money twice; confirmation counts and finality are both defenses | [double-spending attack](/hacking/DoubleSpendAttack) |
| Selfish mining | Withholding blocks and releasing them at the right moment for excess relative profit | [selfish mining attack](/hacking/SelfishMiningAttack) |
| Dusting attack | Flooding indexes and mempools with a massive number of tiny transactions | [dusting attack](/hacking/DustingAttack) |
| Cross-chain bridge attack | Signature-verification or permission flaws in bridges — the costliest attack surface | [cross-chain bridge attack](/hacking/CrossChainBridgeAttack) |
| Smart contract vulnerability | Contract-layer risks including reentrancy, overflow, oracle manipulation, and upgrade defects | [smart contract vulnerabilities](/hacking/SmartContractVulnerabilities) |

## Timelines and indexes

| Page | Purpose |
| --- | --- |
| [Development timeline](/timeline) | 49 nodes in five periods, answering "why then" |
| [Consensus algorithm timeline](/consensus-timeline) | 64 annual entries plus a 35-row mainline mapping — read the algorithm lineage by year |
| [Knowledge card index](/cards/Cards) | Concepts organized into a web by the four layers plus cross-cutting tracks, with cards interlinked |
| [Knowledge compendium](/knowledge) | The consolidated view of concepts, papers, official docs, scenarios, and pitfalls |
