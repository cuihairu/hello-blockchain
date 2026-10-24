# Avalanche

## Whitepaper and Specifications

"Scalable and Probabilistic Leaderless BFT Consensus through Metastability"— published on IPFS by "Team Rocket" (anonymous) in 2018-05; Ava Labs subsequently maintains the AVA documentation and specifications ([docs.avax.network](https://docs.avax.network)). Mainnet launched in 2020-09.

## What Problem It Solves

Classic BFT's O(n²) communication complexity cannot support thousands of nodes, while a longest-chain rule makes you wait for confirmations — Avalanche turns "reaching agreement" into probabilistic convergence with subsampled voting: each round asks only a small handful of nodes, and after repeating, the whole network's preference quickly collapses onto the same value (a metastable state).

## Technical Contributions

- **Snowman consensus chain**: a linearized instance of the Avalanche consensus family used for block production; see [Snowball](/consensus/Snowball) and [Snowman](/consensus/Snowman) — leaderless, sub-second confirmation, probabilistic finality (a safety threshold of 1/2, the BFT exception).
- **Subnet architecture**: validators can subscribe to only some subnets, with custom VMs and compliance boundaries — an heterogeneous multi-chain route (contrasted with Polkadot's shared security, see [Polkadot](/chains/Polkadot)).
- **Three-chain division of labor**: X-Chain (assets), P-Chain (staking and subnet metadata), C-Chain (EVM compatible).
- **Subnet-Only Validation (2024-25)**: after the Etna upgrade, subnets need not depend on the mainnet's validator set, moving toward further autonomy.

## Limitations and Public Incidents

- Probabilistic finality carries no hard guarantee; the parameters (k, α) are sensitive to the safety boundary.
- Subnet fragmentation dilutes mainnet liquidity and the security budget; the number of validators has long remained below Ethereum's order of magnitude.
- Public incidents: from 2023-02-21 to 26, inscription traffic caused mainnet block production to stall for a matter of days (recovered by coordinated node restarts) — an empirical stress test of liveness under heavy load.
