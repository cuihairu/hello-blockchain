# IOTA Tangle

IOTA is an IoT-oriented network launched in 2015 whose ledger is not a chain but a **Tangle** — a directed acyclic graph: every new transaction must approve two old tips, with no blocks, no miners, and zero fees. Consensus is "who can become an approved tip": in theory it is decided by accumulated weight and random walk selection, but in practice, from launch until 2020, it was backstopped by a centralized **Coordinator**.

## The Four Essentials

- **Which layer**: [Settlement](/layers/Settlement) — probabilistic finality over a DAG ledger, long dependent on a coordinator (ledger structure in [DAG model](/model/DAG))
- **What it solves**: zero-fee accounting for IoT micro-transactions — replacing blocks and miner incentives with "approve two tips," so that 0-value transactions also matter
- **How well it solves it**: tip selection does not converge under low traffic and can be attacked with parasite chains under malicious traffic, so actual finalization authority stayed with the Coordinator (the IOTA Foundation issuing a milestone every two minutes); after the Trinity wallet was stolen in February 2020 the Foundation shut down the Coordinator and the whole network stalled for nearly a month — the decentralization promise failed exactly when it was needed most; Coordicide (the 2020 whitepaper) planned to remove the coordinator, but the 2025 Rebased upgrade instead replaced mainnet with an account model + delegated PoS (adopting the Mysticeti consensus engine), and the Tangle line exited mainnet. Public incident records are ample
- **Source**: Popov, "The Tangle" whitepaper, 2015 (<https://www.iota.org/resources/whitepaper>); the Coordicide whitepaper, 2020 (<https://files.iota.org/papers/Coordicide_WP.pdf>)

## Core Mechanism

- **Approval as consensus**: each transaction verifies signatures and chooses two tips to approve, together with a lightweight PoW (anti-sybil / anti-spam).
- **Accumulated weight**: a transaction's weight = itself + all transactions that directly or indirectly approve it — the more it is endorsed by later transactions, the more "settled" it is.
- **Tip selection (MCMC)**: starting from genesis, take two random walks along "transactions that approve me" and land on two unapproved tips — under low traffic the walk tends to stop on old tips, and in practice the engine's built-in "tip sales" rule backstops it.
- **Coordinator milestones**: milestone transactions signed by the Foundation are accepted by the whole network without question, effectively "a centralized block every two minutes" — the whitepaper acknowledges this is a transitional state, but the transition lasted about ten years.
- **Coordicide (never reached mainnet)**: mana (a reputation resource) + FPC (Fast Probabilistic Consensus) to remove the coordinator; the roadmap was overtaken before completion when the architecture was replaced by Rebased.

## Differences from Related Protocols

| Protocol | Relationship | Key Difference |
| --- | --- | --- |
| [Hashgraph](/consensus/Hashgraph) | Same category (DAG ledger) | Hashgraph has aBFT virtual voting and finalization rules; the Tangle's finalization long depended on the coordinator |
| [Narwhal and Bullshark](/consensus/NarwhalBullshark) | Same category (DAG ordering) | Narwhal's DAG serves only as a mempool, with ordering handed to Bullshark; the Tangle wants the DAG itself to be the ledger |
| [Lachesis](/consensus/Lachesis) | Same category (DAG BFT) | Lachesis is a DAG consensus with aBFT proofs that actually ran on mainnet; the Tangle is a coordinator-backed DAG ledger |
| [PoW](/consensus/POW) | Contrast | Both have probabilistic finality, but PoW converges without anyone needing to backstop it |

## Failure Modes

- **Coordinator single point**: the finality of a "decentralized" ledger is decided by one issuer — shutting it down in 2020 stalled the entire network, the most glaring public failure record of the DAG-class designs.
- **Low-traffic deadlock**: without enough new transactions, tip selection loses its statistical meaning and probabilistic finality becomes "nobody approves, so it never settles."
- **Parasite chain attacks**: maliciously constructed approval subgraphs can fool the weight calculation — later versions of the whitepaper revised the tip selection rule several times for this reason.

The Tangle's lesson is more universal than its mechanism: **probabilistic finality converges only with a large enough transaction flow, and whatever fails to converge must ultimately be backstopped by someone** — and that backstopper is the de facto trust anchor.
