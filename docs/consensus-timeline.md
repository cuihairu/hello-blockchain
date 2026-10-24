---
title: Consensus Algorithm Evolution Timeline
---

# Consensus Algorithm Evolution Timeline

Consensus on-chain was not invented in 2008. What Bitcoin actually did was pack forty years of distributed-systems research into a single economic model. This page lays out, by year, the provenance and first adopter of every consensus algorithm, gives each algorithm a one-line mechanism, and lists who uses it today. Single-algorithm detail lives in the [consensus algorithm catalog](/consensus/Consensus); the blockchain's full history lives in the [development timeline](/timeline).

## Mainline Evolution: Five Periods

| Period | What it did | Representatives |
| --- | --- | --- |
| 1982–1998 Academic foundations | Framed the problem and drew its boundaries: Byzantine fault tolerance theory, the FLP impossibility theorem, Paxos, the concept of proof of work | Byzantine Generals, Paxos |
| 1997–2009 PoW prehistory and Bitcoin | Anti-spam hash budgets assembled into a currency | Hashcash, the Bitcoin whitepaper |
| 2011–2017 Probabilistic-consensus experiments | Swapping out compute power: staking, delegation, identity, capacity — all tried once | PPCoin, DPoS, Ouroboros |
| 2014–2020 BFT renaissance | Thirty years of voting protocols returned to public chains; deterministic finality grew up alongside probabilistic finality | Tendermint, Casper, HotStuff |
| 2018–2024 New resources, new families | Time (VDF), disk (PoSpace), asynchronous networks, DAG memory pools became new ledgers | Avalanche, Chia, Sui |

One rule is worth remembering first: **what each generation of consensus swaps is not "how you vote" but "what resource you book against"** — compute (PoW), tokens (PoS), reputation (PoA), disk (PoSpace), time (VDF). The voting protocol itself (BFT) is actually the oldest part.

## Timeline Master Table

Ordered by year. The year is the paper or whitepaper publication year; mainnets are noted separately. "First adopter" means the first chain or system that actually ran, not the first paper citation.

