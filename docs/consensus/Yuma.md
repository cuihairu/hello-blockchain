# Yuma Consensus (Bittensor)

Bittensor's **Yuma Consensus** answers an unusual question: **how do you reach consensus on subjective service quality?** Miners produce a subnet's goods (predictions, images, text), validators score them individually, and on chain a stake-weighted median clipping reduces "subjective evaluation" to a single collusion-resistant weight — it does not verify the execution result, only the consensus "how well everyone thinks you did".

## Four Key Points

- **Which layer**: [Settlement layer](/layers/Settlement) — the underlying block production runs on subtensor (a Substrate chain, currently PoA: Aura block production + GRANDPA finality), while Yuma is a **rating consensus on top of that layer** and does not replace block production consensus
- **What it solves**: Service quality cannot be formally verified (unlike ZK, which can be proved), but ranking and reward allocation need to be consensus-able, while resisting validator collusion
- **How well it works**: elegant mechanically (median clipping + deviators losing dividends), and the only systematic answer in the field of "subjective utility"; the cost is that all traffic and scoring rights pass through validators — "all miner traffic only goes through validators" forms a scoring oligopoly, the opposite of a payer-driven design. Public incidents: no public record found
- **Sources**: Bittensor whitepaper (the Yuma Consensus and collaboration threat analysis chapters); official documentation concepts/internals (<https://docs.bittensor.com/>)

## Core Mechanisms

- **Score → weighted median → clip**: each epoch (tempo, default 360 blocks ≈ 72 minutes) validators run set-weights on miners; the chain aggregates by validator stake and takes the maximum weight backed by a κ (typically 0.5) fraction of stake, then **clips off the weight above it** — scores pushed up by a minority faction are shaved away.
- **Deviating from consensus is punished**: honest validators whose scores fall short of consensus lose that round's dividends (forfeit rewards), and the stake of a voting faction is slashed — "the right to score" itself is constrained economically.
- **Collusion boundary**: the protocol claims robustness under "an honest majority of stake", resisting collusion of up to 50% of the weight; beyond that it fails.
- **Burn-based registration**: most subnet registration requires a **non-refundable** floating registration fee — a sybil gate with no arbitration cost, and no punishment gradient.
- **Economics**: the base issuance is allocated to subnets by EMA demand share; each tempo distributes 18% to subnet owners / 41% to miners / 41% to validators and their stakers; from 2025-02 subnets have an independent alpha cap and halving curve (dTAO).

## Differences from Related Protocols

| Protocol | Relation | Key difference |
| --- | --- | --- |
| [Livepeer](/consensus/DPOS) | Same class (service verification) | Livepeer uses **probabilistic sampling verification** to produce a provable result, while Yuma uses a **scoring consensus** for subjective output |
| [DPOS](/consensus/DPOS) | Contrast | DPoS uses stake to elect representatives who vote; Yuma's validators hold "the right to evaluate", and the chain still clips |
| [GHOST](/consensus/GHOST) | Contrast | Both rely on weight to pick the best, but Yuma's weight is an evaluation score rather than chain length |
| [BFT](/consensus/BFT) | Boundary | Traditional BFT requires the proposed value to be verifiably identical, while Yuma's proposal is a subjective score — hence it resists only 50%, not 1/3 |

## Failure Modes

- **Scoring oligopoly**: all miner traffic and visibility pass only through validators, so scoring rights concentrate in those with the most stake — this is intrinsic to the protocol structure, not an implementation defect.
- **The ceiling of subjectivity**: median clipping only shaves off extreme scores and cannot prevent "consensus-level underestimation" — a systematic bias gets written into the ranking as fact.
- **Registration fees and liquidity**: burn-based registration keeps small participants out, and once a subnet is full new miners squeeze in through eviction, with opaque marginal cost.
- **The base layer is still permissioned**: subtensor is currently PoA, and the planned migration to NPoS is on the roadmap (timing unconfirmed) — "subjective consensus" runs on permissioned block production.

> Source: meshio research (merged 2026-10-13) — Yuma mechanisms, the collusion boundary, and the dTAO economics are taken from the Bittensor section of meshio repo `docs/research/comparable-chains.md`.
