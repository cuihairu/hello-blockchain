# MaxBFT

MaxBFT 是蚂蚁链（AntChain）使用的共识算法，属于 HotStuff 风格的三阶段 BFT 共识的工程化变体，面向联盟链场景的高吞吐与低时延优化。

## 协议形态

- **三阶段投票**：与 HotStuff 一致，区块经历 `Prepare → Pre-commit → Commit` 三轮投票，每轮收集法定人数（QC, Quorum Certificate，$2f+1$ 签名聚合）。
- **链式流水线（Chained HotStuff）**：把三轮投票摊到连续的区块上——第 $k$ 个区块的 Prepare 投票同时充当第 $k-1$ 个区块的 Pre-commit、第 $k-2$ 个区块的 Commit，一票多用，显著降低通信轮数与时延。
- **leader 轮换**：视图超时即换主；新 leader 用最高的 QC（highQC）作为继续扩展的凭证。

## 与 PBFT 的差异

| 维度 | PBFT | MaxBFT/HotStuff 系 |
| --- | --- | --- |
| 视图切换 | 复杂的专用子协议 | 常态化：换 leader 即换视图 |
| 通信复杂度 | 每阶段全网广播 $O(n^2)$ | 签名聚合成 QC，leader 中继 $O(n)$ |
| 投票对象 | 三阶段分别投票不同消息 | 统一投"区块"，链式复用 |

## 在联盟链中的工程取舍

- 签名聚合需要门限签名（如 BLS），计算开销换网络开销，在几十至百节点规模收益明显。
- 与交易池、并行执行引擎配合（蚂蚁链的并行合约执行），实现万级 TPS。
- 类似实现还有长安链 ChainMaker 的 MaxBFT 模块（同为 HotStuff 链式变体）。
