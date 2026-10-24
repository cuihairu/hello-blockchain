# Sequencing and Settlement (Rollup Side)

Once a rollup moves execution off-chain, "who decides the transaction order" and "when is state final" get a new set of mechanisms: a **sequencer** first gives a soft confirmation, and then a fraud proof (optimistic) or a validity proof (ZK) turns it into final state in the L1 sense. This does not change L1 consensus, but it introduces a new class of trust problem — centralization of ordering rights.

## Four Key Points

- **Which layer**: the entry to the [Compute layer](/layers/Compute) plus anchoring back to the [Settlement layer](/layers/Settlement) — ordering happens before execution, and settlement ultimately returns to L1 consensus
- **What it solves**: Ordering and finality for rollup transactions — do the "thousands of orders per second" ordering cheaply off-chain, then guarantee cryptographically or game-theoretically that "a wrong sequence is never finally accepted by L1"
- **How well it works**: the ecosystem de facto standard is a **single sequencer** (Arbitrum, Optimism and Base all are), with low latency and an experience close to Web2, but the sequencer has become a repeated source of incidents: the Arbitrum sequencer was down and stopped writing for about 10 hours on 2023-02-25, and Optimism (2023-06) and Base (2023-09) each had hour-scale / minute-scale outages — during an outage users can only wait, and censorship resistance is backstopped by the L1 forced inclusion channel; shared sequencing (Espresso and similar) and based sequencing set out to fix centralization, but as of 2025 there is still no large-scale production deployment
- **Sources**: Optimism sequencer documentation (<https://community.optimism.io/docs/how-sequencers-work/>); Espresso Systems (<https://espressosys.com/>)

## Core Mechanisms

- **Sequencer soft confirmation**: a transaction entering the sequencer gets an immediate receipt (~200 ms experience); it is batched and compressed before being posted to the L1 data availability layer; the order is decided solely by the sequencer — that is its entire power.
- **Forced inclusion**: a user can stuff a transaction into a rollup's inbox via an L1 transaction (Arbitrum's delayed inbox is about 24 hours, OP's within hours), and the sequencer must process it — the benefit of censorship is limited, and the price is slowness.
- **Optimistic settlement**: a state root is trusted by default, and during the challenge window (about 7 days in the OP Stack) anyone can use a **fraud proof** to falsify a wrong state root — trust plus punishment.
- **ZK settlement**: each batch of state transitions carries a **validity proof**, and once the L1 contract verifies it the state is final — a cryptographic guarantee with no challenge window, but proof generation is expensive.
- **Three routes to decentralized ordering**: shared sequencing (several rollups share one decentralized ordering network, with cross-chain atomicity solved as a side effect), based sequencing (ordering rights are given to L1 proposers, inheriting L1 decentralization), and sequencer consortia / rotation (the rollup chooses its own committee).

## Differences from Related Approaches

| Approach | Sequencer | Finality | Current state |
| --- | --- | --- | --- |
| Single sequencer (Arbitrum, OP, Base) | A single point run by the project | Optimistic 7 days / ZK hours | De facto standard |
| Based sequencing | L1 proposers | Same as above | Direction in the OP roadmap, not widely deployed |
| Shared sequencing (Espresso, Astria) | A dedicated decentralized network | Same as above + cross-rollup atomicity | Early stage |
| Direct L1 ordering (no rollup) | All validators | Given directly by L1 consensus | Throughput cannot scale |

## Failure Modes

- **Sequencer outage**: the whole L2 becomes unwritable, only reading and withdrawal remain — the Arbitrum 10-hour outage is the textbook case; funds are not endangered, but availability depends entirely on the operator.
- **Ordering rights as MEV**: a single sequencer = a single point of front-running and sandwich power, and less checked than public-chain MEV.
- **Challenge mechanism failure**: on the optimistic route, if a fraud proof cannot be submitted inside the window because of a bug or a bad upgrade, a wrong state root becomes final — historically every rollup's fraud proof has gone through a period of "long unable to submit successfully".
- **Upgrade keys**: sequencer and contract upgrade authority are concentrated in the operator — the "maintainable surface" is the attack surface (see [smart contract vulnerabilities](/hacking/SmartContractVulnerabilities)).

The essence of rollup ordering: **leave the expensive part of L1 consensus (global validation) to settlement, and hand the cheap part (queuing) to an accountable role** — all the controversy is concentrated on "should that role be decentralized".
