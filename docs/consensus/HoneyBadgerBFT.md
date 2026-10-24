# HoneyBadgerBFT

HoneyBadgerBFT (HBBFT) is the **first practical asynchronous atomic broadcast protocol**, proposed by Miller and others in 2016. The name pays tribute to the honey badger's fearlessness: it relies on no network timing assumptions, and safety and liveness hold no matter how slow messages are or whether a partition occurs.

## The Four Essentials

- **Which layer**: [Settlement](/layers/Settlement) — the representative implementation of asynchronous BFT, where safety and liveness depend on no network timing assumption
- **What it solves**: atomic broadcast under an asynchronous network — even if messages are completely unordered, delays are unbounded, or a partition appears (as long as it eventually recovers), consensus stays safe and does not stall
- **How well it solves it**: the weakest network assumption and the most elegant theory (the honey badger fears nothing); the costs are heavy computation from threshold encryption and secret sharing, throughput bounded by cryptographic primitives, and production deployment limited mainly to experimental chains
- **Source**: Andrew Miller et al., "The Honey Badger of BFT Protocols," CCS 2016

## Key Ideas

1. **Decentralized transaction ordering**: no node is assigned the packaging order. Instead every node proposes transactions, and an **asynchronous Common Subset (ACS)** protocol agrees on "a set of transactions" — the packaging order is determined endogenously by consensus.
2. **Threshold encryption hides content**: transactions are submitted under threshold encryption first and jointly decrypted only after the set is confirmed. This brings two benefits: a censor cannot see the content and therefore cannot intervene in a targeted way (censorship resistance), and it avoids "peeking at others' transactions and free-riding on them."
3. **Randomized ABA**: asynchronous Binary Agreement (ABA) uses a common random coin (co-flipped via threshold signatures / shared randomness) to break the FLP deadlock, guaranteeing termination with probability 1.

## Technical Components

- **RBC (reliable broadcast)**: asynchronous reliable broadcast based on erasure coding, with node bandwidth shared evenly.
- **ABA (asynchronous Binary Agreement)**: Mostefaoui-style multi-round voting + a shared coin.
- **ACS**: N instances of RBC + ABA combined, taking the intersection of all proposals.
- **Threshold signatures / encryption**: $f+1$ or $t$ shares are aggregated, controlling message volume and privacy.

## Performance and Traits

- **Throughput decoupled from the slowest node**: in classical BFT the leader waits on the slowest replica, whereas in HBBFT any transaction that arrives first enters the set first — throughput is determined by total network bandwidth.
- Message complexity $O(N^2)$; node scale is still limited (hundreds), which suits consortium chains.
- Implementation references: poanetwork/hbbft (Rust), afleck/hbbft and other experimental implementations; POA Network used it on research chains related to xDai.

## Suitable Scenarios

Network environments that are harsh, where nodes do not fully trust one another, and where economic games of PoW/PoS are unwanted: consortium chains, private transaction pools, and decentralized randomness generation (combined with threshold BLS).
