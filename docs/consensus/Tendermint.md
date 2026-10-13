# Tendermint

Tendermint 是把"PoS 质押 + BFT 投票"组合成完整公链引擎的开创性实现，由 Jae Kwon 于 2014 年提出，2017-2019 年由 Tendermint Inc.（后 Interchain GmbH）持续开发，是 Cosmos 生态的共识内核。

## 四要素

- **在哪一层**：[结算层](/layers/Settlement) —— PoS 质押 + BFT 投票组合成完整引擎，确定性最终性
- **解决什么**：把质押与 BFT 投票焊成一个完整公链引擎——验证人按质押权重投票，1/3 以上作恶才不安全，2/3 达成即最终
- **解决得怎么样**：确定性最终性、秒级出块、ABCI 接口让应用层复用引擎（Cosmos 生态繁荣）；代价是验证人数量受 O(n²) 限制（百级）、链历史上多次因治理与软件问题停摆（2019-2021 Cosmos Hub 数次）
- **出处**：Jae Kwon《Tendermint: Consensus without Mining》2014；CometBFT 官方文档

## 架构分层

- **Tendermint Core**：共识（Tendermint BFT）+ P2P 网络 + 轻客户端。
- **ABCI（Application Blockchain Interface）**：共识引擎与状态机（应用）之间的 gRPC/Socket 接口，任意语言可写应用——这是后来 Cosmos SDK 与 CometBFT 生态繁荣的根基。
- 2022 年后主实现更名为 **CometBFT**，协议本身常仍称 Tendermint BFT。

## 共识轮次

每个高度（height）循环执行 round，每轮：

1. **Propose**：按权重与 VRF 式优先级（`round-robin by voting power`）选出的提议者广播区块提案。
2. **Prevote**：验证人对收到的合法区块投票 `+2/3 prevote`；收不到有效区块则投 nil。
3. **Precommit**：收到 +2/3 prevote 后锁定该区块并投 precommit；集齐 +2/3 precommit 即 commit 并进入下一高度。
4. **超时轮换**：任何一步超时进入下一 round，proposer 换人——保证活性。

## 关键性质

- **即时最终性**：commit 即不可逆（确定性最终），没有概率确认期。
- **安全性阈值**：投票权重 < 1/3 作恶安全；≥ 1/3 可致停摆，≥ 2/3 可作恶（与 [BFT](/consensus/BFT) 通则一致）。
- **锁定规则（locking）**：验证人一旦在 precommit 锁定某区块，本轮次内不能改投他块，防止摇摆分叉；配合轮次递增解锁，兼顾活性。
- **质押即权重**：验证人权重与 bonded 质押量成正比，作恶者可被 slash（双签、长时间下线）。

## 生态影响

Cosmos Hub、Binance Chain/BNB Beacon Chain、Terra（经典版）、Kava、Osmosis 等数百条链基于 Tendermint/CometBFT；IBC 跨链协议的轻客户端验证模型也建立在 Tendermint 头部 + +2/3 投票验证之上。

## 落地样本：Akash

> 来源：meshio research（2026-10-13 合并），细节对照 docs.akash.network 与 Akash 经济白皮书。

Akash 是「CometBFT 共识 + 云算力市场」的组装样本，其分层值得注意：

- **市场交易上链**：部署订单、bid、租约全部上链（deployment/market/escrow 模块），租户设最高价、provider 报低价，反向拍卖撮合。
- **工作负载永不上链**：完整部署 manifest 直接发给 provider（不上区块链），算力正确性不做链上验证——escrow 按块付费（约 6 秒一笔），信任全在托管与事后争议。
- **验证与调度分级**：provider 可标注「audited」（安全审计过），租户用 SDL `signedBy` 限定只部署到审计过的 provider——验证等级进入调度匹配条件的现成案例。
- **结算货币演进**：租约费从 AKT 计价演进为 `uact`（烧 AKT 铸出的美元挂钩内部信用），支持 IBC 货币结算——计价稳定与主币需求的解耦样本。
