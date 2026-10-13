# Paxos

Paxos 是 Leslie Lamport 提出的**崩溃容错（CFT）共识**：《The Part-Time Parliament》1998 年发表、2001 年用《Paxos Made Simple》重写成可读版。它是分布式系统里「多数派复制」的源头——RAFT、Chubby、Spanner 背后都是它或它的变体。注意它的容错边界：只容忍宕机，不容忍拜占庭作恶。

## 四要素

- **在哪一层**：[结算层](/layers/Settlement) —— 崩溃容错（CFT）共识，信任模型是「节点可能宕机、但不作恶」
- **解决什么**：异步网络 + 少数节点宕机的前提下，让多个副本对单个值（然后是日志序列）达成不可分歧的一致——2f+1 副本容 f 个宕机
- **解决得怎么样**：工业界分布式系统的地基（Google Chubby、Spanner、Azure 存储；ZooKeeper 的 ZAB 是同族变体）；代价是协议出了名的难懂、难写对——[RAFT](/consensus/RAFT) 论文开篇就是为了替代它；不抗拜占庭，作恶环境必须换 [BFT](/consensus/BFT) 路线。公开事故：未找到公开记录——其难点在实现正确性而非协议缺陷，工程上靠形式化验证与 Jepsen 类测试兜底
- **出处**：Leslie Lamport《The Part-Time Parliament》1998；《Paxos Made Simple》2001（<https://lamport.azurewebsites.net/pubs/paxos-simple.pdf>）

## 核心机制

- **三个角色**：proposer（提值）、acceptor（表决）、learner（学习结果），实际部署常合在一个进程里。
- **两阶段表决**：
  1. **prepare/promise**：proposer 递增编号 n 请求承诺，acceptor 承诺不再接受编号更小的提案，并带回自己已接受的最大编号提案。
  2. **accept/accepted**：没有冲突就广播 accept(n, v)，多数派接受即选定；有冲突就沿用已接受的值。
- **多数派相交**：任意两个多数派必有交集——已选定的值不会被后续轮推翻，这是安全性的全部来源。
- **Multi-Paxos**：选定一个稳定 leader 后跳过 prepare 阶段，把「对单个值」扩展成对日志序列的复制——这是工程实现（Chubby、Spanner）的真实形态。

## 与同族协议的差异

| 协议 | 关系 | 关键差异 |
| --- | --- | --- |
| [RAFT](/consensus/RAFT) | 可理解性替代 | RAFT 用强领导选举 + 日志复制重述 Paxos，术语与流程可教学；Paxos 更通用但更绕 |
| [PBFT](/consensus/PBFT) | 拜占庭扩展 | PBFT 把信任模型换成容忍 f 个作恶（n ≥ 3f+1），三阶段投票 + 视图切换 |
| [HotStuff](/consensus/HotStuff) | 拜占庭 + 流水线 | HotStuff 用 QC 把 BFT 投票流水线化，是「Paxos 结构 + 拜占庭假设」的现代形态 |
| [Tendermint](/consensus/Tendermint) | 拜占庭 + 质押 | Tendermint 把 BFT 投票与出块焊死，Paxos 只管复制不管出块 |

## 失败模式

- **活性竞争（dueling leaders）**：多个 proposer 互相递增编号抢提案，可能活锁——工程解法就是选稳定 leader（Multi-Paxos），等于承认它自己不完整。
- **实现正确性**：协议描述里留了大量工程自由度（何时重试、编号怎么分配），历史上主流实现都踩过坑，这也是 RAFT 诞生的直接原因。
- **不抗作恶**：一个作恶 acceptor 就能破坏多数派假设——公链场景没有它的位置，那是 BFT 的地盘。

Paxos 的价值在于**把「多数派相交 ⇒ 安全」这条骨架立了起来**：之后所有共识协议——RAFT、PBFT、HotStuff——都在回答同一个问题的不同变体：换什么信任假设、怎么把表决做得更快。
