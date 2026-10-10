---
title: 共识算法演进时间线
---

# 共识算法演进时间线

链上共识不是 2008 年发明的。把四十年分布式系统研究装进一个经济模型，才是比特币真正做成的事。这页按年份排列每个共识算法的出处与首个采用者，给每种算法一句话说清机制，并列出如今谁在用。单算法的细节在[共识算法目录](/consensus/Consensus)，整条区块链的历史在[发展史时间线](/timeline)。

## 演进主线：五个时期

| 时期 | 干了什么 | 代表 |
| --- | --- | --- |
| 1982–1998 学术奠基 | 定问题、划边界：拜占庭容错理论、FLP 不可能定理、Paxos、工作量证明概念 | 拜占庭将军、Paxos |
| 1997–2009 PoW 前史与比特币 | 反垃圾邮件的哈希预算被组装成货币 | Hashcash、比特币白皮书 |
| 2011–2017 概率共识实验 | 换掉算力：质押、代议、身份、容量都试了一遍 | PPCoin、DPoS、Ouroboros |
| 2014–2020 BFT 复兴 | 三十年的投票协议回到公链，概率最终性之外长出确定性最终性 | Tendermint、Casper、HotStuff |
| 2018–2024 新资源与新家族 | 时间（VDF）、硬盘（PoSpace）、异步网络、DAG 内存池成为新的记账户本 | Avalanche、Chia、Sui |

一条规律值得先记住：**每代共识换的不是「怎么投票」，而是「按什么资源记账」**——算力（PoW）、代币（PoS）、声誉（PoA）、硬盘（PoSpace）、时间（VDF）。投票协议本身（BFT）反而是最老的部分。

## 时间线总表

按年份排列。年份取论文/白皮书发表年，主网另注。「首个采用者」指第一个真实运转的链或系统，不是第一个论文引用。

