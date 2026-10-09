---
title: 知识点总纲
---

# 知识点总纲

> 本页把散在各主题页的共识算法知识点收拢成一页：核心概念、依据的论文与白皮书、官方文档、应用场景、常见坑。每条注明来源并链接回原文；查无实据的条目标「来源未考」。演进脉络的完整版本在[共识算法演进时间线](/consensus-timeline)。当前收拢的是共识算法一个主题，其余主题（记账模型、隐私、攻防）随批补齐。

## 核心概念

### 安全模型

- 共识要同时保住两件事：**一致性**（诚实节点认同一份账）与**活性**（新交易能持续上账）。FLP 不可能定理（1985）证明纯异步+确定性系统两者不可兼得，出路只有两条：引入超时假设（部分同步，PBFT 路线）或引入随机（HoneyBadger、Avalanche 路线）。
- 拜占庭环境下容忍 f 个作恶节点需要 **n ≥ 3f+1**（1982 年拜占庭将军问题论文的结论）；只容忍宕机的 CFT（RAFT）需要 2f+1。这个差价决定了联盟链在信任模型上选 RAFT 还是 BFT。
- BFT 投票权重的黄金线：作恶 < 1/3 安全且活，1/3~2/3 之间安全但可能停摆，> 2/3 可伪造最终状态。Avalanche 是例外，它的概率安全阈值是 1/2。
- **最终性分两种**：概率性（PoW+最长链，确认数越多越难回滚）与确定性（BFT 投票 +2/3 即不可逆）。以太坊 Merge 之后，主流公链基本走向了「PoS 选人 + BFT 定最终性」。

### 演进逻辑

- 每代共识换的不是投票方式，而是**记账资源**：算力（PoW）→ 代币（PoS）→ 声誉（PoA）→ 硬盘（PoSpace）→ 时间（VDF）。投票协议本身（BFT）反而是最老的部分，1982 年就有理论，1999 年就能落地。
- PoW 的直系思想源是反垃圾邮件的 Hashcash（1997），比特币的贡献是给哈希预算加了货币与最长链规则；b-money、Bit Gold（1998）是没画完的草图。
- PoS 的头是 Peercoin（2012-08-19 白皮书）开的，但它是 PoW+PoS 混合；第一个纯 PoS 主网是 Nxt（2013）。有严格安全证明的 PoS 从 Ouroboros（CRYPTO 2017）才开始。
- DPoS（2014，Larimer）把 PoS 改成代议制：21~101 个代表轮流出块，吞吐上去了，互投联盟与选票交易的担忧也上去了。
- BFT 在公链上的复兴由 Tendermint（2014）打响，它是第一个把质押与 BFT 投票焊成完整引擎的方案；HotStuff（2018）用流水线+签名聚合把通信复杂度从 O(n²) 压到 O(n)，被视为第三代 BFT。
- 混合共识（Decred 的 PoW 出块+PoS 选票）没成主流，但论证了一个存活至今的想法：出块权与最终性可以由不同资源分别决定。Polkadot（BABE+GRANDPA）与以太坊（提案+FFG）是这个想法的精致版。

### 关键构件

- **VDF（可验证延迟函数，2018）**：算起来必须串行慢算、验起来极快，用来造不可预知、不可加速的随机时钟。Chia 用它定序，以太坊 RANDAO+VDF 用它抗研磨。
- **VRF（可验证随机函数）**：秘密抽签，被抽中之前没人知道你是候选人。Algorand 用它抗选择性作恶，Cardano 用它选主。
- **QC（法定人数证书）**：HotStuff 系把 2f+1 张签名聚合成一个可验证对象，投票从此可以「一票多用」（链式流水线）。长安链 MaxBFT、蚂蚁链、DiemBFT/AptosBFT 都是这个思路。
- **阈值签名与共享随机币**：异步 BFT（HoneyBadgerBFT、Dumbo）的门票，让协议摆脱对超时的依赖。
- **罚没（slashing）**：PoS 的经济安全核心，双签与环绕投票被证据化惩罚；配套的弱主观性（新节点必须从近期可信状态同步）是 PoS 逃不掉的代价。

## 权威论文与白皮书

按年代排，出处列给出对应主题页。

