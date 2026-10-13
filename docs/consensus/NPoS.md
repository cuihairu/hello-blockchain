# NPoS

NPoS（Nominated Proof-of-Stake，提名权益证明）是 [Polkadot](/chains/Polkadot) 的验证人选择机制：代币持有者把钱质押给自己信任的候选验证人（nominator），系统按 Phragmén 选举算法选出活跃验证人集合。它与出块协议 [BABE](/consensus/BABE)、最终性协议 [GRANDPA](/consensus/GRANDPA) 分工——NPoS 决定「谁有资格记账」，BABE 决定「这个 slot 谁出块」，GRANDPA 决定「哪段历史不可逆」。

## 四要素

- **在哪一层**：[结算层](/layers/Settlement) —— PoS 系的验证人选举与安全预算分配
- **解决什么**：纯 PoS 里「有币的人自己质押」容易形成富者愈富的质押集中；DPoS 里固定代表数又牺牲了开放参与。NPoS 让普通持币者通过提名把安全预算「借」给候选验证人，同时用算法把质押在验证人之间摊平
- **解决得怎么样**：Phragmén 选举每轮 era 重新平衡验证人质押（总质押最大化、最小验证人质押最大化、质押方差最小化）；提名人上限约 22,500（Polkadot），成熟验证人规模约 1,000（Kusama 已达）；选举在链下由 worker 计算以保住 6 秒出块；代价是 era 轮换与解绑期带来的资金锁定期，且选举算法本身是复杂的多目标优化
- **出处**：Phragmén 选举算法（1890s 多赢家选举方法，Polkadot 适配）；[Polkadot 维基百科·Phragmén](https://wiki.polkadot.com/docs/learn-phragmen)、[·质押](https://wiki.polkadot.com/docs/learn-staking)；实现见 [w3f/consensus](https://github.com/w3f/consensus)

## 核心机制

- **验证人与提名人**：验证人运行节点、出块、验证平行链；提名人锁定代币并选择支持的验证人。系统按质押（验证人自质押 + 提名）选出活跃验证人集合。
- **Phragmén 选举**：逐轮填一个席位——每轮给「支持者的平均成本最低」的候选当选，支持者的负载随之增加，直到填满席位。加权版（Polkadot 采用）把持币量作为预算，使质押在验证人间均衡分配。
- **era 周期**：Polkadot 每 era 24 小时（Kusama 6 小时），每 era 含 6 个 session；每个 era 末重新选举并发放奖励。
- **奖励与申领**：按 era 积分发放，活跃验证人无论质押大小都拿相同基础奖励，再按佣金与提名份额比例分配；奖励需手动申领，84 个 era 后未领取失效；年通胀的 85% 进入质押奖励。
- **罚没（slashing）**：验证人与提名人都会因不当行为（如双重签名、长时间离线）被部分或全部罚没，罚没资金进国库；解绑期（unbonding）为历史 era 的违规行为提供追罚窗口。
- **Phragmms（Balphragmms）**：新一代选举规则，在 Phragmén 基础上加入 maximin support 与 PJR（比例代表）性质，每轮完全再平衡权重。

## 与同族机制的差异

| 机制 | 谁决定记账权 | 选举方式 | 代表 |
| --- | --- | --- | --- |
| 纯 PoS（[Ouroboros](/consensus/Ouroboros)、[Algorand](/consensus/Algorand)） | 自质押者 | VRF 抽签 | Cardano、Algorand |
| [DPoS](/consensus/DPOS) | 持币者投票给固定数量代表 | 一轮投票 | EOS、TRON |
| NPoS | 提名 + 自质押 | Phragmén 多目标优化 | [Polkadot](/chains/Polkadot)、Kusama |
| [Snowball](/consensus/Snowball) 族 | 亚采样投票 | 重复随机询问 | [Avalanche](/chains/Avalanche) |

## 失败模式

- **提名集中**：提名人倾向押给知名验证人，头部效应与「质押即收益」的惯性会抵消算法的摊平效果——算法均衡的是「当选集合的质押分布」，不是「全网质押的集中度」。
- **选举算法复杂性**：Phragmén 是链下多目标优化，规则升级（如 Phragmms）需要治理与迁移，复杂度本身是升级风险。
- **解绑期流动性**：质押在解绑期内无收益且无法动用，大额资金的机会成本由提名人承担。
- **主网级重大事故**：未找到公开记录。

NPoS 的贡献是**把「安全预算」从验证人自持变成可组合的提名市场**：普通持币者第一次可以只出钱、不出节点就参与安全——这是 [restaking](/consensus/Restaking) 思想的直接前身：如果质押权可以委托给验证人，那么同一份质押也就可以再委托给其他协议。