| 年份 | 算法 / 事件 | 出处 | 首个采用者 |
| --- | --- | --- | --- |
| 1982 | 拜占庭将军问题 | Lamport、Shostak、Pease 论文 | 学术起点（见[BFT](/consensus/BFT)） |
| 1985 | FLP 不可能定理 | Fischer、Lynch、Paterson | 学术：纯异步+确定性共识无解，突破口只能是随机化或同步假设 |
| 1988 | 部分同步模型 | Dwork、Lynch、Stockmeyer | 学术：PBFT 的网络假设来自这里 |
| 1989 | Paxos | Lamport（PODC'89，1998 年完整版） | 学术→工业（Chubby）；区块链里被 RAFT 取代 |
| 1992 | PoW 概念 | Dwork、Naor《Pricing via Processing》 | 反垃圾邮件计价，与货币无关 |
| 1997 | Hashcash | Adam Back | 邮件贴票；哈希预算首次工程化 |
| 1998 | b-money / Bit Gold | Wei Dai / Nick Szabo | 设计稿，均未实现 |
| 1999 | [PBFT](/consensus/PBFT) | Castro、Liskov（OSDI'99） | BFT 文件系统；20 年后成为联盟链直系祖先 |
| 2004 | RPOW | Hal Finney | 可重用工作量证明服务 |
| 2008 | 中本聪共识（PoW+最长链） | [比特币白皮书](https://bitcoin.org/bitcoin.pdf) | Bitcoin（2009-01-03 创世，见[比特币](/chains/Bitcoin)） |
| 2011 | PoS 概念公开 | QuantumMechanic 在 Bitcointalk 发帖 | 无直接采用，[PoS](/consensus/POS) 的起点 |
| 2012 | PPCoin（Peercoin） | King、Nadal [白皮书](https://decred.org/research/king2012.pdf)（8 月 19 日） | Peercoin：首个 PoS 主网，PoW+PoS 混合 |
| 2012 | XRP Ledger 上线 | OpenCoin（Ripple） | 共识算法白皮书 2014 年补发（RPCA） |
| 2013 | Nxt | BCNext | 首个纯 PoS 主网（无 PoW 预挖） |
| 2014 | [Tendermint](/consensus/Tendermint) | Jae Kwon 白皮书 | Cosmos Hub（2019 主网） |
| 2014 | [DPoS](/consensus/DPOS) | Larimer，BitShares 白皮书 | BitShares（当年主网） |
| 2014 | [PoC](/consensus/POC) | Burstcoin | Burstcoin：首个容量证明主网 |
| 2014 | [RAFT](/consensus/RAFT) | Ongaro、Ousterhout（USENIX ATC） | etcd 等；入链是 Fabric 1.4.1（2019） |
| 2014 | RPCA 白皮书 | Schwartz、Youngs、Britto | XRP Ledger（已在运行） |
| 2015 | [FBA/SCP](/consensus/FBA) | Mazières 白皮书 | Stellar（见[恒星币](/chains/Stellar)） |
| 2016 | [PoET](/consensus/PoET) | Intel；Hyperledger Sawtooth | Sawtooth：TEE 抽签 |
| 2016 | [HoneyBadgerBFT](/consensus/HoneyBadgerBFT) | Miller 等（CCS'16） | POA Network 实验链，学术为主 |
| 2016 | PoW+PoS 混合出块 | Decred | Decred：PoW 出块、PoS 选票，主网 2016-02 |
| 2016 | Polkadot 白皮书 | Gavin Wood | Polkadot（2020 主网） |
| 2017 | Ouroboros | Kiayias 等（[CRYPTO 2017](https://eprint.iacr.org/2016/889)） | Cardano：首个有严格安全证明的 PoS，当年主网即用 |
| 2017 | Casper FFG | Buterin、Griffith（[arXiv:1710.09437](https://arxiv.org/abs/1710.09437)） | Ethereum Merge（2022） |
| 2017 | PoA 命名与首用 | Gavin Wood | Kovan 测试网（Aura）；Rinkeby（Clique），见[PoA](/consensus/POA) |
| 2017 | [PoH](/consensus/PoH) | Yakovenko 白皮书 | Solana（2020 主网） |
| 2017 | EOS.IO 白皮书 | Larimer | EOS（2018-06 主网，DPoS+BFT 不可逆） |
| 2017 | Filecoin 白皮书 | Protocol Labs | Filecoin（2020-10 主网，PoRep+PoSt） |
| 2017 | HyperCash 主网 | Hcash 团队 | PoW+PoS 混合；交易所常标「HDPoS」，见下文来源未考 |
| 2018 | [HotStuff](/consensus/MaxBFT) | Yin、Malkhi 等（[arXiv:1803.05069](https://arxiv.org/abs/1803.05069)，CCS'19） | DiemBFT（Libra，2019）；血脉到 Aptos |
| 2018 | VDF | Boneh、Bünz、Fisch | Chia 的 [PoT](/consensus/POT)（2021） |
| 2018 | Avalanche 白皮书 | Team Rocket（Ava Labs 收录） | Avalanche（2020 主网，见[Avalanche](/consensus/Avalanche)） |
| 2018 | TRON / EOS 主网 | — | DPoS 集中落地年：27 超级代表 / 21 超级节点 |
| 2019 | Gasper 规格化 | 以太坊研究团队（FFG+LMD GHOST） | Beacon Chain（2020-12-01）→Merge |
| 2019 | DiemBFT | Libra/Diem 团队 | HotStuff 首次工程化上线 |
| 2019 | Dumbo 系列论文 | 国内异步共识团队 | 联盟链研究采用，见[ABFT](/consensus/ABFT) |
| 2019 | Cosmos Hub、Algorand 主网 | — | Tendermint 与 BA⋆（VRF 抽签 PoS）上岗 |
| 2020 | 主网井喷 | — | Solana（3 月）、Near（4 月）、Polkadot（5 月）、BSC（9 月）、Avalanche（9 月）、Filecoin（10 月） |
| 2020 | Beacon Chain 上线 | 以太坊 | 32 ETH/验证人、罚没制度实跑 |
| 2021 | Chia 主网（3 月 19 日） | Chia Network | PoSpace+VDF 首次大规模落地，见[Chia](/chains/Chia) |
| 2021 | 长安链开源 | 北京微芯研究院 | [TBFT](/consensus/TBFT)、[MaxBFT](/consensus/MaxBFT)、RAFT、SOLO 可插拔 |
| 2021 | TON 主网（5 月） | TON Foundation（社区接续） | Catchain BFT+PoS，主链+工作链原生分片，见 [TON](/chains/TON) |
| 2022 | Ethereum Merge（9 月 15 日） | 以太坊 | PoW 退役，[Gasper](/consensus/POS) 上岗，能耗降约 99.95% |
| 2022 | Aptos 主网 | Aptos Labs | AptosBFT（DiemBFT v4/Jolteon 系） |
| 2023 | Sui 主网（5 月） | Mysten Labs | Narwhal+Bullshark：DAG 内存池与共识解耦 |
| 2023 | Spacemesh 主网 | Spacemesh | [PoST](/consensus/PoST)（时空证明）首个生产实现 |
| 2024 | Mysticeti | Sui 团队论文 | 无证书（uncertified）DAG-BFT，延迟再降一轮 |

约四十年，49 个节点。密集处（2014、2017、2020）读出的是同一批问题被反复重问：不用算力，按什么记账、按什么投票。

## 逐族详解

### PoW：中本聪共识

**一句话机制**：全网比谁先算出低于难度目标的哈希，谁算出谁出块，最长（最重）链为准。

优点是无许可、久经验证（比特币主网 2009 年至今未被成功重组）；缺点是能耗大、确认慢（比特币 6 确认约 1 小时）、矿池与 ASIC 造成算力集中。在用与分叉：

- Bitcoin（SHA-256d，见[比特币](/chains/Bitcoin)）；分叉链 Bitcoin Cash、BSV 同为 SHA-256d。
- Litecoin（Scrypt，见[莱特币](/chains/Litecoin)）；Dogecoin（Scrypt，2014 年起与 Litecoin 合并挖矿 AuxPoW）。
- Monero（RandomX，抗 ASIC，见[门罗币](/chains/Monero)）。
- Bytom 曾用 Tensority（兼容通用计算），见[比原链](/chains/Bytom)。

来源：[比特币白皮书](https://bitcoin.org/bitcoin.pdf)（2008）。

### PoS 早期与混合形态

**一句话机制**：锁币当保证金，按质押权重选出块人，作恶罚没。

Peercoin 开的头，但它是 PoW+PoS 混合：初期靠 PoW 分币，PoS 逐步接管安全。此后两支分化：追求「纯 PoS」的一支（Nxt、Blackcoin）去掉算力，用纯代币抽签；保留双保险的一支把 PoW 与 PoS 拼在一块链上。

- Peercoin（2012，PoW+PoS 混合，首个 PoS 主网）。
- Nxt（2013，纯 PoS）；Blackcoin（2014，纯 PoS）。
- Decred（2016，PoW 出块 + PoS 选票，双轨制，混合派的完整形态）。
- HyperCash（2017，PoW+PoS 混合，交易所标注「HDPoS」，见来源未考）。

混合派没有成为主流，但它论证了一个重要问题：出块权与最终性可以分开由两种资源决定。这个想法后来在 Polkadot（BABE 出块+GRANDPA 最终性）和以太坊（提案+FFG 最终性）身上以更精致的形式实现。

来源：[PPCoin 白皮书](https://decred.org/research/king2012.pdf)（2012）。

### 有严格安全证明的 PoS

**一句话机制**：把「诚实多数下攻击者成功概率可忽略」写成可证明的数学，再以此设计抽签。

- Cardano：Ouroboros 系列（Classic→Praos→Genesis），epoch/slot 制，VRF 选主，主网 2017 年上线即用（见[卡尔达诺](/chains/Cardano)）。
- Algorand：Micali 的 BA⋆ 协议，VRF 秘密抽签，被抽中前没人知道自己是候选人，抗选择性作恶，主网 2019。

来源：[Ouroboros（ePrint 2016/889）](https://eprint.iacr.org/2016/889)；Micali《ALGORAND》（arXiv:1607.01341）。

### DPoS：代议制

**一句话机制**：持币人选出固定数量的代表（21~101 个），代表轮流出块。

吞吐上去了，中心化担忧也跟着上去了：低投票率下容易形成互投联盟，选票交易难以防范。

- BitShares（2014，Larimer 的首个 DPoS 实现）。
- EOS（2018，21 个 Block Producer，DPoS+BFT 式不可逆，见[EOS](/chains/EOS)）。
- TRON（2018，27 个超级代表，见 [TRON](/chains/TRON)）。
- Lisk、Ark 等 DPoS 变体（101 代表/51 代表）。

来源：BitShares DPoS 白皮书（Larimer，2014）。

### PoA 与 PoSA：身份记账

**一句话机制**：出块资格来自身份授权（声誉或法人实体），不来自算力或代币；加了质押的叫 PoSA。

Kovan（Aura）、Rinkeby（Clique）这两个以太坊测试网是首次落地，随后溢出到侧链与联盟链：

- POA Network、Gnosis Chain（原 xDai，AuRA 起家，后转 POSDAO 质押 PoS）。
- BNB Smart Chain：Parlia = PoA+质押（PoSA），21 个验证人（见[BSC](/chains/BinanceSmartChain)）。
- Hyperledger Besu 企业的 Clique/QBFT。
- 以太坊测试网 Sepolia、Holesky 系 PoA 后继。

纯 PoA 是中心化程度最高的共识，公链上不成立，但在测试网、侧链、联盟链三处长期站得住。来源：[Gavin Wood 2017 年命名](https://en.wikipedia.org/wiki/Proof_of_authority)、[ethereum.org PoA 文档](https://ethereum.org/en/developers/docs/consensus-mechanisms/poa/)。

### PBFT 与许可链 BFT

**一句话机制**：已知身份的节点对每个请求走 Pre-prepare→Prepare→Commit 三轮投票，+2/3 票即确定性最终。

PBFT 的 O(n²) 通信限制节点规模在百级，这决定了它只在许可环境里当主角：

- Hyperledger Fabric：0.6 期 PBFT，1.4.1（2019）改 etcd-Raft 排序，3.x 起 SmartBFT。
- FISCO BCOS（2017，PBFT 变体）；蚂蚁链（HotStuff 系，见来源未考）。
- 长安链 [TBFT](/consensus/TBFT)（Tendermint 同源）与 [MaxBFT](/consensus/MaxBFT)（链式 HotStuff）。
- Zilliqa（2019，公链例外：PoW 分片内跑 pBFT，算力入网、投票出块）。
- Quorum/Besu 的 IBFT、IBFT 2.0（以太坊系联盟链）。

来源：[PBFT 论文（OSDI'99）存档](https://web.archive.org/web/2020/http://pmg.csail.mit.edu/papers/osdi99.pdf)。

### HotStuff 系：三阶段协议的线性化

**一句话机制**：把 PBFT 三轮投票摊到连续区块上流水执行，签名聚合成 QC（法定人数证书），视图切换从专用子协议变成「换个 leader」这件常事。

通信从 O(n²) 降到 O(n)，这是它配得上「第三代 BFT」的原因。

- Libra/Diem：DiemBFT（2019），HotStuff 首次工程化；项目终止后团队与论文流向 Aptos。
- Aptos：AptosBFT（DiemBFT v4 + Jolteon/Ditto 改进），2022 主网。
- 长安链 MaxBFT：链式 HotStuff 的联盟链实现。
- Flow：HotStuff 变体（多角色流水线）。
- 蚂蚁链：公开资料称 HotStuff 系，原始论文未见（来源未考）。

来源：[HotStuff（arXiv:1803.05069）](https://arxiv.org/abs/1803.05069)；[长安链共识算法文档](https://docs.chainmaker.org.cn/tech/%E5%85%B1%E8%AF%86%E7%AE%97%E6%B3%95.html)。

### Tendermint 系：质押+BFT 的第一个完整引擎

**一句话机制**：每高度按投票权重选提议者，Prevote/Precommit 两轮锁定，+2/3 即时最终；超时换轮保证活性。

2014 年白皮书把「PoS 质押」和「BFT 投票」焊成一个可用的共识引擎，外加 ABCI 接口让任意语言写应用，Cosmos 生态由此长出：

- Cosmos Hub（2019 主网，见[Cosmos](/chains/Cosmos)）；同构链 Osmosis、Kava、IRISnet、Crypto.org。
- BNB Beacon Chain（BSC 的治理链，已退役并入 BSC）。
- Terra Classic（2019；2022 年 5 月算法崩盘后停摆，作为 Tendermint 生态的风险样本保留在账上）。
- 2022 年后主实现更名为 CometBFT，协议常仍称 Tendermint BFT。

来源：Kwon《Tendermint: Consensus without Mining》（2014）、[CometBFT 文档](https://docs.cometbft.com/)。

### Avalanche 族：亚采样概率共识

**一句话机制**：不选 leader，每个节点反复随机问 20 个对端「这笔交易行不行」，多数意见就跟随，重复到收敛。

Slush→Snowflake→Snowball→Snowman 四步演进（见[Snowball](/consensus/Snowball)），安全阈值是 1/2 而非 BFT 的 1/3，换来万级节点下秒级概率最终性。在用：Avalanche 三链，X-Chain（DAG 形态）、P-Chain 与 C-Chain（Snowman 链式），见[Avalanche](/consensus/Avalanche)。

来源：Avalanche 白皮书《Scalable and Probabilistic Leaderless BFT Consensus through Metastability》（Team Rocket，2018；[Ava Labs](https://www.avalabs.org/) 收录）。

### 异步 BFT

**一句话机制**：不依赖任何超时假设，用阈值加密与共享随机币在纯异步网络里达成共识。

- HoneyBadgerBFT（2016，首个实用异步原子广播）：POA Network 实验链与学术实现，生产落地有限。
- Dumbo 系列（2019-2021）：把异步共识的期望消息复杂度做到工程可接受，多个国内联盟链研究采用。

学术意义大于商用现状：真实互联网最接近异步模型，这条线是 BFT 理论的「正确答案」，只是贵。来源：Miller 等《The Honey Badger of BFT Protocols》（CCS'16）。

### FBA 与 UNL：联邦化信任

**一句话机制**：不设全局成员表，每个节点自己声明信谁，信任图自动长出法定人数。

- Stellar：SCP（2015 白皮书），FBA 唯一的大规模生产实现（见[恒星币](/chains/Stellar)）。
- XRP Ledger（2012 主网）：RPCA，UNL（唯一节点列表）由网络统一指定，去中心化程度常被质疑，是 FBA 的近亲而非同一物。

来源：[SCP 白皮书](https://www.stellar.org/papers/stellar-consensus-protocol.pdf)（Mazières，2015）；RPCA 白皮书（Schwartz 等，2014）。

### 资源与时间类：把「记账成本」换成硬盘和钟

**一句话机制**：PoC/PoSpace 按预存硬盘抽签，PoT 用 VDF 造不可加速的时钟，PoSt 在空间之上加「持续持有」的时间维度。

- Burstcoin（2014，首个 PoC 主网）；Chia（2021，PoSpace+PoT，学术强化版，见[Chia](/chains/Chia)）。
- Hyperledger Sawtooth（PoET，Intel SGX 抽签，信任根是 Intel，SGX 多次被侧信道攻破后成教学案例）。
- Filecoin（2020，PoRep+PoSt，存储证明同时充当共识，存储在这里是服务而不是彩票）。
- Spacemesh（2023 主网，PoST 的 Tortoise+Hare 双层定序）。

来源：[Proofs of Space（ePrint 2013/796）](https://eprint.iacr.org/2013/796)；VDF 综述（Boneh、Bünz、Fisch，2018）；[Filecoin 白皮书（存档）](https://web.archive.org/web/2023/https://filecoin.io/filecoin.pdf)（2017；原链已从官网下线）；[Solana 白皮书](https://solana.com/solana-whitepaper.pdf)（2017，PoH 属时间层）。

### 分片链上的 BFT：Catchain（TON）

**一句话机制**：BFT 投票的验证人由 PoS 质押竞选产生，共识跑在「主链管配置、工作链管交易」的原生分片结构上——BFT 负责最终性，分片负责容量，两条腿各自独立。

- TON（2021 主网）：Catchain 协议在验证人之间达成拜占庭容错一致；主链（masterchain）承载网络配置与最终共识，工作链（workchain）可再分片处理交易，见 [TON](/chains/TON)。
- 与 BFT 复兴期各家的差异：HotStuff 系与 Tendermint 系解决的是「单链上怎么高效投票」，TON 把分片做成一等公民，共识只负责跨分片的一致性锚点。

来源：[TON 文档 · Catchain consensus 纲要](https://docs.ton.org/)；白皮书原文见 [ton-blockchain/ton](https://github.com/ton-blockchain/ton)。

### CFT 共识与开发模式

RAFT 只容忍宕机不容忍作恶，容忍 f 个故障要 2f+1 节点（BFT 要 3f+1），消息量 O(n)、时延极低。联盟链把它用于排序层（Fabric etcd-Raft、长安链可插拔），分布式存储（etcd、TiKV）把它当主角。SOLO 单节点出块，只配开发测试。见[RAFT](/consensus/RAFT)、[SOLO](/consensus/SOLO)。

来源：[RAFT 论文](https://raft.github.io/raft.pdf)（USENIX ATC 2014）。

## 主链与共识对照表

链名与共识变体的对应关系，分叉链与已停摆链一并列出。「分叉自」标注代码或生态来源。

| 链 | 上线 | 共识（变体） | 备注 |
| --- | --- | --- | --- |
| Bitcoin | 2009 | PoW（SHA-256d，中本聪共识） | 分叉链 BCH、BSV 同 PoW，2017/2018 |
| Litecoin | 2011 | PoW（Scrypt） | [莱特币](/chains/Litecoin) |
| XRP Ledger | 2012 | RPCA（UNL 投票） | 白皮书 2014 年补发 |
| Peercoin | 2012 | PoW+PoS 混合 | 首个 PoS 主网 |
| Nxt | 2013 | 纯 PoS | 首个无 PoW 主网 |
| Dogecoin | 2013 | PoW（Scrypt）+AuxPoW | 2014 年起与 Litecoin 合并挖矿 |
| BitShares | 2014 | DPoS | Larimer 首作 |
| Monero | 2014 | PoW（RandomX） | 2019 年换抗 ASIC 算法，[门罗币](/chains/Monero) |
| Stellar | 2014 | SCP（FBA） | 白皮书 2015，[恒星币](/chains/Stellar) |
| Decred | 2016 | PoW 出块+PoS 选票 | 混合派完整形态 |
| Ethereum | 2015 | PoW→Gasper（2022-09-15 起） | Casper FFG+LMD GHOST，[以太坊](/chains/Ethereum) |
| Hyperledger Fabric | 2016 | 可插拔：PBFT→Raft→SmartBFT | 联盟链，见[Hyperledger 语境](/consensus/RAFT) |
| FISCO BCOS | 2017 | PBFT 变体 | 国内联盟链 |
| Cardano | 2017 | Ouroboros（Classic→Praos） | 首个有严格证明的 PoS，[卡尔达诺](/chains/Cardano) |
| HyperCash | 2017 | PoW+PoS 混合 | 「HDPoS」标注来源未考 |
| EOS | 2018 | DPoS+BFT 不可逆 | 21 个 BP，[EOS](/chains/EOS) |
| TRON | 2018 | DPoS | 27 个超级代表，[TRON](/chains/TRON) |
| Gnosis Chain | 2018 | AuRA PoA→POSDAO | 原 xDai 侧链 |
| Cosmos Hub | 2019 | Tendermint BFT（今 CometBFT） | 同构链：Osmosis、Kava、IRISnet |
| Terra Classic | 2019 | Tendermint | 2022-05 崩盘停摆，风险样本 |
| Zilliqa | 2019 | PoW 分片+pBFT | 算力入网、投票出块 |
| Algorand | 2019 | Pure PoS+BA⋆（VRF 抽签） | |
| Solana | 2020 | PoH+TowerBFT+质押轮换 | [Solana](/chains/Solana) |
| Near | 2020 | Nightshade 分片+Doomslug（PoS） | |
| Polkadot | 2020 | NPoS（BABE 出块+GRANDPA 最终性） | [波卡](/chains/Polkadot) |
| BNB Smart Chain | 2020 | PoSA（Parlia，21 验证人） | BNB Beacon Chain（Tendermint）已退役，[BSC](/chains/BinanceSmartChain) |
| Avalanche | 2020 | Snowball 族（X-Chain DAG / P、C-Chain Snowman） | [Avalanche](/consensus/Avalanche) |
| Filecoin | 2020 | PoRep+PoSt（Expected Consensus） | 存储证明即共识 |
| Chia | 2021 | PoSpace+PoT（VDF） | [Chia](/chains/Chia) |
| 长安链 | 2021（开源） | TBFT/MaxBFT/RAFT/SOLO 可插拔 | 联盟链，[ChainMaker 文档](https://docs.chainmaker.org.cn/tech/%E5%85%B1%E8%AF%86%E7%AE%97%E6%B3%95.html) |
| TON | 2021 | Catchain（BFT+PoS） | 主链+工作链原生分片，[TON](/chains/TON) |
| Aptos | 2022 | AptosBFT（DiemBFT v4/Jolteon 系 HotStuff） | Diem 血脉 |
| Sui | 2023 | Narwhal+Bullshark/Mysticeti | DAG 内存池与共识解耦 |
| Spacemesh | 2023 | PoST（Tortoise+Hare） | PoST 首个生产实现 |
| 蚂蚁链 | 未公开 | HotStuff 系（联盟链） | 原始论文来源未考 |

34 条链，涵盖当前主要共识变体。看得出集中度：出块资源上 PoW 三家、PoS 家族二十余家；投票层上 HotStuff 与 Tendermint 两个名字覆盖了 BFT 公链的大半。

## 来源清单

### 白皮书与论文

- Nakamoto《Bitcoin: A Peer-to-Peer Electronic Cash System》（2008）：[bitcoin.org/bitcoin.pdf](https://bitcoin.org/bitcoin.pdf)
- King、Nadal《PPCoin: Peer-to-Peer Crypto-Currency with Proof-of-Stake》（2012-08-19）：[decred.org 镜像](https://decred.org/research/king2012.pdf)
- Larimer《Delegated Proof of Stake》白皮书（BitShares，2014）
- Kwon《Tendermint: Consensus without Mining》（2014）；现由 [CometBFT 文档](https://docs.cometbft.com/) 承接
- Mazières《The Stellar Consensus Protocol》（2015）：[stellar.org/papers](https://www.stellar.org/papers/stellar-consensus-protocol.pdf)
- Schwartz、Youngs、Britto《The Ripple Protocol Consensus Algorithm》（2014）
- Castro、Liskov《Practical Byzantine Fault Tolerance》（OSDI'99）：[Microsoft Research 论文页](https://www.microsoft.com/en-us/research/publication/practical-byzantine-fault-tolerance/)、[存档镜像](https://web.archive.org/web/2020/http://pmg.csail.mit.edu/papers/osdi99.pdf)
- Ongaro、Ousterhout《In Search of an Understandable Consensus Algorithm》（USENIX ATC 2014）：[raft.github.io](https://raft.github.io/raft.pdf)
- Kiayias、Russell、David、Oliynykov《Ouroboros》（CRYPTO 2017）：[ePrint 2016/889](https://eprint.iacr.org/2016/889)
- Buterin、Griffith《Casper the Friendly Finality Gadget》（2017）：[arXiv:1710.09437](https://arxiv.org/abs/1710.09437)
- Yin、Malkhi 等《HotStuff: BFT Consensus with Linearity and Responsiveness》（CCS'19）：[arXiv:1803.05069](https://arxiv.org/abs/1803.05069)
- Team Rocket《Scalable and Probabilistic Leaderless BFT Consensus through Metastability》（2018）：[Ava Labs](https://www.avalabs.org/) 官网收录
- Miller 等《The Honey Badger of BFT Protocols》（CCS'16）
- Dziembowski 等《Proofs of Space》（CRYPTO 2015）：[ePrint 2013/796](https://eprint.iacr.org/2013/796)
- Boneh、Bünz、Fisch《A Survey of Two Verifiable Delay Functions》（2018）
- Yakovenko《Solana: A new architecture for a high performance blockchain》（2017）：[solana.com/solana-whitepaper.pdf](https://solana.com/solana-whitepaper.pdf)
- Wood《Polkadot: Vision for a Heterogeneous Multi-Chain Framework》（2016 草案）
- Micali《ALGORAND: The Efficient and Democratic Ledger》（arXiv:1607.01341）
- Protocol Labs《Filecoin: A Decentralized Storage Network》（2017；原白皮书 PDF 已从官网下线）：[官方技术规格 spec.filecoin.io](https://spec.filecoin.io/)、[白皮书存档](https://web.archive.org/web/2023/https://filecoin.io/filecoin.pdf)

### 官方文档

- [ethereum.org 共识机制（PoA/Gasper 口径）](https://ethereum.org/en/developers/docs/consensus-mechanisms/poa/)
- [长安链共识算法](https://docs.chainmaker.org.cn/tech/%E5%85%B1%E8%AF%86%E7%AE%97%E6%B3%95.html)（TBFT/MaxBFT/Raft/Solo）
- Hyperledger Fabric 文档（Raft ordering、SmartBFT）
- [CometBFT 文档](https://docs.cometbft.com/)（Tendermint 后继）
- Aptos、Sui 官方文档（AptosBFT、Narwhal/Mysticeti 口径）
- Chia 官方文档（PoSpace+PoT）、Decred 文档（混合共识）、Gnosis Chain 文档（POSDAO）

### 来源未考

查无权威原始出处、按口头或第三方口径收录的条目如下，引述前先回白皮书核对。

1. 「HDPoS」术语：HyperCash 官方白皮书写的是 PoW+PoS 混合，未见任何官方文档定义 HDPoS；交易所行情页的 HDPoS 标注疑为「Hybrid PoS」的误传。术语本身按来源未考处理。
2. 蚂蚁链 MaxBFT：长安链文档确认其 MaxBFT 源于链式 HotStuff；蚂蚁链自身的 HotStuff 工程论文公开渠道未见。
3. 「APoS」提法（Solana）：Solana 官方口径是 PoS 质押+PoH+TowerBFT，无 APoS 这一官方术语，本文按官方口径写。
4. Bitcointalk 2011 年 PoS 论坛帖（QuantumMechanic）：原帖可查但属社区讨论，不构成学术出处，仅记为概念首次公开。

## 怎么用这页

- 查某条链用什么共识：直接看[对照表](#主链与共识对照表)。
- 查某个算法哪年出现、谁先用：看[时间线总表](#时间线总表)。
- 要读单算法机制：每族详解里有站内链接，[共识算法目录](/consensus/Consensus)收着 23 篇算法详解加一篇总览。
- 时间线总表与[发展史时间线](/timeline)的 30 个节点互为补充：那边看链的历史，这边看算法的历史。
