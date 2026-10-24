# 按时间导航

三页保留三个不同视角：**共识算法的谱系与采用脉络**见[共识算法演进时间线](/zh/consensus-timeline)（64 条年表）；**技术事件为何在那个时间发生**见[发展史时间线](/zh/timeline)（49 个节点）；本页则按首次主网上线时间排列本站收录的链，回答「哪些链先后上线、采用什么共识」。条目边界说明：Tether 是资产，Lightning 是链下通道网络，单列在表下。

| 主网上线 | 链 | 共识 | 页面 |
| --- | --- | --- | --- |
| 2009-01 | [比特币](/zh/chains/Bitcoin) | [PoW](/zh/consensus/POW)（SHA-256d） | [Bitcoin](/zh/chains/Bitcoin) |
| 2011-10 | [莱特币](/zh/chains/Litecoin) | [PoW](/zh/consensus/POW)（Scrypt） | [Litecoin](/zh/chains/Litecoin) |
| 2014-04 | [门罗币](/zh/chains/Monero) | [PoW](/zh/consensus/POW)（CryptoNote，后 RandomX） | [Monero](/zh/chains/Monero) |
| 2014-07 | [恒星币](/zh/chains/Stellar) | [FBA/SCP](/zh/consensus/FBA) | [Stellar](/zh/chains/Stellar) |
| 2015-07 | [以太坊](/zh/chains/Ethereum) | PoW → 2022 转 [Gasper](/zh/consensus/Gasper) | [Ethereum](/zh/chains/Ethereum) |
| 2017-09 | [卡尔达诺](/zh/chains/Cardano) | [Ouroboros](/zh/consensus/Ouroboros) | [Cardano](/zh/chains/Cardano) |
| 2018-04 | [比原链](/zh/chains/Bytom) | PoW+BUTXO（已转型） | [Bytom](/zh/chains/Bytom) |
| 2018-05 | [波场](/zh/chains/TRON) | [DPoS](/zh/consensus/DPOS)（27 超级代表） | [TRON](/zh/chains/TRON) |
| 2018-06 | [EOS](/zh/chains/EOS) | [DPoS](/zh/consensus/DPOS)（21 BP） | [EOS](/zh/chains/EOS) |
| 2018-06 | [Arweave](/zh/chains/Arweave) | PoW → 2022 转 [SPoRA](/zh/consensus/SPORA) | [Arweave](/zh/chains/Arweave) |
| 2019-03 | [Cosmos](/zh/chains/Cosmos) | [Tendermint BFT](/zh/consensus/Tendermint) | [Cosmos](/zh/chains/Cosmos) |
| 2020-03 | [Solana](/zh/chains/Solana) | [PoH](/zh/consensus/PoH) + [TowerBFT](/zh/consensus/TowerBFT) | [Solana](/zh/chains/Solana) |
| 2020-04 | [Near](/zh/chains/Near) | Nightshade 分片 + [Doomslug](/zh/consensus/BFT) | [Near](/zh/chains/Near) |
| 2020-05 | [波卡](/zh/chains/Polkadot) | [BABE](/zh/consensus/BABE) + [GRANDPA](/zh/consensus/GRANDPA) | [Polkadot](/zh/chains/Polkadot) |
| 2020-09 | [BNB Chain](/zh/chains/BinanceSmartChain) | [PoSA](/zh/consensus/POA)（21 验证人） | [BSC](/zh/chains/BinanceSmartChain) |
| 2020-09 | [雪崩](/zh/chains/Avalanche) | [Snowball/Snowman](/zh/consensus/Snowball)（亚采样 BFT） | [Avalanche](/zh/chains/Avalanche) |
| 2020-10 | [Filecoin](/zh/chains/Filecoin) | [PoRep/PoST](/zh/consensus/PoST)（Expected Consensus） | [Filecoin](/zh/chains/Filecoin) |
| 2021-03 | [Chia](/zh/chains/Chia) | [PoSpace](/zh/consensus/PoSpace) + [PoT](/zh/consensus/POT) | [Chia](/zh/chains/Chia) |
| 2021-05 | [TON](/zh/chains/TON) | Catchain BFT + 无限分片 | [TON](/zh/chains/TON) |
| 2021-08 | [Arbitrum](/zh/chains/Arbitrum) | [Optimistic Rollup](/zh/consensus/Sequencing)（交互式欺诈证明） | [Arbitrum](/zh/chains/Arbitrum) |
| 2021-12 | [Optimism](/zh/chains/Optimism) | [Optimistic Rollup](/zh/consensus/Sequencing)（OP Stack） | [Optimism](/zh/chains/Optimism) |
| 2022-10 | [Aptos](/zh/chains/Aptos) | [AptosBFT](/zh/consensus/DiemBFT) + Block-STM | [Aptos](/zh/chains/Aptos) |
| 2023-03 | [zkSync Era](/zh/chains/zkSync) | [zkEVM](/zh/Privacy/ZeroKnowledgeProof)（有效性证明） | [zkSync](/zh/chains/zkSync) |
| 2023-05 | [Sui](/zh/chains/Sui) | [Narwhal/Bullshark](/zh/consensus/NarwhalBullshark) → 2024 [Mysticeti](/zh/consensus/Mysticeti) | [Sui](/zh/chains/Sui) |

> [闪电网络](/zh/chains/Lightning)不是独立链：2016 白皮书、2018 起主网可用，是比特币链上的通道网络，所以不占上表行。USDT（2015 年起发行）是资产不是链，见[稳定币条目](/zh/chains/Tether)。

## 读法

- **2018 与 2020-2021 两波高峰**：前者是 DPoS 高吞吐潮（EOS/TRON），后者是 PoW 之外的共识资源实验（存储、时钟、分片）与以太坊 L2 落地。
- **共识列的变化**本身就是史：PoW 起家后 2022 年集中转向（以太坊 Gasper、Arweave SPoRA），L2 则把「共识」拆成排序与结算两层（见[排序与结算](/zh/consensus/Sequencing)）。
- 每条链的四节档案（白皮书出处/解决什么/技术成果/局限与事故）在各自链页。
