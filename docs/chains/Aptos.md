# Aptos

## 白皮书与规范

《Aptos 白皮书》（2022-06，Aptos Labs：Mo Shaikh、Avery Ching，Diem/Novi 核心团队）；节点规范与 AptosBFT 论述见 [github.com/aptos-labs/aptos-core](https://github.com/aptos-labs/aptos-core) 与 [aptos.dev](https://aptos.dev)；主网 2022-10-17 上线。

## 解决什么问题

Diem 胎死腹中，但它的 BFT（[DiemBFT](/consensus/DiemBFT)）与 Move 语言（见 [计算层](/layers/Compute)）是成熟资产——Aptos 把这套栈搬进无许可公链，正面回答「高吞吐 + 安全升级机制」。

## 技术成果与贡献

- **AptosBFT**：DiemBFT/Jolteon 系 HotStuff 衍生（见 [HotStuff](/consensus/HotStuff)），亚秒级确定性最终性。
- **Block-STM 并行执行**：乐观并发 + 冲突重试的软件事务内存，把 EVM 串行执行的瓶颈拆掉。
- **Move 资源类型系统**：资产建模为线性资源，防复制防重入。
- **Keyless 账户与升级治理**：passkey/ZK 登录；链上治理驱动的升级流程以「升级即攻击面」闻名（见[智能合约漏洞](/hacking/SmartContractVulnerabilities)）。

## 局限与公开事故

- 官宣 TPS 与主网实际吞吐长期存在量级差距，营销争议。
- 生态规模与 TVL 落后叙事。
- 公开事故：2023-10-19 主网停摆约 5 小时（升级后验证人配置分歧，共识无法推进）——升级流程脆弱性的实证案例。