| 论文/白皮书 | 作者与年份 | 对应知识点 | 站内出处 |
| --- | --- | --- | --- |
| 《The Byzantine Generals Problem》 | Lamport、Shostak、Pease，1982 | BFT 问题定义与 n≥3f+1 | [BFT](/consensus/BFT) |
| 《Impossibility of Distributed Consensus with One Faulty Process》（FLP） | Fischer、Lynch、Paterson，1985 | 异步共识的不可能边界 | [ABFT](/consensus/ABFT) |
| 《Consensus in the Presence of Partial Synchrony》 | Dwork、Lynch、Stockmeyer，1988 | 部分同步模型，PBFT 的假设基础 | [PBFT](/consensus/PBFT) |
| 《Practical Byzantine Fault Tolerance》 | Castro、Liskov，OSDI'99 | 三阶段投票、视图切换、检查点 | [PBFT](/consensus/PBFT) |
| 《Pricing via Processing》 | Dwork、Naor，1992 | PoW 概念源头（反垃圾） | [PoW](/consensus/POW) |
| 《Hashcash》 | Adam Back，1997 | 哈希预算工程化 | [PoW](/consensus/POW) |
| 《Bitcoin: A Peer-to-Peer Electronic Cash System》 | 中本聪，2008 | 中本聪共识、最长链、难度调整 | [PoW](/consensus/POW)、[比特币](/chains/Bitcoin) |
| 《PPCoin: Peer-to-Peer Crypto-Currency with Proof-of-Stake》 | King、Nadal，2012-08-19 | PoS 起点、币龄、混合形态 | [PoS](/consensus/POS) |
| 《Delegated Proof of Stake》（BitShares 白皮书） | Larimer，2014 | DPoS 代议制、代表问责 | [DPoS](/consensus/DPOS) |
| 《Tendermint: Consensus without Mining》 | Jae Kwon，2014 | 质押+BFT、锁定规则、ABCI | [Tendermint](/consensus/Tendermint) |
| 《The Ripple Protocol Consensus Algorithm》 | Schwartz、Youngs、Britto，2014 | UNL 式共识 | [FBA](/consensus/FBA) |
| 《The Stellar Consensus Protocol》 | Mazières，2015 | 仲裁切片、联邦化准入 | [FBA](/consensus/FBA) |
| 《The Honey Badger of BFT Protocols》 | Miller 等，CCS'16 | 异步原子广播、阈值加密 | [HoneyBadgerBFT](/consensus/HoneyBadgerBFT) |
| 《Ouroboros: A Provably Secure Proof-of-Stake Blockchain Protocol》 | Kiayias 等，CRYPTO 2017 | 首个严格证明 PoS、epoch/slot、VRF | [PoS](/consensus/POS)、[卡尔达诺](/chains/Cardano) |
| 《Casper the Friendly Finality Gadget》 | Buterin、Griffith，2017 | 最终性 gadget、PoW→PoS 过渡 | [PoS](/consensus/POS) |
| 《HotStuff: BFT Consensus with Linearity and Responsiveness》 | Yin、Malkhi 等，CCS'19 | 链式流水线、QC、线性视图切换 | [MaxBFT](/consensus/MaxBFT) |
| 《Scalable and Probabilistic Leaderless BFT Consensus through Metastability》（Avalanche 白皮书） | Team Rocket，2018 | 亚采样、元稳定、无领导共识 | [Snowball](/consensus/Snowball)、[Avalanche](/consensus/Avalanche) |
| 《A Survey of Two Verifiable Delay Functions》 | Boneh、Bünz、Fisch，2018 | VDF 构造（重复平方+增量证明） | [PoT](/consensus/POT) |
| 《Proofs of Space》 | Dziembowski 等，CRYPTO 2015 | 空间证明的形式化 | [PoSpace](/consensus/PoSpace) |
| 《Solana: A new architecture for a high performance blockchain》 | Yakovenko，2017 | PoH 全局时钟、leader 排序 | [PoH](/consensus/PoH) |
| 《Filecoin: A Decentralized Storage Network》 | Protocol Labs，2017 | PoRep/PoSt、存储即共识 | [PoST](/consensus/PoST) |
| 《Polkadot: Vision for a Heterogeneous Multi-Chain Framework》 | Wood，2016 草案 | NPoS、BABE+GRANDPA 分工 | [PoS](/consensus/POS)、[波卡](/chains/Polkadot) |
| 《ALGORAND: The Efficient and Democratic Ledger》 | Micali，arXiv 2016 | BA⋆、秘密抽签 | [PoS](/consensus/POS) |
| 《In Search of an Understandable Consensus Algorithm》（RAFT） | Ongaro、Ousterhout，USENIX ATC 2014 | 领导选举、日志复制、选举约束 | [RAFT](/consensus/RAFT) |

## 官方文档

