# Ouroboros

Ouroboros is Cardano's proof-of-stake consensus, the first PoS protocol with a rigorous cryptographic security proof. It turned "block production rights allocated randomly by stake weight" from "sounds reasonable" into "has a mathematical proof" — before this, PoS security arguments were always informal.

## The Four Essentials

- **Which layer**: [Settlement](/layers/Settlement) — the rigorously proven version of PoS, with epoch/slot + VRF leader selection
- **What it solves**: giving PoS a formalizable security proof — selecting a producer at random by stake weight, with safety provable mathematically rather than only on empirical grounds
- **How well it solves it**: the first PoS with a rigorous security proof, running on Cardano mainnet since 2017; the costs are complex epoch/slot parameter design, VRF correctness as the ticket, and probabilistic finality (an extra finality mechanism is needed)
- **Source**: Kiayias, Das, Elahi et al., "Ouroboros: A Provably Secure Proof-of-Stake Blockchain Protocol," CRYPTO 2017; the Cardano whitepaper and specification

## Differences from Early PoS

Early PoS ([Peercoin](/consensus/POS) 2012, [Nxt](/consensus/POS) 2013) used "coin age" to decide block production rights — the longer your coin age, the higher your priority. Coin age is deterministic and can be predicted and manipulated. Ouroboros replaced it with a **VRF random lottery**: block production rights are allocated by stake weight, but who specifically produces is random and unpredictable.

## Core Mechanism

- **Epoch and slot**: time is cut into epochs, and epochs are cut into slots. Each slot independently draws one slot leader.
- **VRF leader selection**: the slot leader is decided by a VRF lottery, with probability distributed by each validator's total stake weight. Nobody knows before the draw.
- **Intra-epoch randomization**: each epoch re-randomizes the slot leader sequence, avoiding long-term predictability.
- **The k parameter and the honesty assumption**: the security proof assumes the honest validators' stake share exceeds a certain threshold (above $1/2$); below the threshold, safety degrades.

## The Ouroboros Family

| Variant | Traits |
| --- | --- |
| Ouroboros Genesis | The initial design, with the intra-epoch leader sequence precomputed |
| Ouroboros Praos | The current mainnet version, with a fully blinded VRF and no precomputation |
| Ouroboros Genesis + | Improved randomization |
| Ouroboros Cresset | Introduces a finality gadget (the Ouroboros Coda line) |

## Differences from Related Protocols

| Protocol | Relationship | Key Difference |
| --- | --- | --- |
| [Algorand](/consensus/Algorand) | Same category (VRF leader selection) | Algorand uses BA\* protocols for leader selection and voting, while Ouroboros only does block production and leaves finality to probability |
| [BABE](/consensus/BABE) | Same category (VRF leader selection) | BABE produces blocks and GRANDPA finalizes; Ouroboros keeps block production and finality in one set of rules |
| [Gasper](/consensus/Gasper) | Same category (PoS + BFT) | Gasper uses BFT voting for deterministic finality, while Ouroboros finality remains probabilistic |

## Failure Modes

- **The honesty-assumption boundary**: the security proof depends on honest stake exceeding the threshold. If adversaries stake more than $1/2$, there is no safety guarantee — this is isomorphic to PoW's 51% problem.
- **VRF correctness**: the lottery uses a VRF, and if the VRF's cryptographic assumption breaks, block production rights can be forged.
- **Probabilistic finality**: as with PoW, finality is probabilistic (rollback probability drops with confirmation count), not deterministic.
- **Epoch boundary attacks**: the moment an epoch switches is an attack window, and updates to validator state and the leader sequence must be strictly synchronized.

Ouroboros's value is not "faster" or "cheaper" but **giving PoS security a mathematical proof for the first time** — this provides a verifiable baseline for the whole PoS family.
