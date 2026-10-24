# Outlook on consensus trends

This page covers only two kinds of content: **existing evidence** (traceable to public sources) and **verifiable observations for the next 3 years** (written as "what number or event to watch," never as profit predictions). Every trend's sources are listed at the end of its entry; claims with no public source are left out. For technical detail, follow the site's links into the corresponding [consensus](/consensus/Consensus) or [layers](/layers/Layers) page; for the lineage by year, read the [consensus algorithm timeline](/consensus-timeline).

## ① Modularization: DA as its own layer, settlement and execution separated

**Existing evidence**: Ethereum's official documentation defines "data availability" (DA) as a layer in its own right — block data must actually be published, and light nodes confirm this with sampling plus erasure coding; DA need not be carried by the execution layer. Celestia builds DA as a dedicated standalone chain (the [celestia-core repository](https://github.com/celestiaorg/celestia-core)), leaving execution and settlement to the rollups above.

**Representative projects**: Celestia (DA-only chain), Ethereum blobs (L1-supplied DA), the various rollups (see the chain list on [L2Beat](https://l2beat.com)).

**Verifiable observations for the next 3 years**:
- Whether the number of new chains listing a non-Ethereum option in L2Beat's "DA layer" column rises.
- Whether DA-related parameters (blob capacity, price ceilings) in the [Ethereum roadmap](https://ethereum.org/en/roadmap/) keep being adjusted.

**Sources**: [ethereum.org data availability](https://ethereum.org/en/developers/docs/data-availability/), [github.com/celestiaorg/celestia-core](https://github.com/celestiaorg/celestia-core), [L2Beat](https://l2beat.com), [Ethereum roadmap](https://ethereum.org/en/roadmap/)

## ② Restaking: the security budget gets resold wholesale

**Existing evidence**: EigenLayer pledges already-staked ETH to AVSs (Active Validator Services), renting the same slashing deterrent to multiple protocols; the contract code is public at [Layr-Labs/eigenlayer-contracts](https://github.com/Layr-Labs/eigenlayer-contracts). This matches the mechanism described on the site's [Restaking](/consensus/Restaking) page.

**Representative projects**: EigenLayer and its AVSs; Ethereum L1 staking itself is the primary source of the security budget.

**Verifiable observations for the next 3 years**:
- The trend of restaked stake as a share of Ethereum's total stake (EigenLayer's public dashboard).
- The number of launched AVSs and the security duties they actually carry (which are real infrastructure, which are just stake pools).
- Whether "correlated failure" appears — multiple AVSs depending on the same validator set, so one failure takes down several chains (the boundary Vitalik argues for in *Don't overload Ethereum's consensus*).

**Sources**: [eigenlayer.xyz](https://eigenlayer.xyz), [github.com/Layr-Labs/eigenlayer-contracts](https://github.com/Layr-Labs/eigenlayer-contracts), [Don't overload Ethereum's consensus](https://vitalik.eth.limo/general/2023/05/21/dont_overload.html)

## ③ Shared sequencing: ordering rights move from a single point to a shared one

**Existing evidence**: A rollup's current sequencer is usually a single-point role — soft confirmations come from the sequencer, with L1 forced inclusion and fraud or validity proofs as backstops (see [ordering and settlement](/consensus/Sequencing)). The [Optimism sequencer documentation](https://community.optimism.io/docs/how-sequencers-work/) describes the current mechanisms for sequencing, forced inclusion, and shared sequencing.

**Representative projects**: OP Stack shared sequencing, [Espresso](https://espressosys.com) (cross-rollup sequencing), [Taiko](https://taiko.xyz) and the [Taiko docs](https://docs.taiko.xyz).

**Verifiable observations for the next 3 years**:
- Whether the number of rollups using shared sequencers overtakes those running their own.
- Whether ordering rights enter the staking and slashing regime (whether a misbehaving sequencer can be economically punished).
- The real usage frequency of forced inclusion — if it moves from "backstop" to "normal path," that signals declining sequencer centralization.

**Sources**: [community.optimism.io sequencer documentation](https://community.optimism.io/docs/how-sequencers-work/), [espressosys.com](https://espressosys.com), [taiko.xyz](https://taiko.xyz), [docs.taiko.xyz](https://docs.taiko.xyz)

## ④ ZK finality: proof replaces trust

**Existing evidence**: [Ethereum's official documentation](https://ethereum.org/en/developers/docs/scaling/zk-rollups/) describes ZK rollups as the "submit a validity proof" route — L1 verification passing is final, with no need to wait out a challenge window. Compared with the fraud-proof route of [optimistic rollups](https://ethereum.org/en/developers/docs/scaling/optimistic-rollups/), finality shifts from "nobody objected for a period" to "the proof has been verified."

**Representative projects**: The various ZK rollups; [zkSync](/chains/zkSync) and [Arbitrum](/chains/Arbitrum) (optimistic-route comparison); [Aptos](/chains/Aptos) and [Sui](/chains/Sui) (application-layer parallel execution + BFT).

**Verifiable observations for the next 3 years**:
- The share trend of ZK rollups versus optimistic rollups on [L2Beat](https://l2beat.com).
- Whether per-proof cost and time fall to a level tolerable for L1-grade usage.
- Whether finality moves from "challenge window closes" to "proof verification passes" — checkable protocol by protocol.

**Sources**: [ethereum.org ZK rollups](https://ethereum.org/en/developers/docs/scaling/zk-rollups/), [ethereum.org optimistic rollups](https://ethereum.org/en/developers/docs/scaling/optimistic-rollups/), [L2Beat](https://l2beat.com)

## ⑤ DAG-style ledgers: from chain to graph

**Existing evidence**: [GHOSTDAG](/consensus/GHOSTDAG) (Sompolinsky et al., 2018, [eprint 2018/104](https://eprint.iacr.org/2018/104)) generalizes Nakamoto consensus to a BlockDAG, with Kaspa as the first production implementation; [Mysticeti](/consensus/Mysticeti) ([arXiv:2404.12257](https://arxiv.org/abs/2404.12257)) and [Narwhal/Bullshark](/consensus/NarwhalBullshark) use DAGs for the mempool and uncertified consensus. Both lines are turning "concurrency" from waste into resource.

**Representative projects**: Kaspa (PoW BlockDAG), [Sui](/chains/Sui) (DAG mempool + Mysticeti), [Aptos](/chains/Aptos) (Block-STM parallel execution).

**Verifiable observations for the next 3 years**:
- The share of new public chains whose structure is "DAG" (checkable whitepaper by whitepaper).
- Whether uncertified DAG becomes the default structure for new BFT implementations.
- Whether full-node memory and bandwidth overhead for DAG structures drops low enough for ordinary nodes to carry — the hard metric for whether the DAG route can decentralize.

**Sources**: [eprint.iacr.org/2018/104](https://eprint.iacr.org/2018/104), [arxiv.org/abs/2404.12257](https://arxiv.org/abs/2404.12257), [github.com/kaspanet/rusty-kaspa](https://github.com/kaspanet/rusty-kaspa)

## ⑥ BFT topology evolution: HotStuff → Narwhal → Mysticeti

**Existing evidence**: [HotStuff](/consensus/HotStuff) (Yin, Malkhi et al., [arXiv:1803.05069](https://arxiv.org/abs/1803.05069), CCS'19) linearizes three-phase BFT, cutting communication from O(n²) to linear; Narwhal makes transaction propagation its own independent DAG mempool; [Mysticeti](/consensus/Mysticeti) then removes per-round certificates (uncertified DAG), replacing two rounds of voting with a three-hop commit. This line's design direction is to **reduce the network round trips per consensus round**.

**Representative projects**: [Sui](/chains/Sui) (Mysticeti running on mainnet), [Aptos](/chains/Aptos) (AptosBFT, HotStuff family), [DiemBFT](/consensus/DiemBFT).

**Verifiable observations for the next 3 years**:
- The frequency of uncertified DAG in new BFT papers.
- Whether BFT finality latency reaches the sub-second range and stays there.
- Whether communication complexity and signature-aggregation techniques (such as batch aggregation) become standard in papers.

**Sources**: [arxiv.org/abs/1803.05069](https://arxiv.org/abs/1803.05069), [arxiv.org/abs/2404.12257](https://arxiv.org/abs/2404.12257)

## ⑦ Randomness and VRF: block rights must be unpredictable

**Existing evidence**: [Ouroboros](/consensus/Ouroboros) (Kiayias et al., [eprint 2016/889](https://eprint.iacr.org/2016/889)) uses a VRF for secret leader sortition; [BABE](/consensus/BABE)'s blind assignment and [Algorand](/consensus/Algorand)'s BA⋆ are the same idea; [PoT](/consensus/POT) uses a [VDF](https://docs.chia.net/proof-of-time/) to guarantee challenges are unpredictable; the [Filecoin spec](https://spec.filecoin.io/) uses drand to supply an external randomness beacon.

**Representative projects**: Cardano (Ouroboros), [Polkadot](/chains/Polkadot) (BABE), Chia (PoT/VDF), Filecoin (drand).

**Verifiable observations for the next 3 years**:
- Whether randomness beacons keep going external (how many cross-chain shared VDF services appear).
- Whether new exploitability reports appear against the cryptographic assumptions of VRF/VDF.
- Whether block-right assignment extends from "sortition" to a hybrid "sortition + sequencer" model.

**Sources**: [eprint.iacr.org/2016/889](https://eprint.iacr.org/2016/889), [docs.chia.net/proof-of-time/](https://docs.chia.net/proof-of-time/), [spec.filecoin.io](https://spec.filecoin.io/)

## ⑧ Green, low-power consensus: resources in exchange for bookkeeping rights

**Existing evidence**: [The Merge](/chains/Ethereum) (2022-09-15) moved Ethereum from PoW to PoS, cutting energy use by roughly 99.95%; [PoSpace](/consensus/PoSpace) and [PoT](/consensus/POT) substitute disks and serial time for hashrate ([docs.chia.net/proof-of-space/](https://docs.chia.net/proof-of-space/)); [PoST](/consensus/PoST) counts "sustained holding of space" into security ([spec.filecoin.io](https://spec.filecoin.io/)); [SPoRA](/consensus/SPORA) substitutes random access to history for sustained hashrate.

**Representative projects**: Ethereum (PoS), Chia (PoSpace+PoT), Filecoin (PoRep/PoST), [Arweave](/chains/Arweave) (SPoRA).

**Verifiable observations for the next 3 years**:
- Whether energy-use or proof-intensity metrics become published selection parameters across chains (whether whitepapers give comparable numbers).
- The plotting cost and plotting-industry concentration of proof-of-space networks — the real discount on "how green is green."
- Whether new attack surfaces appear at the Sybil-resistance boundary of low-power consensus.

**Sources**: [docs.chia.net/proof-of-space/](https://docs.chia.net/proof-of-space/), [spec.filecoin.io](https://spec.filecoin.io/), [consensus algorithm timeline](/consensus-timeline)

## ⑨ Cross-chain interoperability and trust-minimized bridges

**Existing evidence**: IBC ([ibc.cosmos.network](https://ibc.cosmos.network)) makes cross-chain message passing a protocol within the Cosmos ecosystem, with the trust model defined by the ICS specification rather than depending on a bridge custodian contract. Contrast this with the bridge attacks documented on the site's [cross-chain bridge attack](/hacking/CrossChainBridgeAttack) page — bridges are the costliest attack surface, and trust minimization is the main direction.

**Representative projects**: Cosmos IBC, [Polkadot](/chains/Polkadot) (parachains + XCM), the various validator-set bridges.

**Verifiable observations for the next 3 years**:
- The trend in bridge attack counts and amounts (talliable one by one from public security advisories).
- Whether bridge trust models shift from "multisig custody" to "validator set / light client verification."
- Whether cross-chain shared sequencing (trend ③) and cross-chain interoperability merge into one infrastructure.

**Sources**: [ibc.cosmos.network](https://ibc.cosmos.network), [cross-chain bridge attack](/hacking/CrossChainBridgeAttack)

## How to read these nine

The nine are not parallel "future predictions" — each one maps to an **engineering fact that already happened** and a **metric that can be checked**:

| Trend | Established fact | Checkable metric |
| --- | --- | --- |
| ① Modularization | DA is already defined separately from execution | Number of new chains' DA layer options |
| ② Restaking | Restaking contracts are already live | Restaking share and number of AVSs |
| ③ Shared sequencing | Shared sequencing already has implementations | Number of adopters, forced-inclusion frequency |
| ④ ZK finality | ZK rollups are already on mainnet | Share trend and proof cost |
| ⑤ DAG ledger | BlockDAG and uncertified DAG are already live | Full-node overhead, adoption in new chains |
| ⑥ BFT topology | Uncertified DAG is already the main line of papers | Finality latency, communication complexity |
| ⑦ VRF | VRF/VDF is already standard | Number of external randomness beacons |
| ⑧ Green consensus | PoS and proof of space have already replaced hashrate | Whether energy metrics are published and comparable |
| ⑨ Cross-chain | IBC has already defined its trust model | Bridge attack counts and trust models |

What is deliberately absent from this page: any profit prediction without public-source support, any "about to replace" verdict, any unverified attribution of an incident. Claims that cannot be traced to a public source are marked site-wide as "no public record found" or "source unverified."
