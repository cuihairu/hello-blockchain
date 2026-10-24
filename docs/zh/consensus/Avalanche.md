# Avalanche

Avalanche（雪崩）是一个高吞吐智能合约平台，其共识结合了 **Snowball 族亚采样概率共识**与**质押加权**，由 Ava Labs 于 2018-2020 年推出（白皮书署名 Team Rocket，创始团队 Emin Gün Sirer 等）。

## 四要素

- **在哪一层**：[结算层](/zh/layers/Settlement) —— 亚采样概率共识 + 质押加权，X/P/C 三链分治
- **解决什么**：既要无许可与高吞吐，又要快确认——用随机亚采样替代全网广播投票，用质押决定权重
- **解决得怎么样**：出块秒级、交易亚秒级确认，通信量小；代价是最终性是概率性的（安全阈值 1/2 而非 1/3 的例外模型）、质押集中度高、三链架构增加理解与运维成本
- **出处**：Team Rocket《Scalable and Probabilistic Leaderless BFT Consensus through Metastability》2018；Ava Labs 平台白皮书 2020

## 共识结构：三链设计

1. **X-Chain（Exchange）**：资产创建与交易，运行 Avalanche 共识（DAG 形态，交易间非线性序）。
2. **P-Chain（Platform）**：验证人管理、质押、子网（Subnet）创建，运行 Snowman（链式 Snowball）。
3. **C-Chain（Contract）**：EVM 兼容合约链，运行 Snowman 共识。

这种"不同子网可选不同虚拟机与共识参数"的架构是 Avalanche 与单体链的主要区别。

## 共识特性

- **亚采样投票**：验证人随机询问 $k$ 个对端，重复至置信度达标；质押权重用于选择与抗女巫，不是概率权重。
- **秒级概率最终性**：主网参数下通常 1~2 秒接受，无 epoch/委员会轮换。
- **无 leader**：交易由任意验证人提交，避免打包审查单点；费用按 EIP-1559 动态基费（C-Chain）。
- **安全阈值**：作恶权重需 ≥ 1/2 才能阻止共识收敛（区别于 BFT 的 1/3——这是概率安全模型的阈值）。

## 质押与奖励

主网验证人最低质押 2000 AVAX（2023 年后参数），质押时长 2 周~1 年；质押只是准入与治理权重，不出块奖励来自手续费（主网曾以增发补贴早期验证人，后逐步纯手续费化）。

## 与同代公链对比

- vs Solana：Solana 靠 PoH+TowerBFT 串行高 TPS，Avalanche 靠子网并行与无 leader 共识。
- vs Cosmos：Cosmos 每条链独立验证人集合，Avalanche 子网可复用主网验证人（新模型）或自建集合。
