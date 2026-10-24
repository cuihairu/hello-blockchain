# Near

## 白皮书与规范

《Nightshade: Near Protocol Sharding Design》与协议白皮书，Alexander Skidanov、Illia Polosukhin 2018-2019（[github.com/nearprotocol/nearcore](https://github.com/nearprotocol/nearcore) 与 [docs.near.org](https://docs.near.org)）；主网 2020-04 上线。

## 解决什么问题

分片是扩容的显式路线，但分片链的跨片交易、状态一致与验证人分配互相纠缠——Near 要把「一条链的体验」与「分片的吞吐」同时做对：账本与状态分片，开发与用户不分片。

## 技术成果与贡献

- **Nightshade 分片**：状态与执行分片为多个 shard，每块由各分片的 chunk 拼成——跨片交易经 receipt 异步执行。
- **Doomslug 最终性**：两轮消息的 「半程（doomslug）→ 全程（finality）」设计，先给快速确认再补确定性——与 BFT 家族（见 [BFT](/zh/consensus/BFT)）同一思路的轻量化。
- **WASM 合约 + 人类可读账户名**：合约 Rust/AssemblyScript 编译到 WASM（执行见 [计算层](/zh/layers/Compute)）；`alice.near` 式命名是服务发现（见 [服务发现](/zh/layers/ServiceDiscovery)）的链上原生形态。
- **分阶段上线**：夜影从分片执行到状态分片的渐进路线（2023 起进入 Phase 2+ 讨论）。

## 局限与公开事故

- 分片完整形态（无状态验证 + 动态重新分片）交付节奏慢。
- 生态 TVL 与开发者规模长期低于头部 EVM/Solana 生态。
- 公开事故：未找到公开记录。
