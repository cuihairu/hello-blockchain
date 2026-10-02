# PoET

经过时间证明（Proof of Elapsed Time, PoET）由 Intel 于 2016 年提出（Hyperledger Sawtooth 采用）：每个候选节点抽签获得一个随机"等待时长"，**谁等得久谁出块**，等待的公正性由可信执行环境（TEE）保证。

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

PoET 与 [PoT](/consensus/POT)（时间证明）同以"时间"为核心资源，但 PoT 用可验证延迟函数（VDF）在**开放网络**中无需信任硬件地证明经过时间；与 [PoSpace](/consensus/PoSpace) 组合（Chia）则形成"存储抽签 + 时间定序"的完整共识。
