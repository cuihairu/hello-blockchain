# DPoS

Delegated Proof of Stake (DPoS) is the representative variant of PoS: all token holders do not produce blocks directly but vote to elect a fixed number (usually 21 to 101) of "representatives / supernodes," and those representatives produce blocks in turn, efficiently.

## The Four Essentials

- **Which layer**: [Settlement](/layers/Settlement) — representative rule: 21 to 101 representatives take turns producing blocks, and block production rights are decided by vote
- **What it solves**: balancing throughput and accountability — a small number of representatives produce blocks in exchange for high TPS and fast confirmation, while token holders keep the vote and can replace representatives
- **How well it solves it**: throughput and block speed are markedly higher than PoW/PoS; the costs are high concentration among representatives (EOS has 21 BPs), cross-voting coalitions and vote trading are hard to prevent, and at low voter turnout governance attacks can barely be blocked by technical means
- **Source**: Daniel Larimer, the BitShares whitepaper, 2014

## Basic Principle

1. **Vote to elect representatives**: token holders vote with weight proportional to their holdings (or by staking votes), and the top N by vote count become the block-producing nodes.
2. **Take turns producing blocks**: representatives produce blocks in a predetermined order (rotation or random shuffle), with block intervals typically in the seconds (EOS 0.5 seconds, BTS about 2 seconds).
3. **Ongoing accountability**: a representative that fails to produce blocks or drops offline frequently is skipped; one whose reputation worsens is voted out.

## Characteristics

**Strengths**

- **High throughput**: few validators and low communication complexity, short block times, suited to high-TPS applications.
- **Fast confirmation**: EOS uses BFT-style confirmation (irreversibility), making transactions irreversible within seconds.
- **Closed-loop governance**: representative identities are public, and misbehavior directly carries reputation damage and the cost of being voted out; EOS once handled disputes through a constitution/arbitration mechanism.

**Weaknesses**

- **Limited decentralization**: a small set of validators easily forms cartels and cross-voting coalitions; at low voter turnout "the rich get richer" is more pronounced.
- **Governance attacks**: vote trading (bribing) and vote delegation through exchanges are hard to prevent.

## Representative Applications

- **EOS**: 21 supernodes (Block Producers), DPoS + BFT finality.
- **BitShares**: the original DPoS implementation proposed by Daniel Larimer.
- **TRON**: 27 super representatives.
- **Lisk, Ark**, and others also use DPoS variants.

## Deployment Sample: Livepeer

> Source: meshio research (consolidated 2026-10-13); details cross-checked against docs.livepeer.org and the Livepeer whitepaper/specification.

Livepeer assembles DPoS into a transcoding service network, and its three mechanisms are a textbook general case:

- **Probabilistic verification**: not every video segment is verified; sampling by `Sha3(N, BlockHash, Seg#) % VerificationRate == 0` (the whitepaper example is 1/500) triggers a check, and a verification failure or missed verification slashes stake (5% / 10%) — this makes the expected return of cheating negative while keeping on-chain verification costs low (mainnet has not yet enabled slashing).
- **Probabilistic micropayment tickets**: a broadcaster issues one signed ticket per segment (face value × win probability = segment price), and only winning tickets are redeemed on-chain for ETH — an off-chain high-frequency, on-chain low-frequency settlement shape.
- **Dual-knob revenue split**: an orchestrator prices explicitly with `rewardCut` (the share of inflation kept) and `feeShare` (the share of ETH fees passed to delegators); inflation rewards are pooled by stake proportion and must be actively claimed each round by calling `reward()` (skipping the call forfeits the reward) — dynamic inflation adjusts toward a target by stake ratio.
