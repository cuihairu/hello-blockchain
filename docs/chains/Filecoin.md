# Filecoin

## 白皮书与规范

《Filecoin: A Decentralized Storage Network》白皮书，Protocol Labs（Juan Benet）2017-07；权威规范是 [spec.filecoin.io](https://spec.filecoin.io)（Storage Power Consensus、Proof-of-Replication、Proof-of-Spacetime 各章）；主网 2020-10-15 上线。

## 解决什么问题

IPFS 解决「怎么寻址」没解决「谁愿意存」——Filecoin 把存储变成共识资源，给「保持数据可取回」一个持续的经济激励闭环。

## 技术成果与贡献

- **Expected Consensus（SPC）**：存储加权算力的秘密选举，质量调整算力当选票，drand 信标供随机性——机制详见 [PoST](/consensus/PoST) 落地样本节。
- **PoRep + PoST 双证明**：封板可复制、持续可审计（WindowPoSt 24 小时窗口），SNARK 压缩上链。
- **FVM/FEVM（2023-03）**：WASM 多语言虚拟机 + EVM 兼容运行时，存储市场合约化（见 [存储层](/layers/Storage)）。
- **检索市场与支付通道**：链下流式传块 + 付款凭证结算（取回路由键 PayloadCID 不上链）。

## 局限与公开事故

- 存储需求长期靠挖矿补贴驱动，真实付费存储占比是持续争议。
- 罚没与抵押门槛高，矿工经济波动大。
- 公开事故：未找到公开记录（共识层；检索与体验层短板属产品问题）。