| Year | Algorithm / event | Source | First adopter |
| --- | --- | --- | --- |
| 1982 | Byzantine Generals Problem | Lamport, Shostak, Pease paper | Academic starting point (see [BFT](/consensus/BFT)) |
| 1985 | FLP impossibility theorem | Fischer, Lynch, Paterson | Academic: pure asynchronous + deterministic consensus is unsolvable; the only breakthrough is randomization or a synchrony assumption |
| 1988 | Partial synchrony model | Dwork, Lynch, Stockmeyer | Academic: PBFT's network assumptions come from here |
| 1989 | Paxos | Lamport (PODC'89; full version 1998) | Academic → industrial (Chubby); replaced by RAFT in blockchain |
| 1992 | PoW concept | Dwork, Naor, "Pricing via Processing" | Anti-spam pricing, not currency |
| 1997 | Hashcash | Adam Back | Email stickers; the hash budget's first engineering realization |
| 1998 | b-money / Bit Gold | Wei Dai / Nick Szabo | Design sketches; neither implemented |
| 1999 | [PBFT](/consensus/PBFT) | Castro, Liskov (OSDI'99) | BFT filesystem; twenty years later the direct ancestor of permissioned chains |
| 2004 | RPOW | Hal Finney | Reusable proof-of-work service |
| 2008 | Nakamoto consensus (PoW + longest chain) | [Bitcoin whitepaper](https://bitcoin.org/bitcoin.pdf) | Bitcoin (genesis 2009-01-03; see [Bitcoin](/chains/Bitcoin)) |
| 2011 | PoS concept published | QuantumMechanic's Bitcointalk post | No direct adoption; the starting point of [PoS](/consensus/POS) |
| 2012 | PPCoin (Peercoin) | King, Nadal [whitepaper](https://decred.org/research/king2012.pdf) (August 19) | Peercoin: first PoS mainnet, PoW+PoS hybrid |
| 2012 | XRP Ledger goes live | OpenCoin (Ripple) | Consensus algorithm whitepaper published later, in 2014 (RPCA) |
| 2013 | Nxt | BCNext | First pure-PoS mainnet (no PoW pre-mine) |
| 2014 | [Tendermint](/consensus/Tendermint) | Jae Kwon whitepaper | Cosmos Hub (2019 mainnet) |
| 2014 | [DPoS](/consensus/DPOS) | Larimer, BitShares whitepaper | BitShares (mainnet that year) |
| 2014 | [PoC](/consensus/POC) | Burstcoin | Burstcoin: first proof-of-capacity mainnet |
| 2014 | [RAFT](/consensus/RAFT) | Ongaro, Ousterhout (USENIX ATC) | etcd and the like; on-chain from Fabric 1.4.1 (2019) |
| 2014 | [RPCA](/consensus/RPCA) whitepaper | Schwartz, Youngs, Britto | XRP Ledger (already running) |
| 2015 | [FBA/SCP](/consensus/FBA) | Mazières whitepaper | Stellar (see [Stellar](/chains/Stellar)) |
| 2016 | [PoET](/consensus/PoET) | Intel; Hyperledger Sawtooth | Sawtooth: TEE lottery |
| 2016 | [HoneyBadgerBFT](/consensus/HoneyBadgerBFT) | Miller et al. (CCS'16) | POA Network experimental chain, mostly academic |
| 2016 | PoW+PoS hybrid block production | Decred | Decred: PoW block production, PoS voting; mainnet 2016-02 |
| 2016 | Polkadot whitepaper | Gavin Wood | Polkadot (2020 mainnet) |
| 2016 | [Lightning Network](/chains/Lightning) whitepaper | Poon, Dryja | Bitcoin off-chain channels: HTLC atomic routing; see [Lightning Network attacks](/hacking/LightningNetworkAttack) |
| 2017 | Ouroboros | Kiayias et al. ([CRYPTO 2017](https://eprint.iacr.org/2016/889)) | Cardano: first PoS with a rigorous security proof; mainnet used it from launch |
| 2017 | Casper FFG | Buterin, Griffith ([arXiv:1710.09437](https://arxiv.org/abs/1710.09437)) | Ethereum Merge (2022) |
| 2017 | PoA named and first used | Gavin Wood | Kovan testnet (Aura); Rinkeby (Clique); see [PoA](/consensus/POA) |
| 2017 | [PoH](/consensus/PoH) | Yakovenko whitepaper | Solana (2020 mainnet) |
| 2017 | EOS.IO whitepaper | Larimer | EOS (2018-06 mainnet; DPoS+BFT irreversible) |
| 2017 | Filecoin whitepaper | Protocol Labs | Filecoin (2020-10 mainnet; PoRep+PoSt) |
| 2017 | HyperCash mainnet | Hcash team | PoW+PoS hybrid; exchanges often label it "HDPoS"; see the unsourced note below |
| 2018 | [HotStuff](/consensus/HotStuff) | Yin, Malkhi et al. ([arXiv:1803.05069](https://arxiv.org/abs/1803.05069), CCS'19) | DiemBFT (Libra, 2019); lineage flows into Aptos |
| 2018 | VDF | Boneh, Bünz, Fisch | Chia's [PoT](/consensus/POT) (2021) |
| 2018 | Avalanche whitepaper | Team Rocket (folded into Ava Labs) | Avalanche (2020 mainnet; see [Avalanche](/consensus/Avalanche)) |
| 2018 | TRON / EOS mainnets | — | DPoS concentration year: 27 super representatives / 21 super nodes |
| 2018 | [Hashgraph](/consensus/Hashgraph) whitepaper | Leemon Baird (Swirlds) | Hedera (2019 mainnet; council-permissioned nodes) |
| 2018 | [SPoRA / Proof of Access](/consensus/SPORA) | Arweave yellow paper | Arweave (2018-06-06 mainnet): randomized historical access + blockweave |
| 2018 | [GHOSTDAG](/consensus/GHOSTDAG) | Sompolinsky, Wyborski, Zohar ([eprint 2018/104](https://eprint.iacr.org/2018/104)) | Kaspa: ledger from chain to graph; concurrent blocks all enter the graph, then linearize |
| 2019 | [Gasper](/consensus/Gasper) formalized | Ethereum research team (FFG + [LMD GHOST](/consensus/GHOST)) | Beacon Chain (2020-12-01) → Merge |
| 2019 | [DiemBFT](/consensus/DiemBFT) | Libra/Diem team | First engineering launch of HotStuff |
| 2019 | Dumbo paper series | Chinese asynchronous-consensus teams | Adopted in permissioned-chain research; see [ABFT](/consensus/ABFT) |
| 2019 | Cosmos Hub, Algorand mainnets | — | Tendermint and BA⋆ (VRF lottery PoS) go live |
| 2019 | [Proof of Coverage (Helium PoC)](/consensus/ProofOfCoverage) | Helium whitepaper | Helium (first release 2019-07): wireless coverage claims made physically falsifiable |
| 2019 | [Multi-Level BFT](/consensus/MultiLevelBFT) whitepaper | Theta Labs | Theta (2019 mainnet): committee block production + guardian checkpoints |
| 2020 | Mainnet surge | — | Solana (March), Near (April), Polkadot (May), BSC (September), Avalanche (September), Filecoin (October) |
| 2020 | Beacon Chain goes live | Ethereum | 32 ETH per validator; slashing in production |
| 2020 | Expected Consensus in production | [Filecoin spec](https://spec.filecoin.io/) | Filecoin mainnet (October): storage-weighted election + drand + tiered slashing |
| 2021 | Chia mainnet (March 19) | Chia Network | First large-scale PoSpace+VDF deployment; see [Chia](/chains/Chia) |
| 2021 | [Yuma Consensus](/consensus/Yuma) | Bittensor whitepaper | Bittensor mainnet (January): subjective utility scoring consensus |
| 2021 | ChainMaker open-sourced | Beijing Weixin Research Institute | [TBFT](/consensus/TBFT), [MaxBFT](/consensus/MaxBFT), RAFT, SOLO pluggable |
| 2021 | TON mainnet (May) | TON Foundation (community continuation) | Catchchain BFT+PoS; native sharding via master chain + work chains; see [TON](/chains/TON) |
| 2021 | Narwhal/Bullshark papers | Danezis, Kokoris-Kogias et al. (Diem research line) | Sui (2023 mainnet; see [Narwhal+Bullshark](/consensus/NarwhalBullshark)) |
| 2021 | Arbitrum One mainnet (8-31) | Offchain Labs | Interactive fraud proofs go live; see [Arbitrum](/chains/Arbitrum) |
| 2021 | OP Mainnet goes live (12-16) | OP Labs | OP Stack standard stack and Superchain; see [Optimism](/chains/Optimism) |
| 2022 | Ethereum Merge (September 15) | Ethereum | PoW retired; [Gasper](/consensus/Gasper) goes live; energy use down about 99.95% |
| 2022 | Aptos mainnet | Aptos Labs | AptosBFT (DiemBFT v4 / Jolteon line) |
| 2023 | FVM/FEVM go live (March) | Filecoin (Protocol Labs) | EVM-compatible execution enters the storage network; see [Filecoin](/chains/Filecoin) |
| 2023 | zkSync Era mainnet (3-24) | Matter Labs | zkEVM: validity proofs replace the challenge window; see [zkSync](/chains/zkSync) |
| 2024 | Fraud proofs go permissionless (6-20) | OP Labs | Anyone can challenge an incorrect state root; see [sequencing and settlement](/consensus/Sequencing) |
| 2025 | BoLD validation goes live (February) | Offchain Labs | Multi-party challenge races replace one-on-one; see [Arbitrum](/chains/Arbitrum) |
| 2023 | Sui mainnet (May) | Mysten Labs | [Narwhal+Bullshark](/consensus/NarwhalBullshark): DAG mempool decoupled from consensus |
| 2023 | Spacemesh mainnet | Spacemesh | [PoST](/consensus/PoST) (proof of spacetime): first production implementation |
| 2024 | Mysticeti | Sui team paper | Uncertified DAG-BFT; latency drops another round |

Roughly forty years, 64 timeline entries. In the dense stretches (2014, 2017, 2020) the same questions keep being re-asked: if not compute, then what resource do you book against, and what do you vote on.

## Family-by-family Deep Dives

### PoW: Nakamoto Consensus

**One-line mechanism**: the whole network races to find a hash below the difficulty target; whoever finds it produces a block, and the longest (heaviest) chain wins.

Merits: permissionless, battle-tested (the Bitcoin mainnet has not been successfully reorganized since 2009); drawbacks: high energy use, slow confirmation (six Bitcoin confirmations take about an hour), and compute concentration through mining pools and ASICs. In use and forks:

- Bitcoin (SHA-256d; see [Bitcoin](/chains/Bitcoin)); fork chains Bitcoin Cash and BSV are also SHA-256d.
- Litecoin (Scrypt; see [Litecoin](/chains/Litecoin)); Dogecoin (Scrypt; merged mining with Litecoin via AuxPoW since 2014).
- Monero (RandomX, ASIC-resistant; see [Monero](/chains/Monero)).
- Bytom once used Tensority (general-purpose compute compatible); see [Bytom](/chains/Bytom).

Source: [Bitcoin whitepaper](https://bitcoin.org/bitcoin.pdf) (2008).

### Early PoS and Hybrid Forms

**One-line mechanism**: lock coins as collateral, pick block producers by stake weight, slash for misbehavior.

Peercoin started it, but it was a PoW+PoS hybrid: early on PoW distributed coins, PoS gradually took over security. From there two branches diverged: those chasing "pure PoS" (Nxt, Blackcoin) dropped compute entirely and used a pure-token lottery; those keeping a double safety net spliced PoW and PoS onto one chain.

- Peercoin (2012, PoW+PoS hybrid, first PoS mainnet).
- Nxt (2013, pure PoS); Blackcoin (2014, pure PoS).
- Decred (2016, PoW block production + PoS voting, dual-track, the hybrid camp's complete form).
- HyperCash (2017, PoW+PoS hybrid, exchanges label it "HDPoS"; see the unsourced note).

The hybrid camp never became mainstream, but it argued one important point: block-production rights and finality can be decided by two different resources. That idea later landed in a more refined form on Polkadot (BABE for block production + GRANDPA for finality) and Ethereum (proposals + FFG for finality).

Source: [PPCoin whitepaper](https://decred.org/research/king2012.pdf) (2012).

### PoS with Strict Security Proofs

**One-line mechanism**: write "the attacker's success probability is negligible under an honest majority" as provable mathematics, then design the lottery around that.

- Cardano: the [Ouroboros](/consensus/Ouroboros) family (Classic→Praos→Genesis), epoch/slot design, VRF leader election, mainnet from 2017 and used from launch (see [Cardano](/chains/Cardano)).
- Algorand: Micali's BA⋆ protocol, VRF secret lottery — nobody knows they are a candidate before being selected, resistant to selective misbehavior, mainnet 2019 (see [Algorand](/consensus/Algorand)).

Sources: [Ouroboros (ePrint 2016/889)](https://eprint.iacr.org/2016/889); Micali, "ALGORAND" (arXiv:1607.01341).

### DPoS: Delegated Proof of Stake

**One-line mechanism**: token holders elect a fixed number of delegates (21 to 101), and the delegates take turns producing blocks.

Throughput went up, but so did centralization concerns: low turnout makes mutual-voting coalitions easy, and vote trading is hard to prevent.

- BitShares (2014, Larimer's first DPoS implementation).
- EOS (2018, 21 Block Producers, DPoS+BFT irreversible; see [EOS](/chains/EOS)).
- TRON (2018, 27 super representatives; see [TRON](/chains/TRON)).
- Lisk, Ark and other DPoS variants (101 delegates / 51 delegates).

Source: BitShares DPoS whitepaper (Larimer, 2014).

### PoA and PoSA: Identity Accounting

**One-line mechanism**: block-production eligibility comes from identity authorization (reputation or a legal entity), not from compute or tokens; the variant with staking added is called PoSA.

Kovan (Aura) and Rinkeby (Clique), the two Ethereum testnets, were the first deployments, after which it spilled into sidechains and permissioned chains:

- POA Network, Gnosis Chain (formerly xDai; started with AuRA, later moved to POSDAO staked PoS).
- BNB Smart Chain: Parlia = PoA+stake (PoSA), 21 validators (see [BSC](/chains/BinanceSmartChain)).
- Hyperledger Besu's Clique/QBFT for enterprises.
- Ethereum testnets Sepolia, Holesky — PoA successors.

Pure PoA is the most centralized consensus; it does not hold on public chains, but it has stood for years in three places: testnets, sidechains, and permissioned chains. Sources: [Gavin Wood's 2017 naming](https://en.wikipedia.org/wiki/Proof_of_authority), [ethereum.org PoA docs](https://ethereum.org/developers/docs/consensus-mechanisms/poa/).

### PBFT and Permissioned-Chain BFT

**One-line mechanism**: known-identity nodes run a three-round vote per request — Pre-prepare → Prepare → Commit — and 2/3 of the way is deterministic finality.

PBFT's O(n²) communication caps node count at a few hundred, which is why it only stars in permissioned environments:

- Hyperledger Fabric: PBFT in the 0.6 era, etcd-Raft ordering from 1.4.1 (2019), SmartBFT from 3.x.
- FISCO BCOS (2017, PBFT variant); AntChain (HotStuff family; see the unsourced note).
- ChainMaker [TBFT](/consensus/TBFT) (Tendermint lineage) and [MaxBFT](/consensus/MaxBFT) (chained HotStuff).
- Zilliqa (2019, the public-chain exception: pBFT inside PoW shards — compute to enter the network, votes to produce blocks).
- Quorum/Besu's IBFT, IBFT 2.0 (Ethereum-family permissioned chains).

Source: [PBFT paper (OSDI'99) archive](https://web.archive.org/web/2020/http://pmg.csail.mit.edu/papers/osdi99.pdf).

### HotStuff Family: Linearizing the Three-Phase Protocol

**One-line mechanism**: spread PBFT's three voting rounds across consecutive blocks so they run as a pipeline, aggregate signatures into a QC (quorum certificate), and turn view changes from a dedicated sub-protocol into the everyday act of "just switch leaders."

Communication drops from O(n²) to O(n) — that is why it earns the name "third-generation BFT."

- Libra/Diem: DiemBFT (2019), HotStuff's first engineering launch; after the project was wound down, the team and the paper flowed to Aptos.
- Aptos: AptosBFT (DiemBFT v4 + Jolteon/Ditto improvements), mainnet 2022.
- ChainMaker MaxBFT: a permissioned-chain implementation of chained HotStuff.
- Flow: a HotStuff variant (multi-role pipeline).
- AntChain: public sources call it the HotStuff family; the original paper is not found (unsourced).

Sources: [HotStuff (arXiv:1803.05069)](https://arxiv.org/abs/1803.05069); [ChainMaker consensus algorithm docs](https://docs.chainmaker.org.cn/tech/%E5%85%B1%E8%AF%86%E7%AE%97%E6%B3%95.html).

### Tendermint Family: The First Complete Stake+BFT Engine

**One-line mechanism**: pick a proposer per height by voting weight, lock it with two rounds — Prevote/Precommit — 2/3 for instant finality; timeouts change rounds to guarantee liveness.

The 2014 whitepaper welded "PoS staking" and "BFT voting" into one usable consensus engine, and added the ABCI interface so any language could write an application. The Cosmos ecosystem grew out of it:

- Cosmos Hub (mainnet 2019; see [Cosmos](/chains/Cosmos)); isomorphic chains Osmosis, Kava, IRISnet, Crypto.org.
- BNB Beacon Chain (BSC's governance chain; now retired and merged into BSC).
- Terra Classic (2019; after the May 2022 algorithmic collapse it shut down, kept on the books as a risk sample of the Tendermint ecosystem).
- From 2022 on, the main implementation was renamed CometBFT; the protocol is often still called Tendermint BFT.

Sources: Kwon, "Tendermint: Consensus without Mining" (2014), [CometBFT docs](https://docs.cosmos.network/cometbft/).

### Avalanche Family: Subsampled Probabilistic Consensus

**One-line mechanism**: no leader is chosen; each node repeatedly asks 20 random peers "does this transaction stand?" and follows the majority, repeating until convergence.

Four steps of evolution — Slush→Snowflake→Snowball→Snowman (see [Snowball](/consensus/Snowball)) — with a safety threshold of 1/2 instead of BFT's 1/3, buying second-level probabilistic finality at the scale of ten thousand nodes. In use: Avalanche's three chains, X-Chain (DAG shape), and P-Chain and C-Chain (Snowman chained); see [Avalanche](/consensus/Avalanche).

Source: Avalanche whitepaper "Scalable and Probabilistic Leaderless BFT Consensus through Metastability" (Team Rocket, 2018; [Ava Labs](https://www.avalabs.org/) archive).

### Asynchronous BFT

**One-line mechanism**: no reliance on any timeout assumption; threshold cryptography and shared randomness reach consensus over a purely asynchronous network.

- HoneyBadgerBFT (2016, the first practical asynchronous atomic broadcast): POA Network experimental chain and academic implementations, limited production deployment.
- Dumbo series (2019-2021): brought the expected message complexity of asynchronous consensus to something engineering can tolerate; adopted by several Chinese permissioned-chain research projects.

Academic significance outweighs current commercial use: the real internet is closest to the asynchronous model, and this line is BFT theory's "correct answer" — it is just expensive. Source: Miller et al., "The Honey Badger of BFT Protocols" (CCS'16).

### FBA and UNL: Federated Trust

**One-line mechanism**: no global membership list; each node declares for itself whom it trusts, and the trust graph grows its own quorums.

- Stellar: SCP (2015 whitepaper), the only large-scale production implementation of FBA (see [Stellar](/chains/Stellar)).
- XRP Ledger (2012 mainnet): [RPCA](/consensus/RPCA), with the UNL (Unique Node List) designated uniformly by the network; the degree of decentralization is often questioned, and it is FBA's near relative rather than the same thing.

Sources: [SCP whitepaper](https://www.stellar.org/papers/stellar-consensus-protocol.pdf) (Mazières, 2015); RPCA whitepaper (Schwartz et al., 2014).

### Resource and Time Classes: Swapping "Accounting Cost" for Disk and Clocks

**One-line mechanism**: PoC/PoSpace draws by pre-stored disk, PoT builds an unspeedable clock out of a VDF, and PoST adds a "continuous holding" time dimension on top of space.

- Burstcoin (2014, first PoC mainnet); Chia (2021, PoSpace+PoT, the academically strengthened version; see [Chia](/chains/Chia)).
- Hyperledger Sawtooth (PoET, Intel SGX lottery; the root of trust is Intel, and after SGX was broken several times by side channels it became a teaching example).
- Filecoin (2020, PoRep+PoSt, storage proof doubling as consensus; here storage is a service, not a lottery ticket).
- Spacemesh (2023 mainnet, PoST's Tortoise+Hare two-tier ordering).

Sources: [Proofs of Space (ePrint 2013/796)](https://eprint.iacr.org/2013/796); VDF survey (Boneh, Bünz, Fisch, 2018); [Filecoin whitepaper (archive)](https://web.archive.org/web/2023/https://filecoin.io/filecoin.pdf) (2017; the original link has been taken down from the official site); [Solana whitepaper](https://solana.com/solana-whitepaper.pdf) (2017; PoH is the time layer).

### BFT on Sharded Chains: Catchchain (TON)

**One-line mechanism**: the validators who vote in BFT are produced by a PoS staking election, and consensus runs on a native sharded structure where "the master chain governs configuration, the work chains govern transactions" — BFT handles finality, sharding handles capacity, and the two legs each stand on their own.

- TON (2021 mainnet): the Catchchain protocol reaches Byzantine fault-tolerant agreement among validators; the master chain carries network configuration and final consensus, while work chains can re-shard to handle transactions; see [TON](/chains/TON).
- The difference from other BFT renaissance entries: the HotStuff and Tendermint families solve "how to vote efficiently on a single chain," while TON makes sharding a first-class citizen, and consensus only anchors cross-shard consistency.

Sources: [TON docs · Catchchain consensus outline](https://docs.ton.org/); the whitepaper text is at [ton-blockchain/ton](https://github.com/ton-blockchain/ton).

### CFT Consensus and Development Modes

RAFT tolerates crashes but not malice; tolerating f faults needs 2f+1 nodes (BFT needs 3f+1), with O(n) messages and very low latency. Permissioned chains use it for the ordering layer (Fabric etcd-Raft, ChainMaker pluggable); distributed storage (etcd, TiKV) makes it the star. SOLO produces blocks from a single node and is only fit for development and testing. See [RAFT](/consensus/RAFT), [SOLO](/consensus/SOLO).

Source: [RAFT paper](https://raft.github.io/raft.pdf) (USENIX ATC 2014).

## Main Chain and Consensus Mapping

Chain name against consensus variant, with fork chains and retired chains listed alongside. "Forked from" marks the code or ecosystem origin.

| Chain | Launch | Consensus (variant) | Notes |
| --- | --- | --- | --- |
| Bitcoin | 2009 | PoW (SHA-256d, Nakamoto Consensus) | Fork chains BCH, BSV on the same PoW, 2017/2018 |
| Litecoin | 2011 | PoW (Scrypt) | [Litecoin](/chains/Litecoin) |
| XRP Ledger | 2012 | RPCA (UNL voting) | Whitepaper published later, in 2014 |
| Peercoin | 2012 | PoW+PoS hybrid | First PoS mainnet |
| Nxt | 2013 | Pure PoS | First PoW-free mainnet |
| Dogecoin | 2013 | PoW (Scrypt) + AuxPoW | Merged mining with Litecoin since 2014 |
| BitShares | 2014 | DPoS | Larimer's first work |
| Monero | 2014 | PoW (RandomX) | Switched to an ASIC-resistant algorithm in 2019; [Monero](/chains/Monero) |
| Stellar | 2014 | SCP (FBA) | Whitepaper 2015; [Stellar](/chains/Stellar) |
| Decred | 2016 | PoW block production + PoS voting | The hybrid camp's complete form |
| Ethereum | 2015 | PoW→Gasper (from 2022-09-15) | Casper FFG + LMD GHOST; [Ethereum](/chains/Ethereum) |
| Hyperledger Fabric | 2016 | Pluggable: PBFT→Raft→SmartBFT | Permissioned chain; see [Hyperledger context](/consensus/RAFT) |
| FISCO BCOS | 2017 | PBFT variant | Chinese permissioned chain |
| Cardano | 2017 | Ouroboros (Classic→Praos) | First PoS with a rigorous proof; [Cardano](/chains/Cardano) |
| HyperCash | 2017 | PoW+PoS hybrid | The "HDPoS" label is unsourced |
| EOS | 2018 | DPoS+BFT irreversible | 21 BPs; [EOS](/chains/EOS) |
| TRON | 2018 | DPoS | 27 super representatives; [TRON](/chains/TRON) |
| Gnosis Chain | 2018 | AuRA PoA→POSDAO | The former xDai sidechain |
| Cosmos Hub | 2019 | Tendermint BFT (now CometBFT) | Isomorphic chains: Osmosis, Kava, IRISnet |
| Terra Classic | 2019 | Tendermint | Collapsed and halted May 2022; risk sample |
| Zilliqa | 2019 | PoW sharding + pBFT | Compute to enter the network, votes to produce blocks; [sharding](/consensus/Sharding) |
| Algorand | 2019 | Pure PoS + BA⋆ (VRF lottery) | |
| Solana | 2020 | PoH + TowerBFT + stake rotation | [Solana](/chains/Solana) |
| Near | 2020 | Nightshade sharding + Doomslug (PoS) | |
| Polkadot | 2020 | NPoS (BABE block production + GRANDPA finality) | [Polkadot](/chains/Polkadot) |
| BNB Smart Chain | 2020 | PoSA (Parlia, 21 validators) | The BNB Beacon Chain (Tendermint) is retired; [BSC](/chains/BinanceSmartChain) |
| Avalanche | 2020 | Snowball family (X-Chain DAG / P-Chain, C-Chain Snowman) | [Avalanche](/consensus/Avalanche) |
| Filecoin | 2020 | PoRep+PoSt (Expected Consensus) | Storage proof is the consensus |
| Chia | 2021 | PoSpace+PoT (VDF) | [Chia](/chains/Chia), [PoSpace](/consensus/PoSpace), [PoT](/consensus/POT) |
| ChainMaker | 2021 (open source) | TBFT/MaxBFT/RAFT/SOLO pluggable | Permissioned chain; [ChainMaker docs](https://docs.chainmaker.org.cn/tech/%E5%85%B1%E8%AF%86%E7%AE%97%E6%B3%95.html) |
| TON | 2021 | Catchchain (BFT+PoS) | Master chain + work chains, native sharding; [TON](/chains/TON) |
| Aptos | 2022 | AptosBFT (DiemBFT v4 / Jolteon line HotStuff) | Diem lineage |
| Sui | 2023 | Narwhal+Bullshark/Mysticeti | DAG mempool decoupled from consensus |
| Spacemesh | 2023 | PoST (Tortoise+Hare) | First production implementation of PoST |
| AntChain | Undisclosed | HotStuff family (permissioned chain) | Original paper unsourced |

35 chains, covering the main consensus variants in use today. The concentration is visible: among block-production resources, three chains on PoW and more than twenty in the PoS family; among voting layers, the two names HotStuff and Tendermint cover most of the BFT public chains.

## Sources

### Whitepapers and Papers

- Nakamoto, "Bitcoin: A Peer-to-Peer Electronic Cash System" (2008): [bitcoin.org/bitcoin.pdf](https://bitcoin.org/bitcoin.pdf)
- King, Nadal, "PPCoin: Peer-to-Peer Crypto-Currency with Proof-of-Stake" (2012-08-19): [decred.org mirror](https://decred.org/research/king2012.pdf)
- Larimer, "Delegated Proof of Stake" whitepaper (BitShares, 2014)
- Kwon, "Tendermint: Consensus without Mining" (2014); now continued by the [CometBFT docs](https://docs.cosmos.network/cometbft/)
- Mazières, "The Stellar Consensus Protocol" (2015): [stellar.org/papers](https://www.stellar.org/papers/stellar-consensus-protocol.pdf)
- Schwartz, Youngs, Britto, "The Ripple Protocol Consensus Algorithm" (2014)
- Castro, Liskov, "Practical Byzantine Fault Tolerance" (OSDI'99): [Microsoft Research paper page](https://www.microsoft.com/en-us/research/publication/practical-byzantine-fault-tolerance-2/), [archived mirror](https://web.archive.org/web/2020/http://pmg.csail.mit.edu/papers/osdi99.pdf)
- Ongaro, Ousterhout, "In Search of an Understandable Consensus Algorithm" (USENIX ATC 2014): [raft.github.io](https://raft.github.io/raft.pdf)
- Kiayias, Russell, David, Oliynykov, "Ouroboros" (CRYPTO 2017): [ePrint 2016/889](https://eprint.iacr.org/2016/889)
- Buterin, Griffith, "Casper the Friendly Finality Gadget" (2017): [arXiv:1710.09437](https://arxiv.org/abs/1710.09437)
- Yin, Malkhi et al., "HotStuff: BFT Consensus with Linearity and Responsiveness" (CCS'19): [arXiv:1803.05069](https://arxiv.org/abs/1803.05069)
- Team Rocket, "Scalable and Probabilistic Leaderless BFT Consensus through Metastability" (2018): archived on the [Ava Labs](https://www.avalabs.org/) site
- Miller et al., "The Honey Badger of BFT Protocols" (CCS'16)
- Dziembowski et al., "Proofs of Space" (CRYPTO 2015): [ePrint 2013/796](https://eprint.iacr.org/2013/796)
- Boneh, Bünz, Fisch, "A Survey of Two Verifiable Delay Functions" (2018)
- Yakovenko, "Solana: A new architecture for a high performance blockchain" (2017): [solana.com/solana-whitepaper.pdf](https://solana.com/solana-whitepaper.pdf)
- Wood, "Polkadot: Vision for a Heterogeneous Multi-Chain Framework" (2016 draft)
- Micali, "ALGORAND: The Efficient and Democratic Ledger" (arXiv:1607.01341)
- Protocol Labs, "Filecoin: A Decentralized Storage Network" (2017; the original whitepaper PDF has been taken down from the official site): [official tech spec spec.filecoin.io](https://spec.filecoin.io/), [archived whitepaper](https://web.archive.org/web/2023/https://filecoin.io/filecoin.pdf)

### Official Documentation

- [ethereum.org consensus mechanisms (PoA/Gasper framing)](https://ethereum.org/developers/docs/consensus-mechanisms/poa/)
- [ChainMaker consensus algorithms](https://docs.chainmaker.org.cn/tech/%E5%85%B1%E8%AF%86%E7%AE%97%E6%B3%95.html) (TBFT/MaxBFT/Raft/Solo)
- Hyperledger Fabric docs (Raft ordering, SmartBFT)
- [CometBFT docs](https://docs.cosmos.network/cometbft/) (Tendermint successor)
- Aptos and Sui official docs (AptosBFT, Narwhal/Mysticeti framing)
- [Chia official docs](https://docs.chia.net/proof-of-space/) (PoSpace+PoT), Decred docs (hybrid consensus), Gnosis Chain docs (POSDAO)
- [Zilliqa technical whitepaper](https://docs.zilliqa.com/whitepaper.pdf) (sharding + pBFT)
- [Kaspa node implementation](https://github.com/kaspanet/rusty-kaspa) (GHOSTDAG production implementation)
- [Polkadot wiki · Phragmén](https://wiki.polkadot.com/docs/learn-phragmen), [· staking](https://wiki.polkadot.com/docs/learn-staking) (NPoS framing)

### Unsourced

The following entries could not be traced to an authoritative primary source and are included on hearsay or third-party framing; go back to the whitepaper to verify before citing them.

1. The "HDPoS" term: HyperCash's own whitepaper says PoW+PoS hybrid, and no official document defines HDPoS; the HDPoS label on exchange quote pages is suspected to be a garbling of "Hybrid PoS." The term itself is treated as unsourced.
2. AntChain MaxBFT: ChainMaker docs confirm its MaxBFT derives from chained HotStuff; no public engineering paper for AntChain's own HotStuff was found.
3. The "APoS" claim (Solana): Solana's official framing is PoS staking + PoH + TowerBFT, with no official APoS term; this page follows the official framing.
4. The 2011 Bitcointalk PoS forum post (QuantumMechanic): the original post is locatable but is community discussion, not an academic source; recorded only as the first public statement of the concept.

## How to Use This Page

- To find what consensus a chain uses: go straight to the [mapping table](#main-chain-and-consensus-mapping).
- To find which year an algorithm appeared and who used it first: look at the [timeline master table](#timeline-master-table).
- To read a single algorithm's mechanism: each family deep dive has in-site links, and the [consensus algorithm catalog](/consensus/Consensus) holds 52 algorithm deep dives plus one overview.
- This page and the [development timeline](/timeline)'s 49 timeline nodes complement each other: that side shows why events happened when they did, this side shows where algorithms came from and who adopted them; for an ordering by each chain's first mainnet launch, see [navigate by time](/nav/ByTime).

