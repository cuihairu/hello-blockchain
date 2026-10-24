# Snowman

Snowman is the **linear chain consensus** of the Avalanche platform: on top of Snowball's probabilistic voting it gives transactions a total order (who comes first), and it is used on the C-Chain (EVM) and the P-Chain (validator management). Its relation to [Snowball](/consensus/Snowball): Snowball is the voting engine, and Snowman is the way of stringing it into a chain.

## Four Key Points

- **Which layer**: [Settlement layer](/layers/Settlement) — Avalanche's linear chain consensus, with Snowball probabilistic consensus as the voting engine
- **What it solves**: Probabilistic consensus only answers "does everyone agree with this transaction", not "where does it rank" — Snowman adds a total order on top of probabilistic voting so that execution environments needing strict ordering, such as an EVM, can run on it
- **How well it works**: Combined with sub-sampled voting, blocks are fast and confirmations fast, supporting the smart contract load of the C-Chain; the cost is that finality remains probabilistic, linear chain throughput is bounded by EVM execution capacity, and the architecture coexisting with the X/P/C three chains needs cross-chain bridging
- **Sources**: Team Rocket "Scalable and Probabilistic Leaderless BFT Consensus through Metastability" 2018 (Snowman chapter); Ava Labs platform whitepaper 2020

## Core Mechanisms

- **Linearization**: Snowball's sub-sampled voting decides "agree/disagree", and Snowman serializes transactions — each transaction is placed at a definite block position, with the same order network-wide.
- **Parent-child inheritance**: once a block wins a majority of votes, all of its ancestors are confirmed as well — one vote covers an entire prefix, no per-block voting needed.
- **Coexistence with three chains**: the X-Chain (asset exchange, DAG shape), the P-Chain (validator / subnet management), and the C-Chain (EVM, linear chain) run together, and Snowman serves the latter two which need a total order.

## Differences from Related Protocols

| Protocol | Relation | Key difference |
| --- | --- | --- |
| [Snowball](/consensus/Snowball) | Voting engine | Snowball only does "agree or not", while Snowman imposes a total order on top of it |
| [Avalanche](/consensus/Avalanche) | Platform | Avalanche is a three-chain platform, and Snowman is the consensus of its linear chain part |
| [Gasper](/consensus/Gasper) | Same class (PoS + finality) | Gasper uses BFT voting for deterministic finality, while Snowman's finality is probabilistic |
| [Lachesis](/consensus/Lachesis) | Same class (DAG → linearization) | Lachesis uses DAG topology to reach finality, while Snowman strings a chain with probabilistic voting |

## Failure Modes

- **Probabilistic finality**: like every probabilistic consensus, "confirmed" only means the probability of rollback is very low, not zero.
- **EVM execution is the bottleneck**: no matter how fast Snowman orders, C-Chain throughput is still constrained by single-threaded EVM execution — speeding up the consensus layer does not speed up the application layer.
- **Complexity of three coexisting chains**: moving assets between the X-Chain (DAG) and the C-Chain (linear chain) requires cross-chain calls (ExportTx/ImportTx), which is a real mental burden for users and developers.
- **Parameter sensitivity**: the k, α, β parameters of sub-sampled voting decide convergence speed and the safety boundary, and tuning is the hard part of actual deployment.

The significance of Snowman is that it **demonstrates how probabilistic consensus can serve applications "that need a total order"** — the voting engine can be probabilistic, but the chain given to an EVM must be linear, and the two layers each take what they need.
