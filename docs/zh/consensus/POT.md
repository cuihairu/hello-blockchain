# PoT

时间证明（Proof of Time, PoT）用**可验证延迟函数（VDF）**为网络生成不可预知、不可加速的随机源：证明者声明"我串行计算了 T 步"，任何人都能快速验证。Chia 中 PoT 与 [PoSpace](/zh/consensus/PoSpace) 组合：空间决定"谁能抽签"，时间证明决定"抽签结果何时揭晓、如何定序"。

## 四要素

- **在哪一层**：[结算层](/zh/layers/Settlement) —— 与 [PoSpace](/zh/consensus/PoSpace) 配对：空间决定谁能抽签，时间证明决定抽签何时揭晓、如何定序
- **解决什么**：为网络生成不可预知、不可加速的随机源——证明者声明「我串行计算了 T 步」（VDF），任何人都能快速验证，抽签结果无法被提前算出或研磨
- **解决得怎么样**：VDF 的串行性让 GPU/ASIC 加速基本无效，验证极快；代价是串行计算本身慢、挑战时长需要精心设计、构造对硬件假设敏感
- **出处**：Boneh、Bünz、Fisch《A Survey of Two Verifiable Delay Functions》2018；Chia 白皮书 2019；官方文档 [docs.chia.net/proof-of-time/](https://docs.chia.net/proof-of-time/)、[chia-blockchain 仓库](https://github.com/Chia-Network/chia-blockchain)

## VDF：可验证延迟函数

- **计算慢、验证快**：计算需要 T 次严格串行的运算（无法并行加速），验证只需一次轻量检查。
- 主流构造：**重复平方** $x^{2^T} \bmod N$，配合 Wesolowski/Pietrzak 增量证明把证明尺寸压到对数级。
- 性质保证：中间值无法跳步预测，攻击者无法"提前知道未来随机数"。

## 在 Chia 中的角色

1. 时间之主（Timelord）从上一个 slot 的挑战开始串行迭代 VDF，产出 slot 结束值与增量证明。
2. 该值作为下一 slot 矿工（农民）的空间证明挑战——**随机数在挑战公布前不可预知**，从而防止"预绘图/预谋出块"攻击。
3. VDF 时长固定 slot 时长，把"空间抽签"的节奏统一起来。

## 与 PoET 的区别

[PoET](/zh/consensus/PoET) 信任 Intel SGX 硬件来计时；PoT 的 VDF 是**数学上可公开验证**的延迟，无需信任任何硬件厂商——代价是 Timelord 需要较强的单线程性能（普通用户验证则很轻量）。

## 安全意义

- 阻断"研磨"（grinding）：验证人无法尝试多个分叉挑最有利的那个，因为未来挑战已被 VDF 锁定。
- 提供去偏随机信标，可用于出块人选择、leader 抽签等（与 RANDAO 类方案互补）。

## 时间之主（timelord）成本结构

PoT 的开销集中在时间之主一侧（官方文档口径）：

- **VDF 计算**：Chia 用「未知阶类群上的重复平方」，判别式 1024 比特、无需可信设置；证明用 Wesolowski 方案并拆成 1-64 个阶段并行生成（仅证明生成并行，计算本身严格串行）。
- **串行耗时**：每个 slot 的时间之主必须串行跑完 T 步 VDF 才能产出 slot 结束值——这要求较强的单线程性能，是时间之主的主要硬件门槛；普通节点做验证则很轻量。
- **链式结构（infusion）**：空间证明块与 VDF 输出交替串成一条线性链，前一个 VDF 的输出是下一个 VDF 的挑战——随机数在挑战公布前不可预知，从结构上封死「预绘图/预谋出块」。
