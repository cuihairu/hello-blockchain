# Restaking

Restaking (EigenLayer went live in 2023) does not invent a new consensus protocol; it changes "who puts up the security budget": already-staked ETH is staked again to an **AVS** (Actively Validated Service — an off-chain component such as a DA layer, a bridge, or an oracle), so the same capital backs several protocols at once. It is the flagship of the "shared security budget" route.

## Four Key Points

- **Which layer**: the security-budget economics of the [Settlement layer](/layers/Settlement) — the consensus protocol does not move, what moves is "whose slashing deterrent covers you"
- **What it solves**: New protocols do not want to run their own validator network and token (cold start is hard, the budget is thin, 51% attacks are cheap), so they **reuse** Ethereum's existing staked capital and slashing machinery
- **How well it works**: ecosystem expansion in 2024-2025 was very fast (TVL once reached the twenty-billion-dollar range, and the first AVSes such as EigenDA went live), but the structural controversy never stopped: Buterin warned in 2023 "do not overload Ethereum's consensus" — correlated failures of AVSes flow back through restaking into L1; early AVSes generally kept slashing terms switched off, the slashing framework only went live in 2025, and real slashing paths are still new. Public incidents: no public record found (no major AVS slashing incident as of writing)
- **Sources**: Kannan et al. "EigenLayer: The Restaking Collective" whitepaper 2022; EigenLayer contracts repository (<https://github.com/Layr-Labs/eigenlayer-contracts>); Buterin "Don't overload Ethereum's consensus" 2023 (<https://vitalik.eth.limo/general/2023/05/21/dont_overload.html>)

## Core Mechanisms

- **Three layers of restaking**: stakers delegate ETH (or an LST) to an operator → the operator chooses which AVSes to run → an AVS imposes **slashing terms** on operator behavior — the original slashing mechanism is extended from "protecting Ethereum only" to "protecting every connected AVS".
- **The arithmetic of the security budget**: attacking an AVS requires corrupting 1/3 or 1/2 of its restaked validators — if the same set of people are securing several AVSes, the attack cost is **shared** while the gains are separate; that is the source of the efficiency and also the source of the risk.
- **Correlated failure**: a bug or slashing event in one AVS hits every operator that restaked for it, and the loss propagates back through the stake to Ethereum validators — the L1 consensus layer is pierced by risk exposure from external protocols.
- **The incentive side**: an AVS pays service fees plus early airdrop points to attract stakers to pick a side; "points for airdrops" produced a lot of circular leverage in 2024 (LRT restaking tokens borrowed out again).

## Differences from Related Routes

| Route | Approach | Difference |
| --- | --- | --- |
| [Polkadot](/chains/Polkadot) shared security | Relayer-chain validators block uniformly for parachains | Security is native from day one, and joining requires an auction / buying a core; EigenLayer is layered on afterwards |
| Cosmos cross-chain security (ICS) | A provider chain's validator set is reused by consumer chains | Chain-level reuse (a whole chain), while EigenLayer is service-level reuse (a single component) |
| Own validator network | Every protocol has its own token and stake | The budget is independent but thin — which is exactly what restaking sets out to solve |

## Failure Modes

- **Overloading consensus**: when many AVSes fail at once, slashing and exit waves shock the L1 validator set itself — this is the core of Buterin's warning and something the protocol design does not fully solve.
- **Slashing in name only**: the terms are written but were generally switched off early on, so the deterrent was once only on paper — between "having a slashing clause" and "actually enforcing it" sits governance.
- **Incentive bubble**: point-driven TVL does not reflect real demand, and retention after the subsidies dry up is unproven.
- **Operator centralization**: running an AVS has fixed operations cost, so top operators concentrate naturally — the security budget is shared, and so is the operational control.

Restaking turns the "security budget" into an asset that can be split and leased out: correct in efficiency, and **it treats the trust of Ethereum's settlement layer as a resource that can be re-leveraged** — the returns arrive immediately, while the risk only shows up on the day things break.
