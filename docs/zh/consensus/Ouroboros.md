# Ouroboros

Ouroboros 是 Cardano 的权益证明共识，第一个有严格密码学安全证明的 PoS 协议。它把「出块权按质押权重随机分配」这件事从「听起来合理」变成了「有数学证明」——之前 PoS 的安全性论证一直是非形式化的。

## 四要素

- **在哪一层**：[结算层](/zh/layers/Settlement) —— PoS 的严格证明版本，epoch/slot + VRF 选主
- **解决什么**：给 PoS 配上可形式化的安全证明——按质押权重随机选人出块，安全性可被数学证明而非仅靠经验
- **解决得怎么样**：第一个有严格安全证明的 PoS，Cardano 主网 2017 年起运行；代价是 epoch/slot 参数设计复杂、VRF 的正确性是门票、最终性是概率性的（需额外最终性机制）
- **出处**：Kiayias、Das、Elahi 等《Ouroboros: A Provably Secure Proof-of-Stake Blockchain Protocol》CRYPTO 2017；Cardano 白皮书与规范

## 与早期 PoS 的区别

早期 PoS（[Peercoin](/zh/consensus/POS) 2012、[Nxt](/zh/consensus/POS) 2013）用「币龄」决定出块权——谁的币龄长谁优先。币龄是确定性的，可被预测与操纵。Ouroboros 换成 **VRF 随机抽签**：出块权按质押权重分配，但具体谁出块是随机的、不可预知的。

## 核心机制

- **epoch 与 slot**：时间被切成 epoch，epoch 内切成 slot。每个 slot 独立抽签一个 slot leader。
- **VRF 选主**：slot leader 由 VRF 抽签决定，按验证人的总质押权重分配概率。被抽中前无人知道。
- **epoch 内随机化**：每个 epoch 重新随机化 slot leader 序列，避免长期预知。
- **k 参数与诚实假设**：安全性证明假设诚实验证人的质押占比超过某个阈值（$1/2$ 以上），低于阈值时安全性降级。

## Ouroboros 家族

| 变体 | 特点 |
| --- | --- |
| Ouroboros Genesis | 初始设计，epoch 内 leader 序列预计算 |
| Ouroboros Praos | 当前主网版本，VRF 完全盲化、无预计算 |
| Ouroboros Genesis + | 改进的随机化 |
| Ouroboros Cresset | 引入最终性 gadget（Ouroboros Coda 系） |

## 与同族协议的差异

| 协议 | 关系 | 关键差异 |
| --- | --- | --- |
| [Algorand](/zh/consensus/Algorand) | 同类（VRF 选主） | Algorand 用 BA\* 协议选主并投票，Ouroboros 只做出块、最终性靠概率 |
| [BABE](/zh/consensus/BABE) | 同类（VRF 选主） | BABE 出块、GRANDPA 定案；Ouroboros 出块与最终性在同一套规则里 |
| [Gasper](/zh/consensus/Gasper) | 同类（PoS + BFT） | Gasper 用 BFT 投票给确定性最终性，Ouroboros 最终性仍是概率性的 |

## 失败模式

- **诚实假设边界**：安全性证明依赖诚实质押占比高于阈值。若作恶者质押超过 $1/2$，安全性无保证——这和 PoW 的 51% 问题同构。
- **VRF 正确性**：抽选用 VRF，VRF 的密码学假设破裂意味着出块权可被伪造。
- **概率最终性**：与 PoW 一样，最终性是概率性的（回滚概率随确认数下降），不是确定性的。
- **epoch 边界攻击**：epoch 切换时刻是攻击窗口，验证人状态与 leader 序列的更新需严格同步。

Ouroboros 的价值不在「更快」或「更便宜」，而在**第一次让 PoS 的安全性有数学证明**——这给整个 PoS 家族提供了一个可验证的基准。
