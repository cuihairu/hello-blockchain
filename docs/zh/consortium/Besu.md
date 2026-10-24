# Hyperledger Besu / Quorum

Besu 是用 Java 写的以太坊执行客户端（Apache 2.0），「主网兼容 + 私有网络」双形态：公网侧它跑[以太坊](/zh/chains/Ethereum)主网（与共识客户端配对），私网侧它是联盟链引擎——用 [QBFT](/zh/consensus/QBFT) 类 BFT 共识、PoA 权限治理、隐私交易。它承继了摩根大通 Quorum（GoQuorum）的联盟链衣钵：Quorum 停止单独演进后，其隐私与许可能力由 Besu 的私有网络栈延续。对想复用以太坊工具链（EVM、Solidity、[DApp 开发栈](/zh/dapp/Dapp)）又不要无许可开放性的机构，Besu 是默认选项之一。

## 四要素

- **在哪一层**：[结算层](/zh/layers/Settlement) —— 私有网络内的出块与最终性（QBFT 投票）
- **解决什么**：机构要 EVM 兼容的联盟链——合约生态与以太坊同源，但节点准入、交易隐私与治理可控
- **解决得怎么样**：EVM 等价（Solidity 合约与主流工具直接可用）、QBFT 确定性最终性、隐私交易（交易内容只在参与方与隐私管理器间可见）、账户级权限治理（onchain permissioning）；代价是隐私依赖 Tessera 隐私管理器组件、BFT 节点规模与[PBFT](/zh/consensus/PBFT) 同受 O(n²) 通信约束、同栈双形态让运维配置面变大
- **出处**：[besu-eth/besu 仓库](https://github.com/besu-eth/besu)（官方 README：Mainnet compatible, Ethereum client written in Java）、[Besu 私网文档·PoA](https://docs.besu-eth.org/private-networks/concepts/poa/)、[·隐私](https://docs.besu-eth.org/private-networks/concepts/privacy/)、[·权限治理](https://docs.besu-eth.org/private-networks/concepts/permissioning/)、[·QBFT 配置](https://docs.besu-eth.org/private-networks/how-to/configure/consensus/qbft/)

## 核心机制

- **EVM 等价**：私网合约与公网合约同用 Solidity 与 EVM 字节码——开发者技能、合约审计工具、[DApp 前端栈](/zh/dapp/Dapp)全部复用。这是 Besu 相对[Fabric](/zh/consortium/Fabric)链码模型的最大差异：链模型是以太坊的[账户模型](/zh/model/Account)，不是 KVDB 世界状态。
- **QBFT 共识**：私有网络默认的 BFT 共识（IBFT 2.0 的演进版）——验证人集合固定（许可），出块与投票三阶段达成，2/3 多数签发即确定性最终性。共识细节见[QBFT 详解](/zh/consensus/QBFT)。
- **PoA 权限治理**：验证人由治理账户/投票管理（validator contract 模式），可增删验证人、切换共识参数——「链上治理链本身」。
- **隐私交易**：私对私（private-for）交易把有效载荷加密后交给独立的隐私管理器（Tessera），链上只存哈希与隐私组信息；参与方凭密钥从隐私管理器取回明文。链全局可见的只是「有一笔隐私交易发生」。
- **账户权限（permissioning）**：onchain permissioning 用智能合约维护两张名单——节点准入名单与账户许可名单，本地再叠加 DNS 允许列表。许可规则的执行在连接层与交易层双重生效。
- **双形态同栈**：同一二进制既可连主网（execution client，配 Teku 等共识客户端）也可组私网；差别在配置与共识选择。

## 与其他联盟链的差异

| 维度 | Besu | [Fabric](/zh/consortium/Fabric) | [FISCO BCOS](/zh/consortium/FiscoBcos) | [Corda](/zh/consortium/Corda) |
| --- | --- | --- | --- | --- |
| 合约生态 | EVM / Solidity（以太坊同源） | Go / Java 链码 | Solidity / Go / Java | Java / JVM 合约 |
| 账本模型 | 账户模型 | KVDB 世界状态 | 群组内共享账本 | UTXO（状态+契约） |
| 共识 | QBFT（BFT） | Raft（非 BFT） | PBFT（BFT） | 公证人 |
| 隐私 | 隐私管理器（Tessera）+ 隐私组 | 通道 + 私有数据集合 | 群组隔离 + 国密 | 点对点共享，无全局账本 |
| 准入 | onchain permissioning 名单 | MSP + CA | 成员证书 | 网络地图 + 会员策略 |

## 失败模式

- **隐私管理器依赖**：隐私交易的明文在 Tessera 侧——Tessera 集群故障即隐私交易不可用，其密钥管理成为新的安全单点；「链可用但隐私层不可用」是联盟运维里常见的事故形态。
- **验证人集中**：QBFT 的验证人集合小且由治理控制——治理账户（多签）被攻破即共识被接管，治理密钥的管理强度决定链的安全上限。
- **BFT 通信开销**：节点规模受 O(n²) 投票通信约束，几十节点量级是常见上限——与[FISCO BCOS](/zh/consortium/FiscoBcos)的群组分片路线相比没有并行扩展答案。
- **隐私与可观测的矛盾**：审计节点看不到隐私交易内容，监管审计要么进隐私组要么依赖参与方导出——与[Corda](/zh/consortium/Corda)同样的「结构隐私 vs 全局可观测」权衡。
- **主网级重大事故**：未找到公开记录。
