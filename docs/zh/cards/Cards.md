# 知识卡片索引

把散在各章的概念抽成卡片，按[分层架构](/zh/layers/Layers)的四层加两条横切线组织成网。每张卡片：一句话定义、相邻卡片（互链到对应详解页）、出处页。查单个术语的平铺版在[术语表](/zh/cards/Glossary)；按年份读谱系在[发展史时间线](/zh/timeline)与[共识算法演进时间线](/zh/consensus-timeline)；概念与论文的收拢版在[知识点总纲](/zh/knowledge)。

## 读法

- 卡片之间靠「相邻」连线：一张卡片连三到五张，读完一层的卡片就能顺手跳进相邻层的入口——这是网，不是目录。
- 「出处」给的是站内详解页；论文与白皮书的原始出处收在各详解页开头的「四要素」区块里。
- 两条横切线跨层：**账本与交易**决定状态怎么记（结算层与存储层的界面），**攻防**决定哪一层先被攻破（读案例时先定位层次再读攻击）。

## 结算层：什么状态不可逆

- **最终性**：状态不可逆的承诺，分概率（确认数越多回滚越难）与确定性（投票达阈即不可逆）两种 ｜ 相邻：[最长链与分叉选择](/zh/consensus/GHOST)、[BFT 投票](/zh/consensus/PBFT)、[弱主观性](/zh/consensus/POS) ｜ 详解：[结算层](/zh/layers/Settlement)
- **最长链与分叉选择**：按累计权重选头；GHOST 把分叉块也算进权重，出块间隔才敢缩短 ｜ 相邻：[概率最终性](/zh/consensus/POW)、[LMD-GHOST](/zh/consensus/Gasper)、[自私挖矿](/zh/hacking/SelfishMiningAttack)、[结算层](/zh/layers/Settlement) ｜ 详解：[GHOST](/zh/consensus/GHOST)
- **BFT 投票**：容忍 f 个作恶需要 n ≥ 3f+1，2/3 达成即最终 ｜ 相邻：[QC](/zh/consensus/HotStuff)、[三链提交](/zh/consensus/DiemBFT)、[视图切换](/zh/consensus/PBFT)、[结算层](/zh/layers/Settlement) ｜ 详解：[PBFT](/zh/consensus/PBFT)
- **QC（法定人数证书）**：把 2f+1 张签名聚合成一个可验对象，投票从此可流水线 ｜ 相邻：[HotStuff 流水线](/zh/consensus/HotStuff)、[MaxBFT](/zh/consensus/MaxBFT)、[结算层](/zh/layers/Settlement) ｜ 详解：[HotStuff](/zh/consensus/HotStuff)
- **弱主观性**：PoS 新节点必须从近期可信状态同步，无法只靠链本身辨真伪 ｜ 相邻：[长程攻击](/zh/hacking/LongRangeAttack)、[检查点](/zh/consensus/Tendermint)、[结算层](/zh/layers/Settlement) ｜ 详解：[PoS](/zh/consensus/POS)
- **罚没（slashing）**：双签与环绕投票被证据化惩罚，是 PoS 的经济安全核心 ｜ 相邻：[Nothing-at-Stake](/zh/consensus/POS)、[inactivity leak](/zh/consensus/Gasper)、[结算层](/zh/layers/Settlement) ｜ 详解：[Gasper](/zh/consensus/Gasper)
- **最终性 gadget**：出块与定案拆成两个独立组件，各自可升级 ｜ 相邻：[BABE](/zh/consensus/BABE)、[Casper FFG](/zh/consensus/Gasper)、[GRANDPA 前缀投票](/zh/consensus/GRANDPA)、[结算层](/zh/layers/Settlement) ｜ 详解：[GRANDPA](/zh/consensus/GRANDPA)
- **UNL 与仲裁切片**：信任名单（或自选切片）决定谁有资格投票，配置错误即分叉 ｜ 相邻：[RPCA](/zh/consensus/RPCA)、[FBA](/zh/consensus/FBA)、[女巫攻击](/zh/hacking/SybilAttack)、[结算层](/zh/layers/Settlement) ｜ 详解：[FBA](/zh/consensus/FBA)
- **随机抽签**：VRF 让出块权在揭示前不可预知，针对性攻击无从下手 ｜ 相邻：[VDF 随机时钟](/zh/consensus/POT)、[Algorand 秘密抽签](/zh/consensus/Algorand)、[BABE 盲分配](/zh/consensus/BABE)、[结算层](/zh/layers/Settlement) ｜ 详解：[Ouroboros](/zh/consensus/Ouroboros)
- **DAG 共识**：出块与定序在无向图上异步进行，不用固定出块周期 ｜ 相邻：[gossip 虚拟投票](/zh/consensus/Hashgraph)、[DAG 内存池](/zh/consensus/NarwhalBullshark)、[超级检查点](/zh/consensus/Lachesis)、[结算层](/zh/layers/Settlement) ｜ 详解：[Lachesis](/zh/consensus/Lachesis)
- **Paxos 与多数派**：任意两个多数派相交 ⇒ 已定值不可推翻，CFT 共识的全部骨架 ｜ 相邻：[RAFT](/zh/consensus/RAFT)、[BFT 投票](/zh/consensus/PBFT)、[结算层](/zh/layers/Settlement) ｜ 详解：[Paxos](/zh/consensus/Paxos)
- **uncertified DAG**：免掉逐轮证书，靠「三轮直接父链」提交规则省一次网络往返 ｜ 相邻：[DAG 共识](/zh/consensus/Lachesis)、[Narwhal 内存池](/zh/consensus/NarwhalBullshark)、[结算层](/zh/layers/Settlement) ｜ 详解：[Mysticeti](/zh/consensus/Mysticeti)
- **Tangle 与协调器**：tip 批准的 DAG 账本在低流量下不收敛，最终性退给协调器单点 ｜ 相邻：[DAG 账本](/zh/model/DAG)、[概率最终性](/zh/consensus/POW)、[结算层](/zh/layers/Settlement) ｜ 详解：[IOTA](/zh/consensus/IOTA)
- **共享安全预算**：再质押把同一份罚没威慑租给多个协议，效率与关联失败同源 ｜ 相邻：[罚没（slashing）](/zh/consensus/Gasper)、[最终性](/zh/layers/Settlement)、[长程攻击](/zh/hacking/LongRangeAttack) ｜ 详解：[Restaking](/zh/consensus/Restaking)
- **随机历史访问**：出块必须能回答「随机位置的旧数据你还有吗」，存储从容量竞争变成可取回性竞争 ｜ 相邻：[PoST 持续持有](/zh/consensus/PoST)、[存储层](/zh/layers/Storage)、[最终性](/zh/layers/Settlement) ｜ 详解：[SPoRA](/zh/consensus/SPORA)
- **物理声明可证伪**：三方探测 + 物理定律校验（平方反比、光速上界）让「我在这里有覆盖」无法凭空编造 ｜ 相邻：[抗女巫机制](/zh/consensus/POW)、[HoneyBadgerBFT](/zh/consensus/HoneyBadgerBFT)、[结算层](/zh/layers/Settlement) ｜ 详解：[覆盖证明](/zh/consensus/ProofOfCoverage)
- **两级 BFT**：小委员会投票保吞吐，社区检查点签名保底线——效率与去中心化分层各取一半 ｜ 相邻：[最终性 gadget](/zh/consensus/GRANDPA)、[BFT 投票](/zh/consensus/PBFT)、[结算层](/zh/layers/Settlement) ｜ 详解：[Multi-Level BFT](/zh/consensus/MultiLevelBFT)
- **主观效用共识**：服务质量不可形式验证时，用质押加权中位数裁剪把「大家怎么评」压成可结算的权重 ｜ 相邻：[概率验证（Livepeer）](/zh/consensus/DPOS)、[女巫攻击](/zh/hacking/SybilAttack)、[结算层](/zh/layers/Settlement) ｜ 详解：[Yuma](/zh/consensus/Yuma)
- **BlockDAG 共识**：并发块全进图再线性化，吞吐随并发度提升，不再靠单链串行 ｜ 相邻：[GHOST 分叉选择](/zh/consensus/GHOST)、[DAG 账本](/zh/model/DAG)、[结算层](/zh/layers/Settlement) ｜ 详解：[GHOSTDAG](/zh/consensus/GHOSTDAG)
- **分片**：把验证与状态切给多个并行子网络，吞吐随分片数近似线性增长 ｜ 相邻：[PBFT 投票](/zh/consensus/PBFT)、[平行链](/zh/chains/Polkadot)、[结算层](/zh/layers/Settlement) ｜ 详解：[分片](/zh/consensus/Sharding)
- **带宽证明**：证明「真实贡献了带宽」，验证发生在链下服务网络而非出块共识 ｜ 相邻：[PoSpace](/zh/consensus/PoSpace)、[分层架构](/zh/layers/Layers)、[结算层](/zh/layers/Settlement) ｜ 详解：[带宽证明](/zh/consensus/BandwidthProof)
- **NPoS**：提名人把质押借给候选验证人，Phragmén 算法把质押在验证人间摊平 ｜ 相邻：[BABE 盲分配](/zh/consensus/BABE)、[波卡](/zh/chains/Polkadot)、[结算层](/zh/layers/Settlement) ｜ 详解：[NPoS](/zh/consensus/NPoS)
- **空间与时间证明**：PoSpace 用硬盘抽签、PoT 用 VDF 串行耗时保出块节奏，两种共识配合 ｜ 相邻：[PoT 时间证明](/zh/consensus/POT)、[Chia](/zh/chains/Chia)、[结算层](/zh/layers/Settlement) ｜ 详解：[PoSpace](/zh/consensus/PoSpace)
- **联盟链**：许可准入把「谁能记账」变成治理问题，用身份换确定性最终性与高吞吐 ｜ 相邻：[PoA](/zh/consensus/POA)、[Fabric 通道](/zh/consortium/Fabric)、[结算层](/zh/layers/Settlement) ｜ 详解：[联盟链](/zh/consortium/Consortium)

