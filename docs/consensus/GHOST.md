# GHOST

GHOST (Greedy Heaviest Observed Subtree) is the **fork choice rule** proposed by Sompolinsky and Zohar in 2013 — not a complete consensus protocol, but a single rule answering "when there is a fork, which chain to choose." Its classic applications are the simplified GHOST that Ethereum used from 2015 to 2022, and the [LMD-GHOST](/consensus/Gasper) it evolved into after The Merge.

## The Four Essentials

- **Which layer**: [Settlement](/layers/Settlement) — a fork choice rule, used in combination with any block production mechanism
- **What it solves**: the longest-chain rule discards forked blocks (uncles) outright — the more forks, the more wasted hash power, and the larger the relative advantage of big mining pools on the main chain (centralization pressure). GHOST counts forked blocks into the weight and selects the "heaviest subtree" branch
- **How well it solves it**: makes shorter block intervals feasible (Ethereum 15 seconds vs Bitcoin 10 minutes), and forked hash power is no longer pure waste (Ethereum's uncle rewards); the cost is that full GHOST is complex to implement, and Ethereum uses a reduced version that keeps only "subtree weight within the last 7 levels"
- **Source**: Sompolinsky, Zohar, "Accelerating Bitcoin's Transaction Processing," 2013; "Secure High-Rate Transaction Processing in Bitcoin," FC 2015; the Ethereum Yellow Paper (simplified version)

## Core Mechanism

- **Longest chain vs heaviest subtree**: the longest-chain rule compares chain length (accumulated difficulty), while GHOST walks down from genesis and at each fork point chooses the sub-branch with the greatest accumulated difficulty including the forked block.
- **Forked blocks are not wasted**: a losing block enters the main chain block's reference list as an uncle and earns a partial reward — an attacker's expected return from forking drops further.
- **Block interval and centralization**: the faster the block production, the more forks; under the longest-chain rule a faster chain loses "effective hash power" more severely, which hurts small mining pools (incentives pushing toward centralization); GHOST credits forked hash power back into the subtree, mitigating this.

## Family and Evolution

| Variant | Description |
| --- | --- |
| Original GHOST (2013/2015) | Recursively selects the heaviest subtree; the paper includes a security proof |
| Ethereum simplified GHOST | Only counts uncle weight within the last 7 levels, an engineering trade-off |
| [LMD-GHOST](/consensus/Gasper) | Beacon-chain fork choice after The Merge: selects the subtree by validator **latest message** voting weight — GHOST idea + PoS voting |
| PHANTOM / SPECTRE | The GHOST idea generalized to DAGs (DAG ordering and throughput) |

## Comparison with Related Rules

| Rule | Source of Weight | Typical User |
| --- | --- | --- |
| Longest chain (Nakamoto consensus) | Accumulated difficulty / accumulated work | [Bitcoin](/chains/Bitcoin), Litecoin |
| GHOST | Subtree accumulated difficulty (including forked blocks) | Ethereum's PoW era (simplified version) |
| LMD-GHOST | Validator latest voting weight | Ethereum beacon chain (see [Gasper](/consensus/Gasper)) |
| GHOST+GRANDPA | Validator prefix voting | [Polkadot](/chains/Polkadot) (see [GRANDPA](/consensus/GRANDPA)) |

## Failure Modes

- **Safety boundary of the reduced version**: Ethereum only counts uncles in the last 7 levels, and "hash power beyond 7 levels" is not counted, so its theoretical properties differ from the original.
- **Abuse of the uncle mechanism**: uncle rewards were once used to "smuggle" extra block-production revenue, after which Ethereum lowered the uncle reward coefficient.
- **Voting attack surface of LMD-GHOST**: latest-message-driven selection is sensitive to "voting history," and if validators are induced to vote on the wrong branch, forks are amplified (see [Gasper](/consensus/Gasper)).

GHOST's contribution is **turning "forks" from waste into signal**: forked blocks also count as weight, so fast block production goes from "self-destruction" to "feasible." Every "choose the heaviest branch" rule today — from LMD-GHOST to DAG ordering — is its descendant.
