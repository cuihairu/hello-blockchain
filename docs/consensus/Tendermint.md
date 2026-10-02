# Tendermint

Tendermint 是把"PoS 质押 + BFT 投票"组合成完整公链引擎的开创性实现，由 Jae Kwon 于 2014 年提出，2017-2019 年由 Tendermint Inc.（后 Interchain GmbH）持续开发，是 Cosmos 生态的共识内核。

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
