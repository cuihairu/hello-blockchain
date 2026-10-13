# Sui

## 白皮书与规范

《Sui Lutris: A Blockchain with Combined Order and Execution》（白皮书 2022-07）与与对象模型文档，Mysten Labs（Evan Cheng、George Danezis、Adeniyi Abiodun 等，[docs.sui.io](https://docs.sui.io)）；主网 2023-05-03 上线。

## 解决什么问题

大多数链把「给交易定序」和「执行交易」绑在一起付全价——但很多操作（转账一个独立拥有的对象）根本不需要全网定序。Sui 把共识只花在需要它的事务上。

## 技术成果与贡献

- **Move 对象模型**：资产是线性资源对象（见 [计算层](/layers/Compute)），owned object 转移走 **fastpath** 绕过共识，共享对象才进全局定序。
- **DAG 内存池共识**：Narwhal/Bullshark 起家，2024 年换 [Mysticeti](/consensus/Mysticeti) 后最终性约 400 ms，见 [Narwhal 与 Bullshark](/consensus/NarwhalBullshark)。
- **zkLogin**：用 Web2 账号（Google 等）+ ZK 证明生成链上账户——入口层创新。
- **SuiBridge 与原生随机**：跨链桥与可验证随机数内建。

## 局限与公开事故

- fastpath 只覆盖单主对象操作，复杂 DeFi 仍走全局共识。
- 主网早期验证人少、中心化质疑持续；Move 生态工具链门槛高于 EVM。
- 公开事故：2025-05 Cetus 协议被攻击（约 2.2 亿美元，协议层缺陷）——验证人投票冻结攻击者资金，引发「链级干预」的治理边界争议；共识层本身未找到公开记录。
