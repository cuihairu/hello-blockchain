# SPoRA（Arweave）

Arweave 的共识从 PoW 演进到 **SPoRA**（Succinct Proofs of Random Access，2023 起）：底层机制是黄皮书命名的 **Proof of Access（PoA）**——挖矿必须证明「你能访问历史数据」。账本也不是链，而是 **blockweave**：每块链接前块与一个伪随机选出的 recall block，构成图。

## 四要素

- **在哪一层**：[结算层](/layers/Settlement)的存储变体 + [存储层](/layers/Storage)的激励闭环——共识资源就是「存了什么」
- **解决什么**：一次性付费、永久存储——用「随机挑战历史数据」使存储本身成为出块资源，让矿工自愿长期持有全网数据
- **解决得怎么样**：200+ 亿条数据在 weave 里被经济激励持有，存储成本下降由 Endowment 基金池平滑传导；代价是出块对磁盘 I/O 与随机访问敏感、Recall Chunk 验证使小矿工劣势明显；同一高度出两个块会被罚没奖励并吊销矿工地址。公开事故：未找到公开记录（共识层；2020 年曾因存储成本模型调整触发社区争议）
- **出处**：Arweave 黄皮书《Arweave: A Protocol for Economically Sustainable Information Access》（<https://www.arweave.org/whitepaper>）；开发文档「Cryptographic Proofs of Storage」（<https://docs.arweave.org/developers/development/overview>）

## 核心机制

- **blockweave**：每块引用前块 + 一个由「前块哈希 + 高度」确定的 recall block——出块必须访问随机的旧数据，「存得多、存得全」直接决定收益。
- **Recall Chunk 挑战**：每块只带一两个 256 KiB 的挑战块，伪随机取自全部历史——证明的是「随机位置你也持有」。
- **VDF 限速**：每秒一次可验证延迟函数检查点解锁挑战，使奖励追踪存储量而非检索速度——不能靠更快的磁盘抢答。
- **副本唯一性**：分区打包以矿工地址为种子，重复副本不获利——激励物理上不同的真实副本。
- **Endowment 基金**：用户一次性预付（按现价约 200 年存储），基金随时间向矿工支付复制证明费用；通胀 + 交易费 + 基金提取构成矿工三元收入。

## 与同族协议的差异

| 协议 | 关系 | 关键差异 |
| --- | --- | --- |
| [PoSpace](/consensus/PoSpace) | 同类（空间换共识） | PoSpace 证「拥有容量」，SPoRA 加了随机历史访问——「拥有」之外还要「可取回」 |
| [PoST](/consensus/PoST) | 同类（空间 + 时间） | PoST 用持续挑战证「一直持有」，SPoRA 用 recall chunk + VDF 达成类似目标，还叠加稀有数据偏好 |
| [PoW](/consensus/POW) | 前身 | Arweave 1.0 就是 PoW；PoA 把哈希算力换成「存储 + 访问」 |
| [GHOST](/consensus/GHOST) | 对照 | blockweave 的 fork choice 仍是类最重链，但每块多挂一个 recall 引用 |

## 失败模式

- **执行外包给客户端**：SmartWeave 合约用惰性求值，合约执行负担从节点转移到使用者——「共识不背执行」的极端形态。
- **永久承诺的宏观依赖**：200 年预付隐含「存储成本单调下降」假设，成本曲线反转时基金池会被提前耗尽（协议内置 redenomination 安全阀应对）。
- **矿工中心化于大盘**：3.6 TB 级分区与 I/O 竞争把小矿工推向边缘，副本多样性是安全模型的隐性前提。

> 源：meshio research（2026-10-13 合并）——机制细节、经济系统与出处章节对照取自 meshio 仓 `docs/research/comparable-chains.md` 的 Arweave 节。
