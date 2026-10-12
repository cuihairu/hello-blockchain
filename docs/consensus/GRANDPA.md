# GRANDPA

GRANDPA（GHOST-based Recursive ANcestor Deriving Prefix Agreement）是 Polkadot 的最终性 gadget，与出块协议 [BABE](/consensus/BABE) 分离。它只负责回答一个问题：**哪个前缀不可逆**。出块、分叉选择由别的组件完成。

## 四要素

- **在哪一层**：[结算层](/layers/Settlement) —— Polkadot 的最终性 gadget，与出块协议 BABE 分离
- **解决什么**：把「出块」与「最终性」拆成两个独立组件——出块可以快、可以分叉，最终性由单独的投票层补上；gadget 可替换、可升级
- **解决得怎么样**：最终性独立于出块协议，Polkadot 的出块频率可以远高于最终化频率；代价是 gadget 要单独运行与验证、最终化延迟由投票周期决定、最终化停摆时链还在出块（活性与最终性解耦的副作用）
- **出处**：Gavin Wood《Polkadot 白皮书》2016；GRANDPA 规范 2020（Parity/Polkadot 文档）

## 为什么要把最终性拆出来

[以太坊 Gasper](/consensus/Gasper) 把分叉选择（LMD-GHOST）与最终性（Casper FFG）组合在同一条链上。Polkadot 走得更远：**出块协议与最终性 gadget 完全独立**。BABE 用 VRF 抽签出块，GRANDPA 只对前缀投票定案。两者可以各自升级、各自替换——这是「模块化共识」的典型形态。

## 投票机制

- 验证人对「自己见到的最高区块」投票，而不是对每个块投票——一张票覆盖到创世的前缀。
- 投票按 GHOST 规则累加：一条边获得 2/3 验证人投票，该边以下的前缀就被最终化。
- 投票是递归的——验证人投票时带上自己见到的最高祖先链，一张票隐式覆盖整条链的前缀。

## 与同族协议的差异

| 协议 | 关系 | 关键差异 |
| --- | --- | --- |
| [Casper FFG](/consensus/Gasper) | 同类（最终性 gadget） | FFG 只对检查点投票，GRANDPA 对前缀投票、一次定案一大段 |
| [BABE](/consensus/BABE) | 配对（出块协议） | BABE 出块、GRANDPA 定案，二者独立运行 |
| [Tendermint](/consensus/Tendermint) | 并行路线 | Tendermint 出块即最终化，Polkadot 把两件事分开 |

## 失败模式

- **最终化停摆**：验证人离线或网络分区时，GRANDPA 无法达到 2/3 投票，链还在出块但没有任何块被最终化——用户看到的是「确认消失」。
- **投票冲突**：投票权重的累加对投票顺序敏感，边界情况下可能出现「两个前缀都接近 2/3」的中间态。
- **与出块解耦的副作用**：出块快、最终化慢，用户要区分「链上出现了」与「不可逆了」两件事——钱包与交易所的确认逻辑要分别处理。

GRANDPA 的设计哲学与 HotStuff 一致——**用一次投票覆盖一段前缀**降低通信成本，但 GRANDPA 把这个思路推到了极端：一张票隐式覆盖整条链。
