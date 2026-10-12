# RPCA

RPCA（Ripple Protocol Consensus Algorithm）是 XRP Ledger 的共识算法，由 Schwartz、Youngs、Britto 2014 年发表（比主网上线晚了两年——账本 2012 年就在跑了）。它不属于 BFT 三阶段投票那一族：验证人通过多轮「子轮」对**候选交易集**反复收敛，收到 80% 验证人认可的交易集即定案。

## 四要素

- **在哪一层**：[结算层](/layers/Settlement) —— UNL 式投票共识，无 BFT 三阶段、无质押、无算力
- **解决什么**：在已知验证人（UNL，Unique Node List）之间快速对交易集达成一致——不要挖矿、不要质押，秒级出块且确定
- **解决得怎么样**：3-5 秒确定账、能耗近零、手续费极低，XRP Ledger 主网 2012 年运行至今；代价是安全性完全压在 UNL 配置健康上——各家的 UNL 若不重叠共识会分叉，而默认 UNL 长期由 Ripple 与 XRP Ledger Foundation 主导，中心化争议不断
- **出处**：Schwartz、Youngs、Britto《The Ripple Protocol Consensus Algorithm》2014（主网 2012 已运行）

## 核心机制

- **UNL（Unique Node List）**：每个节点自己维护一份信任的验证人名单。共识只在 UNL 成员之间进行。
- **候选交易集多轮收敛**：每轮（子轮）节点把自己收到的交易候选集广播，按 UNL 内多数意见逐步剔除分歧交易，几轮后集合收敛。
- **80% 阈值**：一笔交易要进入定案账本，需要 80% 的 UNL 验证人认可。作恶节点要超过 20% 才能作梗，超过 40% 才能双花。
- **确定账本**：定案的账本不可回滚（无需确认数等待），这与 PoW 的概率最终性完全不同。

## 与同族协议的差异

| 协议 | 关系 | 关键差异 |
| --- | --- | --- |
| [PBFT](/consensus/PBFT) | 同类（许可投票） | PBFT 三阶段投票 per 提案，RPCA 对交易集多轮收敛 |
| [FBA](/consensus/FBA) | 直系亲属 | FBA（Stellar SCP）把 UNL 泛化为节点自选仲裁切片；RPCA 依赖固定 UNL 列表 |
| [PoA](/consensus/POA) | 对比 | PoA 靠身份轮流签名出块，RPCA 还要对交易内容投票收敛 |
| [Tendermint](/consensus/Tendermint) | 对比 | Tendermint 用质押加权投票，RPCA 用无权重 UNL 投票 |

## 失败模式

- **UNL 配置即安全**：UNL 不重叠的节点组会各自定案、分叉成两个事实。2021 年学术研究（Grace、Angel 等）指出 XRPL 实际运行的 UNL 高度重叠且由少数主体推荐，抗分区能力被高估。
- **无惩罚机制**：作恶验证人不会被罚没——退出名单就是全部手段，经济上没有出肉。
- **中心化的治理现实**：默认 UNL 由 Ripple 与 XRPL Foundation 提供，改良方案（dUNL 等）多年推进缓慢。
- **80% 阈值的边界**：UNL 内作恶 20%~40% 之间可阻塞共识（活性失效）而不被双花惩罚，DoS 式阻塞比偷账更容易。

RPCA 是「效率优先、信任收窄」路线的代表作：**把开放问题简化为名单问题，性能立刻起飞，代价是去中心化叙事要重新讲**。它与 Stellar 的分化（固定 UNL → 自选切片）本身就是一次有趣的协议演化实验。
