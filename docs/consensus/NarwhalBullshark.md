# Narwhal 与 Bullshark

Narwhal/Bullshark 是 Diem（原 Libra）研究团队 2021-2022 年发表的一组成对协议：**Narwhal** 是把交易可靠传播做成 DAG 内存池的系统，**Bullshark** 是直接在 DAG 上做最终化的 BFT 共识。它被 Sui 主网（2023）采用，2024 年演化为 **Mysticeti**（无证书 DAG-BFT）。这是「执行与共识解耦」路线的工程化代表。

## 四要素

- **在哪一层**：[结算层](/layers/Settlement) —— DAG 内存池（Narwhal）+ DAG-BFT 共识（Bullshark/Mysticeti）
- **解决什么**：把「交易的可靠传播」（内存池）与「排序确认」（共识）彻底分开——Narwhal 持续广播可用性，共识只处理可用性已广播的交易，省掉传统共识「打包+广播+投票」的多轮串行开销
- **解决得怎么样**：Sui 主网 2023 上线、2024 Mysticeti 去掉了共识证书延迟再降一轮，吞吐与延迟表现良好；代价是对存储与带宽要求高、仍有 leader 轮次（Mysticeti 之前）、网络假设是部分同步而非完全异步
- **出处**：Danezis、Kokoris-Kogias 等《Narwhal: A Decentralized, High-Throughput DAG-Based Ledger》2021；Bullshark 论文 2022；Mysticeti（Danezis、Kokoris-Kogias 等）2024

## 为什么拆开

传统共识（[PBFT](/consensus/PBFT)、[Tendermint](/consensus/Tendermint)、[HotStuff](/consensus/HotStuff)）里，内存池传播是共识轮次的一部分——每一轮出块，交易都得再广播一次。Narwhal 把内存池做成一个**独立系统**：交易进入后就持续在 DAG 结构里可靠传播，共识侧只确认「哪些交易已稳定」。这样内存池带宽利用率更高，共识轮次也不再被传播开销卡住。

## 核心机制

- **Narwhal（内存池 DAG）**：每个节点收一批交易，生成一个 DAG 节点（含交易的可用性证明），按拓扑序持续推送给同伴。传播用共享随机时间戳定序，保证不同节点看到的 DAG 结构一致。
- **Bullshark（共识）**：验证人按 leader 轮次从 Narwhal DAG 中「抽取」待确认的可用交易并投票，投票在 DAG 结构上完成，最终化不依赖额外的块传播。
- **Mysticeti（演进）**：去掉 Bullshark 里的「证书」概念，让一轮的投票直接决定最终化，再降一跳延迟。
- **执行解耦**：共识确认交易已稳定，实际执行由执行层在 DAG 结构上并行完成（Sui 的 Move 对象模型）。

## 与同族协议的差异

| 协议 | 关系 | 关键差异 |
| --- | --- | --- |
| [DiemBFT](/consensus/DiemBFT) | 同一研究谱系 | DiemBFT 是共识端，Narwhal/Bullshark 是内存池+共识配对系统，把「传播」也解耦 |
| [HotStuff](/consensus/HotStuff) | 对比 | HotStuff 用 QC 聚合压缩投票，Narwhal/Bullshark 用 DAG 内存池压缩传播 |
| [Lachesis](/consensus/Lachesis) | 同类（DAG 共识） | Lachesis 是 aBFT DAG、无 leader 轮次；Bullshark 有 leader 轮次 |
| Mysticeti | Bullshark 演进 | 去掉证书，一轮出块即最终化 |

## 失败模式

- **带宽与存储压力**：交易在内存池里持续传播，节点要保持高带宽与持久化状态——这是「解耦」买吞吐付出的资源税。
- **部分同步假设**：Bullshark 依赖超时假设（leader 轮次），完全分区下会停滞，不像 [HoneyBadgerBFT](/consensus/HoneyBadgerBFT) 那样异步容错。
- **DAG 定序依赖共享随机**：内存池 DAG 的拓扑由共享随机决定，随机信源不可靠会引入分歧。
- **研究到生产的时间差**：协议 2021 发表、2023 才上线——工程化成本往往被低估。

Narwhal/Bullshark 的意义在于它把「共识里到底有哪些动作」拆到了最细——**传播、排序、确认、执行**各成一环，每一环都可以独立优化。这条思路与 DiemBFT 的「执行解耦」一脉相承，是「模块化共识」从概念走向工程的两块拼图。
