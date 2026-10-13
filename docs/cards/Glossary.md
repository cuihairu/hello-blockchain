# 术语表

全站术语的平铺查询表：一句话定义 + 站内详解。想看概念之间怎么连成网，去[知识卡片索引](/cards/Cards)；想看概念收拢与论文出处，去[知识点总纲](/knowledge)；想看年份脉络，去[发展史时间线](/timeline)与[共识算法演进时间线](/consensus-timeline)。

## 分层与架构

| 术语 | 一句话定义 | 详见 |
| --- | --- | --- |
| 分层架构 | 服务发现 / 计算 / 存储 / 结算四层模型，结算层是信任锚 | [分层架构](/layers/Layers) |
| 结算层 | 通过共识给出「哪个状态不可逆」的信任锚层 | [结算层](/layers/Settlement) |
| 计算层 | 确定性状态机执行交易的层（虚拟机 + gas + 语义） | [计算层](/layers/Compute) |
| 存储层 | 状态树、数据可用性与持久化激励所在的层 | [存储层](/layers/Storage) |
| 服务发现 | 把人类可读名字映射到链上地址与内容的层，对标 DNS | [服务发现](/layers/ServiceDiscovery) |
| 模块化 | 把执行、DA、结算拆给不同链承担的架构路线 | [结算层](/layers/Settlement) |

## 结算与共识

