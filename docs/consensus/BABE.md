# BABE

BABE (Blind Assignment for Blockchain Extension) is Polkadot's block production protocol, paired with the finality gadget [GRANDPA](/consensus/GRANDPA). Its core idea is to make the assignment of block production rights **random and unpredictable**: each slot (time slot) uses a VRF lottery to decide who produces the block, and nobody knows before being drawn.

## The Four Essentials

- **Which layer**: [Settlement](/layers/Settlement) — Polkadot's block production protocol, with randomized leader assignment
- **What it solves**: using VRF + random slots to assign block production rights to validators, avoiding predictable leader rotation — leader assignment is "blind," nobody knows before the draw, and there is no way to attack a target in advance
- **How well it solves it**: together with GHOST it produces a fork tree, which GRANDPA then finalizes, so block production frequency can far exceed finality frequency; the costs are that VRF correctness is the ticket, separating block production from finality adds state complexity, and empty slots (missed slots) must be handled
- **Source**: Gavin Wood, "The Polkadot Whitepaper," 2016; the BABE specification, 2020 (Parity/Polkadot documentation)

## Core Mechanism

- **Random slots**: the network is divided into contiguous slots of fixed duration. Each slot draws independently to decide who produces the block for that slot.
- **Blind assignment**: the draw uses a VRF (verifiable random function); the draw result is revealed at block production time and cannot be known before verification. An attack against a specific validator cannot be pre-planned.
- **Allowed empty slots**: when no validator is drawn for a slot, that slot stays empty. Allowing empty slots lets block production frequency float naturally, without forcing a block every second.
- **Fork tree**: multiple validators producing blocks in the same slot create forks; the fork tree is chosen by the GHOST rule and finalized by GRANDPA.

## Differences from Related Protocols

| Protocol | Relationship | Key Difference |
| --- | --- | --- |
| [GRANDPA](/consensus/GRANDPA) | Paired (finality gadget) | BABE produces blocks and GRANDPA finalizes; the two are independent |
| [Casper FFG](/consensus/Gasper) | Same category (block production + finality) | FFG keeps block production and voting in one set of rules, while BABE and GRANDPA are separated |
| [TowerBFT](/consensus/TowerBFT) | Same category (leader assignment) | TowerBFT has the PoH timeline decide the leader, while BABE uses a VRF lottery |
| [Ouroboros](/consensus/Ouroboros) | Same category (VRF leader selection) | Ouroboros is Cardano's PoS; the VRF use is the same but the parameter systems differ |

## Failure Modes

- **VRF can be forged**: BABE's security depends entirely on VRF correctness — a validator who forges the lottery result forges block production rights. If the VRF's cryptographic assumption breaks, the block production protocol fails outright.
- **Too many empty slots**: network latency or insufficient validator performance raises the proportion of empty slots and lowers block production frequency, but nothing breaks.
- **Mismatch between block production and finalization pace**: block production can be fast, but GRANDPA finalization has its own independent cycle. A user's "block produced" and "irreversible" can be tens of seconds apart — wallets must handle the two separately.
- **Slot boundary attacks**: a validator who games slot boundaries (for example by delaying submission) may influence the fork tree selection.

BABE's key contribution is **turning "who produces the next block" into a verifiable random event** rather than "rotating by weight." This lets Polkadot's block production pace float naturally while keeping its resistance to targeted attacks.
