# DiemBFT

DiemBFT 是 Meta（原 Facebook）Diem 项目（2019 年首发时叫 Libra）的拜占庭容错共识，是 [HotStuff](/zh/consensus/HotStuff) 的工程化变体：三阶段投票流水线化、视图切换线性化，并配套了独立的执行运行时（Move 虚拟机）。项目 2022 年停办后，其技术资产由 Aptos 团队接续为 AptosBFT。

## 四要素

- **在哪一层**：[结算层](/zh/layers/Settlement) —— HotStuff 变体：流水线投票 + 线性视图切换，配套独立执行层
- **解决什么**：把 HotStuff 的理论性能工程化到生产级——投票按区块流水线推进，一个区块的投票同时充当上一区块的确认，摊薄通信成本
- **解决得怎么样**：三链提交（Three-Chain Commit）让确定性最终性在两轮内达成、视图切换不再是性能悬崖；代价是依赖 leader 的诚实与在线、Diem 项目本身 2022 年停办（技术由 Aptos 接续），主网从未对外上线
- **出处**：Diem Association《Libra/Diem 白皮书》2019；DiemBFT 共识规范（v1-v4）；同族理论源：Yin、Malkhi 等《HotStuff》CCS 2019

## 核心机制

- **三链提交（Three-Chain Commit）**：区块 B 被投票（QC₁），其直接后继 B+1 被投票（QC₂），再后继 B+2 被投票（QC₃）——三张连续 QC 让 B 隐式最终化，无需单独的提交阶段。
- **流水线投票**：对第 n 个区块的投票消息里捎带对第 n-1 个区块的投票结果，通信被摊薄到每个区块。
- **线性视图切换**：leader 超时或作恶时，新 leader 靠聚合的_timeout QC_上任，消息量是 O(n) 而非 PBFT 的 O(n²)。
- **执行独立**：共识只排序，交易在 Move 虚拟机里独立执行——共识层的性能与执行层解耦。

## 技术谱系

| 系统 | 与 DiemBFT 的关系 |
| --- | --- |
| [HotStuff](/zh/consensus/HotStuff) | 理论源：QC 聚合 + 链式流水线都来自这里 |
| Jolteon / DiemBFT v4 | Diem 团队对 HotStuff 视图切换的改进（两轮投票 + 随机 leader） |
| AptosBFT | Aptos 接续的版本，配 Block-STM 并行执行与 Quorum Store 内存池 |
| Narwhal/Bullshark | Diem 研究团队 2021-2022 发表的 DAG 内存池 + 共识，被 Sui 采用（后演进为 Mysticeti） |

## 失败模式

- **leader 单点**：流水线投票依赖每轮 leader 转发与打包，leader 被攻击或失联会触发视图切换，吞吐掉档。
- **QC 依赖签名聚合**：与 HotStuff 相同，QC 的安全性压在聚合签名原语上。
- **生态先于主网的悖论**：Diem 未能上线，但它的共识与执行分离、Move 语言、流水线 BFT 都活了下来——说明共识算法能否落地，取决于生态与监管，不只取决于技术。
- **工程实现的版本漂移**：DiemBFT v1 到 v4 变化很大，引用「DiemBFT」时要说清版本。

DiemBFT 的最大遗产不是某个参数，而是**把 BFT 共识做成可流水线的工程组件**——今天 Aptos 的共识、Sui 的 DAG 内存池，都直接长在这条研究线上。
