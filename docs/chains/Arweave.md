# Arweave

## 白皮书与规范

《Arweave: A Protocol for Economically Sustainable Information Access》（黄皮书，Sam Williams，2018-06 首版，[arweave.org/whitepaper](https://www.arweave.org/whitepaper)）与 Lightpaper 2023；主网 2018-06 上线（共识 2022-03 起为 SPoRA，2.6 版本 2023 年持续调优）。

## 解决什么问题

「互联网的遗忘」——链接失效、平台关停数据即蒸发。Arweave 用一次性预付 + 存储基金把「永久存储」做成经济模型，共识本身为它服务。

## 技术成果与贡献

- **blockweave + SPoRA**：出块必须随机访问历史数据（Proof of Access），VDF 限速——机制详见 [SPoRA](/consensus/SPORA)。
- **Endowment 基金**：一次付费按现价预付约 200 年存储，基金随时间向矿工支付复制证明费用。
- **Permaweb 与网关层**：内容寻址永久网页；网关提供索引/查询（ArQL）——[存储层](/layers/Storage)「链上承诺 + 链下可取」的完整样本。
- **SmartWeave 惰性求值**：合约执行外包给使用者，共识不背执行（对照 [计算层](/layers/Compute) 的确定性要求）。
- **AO（2024）**：相邻计算层叙事，向 weave 上挂计算进程。

## 局限与公开事故

- 永久承诺依赖「存储成本单调下降」宏观假设；基金池耗尽风险由 redenomination 安全阀兜底。
- 网关层中心化（arweave.net 一家独大）；SmartWeave 执行完全信任客户端。
- 公开事故：未找到公开记录。
