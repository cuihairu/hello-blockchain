# Sybil Attack

The Sybil Attack takes its name from the multiple-personality protagonist of the novel *Sybil*: **one attacker forges a large number of identities / nodes, attempting to swing voting, routing, and consensus in a peer-to-peer network by sheer "numbers game"**. In a permissionless network, identity is nearly free, and "one vote per identity" can be diluted indefinitely — so Sybil resistance is the first threshold for any open network protocol. Sybil nodes are also often used as a precursor to further launch eclipse attacks or to create network partitions.

## Attack Principles

1. **Identity forgery**:
   - The attacker bulk-generates node public keys or accounts, impersonating a large number of "independent participants."
   - Amplifying their voice in voting-based protocols (on-chain governance, quadratic funding); occupying the routing tables of target nodes in P2P networks.
2. **Targeted encirclement**:
   - Carefully constructing Peer IDs close to the target node (in Kademlia-style DHTs, buckets are selected by XOR distance), filling the target node's routing table / candidate block witness slots with their own nodes, forming an eclipse attack (Eclipse Attack).
3. **Dilution of consensus weight**:
   - In systems that weight by "number of nodes" (unstaked PoA networks outside the validator list, GossipSub scoring, anonymous communication layers), Sybil nodes can collude to censor, delay, or tamper with messages.
4. **Amplifying other attacks**:
   - Large numbers of Sybil nodes simultaneously filing accusations / reports (flooding rating systems with bad reviews), monopolizing relaying (manipulating Lightning Network routing fees), and increasing the penetration surface of cross-chain bridge validator sets (see [Cross-chain Bridge Attack](/hacking/CrossChainBridgeAttack)).

## Defense Ideas: Putting a Price on Identity

| Mechanism | Idea | Representative |
| --- | --- | --- |
| Proof of Work | Identity = electricity-burning hash power | Bitcoin (see [PoW](/consensus/POW)) |
| Stake Locking | Identity = locked collateral, slashed for misbehavior | Ethereum, Avalanche |
| Identity Authentication | Permissioned sets, PKI certificates | Consortium chains, FISCO BCOS |
| Resource Validation | Real resource thresholds such as storage / bandwidth | IPFS DHT, Filecoin |
| Graph / Reputation Analysis | Social trust graphs to resist bulk fake accounts | PageRank-style P2P scoring |
| Structural Isolation | Limiting the blast radius of a single downstream node | Bitcoin's "8 outbound connections," GossipSub topic scoring |

## Relationship with Network Partition Attacks

Sybil attacks and Network Partition Attacks are frequently confused, but their goals differ: a Sybil attack manufactures a **false majority**, whereas a network partition attack severs **communication among real nodes**, causing the ledger to produce mutually independent partitions. The two are often chained together: first encircle the target with Sybil nodes (eclipse), then let the encircled node's view of the "whole network" be only the attacker's illusion — at the consensus layer this manifests as forks, double spends, and data inconsistency. For defense, the former relies on identity costs, the latter on diverse peer connections, checkpoints, and cross-region redundancy (see also [Consensus Fork Attack](/hacking/ConsensusForkAttack)).
