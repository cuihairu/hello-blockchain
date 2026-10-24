# 覆盖证明（Helium PoC）

Helium 要解决的问题是「无线覆盖声明不可验证」：热点说我覆盖了这片区域，怎么证伪？答案是把物理世界的探测做成密码学挑战——**Proof of Coverage（PoC）**：challenger 发出无线挑战，目标热点应答，邻近热点作证，证词按物理定律（信号平方反比、光速到达时间上界）校验。它是对物理状态做可证伪声明的完整样本。

## 四要素

- **在哪一层**：[结算层](/zh/layers/Settlement)的抗女巫扩展——不选谁出块，选「谁的物理声明可信」；共识本身早期由 [HoneyBadgerBFT](/zh/consensus/ABFT) 共识组承担
- **解决什么**：让「我在这里、我有覆盖」成为可验证声明——假位置、假覆盖在物理定律与三方探测面前不经济
- **解决得怎么样**：PoC 支撑了全球最大的 LoRaWAN 去中心化网络；但自建链（Erlang + HBBFT）在智能合约与桥接上长期缺位，2023-04-18 整体迁到 Solana，PoC 计算交给 oracle、结算走 Solana——「物理证明」与「出块共识」最终彻底解耦。公开事故：2020 年区块链停摆记录（自研链稳定性不足是迁移的官方理由之一）
- **出处**：Helium 白皮书（<https://github.com/helium/whitepaper>）；HIP-25（验证者）、HIP-51/52/53（subDAO）、HIP-70（Solana 迁移）；官方文档（<https://docs.helium.com/>）

## 核心机制

- **三方角色**：challenger（构造多层加密挑战包）、transmitter（被要求发射的目标热点）、witness（邻近热点听证）——任何一方都难以单独伪造。
- **物理一致性校验**：证词按信号强度（平方反比定律）与到达时间（光速上界）交叉验证，位置造假要同时骗过物理定律与邻居。
- **防伪熵源**：挑战信标改用 oracle 提供的难伪造熵（HIP-70），堵住「预测挑战提前布局」的口子。
- **共识组时代（已成历史）**：白皮书设计里得分最高的矿工组成 HBBFT 共识组出块，阈值加密防单节点审查；验证者最低 10,000 HNT 质押（HIP-25）——Solana 迁移后这套全部退役。
- **经济闭环**：数据用量计为 Data Credits（1 DC = $0.00001，只能烧 HNT 铸造、不可转让）——用量锚定法币、主币随用量通缩的 burn-and-mint 模型。

## 与同族协议的差异

| 协议 | 关系 | 关键差异 |
| --- | --- | --- |
| [PoSpace](/zh/consensus/PoSpace) / [PoST](/zh/consensus/PoST) | 同类（资源证明） | 它们证明「拥有磁盘」，PoC 证明「物理位置与覆盖」——挑战对象是无线电不是存储 |
| [PoET](/zh/consensus/PoET) | 同类（可信硬件侧） | PoET 信任 TEE 内部时钟，PoC 信任物理定律与多方证词 |
| [ABFT](/zh/consensus/ABFT)（HoneyBadgerBFT） | 其出块共识 | PoC 只解决「谁有资格被奖励」，定序由 HBBFT（后为 Solana）承担 |
| [HoneyBadgerBFT](/zh/consensus/HoneyBadgerBFT) | 组件 | 异步原子广播 + 阈值加密，是白皮书时代的共识组引擎 |

## 失败模式

- **博弈攻防永不停歇**：假热点（种在窗口边、加放大器）、伪造证词、位置声明攻击——PoC 参数（挑战频率、 witness 门槛）长期在调整。
- **自建链的代价**：共识组 + Erlang 栈三年即被整体替换——物理证明做得再好，结算层的工程短板足以拖垮全局。
- **oracle 依赖**：迁移后 PoC 验证与奖励计算集中在 oracle，物理证明的可信性从「全网」收缩到「oracle 运营方」。

> 源：meshio research（2026-10-13 合并）——机制与迁移细节取自 meshio 仓 `docs/research/comparable-chains.md` 的 Helium 节。