| 术语 | 一句话定义 | 详见 |
| --- | --- | --- |
| 共识算法 | 互不信任的节点对同一份账达成一致的协议 | [共识算法](/consensus/Consensus) |
| 最终性（finality） | 状态不可逆的承诺：概率（确认数）或确定性（投票） | [结算层](/layers/Settlement) |
| 概率最终性 | 回滚概率随确认数指数下降但不归零（PoW 路线） | [PoW](/consensus/POW) |
| 确定性最终性 | 投票达阈后不可回滚（BFT 路线） | [PBFT](/consensus/PBFT) |
| 安全性（safety） | 诚实节点不会认可互相矛盾的历史 | [BFT](/consensus/BFT) |
| 活性（liveness） | 新交易能持续上账，系统不永久停摆 | [BFT](/consensus/BFT) |
| 拜占庭容错（BFT） | 容忍任意行为节点的共识；f 个作恶需 n ≥ 3f+1 | [BFT](/consensus/BFT) |
| 崩溃容错（CFT） | 只容忍宕机不容忍作恶（RAFT），需 2f+1 | [RAFT](/consensus/RAFT) |
| 部分同步 | 网络延迟有界但界未知（PBFT 的假设） | [PBFT](/consensus/PBFT) |
| 异步（async） | 消息延迟无上界、无全局时钟（ABFT 的假设） | [ABFT](/consensus/ABFT) |
| QC（法定人数证书） | 2f+1 张签名聚合成的一个可验证对象 | [HotStuff](/consensus/HotStuff) |
| 三链提交 | 三个连续区块各获 2/3 投票即最终化最早区块 | [DiemBFT](/consensus/DiemBFT) |
| 视图切换 | leader 失效时换人的子协议，PBFT 为 O(n²)、HotStuff 为线性 | [PBFT](/consensus/PBFT) |
| 最长链规则 | 始终接受累计难度最高的链（中本聪共识） | [PoW](/consensus/POW) |
| GHOST | 分叉时选「子树最重」的分支，分叉块不浪费 | [GHOST](/consensus/GHOST) |
| LMD-GHOST | 按验证人最新消息投票权重选子树（以太坊出块） | [Gasper](/consensus/Gasper) |
| 最终性 gadget | 出块与定案拆开：出块快、定案由独立投票层保证 | [GRANDPA](/consensus/GRANDPA) |
| Casper FFG | 以太坊的最终性 gadget，检查点两轮投票定案 | [Gasper](/consensus/Gasper) |
| Gasper | LMD-GHOST（出块）+ Casper FFG（定案），以太坊现行共识 | [Gasper](/consensus/Gasper) |
| 弱主观性 | PoS 新节点必须从近期可信状态同步的固有代价 | [PoS](/consensus/POS) |
| 罚没（slashing） | 双签与环绕投票被证据化惩罚的经济安全机制 | [Gasper](/consensus/Gasper) |
| Nothing-at-Stake | 复制签名零成本导致在所有分叉上同时投票的问题 | [PoS](/consensus/POS) |
| VRF（可验证随机函数） | 秘密抽签：被抽中前没人知道结果，抽中后人人可验 | [Ouroboros](/consensus/Ouroboros) |
| VDF（可验证延迟函数） | 串行慢算、验证极快，造不可加速的随机时钟 | [PoT](/consensus/POT) |
| UNL（唯一节点列表） | RPCA 里的信任验证人名单，配置错误即分叉 | [RPCA](/consensus/RPCA) |
| 仲裁切片（quorum slice） | FBA 里节点自选的信任集合，切片网络涌现全局共识 | [FBA](/consensus/FBA) |
| aBFT（异步拜占庭容错） | 完全异步网络下仍保安全与活性的 BFT | [ABFT](/consensus/ABFT) |
| gossip-about-gossip | Hashgraph 把通信史织成 DAG、投票本地推演的设计 | [Hashgraph](/consensus/Hashgraph) |
| DAG 内存池 | 交易的可靠传播独立成 DAG 系统（Narwhal） | [Narwhal 与 Bullshark](/consensus/NarwhalBullshark) |
| 亚采样投票 | 每轮只随机询问少量节点、重复后收敛（Snowball 族） | [Snowball](/consensus/Snowball) |
| 分片（sharding） | 把验证与状态切给多个并行子网络 | [SPoS](/consensus/SPOS) |
| 流水线 BFT | 投票按区块串联推进、通信摊薄的设计（HotStuff 系） | [HotStuff](/consensus/HotStuff) |
| Paxos | 崩溃容错共识的源头：多数派两阶段，只抗宕机不抗作恶 | [Paxos](/consensus/Paxos) |
| IBFT | 许可链 BFT：固定验证人单块定案，QBFT 的前身 | [QBFT](/consensus/QBFT) |
| uncertified DAG | 不发逐轮证书、靠直接父链与提交规则定案的 DAG 共识 | [Mysticeti](/consensus/Mysticeti) |
| Tangle | IOTA 的 DAG 账本：每笔交易批准两条 tip，靠协调器兜底多年 | [IOTA](/consensus/IOTA) |
| 再质押（restaking） | 把已质押 ETH 再抵押给 AVS，复用安全预算 | [Restaking](/consensus/Restaking) |
| AVS | 主动验证服务：用再质押获得经济安全的链下组件 | [Restaking](/consensus/Restaking) |
| SPoRA | Arweave 共识：随机历史访问 + VDF 限速，存得全才可能赢 | [SPoRA](/consensus/SPORA) |
| 覆盖证明（PoC） | 无线覆盖声明的物理可证伪挑战：探测方/被测方/旁证三方 | [覆盖证明](/consensus/ProofOfCoverage) |
| 多级 BFT | 委员会 PBFT 出块 + guardian 检查点 BLS 聚合终局 | [Multi-Level BFT](/consensus/MultiLevelBFT) |
| Yuma 共识 | 主观效用打分的质押加权中位数裁剪，抗串谋评分 | [Yuma](/consensus/Yuma) |
| burn-and-mint | 用量烧主币铸稳定单位（DC/uact），计价稳定与通缩并存 | [覆盖证明](/consensus/ProofOfCoverage)、[排序与结算](/consensus/Sequencing) |
| 概率微支付 | 票据面值×中奖概率=段价，只把中奖票上链兑付 | [DPOS](/consensus/DPOS) |
| GHOSTDAG | BlockDAG 排序协议：并发块全进图再线性化，避免安全-吞吐权衡 | [GHOSTDAG](/consensus/GHOSTDAG) |
| BlockDAG | 块的有向无环图，并发块不互相作废（Kaspa 的账本结构） | [GHOSTDAG](/consensus/GHOSTDAG) |
| NPoS | 提名权益证明：提名人把质押借给候选验证人，Phragmén 选举摊平质押 | [NPoS](/consensus/NPoS) |
| Phragmén 选举 | 多目标选举算法：总质押最大化、最小验证人质押最大化、方差最小化 | [NPoS](/consensus/NPoS) |
| 带宽证明 | 证明「真实贡献了带宽」，验证在链下服务网络而非出块共识 | [带宽证明](/consensus/BandwidthProof) |
| PoSpace | 空间证明：用绘图换抽签资格，证明者只需证明「存着数据」 | [PoSpace](/consensus/PoSpace) |
| 绘图（plotting） | 生成 Chia plot 文件的过程，重写入是真实环境成本 | [PoSpace](/consensus/PoSpace) |
| PoT | 时间证明：VDF 串行耗时保证挑战不可预知、出块节奏固定 | [PoT](/consensus/POT) |
| 时间之主（timelord） | Chia 中跑 VDF 的角色，串行计算是其主要硬件门槛 | [PoT](/consensus/POT) |

## 计算与存储

