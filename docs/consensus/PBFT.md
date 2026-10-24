# PBFT

Practical Byzantine Fault Tolerance (PBFT) was proposed by Castro and Liskov in 1999 and was the first to bring Byzantine fault tolerance to "engineering-deployable" performance. It is the direct ancestor of permissioned chains and the voting layer of most BFT public chains.

## The Four Essentials

- **Which layer**: [Settlement](/layers/Settlement) — three-phase voting under a partial-synchrony assumption, reaching deterministic finality with 2f+1 votes
- **What it solves**: turning BFT from "theoretically feasible" into "engineerably runnable": three-phase message exchange across pre-prepare / prepare / commit, view change, and checkpoint garbage collection
- **How well it solves it**: the first to deliver deployable BFT performance (thousands of TPS), the direct ancestor of permissioned chains and BFT public chain voting layers; the costs are that O(n²) message complexity limits node scale and timeout parameters depend on network configuration
- **Source**: Miguel Castro, Barbara Liskov, "Practical Byzantine Fault Tolerance," OSDI 1999

## Basic Setup

- Total nodes $n \geq 3f + 1$, tolerating $f$ Byzantine nodes.
- All nodes know each other's identities (a permissioned environment); within a view there is a primary (leader) responsible for packaging proposals.
- Deterministic finality: once committed, the result is irreversible.

## The Three-Phase Protocol

For a client request $m$, the primary (view $v$, index $n$) does the following:

1. **Pre-prepare**: the primary broadcasts `<PRE-PREPARE, v, n, m>` to all replica nodes.
2. **Prepare**: after verifying, replicas broadcast `<PREPARE, v, n, m>`; a node that receives $2f$ PREPARE messages consistent with its local state enters the prepared state.
3. **Commit**: the node broadcasts `<COMMIT, v, n, m>`; after receiving $2f + 1$ COMMIT messages it executes and replies to the client.
4. A client that receives $f + 1$ identical replies confirms the final result.

## View Change

When the primary times out or is suspected of misbehaving, replicas jointly initiate a view change: each node broadcasts `<VIEW-CHANGE>`, and the new primary (usually rotating by `p = v mod n`) takes over after collecting $2f + 1$ change votes. This mechanism guarantees liveness and is the source of the "round rotation" idea in later protocols such as Tendermint.

## Checkpoints and Garbage Collection

The protocol takes a checkpoint every $k$ requests executed (usually 100): after nodes mutually confirm a stable checkpoint, they discard earlier message logs, preventing the log from growing without limit.

## Strengths and Limits

**Strengths**: deterministic finality, millisecond-to-second confirmation, no forks; throughput in the thousands of TPS at consortium-chain scale.

**Limits**:

- Communication complexity $O(n^2)$, so scaling to hundreds of nodes is already tight;
- Only suitable for a permissioned set, requiring admission management through identity or stake;
- The primary centralizes packaging, creating censorship and load hotspots.

## Derived Protocols

Tendermint Core, Hyperledger Fabric's SmartBFT, FISCO BCOS's PBFT implementation, and AntChain's and Chang'an Chain's MaxBFT/TBFT (see [MaxBFT](/consensus/MaxBFT) and [TBFT](/consensus/TBFT) in this directory) are all engineering improvements on PBFT.
