# 共识趋势展望

本页只写两类内容：**现有证据**（可指向公开来源）与**未来 3 年可验证的观察点**（写成「看什么数字或事件」，不预测收益）。每条趋势的出处都列在条目末尾，未找到公开来源的说法不写。想看技术细节，按站内链接进对应的[共识](/zh/consensus/Consensus)或[分层](/zh/layers/Layers)页面；想看谱系年份，读[共识算法演进时间线](/zh/consensus-timeline)。

## ① 模块化：DA 层独立、结算与执行分离

**现有证据**：以太坊官方文档把「数据可用性」（DA）单独定义为一层——区块数据必须真的发布，轻节点用采样加纠删码确认；DA 可以不由执行层承担。Celestia 把 DA 做成独立专用链（[celestia-core 仓库](https://github.com/celestiaorg/celestia-core)），执行与结算留给上层 Rollup。

**代表项目**：Celestia（DA 专用链）、以太坊 blobs（L1 自带 DA）、各 Rollup（见[L2Beat](https://l2beat.com) 的链表）。

**未来 3 年可验证的观察点**：
- L2Beat 链表中「DA 层」一列出现非以太坊选项的新链数量是否上升。
- [以太坊路线图](https://ethereum.org/en/roadmap/) 中 DA 相关参数（blob 容量、价格上限）是否继续调整。

**出处**：[ethereum.org 数据可用性](https://ethereum.org/en/developers/docs/data-availability/)、[github.com/celestiaorg/celestia-core](https://github.com/celestiaorg/celestia-core)、[L2Beat](https://l2beat.com)、[以太坊路线图](https://ethereum.org/en/roadmap/)

## ② Restaking：安全预算被批发转售

**现有证据**：EigenLayer 把已质押的 ETH 再抵押给 AVS（主动验证服务），用同一份罚没威慑向多个协议出租安全；合约代码在 [Layr-Labs/eigenlayer-contracts](https://github.com/Layr-Labs/eigenlayer-contracts) 公开。这与站内 [Restaking](/zh/consensus/Restaking) 页的机制描述一致。

**代表项目**：EigenLayer 与各家 AVS；以太坊 L1 质押本身是安全预算的原始来源。

**未来 3 年可验证的观察点**：
- 再质押质押量占以太坊总质押的比例走势（EigenLayer 公开面板）。
- 上线的 AVS 数量与其实际承担的安全职责（哪些是真实基础设施，哪些只是质押池）。
- 是否出现「关联失败」——多个 AVS 依赖同一验证人集合，导致一次失效拖垮多条链（Vitalik 在《Don't overload Ethereum's consensus》中论证的边界）。

**出处**：[eigenlayer.xyz](https://eigenlayer.xyz)、[github.com/Layr-Labs/eigenlayer-contracts](https://github.com/Layr-Labs/eigenlayer-contracts)、[Don't overload Ethereum's consensus](https://vitalik.eth.limo/general/2023/05/21/dont_overload.html)

## ③ Shared Sequencing：排序权从单点走向共享

**现有证据**：Rollup 当前的排序器多为单点角色——软确认由排序器给出，L1 强制纳入与欺诈/有效性证明兜底（见[排序与结算](/zh/consensus/Sequencing)）。[Optimism 排序器文档](https://community.optimism.io/docs/how-sequencers-work/) 说明排序、强制纳入与共享排序的现行机制。

**代表项目**：OP Stack 共享排序、[Espresso](https://espressosys.com)（跨 Rollup 排序）、[Taiko](https://taiko.xyz) 与 [Taiko 文档](https://docs.taiko.xyz)。

**未来 3 年可验证的观察点**：
- 使用共享排序器的 Rollup 数量是否超过自建排序器的数量。
- 排序权是否进入质押与罚没体系（排序者作恶是否可被经济惩罚）。
- 强制纳入（force inclusion）的真实使用频率——它从「兜底」变成「常规路径」即意味着排序器中心化程度下降。

**出处**：[community.optimism.io 排序器文档](https://community.optimism.io/docs/how-sequencers-work/)、[espressosys.com](https://espressosys.com)、[taiko.xyz](https://taiko.xyz)、[docs.taiko.xyz](https://docs.taiko.xyz)

## ④ ZK 最终性：证明替代信任

**现有证据**：[以太坊官方文档](https://ethereum.org/en/developers/docs/scaling/zk-rollups/) 把 ZK Rollup 描述为「提交有效性证明」的路线——L1 验证证明通过即最终，无需等待挑战窗口。对比 [乐观 Rollup](https://ethereum.org/en/developers/docs/scaling/optimistic-rollups/) 的欺诈证明路线，最终性从「一段时间内没人反对」变成「证明已被验证」。

**代表项目**：各 ZK Rollup；[zkSync](/zh/chains/zkSync)、[Arbitrum](/zh/chains/Arbitrum)（乐观路线对照）；[Aptos](/zh/chains/Aptos)、[Sui](/zh/chains/Sui)（应用层并行执行 + BFT）。

**未来 3 年可验证的观察点**：
- ZK Rollup 与乐观 Rollup 在 [L2Beat](https://l2beat.com) 上的份额对比走势。
- 单次证明的成本与时间是否下降到可承受 L1 级别使用的水平。
- 最终性是否从「挑战窗口关闭」变成「证明验证通过」——这在协议层可逐条核对。

**出处**：[ethereum.org ZK Rollups](https://ethereum.org/en/developers/docs/scaling/zk-rollups/)、[ethereum.org Optimistic Rollups](https://ethereum.org/en/developers/docs/scaling/optimistic-rollups/)、[L2Beat](https://l2beat.com)

## ⑤ DAG 化账本：账本从链到图

**现有证据**：[GHOSTDAG](/zh/consensus/GHOSTDAG)（Sompolinsky 等 2018，[eprint 2018/104](https://eprint.iacr.org/2018/104)）把中本聪共识推广到 BlockDAG，Kaspa 是首个生产实现；[Mysticeti](/zh/consensus/Mysticeti)（[arXiv:2404.12257](https://arxiv.org/abs/2404.12257)）与 [Narwhal/Bullshark](/zh/consensus/NarwhalBullshark) 把 DAG 用在内存池与 uncertified 共识。两条线都在把「并发」从浪费变成资源。

**代表项目**：Kaspa（PoW BlockDAG）、[Sui](/zh/chains/Sui)（DAG 内存池 + Mysticeti）、[Aptos](/zh/chains/Aptos)（Block-STM 并行执行）。

**未来 3 年可验证的观察点**：
- 新建公链中「DAG 结构」占位的比例（白皮书可逐份核对）。
- uncertified DAG 是否成为新 BFT 实现的默认结构。
- DAG 结构的全节点内存与带宽开销是否下降到可被普通节点承担——这是 DAG 路线能否去中心化的硬指标。

**出处**：[eprint.iacr.org/2018/104](https://eprint.iacr.org/2018/104)、[arxiv.org/abs/2404.12257](https://arxiv.org/abs/2404.12257)、[github.com/kaspanet/rusty-kaspa](https://github.com/kaspanet/rusty-kaspa)

## ⑥ BFT 拓扑演进：HotStuff → Narwhal → Mysticeti

**现有证据**：[HotStuff](/zh/consensus/HotStuff)（Yin、Malkhi 等，[arXiv:1803.05069](https://arxiv.org/abs/1803.05069)，CCS'19）把三阶段 BFT 线性化，通信从 O(n²) 降到线性；Narwhal 把交易传播做成独立 DAG 内存池；[Mysticeti](/zh/consensus/Mysticeti) 再去掉逐轮证书（uncertified DAG），三跳提交取代两轮投票。这条线的设计方向是**减少每轮共识的网络往返**。

**代表项目**：[Sui](/zh/chains/Sui)（Mysticeti 主网运行）、[Aptos](/zh/chains/Aptos)（AptosBFT，HotStuff 系）、[DiemBFT](/zh/consensus/DiemBFT)。

**未来 3 年可验证的观察点**：
- 新 BFT 实现的论文中 uncertified DAG 的出现频率。
- BFT 的最终性延迟是否进入亚秒级并稳定保持。
- 通信复杂度与签名聚合技术（如批量聚合）是否成为论文标配。

**出处**：[arxiv.org/abs/1803.05069](https://arxiv.org/abs/1803.05069)、[arxiv.org/abs/2404.12257](https://arxiv.org/abs/2404.12257)

## ⑦ 随机性与 VRF：出块权要不可预知

**现有证据**：[Ouroboros](/zh/consensus/Ouroboros)（Kiayias 等，[eprint 2016/889](https://eprint.iacr.org/2016/889)）用 VRF 做秘密抽签选主；[BABE](/zh/consensus/BABE) 的盲分配、[Algorand](/zh/consensus/Algorand) 的 BA⋆ 都是同一思路；[PoT](/zh/consensus/POT) 用 [VDF](https://docs.chia.net/proof-of-time/) 保证挑战不可预知；[Filecoin 规范](https://spec.filecoin.io/) 用 drand 提供外部随机信标。

**代表项目**：Cardano（Ouroboros）、[Polkadot](/zh/chains/Polkadot)（BABE）、Chia（PoT/VDF）、Filecoin（drand）。

**未来 3 年可验证的观察点**：
- 随机信标是否继续外销（跨链共享的 VDF 服务出现数量）。
- VRF/VDF 的密码学假设是否出现新的可攻击性报告。
- 出块权分配是否从「抽签」扩展到「抽签 + 排序者」的混合模型。

**出处**：[eprint.iacr.org/2016/889](https://eprint.iacr.org/2016/889)、[docs.chia.net/proof-of-time/](https://docs.chia.net/proof-of-time/)、[spec.filecoin.io](https://spec.filecoin.io/)

## ⑧ 绿色与低功耗共识：资源换记账权

**现有证据**：[The Merge](/zh/chains/Ethereum)（2022-09-15）让以太坊从 PoW 转 PoS，能耗下降约 99.95%；[PoSpace](/zh/consensus/PoSpace) 与 [PoT](/zh/consensus/POT) 用硬盘与串行时间替代算力（[docs.chia.net/proof-of-space/](https://docs.chia.net/proof-of-space/)）；[PoST](/zh/consensus/PoST) 把「持续持有空间」计入安全（[spec.filecoin.io](https://spec.filecoin.io/)）；[SPoRA](/zh/consensus/SPORA) 用随机历史访问替代持续算力。

**代表项目**：以太坊（PoS）、Chia（PoSpace+PoT）、Filecoin（PoRep/PoST）、[Arweave](/zh/chains/Arweave)（SPoRA）。

**未来 3 年可验证的观察点**：
- 各链的能耗或证明强度指标是否成为公开的选型参数（白皮书是否给出可比数字）。
- 空间证明类网络的绘图成本与绘图产业集中度（这是「绿色成色」的真实折扣项）。
- 低功耗共识的抗女巫边界是否出现新攻击面。

**出处**：[docs.chia.net/proof-of-space/](https://docs.chia.net/proof-of-space/)、[spec.filecoin.io](https://spec.filecoin.io/)、[共识算法演进时间线](/zh/consensus-timeline)

## ⑨ 跨链互操作与信任最小化桥

**现有证据**：IBC（[ibc.cosmos.network](https://ibc.cosmos.network)）把跨链消息传递做成 Cosmos 生态内的协议，信任模型由 ICS 规范定义，而非依赖桥托管合约。对照站内[跨链桥攻击](/zh/hacking/CrossChainBridgeAttack)页记录的桥被攻击事件——桥是损失最大的攻击面，信任最小化是主方向。

**代表项目**：Cosmos IBC、[Polkadot](/zh/chains/Polkadot)（平行链 + XCM）、各类验证器集合桥。

**未来 3 年可验证的观察点**：
- 桥攻击事件的数量与金额走势（公开安全公告可逐条统计）。
- 桥的信任模型是否从「多签托管」转为「验证器集合 / 轻客户端验证」。
- 跨链共享排序（趋势 ③）与跨链互操作是否合并为同一套基础设施。

**出处**：[ibc.cosmos.network](https://ibc.cosmos.network)、[跨链桥攻击](/zh/hacking/CrossChainBridgeAttack)

## 怎么读这九条

九条不是并列的「未来预测」，而是各自对应一个**已经发生的工程事实**与一个**可以核对的指标**：

| 趋势 | 已有事实 | 核对指标 |
| --- | --- | --- |
| ① 模块化 | DA 已从执行层分离定义 | 新链 DA 层选项数量 |
| ② Restaking | 再质押合约已上线 | 再质押占比与 AVS 数量 |
| ③ Shared sequencing | 共享排序已有实现 | 使用方数量、强制纳入频率 |
| ④ ZK 最终性 | ZK Rollup 已在主网 | 份额走势与证明成本 |
| ⑤ DAG 账本 | BlockDAG 与 uncertified DAG 已上线 | 全节点开销、新链采用率 |
| ⑥ BFT 拓扑 | uncertified DAG 已成论文主线 | 最终性延迟、通信复杂度 |
| ⑦ VRF | VRF/VDF 已是标配 | 外部随机信标数量 |
| ⑧ 绿色共识 | PoS 与空间证明已替代算力 | 能耗指标是否公开可比 |
| ⑨ 跨链 | IBC 已定义信任模型 | 桥攻击数量与信任模型 |

未在本页出现的内容：任何没有公开来源支撑的收益预测、任何「即将取代」式的判断、任何未经验证的事故归属。查不到公开来源的说法在本站内统一标注为「未找到公开记录」或「来源未考」。
