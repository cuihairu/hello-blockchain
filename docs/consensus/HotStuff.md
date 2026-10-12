# HotStuff

HotStuff（The 3rd-generation Practical Byzantine Fault Tolerant Protocol）是 Yin、Malkhi 等人 2019 年提出的第三代实用 BFT 协议，被 [DiemBFT](/consensus/DiemBFT)、AptosBFT、[MaxBFT](/consensus/MaxBFT)、[TBFT](/consensus/TBFT) 等当作理论源引用。它的核心贡献只有一个：把稳态下的通信复杂度从经典 BFT 的 $O(n^2)$ 降到 $O(n)$。

## 四要素

- **在哪一层**：[结算层](/layers/Settlement) —— HotStuff 家族三阶段 BFT，是 DiemBFT、AptosBFT、MaxBFT、TBFT 的直系祖先
- **解决什么**：经典 BFT 稳态下每轮都要全网两两交换消息，节点数一上去吞吐就崩——用 QC（法定人数证书）聚合 $2f+1$ 张签名，让投票可以链式流水线
- **解决得怎么样**：线性通信复杂度 + 线性视图切换，理论性能是第三代 BFT 的标杆；代价是 QC 依赖签名聚合原语的正确性、三阶段流水线实现复杂、需要密码学上的可验证签名与阈值聚合支持
- **出处**：Yin、Malkhi、Reiter、Gafni、Abraham《HotStuff: BFT Consensus with Linearity and Responsiveness》CCS 2019

## 为什么经典 BFT 上不了规模

[PBFT](/consensus/PBFT) 的三阶段投票里，每个节点都要向其他所有节点发消息，一轮就是 $O(n^2)$。$n=100$ 时每轮 1 万次消息，$n=1000$ 时变成 100 万次——联盟链里 100 个节点都嫌重。HotStuff 要解决的就是这个。

## 核心机制：QC 与流水线

- **QC（Quorum Certificate，法定人数证书）**：把 $2f+1$ 张签名聚合成一个可验证对象。验证者拿到 QC 不必重新收齐 $2f+1$ 张票，验证一个聚合对象就够了。
- **链式流水线**：上一轮的 QC 成为下一轮投票的前提。prepare → commit → decide 三个阶段串起来，每轮只依赖上一轮的 QC，不用每轮重新全网握手。
- **线性视图切换**：leader 失效时，新 leader 上任所需的消息数也是 $O(n)$，不是 PBFT 视图切换的 $O(n^2)$。
- **可验证签名聚合**：QC 的聚合要求签名可被压缩成固定长度且可验证——这是 HotStuff 能保持线性复杂度的密码学前提。

## 与同族协议的差异

| 协议 | 关系 | 关键差异 |
| --- | --- | --- |
| [PBFT](/consensus/PBFT) | HotStuff 的上一代 | $O(n^2)$ 通信，PBFT 是奠基、HotStuff 是规模化解法 |
| [MaxBFT](/consensus/MaxBFT) | HotStuff 的工程化 | 面向联盟链做延迟优化与视图切换工程化 |
| [DiemBFT](/consensus/DiemBFT) | HotStuff 变体 | 与 Narwhal 内存池配套，执行与共识解耦 |
| [Tendermint](/consensus/Tendermint) | 并行路线 | Tendermint 用质押加权 + BFT 投票，HotStuff 用 QC 线性化通信 |
| [TowerBFT](/consensus/TowerBFT) | 并行路线 | TowerBFT 靠 PoH 时序压缩消息，HotStuff 靠 QC 聚合 |

## 落地与边界

HotStuff 的理论性能已经被多个工程实现验证，但它的安全性完全依赖 QC 的聚合签名原语正确——如果签名聚合可被伪造或绕过，整条链的最终性就失效。这也是为什么用 HotStuff 的实现都配了独立的密码学审查与视图切换的冗余设计。
