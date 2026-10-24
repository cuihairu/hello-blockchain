# IOTA Tangle

IOTA 是 2015 年上线的 IoT 定位网络，账本不是链而是 **Tangle**——一张有向无环图：每笔新交易必须批准两条旧 tip，没有区块、没有矿工、零手续费。共识就是「谁能成为被批准的 tip」：理论上由累计权重与随机游走选择决定，实际上从上线到 2020 年靠一个中心化的 **Coordinator** 兜底。

## 四要素

- **在哪一层**：[结算层](/zh/layers/Settlement) —— DAG 账本上的概率最终性，长期依赖协调器（账本结构见 [DAG 模型](/zh/model/DAG)）
- **解决什么**：IoT 微交易场景下的零手续费记账——用「批准两条 tip」代替区块与矿工激励，让 0 值交易也有意义
- **解决得怎么样**：tip 选择在低流量下不收敛、在恶意流量下可被寄生链攻击，导致上线后的实际定案权长期握在 Coordinator（IOTA 基金会每两分钟发一次里程碑）；2020 年 2 月 Trinity 钱包被盗后基金会关闭 Coordinator，全网停摆近一个月——去中心化承诺在最需要的时候失效；Coordicide（2020 白皮书）计划移除协调器，最终 2025 年 Rebased 升级直接把主网换成账户模型 + 委托 PoS（采用 Mysticeti 共识引擎），Tangle 路线退出主网。公开事故记录充分
- **出处**：Popov《The Tangle》白皮书 2015（<https://www.iota.org/resources/whitepaper>）；Coordicide 白皮书 2020（<https://files.iota.org/papers/Coordicide_WP.pdf>）

## 核心机制

- **批准即共识**：每笔交易验证签名 + 选择两条 tip 批准，附带一次轻量 PoW（防女巫/防垃圾交易）。
- **累计权重**：一笔交易的权重 = 自己 + 所有直接或间接批准它的交易数——被越多后来者背书越「确定」。
- **tip 选择（MCMC）**：从创世起沿「批准我的交易」随机游走两次，落在两条未被批准的 tip 上——低流量时游走容易停在旧 tip，实践中靠引擎内置的「畅销 tip」规则兜底。
- **Coordinator 里程碑**：基金会签名的里程碑交易被全网无脑接受，实质上是「每两分钟一个中心化区块」——白皮书承认这是过渡态，但过渡持续了约十年。
- **Coordicide（未及主网）**： mana（声誉资源）+ FPC（快速概率共识）移除协调器；路线图走完前架构已被 Rebased 取代。

## 与同族协议的差异

| 协议 | 关系 | 关键差异 |
| --- | --- | --- |
| [Hashgraph](/zh/consensus/Hashgraph) | 同类（DAG 账本） | Hashgraph 有 aBFT 的虚拟投票与定案规则；Tangle 的定案长期靠协调器 |
| [Narwhal 与 Bullshark](/zh/consensus/NarwhalBullshark) | 同类（DAG 定序） | Narwhal 的 DAG 只做内存池，定序交给 Bullshark；Tangle 想让 DAG 本身就是账本 |
| [Lachesis](/zh/consensus/Lachesis) | 同类（DAG BFT） | Lachesis 是带 aBFT 证明的 DAG 共识并真上了主网；Tangle 是协调器兜底的 DAG 账本 |
| [PoW](/zh/consensus/POW) | 对照 | 同样有概率最终性，但 PoW 不需要任何人兜底就能收敛 |

## 失败模式

- **协调器单点**：去中心化账本的最终性由一个签发者决定——2020 年关停即全网停摆，这是 DAG 类设计最刺眼的公开失败记录。
- **低流量死锁**：没有足够新交易时 tip 选择失去统计意义，概率最终性变成「没人批准就永远不确定」。
- **寄生链攻击**：恶意构造的批准子图可以骗过权重计算——白皮书后续版本为此多次修改 tip 选择规则。

Tangle 的教训比它的机制更有普适性：**概率最终性需要足够大的交易流才收敛，收敛不了的部分总得有人兜底**——而兜底者就是事实上信任锚。