| 术语 | 一句话定义 | 详见 |
| --- | --- | --- |
| 确定性执行 | 同一输入所有节点算出同一输出，重放一致 | [计算层](/layers/Compute) |
| gas | 计算资源计价单位，把无限循环变成付费有限步骤 | [计算层](/layers/Compute) |
| EVM | 以太坊虚拟机，栈式字节码，生态最大 | [计算层](/layers/Compute) |
| Move 资源模型 | 资产建模为线性资源的类型系统，防复制防重入 | [计算层](/layers/Compute) |
| 重入 | 状态更新前被外部调用再次进入的漏洞模式 | [智能合约漏洞](/hacking/SmartContractVulnerabilities) |
| MEV | 从交易排序权中提取的价值（抢跑、夹击） | [计算层](/layers/Compute) |
| 预言机 | 向合约输送外部事实的服务，操纵发生在数据来源层 | [计算层](/layers/Compute) |
| Merkle 树 | 叶子两两哈希上卷成根，凭根证明存在性 | [Merkle 树](/algo/MerkleTree) |
| 状态根 | 全局状态 Merkle 树的根，被结算层承诺进块头 | [存储层](/layers/Storage) |
| 数据可用性（DA） | 区块数据必须真的发布，轻节点采样加纠删码验证 | [存储层](/layers/Storage) |
| PoRep / PoST | 复制证明 / 时空证明：拥有空间且持续持有 | [PoST](/consensus/PoST) |
| 内容寻址 | 按内容哈希寻址，内容变则地址变 | [存储层](/layers/Storage) |
| pinning | 让 IPFS 节点长期保留某内容——没人 pin 就消失 | [存储层](/layers/Storage) |
| 状态爆炸 | 全节点存储持续膨胀导致节点中心化 | [存储层](/layers/Storage) |
| 排序器（sequencer） | Rollup 上定交易顺序的角色，当前多为单点软确认 | [排序与结算](/consensus/Sequencing) |
| 共享排序 | 多条 Rollup 共用一套去中心化排序节点 | [排序与结算](/consensus/Sequencing) |
| based 排序 | 把排序权交给 L1 提议者的路线 | [排序与结算](/consensus/Sequencing) |
| 欺诈证明 | 乐观结算的挑战机制：窗口期内证伪错误状态根 | [排序与结算](/consensus/Sequencing) |
| 有效性证明 | ZK 结算：证明先行，L1 验证通过即最终 | [排序与结算](/consensus/Sequencing) |

## 账本、资产与服务发现

| 术语 | 一句话定义 | 详见 |
| --- | --- | --- |
| UTXO | 未花费交易输出：余额等于可用输出之和 | [UTXO 模型](/model/UTXO) |
| 账户模型 | 一地址一余额一状态的全局账本形态 | [账户模型](/model/Account) |
| DAG 账本 | 交易组织成有向无环图的账本结构 | [DAG 模型](/model/DAG) |
| 图灵完备 / 受限脚本 | 能写任意循环 vs 只能表达固定逻辑（Bitcoin Script） | [OP_CHECKSIG](/opcode/OP_CHECKSIG) |
| NFT | 非同质化代币：唯一性 + 可验证所有权 | [彩色币](/nft/ColoredCoins) |
| BIP | 比特币改进提案，改的多是结算层规则 | [BIP 改进提案](/btc/BIPS) |
| 域名 / 命名系统 | 人类可读名字到链上地址的映射，名字是链上资产 | [服务发现](/layers/ServiceDiscovery) |
| 解析器 | 把名字翻译成地址/内容的组件，可被劫持 | [服务发现](/layers/ServiceDiscovery) |
| ccip-read | 跨链/链下解析的签名转发协议，信任链长一截 | [服务发现](/layers/ServiceDiscovery) |
| 同形字 | unicode 相似字符伪装成目标名字的钓鱼手法 | [服务发现](/layers/ServiceDiscovery) |

## 攻防

| 术语 | 一句话定义 | 详见 |
| --- | --- | --- |
| 51% 攻击 | 算力过半即可重组已确认交易 | [大算力攻击](/hacking/51Attack) |
| 长程攻击 | 用旧密钥从创世重造替代链（打 PoS 弱主观性） | [长程攻击](/hacking/LongRangeAttack) |
| 女巫攻击 | 批量伪造身份打穿「一人一票」类机制 | [女巫攻击](/hacking/SybilAttack) |
| 双花 | 同一笔钱花两次；确认数与最终性都是防线 | [双重花费攻击](/hacking/DoubleSpendAttack) |
| 自私挖矿 | 扣块择机发布以获取超额相对收益 | [自私挖矿攻击](/hacking/SelfishMiningAttack) |
| 粉尘攻击 | 海量微小交易塞爆索引与内存池 | [粉尘攻击](/hacking/DustingAttack) |
| 跨链桥攻击 | 桥的签名验证或权限漏洞，损失最大的攻击面 | [跨链桥攻击](/hacking/CrossChainBridgeAttack) |
| 智能合约漏洞 | 重入、溢出、预言机操纵、升级缺陷等合约层风险 | [智能合约漏洞](/hacking/SmartContractVulnerabilities) |

## 时间线与索引

| 页面 | 用途 |
| --- | --- |
| [发展史时间线](/timeline) | 49 个节点五段分期，回答「为什么是那个时候」 |
| [共识算法演进时间线](/consensus-timeline) | 64 条年表 + 35 行主链映射，按年份读算法谱系 |
| [知识卡片索引](/cards/Cards) | 概念按四层加横切线组织成网，卡片互链 |
| [知识点总纲](/knowledge) | 概念、论文、官方文档、场景与坑的收拢版 |
