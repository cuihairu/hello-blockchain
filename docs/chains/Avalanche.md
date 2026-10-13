# Avalanche 雪崩

## 白皮书与规范

《Scalable and Probabilistic Leaderless BFT Consensus through Metastability》——"Team Rocket"（匿名）2018-05 发布于 IPFS；Ava Labs 后续维护 AVA 文档与规范（[docs.avax.network](https://docs.avax.network)）。主网 2020-09 上线。

## 解决什么问题

经典 BFT 通信复杂度 O(n²) 撑不起几千节点，最长链又要等确认——Avalanche 用亚采样投票把「达成一致」变成概率收敛：每轮只问一小撮节点，重复后全网偏好迅速坍缩到同一值（亚稳态）。

## 技术成果与贡献

- **Snowman 共识链**：Avalanche 共识族的线性化实例用于出块，见 [Snowball](/consensus/Snowball)、[Snowman](/consensus/Snowman)——无领导、亚秒确认、概率最终性（安全阈值 1/2，BFT 例外）。
- **子网（Subnets）架构**：验证人可只订阅部分子网，自定义虚拟机与合规边界——异构多链路线（对照 [Polkadot](/chains/Polkadot) 的共享安全）。
- **三链分工**：X-Chain（资产）、P-Chain（质押与子网元数据）、C-Chain（EVM 兼容）。
- **Subnet-Only Validation（2024-25）**：Etna 升级后子网可不依赖主网验证人集，进一步自治。

## 局限与公开事故

- 概率最终性无硬承诺；参数（k、α）对安全边界敏感。
- 子网碎片化稀释主网流动性与安全预算；验证人数量长期低于以太坊量级。
- 公开事故：2023-02-21~26 铭文流量造成主网数天级出块停滞（节点协调重启恢复）——高负载下活性的实证压力测试。
