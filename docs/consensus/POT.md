# PoT

Proof of Time (PoT) uses a **verifiable delay function (VDF)** to generate an unpredictable, non-acceleratable source of randomness for the network: a prover claims "I computed T steps serially", and anyone can verify it quickly. In Chia, PoT is combined with [PoSpace](/consensus/PoSpace): space decides "who may draw lots", while the proof of time decides "when the draw result is revealed and how it is ordered".

## Four Key Points

- **Which layer**: [Settlement layer](/layers/Settlement) — paired with [PoSpace](/consensus/PoSpace): space decides who may draw lots, and the proof of time decides when the draw is revealed and how it is ordered
- **What it solves**: Generate a source of randomness for the network that is unpredictable and cannot be accelerated — a prover claims "I computed T steps serially" (VDF), anyone can verify it quickly, and the draw result cannot be computed or ground in advance
- **How well it works**: The seriality of a VDF makes GPU/ASIC acceleration essentially useless, and verification is extremely fast; the cost is that the serial computation itself is slow, the challenge duration needs careful design, and the construction is sensitive to hardware assumptions
- **Sources**: Boneh, Bünz, Fisch "A Survey of Two Verifiable Delay Functions" 2018; Chia whitepaper 2019; official documentation [docs.chia.net/proof-of-time/](https://docs.chia.net/proof-of-time/), [chia-blockchain repository](https://github.com/Chia-Network/chia-blockchain)

## VDF: Verifiable Delay Function

- **Slow to compute, fast to verify**: computing requires T strictly serial operations (they cannot be parallelized), while verification needs only a single light check.
- Mainstream construction: **repeated squaring** $x^{2^T} \bmod N$, combined with a Wesolowski/Pietrzak incremental proof to shrink the proof size to logarithmic level.
- Guarantee of properties: intermediate values cannot be predicted by skipping steps, so an attacker cannot "know the future random value in advance".

## Role in Chia

1. The Timelord starts serially iterating the VDF from the challenge of the previous slot, producing the slot end value and the incremental proof.
2. That value serves as the space-proof challenge for miners (farmers) in the next slot — **the random value is unpredictable before the challenge is published**, which prevents "pre-plotting / pre-planned production" attacks.
3. The VDF duration fixes the slot duration, unifying the rhythm of the "space draw".

## Difference from PoET

[PoET](/consensus/PoET) trusts Intel SGX hardware to keep time; the VDF of PoT is a delay that is **mathematically publicly verifiable**, with no need to trust any hardware vendor — the cost is that a Timelord needs strong single-thread performance (verification by ordinary users is lightweight).

## Security Significance

- Blocks "grinding": validators cannot try several forks and pick the most favorable one, because future challenges are already locked in by the VDF.
- Provides an unbiased random beacon usable for selecting block producers, drawing leaders, and so on (complementary to RANDAO-style schemes).

## Cost Structure of the Timelord

The overhead of PoT is concentrated on the Timelord side (per the official documentation):

- **VDF computation**: Chia uses "repeated squaring in a class group of unknown order", with a 1024-bit discriminant and no trusted setup; proofs use the Wesolowski scheme and are split into 1-64 stages to generate in parallel (only proof generation is parallelized; the computation itself is strictly serial).
- **Serial elapsed time**: for each slot the Timelord must serially run T steps of the VDF before it can produce the slot end value — this demands strong single-thread performance and is the main hardware barrier for a Timelord; ordinary nodes that only verify are very light.
- **Chained structure (infusion)**: space-proof blocks and VDF outputs alternate into a single linear chain, and the output of the previous VDF is the challenge of the next VDF — the random value is unpredictable before the challenge is published, which structurally closes off "pre-plotting / pre-planned production".
