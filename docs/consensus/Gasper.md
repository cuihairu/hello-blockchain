# Gasper

Gasper is the consensus algorithm of Ethereum mainnet after The Merge (2022-09), composed of two independent mechanisms: **LMD-GHOST** (fork choice at block production) and **Casper FFG** (finality voting). It splits "which chain to choose" from "which chain is irreversible" into two independent components and is a representative of modular consensus design.

## The Four Essentials

- **Which layer**: [Settlement](/layers/Settlement) — Ethereum mainnet consensus: LMD-GHOST selects the head, Casper FFG finalizes, and the two divide the work
- **What it solves**: transitioning from probabilistic finality in the PoW era to PoS while preserving both the fork-choice and finality lines — GHOST selects the head, FFG finalizes, so existing applications migrate smoothly
- **How well it solves it**: has run continuously since The Merge, energy use down by about 99.95%, and confirmation is faster; the costs are weak subjectivity (new nodes must sync from a recent trusted state), edge cases in the slashing mechanism (inactivity leak), and complex fork-choice and finality rules
- **Source**: Buterin, Griffith, "Casper the Friendly Finality Gadget," 2017; the LMD-GHOST specification; the Ethereum consensus specification (Gasper)

## Two Mechanisms, Each Handling One Thing

- **LMD-GHOST (Latest Message Driven GHOST)**: which chain to extend at block production. Each validator's weight accumulates from its own most recent vote, selecting the subtree with the greatest accumulated weight. It answers "which chain to choose when there is a fork," not "which chain is irreversible."
- **Casper FFG (Friendly Finality Gadget)**: finality voting. Validators vote on "checkpoints"; a checkpoint receiving 2/3 of staked weight is "justified," and when the next round receives another 2/3 of votes it is "finalized." It answers "which chain is irreversible."

## Key Concepts

- **Checkpoint**: the boundary block of each epoch. FFG does not vote on every block, only on checkpoints, lowering voting overhead.
- **Justification and finalization**: a checkpoint is justified by 2/3 of staked votes; when its child checkpoint receives another 2/3 of votes, the parent checkpoint is finalized. Finalization means irreversibility.
- **Weak subjectivity**: when a new node syncs from genesis, it cannot tell from the chain itself which is the "true chain" — it must start from a recent trusted state (checkpoint). This is a cost PoS cannot escape.
- **Slashing**: double-signing and surround voting are penalized when proven, and are the core of PoS economic security.
- **Inactivity leak**: when the chain cannot finalize for a long time (for example more than 1/3 of validators offline), non-voting validators are slowly slashed until the remaining validators again reach 2/3.

## Comparison with the PoW Era

| Dimension | PoW (Nakamoto consensus) | Gasper (PoS) |
| --- | --- | --- |
| Block production rights | Competition by hash power | Random selection weighted by stake |
| Fork choice | Longest chain (accumulated difficulty) | LMD-GHOST (accumulated voting weight) |
| Finality | Probabilistic (more confirmations make rollback harder) | Deterministic (2/3 votes make it irreversible) |
| Energy use | High | Low, about 99.95% lower |
| New node sync | Verifiable from genesis | Requires weak subjectivity (recent trusted state) |

## Failure Modes

- **Slashing edge cases**: the determination of double-signing evidence and the definition of surround voting both have boundaries, and mistaken slashing hurts honest validators.
- **Side effects of inactivity leak**: a large-scale offline event (such as a client bug) triggers cascading slashing and has accidentally affected some validators.
- **Fork-choice attacks**: LMD-GHOST's weight accumulation is sensitive to "voting history," and if validators are induced to vote on the wrong branch, forks are amplified.
- **Finality latency**: during a network partition or validator outage, finalization stalls — the chain keeps producing blocks but checkpoints are no longer finalized.

Gasper's design philosophy is **separating finality out of block production**: block production can be slow and can fork, but finality is guaranteed by an independent voting layer. This separation let Ethereum complete the PoW → PoS transition without rewriting the execution layer.
