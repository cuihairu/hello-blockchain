# PoC

容量证明（Proof of Capacity / Proof of Concept of Storage, PoC）是 PoSpace 的早期工程形态：矿工预先在硬盘上生成大量"绘图文件"（plot），出块权由"谁的盘里恰好存着接近挑战值的答案"决定——搜索容量取代算力。Burstcoin（2014）是首创者，Chia 将该思路升级为 PoSpace+PoT（见 [Chia](/chains/Chia)）。

## 基本原理

以 Burstcoin/Shabal-POC 方案为例：

1. **绘图（Plotting）**：矿工为每个 nonce 生成 8192 个 scoop（每 scoop 64 字节的伪随机数据），全部哈希进 plot 文件——这是一次性、可离线完成的工作。
2. **出块挑战**：每块给出挑战（生成签名哈希），矿工在自己的全部 plot 中找到**对应 scoop**，计算 `deadline = H(scoop数据) / 容量`，deadline 最小者优先出块。
3. **等待与提交**：deadline 也是必须等待的秒数，矿工在期限内广播签名与证明，网络验证 plot 确实包含该数据。

## 特点

**优点**

- 能耗远低于 PoW：绘图完成后挖矿只需读盘与轻量哈希。
- 通用硬件参与：普通硬盘即可，无需 ASIC，分布式程度初始较高。

**缺点**

- **Plot 军备竞赛**：硬盘容量持续增长，且绘图的写入量巨大（TB 级 plot 会磨损 SSD、消耗电力），"绿色"成色打折。
- **重用攻击面**：同一块盘可同时为多条同算法链绘图，安全性被分叉链稀释。
- 时效性依赖诚实等待（deadline 机制），联盟作恶可提前出块扰乱（Burst 历史上发生过）。

## 与 PoSpace 的关系

Chia 的 PoSpace 用更严谨的"空间证明"结构（chialisp 哈希表挑战-响应、防 plot 复制的 plotting 惩罚设计）替代了 Burst 式 scoop 方案，并引入可验证延迟函数（PoT）约束出块节奏——可视为 PoC 思想的第二代。
