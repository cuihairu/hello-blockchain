# Narwhal and Bullshark

Narwhal/Bullshark is a set of paired protocols published by the Diem (formerly Libra) research team in 2021-2022: **Narwhal** is the system that turns reliable transaction propagation into a DAG mempool, and **Bullshark** is the BFT consensus that finalizes directly on the DAG. It was adopted by Sui mainnet (2023) and evolved into **Mysticeti** (uncertified DAG-BFT) in 2024. It is the engineering representative of the "decouple execution from consensus" line.

## The Four Essentials

- **Which layer**: [Settlement](/layers/Settlement) — a DAG mempool (Narwhal) + DAG-BFT consensus (Bullshark/Mysticeti)
- **What it solves**: fully separating "reliable propagation of transactions" (the mempool) from "ordering and confirmation" (consensus) — Narwhal keeps broadcasting availability, and consensus only handles transactions whose availability is already broadcast, saving the multi-round serial overhead of traditional consensus's "package + broadcast + vote"
- **How well it solves it**: Sui mainnet launched in 2023, and Mysticeti in 2024 removed consensus certificates for another round of latency reduction, with good throughput and latency; the costs are high storage and bandwidth requirements, remaining leader rounds (before Mysticeti), and a partial-synchrony rather than fully asynchronous network assumption
- **Source**: Danezis, Kokoris-Kogias et al., "Narwhal: A Decentralized, High-Throughput DAG-Based Ledger," 2021; the Bullshark paper, 2022; Mysticeti (Danezis, Kokoris-Kogias et al.), 2024

## Why Split Them Apart

In traditional consensus ([PBFT](/consensus/PBFT), [Tendermint](/consensus/Tendermint), [HotStuff](/consensus/HotStuff)), mempool propagation is part of the consensus round — every round of block production requires the transactions to be broadcast again. Narwhal makes the mempool an **independent system**: once a transaction enters, it is reliably propagated continuously inside the DAG structure, and the consensus side only confirms "which transactions are stable." This raises mempool bandwidth utilization and stops consensus rounds from being throttled by propagation overhead.

## Core Mechanism

- **Narwhal (mempool DAG)**: each node receives a batch of transactions and generates a DAG node (containing availability proofs for the transactions), continuously pushing it to peers in topological order. Propagation uses a shared random timestamp for ordering, ensuring different nodes see a consistent DAG structure.
- **Bullshark (consensus)**: validators, in leader rounds, "extract" available transactions pending confirmation from the Narwhal DAG and vote; voting is done on the DAG structure, and finalization does not depend on extra block propagation.
- **Mysticeti (evolution)**: removes the "certificate" concept from Bullshark, letting one round of votes directly decide finalization, cutting one more hop of latency.
- **Execution decoupling**: consensus confirms that transactions are stable, and actual execution is done in parallel by the execution layer on top of the DAG structure (Sui's Move object model).

## Differences from Related Protocols

| Protocol | Relationship | Key Difference |
| --- | --- | --- |
| [DiemBFT](/consensus/DiemBFT) | The same research lineage | DiemBFT is the consensus side, while Narwhal/Bullshark is a paired mempool + consensus system that also decouples "propagation" |
| [HotStuff](/consensus/HotStuff) | Contrast | HotStuff compresses votes with QC aggregation, while Narwhal/Bullshark compresses propagation with a DAG mempool |
| [Lachesis](/consensus/Lachesis) | Same category (DAG consensus) | Lachesis is an aBFT DAG with no leader rounds, while Bullshark has leader rounds |
| Mysticeti | Evolution of Bullshark | Removes certificates, so one round of block production finalizes |

## Failure Modes

- **Bandwidth and storage pressure**: transactions are continuously propagated in the mempool, and nodes must maintain high bandwidth and persistent state — the resource tax paid for "decoupling" in exchange for throughput.
- **Partial-synchrony assumption**: Bullshark depends on timeout assumptions (leader rounds) and stalls under a complete partition, unlike [HoneyBadgerBFT](/consensus/HoneyBadgerBFT), which tolerates asynchrony.
- **DAG ordering depends on shared randomness**: the mempool DAG's topology is decided by shared randomness, and an unreliable source of randomness introduces divergence.
- **The gap from research to production**: the protocol was published in 2021 and only went live in 2023 — engineering cost is often underestimated.

Narwhal/Bullshark's significance is that it decomposes "what actions are actually inside consensus" to the finest grain — **propagation, ordering, confirmation, and execution** each form their own stage, and each stage can be optimized independently. This line of thinking continues DiemBFT's "execution decoupling," and together they carry "modular consensus" from concept into engineering.
