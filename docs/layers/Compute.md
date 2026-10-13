# 计算层

计算层把区块链变成一台「世界计算机」：在确定性状态机上执行全网一致的状态转换。它不自己决定「哪个状态是对的」——它保证「给定同一输入，所有诚实节点算出同一输出」；状态的最终性由下面的[结算层](/layers/Settlement)给。

## 定义

计算层 = 虚拟机 + gas 计量 + 执行语义。三个部件各管一件事：

- **虚拟机**：定义指令集与状态转换规则。EVM 是栈式字节码，Move 是资源式字节码，WASM 是通用字节码，Bitcoin Script 是受限的栈式脚本。
- **gas 计量**：把「无限循环」变成「付费的有限步骤」。每条指令标价，执行前预付，耗尽即回滚。gas 是计算层对停机问题的工程解。
- **执行语义**：确定性——同一输入必须得到同一输出。禁止浮点、禁止随机源、禁止系统调用、禁止平台相关行为。任何节点重放同一笔交易都必须得到同一结果，否则共识就崩了。

计算层之上是合约与 dApp，之下是[存储层](/layers/Storage)（状态读写）与[结算层](/layers/Settlement)（把执行结果打包成块）。

## 解决的问题

1. **如何让互不信任的节点对同一计算结果达成一致**：靠确定性执行 + 重执行验证。每个节点独立重放交易，结果一致才接受。代价是慢——所有节点都要算一遍。
2. **如何计量计算资源**：gas 把计算、存储、带宽统一计价，让「无限循环」在发生前就因 gas 耗尽而停止。
3. **如何验证计算正确性**：三条路线——重执行（默认）、有效性证明（ZK，证明者算一次、验证者验一次）、欺诈证明（乐观执行、挑战期纠错）。
4. **如何升级**：代理模式（逻辑与存储分离）、可升级合约、治理。升级是计算层独有的难题——不可变与可维护天然冲突。

## 现有系统

| 路线 | 系统 | 特点 |
| --- | --- | --- |
| EVM 栈式字节码 | 以太坊、BSC、Polygon、Avalanche C-Chain | 生态最大；gas 模型成熟；重入与溢出事故最多 |
| TVM 兼容 EVM | TRON | 字节码级兼容 EVM，共识却是 DPoS——虚拟机与共识是两个独立维度 |
| Move 资源式 | Aptos、Sui、Starcoin | 资源即资产，类型系统防重入；Sui 的对象模型支持并行 |
| WASM 通用字节码 | Polkadot（ink!）、Near、Cosmos（CosmWasm） | 多语言；启动与编译成本高于 EVM |
| 受限脚本 | Bitcoin Script、Cardano Plutus | 非图灵完备，牺牲表达力换可预测性与可审计性 |
| 并行执行 | Solana Sealevel、Aptos Block-STM、Sui | 显式声明读写集，无冲突交易并行跑 |
| UTXO + 计算 | Fuel | UTXO 模型上做并行执行与自己的 VM |
| Actor 模型 | Internet Computer | 消息驱动 + 链密钥密码学，合约是有状态的 actor |

## 开源清单

- [go-ethereum](https://github.com/ethereum/go-ethereum)：EVM 参考实现，geth 客户端
- [revm](https://github.com/bluealloy/revm)：Rust 写的 EVM，被 Reth 等用作执行层
- [solana](https://github.com/solana-labs/solana)：Solana 验证客户端（Sealevel 并行执行）
- [aptos-core](https://github.com/aptos-labs/aptos-core)：Aptos 节点与 Move VM
- [CosmWasm](https://github.com/CosmWasm/cosmwasm)：Cosmos 生态的 WASM 合约框架
- [ink!](https://github.com/use-ink/ink)：Polkadot 的 WASM 合约语言
- [wasmer](https://github.com/wasmerio/wasmer) / [wasmtime](https://github.com/bytecodealliance/wasmtime)：WASM 运行时
- [fuel-core](https://github.com/FuelLabs/fuel-core)：Fuel 节点与 UTXO 并行执行
- [dfinity/ic](https://github.com/dfinity/ic)：Internet Computer 副本实现

## 失败模式

- **重入攻击**：The DAO（2016）被递归调用抽走约 6000 万美元，直接导致以太坊硬分叉。防御是「检查-生效-交互」顺序与重入锁。
- **整数溢出/下溢**：Solidity 0.8 之前默认不检查，一行 `a - b` 就能造出天量代币。
- **随机数可预测**：`block.timestamp`、`blockhash` 对矿工/验证人可见可操纵，拿它们当随机源会被预测与抢跑。
- **gas 枯竭 DoS**：无上限循环、对大数组逐元素操作，一笔交易就能让区块 gas 耗尽。
- **存储碰撞与代理升级漏洞**：`delegatecall` 共享存储上下文，逻辑合约与代理的存储布局错位会直接毁掉资产。
- **预言机操纵**：闪电贷在一笔交易内借出巨量资金操纵单一预言机价格（bZx、Harvest 等案例），合约「正确执行了错误数据」。
- **MEV 与抢跑**：排序权被搜索者提取，普通交易被夹在中间。这是计算层「谁先执行」的结构性风险。
- **确定性破坏**：浮点运算、未初始化存储指针、平台相关行为，都会让不同节点算出不同结果——这是共识级事故，不只是 bug。
- **升级治理攻击**：多签被盗、治理提案恶意通过、时间锁被绕过，可升级合约的「可维护」面就是攻击面。

计算层的失败几乎都遵循同一模式：**合约逻辑正确，但输入、顺序或升级权被操纵**。读一个计算层案例时，先问「谁控制了输入、谁控制了顺序、谁控制了升级」。

## 设计要点

- 执行必须确定性：同一输入全网算出同一输出——浮点、系统调用、随机源一律进不了指令集。
- 停机问题的工程解是计量：每步执行定成 gas 单价，付不起就中断；不要试图「检测」无限循环。
- 语义分级选型：图灵完备换表达力，受限脚本换可预测——按业务选，不必全选图灵完备。
- 可升级面即攻击面：代理、时间锁、多签是运维必需也是最大漏洞来源，权限模型先于功能设计。
- 外部事实走预言机：共识只保证链上状态一致，不保证「链外是真的」——数据来源层的信任单独设计。
