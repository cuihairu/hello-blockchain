# Bitcoin

Bitcoin (BTC) is the first blockchain project to successfully implement a decentralized digital currency, proposed by Satoshi Nakamoto in 2008 and launched in 2009. The following is a detailed introduction to Bitcoin:


## Whitepaper and Specifications

"Bitcoin: A Peer-to-Peer Electronic Cash System" — Satoshi Nakamoto, 2008-10-31 ([bitcoin.org/bitcoin.pdf](https://bitcoin.org/bitcoin.pdf)). The key sections are §1 Introduction (double spending and trusted third parties), §4 Proof of Work, and §8 Simplified Payment Verification — this section only covers links and key points, and does not reproduce the original text.

## What Problem It Solves

Peer-to-peer electronic cash that does not depend on a trusted third party — "double spending" is the obstacle cryptography-based money failed to get around for thirty years: a ledger can prevent forgery, but no one can prevent the same money from being spent twice without introducing a central bookkeeper.

## Technical Contributions

- **PoW + heaviest-chain fork choice**: reaching probabilistic agreement by voting with hash power; see [PoW](/consensus/POW).
- **UTXO ledger**: balances are the set of unspent outputs, naturally amenable to parallel verification; see [UTXO](/model/UTXO).
- **Difficulty adjustment**: retargets every 2016 blocks, pinning the 10-minute block interval in place regardless of hash-power swings.
- **Merkle tree and SPV**: light nodes need to store only block headers to verify payments; see [Merkle Tree](/algo/MerkleTree).
- **Script, a restricted scripting language**: a minimal, non-Turing-complete contract language with deterministic execution — the reference point against which every later smart contract platform (see the [Compute Layer](/layers/Compute)) is measured.

## Limitations and Public Incidents

- Throughput of ~7 TPS and minute-level confirmation; the scaling wars that followed gave rise to the [Lightning Network](/chains/Lightning) and waves of forks.
- Public incidents: in 2010-08 an integer overflow bug minted 184 million BTC out of thin air (fixed by rolling back the block); on 2013-03-11 a LevelDB upgrade caused a 0.7/0.8 client chain fork (about 6 hours); in 2014-02 the Mt.Gox exchange lost 850,000 BTC to theft (an exchange-side failure, not a protocol one).

## Additional Notes
### Bitcoin's Basic Principles and Technical Characteristics

1. **Decentralization and the blockchain**:
   - Bitcoin implements a decentralized monetary transaction system through blockchain technology. The blockchain is a continuously growing chain-shaped data structure made up of blocks (Block); each block contains multiple transaction records and the hash of the previous block, which secures the integrity of the whole chain.

2. **Proof of Work (PoW)**:
   - Bitcoin uses a proof-of-work mechanism as its consensus algorithm, competing for the right to create new blocks by solving hard mathematical problems. This process is called Mining; miners validate and process transactions by solving these problems and are rewarded with newly issued bitcoin.

3. **Digital signatures and private keys**:
   - Transactions in Bitcoin are verified with digital signatures; each user holds a keypair consisting of a public key and a private key. The private key is used to sign transactions, while the public key serves as an address that is broadcast to the network. Only someone holding the correct private key can spend the bitcoin held at the corresponding address.

4. **Scarcity and issuance cap**:
   - Bitcoin's total supply is capped at 21 million coins, a design that guarantees its scarcity and value. New bitcoin is created through mining, and over time the mining reward halves roughly every 4 years until the supply cap is reached.

5. **Open source and community participation**:
   - Bitcoin is an open-source project whose protocol and code can be inspected, used, and modified by anyone. An active global community and developer teams participate in improving and promoting the Bitcoin protocol.

### Bitcoin's Development and Use Cases

- **Digital payments**: Bitcoin was originally designed as a peer-to-peer digital currency that can be used for fast, low-cost cross-border payments and value transfer.

- **Investment and store of value**: Because of its scarcity and market acceptance, Bitcoin has gradually become a tool for investment and asset preservation, and many people regard it as a kind of digital gold analogous to gold.

- **Financial service innovation**: Bitcoin's blockchain technology has brought new innovation to financial services, such as smart contracts, cross-border payment solutions, and decentralized finance (DeFi) applications.

- **Social impact**: Bitcoin is seen as a technological innovation capable of changing the global financial system, especially in regions with unstable economies or limited access to traditional financial services.

### Bitcoin's Challenges and Future Outlook

- **Scalability and transaction speed**: Bitcoin's transaction speed and network scalability are among the challenges it currently faces; although many technical improvements have been attempted to address them, sustained effort is still required.

- **Regulation and the legal environment**: Bitcoin faces regulatory challenges from different countries and regions, such as how to balance regulatory compliance with protecting user privacy.

- **Technical evolution**: Bitcoin's protocol and technology continue to evolve to meet new demands and technological progress, and more technical improvements and innovations are likely to appear in the future.

### Summary

As the first successful decentralized digital currency, Bitcoin carries great historical and technical significance. Its creation opened the way for the widespread application of blockchain technology in finance and society, while also facing multiple challenges across technology, regulation, and market acceptance. As blockchain technology and the cryptocurrency market develop, Bitcoin may continue to play an important role in the future and shape the global financial and economic landscape.
