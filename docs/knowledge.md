---
title: 知识点总纲
---

# 知识点总纲

> 本页把散在各主题页的知识点收拢成一页：核心概念、依据的论文与白皮书、官方文档、应用场景、常见坑。每条注明来源并链接回原文；查无实据的条目标「来源未考」。演进脉络的完整版本在[共识算法演进时间线](/consensus-timeline)。已收拢六个主题：共识算法、记账模型（含数据结构与脚本）、隐私安全、攻防、NFT 与资产发行、有名的公链。

## 核心概念

### 安全模型

- 共识要同时保住两件事：**一致性**（诚实节点认同一份账）与**活性**（新交易能持续上账）。FLP 不可能定理（1985）证明纯异步+确定性系统两者不可兼得，出路只有两条：引入超时假设（部分同步，PBFT 路线）或引入随机（HoneyBadger、Avalanche 路线）。
- 拜占庭环境下容忍 f 个作恶节点需要 **n ≥ 3f+1**（1982 年拜占庭将军问题论文的结论）；只容忍宕机的 CFT（RAFT）需要 2f+1。这个差价决定了联盟链在信任模型上选 RAFT 还是 BFT。
- BFT 投票权重的黄金线：作恶 < 1/3 安全且活，1/3~2/3 之间安全但可能停摆，> 2/3 可伪造最终状态。Avalanche 是例外，它的概率安全阈值是 1/2。
- **最终性分两种**：概率性（PoW+最长链，确认数越多越难回滚）与确定性（BFT 投票 +2/3 即不可逆）。以太坊 Merge 之后，主流公链基本走向了「PoS 选人 + BFT 定最终性」。

### 演进逻辑

- 每代共识换的不是投票方式，而是**记账资源**：算力（PoW）→ 代币（PoS）→ 声誉（PoA）→ 硬盘（PoSpace）→ 时间（[PoET](/consensus/PoET)、VDF）。投票协议本身（BFT）反而是最老的部分，1982 年就有理论，1999 年就能落地。
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
- **联盟链/许可链**：身份已知，直接上 PBFT/HotStuff 系换确定性最终性与高吞吐；互信程度高但只要防宕机，用 RAFT（Fabric 排序层）；单机构试点用 [SOLO](/consensus/SOLO) 起步再升级。
- **测试网与侧链**：PoA 的主场，验证人身份可追责、零燃料成本、出块快。Kovan/Rinkeby 起的头，BNB Smart Chain 的 Parlia 加上质押演化为 PoSA。
- **存储与环保叙事**：[PoC](/consensus/POC)/[PoSpace](/consensus/PoSpace) 用硬盘抽签（Burstcoin、Chia），PoSt 把「持续持有」也计入（Filecoin、Spacemesh）。注意绿色成色要打折：绘图写入量与硬盘军备竞赛都是真实成本。
- **时间敏感场景**：需要不可预知随机数的（出块抽签、leader 选举）用 VDF/VRF 抗研磨；需要全局时钟的（高吞吐排序）用 PoH 式时间层。
- **异步网络**：节点分布在跨洲网络、延迟无上界时，异步 BFT（HoneyBadger、Dumbo）是理论正确答案，代价是密码学构件的计算开销，生产落地仍少。

## 常见坑