查实现细节与最新参数时以这些为准；协议论文与工程实现常有出入，工程口径优先。

| 文档 | 覆盖内容 | 站内出处 |
| --- | --- | --- |
| [ethereum.org 共识机制](https://ethereum.org/en/developers/docs/consensus-mechanisms/poa/) | Gasper、PoA 口径 | [PoA](/consensus/POA)、[PoS](/consensus/POS) |
| [长安链共识算法](https://docs.chainmaker.org.cn/tech/%E5%85%B1%E8%AF%86%E7%AE%97%E6%B3%95.html) | TBFT/MaxBFT/Raft/Solo 可插拔 | [TBFT](/consensus/TBFT)、[MaxBFT](/consensus/MaxBFT) |
| Hyperledger Fabric 文档 | Raft ordering、SmartBFT（3.x） | [RAFT](/consensus/RAFT)、[PBFT](/consensus/PBFT) |
| [CometBFT 文档](https://docs.cometbft.com/) | Tendermint 协议现状与参数 | [Tendermint](/consensus/Tendermint) |
| Aptos、Sui 官方文档 | AptosBFT、Narwhal/Mysticeti | [MaxBFT](/consensus/MaxBFT)（同源 HotStuff） |
| Chia 官方文档 | PoSpace+PoT 工程细节 | [PoSpace](/consensus/PoSpace)、[PoT](/consensus/POT) |
| Decred 文档 | 混合共识（PoW 出块+PoS 选票） | [PoS](/consensus/POS) |
| Gnosis Chain 文档 | POSDAO（xDai 侧链转 PoS） | [PoA](/consensus/POA) |

## 应用场景

- **无许可公链**：抗女巫机制是入场券，要么算力（PoW），要么质押（PoS）。概率最终性换开放准入（比特币），或 PoS+BFT 换快确认（以太坊系、Cosmos 系）。选型时先问节点能不能匿名加入。
- **联盟链/许可链**：身份已知，直接上 PBFT/HotStuff 系换确定性最终性与高吞吐；互信程度高但只要防宕机，用 RAFT（Fabric 排序层）；单机构试点用 SOLO 起步再升级。
- **测试网与侧链**：PoA 的主场，验证人身份可追责、零燃料成本、出块快。Kovan/Rinkeby 起的头，BNB Smart Chain 的 Parlia 加上质押演化为 PoSA。
- **存储与环保叙事**：PoC/PoSpace 用硬盘抽签（Burstcoin、Chia），PoSt 把「持续持有」也计入（Filecoin、Spacemesh）。注意绿色成色要打折：绘图写入量与硬盘军备竞赛都是真实成本。
- **时间敏感场景**：需要不可预知随机数的（出块抽签、leader 选举）用 VDF/VRF 抗研磨；需要全局时钟的（高吞吐排序）用 PoH 式时间层。
- **异步网络**：节点分布在跨洲网络、延迟无上界时，异步 BFT（HoneyBadger、Dumbo）是理论正确答案，代价是密码学构件的计算开销，生产落地仍少。

## 常见坑

- **51% 攻击**（PoW）：重组已确认交易的门槛是「持续产出更重的链」，矿池集中让这条线离现实不远；见[大算力攻击](/hacking/51Attack)。
- **Nothing-at-Stake**（PoS）：复制签名零成本，验证人会在所有分叉上同时投票。没有罚没规则的 PoS 等于没有安全。
- **Long Range Attack**（PoS）：旧密钥从创世区块重造替代链。检查点与弱主观性是标配解法，见[长程攻击](/hacking/LongRangeAttack)。
- **Grinding（研磨）**：验证人尝试多个分叉挑最有利的。VDF 锁定未来挑战、VRF 秘密抽签都是堵这个洞。
- **女巫攻击**：任何「一人一票」的共识都会被批量造身份打穿，票必须按算力/质押/身份加权，见[女巫攻击](/hacking/SybilAttack)。
- **TEE 信任根**：PoET 的安全寄在 Intel SGX 上，SGX 自 2017 年起被多次侧信道攻破，「等了多久」可以伪造，这类设计要当作教学案例看。
- **治理攻击**（DPoS）：低投票率下的互投联盟与选票交易，技术手段防不住，只能靠持续问责与声誉。
- **「HDPoS」「APoS」一类交易所标签**：查无官方定义（HyperCash 白皮书写的是 PoW+PoS 混合，Solana 官方口径是 PoS+PoH+TowerBFT），引述前先回白皮书核对，见[演进时间线的来源未考一节](/consensus-timeline#来源未考)。
