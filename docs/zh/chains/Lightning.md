# Lightning 闪电网络

## 白皮书与规范

《The Bitcoin Lightning Network: Scalable Off-Chain Instant Payments》，Joseph Poon、Thaddeus Dryja 2016-01（[lightning-network-paper.pdf](https://lightning.network/lightning-network-paper.pdf)）；协议规范是 BOLT 系列（[github.com/lightning/bolts](https://github.com/lightning/bolts)）——不是一条链，是比特币链上的通道网络。

## 解决什么问题

比特币 ~7 TPS 与分钟级确认撑不起高频小额支付——把交易搬进链下支付通道，链上只结算开/关通道两笔，中间按 HTLC 原子路由。

## 技术成果与贡献

- **支付通道 + HTLC**：两方签名多签 + 哈希时间锁，链下余额更新、链上裁决兜底（账本形态见 [UTXO](/zh/model/UTXO)）。
- **源路由与 Gossip**：节点 gossiper 通道容量，付款方沿路构造 onion 路由。
- **Watchtower 与 BOLT 12**：惩罚监控外包、Offers 静态收款码——UX 持续补课。
- **事实上的比特币扩容主力**：结算最终性回到 L1 挖矿共识（见 [PoW](/zh/consensus/POW)）。

## 局限与公开事故

- 路由流动性管理复杂（入站流动性难题）、离线收款弱、大额支付成功率下降。
- 安全依赖通道方监控（罚没窗口），watchtower 生态仍早期。
- 公开事故：未发生主网级大规模资金损失；2022-02 多实现联合披露手续费计算缺陷（CVE-2021-31876 等）与 2021 年的通道阻塞/垃圾交易攻击研究，均以赏金与修复收场，另见[闪电网络攻击](/zh/hacking/LightningNetworkAttack)。