## 计算层：同一输入必得同一输出

- **确定性执行**：禁浮点、禁随机源、禁系统调用——重放一致是共识的前提 ｜ 相邻：[gas 计量](/zh/layers/Compute)、[重入](/zh/hacking/SmartContractVulnerabilities) ｜ 详解：[计算层](/zh/layers/Compute)
- **gas 计量**：把「无限循环」变成付费的有限步骤，停机问题的工程解 ｜ 相邻：[确定性执行](/zh/layers/Compute)、[粉尘攻击](/zh/hacking/DustingAttack) ｜ 详解：[计算层](/zh/layers/Compute)
- **重入**：外部调用在状态更新前再次进入，The DAO 2016 的教训 ｜ 相邻：[智能合约漏洞](/zh/hacking/SmartContractVulnerabilities)、[资源类型系统](/zh/layers/Compute) ｜ 详解：[计算层](/zh/layers/Compute)
- **预言机**：合约读到的外部事实不由共识保证，操纵发生在数据来源层 ｜ 相邻：[闪电贷](/zh/hacking/SmartContractVulnerabilities)、[结算层信任锚](/zh/layers/Settlement) ｜ 详解：[计算层](/zh/layers/Compute)
- **MEV**：排序权被搜索者提取，抢跑与夹击是结构性风险 ｜ 相邻：[公平排序](/zh/consensus/Hashgraph)、[女巫攻击](/zh/hacking/SybilAttack) ｜ 详解：[计算层](/zh/layers/Compute)
- **资源类型系统**：Move 把资产建模为线性资源，类型系统防复制与重入 ｜ 相邻：[重入](/zh/hacking/SmartContractVulnerabilities)、[EVM 兼容](/zh/chains/BinanceSmartChain) ｜ 详解：[计算层](/zh/layers/Compute)
- **合约升级与治理**：代理模式、时间锁、多签——「可维护面」就是攻击面 ｜ 相邻：[治理攻击](/zh/consensus/DPOS)、[桥攻击](/zh/hacking/CrossChainBridgeAttack) ｜ 详解：[计算层](/zh/layers/Compute)
- **排序与软确认**：排序器先给体验、L1 强制纳入兜底抗审查、欺诈/有效性证明定最终 ｜ 相邻：[确定性执行](/zh/layers/Compute)、[结算层](/zh/layers/Settlement)、[预言机](/zh/layers/Compute) ｜ 详解：[排序与结算](/zh/consensus/Sequencing)
- **DApp 四层**：前端→钱包→合约→索引器，状态在链上、查询走链下索引 ｜ 相邻：[确定性执行](/zh/layers/Compute)、[命名系统](/zh/layers/ServiceDiscovery)、[gas 计量](/zh/layers/Compute) ｜ 详解：[DApp 架构](/zh/dapp/Dapp)

