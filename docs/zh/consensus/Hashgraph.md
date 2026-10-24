# Hashgraph

Hashgraph 是 Leemon Baird 2016 年提出、Hedera 采用的异步拜占庭容错（aBFT）共识。它的标志性设计是 **gossip-about-gossip**：节点之间传播的不是「消息」而是「消息的传播历史」——每条事件记录自己看到的两个前驱事件，整个网络的通信史形成一张 DAG。有了这张 DAG，**每个节点都能本地推演别人会怎么投票**，于是投票消息本身可以省掉（虚拟投票）。

## 四要素

- **在哪一层**：[结算层](/zh/layers/Settlement) —— aBFT DAG 共识，gossip 协议 + 虚拟投票
- **解决什么**：BFT 投票的消息开销——投票不需要真的发出去，每个节点根据 DAG 重演其他节点的视角，「算」出别人的票
- **解决得怎么样**：异步拜占庭容错（最弱网络假设）+ 公平排序（共识时间戳），吞吐与延迟表现好；代价是许可式治理——Hedera 主网由理事会（39 家机构）运行节点，牺牲无许可换取性能与可预期性
- **出处**：Leemon Baird《Hashgraph Consensus: Fair, Fast, Byzantine Fault Tolerance》2016；Hedera 白皮书 2018

## 核心机制

- **gossip-about-gossip**：每次同步，节点随机挑一个同伴，把「自己知道的全部事件」同步过去。新事件带着两个父事件（自身见证与同伴见证）的哈希，全网通信史构成 DAG。
- **虚拟投票**：DAG 足够密时，节点能看到「X 节点在什么时刻看到了什么」——于是可以本地推演 X 在任何议题上会怎么投票，不需要 X 真的发投票消息。
- **共识时间戳**：事件的排序与时间戳由投票中位数决定，单个节点无法提前决定顺序——这带来「公平排序」，抗 MEV 类抢跑。
- **aBFT**：网络完全异步（消息延迟无上界）下仍保安全与活性，与 [HoneyBadgerBFT](/zh/consensus/HoneyBadgerBFT) 同一假设等级。

## 与同族协议的差异

| 协议 | 关系 | 关键差异 |
| --- | --- | --- |
| [HoneyBadgerBFT](/zh/consensus/HoneyBadgerBFT) | 同类（aBFT） | HoneyBadger 用阈值加密，Hashgraph 用 gossip DAG + 虚拟投票 |
| [Lachesis](/zh/consensus/Lachesis) | 同类（DAG aBFT） | Lachesis 是无许可 DAG，Hashgraph 是许可委员会 |
| [Tendermint](/zh/consensus/Tendermint) | 对比 | Tendermint 部分同步 + 显式投票，Hashgraph 异步 + 虚拟投票 |

## 失败模式

- **许可委员会的中心化**：39 家理事会机构运行全部节点，「去中心化」由治理流程而非准入协议保证——这是性能换来的结构性让步。
- **专利与开放性争议**：Hashgraph 早年以专利与授权模式运营，生态采用受限（后开源但印象已固化）。
- **公平排序的边界**：共识时间戳抗抢跑，但事件进入 DAG 的时机仍受网络拓扑影响，绝对公平不可达。

Hashgraph 的价值是**证明了「投票可以不发出」**——通信史本身就是投票材料；它同时示范了委员会许可制能买到什么（性能、可预期性）与付出什么（无许可性）。
