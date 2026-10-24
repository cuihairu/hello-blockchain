# PoW

Proof of Work (PoW) requires nodes to invest real-world computational cost to compete for the right to keep the ledger, thereby making "misbehave" more expensive than "be honest." It was first used against spam mail (Hashcash), was made famous by Satoshi Nakamoto in Bitcoin, and became the security cornerstone of the first permissionless public chain.

## The Four Essentials

- **Which layer**: [Settlement](/layers/Settlement) — hash power decides block production rights, and finality comes from the longest chain (probabilistic finality; see [layered architecture](/layers/Layers))
- **What it solves**: making mutually distrustful nodes agree on the same ledger in a permissionless environment without identity or permission; anchoring the cost of misbehavior to real-world energy consumption
- **How well it solves it**: Bitcoin mainnet has not been successfully reorganized since 2009, verification is extremely simple, and admission is neutral; the costs are enormous energy use, roughly 6 confirmations being needed for sufficient safety, and hash power concentrating toward mining pools and ASICs
- **Source**: Dwork, Naor, "Pricing via Processing," 1992; Adam Back, "Hashcash," 1997; Satoshi Nakamoto, "Bitcoin: A Peer-to-Peer Electronic Cash System," 2008-10-31

## Basic Principle

A miner must find a block header whose double SHA-256 hash is less than the current difficulty target:

```
H( block_header ) < target
```

Since hash output is unpredictable, the only way to find a qualifying block header is to keep modifying the Nonce and brute-force attempt — this process is "mining." After finding a qualifying block it is broadcast to the whole network, and other nodes accept it after verifying the hash (verification is far faster than searching).

## Difficulty Adjustment

- Bitcoin adjusts difficulty once every **2016 blocks (about two weeks)** so that the block interval stays stable at **about 10 minutes**: if actual blocks come too fast, difficulty rises; too slow, it falls.
- Difficulty adjustment makes PoW self-stabilizing against hash power fluctuations, and makes "hash power = security budget" a predictable quantity.

## The Longest-Chain Rule and Safety

- A node always accepts the chain with the **highest accumulated difficulty** (the so-called longest-chain rule). At a fork, hash power eventually concentrates on one chain and the other is abandoned.
- To reorganize already-confirmed transactions, an attacker must continuously produce a heavier chain with more than 50% of the whole network's hash power (see [51% attack](/hacking/51Attack)); the electricity the attack consumes is the attack cost, while honest mining rewards tilt most hash power toward cooperation.

## Strengths

- **Permissionless, neutral admission**: no identity or stake is needed; connecting hash power is enough to participate, and anti-sybil strength comes from real-world cost.
- **Long battle-tested**: Bitcoin mainnet has not been successfully reorganized since 2009.
- **A simple finality model**: no network-level voting is needed; a node verifies the longest chain locally.

## Weaknesses

- **Enormous energy use**: the electricity consumed by the whole network's hash power serves only hash competition.
- **Slow confirmation**: Bitcoin needs about 6 confirmations (about 1 hour) to reach a sufficiently low rollback probability.
- **Hash power centralization**: mining pools make small hash power liquid, and the top pools hold a substantial share; ASIC dedicated hardware raises the participation bar further.
- **Low throughput**: block interval and block size limit TPS.

## Representative Applications

Bitcoin, Litecoin (Scrypt), Monero (RandomX, ASIC-resistant), most early public chains before Chia; BiYuan Chain once used Tensority, which was compatible with general-purpose computation.
