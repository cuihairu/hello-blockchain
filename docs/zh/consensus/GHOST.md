# GHOST

GHOST（Greedy Heaviest Observed Subtree，贪婪最重可观测子树）是 Sompolinsky 与 Zohar 2013 年提出的**分叉选择规则**——不是完整共识协议，而是回答「分叉时选哪条链」的一条规则。经典应用是以太坊 2015-2022 年用的简化版 GHOST，以及 Merge 后演化的 [LMD-GHOST](/zh/consensus/Gasper)。

## 四要素

- **在哪一层**：[结算层](/zh/layers/Settlement) —— 分叉选择规则，与任意出块机制组合使用
- **解决什么**：最长链规则把分叉块（叔块）直接丢弃——分叉越多，浪费的算力越多，且大矿池在主链上的相对优势越大（中心化压力）。GHOST 把分叉块也算进权重，选「子树最重」的分支
- **解决得怎么样**：让更短的出块间隔变得可行（以太坊 15 秒 vs 比特币 10 分钟），分叉算力不再纯浪费（以太坊的叔块奖励）；代价是完整版 GHOST 实现复杂，以太坊用的是删减版，只保留「最近 7 层的子树权重」
- **出处**：Sompolinsky、Zohar《Accelerating Bitcoin's Transaction Processing》2013；《Secure High-Rate Transaction Processing in Bitcoin》FC 2015；以太坊黄皮书（简化版）

## 核心机制

- **最长链 vs 最重子树**：最长链规则比较链的长度（累计难度），GHOST 从创世往下走，每个分叉点选择「包含分叉块在内的累计难度最大的子分支」。
- **分叉块不浪费**：被落选的块作为叔块（uncle）进入主链区块的引用列表，拿部分奖励——攻击者分叉的期望收益进一步降低。
- **出块间隔与中心化**：出块越快分叉越多，最长链规则下快链的「有效算力」流失越严重，小矿池更吃亏（激励倒逼中心化）；GHOST 把分叉算力计回子树，缓解了这个问题。

## 家族与演化

| 变体 | 说明 |
| --- | --- |
| GHOST 原版（2013/2015） | 递归选最重子树，论文含安全证明 |
| 以太坊简化版 GHOST | 只在最近 7 层内计叔块权重，工程取舍 |
| [LMD-GHOST](/zh/consensus/Gasper) | Merge 后的信标链分叉选择：按验证人**最新消息**的投票权重选子树，GHOST 思想 + PoS 投票 |
| PHANTOM / SPECTRE | GHOST 思想在 DAG 上的推广（DAG 排序与吞吐） |

## 与同族规则对比

| 规则 | 权重来源 | 典型用户 |
| --- | --- | --- |
| 最长链（中本聪共识） | 累计难度/累积工作量 | [比特币](/zh/chains/Bitcoin)、Litecoin |
| GHOST | 子树累计难度（含分叉块） | 以太坊 PoW 时期（简化版） |
| LMD-GHOST | 验证人最新投票权重 | 以太坊信标链（见[Gasper](/zh/consensus/Gasper)） |
| GHOST+GRANDPA | 验证人前缀投票 | [Polkadot](/zh/chains/Polkadot)（见[GRANDPA](/zh/consensus/GRANDPA)） |

## 失败模式

- **删减版的安全边界**：以太坊只数最近 7 层的叔块，「7 层之外的算力」不被计入，理论性质与原版有差距。
- **叔块机制被滥用**：叔块奖励曾被用来「走私」额外出块收益，后来以太坊降低了叔块奖励系数。
- **LMD-GHOST 的投票攻击面**：最新消息驱动对「投票历史」敏感，验证人被诱导在错误分支投票会放大分叉（见[Gasper](/zh/consensus/Gasper)）。

GHOST 的贡献是**把「分叉」从浪费变成信号**：分叉块也算权重，快出块从「自毁」变成「可行」。今天所有「选最重分支」的规则——从 LMD-GHOST 到 DAG 排序——都是它的后代。
