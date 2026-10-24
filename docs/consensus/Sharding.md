# Sharding

Sharding is the scaling route that slices validation and state across several parallel subnetworks, each processing transactions independently. Zilliqa was the **first public chain to make sharding the skeleton of its mainnet consensus** (mainnet 2019): PoW is used only for sybil resistance and generating node identities, real block production and finalization run a [PBFT](/consensus/PBFT)-family consensus inside each shard, and a directory service committee (the DS committee) then aggregates the shard results into a global ledger.

## Four Key Points

- **Which layer**: [Settlement layer](/layers/Settlement) — sharding is the parallelization of the settlement layer: each shard reaches local agreement on its own, and the DS committee handles cross-shard aggregation
- **What it solves**: On a single chain every node in the network processes all transactions, so throughput is locked by "whole-network serial". Sharding cuts the network into several small groups that process in parallel, and throughput grows approximately linearly with the number of shards
- **How well it works**: the Zilliqa whitepaper gives a capacity model of "8000 miners → 10 shards of 800 miners → 100 transactions per shard per epoch → 1000 aggregated"; the cost is that cross-shard transactions need an extra round of coordination, the DS committee is the trust anchor at startup, and a small node count inside a shard raises the probability of a single shard being compromised
- **Sources**: Zilliqa technical whitepaper v0.1 (2017-08-10, [docs.zilliqa.com/whitepaper.pdf](https://docs.zilliqa.com/whitepaper.pdf)); [docs.zilliqa.com](https://docs.zilliqa.com/)

## Core Mechanisms (Zilliqa Whitepaper Design)

- **Network sharding**: the miner network is cut into several shards, each shard being a consensus group that independently processes the transactions assigned to it. Shards are re-formed at the start of each DS-epoch.
- **DS committee**: made up of directory service nodes selected by PoW1, responsible for shard assignment and producing DS-Blocks (directory service blocks) that aggregate the shard results. The DS committee still runs with 1/4 of its nodes Byzantine.
- **PoW issues identities only**: unlike Bitcoin/Ethereum using PoW to reach consensus, Zilliqa's PoW (Ethash) is used only for sybil resistance and generating node identities — production and finalization do not rely on hash power.
- **Transaction sharding**: transactions are assigned to a fixed shard by bits of the sender address, so transactions from the same sender always land in the same shard, and double-spending can be detected inside a shard by account nonce.
- **Two kinds of blocks**: TX-Blocks (transaction blocks, containing micro blocks and final blocks) and DS-Blocks (directory blocks, containing the DS committee's aggregate signature over shard results).
- **Intra-shard consensus**: PBFT family (pBFT), using EC-Schnorr multi-signatures to aggregate the signatures of the prepare/commit rounds into O(1) size, cutting communication from O(n²) to O(n); agreement from more than 2/3 of nodes finalizes.
- **View change**: the shard leader rotates after every micro block, and the DS leader rotates after every final block; a leader is switched when more than 2/3 of nodes deem it faulty.

## Differences from Related Approaches

| Route | Sharding unit | Cross-shard coordination | Representative |
| --- | --- | --- | --- |
| Network sharding (Zilliqa) | Miner shards, PoW issues identities | Aggregation by the DS committee | Zilliqa |
| State sharding | State is sliced per shard, nodes store only their shard's state | Cross-shard messages | Ethereum roadmap (see [storage layer](/layers/Storage)) |
| On-chain sharding (Near) | Shards are first-class citizens of the chain, blocks are sliced per shard | Cross-shard receipts | [Near](/chains/Near) |
| Parallel chains (Polkadot) | Parachains run their own consensus, the relay chain finalizes | Relay chain + GRANDPA | [Polkadot](/chains/Polkadot) |
| Workchains (TON) | The masterchain manages configuration, workchains manage transactions | The masterchain as a finality anchor | [TON](/chains/TON) |

## Failure Modes

- **A single shard is compromised**: a small node count inside a shard (800 in the whitepaper model) means the threshold for an attacker concentrating power to take over one shard is lower than for the whole network; periodic DS committee reshuffling is the main line of defense.
- **Cross-shard transaction latency**: a cross-shard transaction must wait for two shards to finalize separately before aggregation, so latency is higher than for intra-shard transactions.
- **The DS committee as a trust anchor**: shard assignment and aggregation both pass through the DS committee, so if the committee itself is corrupted global consistency suffers — this is the trust price paid for "sharding in exchange for throughput".
- **Major mainnet incidents**: no public record found.

What sharding contributes is **turning "whole-network serial" into "group parallel"**: after Zilliqa, Near's Nightshade, Polkadot's parallel chains, TON's workchains, and Ethereum's Danksharding each gave a different answer to cross-shard coordination — sharding is the means, and cross-shard consistency is what the parties really disagree on.
