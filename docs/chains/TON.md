# TON（The Open Network）

TON 起点是 Telegram 2018 年的 TON 白皮书（Nikolai Durov 主笔）：为十亿级用户设计的「区块链的区块链」——主链管共识与配置，工作链处理交易，原生支持任意数量工作链的分片扩展。Telegram 因 SEC 诉讼于 2020 年退出后，开源社区接续开发，主网 2021 年上线，即今天的 The Open Network。

### 基本原理和技术特点

1. **Catchain 共识（BFT）**：
   - 验证人之间用 Catchain 共识协议对区块达成拜占庭容错一致，出块权由 PoS 质押决定：质押 Toncoin 竞选验证人，见 [BFT](/consensus/BFT) 与 [PoS](/consensus/POS)。

2. **主链+工作链架构**：
   - **主链（masterchain）**承载网络配置与最终共识，**工作链（workchain）**处理交易，工作链可再分片；这是把「分片」做成一等公民的设计，与[记账模型](/model/Models)的 DAG 路线互为对照。
   - 智能合约运行在 TON VM（TVM）上，合约语言为 FunC/Fift。

3. **Telegram 分发入口**：
   - TON 与 Telegram 深度集成（钱包内嵌、机器人支付、mini app），是「即时通讯软件带链」路线的代表。

### 生态与发展

- **项目沿革**：2018 年白皮书与约 17 亿美元私募 → 2019 年 SEC 起诉 → 2020 年 Telegram 退出并退还投资款 → 社区（TON Foundation）接续，2021 年主网上线。链的归属看谁在维护客户端，不看当初谁宣布。
- **Toncoin**：原生代币，用于质押、支付交易费与治理。
- **官方资料**：[TON 文档](https://docs.ton.org/)（含 Catchain 共识纲要）；白皮书原文在 [ton-blockchain/ton](https://github.com/ton-blockchain/ton) 仓库。

### 应用场景

- **支付与社交集成**：依托 Telegram 用户的转账、打赏与机器人收款。
- **高吞吐分片应用**：需要水平扩容的大规模消费级应用。

### 总结

TON 的技术要点是 BFT+PoS 的 Catchain 共识叠加原生多链分片；它的历史要点则是「项目发起方退出、社区接续」的少见样本。共识谱系位置见[共识算法演进时间线](/consensus-timeline)。
