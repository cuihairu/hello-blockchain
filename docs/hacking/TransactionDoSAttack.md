# Transaction DoS Attack

A Transaction DoS Attack is an attack in which the attacker injects a large number of invalid, low-value, or maliciously constructed transactions into a blockchain network, consuming the nodes' computation, memory, and bandwidth resources, squeezing out the packing space for normal transactions, and thereby slowing down or even paralysing the network's ability to confirm transactions.

## Attack Principles and Methods

1. **Junk transaction flooding**:
   - The attacker sends in bulk a large number of validly signed but meaningless transactions, each with an extremely low fee.
   - Block capacity (roughly a 1 MB block plus witness data in Bitcoin, a Gas limit in Ethereum) is a scarce resource; junk transactions compete with normal transactions for packing slots, driving up network-wide fees.

2. **Invalid transactions consuming verification resources**:
   - Constructing transactions with expensive signature verification or complex scripts: the verification cost is borne by all nodes in the network, while transactions that fail to pack still occupy mempool verification time.
   - For example, early on the Bitcoin network suffered pressure on nodes from low-fee transactions constructed using expensive scripts such as `OP_CHECKMULTISIG`.

3. **Mempool bloat**:
   - A large number of low-fee transactions that are never packed occupy a node's mempool for a long time, exhausting node memory and slowing down synchronisation.
   - Mempool desynchronisation also amplifies the risk of network partitioning: different nodes see different sets of "pending transactions."

4. **Replay and duplicate broadcasting**:
   - The same transaction is broadcast repeatedly, or replayed on different chains (forked chains), wasting node processing and forwarding bandwidth.

## Typical Impact

- **Confirmation delays**: Normal transactions are forced to raise fees in order to be packed within a reasonable time.
- **Network-wide fee increases**: The Bitcoin network congestion at the end of 2017 and the surge in Ethereum Gas caused by an NFT minting frenzy in 2021 are both real-world manifestations of "transaction flooding squeezing capacity."
- **Nodes dropping offline**: Resource-constrained home nodes may crash or be ejected from the network due to mempool bloat, reducing the degree of decentralisation.
- **Secondary attacks**: Congestion windows are often used to amplify the success rate of double spend, front-running, and other attacks.

## Defensive Measures

1. **Fee markets and minimum relay fees**: Nodes only relay transactions whose fee exceeds a threshold (such as Bitcoin's `minrelaytxfee`), making junk transactions "too expensive to be worthwhile."
2. **Mempool and rate limiting**: Limit the mempool size per node, rate-limit transaction broadcasts from a single peer, and promptly evict old low-fee transactions.
3. **Pricing verification cost**: The consensus layer charges by resource consumption (Ethereum Gas is priced across multiple dimensions — computation, storage, memory), shifting verification cost onto the transaction initiator.
4. **Transaction pool policies and pruning**: Nodes can configure stricter transaction acceptance policies (rejecting non-standard scripts) and clean up long-unconfirmed transactions.
5. **Monitoring and alerting**: Establish monitoring of mempool water level, transaction fee rates, and node latency, and adjust relay strategies during abnormal flooding.
