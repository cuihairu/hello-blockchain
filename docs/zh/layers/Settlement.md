# 结算层

结算层是信任锚：通过[共识算法](/zh/consensus/Consensus)对交易顺序与状态转换达成最终性（概率或确定性），并让上层（L2、跨链桥）把承诺结算到这里。它回答一个问题——**哪个状态不可逆**。

## 定义

结算层 = 共识协议 + 最终性模型 + 跨链承诺机制。

- **共识协议**：如何让一组互不信任的节点就交易顺序达成一致。站内收录 23 种，按记账资源分族：算力（[PoW](/zh/consensus/POW)）、代币（[PoS](/zh/consensus/POS)、[DPoS](/zh/consensus/DPOS)）、声誉（[PoA](/zh/consensus/POA)）、容量与时间（[PoSpace](/zh/consensus/PoSpace)、[PoT](/zh/consensus/POT)）、投票（[PBFT](/zh/consensus/PBFT)、[Tendermint](/zh/consensus/Tendermint)）。
- **最终性模型**：概率最终性（PoW + 最长链，确认数越多回滚越难）与确定性最终性（BFT 投票 +2/3 即不可逆）。
- **跨链承诺**：L2 把状态根结算到 L1，跨链桥把外部事件结算到本地链。承诺机制是信任传递的通道，也是攻击最集中的地方。

结算层之下是网络层（不在四层模型内），之上是[存储层](/zh/layers/Storage)（承诺状态根）、[计算层](/zh/layers/Compute)（把执行结果打包）与[服务发现](/zh/layers/ServiceDiscovery)（记录归属）。

## 解决的问题

1. **最终性**：概率 vs 确定性。概率最终性无许可、可即时加入，但回滚概率随确认数指数下降而非归零；确定性最终性快且不可逆，但验证人集合需要身份管理、节点数受通信复杂度限制。
2. **重组与回滚**：51% 攻击、长程攻击都能让「已确认」回滚。解法是确认数阈值（概率）与弱主观性（PoS 新节点必须从近期可信状态同步）。
3. **跨链结算**：L2 → L1 的承诺与证明（乐观的欺诈证明 vs ZK 有效性证明），跨链桥的外部事件验证。承诺在哪一层结算，决定了上层能损失多少。
4. **共享安全 vs 独立安全**：Polkadot 的 NPoS 分工与 Cosmos 的自治 zones，两条路线各自换掉了不同的东西。

## 现有系统

| 形态 | 系统 | 最终性 |
| --- | --- | --- |
| PoW 最长链 | Bitcoin | 概率，约 6 个确认 |
| PoS + BFT 投票 | Ethereum Gasper（LMD-GHOST + Casper FFG）、Tendermint、Aptos | 概率 + 确定性双轨 |
| BFT 族 | PBFT、MaxBFT、TowerBFT、HotStuff 系 | 确定性，2f+1 签名 |
| 异步 BFT | [HoneyBadgerBFT](/zh/consensus/HoneyBadgerBFT) | 确定性，不依赖超时 |
| 概率无领导 | [Avalanche](/zh/consensus/Avalanche)、[Snowball](/zh/consensus/Snowball) | 概率，亚采样 |
| L2 乐观 | Optimism、Arbitrum | 跟随 L1，加挑战期 |
| L2 ZK | zkSync、StarkNet | 跟随 L1，加证明验证 |
| 模块化 DA 链 | Celestia | 只承诺数据可用性，不做结算 |

## 开源清单

- [lighthouse](https://github.com/sigp/lighthouse)：Ethereum 客户端，信标链与执行层
- [reth](https://github.com/paradigmxyz/reth)：Rust 写的 Ethereum 客户端
- [optimism](https://github.com/ethereum-optimism/optimism)：OP Stack，乐观 rollup
- [cosmos-sdk](https://github.com/cosmos/cosmos-sdk)：Cosmos 区（zone）框架，Tendermint 共识
- [ibc-go](https://github.com/cosmos/ibc-go)：IBC 跨链协议 Go 实现
- [polkadot-sdk](https://github.com/paritytech/polkadot-sdk)：Polkadot/BSC 的 Substrate 与 FRAME
- [risc0](https://github.com/risc0/risc0) / [sp1](https://github.com/succinctlabs/sp1)：ZK 证明，有效性证明路线的底层
- [hbbft](https://github.com/poanetwork/hbbft)：POA Network 的异步 BFT（HoneyBadger 变体）Rust 实现

## 失败模式

- **51% 重组**：见[大算力攻击](/zh/hacking/51Attack)。算力超过全网一半即可无限重组。概率最终性下，攻击的边界是经济成本而非物理不可能。
- **长程攻击**：PoS 节点从创世开始同步时，作恶者可伪造整条历史。解法是弱主观性——新节点必须从近期可信状态起步，这本身是一个信任假设。
- **桥攻击**：Ronin（2022，约 6.25 亿美元）与 Wormhole（2022，约 3.26 亿美元）都是跨链结算合约的签名验证或权限漏洞。桥是信任传递通道，也是损失最大的一类攻击面。
- **欺诈证明挑战期内的资金锁定**：乐观 rollup 的提现要等挑战期过去，期间资金不可用。这是「乐观执行」买速度的代价。
- **ZK 证明的信任假设**：trusted setup（部分 ZK-SNARK）、电路漏洞、证明器 bug，都让「验证极快」的安全性完全压在证明器正确性上。
- **最终性回滚的级联**：L2 的最终性继承 L1。L1 重组时 L2 跟着回滚，L2 自己的用户看到的是「已经确认的交易被取消」。
- **验证人串谋与罚没失效**：罚没（slashing）是 PoS 的经济安全核心，但双签与环绕投票的证据化惩罚有边界；弱主观性让「共识历史不可信」成为逃不掉的代价。
- **共享安全的单点化**：模块化架构把执行与结算分离，但如果所有人最终都结算到同一条 L1，那条 L1 就是单点。

结算层的失败几乎都遵循同一模式：**信任传递的通道本身有漏洞**。读一个结算层案例时，先问「承诺结算到哪一层、谁验证那个承诺、那个验证者自己可信吗」。

## 设计要点

- 先选信任假设再选算法：崩溃容错（2f+1，[Paxos](/zh/consensus/Paxos)/[RAFT](/zh/consensus/RAFT)）还是拜占庭容错（3f+1，BFT 系），差价决定节点模型的全部成本。
- 最终性二选一：概率（确认数）吞吐高但可回滚，确定性（投票）不可逆但需 2/3 在线——出块 + 最终性 gadget 的混合架构可以两段都要。
- 共识资源决定抗女巫模型：算力/质押/身份/空间/时间，选哪个资源就继承哪个资源的经济与攻击面。
- 新节点引导是 PoS 的固有缺口：弱主观性意味着同步必须引入可信检查点，别假装可以从创世无信任重放。
