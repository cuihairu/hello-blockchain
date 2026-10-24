# Mysticeti

Mysticeti 是 Mysten Labs 2024 年发表的 **uncertified DAG BFT**：把 [Narwhal 与 Bullshark](/zh/consensus/NarwhalBullshark) 的「证书化 DAG」改成「不证书化」——每轮不再收集投票证书，靠更紧的提交规则直接定案。2024 年下半年随 Sui 主网上线，把最终性从秒级压进亚秒级。

## 四要素

- **在哪一层**：[结算层](/zh/layers/Settlement) —— uncertified DAG 共识（Narwhal/Bullshark 的后继，Sui 现行共识）
- **解决什么**：把 DAG 共识的延迟开销砍掉——证书化 DAG 每轮都要收 2/3 签名证书才能延伸，Mysticeti 用「直接父链 + 三轮提交规则」把这次额外往返省掉
- **解决得怎么样**：Sui 主网 2024 年上线后，最终性从 Bullshark 的约 1.6 s 压到约 390~400 ms，吞吐保持百并发级别；代价是协议与实现更精巧（提交规则的安全性论证依赖严格的父链条件）、上线时间还短、第三方审计与长周期运行记录少。公开事故：未找到公开记录
- **出处**：Mysten Labs《Mysticeti: Achieving Low Latency and Certainty via Uncertified DAG BFT Consensus Protocols》2024（arXiv:2404.12257）；Sui 官方文档

## 核心机制

- **uncertified DAG**：每轮每个验证人广播一个区块，指向上一轮的 2 个父块——不需要先收齐证书再延伸，DAG 用「盲延伸 + 事后定案」长出来。
- **三轮直接提交**：一个块被最终化，需要它锚定连续三轮的**直接父链**（round r → r+1 → r+2 各有一笔直接父子关系）——直接性保证了「写进 DAG 的都逃不掉」，替代证书的防抵赖作用。
- **流水线广播**：区块广播与上一轮的处理重叠，签名验证与存储写入不阻塞出块路径。
- **容错边界**：与 Bullshark 相同的部分同步假设、n ≥ 3f+1 验证人、2/3 诚实门槛。

## 与同族协议的差异

| 协议 | 关系 | 关键差异 |
| --- | --- | --- |
| [Narwhal 与 Bullshark](/zh/consensus/NarwhalBullshark) | 前身 | Bullshark 每轮收集证书（certified DAG），Mysticeti 免证书直接延伸，省一次往返 |
| [Tusk](https://github.com/MystenLabs) | 同门前作 | Tusk 是异步网络的 DAG 定序（配 Narwhal），Mysticeti 换部分同步假设换更低延迟 |
| [Hashgraph](/zh/consensus/Hashgraph) | 同类（DAG + 虚拟投票） | Hashgraph 靠本地推演虚拟投票，Mysticeti 靠显式提交规则；前者专利封闭、后者开源 |
| [HotStuff](/zh/consensus/HotStuff) | 对照（链式 BFT） | HotStuff 每块一个 QC、线性通信；Mysticeti 干脆不要逐块 QC，用 DAG 并发摊薄延迟 |

## 失败模式

- **提交规则的正确性集中**：免证书后，「三轮直接父链」这条规则是安全性的全部——实现一旦偏离（父指针缺失、轮次错判），安全论证直接失效。
- **DAG 存储与同步**：新节点要重放整张 DAG 才能跟上，快照与裁剪策略是工程上的隐性成本。
- **运行记录短**：2024 年才上主网，长周期、极端网络条件下的行为记录少——这是所有新共识共同的边界。

Mysticeti 的方向意义在于：**证书不是免费的**——DAG 结构本身加上足够紧的提交规则，可以把「防抵赖」从消息里挪到图上，同样的信任门槛下省掉整整一次网络往返。
