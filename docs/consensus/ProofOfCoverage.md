# Proof of Coverage (Helium PoC)

The problem Helium is solving is "claims of wireless coverage are unverifiable": a hotspot says it covers this area — how do you falsify that? The answer is to turn physical-world probing into a cryptographic challenge — **Proof of Coverage (PoC)**: a challenger emits a wireless challenge, the target hotspot replies, nearby hotspots testify, and the testimony is checked against the laws of physics (inverse-square signal falloff, upper bound on arrival time given the speed of light). It is a complete worked example of making a falsifiable claim about physical state.

## Four Key Points

- **Which layer**: a sybil-resistance extension of the [Settlement layer](/layers/Settlement) — it does not choose who produces blocks, it chooses "whose physical claim is credible"; the consensus itself was originally carried by the [HoneyBadgerBFT](/consensus/ABFT) consensus group
- **What it solves**: Make "I am here and I have coverage" a verifiable claim — fake locations and fake coverage become uneconomic in the face of physical laws and three-party probing
- **How well it works**: PoC underpins the world's largest decentralized LoRaWAN network; but the self-built chain (Erlang + HBBFT) was long missing in smart contracts and bridging, and on 2023-04-18 the whole thing migrated to Solana, with PoC computation handed to an oracle and settlement on Solana — "physical proof" and "block production consensus" ended up fully decoupled. Public incidents: blockchain stall records in 2020 (insufficient stability of the self-built chain was one of the officially stated reasons for the migration)
- **Sources**: Helium whitepaper (<https://github.com/helium/whitepaper>); HIP-25 (validators), HIP-51/52/53 (subDAO), HIP-70 (Solana migration); official documentation (<https://docs.helium.com/>)

## Core Mechanisms

- **Three-party roles**: challenger (builds a multi-layer encrypted challenge package), transmitter (the target hotspot required to emit), witness (neighboring hotspots hear it) — no single party can forge it alone.
- **Physical consistency checks**: testimony is cross-verified against signal strength (inverse-square law) and arrival time (speed-of-light upper bound), so a fake location must fool both the laws of physics and its neighbors.
- **Anti-forgery entropy source**: the challenge beacon now uses hard-to-forge entropy supplied by an oracle (HIP-70), closing off the hole of "predicting the challenge and pre-positioning".
- **The consensus-group era (now history)**: in the whitepaper design the highest-scoring miners formed an HBBFT consensus group that produced blocks, with threshold encryption preventing single-node censorship; validators required a minimum 10,000 HNT stake (HIP-25) — all of this was retired after the Solana migration.
- **Economic loop**: data usage is counted in Data Credits (1 DC = $0.00001, mintable only by burning HNT, non-transferable) — a burn-and-mint model where usage is pegged to fiat and the main token deflates with usage.

## Differences from Related Protocols

| Protocol | Relation | Key difference |
| --- | --- | --- |
| [PoSpace](/consensus/PoSpace) / [PoST](/consensus/PoST) | Same class (proofs of resource) | They prove "I own the disk", while PoC proves "my physical position and coverage" — the challenge object is radio, not storage |
| [PoET](/consensus/PoET) | Same class (trusted hardware side) | PoET trusts the clock inside the TEE, while PoC trusts the laws of physics and multi-party testimony |
| [ABFT](/consensus/ABFT) (HoneyBadgerBFT) | Its block production consensus | PoC only settles "who is eligible for a reward"; ordering was handled by HBBFT (later Solana) |
| [HoneyBadgerBFT](/consensus/HoneyBadgerBFT) | Component | Asynchronous atomic broadcast + threshold encryption, the consensus-group engine of the whitepaper era |

## Failure Modes

- **The game never stops**: fake hotspots (planted on a windowsill, fitted with an amplifier), forged testimony, location-claim attacks — PoC parameters (challenge frequency, witness threshold) are being adjusted for a long time.
- **The cost of a self-built chain**: the consensus group + Erlang stack was replaced wholesale within three years — even excellent physical proof cannot save a system from engineering shortcomings at the settlement layer.
- **Oracle dependency**: after the migration, PoC verification and reward calculation are concentrated in the oracle, so the credibility of the physical proof shrinks from "the whole network" to "the oracle operator".

> Source: meshio research (merged 2026-10-13) — mechanisms and migration details taken from the Helium section of meshio repo `docs/research/comparable-chains.md`.
