# zkSync

## 白皮书与规范

《zkSync: Scaling with SNARKs》（Matter Labs，Alex Gluchowski 等 2019）；Era 的证明系统与 VM 规范见 [docs.zksync.io](https://docs.zksync.io) 与 [github.com/matter-labs/zksync-era](https://github.com/matter-labs/zksync-era)；zkSync 1.0 主网 2020-06、Era（zkEVM）2023-03-24 上线。

## 解决什么问题

optimistic 路线要等 7 天才最终——ZK 路线用有效性证明把「正确」做成密码学事实：L1 合约验证通过即最终，无挑战窗口。代价是证明生成成本与 VM 兼容工程。

## 技术成果与贡献

- **zkEVM（Era）**：在 SNARK 友好的 VM 上执行 EVM 兼容字节码（Boojum 重构后成本大幅下降）——证明系统见 [零知识证明](/zh/Privacy/ZeroKnowledgeProof)。
- **共享桥与原生账户抽象**：L1/L2 共享资产桥，账户抽象为默认。
- **ZK Stack → Elastic Chain（2024）**：多条 ZK 链互操作 的模块化叙事（对照 [排序与结算](/zh/consensus/Sequencing) 的模块化分支）。
- **Boojum（2023-12）**：证明电路迁到 STARK-backed + 金字塔式递归，证明成本降一个量级。

## 局限与公开事故

- 证明生成中心化（排序器 + 证明者一体），去中心化证明者仍在路线图。
- EVM 兼容存在语义差异（编译型 zkEVM），开发者迁移有摩擦。
- 2024-06 代币空投分配争议（社区声誉受损，非技术事故）。
- 公开事故：未找到公开记录（主网级资金损失；2024-06 空投分配争议属治理与社区层面，非链故障）。
