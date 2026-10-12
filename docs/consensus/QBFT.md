# QBFT

QBFT（Quorum Byzantine Fault Tolerant，又称 Istanbul BFT）是以太坊客户端生态里的许可链 BFT 共识，Quorum 的默认共识、Hyperledger Besu 里 Clique 引擎的 BFT 模式。它把 [PBFT](/consensus/PBFT) 式三阶段投票裁剪到「身份已知、节点数少」的许可网络，目标只有一个：低延迟。

## 四要素

- **在哪一层**：[结算层](/layers/Settlement) —— 许可链的 BFT 变体，节点身份预先授权
- **解决什么**：把 BFT 裁剪到许可网络——节点数少、身份已知、可追责，于是可以省掉开放网络的抗女巫成本，把通信与投票直接压到最低延迟
- **解决得怎么样**：在几十节点规模下延迟稳定、生态成熟（Quorum、Besu Clique BFT 模式、Geth 的 QBFT 引擎）；代价是高度依赖许可身份、节点规模上限受 BFT 通信复杂度限制、不同客户端的参数与实现有差异
- **出处**：Consensys《Istanbul BFT Consensus Algorithm》规范 2019；Hyperledger Besu Clique 文档

## 核心机制

- **预先授权验证人**：出块资格由合约或配置里的验证人名单决定，不参与「谁有资格」的竞争。
- **三阶段投票**：commit 阶段投票，1/3 阈值达成才进入下一轮；2/3 达成才最终确认。
- **出块顺序**：验证人按顺序轮流提案，作恶或掉线由下一位跳过（skip block），不需要动态重排。
- **无难度、无工作量**：没有 [PoW](/consensus/POW) 式的哈希竞争，也没有 [PoS](/consensus/POS) 式的经济押注——安全性来自身份与法律追责。

## 与同族协议的差异

| 协议 | 关系 | 关键差异 |
| --- | --- | --- |
| [PBFT](/consensus/PBFT) | QBFT 的理论源 | PBFT 是通用三阶段，QBFT 裁剪到许可网络的简化版 |
| [Tendermint](/consensus/Tendermint) | 同类（三阶段 BFT） | Tendermint 用质押加权投票，QBFT 用固定验证人名单 |
| [MaxBFT](/consensus/MaxBFT) | 同类（许可链 BFT） | MaxBFT 是 HotStuff 工程化、QBFT 是 PBFT 工程化，消息模式不同 |
| [PoA](/consensus/POA) | 相邻 | PoA 只靠身份出块，QBFT 在此基础上加投票确认 |

## 失败模式

- **节点规模上限**：BFT 通信复杂度仍是瓶颈，QBFT 的实测吞吐在节点数上百时明显下降。
- **验证人名单变更是治理动作**：进出验证人要走合约或配置流程，名单本身成为单点。
- **实现差异**：Besu、Geth、Quorum 的 QBFT 参数（超时、超时倍数、跳过阈值）不完全一致，跨客户端迁移要逐个对齐。
- **身份即安全假设**：许可网络的「身份可信」假设一旦失效（内部作恶、密钥泄露），QBFT 没有任何经济或密码学层面的补救。

QBFT 的价值在于它是**许可网络里的 BFT 基线**——当节点身份已知、节点数在几十量级、延迟要求严格时，QBFT 是最少工程成本的选择。
