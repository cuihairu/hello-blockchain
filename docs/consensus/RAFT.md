# RAFT

RAFT 是 Ongaro 与 Ousterhout 于 2014 年提出的**崩溃容错（CFT）共识**，定位是 Paxos 的可理解替代品：以"领导选举 + 日志复制 + 安全性约束"三件事讲清楚多副本状态机复制。它只容忍节点宕机，不容忍拜占庭作恶——因此常见于联盟链、分布式存储（etcd、TiKV、Consul）而非公链。

## 三个子问题

1. **领导选举（Leader Election）**
   - 节点三种身份：Leader、Follower、Candidate。
   - Follower 随机超时（150~300ms 抖动防止活锁）后自增任期（term）发起选举，获得多数票即成为 Leader。
   - 随机化超时保证多数情况下一次选举出唯一 Leader。

2. **日志复制（Log Replication）**
   - 所有写请求由 Leader 处理：追加到本地日志，并行发给 Follower。
   - 收集到**多数派**确认后提交（commit），应用至状态机并通知 Follower 提交。
   - 任一时刻，已提交日志必须由当前 Leader 持有（Leader Completeness）。

3. **安全性（Safety）**
   - 选举约束：投票者只投给"日志不落后于自己"的候选人，保证新 Leader 拥有全部已提交日志。
   - 任期号作为全局逻辑时钟，过期 Leader 的消息被忽略。

## 在区块链中的角色

- **联盟链共识模块**：长安链、Hyperledger Fabric（etcd-RAFT ordering 服务）把 RAFT 用于交易排序层——排序后交给执行/验证层，Follower 节点间只需信任对方不宕机。
- **侧链与 L2 组件**：排序器（sequencer）的高可用常用 RAFT/热备实现。
- **与 BFT 的取舍**：RAFT 容忍 $f$ 个宕机需 $2f+1$ 节点（多数派），消息量 $O(n)$，时延极低；PBFT 容忍 $f$ 个作恶需 $3f+1$，消息量更高。信任模型决定选型（见 [BFT](/consensus/BFT)、[SOLO](/consensus/SOLO)）。
