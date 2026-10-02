# PBFT

实用拜占庭容错（Practical Byzantine Fault Tolerance, PBFT）由 Castro 与 Liskov 于 1999 年提出，首次把拜占庭容错做到"可工程落地"的性能，是许可链与多数 BFT 公链投票层的直系祖先。

## 基本设定

- 节点总数 $n \geq 3f + 1$，容忍 $f$ 个拜占庭节点。
- 所有节点知道彼此身份（许可环境）；视图（view）中有一个主节点（primary/leader）负责打包提案。
- 确定性最终：一旦 commit，结果不可逆。

## 三阶段协议

对客户端请求 $m$，主节点（视图 $v$，序号 $n$）执行：

1. **Pre-prepare（预准备）**：主节点广播 `<PRE-PREPARE, v, n, m>` 给所有副本节点。
2. **Prepare（准备）**：副本校验后广播 `<PREPARE, v, n, m>`；节点收到 $2f$ 个与本地一致的 PREPARE 即进入 prepared 状态。
3. **Commit（提交）**：节点广播 `<COMMIT, v, n, m>`；收到 $2f + 1$ 个 COMMIT 后执行并回复客户端。
4. 客户端收到 $f + 1$ 个相同回复即确认最终结果。

## 视图切换（View Change）

主节点超时或被怀疑作恶时，副本联合发起视图切换：各节点广播 `<VIEW-CHANGE>`，新主节点（常按 `p = v mod n` 轮换）收集 $2f + 1$ 张切换票后接管。这一机制保证活性，也是后续 Tendermint 等协议"轮次轮换"思想的来源。

## 检查点与垃圾回收

协议每执行 $k$ 个请求（通常 100）做一次检查点：节点互相确认稳定检查点（stable checkpoint）后，丢弃更早的消息日志，防止日志无限增长。

## 优点与局限

**优点**：确定性最终、毫秒至秒级确认、无分叉；吞吐在联盟链规模下数千 TPS。

**局限**：

- 通信复杂度 $O(n^2)$，节点扩展到数百就吃紧；
- 只适合许可集合，需配合身份/质押的准入管理；
- 主节点集中打包，存在审查与负载热点。

## 衍生协议

Tendermint Core、Hyperledger Fabric 的 SmartBFT、FISCO BCOS 的 PBFT 实现、蚂蚁链与长安链的 MaxBFT/TBFT（见本目录 [MaxBFT](/consensus/MaxBFT)、[TBFT](/consensus/TBFT)）都是 PBFT 的工程化改进版本。
