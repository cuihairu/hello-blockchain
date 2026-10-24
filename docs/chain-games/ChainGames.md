# Blockchain Games

A blockchain game (blockchain game / Web3 game) is a game form in which "in-game assets live on-chain and economic rules are executed by smart contracts". Assets are recorded on the chain the game lives on as an [NFT](/nft/TokenizedProtocol) or a token, so players can genuinely "own" an asset and trade it on-chain. This directory surveys representative projects and compliant forms; the structural problems of economy design are in the [economy design section](/chain-games/Economy).

## How to Read This

- Read the [economy design section](/chain-games/Economy) first to understand "why blockchain game economies collapse so easily", then come back to the individual project designs.
- Compliant domestic forms and overseas blockchain games differ enormously — overseas, assets default to securities/commodities; domestically, assets default to digital collectibles (not tradable).
- For incident cases, see each project's "failure modes" and the [Ronin bridge incident](/chain-games/Economy#the-ronin-bridge-hack).

## Representative Projects

### Axie Infinity

- **What it is**: a pet-battling game developed by the Philippine company Sky Mavis, released on the Ethereum mainnet in 2018 and later migrated to the Ronin sidechain. Players buy and breed Axie pets (NFTs) and earn the tokens SLP and AXS by battling.
- **Economy model**: a dual-token model — AXS is the governance token (fixed total supply of 270 million) and SLP is the game token with unlimited inflation. Breeding consumes SLP + AXS, and the more times a pet has bred, the more it costs. The economics are essentially "players buy breeding rights with real money, then sell newly bred pets on the secondary market" — growth depends on new players entering.
- **Failure mode**: in March 2022 the Ronin bridge was hacked, a loss of about 620 million USD (at the time's valuation); the attackers were linked to North Korea's Lazarus Group. SLP had already crashed 99% in February 2022. The game economy has not recovered since.
- **Source**: [BBC · Ronin Network: What a $600m hack says about the state of crypto](https://www.bbc.com/news/technology-60933174), [Wikipedia · Axie Infinity](https://en.wikipedia.org/wiki/Axie_Infinity)

### StepN

- **What it is**: a "move-to-earn" running app on Solana, released in early 2022. Users buy sneaker NFTs and earn the token GST by having outdoor runs recorded over GPS.
- **Economy model**: a single token, GST (unlimited inflation), with deflation manufactured through burning mechanics (upgrades, repairs, opening treasure chests). Income = new users buying shoes + existing users paying for upgrades; expenditure = running rewards. Essentially a Ponzi structure — later entrants' entry fees subsidize earlier ones.
- **Failure mode**: in June 2022, with the broader crypto market crash, GST fell more than 99% from its peak. StepN later migrated to BSC and launched a new game, but never reproduced its early growth.
- **Source**: [StepN official site](https://www.stepn.com)

### The Sandbox

- **What it is**: a metaverse game on Ethereum (starting in 2018), where players build game experiences on LAND (virtual-estate NFTs). SAND is the platform token.
- **Economy model**: LAND has a total supply of 166,464 parcels, and scarcity drives asset prices. SAND is used to buy LAND, gear and participate in governance. The economics are essentially "virtual estate speculation + platform commission".
- **Failure mode**: LAND prices surged during the 2021-2022 metaverse boom and then fell back. Platform activity stayed far below expectations.
- **Source**: Wikipedia · The Sandbox

### Decentraland

- **What it is**: a decentralized metaverse on Ethereum (started in 2017), driven entirely by smart contracts. LAND (90,601 parcels) and the MANA token form the economic base.
- **Economy model**: MANA is an ERC-20 token, used to buy LAND, wearables and services. The scarcity of LAND (fixed total supply) is what supports its price. The Decentraland DAO governs protocol parameters.
- **Failure mode**: daily active users have stayed long in the hundreds to thousands (checkable from on-chain data), far below traditional virtual worlds. MANA has fallen more than 99% from its peak.
- **Source**: [Wikipedia · Decentraland](https://en.wikipedia.org/wiki/Decentraland), [Decentraland official site](https://decentraland.org)

## Compliant Forms Domestically

The compliance framework for blockchain games in China is entirely different from overseas:

- **Digital collectibles**: NFTs in a compliant domestic form are called "digital collectibles", issued on consortium chains (such as [ChainMaker](/chains/Bytom), [Zhixin Chain](/consortium/Fabric)). Digital collectibles **cannot be traded on a secondary market** (platforms provide no transfer function); they can only be collected or transferred to a limited number of recipients.
- **De-financialization**: domestic regulation explicitly forbids the financialization of digital collectibles — no speculation, no securitization, no use as a means of payment. Pricing power sits with the issuer, and there is no open market.
- **Consortium chains, not public chains**: domestic digital collectible platforms use consortium chains (such as the Zhixin Chain of Ant Chain, and Tencent's Zhixin Chain), with nodes controlled by consortium members to meet regulatory traceability requirements.
- **Real-name registration**: buying digital collectibles requires real-name identity (ID card + mobile number), a stark contrast with anonymous wallets overseas.
- **Typical platforms**: Jingtan (Alipay), Huanhe (Tencent), Xiaohongshu R-Space, and others.

## Failure Modes

- **Fragile economic structure**: for the overwhelming majority of blockchain games the production/consumption loop depends on new players entering — once growth slows, output devalues and selling pressure builds, forming a death spiral. See the [economy design section](/chain-games/Economy).
- **Security risk**: a blockchain game's bridge, contracts and frontend are all attack surfaces. The 620 million USD Ronin bridge incident is the largest blockchain game security incident (see the [economy design section](/chain-games/Economy#the-ronin-bridge-hack)).
- **Regulatory uncertainty**: tokens in overseas blockchain games may be classified as securities; domestic policy can shift at any time and platforms may be forced offline.
- **User experience barrier**: wallet creation, gas fees and private-key management are very unfriendly to non-crypto users, which blocks mass adoption.
