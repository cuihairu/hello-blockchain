# 存储层

存储层负责状态与数据的持久化与可验证：链上全局状态（Merkle 树）、状态租金、数据可用性（DA），以及链下/去中心化存储网络（内容寻址 + 证明）。它回答三个问题：**数据在哪、还在不在、取到的就是那一份吗**。

## 定义

存储层 = 状态树 + 数据可用性 + 持久化激励。

- **状态树**：把全局状态（账户、合约存储）组织成 Merkle 树，根哈希被[结算层](/layers/Settlement)承诺。任何状态变更都反映为根的变化，轻节点只需根就能验证某个状态是否存在。
- **数据可用性（DA）**：区块生产者必须真的把数据发出来，否则轻节点无法验证。DA 采样 + 纠删码让轻节点用少量随机采样高概率确认「数据已发布」。
- **持久化激励**：链下存储需要有人长期存。Filecoin 用复制证明（PoRep）+ 时空证明（PoSt）让「存了且还在存」可验证；Arweave 用一次付费永久存储的 endowment 模型。

存储层之上是[计算层](/layers/Compute)（读写状态）与[服务发现](/layers/ServiceDiscovery)（内容寻址），之下是[结算层](/layers/Settlement)（承诺状态根）。

## 解决的问题

1. **状态爆炸**：全节点要存全部历史状态，几年下来只有大机构跑得动全节点 → 节点中心化。解法是状态过期、无状态（用 witness 代替全状态）、状态租金。
2. **数据可用性**：轻节点如何确认区块数据真的发布过，而不是被扣留？解法是 DA 采样与纠删码（2D Reed-Solomon）。
3. **持久化激励**：链下存储谁来存、怎么证明还在存？解法是存储证明（PoRep/PoSt）与存储市场。
4. **内容寻址**：按内容哈希寻址，内容变则哈希变，天然防篡改。链上只存哈希，内容放链下——链上承诺哈希，链下保证可取。

## 现有系统

| 类别 | 系统 | 机制 |
| --- | --- | --- |
| 链上状态 | 以太坊 Merkle Patricia Trie | 状态根被块承诺；路线图是无状态与状态过期 |
| 去中心化存储 | Filecoin | PoRep + PoSt，存储市场与检索市场分离 |
| 永久存储 | Arweave | blockweave，一次付费、endowment 利息支付永久存储 |
| 以太坊生态存储 | Swarm | 与以太坊对齐的激励层，内容寻址 |
| 数据可用性层 | Celestia、EigenDA、EIP-4844 blob | 只做 DA 不做执行，模块化分层 |
| 索引与查询 | The Graph | 子图索引链上数据，GraphQL 查询 |
| 传统去中心化存储 | Storj、Sia | 纠删码 + 合约，无链上证明 |

## 开源清单

- [go-ethereum](https://github.com/ethereum/go-ethereum)：Merkle Patricia Trie 与状态树实现
- [lotus](https://github.com/filecoin-project/lotus)：Filecoin 节点实现（PoRep/PoSt）
- [arweave](https://github.com/ArweaveTeam/arweave)：Arweave 节点与 blockweave
- [celestia-node](https://github.com/celestiaorg/celestia-node)：Celestia DA 节点
- [kubo](https://github.com/ipfs/kubo)：IPFS 参考实现，内容寻址
- [graph-node](https://github.com/graphprotocol/graph-node)：The Graph 索引节点
- [bee](https://github.com/ethersphere/bee)：Swarm 节点实现

## 失败模式

- **状态膨胀 → 节点中心化**：全节点门槛越高，能独立验证的人越少，网络越依赖少数大节点。这是存储层最隐蔽也最致命的失败。
- **存储证明的女巫攻击**：伪造 PoSpace/PoRep 就能白拿奖励，所以证明必须绑定硬件假设（PoRep 的密封成本）或密码学假设（PoSt 的连续挑战）。
- **数据扣留**：矿工/验证人发布块头但不发布数据，轻节点无法发现。DA 采样与纠删码让「扣留」在统计上暴露。
- **pinning 依赖**：IPFS 是内容寻址的缓存，不 pin 就消失。NFT 元数据放 IPFS 而没人 pin，链上只剩一个指向空气的哈希。
- **租金模型设计失误**：太贵没人用，太便宜垃圾数据泛滥。Arweave 的 endowment 模型赌的是存储成本长期下降。
- **时间证明博弈**：PoT（可验证延迟函数）要防的是「用专用硬件加速串行计算」，加速成功就能伪造时间。
- **L2 数据可用性委员会串谋**：把 DA 交给少数委员会，委员会串谋扣留数据，L2 就停摆。这是「模块化」换来的信任假设。

存储层的失败几乎都遵循同一模式：**链上只承诺了哈希，链下没人保证内容还在**。读一个存储层案例时，先问「哈希承诺在哪一层、内容由谁保证可取、那个人有什么动机继续存」。