## 存储层：数据在哪、还在不在

- **Merkle 树与状态根**：状态的根哈希被结算层承诺，轻节点凭根验证存在性 ｜ 相邻：[最终性](/zh/layers/Settlement)、[Merkle 证明](/zh/algo/MerkleTree)、[存储层](/zh/layers/Storage) ｜ 详解：[Merkle 树](/zh/algo/MerkleTree)
- **数据可用性（DA）**：轻节点用采样加纠删码确认「数据真的发布了」 ｜ 相邻：[状态爆炸](/zh/layers/Storage)、[模块化分层](/zh/layers/Layers)、[存储证明](/zh/consensus/PoST) ｜ 详解：[存储层](/zh/layers/Storage)
- **存储证明（PoRep/PoST）**：证明「拥有空间且持续持有」，把时间维度计入安全 ｜ 相邻：[PoSpace](/zh/consensus/PoSpace)、[PoST](/zh/consensus/PoST)、[存储层](/zh/layers/Storage) ｜ 详解：[PoST](/zh/consensus/PoST)
- **内容寻址与 pinning**：按内容哈希寻址天然防篡改，但没人 pin 就消失 ｜ 相邻：[NFT 元数据](/zh/nft/ColoredCoins)、[去中心化存储](/zh/layers/Storage) ｜ 详解：[存储层](/zh/layers/Storage)
- **状态爆炸**：全节点门槛越高能独立验证的人越少——存储层最隐蔽的失败 ｜ 相邻：[状态过期与无状态](/zh/layers/Storage)、[DA 采样](/zh/layers/Storage)、[Merkle 树](/zh/algo/MerkleTree) ｜ 详解：[存储层](/zh/layers/Storage)

