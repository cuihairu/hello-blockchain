# Tendermint

Tendermint is the pioneering implementation that combined "PoS staking + BFT voting" into a complete public chain engine. It was proposed by Jae Kwon in 2014, developed continuously from 2017 to 2019 by Tendermint Inc. (later Interchain GmbH), and is the consensus core of the Cosmos ecosystem.

## Four Key Points

- **Which layer**: [Settlement layer](/layers/Settlement) — PoS staking + BFT voting combined into a complete engine, with deterministic finality
- **What it solves**: Weld staking and BFT voting into one complete public chain engine — validators vote according to stake weight, it is unsafe only if more than 1/3 are malicious, and 2/3 reached means final
- **How well it works**: Deterministic finality, second-scale blocks, and the ABCI interface lets the application layer reuse the engine (the Cosmos ecosystem's prosperity); the cost is that the number of validators is limited by O(n²) (hundreds) and chains have stalled several times in the past due to governance and software problems (Cosmos Hub, several times in 2019-2021)
- **Sources**: Jae Kwon "Tendermint: Consensus without Mining" 2014; CometBFT official documentation

## Architectural Layers

- **Tendermint Core**: consensus (Tendermint BFT) + P2P network + light client.
- **ABCI (Application Blockchain Interface)**: the gRPC/Socket interface between the consensus engine and the state machine (application); applications can be written in any language — this is the foundation on which the later Cosmos SDK and CometBFT ecosystem prospered.
- From 2022 onward the main implementation was renamed **CometBFT**, and the protocol itself is still often called Tendermint BFT.

## Consensus Rounds

Every height loops through rounds, each round:

1. **Propose**: the proposer chosen by weight and a VRF-like priority (`round-robin by voting power`) broadcasts a block proposal.
2. **Prevote**: validators vote on the received valid block to reach `+2/3 prevote`; if no valid block arrives they vote nil.
3. **Precommit**: after +2/3 prevotes, lock that block and cast a precommit; once +2/3 precommits are collected it commits and moves to the next height.
4. **Timeout rotation**: a timeout at any step moves to the next round with a different proposer — which guarantees liveness.

## Key Properties

- **Instant finality**: commit is irreversible (deterministic finality), with no probabilistic confirmation period.
- **Safety threshold**: safe with less than 1/3 of voting weight malicious; 1/3 or more can cause a stall, and 2/3 or more can be malicious (consistent with the general [BFT](/consensus/BFT) rule).
- **Locking rule**: once a validator has locked a block at precommit it cannot vote for another block within the same round, preventing swing forks; combined with round incrementing to unlock, which also preserves liveness.
- **Stake as weight**: validator weight is proportional to bonded stake, and misbehaving validators can be slashed (double-signing, long offline).

## Ecosystem Impact

Hundreds of chains are built on Tendermint/CometBFT, including Cosmos Hub, Binance Chain/BNB Beacon Chain, Terra (classic), Kava and Osmosis; the light client verification model of the IBC cross-chain protocol also rests on Tendermint headers + +2/3 vote verification.

## Production Sample: Akash

> Source: meshio research (merged 2026-10-13); details checked against docs.akash.network and the Akash economic whitepaper.

Akash is an assembled sample of "CometBFT consensus + a cloud compute marketplace", and its layering is worth noting:

- **Market transactions on-chain**: deployment orders, bids and leases are all put on chain (deployment/market/escrow modules); the tenant sets a maximum price, the provider bids low, and a reverse auction matches them.
- **Workloads never on-chain**: the full deployment manifest goes directly to the provider (not on the blockchain), and compute correctness is not verified on chain — escrow pays per block (about one every 6 seconds), and trust rests entirely on escrow and ex-post dispute.
- **Tiered verification and scheduling**: a provider can be marked "audited" (security audited), and a tenant uses the SDL `signedBy` field to restrict deployment to audited providers only — an off-the-shelf case where a verification tier enters the scheduling match conditions.
- **Evolution of the settlement currency**: lease fees evolved from being priced in AKT to `uact` (a dollar-pegged internal credit minted by burning AKT), supporting IBC currency settlement — a sample of decoupling price stability from the native token.
