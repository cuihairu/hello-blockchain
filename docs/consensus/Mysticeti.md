# Mysticeti

Mysticeti is the **uncertified DAG BFT** published by Mysten Labs in 2024: it changes [Narwhal and Bullshark](/consensus/NarwhalBullshark)'s "certified DAG" into "uncertified" — each round no longer collects voting certificates, and a tighter commit rule finalizes directly. It went live on Sui mainnet in the second half of 2024, compressing finality from second-level into sub-second.

## The Four Essentials

- **Which layer**: [Settlement](/layers/Settlement) — uncertified DAG consensus (the successor to Narwhal/Bullshark and Sui's current consensus)
- **What it solves**: cutting away DAG consensus's latency overhead — a certified DAG must collect a 2/3 signature certificate every round before it can extend, and Mysticeti saves that extra round trip with "direct parent chain + three-round commit rule"
- **How well it solves it**: after Sui mainnet launched in 2024, finality was compressed from Bullshark's roughly 1.6 s down to roughly 390-400 ms, with throughput held at the hundred-concurrency level; the costs are a more delicate protocol and implementation (the safety argument of the commit rule rests on strict parent-chain conditions), a short time since launch, and little third-party audit and long-term operating record. Public incidents: no public records found
- **Source**: Mysten Labs, "Mysticeti: Achieving Low Latency and Certainty via Uncertified DAG BFT Consensus Protocols," 2024 (arXiv:2404.12257); Sui official documentation

## Core Mechanism

- **Uncertified DAG**: in each round every validator broadcasts a block pointing to 2 parent blocks from the previous round — no need to collect certificates before extending; the DAG grows by "blind extension + after-the-fact finalization."
- **Three-round direct commit**: for a block to be finalized it must anchor three consecutive rounds of **direct parent chain** (a direct parent-child relation in round r → r+1 → r+2 each) — directness guarantees "whatever enters the DAG cannot escape," replacing the non-repudiation role of certificates.
- **Pipelined broadcast**: block broadcasting overlaps with processing of the previous round, and signature verification and storage writes do not block the block production path.
- **Fault tolerance boundary**: the same partial-synchrony assumption as Bullshark, n ≥ 3f+1 validators, and a 2/3 honesty threshold.

## Differences from Related Protocols

| Protocol | Relationship | Key Difference |
| --- | --- | --- |
| [Narwhal and Bullshark](/consensus/NarwhalBullshark) | Predecessor | Bullshark collects certificates each round (certified DAG), while Mysticeti extends directly without certificates, saving one round trip |
| [Tusk](https://github.com/MystenLabs) | Earlier work from the same team | Tusk is DAG ordering for an asynchronous network (paired with Narwhal), while Mysticeti swaps in a partial-synchrony assumption for lower latency |
| [Hashgraph](/consensus/Hashgraph) | Same category (DAG + virtual voting) | Hashgraph relies on locally deduced virtual voting, while Mysticeti relies on an explicit commit rule; the former is patent-closed, the latter open source |
| [HotStuff](/consensus/HotStuff) | Contrast (chained BFT) | HotStuff has one QC per block and linear communication, while Mysticeti drops per-block QCs altogether and uses DAG concurrency to amortize latency |

## Failure Modes

- **Correctness concentrated in the commit rule**: without certificates, the "three-round direct parent chain" rule is the entirety of safety — if the implementation deviates (missing parent pointers, misjudged rounds), the safety argument fails outright.
- **DAG storage and sync**: a new node must replay the whole DAG to catch up, and snapshot and pruning strategies are a hidden engineering cost.
- **Short operating record**: it went to mainnet only in 2024, so there are few records of behavior over the long term and under extreme network conditions — a boundary shared by all new consensus.

Mysticeti's directional significance is that **certificates are not free** — the DAG structure itself plus a tight enough commit rule can move "non-repudiation" out of the messages and into the graph, saving an entire network round trip at the same trust threshold.
