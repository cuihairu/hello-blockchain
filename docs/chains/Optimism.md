# Optimism

## 白皮书与规范

无单一白皮书——以 OP Stack 规范（[github.com/ethereum-optimism/specs](https://github.com/ethereum-optimism/specs) 与 [community.optimism.io](https://community.optimism.io/docs/how-sequencers-work/) 文档）为准；「Optimistic Rollup」概念源自 2018-2019 的 plasma/rollup 研究讨论（Vitalik Buterin 2019-06 rollup 帖、Plasma 系论文）；OP Mainnet 2021-12-16 上线。

## 解决什么问题

以太坊执行贵——把执行搬下链、数据发布回 L1，用「欺诈证明 + 挑战窗口」替代昂贵的密码学证明，先跑通 rollup-centric 路线图。

## 技术成果与贡献

- **OP Stack / Superchain**：把 Rollup 做成可 fork 的标准栈（Base、OP Mainnet 同栈），跨链消息层与共享升级治理。
- **欺诈证明去许可（2024-06）**：任何人可对错误状态根发起 Fault Proof 挑战——optimistic 结算的信任前提补全，见 [排序与结算](/consensus/Sequencing)。
- **Law of Chains 与共享排序意向**：排序器去中心化的路线文件（based/shared 排序的推动者）。
- **RetroPGF 与 bicameral 治理**：追溯性公共物品融资的代币治理实验。

## 局限与公开事故

- 单排序器中心化（可用性与审查面），7 天挑战窗口资金效率低。
- 公开事故：2021-11 L1 合约缺陷被重复利用铸造 2000 万 OP（追回大部分，白帽争议）；2023-06-09 排序器停机约 2 小时；2025-06 意外增发 2000 万 OP（治理失误，回收未全额）。
