# Multi-Level BFT (Theta)

Theta's **Multi-Level BFT** splits BFT into two tiers: a small **validator committee** (20-30 enterprise nodes) produces blocks at high speed with PBFT-style voting, while thousands of community **guardian** nodes apply BLS aggregated signatures to periodic checkpoints — over 2/3 of the aggregated signature finalizes the whole chain. The committee handles throughput, and the guardians hold the safety floor.

## The Four Essentials

- **Which layer**: [Settlement](/layers/Settlement) — two-tier BFT: committee block production + guardian checkpoint finalization (the same idea as a [finality gadget](/consensus/GRANDPA), but with both tiers inside the protocol)
- **What it solves**: video micro-payments need "high throughput + fast finality, where the next segment is only sent after the previous one is confirmed," without letting consensus power shrink to 20 nodes — the second tier brings decentralization back
- **How well it solves it**: mainnet has run stably for years, with 1,000+ TPS and sub-second confirmation supporting the video use case; the costs are that the validator committee is in substance operated by enterprises including Google, Samsung, Sony, and Binance (strongly permissioned), and the guardian tier's real check has never been put to a large-scale test. Public incidents: no public records found
- **Source**: Theta whitepaper 2.0, "Theta Blockchain Whitepaper 2.0," the Multi-Level BFT chapter; the Mainnet 3.0 whitepaper (Uptime Mining, Proof-of-Relay); Theta official documentation (<https://docs.thetatoken.org/>)

## Core Mechanism

- **Committee block production**: validators rotate the proposer each epoch and settle blocks with PBFT-style three-phase voting + a commit certificate — the whitepaper describes it as similar to a mix of Casper FFG and HotStuff.
- **Guardian checkpoints**: guardians BLS-sign the hash of the latest checkpoint block, propagated via aggregated-signature gossip (O(log n) messages); over 2/3 finalizes it. The guardian pool is a superset of the committee, so the committee can be re-elected if it fails.
- **Uptime Mining (Mainnet 3.0)**: Elite Edge Nodes sign the checkpoint hash, and a signature share entering the aggregated checkpoint proves online presence — "uptime" becomes a cryptographically verifiable metering credential that shares in TFUEL rewards.
- **Proof-of-Relay**: edge nodes submit hash proofs of the volume of data relayed, sharing platform payouts by relay volume and recency window.
- **Edge-layer sybil resistance**: TFUEL staking + a 28,800-block withdrawal waiting period keep the cost of a node-hopping attack high.

## Differences from Related Protocols

| Protocol | Relationship | Key Difference |
| --- | --- | --- |
| [Gasper](/consensus/Gasper) | Isomorphic (block production + finality in layers) | Both Gasper tiers are the full validator set; Multi-Level BFT's first tier is a small committee and its second tier is community guardians |
| [GRANDPA](/consensus/GRANDPA) | Same category (checkpoint finalization) | GRANDPA votes on chain prefixes, while guardians BLS-aggregate over a single checkpoint hash |
| [PBFT](/consensus/PBFT) | The first tier's core | The committee is PBFT-style voting, scaled at 20-30 |
| [DPOS](/consensus/DPOS) | Contrast | DPoS elects representatives by stake to produce blocks; Theta's second-tier guardians are an extra safety net, not an election substitute |

## Failure Modes

- **The committee's permissioned nature**: validators are 20-30 enterprise nodes, so the decentralization promise rests mainly on the guardian tier — which has never independently handled a case of the committee misbehaving collectively.
- **Key management for BLS aggregation**: thousands of guardians' signature shares are aggregated, and key security and participation rate decide checkpoint liveness.
- **Dual-track economics**: THETA has a fixed supply of 1 billion, and TFUEL has inflation + burning (edge payments burn at least 25%) — balancing the two tokens is an ongoing governance problem.

> Source: meshio research (consolidated 2026-10-13) — the two-tier structure, Uptime Mining, and the economic mechanisms come from the Theta section of `docs/research/comparable-chains.md` in the meshio repo.
