# 带宽证明（Bandwidth Proof）

带宽证明指「证明你真实贡献了网络带宽」这一类机制：节点把闲置带宽共享给网络，验证方按贡献量给予奖励。代表项目是 **Grass**——一个带宽共享网络，用户安装客户端共享闲置带宽，获得 Grass Points 与 GRASS 代币；机构买家使用这些带宽开展在线服务（[grassfoundation.io](https://grassfoundation.io/)、[grass.io](https://www.grass.io/)）。

## 四要素

- **在哪一层**：[结算层](/zh/layers/Settlement)（资源证明族）——Grass 不是公链，没有传统意义的出块共识；带宽贡献的验证与激励按「资源换验证权」逻辑归入结算层
- **解决什么**：把分散的闲置带宽聚合成可测量的资源网络，并按贡献分配奖励——难点是「带宽贡献」如何被验证而非口头声明
- **解决得怎么样**：官方公开资料只给出「validator 签名测量 + 声誉 + 质押加权」的验证口径（[meshio 调研合并，2026-10-13](/zh/layers/Layers)）；带宽证明的具体协议与密码学构造未找到公开记录；白皮书不可考（见下）
- **出处**：[grassfoundation.io](https://grassfoundation.io/)、[grass.io](https://www.grass.io/)；机制描述口径为 [meshio research 合并（2026-10-13）](/zh/layers/Layers)

## 已知机制（官方公开资料）

- **共享与奖励**：用户安装移动端、桌面端或浏览器扩展，授权共享闲置带宽；奖励分两类——Uptime Points（在线与推荐）与 Network Points（连接实际处理流量）（[grass.io](https://www.grass.io/)）。
- **GRASS 代币**：官方称其为 Grass Network 的原生代币，奖励可以 USDC 形式发放；部分司法辖区不参与（[grass.io](https://www.grass.io/)）。
- **验证口径**：带宽贡献的验证依赖 validator 签名测量、声誉与质押加权，而非链上出块共识——这与 [PoSpace](/zh/consensus/PoSpace)/[PoC](/zh/consensus/POC) 的「资源换记账权」同族，但验证发生在链下服务网络（[meshio research 合并](/zh/layers/Layers)）。
- **隐私**：官方称用户个人数据不对 Grass 或任何人可见，共享上限由用户设备设定（[grass.io](https://www.grass.io/)）。

## 白皮书不可考

Grass 原技术白皮书（grass.io/whitepaper）返回 **404 不可考**——本条目的机制描述以现行官方文档与 meshio 调研口径为准，不对白皮书内容做任何断言。

## 与同族证明的差异

| 证明 | 证明的资源 | 验证方式 | 代表 |
| --- | --- | --- | --- |
| [PoW](/zh/consensus/POW) | 算力 | 哈希难题 | [比特币](/zh/chains/Bitcoin) |
| [PoSpace](/zh/consensus/PoSpace) | 硬盘空间 | 挑战-响应 + plot | Chia |
| [PoC](/zh/consensus/POC) | 无线覆盖 | 三方探测 + 物理定律 | Helium |
| 带宽证明 | 闲置带宽 | validator 签名测量 + 声誉 + 质押（链下） | Grass |

## 失败模式

- **验证细节不公开**：带宽测量与防作弊构造无公开协议，外部无法独立审计——「证明强度」目前只能按官方口径陈述。
- **女巫与代理伪造**：带宽贡献天然可伪造（代理池、虚假流量），声誉与质押加权是已知防线，但具体参数未公开。
- **主网级重大事故**：未找到公开记录。

带宽证明是「资源换验证权」这条线在带宽维度的延伸：从算力、空间到覆盖，再到带宽——每换一种资源，验证方式就要重新回答「这个资源真的被贡献了吗」。Grass 把这个问题工程化了，但答案的公开程度目前是资源证明族里最低的一档。
