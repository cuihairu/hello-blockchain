# PoET

经过时间证明（Proof of Elapsed Time, PoET）由 Intel 于 2016 年提出（Hyperledger Sawtooth 采用）：每个候选节点抽签获得一个随机"等待时长"，**谁等得久谁出块**，等待的公正性由可信执行环境（TEE）保证。

## 四要素

- **在哪一层**：[结算层](/zh/layers/Settlement) —— 用 TEE 抽签决定出块顺序；注意安全锚在可信执行环境，不是纯密码学共识
- **解决什么**：在许可网络里公平抽签决定「谁出块」——每个候选节点抽一个随机等待时长，谁等得久谁出块，等待的公正性由 TEE 保证
- **解决得怎么样**：抽签公平、能耗极低、许可链里延迟稳定；代价是安全完全依赖 Intel SGX，而 SGX 自 2017 年起被多次侧信道攻破——「等了多久」可以被伪造，只宜当作教学案例与受限部署方案
- **出处**：Intel《Proof of Elapsed Time》2016；Hyperledger Sawtooth 文档

## 基本原理

1. 节点加入后向本地 SGX enclave 申请"抽签"：enclave 生成随机等待时间 $t$，并开始计时。
2. 计时到期的节点宣称获胜，enclave 附上**经过签名的计时证明**（README/attestation），其他节点验证该证明后接受其出块。
3. SGX 硬件保证"确实等了 $t$"且 $t$ 均匀随机——等价于"用可信硬件实现抽签彩票"。

## 特点

**优点**

- 极低能耗：无需哈希竞赛，只做等待与轻量证明。
- 准入公平的"抽签"语义，直观且实现简单，适合联盟链。

**缺点与争议**

- **信任根是 Intel**：安全性寄于 CPU 厂商的 TEE 不可被攻破——2017 年以来 SGX 多次被侧信道攻击（Foreshadow、Plundervolt、ÆPIC Leak）打破，理论上可伪造等待证明。
- 去中心化程度与"参与节点是否都买同一家 CPU"绑定。
- Hyperledger Sawtooth 已不再活跃维护，PoET 目前更多是教学案例。

## 相关对比

PoET 与 [PoT](/zh/consensus/POT)（时间证明）同以"时间"为核心资源，但 PoT 用可验证延迟函数（VDF）在**开放网络**中无需信任硬件地证明经过时间；与 [PoSpace](/zh/consensus/PoSpace) 组合（Chia）则形成"存储抽签 + 时间定序"的完整共识。
