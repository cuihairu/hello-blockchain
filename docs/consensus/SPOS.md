# SPoS

SPoS (Secure Proof of Stake) is the consensus algorithm of Elrond (renamed MultiversX in 2022): **random sampling + randomly rotated consensus groups + BFT voting inside the group**. The problem it targets is concrete: in a sharded architecture every shard also needs its own small voting group — random sampling keeps that group both small (a few dozen nodes) and unpredictable (re-drawn every round).

## Four Key Points

- **Which layer**: [Settlement layer](/layers/Settlement) — intra-shard consensus: a randomly sampled consensus group + BFT inside the group
- **What it solves**: The paradox of sharded chains — shards must be small to be fast, but small groups are easy to take over; SPoS makes group membership unpredictable with "a randomly sampled consensus group per round + random rotation", so an attacker cannot lie in wait in advance
- **How well it works**: Throughput scales nearly linearly with the number of shards, and blocks arrive in seconds; the cost is that cross-shard transactions need asynchronous handling (high complexity), verifiability of the random beacon is the foundation of security, and the validator ecosystem is rather concentrated
- **Sources**: Elrond whitepaper 2019 (Adrien Dubois et al.); MultiversX documentation

## Core Mechanisms

- **Consensus group sampling**: each shard draws a few dozen nodes at random from the validator pool each round to form a consensus group, which then does BFT voting (2/3 threshold).
- **Randomness beacon**: the randomness for sampling and rotation comes from the aggregate signature of the previous round of consensus (a BLS threshold signature), which is unpredictable and unmanipulable.
- **Intra-shard + cross-shard**: each shard produces blocks and votes independently; cross-shard transactions go through asynchronous relays and are finally coordinated by the metachain.
- **Staking and slashing**: validators stake EGLD and can be slashed for misbehavior; staking can be delegated.

## Differences from Related Protocols

| Protocol | Relation | Key difference |
| --- | --- | --- |
| [Tendermint](/consensus/Tendermint) | Same class (BFT voting) | Tendermint has all validators vote network-wide, SPoS votes in a small group inside a shard |
| [Ouroboros](/consensus/Ouroboros) | Same class (random leader election) | Ouroboros draws a slot leader, SPoS samples an entire consensus group |
| [Algorand](/consensus/Algorand) | Same class (random sampling) | Algorand samples against the whole network, SPoS samples per shard |
| [Gasper](/consensus/Gasper) | Contrast | Gasper is a single-chain finality gadget, while SPoS reaches finality independently inside each shard |

## Failure Modes

- **The randomness beacon is a single-point assumption**: if the randomness of the BLS aggregate signature can be predicted or manipulated, the sampled group can be ambushed in advance — and the whole chain of security collapses.
- **Cross-shard asynchronous complexity**: cross-shard transactions go through asynchronous relays, and consistency semantics (atomicity) must be taken on by the application layer, so the development burden is higher than on a single chain.
- **Small consensus group = concentrated attack surface**: if a group of a few dozen nodes is taken over (key leakage, collusion) that is enough to make one shard misbehave, and slashing is the only deterrent.
- **Ecosystem concentration**: validators and stake pools are fairly concentrated, and decentralization comes more from the distribution of stakes than from the admission protocol.

SPoS is the most complete engineering example of the "sharding + BFT" route: **it solves the "small groups are not trustworthy" paradox with random sampling**. Its success also marks the difficulty of sharded consensus — the technical problems are all solved, and the ecosystem barrier of cross-shard development is the real moat.
