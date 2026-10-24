# Multi-Level BFT（Theta）

Theta 的 **Multi-Level BFT** 把 BFT 拆成两级：小规模**验证者委员会**（20–30 个企业节点）用 PBFT 式投票高速出块，数千个社区 **guardian** 节点对周期性检查点做 BLS 聚合签名——超 2/3 聚合签名即终局整条链。委员会管吞吐，guardian 管安全底线。

## 四要素

- **在哪一层**：[结算层](/zh/layers/Settlement) —— 两级 BFT：委员会出块 + guardian 检查点终局（与[最终性 gadget](/zh/consensus/GRANDPA) 同思路，但两级都在协议内）
- **解决什么**：视频微支付需要「高吞吐 + 上一段确认后才发下一段」的快速最终性，同时不想让共识权收缩到 20 个节点——用第二级把去中心化补回来
- **解决得怎么样**：主网稳定运行多年、1,000+ TPS 与亚秒级确认支撑了视频场景；代价是验证者委员会实质由 Google、Samsung、Sony、Binance 等企业运营（许可味浓）、guardian 层的实际制衡力未经受过大考验。公开事故：未找到公开记录
- **出处**：Theta 白皮书 2.0《Theta Blockchain Whitepaper 2.0》Multi-Level BFT 章节；Mainnet 3.0 白皮书（Uptime Mining、Proof-of-Relay）；Theta 官方文档（<https://docs.thetatoken.org/>）

## 核心机制

- **委员会出块**：验证者每 epoch 轮换 proposer、PBFT 式三阶段投票 + commit certificate 结算区块——白皮书自述类似 Casper FFG 与 HotStuff 的混合。
- **guardian 检查点**：guardian 对最新检查点块哈希做 BLS 签名，经聚合签名 gossip 传播（O(log n) 消息），>2/3 即终局；guardian 池是委员会的超集，委员会失守可重选。
- **Uptime Mining（Mainnet 3.0）**：Elite Edge Node 对检查点哈希签名，签名份额进入聚合检查点即证明在线——「在线时长」变成密码学可验的计量凭据，参与 TFUEL 奖励分成。
- **Proof-of-Relay**：边缘节点提交中继数据量的哈希证明，按中继量与新近窗口分享平台支付。
- **边缘层抗女巫**：TFUEL 质押 + 28,800 块提款等待期，让节点跳槽攻击的成本高企。

## 与同族协议的差异

| 协议 | 关系 | 关键差异 |
| --- | --- | --- |
| [Gasper](/zh/consensus/Gasper) | 同构（出块 + 终局分层） | Gasper 两级都是全体验证人；Multi-Level BFT 的第一级是小委员会、第二级是社区 guardian |
| [GRANDPA](/zh/consensus/GRANDPA) | 同类（检查点终局） | GRANDPA 对链前缀投票，guardian 对单检查点哈希做 BLS 聚合 |
| [PBFT](/zh/consensus/PBFT) | 第一级内核 | 委员会就是 PBFT 式投票，规模 20–30 |
| [DPOS](/zh/consensus/DPOS) | 对照 | DPoS 用质押选出代表出块；Theta 的第二级 guardian 是额外安全网而非选举替代 |

## 失败模式

- **委员会的许可性**：验证者是 20–30 家企业节点，去中心化承诺主要压在 guardian 层——而 guardian 层从未独立处理过委员会集体作恶的实例。
- **BLS 聚合的密钥管理**：数千 guardian 的签名份额聚合，密钥安全与参与率决定检查点活性。
- **经济双轨**：THETA 固定供应 10 亿、TFUEL 通胀 + 燃烧（边缘支付至少烧 25%）——双代币平衡是持续治理问题。

> 源：meshio research（2026-10-13 合并）——两级结构、Uptime Mining 与经济机制取自 meshio 仓 `docs/research/comparable-chains.md` 的 Theta 节。