## 服务发现：名字归谁、指向什么

- **命名系统**：把 0x 长地址换成人类可读名字，名字本身是链上资产 ｜ 相邻：[DNS 对标](/zh/layers/ServiceDiscovery)、[资产发行](/zh/nft/TokenizedProtocol) ｜ 详解：[服务发现](/zh/layers/ServiceDiscovery)
- **解析器**：链上记录没变但解析环节可被替换——服务发现失败的主模式 ｜ 相邻：[跨链解析](/zh/layers/ServiceDiscovery)、[同形字钓鱼](/zh/layers/ServiceDiscovery)、[账户模型](/zh/model/Account) ｜ 详解：[服务发现](/zh/layers/ServiceDiscovery)
- **跨链解析（ccip-read）**：解析走网关或预言机签名转发，信任链长一截 ｜ 相邻：[预言机](/zh/layers/Compute)、[解析器劫持](/zh/layers/ServiceDiscovery)、[跨链桥攻击](/zh/hacking/CrossChainBridgeAttack) ｜ 详解：[服务发现](/zh/layers/ServiceDiscovery)
- **治理与 root**：ENS root 多签与治理提案对标 ICANN——单点从机构变成合约 ｜ 相邻：[治理攻击](/zh/consensus/DPOS)、[商标争议](/zh/layers/ServiceDiscovery) ｜ 详解：[服务发现](/zh/layers/ServiceDiscovery)

## 横切线 A：账本与交易

