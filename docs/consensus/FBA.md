# FBA

Federated Byzantine Agreement (FBA) was proposed by Stellar's chief scientist David Mazières in the 2015 SCP whitepaper. Unlike PBFT-class protocols that "fix the membership list in advance," FBA lets **each node choose for itself whom to trust**, and a global trust-relationship network spontaneously produces consensus arbitration.

## The Four Essentials

- **Which layer**: [Settlement](/layers/Settlement) — no fixed membership list; consensus emerges from a trust network composed of arbitration slices that each node selects itself
- **What it solves**: PBFT-class protocols need a validator list fixed in advance — how do you define admission to an open network? FBA lets each node choose for itself whom to trust, with no global registry needed
- **How well it solves it**: admission is decentralized, and network-wide agreement can be reached without a fixed list; the cost is that the safety boundary depends on every node's slice configuration, and poor configuration can cause partitioning or stalls (Stellar has stopped due to poor slice configuration)
- **Source**: David Mazières, "The Stellar Consensus Protocol," 2015

## Core Concepts

1. **Quorum slice**: the set of nodes that a given node trusts. A node regards a statement as true if and only if enough members of each of its quorum slices endorse that statement.
2. **Quorum**: the set of nodes that satisfies every member's slice requirement — a slice is "individual trust," a quorum is the "global consensus group."
3. **Federated admission**: there is no global membership table; a new node joins simply by declaring its own slices, and the decentralization lies in "slice selection."

## The Key to Safety: Intertwining of Slices

- If the slices of the various nodes overlap and intertwine well, no small malicious group can satisfy enough slices on its own, and consensus remains safe.
- If slice selection is poor (for example everyone trusts only the nodes of a single exchange), the system degenerates into de facto centralization — **FBA's safety is decided by users' trust choices**, which is both its greatest strength and its hardest engineering problem.

## Comparison with PBFT

| Dimension | PBFT | FBA (SCP) |
| --- | --- | --- |
| Membership | Fixed, known in advance | Open, federated self-selection |
| Communication | Network-wide broadcast $O(n^2)$ | Propagated within slices, lower cost |
| Safety premise | Less than 1/3 Byzantine | Intertwining slices + non-degraded nodes below the threshold |
| Liveness | Guaranteed by partial synchrony | Driven by blocking events |

## Applications

The **Stellar Consensus Protocol (SCP)** is the only large-scale production implementation of FBA (see [Stellar](/chains/Stellar)); Ripple's Ripple Protocol Consensus Algorithm (RPCA) is an earlier "Unique Node List (UNL)"-style relative, but the UNL is specified centrally at the network level, and its degree of decentralization is often questioned.
