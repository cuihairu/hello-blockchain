# NPoS

NPoS (Nominated Proof-of-Stake) is [Polkadot](/chains/Polkadot)'s validator selection mechanism: token holders stake to candidate validators they trust (nominators), and the system elects the active validator set with the Phragmén election algorithm. It divides work with the block production protocol [BABE](/consensus/BABE) and the finality protocol [GRANDPA](/consensus/GRANDPA) — NPoS decides "who is qualified to keep the ledger," BABE decides "who produces in this slot," and GRANDPA decides "which stretch of history is irreversible."

## The Four Essentials

- **Which layer**: [Settlement](/layers/Settlement) — validator election and security-budget allocation in the PoS family
- **What it solves**: in pure PoS, "whoever holds coins stakes them" easily produces rich-get-richer stake concentration, while DPoS's fixed number of representatives sacrifices open participation. NPoS lets ordinary holders "lend" security budget to candidate validators through nomination, while the algorithm spreads stake evenly across validators
- **How well it solves it**: the Phragmén election rebalances validator stake every era (maximizing total stake, maximizing the minimum validator stake, minimizing stake variance); the nominator cap is about 22,500 (Polkadot) and the mature validator count is about 1,000 (reached on Kusama); the election is computed off-chain by workers to preserve the 6-second block time; the costs are the lock-up period imposed by era rotation and unbonding, and an election algorithm that is itself a complex multi-objective optimization
- **Source**: the Phragmén election algorithm (an 1890s multi-winner election method, adapted by Polkadot); [Polkadot Wiki · Phragmén](https://wiki.polkadot.com/docs/learn-phragmen), [· Staking](https://wiki.polkadot.com/docs/learn-staking); implementation in [w3f/consensus](https://github.com/w3f/consensus)

## Core Mechanism

- **Validators and nominators**: validators run nodes, produce blocks, and check parachains; nominators lock tokens and choose which validators to back. The system elects the active validator set by stake (validator self-stake + nominations).
- **The Phragmén election**: one seat is filled per round — each round the candidate whose "supporters have the lowest average cost" is elected, and its supporters' load rises, until the seats are full. The weighted version (used by Polkadot) treats holdings as a budget, spreading stake evenly across validators.
- **Era cycles**: each Polkadot era lasts 24 hours (Kusama 6 hours), and each era contains 6 sessions; a re-election and reward distribution happen at the end of every era.
- **Rewards and claims**: rewards are paid by era points; every active validator receives the same base reward regardless of stake size, then it is split by commission and nomination share; rewards must be claimed manually and expire if unclaimed for 84 eras; 85% of annual inflation goes into staking rewards.
- **Slashing**: validators and nominators are both slashed partially or fully for misbehavior (such as double-signing or long offline periods), and slashed funds go to the treasury; the unbonding period provides a window for penalizing misbehavior from historical eras.
- **Phragmms (Balphragmms)**: the next-generation election rules, adding maximin support and PJR (proportional representation) properties on top of Phragmén, with weights fully rebalanced each round.

## Differences from Related Mechanisms

| Mechanism | Who Decides Ledger Rights | Election Method | Representative |
| --- | --- | --- | --- |
| Pure PoS ([Ouroboros](/consensus/Ouroboros), [Algorand](/consensus/Algorand)) | Self-stakers | VRF lottery | Cardano, Algorand |
| [DPoS](/consensus/DPOS) | Holders vote for a fixed number of representatives | One round of voting | EOS, TRON |
| NPoS | Nomination + self-stake | Phragmén multi-objective optimization | [Polkadot](/chains/Polkadot), Kusama |
| The [Snowball](/consensus/Snowball) family | Subsampled voting | Repeated random queries | [Avalanche](/chains/Avalanche) |

## Failure Modes

- **Nomination concentration**: nominators tend to back well-known validators, and head effects plus the inertia of "stake for yield" offset the algorithm's spreading effect — the algorithm equalizes "the stake distribution of the elected set," not "the concentration of stake across the whole network."
- **Election algorithm complexity**: Phragmén is an off-chain multi-objective optimization, and rule upgrades (such as Phragmms) require governance and migration, so the complexity itself is an upgrade risk.
- **Liquidity during unbonding**: staked funds earn no return and cannot be moved during the unbonding period, and the opportunity cost of large funds falls on nominators.
- **Major mainnet-level incidents**: no public records found.

NPoS's contribution is **turning the "security budget" from validator self-holding into a composable nomination market**: ordinary holders can, for the first time, participate in security by putting up money without running a node — this is the direct predecessor of the [restaking](/consensus/Restaking) idea: if staking rights can be delegated to a validator, then the same stake can also be re-delegated to other protocols.