- **UTXO**：一笔钱一个来源一个去向，余额是未花费输出之和 ｜ 相邻：[账户模型](/zh/model/Account)、[并行验证](/zh/consensus/POW) ｜ 详解：[UTXO 模型](/zh/model/UTXO)
- **账户模型**：一地址一余额一状态，智能合约的地基 ｜ 相邻：[UTXO](/zh/model/UTXO)、[状态爆炸](/zh/layers/Storage) ｜ 详解：[账户模型](/zh/model/Account)
- **DAG 账本**：交易组织成有向无环图，吞吐与确认并行 ｜ 相邻：[DAG 共识](/zh/consensus/Lachesis)、[DAG 账本](/zh/model/DAG) ｜ 详解：[DAG 模型](/zh/model/DAG)
- **受限脚本**：非图灵完备换可预测与可审计，Bitcoin Script 是原型 ｜ 相邻：[确定性执行](/zh/layers/Compute)、[EVM](/zh/layers/Compute) ｜ 详解：[OP_CHECKSIG](/zh/opcode/OP_CHECKSIG)
- **资产发行（NFT）**：token 身份在计算层，元数据在存储层，名字在服务发现 ｜ 相邻：[内容寻址](/zh/layers/Storage)、[命名系统](/zh/layers/ServiceDiscovery) ｜ 详解：[彩色币](/zh/nft/ColoredCoins)
- **央行数字货币**：央行发行、双层运营、可控匿名，法偿性替代链上共识做信任锚 ｜ 相邻：[联盟链](/zh/consortium/Consortium)、[账户模型](/zh/model/Account) ｜ 详解：[数字人民币](/zh/dcny/Dcny)
- **链游经济**：代币发行与消耗的设计空间，玩法-经济解耦换可持续性 ｜ 相邻：[资产发行（NFT）](/zh/nft/ColoredCoins)、[重入](/zh/hacking/SmartContractVulnerabilities) ｜ 详解：[链游经济](/zh/chain-games/Economy)

## 横切线 B：攻防

- **51% 重组**：算力过半即可重写历史，攻击边界是经济成本 ｜ 相邻：[最长链规则](/zh/consensus/GHOST)、[概率最终性](/zh/consensus/POW) ｜ 详解：[大算力攻击](/zh/hacking/51Attack)
- **长程攻击**：旧密钥从创世重造替代链，PoS 弱主观性的由来 ｜ 相邻：[弱主观性](/zh/consensus/POS)、[检查点](/zh/consensus/Gasper) ｜ 详解：[长程攻击](/zh/hacking/LongRangeAttack)
- **女巫攻击**：批量造身份打穿「一人一票」，票必须按资源加权 ｜ 相邻：[抗女巫机制](/zh/consensus/POW)、[UNL](/zh/consensus/RPCA) ｜ 详解：[女巫攻击](/zh/hacking/SybilAttack)
- **双花**：同一笔钱花两次，确认数与最终性都是它的防线 ｜ 相邻：[最终性](/zh/layers/Settlement)、[Finney 攻击](/zh/hacking/FinneyAttack) ｜ 详解：[双重花费攻击](/zh/hacking/DoubleSpendAttack)
- **跨链桥攻击**：信任传递通道的签名验证或权限漏洞，损失最大的一类 ｜ 相邻：[最终性 gadget](/zh/consensus/GRANDPA)、[合约升级](/zh/layers/Compute) ｜ 详解：[跨链桥攻击](/zh/hacking/CrossChainBridgeAttack)

## 三条读网主线

1. **资源换最终性**：算力（[PoW](/zh/consensus/POW)）→ 质押（[PoS](/zh/consensus/POS)）→ 身份（[PoA](/zh/consensus/POA)）→ 硬盘（[PoSpace](/zh/consensus/PoSpace)）→ 时间（[PoT](/zh/consensus/POT)）——每代共识换的是记账资源，不是投票方式。
2. **分叉与排序**：最长链（[比特币](/zh/chains/Bitcoin)）→ GHOST（[以太坊 PoW 期](/zh/consensus/GHOST)）→ 投票权重（[LMD-GHOST](/zh/consensus/Gasper)）→ DAG 定序（[Narwhal/Bullshark](/zh/consensus/NarwhalBullshark)）——排序方式从链到图。
3. **链上承诺与链下可取**：状态根（[Merkle 树](/zh/algo/MerkleTree)）→ DA 采样（[存储层](/zh/layers/Storage)）→ 存储证明（[PoST](/zh/consensus/PoST)）→ 内容寻址（[存储层](/zh/layers/Storage)）——「上链」与「可取」是两层的事。
