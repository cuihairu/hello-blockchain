# TRON 波场

TRON 是 2017 年创立、2018-05-31 主网上线的公链：DPoS 共识由 27 个超级代表（Super Representative, SR）轮流出块，TVM 与 EVM 字节码级兼容，因承载大额 TRC-20 USDT 结算轨道而为人熟知。

### 基本原理和技术特点

1. **DPoS 共识**：
   - TRX 持有者投票选出 27 个超级代表轮流出块，另有 SR Partner 与 SR Candidate 两个层级分享奖励；投票计数周期为 6 小时。
   - 27 个活跃 SR 组成委员会，可对链上参数发起表决，见 [DPoS](/consensus/DPOS)。

2. **TVM 虚拟机**：
   - TRON Virtual Machine 与 EVM **字节码级兼容**，以太坊 Solidity 合约与 Truffle 工程可低成本迁移；地址编码、手续费单位与部分预编译操作码存在差异，官方文档提供 TVM vs EVM 对照。
   - 智能合约语言沿用 Solidity，见[账户模型](/model/Account)——TRON 与以太坊同属账户模型。

3. **资源模型**：
   - 转账与合约执行消耗 Bandwidth 与 Energy 两类资源：冻结 TRX 换取资源或直接燃烧 TRX 支付，免费带宽有每日额度。

### 生态与发展

- **USDT 轨道**：TRC-20 版 USDT 是 TRON 上最重要的资产，凭借低费与快速确认成为高频结算场景的主流选择，见[Tether](/chains/Tether)。
- **BitTorrent**：2018 年 TRON 收购 BitTorrent，其后推出 BTT 代币。
- **客户端**：核心客户端 java-tron 由 TRON DAO 维护，开源在 [tronprotocol/java-tron](https://github.com/tronprotocol/java-tron)。

### 应用场景

- **稳定币结算**：小额高频转账与跨境结算，TRC-20 USDT 占据主要份额。
- **dApp 与游戏**：依托 EVM 兼容承接以太坊系应用。

### 总结

TRON 用 DPoS 换取低费与快确认，用 EVM 兼容降低迁移成本，再以稳定币轨道确立生态位。它的取舍与 [EOS](/chains/EOS) 同族：牺牲去中心化程度换取吞吐，见[共识算法演进时间线](/consensus-timeline)的 DPoS 脉络。
