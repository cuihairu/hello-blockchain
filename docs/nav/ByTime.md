# Navigate by time

Three pages keep three distinct viewpoints: the **lineage and adoption thread of consensus algorithms** is in the [consensus algorithm timeline](/consensus-timeline) (64 annual entries); **why a technical event happened when it did** is in the [development timeline](/timeline) (49 nodes); this page lists the chains this site covers in order of their first mainnet launch, answering "which chains came online first, and with what consensus." Note on the table's boundaries: Tether is an asset and Lightning is an offchain channel network, so both are listed below the table instead.

| Mainnet launch | Chain | Consensus | Page |
| --- | --- | --- | --- |
| 2009-01 | [Bitcoin](/chains/Bitcoin) | [PoW](/consensus/POW) (SHA-256d) | [Bitcoin](/chains/Bitcoin) |
| 2011-10 | [Litecoin](/chains/Litecoin) | [PoW](/consensus/POW) (Scrypt) | [Litecoin](/chains/Litecoin) |
| 2014-04 | [Monero](/chains/Monero) | [PoW](/consensus/POW) (CryptoNote, later RandomX) | [Monero](/chains/Monero) |
| 2014-07 | [Stellar](/chains/Stellar) | [FBA/SCP](/consensus/FBA) | [Stellar](/chains/Stellar) |
| 2015-07 | [Ethereum](/chains/Ethereum) | PoW → 2022 switch to [Gasper](/consensus/Gasper) | [Ethereum](/chains/Ethereum) |
| 2017-09 | [Cardano](/chains/Cardano) | [Ouroboros](/consensus/Ouroboros) | [Cardano](/chains/Cardano) |
| 2018-04 | [Bytom](/chains/Bytom) | PoW+BUTXO (since pivoted) | [Bytom](/chains/Bytom) |
| 2018-05 | [TRON](/chains/TRON) | [DPoS](/consensus/DPOS) (27 super representatives) | [TRON](/chains/TRON) |
| 2018-06 | [EOS](/chains/EOS) | [DPoS](/consensus/DPOS) (21 BPs) | [EOS](/chains/EOS) |
| 2018-06 | [Arweave](/chains/Arweave) | PoW → 2022 switch to [SPoRA](/consensus/SPORA) | [Arweave](/chains/Arweave) |
| 2019-03 | [Cosmos](/chains/Cosmos) | [Tendermint BFT](/consensus/Tendermint) | [Cosmos](/chains/Cosmos) |
| 2020-03 | [Solana](/chains/Solana) | [PoH](/consensus/PoH) + [TowerBFT](/consensus/TowerBFT) | [Solana](/chains/Solana) |
| 2020-04 | [Near](/chains/Near) | Nightshade sharding + [Doomslug](/consensus/BFT) | [Near](/chains/Near) |
| 2020-05 | [Polkadot](/chains/Polkadot) | [BABE](/consensus/BABE) + [GRANDPA](/consensus/GRANDPA) | [Polkadot](/chains/Polkadot) |
| 2020-09 | [BNB Chain](/chains/BinanceSmartChain) | [PoSA](/consensus/POA) (21 validators) | [BSC](/chains/BinanceSmartChain) |
| 2020-09 | [Avalanche](/chains/Avalanche) | [Snowball/Snowman](/consensus/Snowball) (subsampled BFT) | [Avalanche](/chains/Avalanche) |
| 2020-10 | [Filecoin](/chains/Filecoin) | [PoRep/PoST](/consensus/PoST) (Expected Consensus) | [Filecoin](/chains/Filecoin) |
| 2021-03 | [Chia](/chains/Chia) | [PoSpace](/consensus/PoSpace) + [PoT](/consensus/POT) | [Chia](/chains/Chia) |
| 2021-05 | [TON](/chains/TON) | Catchain BFT + unbounded sharding | [TON](/chains/TON) |
| 2021-08 | [Arbitrum](/chains/Arbitrum) | [Optimistic Rollup](/consensus/Sequencing) (interactive fraud proofs) | [Arbitrum](/chains/Arbitrum) |
| 2021-12 | [Optimism](/chains/Optimism) | [Optimistic Rollup](/consensus/Sequencing) (OP Stack) | [Optimism](/chains/Optimism) |
| 2022-10 | [Aptos](/chains/Aptos) | [AptosBFT](/consensus/DiemBFT) + Block-STM | [Aptos](/chains/Aptos) |
| 2023-03 | [zkSync Era](/chains/zkSync) | [zkEVM](/Privacy/ZeroKnowledgeProof) (validity proofs) | [zkSync](/chains/zkSync) |
| 2023-05 | [Sui](/chains/Sui) | [Narwhal/Bullshark](/consensus/NarwhalBullshark) → 2024 [Mysticeti](/consensus/Mysticeti) | [Sui](/chains/Sui) |

> [Lightning](/chains/Lightning) is not an independent chain: the 2016 whitepaper, mainnet available from 2018, and it is a channel network on top of Bitcoin — hence no row in the table above. USDT (issued since 2015) is an asset, not a chain; see the [stablecoin entry](/chains/Tether).

## How to read it

- **Two peaks: 2018 and 2020-2021.** The former was the DPoS high-throughput wave (EOS/TRON); the latter was consensus-resource experimentation beyond PoW (storage, clocks, sharding) plus Ethereum L2 landing.
- **The changes in the consensus column** are the history themselves: after a PoW start, the pivot happened in 2022 (Ethereum's Gasper, Arweave's SPoRA), while L2s split "consensus" into two layers — ordering and settlement (see [ordering and settlement](/consensus/Sequencing)).
- Each chain's four-part profile (whitepaper source / what it solves / technical achievements / limits and incidents) lives on its own chain page.
