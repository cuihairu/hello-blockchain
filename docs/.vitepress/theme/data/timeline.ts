// 区块链发展史时间线
// 每条记录回答：这件事为什么发生在那个时点，它回应了什么问题。
// field 用于筛选：prehistory 密码学前史 / bitcoin 比特币 / ethereum 以太坊
//               / privacy 隐私与扩容 / consensus 共识与链的分化

export interface TimelineEvent {
  year: number
  title: string
  who: string
  field: 'prehistory' | 'bitcoin' | 'ethereum' | 'privacy' | 'consensus'
  why: string
  link?: string
}

export const FIELD_LABELS: Record<TimelineEvent['field'], string> = {
  prehistory: '密码学前史',
  bitcoin: '比特币',
  ethereum: '以太坊',
  privacy: '隐私与扩容',
  consensus: '共识与链的分化',
}

export const PERIODS: { name: string; field: TimelineEvent['field']; range: string; intro: string }[] = [
  {
    name: '密码学前史',
    field: 'prehistory',
    range: '1976 - 1998',
    intro: '数字现金需要的每个零件：公钥、盲签名、哈希链、工作量证明，都在这三十年的密码学论文里造好。缺的从来不是技术，而是一个把它们组装起来的动机。',
  },
  {
    name: '比特币',
    field: 'bitcoin',
    range: '2008 - 2011',
    intro: '一份白皮书把零件装成机器，创世块把判词刻进首笔交易。这几年是概念验证期：无发行方的账本证明了自己能在真实算力上活着，也开始第一次被当成钱来定价。',
  },
  {
    name: '以太坊',
    field: 'ethereum',
    range: '2013 - 2021',
    intro: '图灵完备的虚拟机把链从账本变成平台。资产发行、智能合约、DeFi 相继装上来，繁荣与漏洞一起到来：The DAO 与 CryptoKitties 从两个方向教会这个行业，代码上线之后没有暂停键。',
  },
  {
    name: '隐私与扩容',
    field: 'privacy',
    range: '2014 - 2019',
    intro: '账本公开意味着一切公开。环签名、零知识证明、混币合约相继上线，隐私从可选项变成监管议题；同一批研究也在回答另一道题：把证明变小，就是把手续费变便宜。',
  },
  {
    name: '共识与链的分化',
    field: 'consensus',
    range: '2012 - 2024',
    intro: 'PoS、BFT、亚采样、可验证时钟，共识研究的每条支流都成了某条链的地基。分化在 2022 年走向合流：以太坊用 Merge 亲自验证了 PoS 这条线，此后争论只剩工程细节。',
  },
]

