# Hyperledger Fabric

Fabric 是 Hyperledger 基金会里工业采纳最广的许可链框架：它把「组织」当作一等公民（一个成员=一个组织），用**通道（channel）**在成员之间划出数据隔离边界，用 **MSP（Membership Service Provider）** 把 X.509 证书映射成网络身份，再用**背书策略（endorsement policy）**决定「哪几个组织签过字这笔交易才算数」。排序服务（ordering service）负责把交易打包成块，Fabric v2 起默认用 **Raft** 共识（旧版 Kafka 已弃用）——注意 Raft 是崩溃容错共识，Fabric 的排序服务因此不是拜占庭容错的，安全边界是「排序节点由可信成员运营」。

与[PBFT](/zh/consensus/PBFT)、[QBFT](/zh/consensus/QBFT)这类投票共识不同，Fabric 的强项不是抗作恶，而是**组织级隔离 + 策略组合**：一家供应链企业可以只在通道里和它的上下游共享资产，而不暴露给全联盟。

## 四要素

- **在哪一层**：[结算层](/zh/layers/Settlement) —— 组织间状态怎么落定，以及哪些组织能看见什么
- **解决什么**：跨组织协作既要共享账本又要数据隔离；Fabric 用通道把「全网一个账本」拆成「组织子集各一个账本」
- **解决得怎么样**：通道隔离在成员之间生效，排序服务全局共享（Raft 组内广播）；背书策略可按组织组合，支持按角色（admin / peer）细粒度授权；代价是排序节点不拜占庭容错、身份依赖成员运营 CA、通道数增长会放大状态同步开销
- **出处**：[Hyperledger Fabric 文档·网络结构](https://hyperledger-fabric.readthedocs.io/en/latest/network/network.html)、[·身份与 MSP](https://hyperledger-fabric.readthedocs.io/en/latest/identity/identity.html)、[·账本与世界状态](https://hyperledger-fabric.readthedocs.io/en/latest/ledger/ledger.html)、[·排序服务与 Raft](https://hyperledger-fabric.readthedocs.io/en/release-2.5/orderer/ordering_service.html)、[术语表](https://hyperledger-fabric.readthedocs.io/en/latest/glossary.html)

## 核心机制

- **组织与成员**：一个组织是一组节点（peer）+ 一个证书颁发机构（CA）。CA 为组织内的 peer、用户、应用签发 X.509 数字证书；网络里的身份由证书中的组织标识决定。
- **MSP（成员身份服务提供者）**：MSP 把 X.509 证书映射成网络内的身份，并定义「谁属于哪个组织」。通道里的策略与背书决策都通过 MSP 解析身份。
- **通道（channel）**：通道是一组共享同一账本的组织子集。成员可以加入多个通道；未加入通道的组织看不到该通道的数据。Fabric 的隐私不是加密，而是**结构性隔离**——不参与通道的组织根本拿不到数据。
- **背书策略**：链码定义里的 endorsement policy 规定「哪些组织必须背书这笔交易，其他组织才会接受」。可以设成「任意 2 个组织」「必须包含组织 A」等组合。背书发生在 peer 上：peer 模拟交易、验证权限、签名，然后把结果提交给排序服务。
- **排序服务（Raft）**：排序节点把已背书的交易按全局顺序打包成块并广播。Fabric v2 起 Raft 是默认实现（Kafka 已弃用）。Raft 是崩溃容错共识，不抗拜占庭作恶——Fabric 的排序服务假设排序节点由可信成员运营。
- **世界状态与 KVDB**：peer 维护本地账本（区块链 + 世界状态）。世界状态是链码数据的键值视图，默认用 **LevelDB**（嵌入式，适合简单键值），可选 **CouchDB**（支持富查询，如按字段范围查询）。
- **链码生命周期**：Fabric v2 起链码生命周期拆为 install / approve / commit 三步：先安装到 peer，再由组织背书批准后提交到通道生效。
- **私有数据**：在通道之上还有一层「私有数据集合（private data collections）」，让部分成员共享数据而不向通道全员公开——私有数据不会进排序服务的块，只进成员之间的世界状态。

## 失败模式

- **排序节点非 BFT**：Raft 只容崩溃，不容作恶。排序节点若被恶意控制，全局排序可能被篡改——Fabric 把这道防线交给「成员治理」而非密码学。
- **身份与 CA 单点**：CA 故障或证书泄漏都会影响整个组织的身份可用性；吊销证书需要走 CRL 机制，延迟取决于 CA 配置。
- **通道碎片化**：每个通道一个账本副本，跨通道查询需要跨通道应用层协作。通道数增长会放大状态同步与运维开销。
- **背书性能**：背书是 peer 本地模拟，高吞吐场景下背书延迟会成为瓶颈；背书策略越复杂，跨组织协调成本越高。
- **主网级重大事故**：Fabric 是开源框架，未见针对 Fabric 本身的链上重大事故公开记录（具体应用的事故见[各联盟链页](/zh/consortium/Consortium)与[跨链桥攻击](/zh/hacking/CrossChainBridgeAttack)）。

## 与其他联盟链的差异

| 维度 | Fabric | [FISCO BCOS](/zh/consortium/FiscoBcos) | [Corda](/zh/consortium/Corda) | [Besu](/zh/consortium/Besu) |
| --- | --- | --- | --- | --- |
| 数据隔离 | 通道（组织子集） | 群组（类似通道） | 交易按合约定义共享 | 隐私分区（基于交易） |
| 身份 | X.509 + MSP | 国密/标准证书 | 实名身份 + notary | 权限管理（permissioning） |
| 共识 | Raft（非 BFT） | PBFT / CFT | Notary 共识 | QBFT（BFT） |
| 智能合约 | Go / Java | Go / Solidity / Java | Kotlin / Java 合约 | Solidity（EVM） |
| 隐私 | 通道 + 私有数据集合 | 群组 + 国密 | 按合约共享范围 | 隐私交易（基于以太坊隐私） |
