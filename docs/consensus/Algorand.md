# Algorand

Algorand is the "pure PoS" consensus proposed by Silvio Micali (2012 Turing Award laureate) in 2017 and launched to mainnet in 2019. Its core innovation is turning the assignment of block production rights into a **secret verifiable random (VRF) lottery** — before the draw, nobody knows who the candidate is, which defeats "targeted attacks." It is composed of two protocols: **BA\*** (leader selection) and **BA\*-VRF** (voting).

## The Four Essentials

- **Which layer**: [Settlement](/layers/Settlement) — pure PoS, VRF lottery for leader selection + voting confirmation, permissionless, no voting rounds
- **What it solves**: making block production rights unpredictable before the lottery result is revealed — a candidate who cannot be singled out in advance cannot be attacked in a targeted way (no pre-planned denial of service, no advance ambushes), turning sybil resistance from "resource competition" into "random selection"
- **How well it solves it**: permissionless, fast block production (about 4-5 seconds), no multi-round voting in the traditional BFT sense; the costs are that security depends on VRF correctness, finality is probabilistic, and network parameters (the sampling size k) are sensitive for the safety boundary. Public incidents: no public records found
- **Source**: Silvio Micali, "Algorand: A Secure Decentralized Ledger," 2017; Micali's series of papers on Algorand, 2017-2019

## Core Mechanism

- **BA\*** (Byzantine Agreement Star): the main protocol. Each cycle draws one candidate; the candidate generates a block and broadcasts it; the other nodes vote with BA\*-VRF, and once a majority agrees the block is confirmed.
- **BA\*-VRF** (voting protocol): the sub-protocol. A drawn voter uses a VRF to decide whether to vote, and the voting outcome cannot be predicted in advance.
- **Secret verifiable randomness**: the key property of a VRF is "secrecy" — before the lottery result is computed, neither the candidate nor an attacker can predict it. An attacker cannot keep a candidate offline in a targeted way.
- **Voteless rounds**: Algorand does not need traditional BFT "rounds" — producing a block is voting, voting is producing a block, completed in one round.

## Differences from Related Protocols

| Protocol | Relationship | Key Difference |
| --- | --- | --- |
| [Ouroboros](/consensus/Ouroboros) | Same category (VRF leader selection) | Ouroboros keeps block production and finality in one set of rules; Algorand splits block production and voting into two independent BA\* protocols |
| [BABE](/consensus/BABE) | Same category (VRF leader selection) | BABE separates block production from GRANDPA finalization; Algorand completes block production and voting within the BA\* framework |
| [Avalanche](/consensus/Avalanche) | Same category (probabilistic consensus) | Avalanche uses subsampled voting; Algorand uses a VRF lottery + BA\* voting |
| [TowerBFT](/consensus/TowerBFT) | Parallel line | TowerBFT determines the leader by PoH timing; Algorand uses VRF randomness |

## Failure Modes

- **VRF correctness is the ticket**: once secret verifiable randomness becomes predictable, Algorand's security fails outright.
- **The boundary of the sampling size k**: BA\*'s security proof depends on the sampling size k reaching a certain threshold; if k is too small, the cost of an attack drops.
- **Probabilistic finality**: Algorand's finality is probabilistic and needs multiple confirmations to reach a sufficiently low rollback probability.
- **Denial of service against candidates**: a candidate can be denied service before producing a block (for example by a network attack), leaving a cycle with no block. Algorand has a retry mechanism for this, but it introduces delay.

Algorand's contribution is **turning "who produces the next block" into a genuinely secret random event**, excluding "targeted attacks" at the protocol level — you do not even know who will produce the block, so you cannot target it to keep it from doing so.
