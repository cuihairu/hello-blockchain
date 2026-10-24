# ABFT

Asynchronous Byzantine Fault Tolerance (ABFT) refers to Byzantine fault tolerant protocols that still guarantee safety and liveness under an **asynchronous network model** (message delays are unbounded and there is no global clock). Its theoretical significance lies in the fact that the real internet is closest to the asynchronous model, whereas classical PBFT depends on a partial synchrony assumption (timeout-driven).

## The Four Essentials

- **Which layer**: [Settlement](/layers/Settlement) — voting consensus under an asynchronous network model; neither safety nor liveness depends on any timeout assumption
- **What it solves**: classical PBFT relies on partial synchrony (timeout-driven), while the real internet is closest to the asynchronous model; FLP further proves that purely asynchronous plus deterministic consensus is unsolvable — ABFT sidesteps this impossibility boundary using randomization
- **How well it solves it**: the network assumption is the closest to the real internet, and the protocol can still stay alive after a full partition as long as the network eventually reconnects; the cost is that cryptographic building blocks such as threshold signatures and shared randomness carry heavy computational overhead, and production deployments remain few
- **Source**: Fischer, Lynch, Paterson, "The FLP Impossibility Theorem," 1985; Dwork, Lynch, Stockmeyer, "The Partial Synchrony Model," 1988; Miller et al., "The Honey Badger of BFT Protocols," CCS 2016

## Theoretical Background

- **FLP Impossibility** (1985): in a system that is purely asynchronous, deterministic, and tolerates a single crashed node, no consensus protocol is guaranteed to terminate.
- The breakthrough is **randomization**: once a source of randomness is introduced, the protocol terminates with probability 1. ABFT protocols are the engineering realization of this line.

## Representative Protocols

1. **HoneyBadgerBFT** (2016): the first practical asynchronous atomic broadcast protocol; it uses threshold encryption to hide transaction content and randomization to decouple "packaging order," so throughput is not dragged down by the slowest node (see [HoneyBadgerBFT](/consensus/HoneyBadgerBFT)).
2. **The Dumbo family** (2019-2021): optimizes the expected message complexity of asynchronous consensus and became the performance benchmark for asynchronous BFT.
3. **The Avalanche consensus family**: avalanche-style subsampled voting that can converge without a leader; it is often grouped into the "leaderless probabilistic safety" line and discussed alongside classical ABFT (see [Avalanche](/consensus/Avalanche)).

## Technical Components

- **Threshold signatures**: $t+1$ signatures are aggregated into a single verifiable signature, decoupling message volume from node count.
- **Reliable broadcast (RBC)**: reliably broadcasts a single value to the entire network in an asynchronous environment, paired with erasure coding to reduce bandwidth.
- **Common Subset**: when nodes propose different sets, asynchronous binary agreement (ABA) is used to agree on one common subset.

## Strengths and Costs

**Strengths**: no synchrony assumption, resilient to network partitions and slow-node attacks (an "adaptive adversary" operating under time pressure has difficulty manufacturing timeout misjudgments); latency is determined by the fastest node rather than the slowest.

**Costs**: cryptographic building blocks (threshold signatures, secret sharing) are computationally expensive; protocol complexity is high, and engineering implementations are far fewer than for partially synchronous BFT.

## Applications

HoneyBadgerBFT is used in several experimental chains and private transaction systems from POA Network; the Dumbo family has been studied and adopted by multiple domestic consortium-chain projects; the Avalanche platform has developed its ideas into the Snowman/Avalanche consensus.