- **51% 攻击**（PoW）：重组已确认交易的门槛是「持续产出更重的链」，矿池集中让这条线离现实不远；见[大算力攻击](/hacking/51Attack)。
- **Nothing-at-Stake**（PoS）：复制签名零成本，验证人会在所有分叉上同时投票。没有罚没规则的 PoS 等于没有安全。
- **Long Range Attack**（PoS）：旧密钥从创世区块重造替代链。检查点与弱主观性是标配解法，见[长程攻击](/hacking/LongRangeAttack)。
- **Grinding（研磨）**：验证人尝试多个分叉挑最有利的。VDF 锁定未来挑战、VRF 秘密抽签都是堵这个洞。
- **女巫攻击**：任何「一人一票」的共识都会被批量造身份打穿，票必须按算力/质押/身份加权，见[女巫攻击](/hacking/SybilAttack)。
- **TEE 信任根**：[PoET](/consensus/PoET) 的安全寄在 Intel SGX 上，SGX 自 2017 年起被多次侧信道攻破，「等了多久」可以伪造，这类设计要当作教学案例看。
- **治理攻击**（DPoS）：低投票率下的互投联盟与选票交易，技术手段防不住，只能靠持续问责与声誉。
- **「HDPoS」「APoS」一类交易所标签**：查无官方定义（HyperCash 白皮书写的是 PoW+PoS 混合，Solana 官方口径是 PoS+[PoH](/consensus/PoH)+[TowerBFT](/consensus/TowerBFT)），引述前先回白皮书核对，见[演进时间线的来源未考一节](/consensus-timeline#来源未考)。

## 主题：记账模型（含数据结构与脚本）

### 核心概念

- 记账模型二选一起步：**UTXO**（一笔钱一个来源一个去向，余额=未花费输出之和，见[UTXO 模型](/model/UTXO)）与**账户**（一地址一余额一状态，见[账户模型](/model/Account)）。UTXO 天然可并行验证、交易图可分析；账户模型是智能合约的地基，状态由全局树集中管理。
- **[Merkle 树](/algo/MerkleTree)**把整块交易压缩成区块头里 32 字节的根：改任何一笔交易根值就变；轻节点用约 log₂(N) 个哈希的 Merkle 路径证明「某笔交易在块里」，无需下载整块。
- 比特币 Script 是**栈式、非图灵完备、无循环**的验证语言：[OP_CHECKSIG](/opcode/OP_CHECKSIG) 是所有标准支付方式（P2PK、P2PKH、P2SH、P2WPKH、P2TR）的共同底座，验证失败即交易无效。
- **[DAG](/model/DAG)** 把「链」换成「图」：新交易确认旧交易，确认与出块并行，换取吞吐与低费用，IOTA Tangle 是典型；共识侧的 DAG 内存池（Narwhal 系）是同一思路在排序层的应用。

### 演进逻辑

- 哈希链、签名、Merkle 树这些零件 1997 年前就齐了，中本聪的贡献是用 UTXO+工作量证明+最长链把它们组装成能活的系统；账户模型是智能合约平台（以太坊系）为合约状态让路的选择。
- 比特币的协议演化走 **BIP 通道**：BIP-32 分层确定性钱包与 BIP-39 助记词管钥匙，BIP-141 SegWit 迁移见证数据，BIP-340 引入 Schnorr 签名，BIP-341/342 铺 Taproot。
- Cardano 的 **EUTXO**、Nervos 的 **Cell** 是混合形态：保留 UTXO 的并行与确定性，把脚本与数据挂到输出上换合约表达力。

### 官方文档

| 文档 | 覆盖内容 | 站内出处 |
| --- | --- | --- |
| [Bitcoin BIP 仓库](https://github.com/bitcoin/bips) | BIP-32/39/141/340/341/342 原文与状态追踪 | [BIP 改进提案](/btc/BIPS)、[P2PK 交易](/btc/P2PK) |

### 应用场景

- **高并发支付**：UTXO 无共享状态，互不相干的交易可并行验证；账户模型每笔交易都可能改全局状态，并发调度复杂。
- **可审计**：UTXO 交易图天然可追溯，审计友好——同一特性也是链上分析的盯梢入口。
- **智能合约平台**：需要图灵完备语义与全局状态，选账户模型，或 EUTXO/Cell 式混合。

### 常见坑

- **找零是隐私漏洞**：UTXO 交易的找零输出常被启发式识别，缩小追踪范围；[粉尘攻击](/hacking/DustingAttack)正是给找零挂标记。
- **状态爆炸**：UTXO 集合与账户状态树都只会增长不会收缩，费用市场只能延缓不能阻止；轻节点不背状态，全节点要背。
- **把 Script 当通用语言**：非图灵完备是设计选择——无循环、费用可静态估算；要循环就上 Layer 2 或换平台。

## 主题：隐私安全

### 核心概念

- **零知识证明**：证明者让验证者相信命题为真，却不泄露命题之外的任何信息（见[零知识证明](/Privacy/ZeroKnowledgeProof)）。区块链落地以两类为主：zk-SNARK 证明极小、验证极快，部分方案需可信设置；zk-STARK 无需设置且抗量子，证明更大。
- **匿名集是一切隐私技术的度量衡**：环签名的混淆范围、混币池的参与人数、隐匿地址的关联难度，本质都是「藏进多人的池子」——池子越小越可穿透。
- **[隐匿地址](/Privacy/StealthAddresses)**：每次收款生成一次性地址，外部观察者无法把多笔收款归并到同一接收者；门罗把它与环签名、金额隐藏组合才凑出全链路隐私。
- **[同态加密](/Privacy/HomomorphicEncryption)**：密文上直接计算、解密即结果。Paillier（1999）只做加法同态，全同态（FHE）支持任意计算但开销高；与区块链结合点是密态合约与跨机构数据协作。
- **[差分隐私](/Privacy/DifferentialPrivacy)**：发布统计结果时注入 ε 参数控制的噪声，让「某个体是否在数据集里」不可判定；与 ZKP 组合可实现「可验证的隐私统计」。

### 演进逻辑

- 环签名 2001 年由 Rivest、Shamir、Tauman 提出；CryptoNote 白皮书（2012）把它与隐匿地址组合成隐私币模板，门罗（2014）是活到今天的主线。
- 金额隐私靠**承诺+范围证明**：2017 年门罗 RingCT 上线让金额隐藏落地；2018 年 [Bulletproofs](/Privacy/Bulletproofs) 把范围证明体积压掉一个数量级且无需可信设置，门罗当年启用后手续费骤降八成。
- zk-SNARK 的可信设置是落地障碍，「透明的」（无设置）STARK 与通用设置的 PLONK 系是后来的主线；[层级身份加密](/Privacy/HierarchicalIdentityBasedEncryption)（HIBE）则在联盟链密钥管理侧发展「一次初始化、逐级授权」。

### 权威论文与白皮书

| 论文 | 作者与年份 | 对应知识点 | 站内出处 |
| --- | --- | --- | --- |
| 《How to Leak a Secret》 | Rivest、Shamir、Tauman，2001 | 环签名原始定义 | [环签名](/Privacy/RingSignature) |
| Paillier 公钥加密系统 | Pascal Paillier，1999 | 加法同态 | [Paillier](/Privacy/Paillier) |
| 《Bulletproofs: Short Proofs for Confidential Transactions and More》 | Bünz、Bootle、Boneh、Poelstra、Wuille、Maxwell，2018 | 范围证明、无设置 ZKP | [Bulletproofs](/Privacy/Bulletproofs)、[门罗](/chains/Monero) |

### 官方文档

| 文档 | 覆盖内容 | 站内出处 |
| --- | --- | --- |
| [Monero 研究实验室论文页](https://www.getmonero.org/resources/research-lab/) | CryptoNote、RingCT、门罗隐私组件原始文献 | [隐私技术总览](/Privacy/Privacy)、[门罗](/chains/Monero) |

### 应用场景

- **保密支付**：金额、发送方、接收方三隐藏（门罗、Zcash shielded 交易）。
- **合规审计**：隐私币的合规路径是给审计员钥匙不是给全网明文——门罗 view key、Zcash viewing key 都支持单向审计。
- **密态计算**：跨机构数据协作，[同态加密](/Privacy/HomomorphicEncryption)保证「数据可用不可见」；[混币服务](/Privacy/MixingServices)适合个人链上痕迹打断。

### 常见坑

- **隐私是栈不是开关**：只隐地址不管金额明文，链上分析照样聚类；环签名+隐匿地址+金额隐藏三层齐备才算隐私币。
- **托管式混币是中心化信任**：可卷款、可记黑账；非托管 CoinJoin 也有 coordinator 被传唤的风险。
- **地址重用是隐私死穴**：一次重用就把所有历史交易串起来，隐匿地址也救不回已暴露的关联。
- **可信设置的 toxic waste**：需初始仪式的 zk-SNARK 若仪式被作恶，可伪造证明——选无设置方案，或核验仪式多方参与记录。

## 主题：黑客攻击

### 核心概念

- 攻击面分四层：**网络层**（[女巫攻击](/hacking/SybilAttack)、日蚀攻击——把你的节点围进假网络）、**共识层**（[51% 攻击](/hacking/51Attack)、[自私挖矿](/hacking/SelfishMiningAttack)、[长程攻击](/hacking/LongRangeAttack)、[共识分叉攻击](/hacking/ConsensusForkAttack)）、**应用层**（[智能合约漏洞](/hacking/SmartContractVulnerabilities)、[跨链桥攻击](/hacking/CrossChainBridgeAttack)、[闪电网络攻击](/hacking/LightningNetworkAttack)）、**用户层**（[粉尘攻击](/hacking/DustingAttack)、[信息泄露](/hacking/InformationLeakageAttack)——打人比打协议便宜）。
- **51% 的本钱是钱不是技术**：攻击成本≈租算力的市场价+攻击后链价崩塌的自身损失；小算力链的攻击成本可能低于一次合约漏洞的收益，纯粹是经济账。
- **[长程攻击](/hacking/LongRangeAttack)打的是 PoS 的历史**：旧密钥从创世重造替代链，新节点无从分辨；检查点与弱主观性是标配解法。
- **桥是价值锁定的单点**：锁定资产由一组验证人/多签托管，验证人集合的安全≈桥的安全，见[跨链桥攻击](/hacking/CrossChainBridgeAttack)。
- **交易拒绝服务**：注入大量低价值交易挤占打包空间，拖慢全网确认，见[交易 DoS 攻击](/hacking/TransactionDoSAttack)。

### 演进逻辑

- 2002 年 Douceur 证明无许可网络必有女巫问题——开放网络防御的第一性约束；2013 年 Eyal-Sirer 形式化自私挖矿，共识层从「算力经济」进入博弈论攻防。
- PoS 普及后长程攻击、研磨攻击成为新面（对应共识侧的 VDF/VRF 解法，见[共识算法演进时间线](/consensus-timeline)）。
- DeFi 与桥时代，主战场从协议层搬到应用层：预言机操纵、重入、闪电贷放大；闪电网络开辟通道余额证明与 watchtower 缺位的状态勒索面。

### 权威论文与白皮书

| 论文 | 作者与年份 | 对应知识点 | 站内出处 |
| --- | --- | --- | --- |
| 《The Sybil Attack》 | Douceur，2002 | 开放网络女巫问题下限 | [女巫攻击](/hacking/SybilAttack) |
| 《Majority is not Enough: Bitcoin Mining is Vulnerable》 | Eyal、Sirer，2013 | 自私挖矿收益模型 | [自私挖矿攻击](/hacking/SelfishMiningAttack) |

### 应用场景

- **上链前检查单**：女巫成本核算（算力租用价/质押集中度）、桥验证人集合审计、合约审计+赏金计划、预言机多源。
- **运行期监控**：算力/质押集中度告警、重组钩子、异常大额桥转移熔断。

### 常见坑

- **确认数不是免死金牌**：六确认挡住绝大多数重组，但小算力链六个确认照样可被逆转——确认阈值按链的攻击成本折算，见[大算力攻击](/hacking/51Attack)。
- **Finney 攻击是预付款陷阱**：矿工预挖区块，等你接受「零确认支付」发货后释放双花链，见[Finney 攻击](/hacking/FinneyAttack)与[双重花费攻击](/hacking/DoubleSpendAttack)。
- **粉尘不是钱是标记**：尘额 UTXO 本身没有价值，标记价值拉满——收了就等于同意被追踪。
- **「代码即法律」不设防**：重入、整数溢出、预言机操纵都是部署后才爆的雷；审计+赏金+升级开关是三件套，见[智能合约漏洞攻击](/hacking/SmartContractVulnerabilities)。

## 主题：NFT 与资产发行

### 核心概念

- NFT 的本质是「让一枚代币不可替代」：同质化代币只记数量，NFT 给每个代币挂唯一 ID 与元数据（名称、内容指针、所有权历史）。
- 比特币路线是「给聪着色」：[彩色币](/nft/ColoredCoins)把链外资产映射到特定聪；[OAP](/nft/OAP)（2013）用 OP_RETURN 字段存元数据；[Tokenized Protocol](/nft/TokenizedProtocol) 把资产定义、权限与生命周期操作协议化。
- 以太坊路线是「标准化」：ERC-721（2018 定稿）定义非同质化代币接口，ERC-1155（2019 定稿）把同质化与非同质化统一成半同质化，NFT 从收藏实验变成行业标准。
- 比特币的回归路线是「铭文」：Ordinals（2023）把内容直接刻进聪的见证数据，不依赖协议层信任，BRC-20 随之把同质化代币也塞回聪。

### 官方文档

| 文档 | 覆盖内容 | 站内出处 |
| --- | --- | --- |
| [EIP-721](https://eips.ethereum.org/EIPS/eip-721) | 非同质化代币标准接口 | [代币化协议](/nft/TokenizedProtocol) |
| [EIP-1155](https://eips.ethereum.org/EIPS/eip-1155) | 多代币（半同质化）标准 | [代币化协议](/nft/TokenizedProtocol) |
| [Ordinals 手册](https://docs.ordinals.com/) | 铭文与聪编号规则 | [彩色币](/nft/ColoredCoins) |

### 应用场景

- **数字收藏与游戏资产**：唯一性+可验证所有权，二级市场版税靠标准里的接口约定。
- **票务与凭证**：防伪与可转移，一票一 ID。
- **RWA（现实世界资产）**：链下资产上链映射，考验的是链下法律效力不是链上技术。

### 常见坑

- **元数据链下不等于永久**：IPFS 未 pin 或 HTTP 链接失效，NFT 就只剩链上一个哈希，见[彩色币](/nft/ColoredCoins)的存储讨论。
- **买 NFT ≠ 买版权**：通常买到的是 token 与转移权，著作权除非明确授予。
- **索引分歧**：比特币 NFT 依赖链下索引器，「这枚聪算哪个 NFT」可能因索引器实现而不同。
- **洗售与抢跑**：自买自卖刷成交价、mint 阶段机器人抢跑，都是流动性伪装，不是价值信号。

## 主题：有名的公链

### 核心概念

- 公链按共识分族：PoW 系（[比特币](/chains/Bitcoin)、[莱特币](/chains/Litecoin)、[门罗](/chains/Monero)）、PoS 系（[以太坊](/chains/Ethereum) Gasper、[卡尔达诺](/chains/Cardano) Ouroboros）、DPoS 系（[EOS](/chains/EOS) 21 BP、TRON 27 超级代表）、BFT 系（[Cosmos](/chains/Cosmos) Tendermint、Aptos HotStuff 系）、异构（[波卡](/chains/Polkadot) NPoS 分工、[恒星](/chains/Stellar) SCP/FBA、[Chia](/chains/Chia) PoSpace+PoT、TON Catchain）。
- **稳定币不是链**：[Tether](/chains/Tether) 是发行在多条链上的资产（Omni、ERC-20、TRC-20），发行方、资产、承载轨道三层要分清。
- **EVM 兼容 ≠ 共识相同**：BSC 用 PoSA（21 验证人）不是以太坊的 Gasper；TRON 的 TVM 字节码级兼容 EVM，共识却是 DPoS——虚拟机与共识是两个独立维度。
- 谁在用什么共识变体，35 行主链映射见[共识算法演进时间线](/consensus-timeline)。

### 演进逻辑

- 2009 比特币开机 → 2011-2014 山寨与隐私分化（莱特币换 Scrypt、门罗走向环签名）→ 2015 以太坊开出智能合约平台范式 → 2017-2019 DPoS 高吞吐与联盟链并行 → 2020 之后分片、模块化与 DAG（波卡、Near、Sui）。
- 链的归属看谁在维护客户端，不看当初谁宣布：TON 被 Telegram 放弃后由社区接续，主网 2021 年才上线（见[TON](/chains/TON)）。

### 应用场景

- **价值储存与支付**：比特币、莱特币；隐私支付找[门罗](/chains/Monero)。
- **智能合约生态**：以太坊、BSC、Solana、TON（Telegram 分发入口）。
- **跨链枢纽**：[波卡](/chains/Polkadot)与[Cosmos](/chains/Cosmos)两条技术路线，共享安全与 IBC 自治各执一端。
- **存储与环保叙事**：[Chia](/chains/Chia)、Filecoin。

### 常见坑

- **把营销 TPS 当真实吞吐**：白皮书数字多是理论极限或理想网络环境，与主网实测差一个数量级是常态。
- **把「链」当「资产」**：USDT 是资产、Tether 是发行方、Tron 与 Ethereum 是轨道，混用会得出「Tether 转账免费」这类错误结论。
- **按市值排序理解技术**：链的技术代际与市值排序基本无关，共识选型回[演进时间线](/consensus-timeline)看脉络。
