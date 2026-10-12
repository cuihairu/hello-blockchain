# Snowman

Snowman 是 Avalanche 平台的**线性链共识**：在 Snowball 概率投票之上，给交易一个全序（先谁后谁），并把这套共识用在 C-Chain（EVM）与 P-Chain（验证人管理）上。它和 [Snowball](/consensus/Snowball) 的关系是：Snowball 是投票引擎，Snowman 是把它串成一条链的使用方式。

## 四要素

- **在哪一层**：[结算层](/layers/Settlement) —— Avalanche 的线性链共识，投票引擎是 Snowball 概率共识
- **解决什么**：概率共识本身只回答「这笔交易大家同不同意」，不回答「它排在谁前面」——Snowman 在概率投票上补一个全序，让 EVM 这类需要严格顺序的执行环境能跑在上面
- **解决得怎么样**：与亚采样投票配合，出块快、确认快，支撑 C-Chain 的智能合约负载；代价是最终性仍是概率性的、线性链吞吐受 EVM 执行能力约束、与 X/P/C 三链并存的架构需要跨链桥接
- **出处**：Team Rocket《Scalable and Probabilistic Leaderless BFT Consensus through Metastability》2018（Snowman 章节）；Ava Labs 平台白皮书 2020

## 核心机制

- **线性化**：Snowball 的亚采样投票决定「同意/不同意」，Snowman 给交易序列化——每笔交易被放进一个确定的区块位置，前后顺序全网一致。
- **父子继承**：一个区块获得多数票，它的所有祖先也随之被确认——投票一次覆盖整条前缀，不用逐块投票。
- **与三链并存**：X-Chain（资产交换，DAG 形态）、P-Chain（验证人/子网管理）、C-Chain（EVM，线性链）三链并用，Snowman 服务于需要全序的后两者。

## 与同族协议的差异

| 协议 | 关系 | 关键差异 |
| --- | --- | --- |
| [Snowball](/consensus/Snowball) | 投票引擎 | Snowball 只做「同意与否」，Snowman 在其上排全序 |
| [Avalanche](/consensus/Avalanche) | 平台 | Avalanche 是三链平台，Snowman 是其中线性链部分的共识 |
| [Gasper](/consensus/Gasper) | 同类（PoS + 最终性） | Gasper 用 BFT 投票给确定性最终性，Snowman 最终性是概率性的 |
| [Lachesis](/consensus/Lachesis) | 同类（DAG → 线性化） | Lachesis 用 DAG 拓扑推最终化，Snowman 用概率投票串链 |

## 失败模式

- **概率最终性**：与所有概率共识一样，「已确认」只是回滚概率极低，不是零。
- **EVM 执行是瓶颈**：Snowman 排序再快，C-Chain 的吞吐仍受 EVM 单线程执行的约束——共识层提速不等于应用层提速。
- **三链并存的复杂度**：资产在 X-Chain（DAG）与 C-Chain（线性链）之间要用跨链调用（ExportTx/ImportTx）搬移，用户与开发者的心智负担不小。
- **参数敏感**：亚采样投票的 k、α、β 参数决定收敛速度与安全边界，调参是实际部署的难点。

Snowman 的意义在于**演示了概率共识怎么服务「需要全序」的应用**——投票引擎可以概率化，但给 EVM 用的链必须线性，两层各取所需。
