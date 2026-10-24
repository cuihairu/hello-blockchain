# PoST

Proof of Space-Time (PoST) adds a follow-up question on top of proofs of space: **"you not only own this space, you have kept holding it for the whole duration"**. The Spacemess (Spacemesh) blockchain makes it its core consensus, using persistent storage plus a time dimension together to decide the right to produce blocks.

## Four Key Points

- **Which layer**: [Settlement layer](/layers/Settlement) — space + time together decide the right to record (the Spacemesh form)
- **What it solves**: Add a time dimension on top of a proof of space — "you not only own this space, you have kept holding it for the whole duration", so the cost of transferring or faking it accumulates over time
- **How well it works**: Continuous holding raises the cost of attack, and there is no computing-power arms race; the cost is that it requires long-term occupation of disks, the time challenge depends on a reliable random source, and the I/O overhead of generating proofs is significant. Public incidents: no public record found
- **Sources**: Spacemesh whitepaper and specification from 2018 onward (the public implementation and specification source of PoST; the academic concept of proof of space-time appears earlier in the distributed systems literature)

## Basic Principles

1. **Initialization (PoS phase)**: a miner uses its own identity key pair to create an ATX (activation transaction), proving that its identity is bound to N TiB of committed space — a process similar to one-time plotting.
2. **Round-by-round proving (the time dimension)**: the network advances in rounds (epochs); each round a miner must generate a new non-interactive proof over all committed space based on the previous round's challenge, proving the data is still on its disks (read-write amplification is held to a constant factor by the protocol).
3. **Production (Tortoise & Hare)**:
   - **Hare**: several rounds of binary consensus within a round quickly reach agreement on that round's block set (decided by the online nodes).
   - **Tortoise**: slow but robust weighted voting finalizes the order, with weight = honest committed space.

## Differences from PoSpace/PoC

| Dimension | PoSpace (Chia) | PoST (Spacemesh) |
| --- | --- | --- |
| Object proven | One-time plotting, sampled at production | The whole space is re-proven every epoch |
| Role of time | A separate PoT chain provides randomness | The time dimension is embedded in the proof itself |
| Production form | Slot draw, single winner | The whole network cooperates to produce "one block set per round" |
| Mining hardware | HDD sampled reads | Committed disks stay online continuously |

## Characteristics

- The space weight of an honest majority decides security; an attack requires controlling more than half the committed space.
- There is no energy arms race, but miners must keep their disks online long term and produce proofs on time, or the ATX expires and they drop out.
- The Spacemesh mainnet went live in 2023; its ecosystem is limited in scale, and it is the most complete production implementation of PoST.

## Production Sample: Filecoin

> Source: meshio research (merged 2026-10-13); details checked against spec.filecoin.io and docs.filecoin.io.

Filecoin assembles PoRep/PoST into a complete production consensus (Expected Consensus, executed by the Storage Power Consensus subsystem):

- **Storage as votes**: raw bytes × Sector Quality Multiplier = quality-weighted power, i.e. the number of votes in the secret election; a Verified Client deal has a higher multiplier — the transaction type feeds back into consensus weight.
- **Proof compression**: PoRep sealing goes through SDR encoding + a Poseidon Merkle tree and is compressed with a SNARK before being posted on chain; WindowPoSt guarantees that every staked sector is audited at least once within a 24-hour window (48 half-hour deadlines, with the challenge randomness published 20 epochs in advance).
- **Randomness**: the drand beacon supplies unbiased randomness (seal seeds, PoSt challenges, elections); each block carries a VRF ticket to break ties in fork choice; each epoch expects 5 winners (Poisson) extending the heaviest chain.
- **Slashing as a system**: PreCommit expiry fines, declared/undeclared fault fees, continued fault fees, termination fees, consensus fault penalties — unpaid fines turn into Fee Debt that blocks new sealing.
- **Execution environment**: the FVM is a WASM multi-language execution environment, and a separate EVM-compatible FEVM runtime is also provided.
