# GHOSTDAG

GHOSTDAG 是 Sompolinsky、Wyborski 与 Zohar 2018 年提出的 **BlockDAG 排序协议**：把中本聪共识从「单链」推广到「块的有向无环图（DAG）」——出块不再串成一条链，而是并发织成一张图，再由协议把图线性化成一笔不可逆的账。它是 [GHOST](/consensus/GHOST) 思想在 DAG 上的延伸，也是 Kaspa（GHOSTDAG 的首个生产实现）的共识基础。

## 四要素

- **在哪一层**：[结算层](/layers/Settlement) —— BlockDAG 上的出块与排序协议，PoW 系
- **解决什么**：最长链规则下并发块全部作废，出块越快浪费越大——吞吐被「单链串行」锁死。GHOSTDAG 让并发块都留在账本里，按图结构定序，吞吐随并发度提升
- **解决得怎么样**：论文给出形式化安全保证（排序在指数级小概率内不可逆）；Kaspa 主网实测亚秒出块、即时确认，2025-05-05 Crescendo 升级后从 1 BPS 提到 10 BPS；代价是 DAG 排序与 k 参数调优复杂，全节点内存与带宽开销高于单链，自私挖矿等攻击面仍在研究
- **出处**：Sompolinsky、Wyborski、Zohar《PHANTOM and GHOSTDAG: A Scalable Generalization of Nakamoto Consensus》（2018，[eprint 2018/104](https://eprint.iacr.org/2018/104)）；Kaspa 节点实现（[rusty-kaspa](https://github.com/kaspanet/rusty-kaspa)、[kaspad](https://github.com/kaspanet/kaspad)）

## 核心机制

- **从链到图**：每个块引用多个前驱（父块），块织成 DAG 而非单链。并发出块不再互相作废，而是都进入图。
- **k-簇（k-cluster）**：协议在 DAG 上找「k-簇」——一个块集合，其中每个块在集合外的邻居不超过 k 个。k 控制对并发块的容忍度：k 越大，能容纳的并发块越多，吞吐越高，但对攻击者的容忍也越大。
- **贪心线性化**：GHOSTDAG 用贪心算法把 k-簇内的块排成线性顺序（按 GHOST 式规则选块），得到全序账本。论文证明该排序在指数级小概率内不可逆。
- **PHANTOM 与 GHOSTDAG 的关系**：PHANTOM 是完整理论协议（把 Nakamoto 共识推广到 BlockDAG，规避安全-吞吐权衡），但需要解 NP 难问题；GHOSTDAG 是捕获 PHANTOM 精髓的高效贪心算法，可工程化。

## Kaspa：首个生产实现

- **设计目标**：PoW 加密货币，即时确认、亚秒出块时间，基于 PHANTOM 协议（[kaspad README](https://github.com/kaspanet/kaspad)）。
- **公平启动**：无预挖、无隐藏分配，每个币都可追溯回空创世块（[kaspa.org](https://kaspa.org/)）。
- **Crescendo 升级（2025-05-05）**：出块速率从 1 BPS 提升到 10 BPS，并引入多项 KIP（[rusty-kaspa README](https://github.com/kaspanet/rusty-kaspa)）。
- **节点实现**：Rust 版（rusty-kaspa）为推荐节点，Go 版（kaspad）已弃用。
- **主网上线日期**：未找到公开记录（上列官方来源只标协议与节点实现，未标主网日期）。

## 与同族协议的差异

| 协议 | 结构 | 并发块命运 | 典型用户 |
| --- | --- | --- | --- |
| 最长链（中本聪共识） | 单链 | 全部作废（孤块） | [比特币](/chains/Bitcoin) |
| [GHOST](/consensus/GHOST) | 单链 + 叔块引用 | 部分计入权重 | 以太坊 PoW 时期 |
| [Tangle](/consensus/IOTA) | DAG | tip 批准，低流量不收敛 | IOTA |
| GHOSTDAG | BlockDAG | 全部入图并定序 | Kaspa（见下文） |
| [Narwhal/Bullshark](/consensus/NarwhalBullshark) | DAG 内存池 + BFT | 可靠传播后定序 | [Sui](/chains/Sui) |

## 失败模式

- **k 参数的安全-吞吐权衡**：k 调大提升并发容忍，但攻击者能利用的并发空间也变大；参数选择是安全假设与吞吐的直接交换。
- **自私挖矿**：DAG 结构下攻击者扣块择机发布的收益模型与单链不同，论文与后续研究仍在完善分析。
- **全节点开销**：DAG 的存储、内存与带宽开销高于单链，节点门槛上升是去中心化压力。
- **主网级重大事故**：未找到公开记录。

GHOSTDAG 的贡献是**把「并发」从问题变成资源**：单链时代并发块是浪费，DAG 时代并发块是吞吐。它与 [Narwhal/Bullshark](/consensus/NarwhalBullshark) 的 DAG 内存池、[Lachesis](/consensus/Lachesis) 的异步 DAG 一起，构成了「账本从链到图」这条线的三个落点。
