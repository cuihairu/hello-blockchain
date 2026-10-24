# Paxos

Paxos is the **crash fault tolerant (CFT) consensus** proposed by Leslie Lamport: "The Part-Time Parliament" was published in 1998 and rewritten into a readable form in "Paxos Made Simple" in 2001. It is the source of "majority replication" in distributed systems — RAFT, Chubby, and Spanner all sit on it or on a variant of it. Note its fault-tolerance boundary: it tolerates crashes but not Byzantine misbehavior.

## Four Key Points

- **Which layer**: [Settlement layer](/layers/Settlement) — crash fault tolerant (CFT) consensus, with a trust model of "nodes may crash, but they do not misbehave"
- **What it solves**: Under an asynchronous network with a minority of crashed nodes, let multiple replicas agree irrevocably on a single value (and then on a log sequence) — 2f+1 replicas tolerate f crashes
- **How well it works**: The foundation of industrial distributed systems (Google Chubby, Spanner, Azure Storage; ZooKeeper's ZAB is a sibling variant); the cost is that the protocol is notoriously hard to understand and hard to implement correctly — the opening of the [RAFT](/consensus/RAFT) paper was written specifically to replace it; it is not Byzantine-resistant, and in a misbehaving environment you must switch to the [BFT](/consensus/BFT) line. Public incidents: no public record found — its difficulty lies in implementation correctness rather than protocol flaws, and engineering relies on formal verification and Jepsen-style testing as backstops
- **Sources**: Leslie Lamport "The Part-Time Parliament" 1998; "Paxos Made Simple" 2001 (<https://lamport.azurewebsites.net/pubs/paxos-simple.pdf>)

## Core Mechanisms

- **Three roles**: proposer (proposes values), acceptor (votes), learner (learns the result); in practice they are usually merged into a single process.
- **Two-phase voting**:
  1. **prepare/promise**: the proposer requests a promise with an incremented number n; acceptors promise not to accept proposals with a smaller number and return the highest-numbered proposal they have already accepted.
  2. **accept/accepted**: if there is no conflict, broadcast accept(n, v); once a majority accepts, the value is selected. If there is a conflict, keep the already accepted value.
- **Majorities intersect**: any two majorities must intersect — an already chosen value cannot be overturned by a later round, which is the entire source of safety.
- **Multi-Paxos**: once a stable leader is chosen, skip the prepare phase and extend "a single value" into replication of a log sequence — this is the real form of engineering implementations (Chubby, Spanner).

## Differences from Related Protocols

| Protocol | Relation | Key difference |
| --- | --- | --- |
| [RAFT](/consensus/RAFT) | Replacement for understandability | RAFT restates Paxos with strong leader election + log replication; its terminology and flow are teachable, while Paxos is more general but more convoluted |
| [PBFT](/consensus/PBFT) | Byzantine extension | PBFT changes the trust model to tolerate f malicious nodes (n ≥ 3f+1), with three-phase voting + view change |
| [HotStuff](/consensus/HotStuff) | Byzantine + pipelining | HotStuff pipelines BFT voting with QCs, the modern form of "Paxos structure + Byzantine assumptions" |
| [Tendermint](/consensus/Tendermint) | Byzantine + staking | Tendermint welds BFT voting to block production; Paxos only handles replication, not production |

## Failure Modes

- **Liveness competition (dueling leaders)**: several proposers increment numbers to compete for proposals, which can livelock — the engineering fix is to choose a stable leader (Multi-Paxos), which amounts to admitting that it is itself incomplete.
- **Implementation correctness**: the protocol description leaves a lot of engineering freedom (when to retry, how to assign numbers); historically mainstream implementations have all fallen into pitfalls, which is also the direct reason RAFT came into being.
- **Not resistant to misbehavior**: a single malicious acceptor can break the majority assumption — it has no place in public-chain scenarios, which is BFT territory.

The value of Paxos lies in **establishing the skeleton "majorities intersect ⇒ safety"**: every consensus protocol since then — RAFT, PBFT, HotStuff — answers a different variant of the same question: which trust assumption to use, and how to make voting faster.
