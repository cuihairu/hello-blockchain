# Arbitrum

## 白皮书与规范

《Arbitrum: Scale with Off-chain Fraud Proofs》，Ed Felten、Harry Kalodner 等（Offchain Labs）2018；Nitro 规范（[docs.arbitrum.io](https://docs.arbitrum.io)）与 BoLD 验证白皮书 2023；One 主网 2021-08-31、Nitro 2022-08-31 上线。

## 解决什么问题

与 Optimism 同题——把以太坊执行搬下链——但押注**交互式欺诈证明**：挑战是双方二分对局而非单轮证明，把「证明一种执行」的成本从「在 EVM 里重放」降为「在链上对弈」。

## 技术成果与贡献

- **交互式欺诈证明（Nitro）**：挑战协议在 WASM 指令级二分，单步断言链上仲裁——optimistic 结算的最强实现之一，见 [排序与结算](/zh/consensus/Sequencing)。
- **BoLD 去许可验证（2025-02）**：挑战从一对一改为多方竞赛，消除延迟攻击。
- **Stylus（2024-09）**：WASM 合约与 EVM 同 VM 共存（执行层扩展，见 [计算层](/zh/layers/Compute)）。
- **Orbit 链**：Arbitrum 技术栈一键起链（L3/应用链路线）。

## 局限与公开事故

- 单排序器（可用性事故史）、DAO 国库治理大额动议争议（2023-03 AIP-1）。
- 公开事故：2023-02-25 排序器故障全网停写约 10 小时；2023-12-15 再次部分停写约 2 小时；2024-10 ArbOS 升级缺陷导致短暂停止出块（快速修复）。
