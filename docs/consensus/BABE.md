# BABE

BABE（Blind Assignment for Blockchain Extension）是 Polkadot 的出块协议，与最终性 gadget [GRANDPA](/consensus/GRANDPA) 配对。它的核心想法是把出块权分配做成**随机且不可预知**的：每个 slot（时间槽）用 VRF 抽签决定谁来出块，被抽中之前没有人知道。

## 四要素

- **在哪一层**：[结算层](/layers/Settlement) —— Polkadot 的出块协议，随机 leader 分配
- **解决什么**：用 VRF + 随机槽把出块权分配给验证人，避免可预知的 leader 轮替——leader 分配「盲」，被抽中前无人知道，无法针对性攻击
- **解决得怎么样**：与 GHOST 配合产生分叉树、再由 GRANDPA 最终化，出块频率可以远高于最终化频率；代价是 VRF 的正确性是门票、出块与最终性分离增加状态复杂性、空槽（missed slots）需处理
- **出处**：Gavin Wood《Polkadot 白皮书》2016；BABE 规范 2020（Parity/Polkadot 文档）

## 核心机制

- **随机槽（slot）**：网络按固定时长切分为连续 slot。每个 slot 独立抽签，决定该 slot 由谁出块。
- **盲分配**：抽签用 VRF（可验证随机函数），抽签结果在出块时揭示，验证前无法预知。无法针对某个验证人预谋攻击。
- **可空槽**：某个 slot 抽不到验证人时，该 slot 为空。允许空槽让出块频率自然浮动，不用强制每秒出块。
- **分叉树**：多个验证人在同一 slot 出块会产生分叉，分叉树由 GHOST 规则选择，最终由 GRANDPA 定案。

## 与同族协议的差异

| 协议 | 关系 | 关键差异 |
| --- | --- | --- |
| [GRANDPA](/consensus/GRANDPA) | 配对（最终性 gadget） | BABE 出块、GRANDPA 定案，二者独立 |
| [Casper FFG](/consensus/Gasper) | 同类（出块 + 最终性） | FFG 出块与投票在同一套规则里，BABE 与 GRANDPA 分离 |
| [TowerBFT](/consensus/TowerBFT) | 同类（leader 分配） | TowerBFT 由 PoH 时序决定 leader，BABE 由 VRF 抽签 |
| [Ouroboros](/consensus/Ouroboros) | 同类（VRF 选主） | Ouroboros 是 Cardano 的 PoS，VRF 用途相同但参数体系不同 |

## 失败模式

- **VRF 可被伪造**：BABE 的安全完全依赖 VRF 的正确性——验证人伪造抽签结果就能伪造出块权。VRF 的密码学假设一旦破裂，出块协议直接失效。
- **空槽过多**：网络延迟或验证人性能不足导致空槽比例过高，出块频率下降，但不出问题。
- **出块与最终化节奏不匹配**：出块可以很快，但 GRANDPA 最终化有独立周期。用户看到的「已出块」与「不可逆」可能相差数十秒——钱包要分别处理。
- **slot 边界攻击**：验证人若在 slot 边界做文章（如延迟提交），可能影响分叉树的选择。

BABE 的关键贡献是**把「谁来出块」变成可验证的随机事件**，而不是「按权重轮流」。这让 Polkadot 的出块节奏自然浮动，同时保持抗针对性攻击的能力。
