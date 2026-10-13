# FISCO BCOS

FISCO BCOS 是开源联盟链平台，由微众银行、百度等机构于 2016 年联合发起。它的定位是「面向金融场景的国产联盟链」：以**群组（group）**做数据隔离，以**国密算法**（SM2/SM3/SM4）做密码学底座，以**PBFT** 等 BFT 共识做确定性最终性。与 [Fabric](/consortium/Fabric) 的通道模型相近，但 FISCO BCOS 把多群组设计为**分片执行**——不同群组可以并行处理，吞吐随群组图数量提升。

## 四要素

- **在哪一层**：[结算层](/layers/Settlement) —— 多群组之间的交易排序与状态落定
- **解决什么**：金融联盟既要跨机构协作又要数据隔离与国密合规；FISCO BCOS 用群组做隔离、用分片执行做并行、用国密满足监管
- **解决得怎么样**：群组内共享账本、跨群组通过跨群组调用扩展；分片执行让多个群组并行，吞吐随群组数提升；国密算法可选（SM2 签名、SM3 摘要、SM4 对称加密）；代价是跨群组调用延迟、国密与标准密码学的兼容成本、多群组运维复杂度
- **出处**：[FISCO BCOS 文档·群组架构](https://fisco-bcos-documentation.readthedocs.io/en/latest/docs/design/architecture/group.html)、[·共识算法](https://fisco-bcos-documentation.readthedocs.io/en/latest/docs/design/consensus/index.html)、[·国密算法](https://fisco-bcos-documentation.readthedocs.io/en/latest/docs/manual/guomi_crypto.html)

## 核心机制

- **群组（group）**：群组是一组共享同一账本的节点。群组内的节点执行相同交易、达成相同状态。FISCO BCOS 支持一个节点同时加入多个群组——这是分片执行的基础。
- **多群组分片执行**：由于一个节点可以属于多个群组，不同群组可以在同一批节点上并行执行交易，互不阻塞。吞吐随群组图数量近似线性提升——这是 FISCO BCOS 相比单群组架构的核心优势。
- **PBFT 共识**：FISCO BCOS 采用 PBFT 类 BFT 共识（支持 [PBFT](/consensus/PBFT)、[SBFT](/consensus/PBFT) 等变体）。容错阈值为 n ≥ 3f+1，确定性强最终性——投票达 2/3 多数即不可逆。
- **国密算法**：可选国密套件——SM2（非对称签名，对标 ECDSA）、SM3（密码摘要，对标 SHA-256）、SM4（对称加密，对标 AES）。国密满足中国金融场景的合规要求，但与国际标准密码学（如以太坊的 secp256k1）不兼容，互操作需要转换。
- **共识可插拔**：FISCO BCOS 设计为可插拔共识架构——除 PBFT 外还支持 CFT 类共识（如 [Raft](/consensus/RAFT)）用于内部测试网或单节点场景。
- **跨群组调用**：群组之间通过跨群组调用（cross-group invocation）访问其他群组的状态，延迟高于群组内调用，是 FISCO BCOS 多群组设计的主要代价。

## 失败模式

- **跨群组延迟**：跨群组调用延迟高于群组内，跨群组业务链路的端到端时延难以在群组内达成共识——延迟由路由与序列化决定，不由共识保证。
- **国密兼容性**：国密算法与国际标准不兼容，跨链互操作需要额外转换层；国密密钥管理也增加了运维复杂度。
- **多群组运维**：分片执行依赖多群组编排，群组数量增长会放大节点配置与状态同步开销。
- **PBFT 通信开销**：PBFT 在 2f+1 节点间做全连接通信，节点数增长时通信量呈 O(n²) 增长——这是所有 BFT 共识的共同约束，FISCO BCOS 的群组隔离把每个群组的节点数控制在个位数到十位数。
- **主网级重大事故**：未找到公开记录。

## 与其他联盟链的差异

| 维度 | FISCO BCOS | [Fabric](/consortium/Fabric) | [Corda](/consortium/Corda) | [Besu](/consortium/Besu) |
| --- | --- | --- | --- | --- |
| 数据隔离 | 群组（分片执行） | 通道 | 按合约共享范围 | 隐私交易 |
| 共识 | PBFT（BFT） | Raft（非 BFT） | Notary | QBFT（BFT） |
| 密码学 | 国密 + 标准 | X.509 + 标准 | 标准 | secp256k1（EVM） |
| 智能合约 | Go / Solidity / Java | Go / Java | Kotlin / Java | Solidity |
| 分片 | 多群组并行 | 无 | 无 | 无 |
