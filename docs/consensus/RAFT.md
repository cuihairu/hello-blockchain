# RAFT

RAFT is the **crash fault tolerant (CFT) consensus** proposed by Ongaro and Ousterhout in 2014, positioned as an understandable replacement for Paxos: it explains replicated state machines with just three things — "leader election + log replication + safety constraints". It tolerates node crashes but not Byzantine misbehavior — which is why it appears in consortium chains and distributed storage (etcd, TiKV, Consul) rather than public chains.

## Four Key Points

- **Which layer**: [Settlement layer](/layers/Settlement) — crash fault tolerant (CFT) consensus; tolerates crashes but not Byzantine malice
- **What it solves**: Replicated state machines — take the effect of Paxos and make it understandable, teachable, and engineerable as "leader election + log replication + safety constraints"
- **How well it works**: Understandability is the hard metric, and it is the de facto standard in industry (etcd, TiKV, Consul); the cost is that it does not resist malice and can only be used in environments where identities are known and accountable; on-chain it mainly appears as the ordering layer of Hyperledger Fabric
- **Sources**: Diego Ongaro, John Ousterhout "In Search of an Understandable Consensus Algorithm" USENIX ATC 2014

## Three Sub-Problems

1. **Leader Election**
   - Nodes have three identities: Leader, Follower, Candidate.
   - After a randomized timeout (150~300 ms jitter prevents livelock) a Follower increments its term and starts an election; with a majority of votes it becomes Leader.
   - Randomized timeouts guarantee that, in the majority of cases, a single election yields a unique Leader.

2. **Log Replication**
   - All write requests are handled by the Leader: append to the local log, then send to Followers in parallel.
   - Once a **majority** of confirmations is collected, the entry commits, is applied to the state machine, and Followers are told to commit.
   - At any moment the committed log must be held by the current Leader (Leader Completeness).

3. **Safety**
   - Election constraint: a voter only votes for a candidate whose log is not behind its own, guaranteeing that the new Leader holds all committed entries.
   - The term number acts as a global logical clock, and messages from an expired Leader are ignored.

## Role in Blockchain

- **Consensus module for consortium chains**: Chang'an Chain and Hyperledger Fabric (the etcd-RAFT ordering service) use RAFT at the transaction ordering layer — after ordering, work is handed to the execution / validation layer, and Followers only need to trust that their peers do not crash.
- **Sidechain and L2 components**: sequencers often use RAFT or hot standby for high availability.
- **Trade-off with BFT**: RAFT tolerates $f$ crashes with $2f+1$ nodes (a majority) and $O(n)$ messages at very low latency; PBFT tolerates $f$ malicious nodes with $3f+1$ and more messages. The trust model decides the choice (see [BFT](/consensus/BFT), [SOLO](/consensus/SOLO)).