export const TIMELINE: TimelineEvent[] = [
  // ---------- 密码学前史 ----------
  {
    year: 1976,
    title: '《密码学的新方向》',
    who: 'Whitfield Diffie、Martin Hellman',
    field: 'prehistory',
    why: '公钥交换让两个从未见面的人能建立秘密信道，「无需先共享信任」第一次有了数学形式。数字签名、密钥协商乃至整个加密货币的信任最小化路线，都从这篇论文出发。',
    link: '/Introduction',
  },
  {
    year: 1982,
    title: '盲签名与电子现金构想',
    who: 'David Chaum',
    field: 'prehistory',
    why: '盲签名让银行能验证一笔钱真实有效，却看不到它流向了谁，Chaum 由此给出不可追踪的电子现金。九十年代 DigiCash 把它做成产品，但中心化发币服务器始终是迈不过去的坎：公司破产了，问题留给后来人。',
    link: '/Privacy/Privacy',
  },
  {
    year: 1991,
    title: '哈希链时间戳',
    who: 'Stuart Haber、W. Scott Stornetta',
    field: 'prehistory',
    why: '怎么证明一个文件在某天就已存在，又不依赖可被收买的中央公证？两人给出把文件哈希依次链入区块、由链条本身背书的方案，随后用 Merkle 树把批量文档压进一个头。「区块加链」结构的直接祖先。',
    link: '/algo/MerkleTree',
  },
  {
    year: 1997,
    title: 'Hashcash 工作量证明',
    who: 'Adam Back',
    field: 'prehistory',
    why: '反垃圾邮件需要让发信付出微小代价。Hashcash 用一条可验证的计算凭证挡住海量群发，证明的不是「谁做的」，而是「花了多少算力」。这个属性后来成了去中心化记账的选票。',
    link: '/consensus/POW',
  },
  {
    year: 1998,
    title: 'b-money 与 Bit Gold 构想',
    who: 'Wei Dai、Nick Szabo',
    field: 'prehistory',
    why: '两人各自描出去中心化数字现金的草图：b-money 要求所有节点维护一份账本并对账，Szabo 随后的 Bit Gold 用耗时算出的证明串当原始货币。两者都没能解决女巫攻击下的算力计价，但「无发行方账本」的形状已经画出来了。',
    link: '/model/Models',
  },

  // ---------- 比特币 ----------
  {
    year: 2008,
    title: '比特币白皮书（10 月 31 日）',
    who: '中本聪',
    field: 'bitcoin',
    why: '雷曼倒闭后的第六周，白皮书给出完整拼图：以 PoW 作抵押的女巫防御、最长链规则、难度调整与 P2P 广播，让互不信任的节点第一次就同一份账本收敛。此前所有电子现金缺的最后一块是共识，它补上了。',
    link: '/chains/Bitcoin',
  },
  {
    year: 2009,
    title: '创世区块（1 月 3 日）',
    who: '中本聪',
    field: 'bitcoin',
    why: '创世块 coinbase 里刻着当天泰晤士报头条「Chancellor on brink of second bailout for banks」，既是启动时间戳，也是对银行体系的判词。首批 50 BTC 以 P2PK 输出铸出，主网从这里开始出块。',
    link: '/btc/P2PK',
  },
  {
    year: 2010,
    title: '一万枚比特币的比萨（5 月 22 日）',
    who: 'Laszlo Hanyecz',
    field: 'bitcoin',
    why: '第一笔有实物作价的交易：一万枚 BTC 换两张比萨，折合约 41 美元。比特币第一次拥有由真实商品背书的汇率，论坛里的场外报价自此有了收敛基准。今天回看是传奇，当时它只是证明「这东西能花」。',
  },
  {
    year: 2011,
    title: '山寨币潮与 Scrypt',
    who: 'Charlie Lee（莱特币）',
    field: 'bitcoin',
    why: '比特币 SHA-256 挖矿开始专业化，莱特币 10 月以 Scrypt 上场，降低 GPU 的效率优势。此后改参数、改共识的试验密集出现，Namecoin、PPCoin 等在比特币骨架上换零件，「分叉做实验」成为行业方法论。',
    link: '/chains/Litecoin',
  },
  {
    year: 2024,
    title: '现货比特币 ETF 获批（1 月 10 日）',
    who: '美国 SEC',
    field: 'bitcoin',
    why: '十五年后，比特币以现货 ETF 形式进入传统券商账户，首批十一只产品同日获批。托管、申赎与做市被装进既有证券监管框架，争议从「它是否合法」变成「该配置多少」，机构资金的通道自此打开。',
    link: '/chains/Bitcoin',
  },

  // ---------- 以太坊 ----------
  {
    year: 2013,
    title: '以太坊白皮书（11 月）',
    who: 'Vitalik Buterin',
    field: 'ethereum',
    why: '十九岁的 Vitalik 主张区块链不该只会记账：把图灵完备的虚拟机装进共识层，状态与逻辑搬上链，链从账本变成世界计算机。比特币脚本刻意保持非图灵完备的保守，反衬出这个方向的野心。',
    link: '/chains/Ethereum',
  },
  {
    year: 2014,
    title: '以太坊 ICO 众筹（7 月）',
    who: '以太坊基金会',
    field: 'ethereum',
    why: '预售换得 31591 枚 BTC，是当时规模最大的众筹之一。它验证了「发币即融资」的链上路径，也为三年后的 ERC-20 狂潮写下模板：项目方绕过 VC 与交易所，直接向公众发行资产。',
    link: '/nft/TokenizedProtocol',
  },
  {
    year: 2015,
    title: 'Frontier 主网上线（7 月 30 日）',
    who: '以太坊团队',
    field: 'ethereum',
    why: '首个阶段刻意只开部分功能：可挖矿、可试验，普通转账暂缓，用几个月观察安全再逐步放开。这条 PoW 起跑线后来由 ethash 与 GPU 矿工接棒，分阶段上线也成了新链的标准动作。',
    link: '/consensus/POW',
  },
  {
    year: 2016,
    title: 'The DAO 事件与硬分叉（6 月）',
    who: 'The DAO 攻击者、以太坊社区',
    field: 'ethereum',
    why: '募资约 1.5 亿美元的 The DAO 因重入漏洞被取走约 360 万 ETH。社区硬分叉回滚状态，拒绝回滚的少数派延续出 ETC。事件留下两个母题：智能合约漏洞自此成为独立攻击面，以及「代码即法律」与社会共识冲突时谁说了算。',
    link: '/hacking/SmartContractVulnerabilities',
  },
  {
    year: 2017,
    title: 'ERC-20 狂潮与 CryptoKitties',
    who: 'ERC-20、Dapper Labs',
    field: 'ethereum',
    why: 'ERC-20 把发币成本降到一行合约，全年 ICO 融资以百亿美元计；11 月 CryptoKitties 一度把以太坊堵到链上拥挤，也催生了 ERC-721 与 NFT 概念。繁荣与拥堵同时到顶，扩容从优化项变成生存项。',
    link: '/nft/TokenizedProtocol',
  },
  {
    year: 2020,
    title: 'DeFi 夏',
    who: 'Compound、Uniswap 等',
    field: 'ethereum',
    why: '6 月 Compound 把治理代币与存款利息捆绑分发，流动性挖矿引爆行业：AMM、借贷、稳定币在链上互相组合出无需持牌的金融服务。以太坊的金融属性自此盖过「世界计算机」，gas 价格成了行业景气指数。',
    link: '/chains/Ethereum',
  },
  {
    year: 2021,
    title: 'London 升级与 EIP-1559（8 月 5 日）',
    who: '以太坊社区',
    field: 'ethereum',
    why: '手续费从拍卖改为「基础费销毁加小费」，ETH 首次拥有系统性销毁机制，供应增速与费用市场直接挂钩。同年 10 月 Altair 轻客户端分叉为主网上的共识规则微调，也为次年的 Merge 做了完整排练。',
    link: '/chains/Ethereum',
  },

  // ---------- 隐私与扩容 ----------
  {
    year: 2014,
    title: '门罗币上线',
    who: 'thankful_for_today 等（CryptoNote 社区）',
    field: 'privacy',
    why: '比特币账本其实全程裸奔：地址可聚类、金额公开。门罗把 CryptoNote 的环签名与一次性地址打包落地，默认匿名成了产品主张。三年后 RingCT 让金额也隐匿，隐私币自此成为监管名单上的固定类别。',
    link: '/chains/Monero',
  },
  {
    year: 2016,
    title: 'zk-SNARK 首次主网落地（10 月 28 日）',
    who: 'Zooko Wilcox、Zcash 团队',
    field: 'privacy',
    why: 'zk-SNARK 能证明「这笔交易合法」而不泄露任何输入，此前它只活在论文与实验里。Zcash 把它跑进主网，证明零知识证明承受得住真实载荷，也为之后的 zk-Rollup 扩容路线备好了发动机。',
    link: '/Privacy/ZeroKnowledgeProof',
  },
  {
    year: 2018,
    title: 'Bulletproofs 上线门罗（10 月）',
    who: '斯坦福团队、Monero 社区',
    field: 'privacy',
    why: '区间证明是隐匿金额的必要开销，旧方案让门罗交易体积膨胀数倍。Bulletproofs 把证明尺寸压到对数级，手续费骤降八成以上：隐私技术第一次不是因为「能匿名」而是因为「更便宜」被全网切换。',
    link: '/Privacy/Bulletproofs',
  },
  {
    year: 2019,
    title: 'Tornado Cash 上线',
    who: '匿名开发团队',
    field: 'privacy',
    why: '混币从中心化托管服务（注定跑路或被查封）进化为不可停机的智能合约：存入、混洗、凭零知识票据提取。它后来把「隐私工具是否该被制裁」推上美国财政部清单，协议与使用者的责任边界成了法律议题。',
    link: '/Privacy/MixingServices',
  },

  // ---------- 共识与链的分化 ----------
  {
    year: 2012,
    title: 'PPCoin 白皮书与 PoS 诞生（8 月 19 日）',
    who: 'Sunny King、Scott Nadal',
    field: 'consensus',
    why: 'PoW 的能耗焦虑在 2012 年就有了答案草稿：用持币量与币龄替代算力投票。PPCoin 以 PoW 加 PoS 混合起步，验证了「质押即安全预算」的可行性，十年后以太坊的 Merge 正是这条线的终点站。',
    link: '/consensus/POS',
  },
  {
    year: 2014,
    title: 'Tendermint 白皮书',
    who: 'Jae Kwon、Ethan Buchman',
    field: 'consensus',
    why: '把八十年代的 BFT 论文拉进链上世界：验证人轮换提案、两轮投票、即时最终性。Tendermint 后来长出 Cosmos 生态，「每个应用一条链、链间走 IBC」的多链世界观由此发端。',
    link: '/consensus/Tendermint',
  },
  {
    year: 2015,
    title: '联邦拜占庭协议 SCP（4 月 8 日）',
    who: 'David Mazières',
    field: 'consensus',
    why: 'PBFT 要求一份全员名单，公链做不到。SCP 让每个节点自选仲裁切片，信任沿切片局部传导为全局一致，无需中心名单也能达成最终性。它上线 Stellar 网络，是 FBA 路线的代表作。',
    link: '/consensus/FBA',
  },
  {
    year: 2017,
    title: 'PoH 可验证时钟提出',
    who: 'Anatoly Yakovenko（Solana）',
    field: 'consensus',
    why: '共识慢的根源之一，是节点要反复就「事件先后」互相通信。PoH 让 leader 本地生成可验证的时间序列，排序与共识解耦，再配合并行执行把吞吐推高两个数量级。单链高性能路线自此与模块化路线分庭抗礼。',
    link: '/consensus/PoH',
  },
  {
    year: 2017,
    title: 'Hyperledger Fabric 1.0（7 月 11 日）',
    who: 'Linux 基金会',
    field: 'consensus',
    why: '企业要不起全开放的开源链：准入许可、无代币、共识可插拔。Fabric 1.0 用先执行后排序的架构与通道隔离把吞吐做上生产水位，「联盟链」自此与公链平行发展，BFT 系共识在企业侧找到主场。',
    link: '/consensus/PBFT',
  },
  {
    year: 2018,
    title: 'Avalanche 共识白皮书（5 月）',
    who: 'Team Rocket（匿名）',
    field: 'consensus',
    why: '既不用全网投票也不用全局时钟：节点间重复亚采样投票，概率上以亚秒级收敛。它把 Gossip 的无序性变成共识的燃料，最终性自此有了「概率安全」这第三条路线。',
    link: '/consensus/Avalanche',
  },
  {
    year: 2022,
    title: 'The Merge（9 月 15 日）',
    who: '以太坊社区',
    field: 'consensus',
    why: '运行七年的 PoW 主链与信标链合并，以太坊完成 PoS 转型，能耗下降约 99.95%，出块从算力竞赛变成质押与证明。史上最大规模的共识切换零中断完成，PoS 的工程可行性自此再无争议。',
    link: '/chains/Ethereum',
  },
  {
    year: 2023,
    title: '上海升级开放提款（4 月 12 日）',
    who: '以太坊社区',
    field: 'consensus',
    why: 'Merge 之后质押的 ETH 一直进得去出不来，上海升级开放提款，补上质押生命周期的最后一环。抛压担忧落空后质押率稳步爬升，流动性质押协议同步定型为共识层的事实基础设施。',
    link: '/consensus/POS',
  },
  {
    year: 2024,
    title: '并行执行与再质押叙事',
    who: 'Monad、Sei、EigenLayer 等',
    field: 'consensus',
    why: 'EVM 串行执行成为吞吐瓶颈，新链把无冲突的状态访问并行跑起来；EigenLayer 把已质押的 ETH 再抵押给中间件，共识安全第一次可以被「批发转售」。两条叙事争夺的是同一个判断：区块空间的供给还能再上一个数量级吗。',
    link: '/chains/Solana',
  },
]
