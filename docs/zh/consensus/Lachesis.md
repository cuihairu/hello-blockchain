# Lachesis

Lachesis 是 Fantom（现 Fantasma）的异步拜占庭容错（aBFT）共识。它的核心特征是**没有固定出块周期**——验证人可以随时产出微块（micro-block），最终化由 DAG 拓扑与投票权重的演化决定，由「超级区块」（super-checkpoint）标记的不可逆前缀。

## 四要素

- **在哪一层**：[结算层](/zh/layers/Settlement) —— 异步 BFT 的 DAG 形态，无固定出块周期
- **解决什么**：让出块与最终化在异步网络里自然发生——不强制固定出块周期，最终化由 DAG 拓扑与投票权重的演化决定，节点随时可产块
- **解决得怎么样**：无固定周期降低了延迟与网络抖动影响，节点数不受全网广播投票约束；代价是最终化规则对 DAG 拓扑与投票权重参数敏感、活性依赖超级检查点机制、2022 年曾出现验证人投票冲突与链分裂
- **出处**：Fantom《Lachesis Protocol》白皮书 2019；Fantom 开发文档（Agoric 协议规范）

## 核心机制

- **DAG 出块**：验证人随时可以产出一个微块（micro-block），把之前的所有微块当父节点串成有向无环图，不强制等时间槽。
- **超级检查点（super-checkpoint）**：DAG 演化到「投票权重稳定」时，网络推导出一个不可逆前缀，叫一个 super-checkpoint。最终化不依赖固定投票轮次。
- **异步假设**：Lachesis 不依赖超时同步假设，理论上可在完全异步的网络里安全且活跃——这是它区别于 [PBFT](/zh/consensus/PBFT) 与 [Tendermint](/zh/consensus/Tendermint) 的关键。
- **权重投票**：验证人按质押权重投票，投票通过 DAG 拓扑继承——给父节点投票隐式覆盖子节点。

## 与同族协议的差异

| 协议 | 关系 | 关键差异 |
| --- | --- | --- |
| [HoneyBadgerBFT](/zh/consensus/HoneyBadgerBFT) | 同类（异步 BFT） | HoneyBadgerBFT 用阈值加密与共享随机实现异步原子广播，Lachesis 用 DAG 拓扑推导最终化 |
| [Snowman](/zh/consensus/Snowman) | 相邻 | Snowman 用概率投票串线性链，Lachesis 在 DAG 上直接推最终化 |
| [TowerBFT](/zh/consensus/TowerBFT) | 并行路线 | TowerBFT 靠 PoH 时序压缩消息，Lachesis 靠异步 DAG 拓扑 |
| [Algorand](/zh/consensus/Algorand) | 相邻（无固定周期） | Algorand 用 BA\* 轮次出块，Lachesis 无固定轮次 |

## 失败模式

- **超级检查点推导的参数敏感**：DAG 拓扑与投票权重的演化决定何时推超级检查点，参数设置不当会让最终化延迟甚至停滞。
- **2022 年验证人投票冲突**：Fantom 曾出现验证人集与投票冲突导致的分叉与重启，教训是「异步假设」的工程边界比理论模型窄。
- **验证人投票继承的副作用**：父节点投票覆盖子节点时，作恶者可以通过精心构造 DAG 拓扑放大自己的投票权重。
- **无固定周期对客户端的影响**：钱包、RPC 与状态同步都要处理「不定时产出」的模型，生态工具链适配成本更高。

Lachesis 的价值是**异步 BFT 在公链上的一次工程尝试**——它演示了「不设出块周期」的可行性，也演示了工程边界远比理论模型窄。
