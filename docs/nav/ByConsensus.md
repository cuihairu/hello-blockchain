# 按共识算法导航

48 种算法一张表：**首次出现 → 所在层 → 解决什么 → 用了它的链**。行按首次出现年份排序；算法列进详解页，链列进链页。按年份读算法演进史见[共识算法演进时间线](/consensus-timeline)，按主网上线时间排链见[按时间导航](/nav/ByTime)，四层归属的展开在[分层架构](/layers/Layers)。

| 首次出现 | 算法 | 所在层 | 解决什么 | 用了它的链 |
| --- | --- | --- | --- | --- |
| 1982 | [BFT](/consensus/BFT) | 结算层 | 存在任意行为节点（叛将）时，诚实节点如何就同一状态达成一致；给出安全性与活性的边界 | 理论统称（投票共识的共同基座） |
| 1998 | [Paxos](/consensus/Paxos) | 结算层 | 异步网络 + 少数节点宕机的前提下，让多个副本对单个值（然后是日志序列）达成不可分歧的一致 | Chubby/Spanner 等非区块链系统 |
| 1999 | [PBFT](/consensus/PBFT) | 结算层 | 把 BFT 从「理论可行」变成「工程可跑」：pre-prepare/prepare/commit 三阶段消息交换、视图切换、检查点垃圾回收 | 联盟链通用底座（如长安链系） |
| 2008 | [PoW](/consensus/POW) | 结算层 | 无许可环境下让互不信任的节点对同一份账达成一致，不需要身份或许可 | [比特币](/chains/Bitcoin)、[莱特币](/chains/Litecoin)、[门罗](/chains/Monero)（RandomX）、[Arweave](/chains/Arweave)（旧版） |
| 2012 | [PoS](/consensus/POS) | 结算层 | 用经济质押替代算力竞争来抗女巫，让「作恶者失去保证金」成为安全机制，同时把能耗降下来 | [以太坊](/chains/Ethereum)（Gasper 组合件） |
| 2012 | [RPCA](/consensus/RPCA) | 结算层 | 在已知验证人（UNL，Unique Node List）之间快速对交易集达成一致 | XRP Ledger |
| 2013 | [GHOST](/consensus/GHOST) | 结算层 | 最长链规则把分叉块（叔块）直接丢弃 | [以太坊](/chains/Ethereum)（LMD 变体） |
| 2014 | [DPoS](/consensus/DPOS) | 结算层 | 兼顾吞吐与问责——让少量代表出块换取高 TPS 与快确认，持币人保留投票权并可撤换代表 | [EOS](/chains/EOS)、[TRON](/chains/TRON) |
| 2014 | [PoC](/consensus/POC) | 结算层 | 用存储资源替代算力竞争，降低能耗与专用硬件门槛 | — |
| 2014 | [RAFT](/consensus/RAFT) | 结算层 | 把 Paxos 的效果用「领导选举 + 日志复制 + 安全性约束」讲得可理解、可教学、可工程化 | etcd/Fabric 等非拜占庭系统 |
| 2014 | [Tendermint](/consensus/Tendermint) | 结算层 | 把质押与 BFT 投票焊成一个完整公链引擎 | [Cosmos](/chains/Cosmos)（CometBFT 延续） |
| 2015 | [FBA](/consensus/FBA) | 结算层 | PBFT 类协议需要预先固定的验证人名单，开放网络的准入怎么定 | [Stellar](/chains/Stellar) |
| 2016 | [ABFT](/consensus/ABFT) | 结算层 | 经典 PBFT 依赖部分同步（超时驱动），而真实互联网最接近异步模型；FLP 又证明纯异步+确定性共识无解 | 理论统称（Dumbo 系等） |
| 2016 | [Hashgraph](/consensus/Hashgraph) | 结算层 | 投票不用真的发出去——每个节点按 DAG 重演他人视角，「算」出别人的票 | Hedera |
| 2016 | [HoneyBadgerBFT](/consensus/HoneyBadgerBFT) | 结算层 | 消息无序、延迟无上界、分区频发的网络里，共识仍然安全且不停摆 | Helium 旧共识组（已退役） |
| 2016 | [IOTA Tangle](/consensus/IOTA) | 结算层 | IoT 微交易场景下的零手续费记账 | IOTA |
| 2016 | [PoET](/consensus/PoET) | 结算层 | 在许可网络里公平抽签决定「谁出块」 | Hyperledger Sawtooth |
| 2017 | [Algorand](/consensus/Algorand) | 结算层 | 让出块权在抽签揭示前不可预知 | Algorand |
| 2017 | [GRANDPA](/consensus/GRANDPA) | 结算层 | 把「出块」与「最终性」拆成两个独立组件 | [Polkadot](/chains/Polkadot) |
| 2017 | [Gasper](/consensus/Gasper) | 结算层 | 把 PoW 时代的概率最终性过渡到 PoS，同时保留分叉选择与最终性两条线 | [以太坊](/chains/Ethereum) |
| 2017 | [Ouroboros](/consensus/Ouroboros) | 结算层 | 给 PoS 配上可形式化的安全证明——按质押权重随机选人出块，安全性可被数学证明而非仅靠经验 | [Cardano](/chains/Cardano) |
| 2017 | [PoA](/consensus/POA) | 结算层 | 把出块资格锚定在可追责的法律实体身份上，换取极高吞吐与近零燃料成本；适合联盟链、测试网与侧链 | [BSC](/chains/BinanceSmartChain)（PoSA 变体） |
| 2017 | [PoH](/consensus/PoH) | 结算层之上的**时间层** | 为全网事件提供先于共识的、可验证的全局时钟 | [Solana](/chains/Solana) |
| 2017 | [PoSpace](/consensus/PoSpace) | 结算层 | 证明者预先构造只能靠占用磁盘才能快速应答的挑战-响应数据结构 | [Chia](/chains/Chia) |
| 2018 | [Avalanche](/consensus/Avalanche) | 结算层 | 既要无许可与高吞吐，又要快确认——用随机亚采样替代全网广播投票，用质押决定权重 | [Avalanche](/chains/Avalanche) |
| 2018 | [BABE](/consensus/BABE) | 结算层 | 用 VRF + 随机槽把出块权分配给验证人，避免可预知的 leader 轮替 | [Polkadot](/chains/Polkadot) |
| 2018 | [HotStuff](/consensus/HotStuff) | 结算层 | 经典 BFT 稳态下每轮都要全网两两交换消息，节点数一上去吞吐就崩 | [Aptos](/chains/Aptos)（AptosBFT） |
| 2018 | [PoT](/consensus/POT) | 结算层 | 为网络生成不可预知、不可加速的随机源 | [Chia](/chains/Chia) |
| 2018 | [覆盖证明（Helium PoC）](/consensus/ProofOfCoverage) | 结算层的抗女巫扩展 | 让「我在这里、我有覆盖」成为可验证声明——假位置、假覆盖在物理定律与三方探测面前不经济 | Helium（Solana 迁移后由 oracle 承担） |
| 2018 | [Snowball](/consensus/Snowball) | 结算层 | 替代全网广播投票——每轮只随机询问少量节点，重复询问后个体偏好收敛到全网共识，通信量与节点数解耦 | [Avalanche](/chains/Avalanche) |
| 2019 | [DiemBFT](/consensus/DiemBFT) | 结算层 | 把 HotStuff 的理论性能工程化到生产级 | [Aptos](/chains/Aptos)（前身 Diem） |
| 2019 | [Lachesis](/consensus/Lachesis) | 结算层 | 让出块与最终化在异步网络里自然发生 | Fantom |
| 2019 | [Multi-Level BFT（Theta）](/consensus/MultiLevelBFT) | 结算层 | 视频微支付需要「高吞吐 + 上一段确认后才发下一段」的快速最终性，同时不想让共识权收缩到 20 个节点 | Theta |
| 2019 | [SPoS](/consensus/SPOS) | 结算层 | 分片要小才快，但小组易被攻占；每轮随机抽样并轮换共识组，成员不可预知 | MultiversX（原 Elrond） |
| 2019 | [排序与结算（Rollup 侧）](/consensus/Sequencing) | 计算层入口 + 结算层回锚 | Rollup 交易的排序与最终性 | [Optimism](/chains/Optimism)、[Arbitrum](/chains/Arbitrum)、[zkSync](/chains/zkSync) |
| 2020 | [PoST](/consensus/PoST) | 结算层 | 在空间证明之上追加时间维度 | [Filecoin](/chains/Filecoin)（落地样本）、Spacemesh |
| 2020 | [QBFT](/consensus/QBFT) | 结算层 | 把 BFT 裁剪到许可网络 | Hyperledger Besu 等许可链 |
| 2020 | [Snowman](/consensus/Snowman) | 结算层 | 概率共识本身只回答「这笔交易大家同不同意」，不回答「它排在谁前面」 | [Avalanche](/chains/Avalanche) |
| 2020 | [Streamlet](/consensus/Streamlet) | 结算层 | 把 BFT 共识的复杂度压到极限 | 研究基准（无生产部署） |
| 2020 | [TowerBFT](/consensus/TowerBFT) | 结算层 | 利用 PoH 提供的确定时序，把投票变成「抵押后再翻悔要付出代价」的承诺 | [Solana](/chains/Solana) |
| 2021 | [Narwhal 与 Bullshark](/consensus/NarwhalBullshark) | 结算层 | 把「交易的可靠传播」（内存池）与「排序确认」（共识）彻底分开 | [Sui](/chains/Sui)（2021-2024） |
| 2021 | [再质押（Restaking）](/consensus/Restaking) | 结算层的安全预算经济学 | 新协议不想自己养一套验证人网络与代币（冷启动难、预算薄、易被 51%），把以太坊已有的质押资本与罚没机制**复用**过来 | EigenLayer（以太坊生态中间件） |
| 2021 | [SOLO](/consensus/SOLO) | 结算层 | 开发、测试与演示环境里省掉多节点协调——一个节点顺序产块，迭代最快 | 长安链开发模式 |
| 2021 | [TBFT](/consensus/TBFT) | 结算层 | 在许可网络里提供秒级确定性出块 | 长安链 |
| 2021 | [Yuma Consensus（Bittensor）](/consensus/Yuma) | 结算层 | 服务质量不可形式验证（不像 ZK 可证），但需要可共识的排序与奖励分配，同时抗验证者串谋 | Bittensor |
| 2022 | [MaxBFT](/consensus/MaxBFT) | 结算层 | 把 HotStuff 的线性通信复杂度（QC 聚合 + 链式流水线）工程化，为联盟链提供高吞吐、低时延的确定性最终性 | 长安链 v2+ |
| 2022 | [SPoRA（Arweave）](/consensus/SPORA) | 结算层的存储变体 + 存储层的激励闭环 | 一次性付费、永久存储——用「随机挑战历史数据」使存储本身成为出块资源，让矿工自愿长期持有全网数据 | [Arweave](/chains/Arweave) |
| 2024 | [Mysticeti](/consensus/Mysticeti) | 结算层 | 把 DAG 共识的延迟开销砍掉 | [Sui](/chains/Sui)（2024 起） |

## 读法

- **同一年出现多个算法**（2016-2018 最密）读出的是同一件事：BFT 三阶段在无许可网络里反复重造——选主方式不同，骨架相同。
- 「所在层」按[四层模型](/layers/Layers)标注；绝大多数算法在结算层，例外（PoH 时间层、Sequencing 计算层入口、SPoRA 存储激励）值得单独读。
- 「解决什么」是一句话压缩版；每个详解页开头的「四要素」区块有完整版与出处。
