# PoA

Proof of Authority (PoA) replaces **the reputation / legal-entity identity of a node** rather than computing power or stake as the credential for producing blocks: a pre-authorized set of validators take turns signing blocks. It sacrifices decentralization in exchange for extremely high throughput and near-zero fuel-based security cost, and is widely used on consortium chains, testnets, and sidechains.

## Four Key Points

- **Which layer**: [Settlement layer](/layers/Settlement) — admission by identity reputation; pre-authorized validators take turns signing blocks
- **What it solves**: Anchor the right to produce blocks to a traceable legal-entity identity, trading for very high throughput and near-zero fuel cost; fits consortium chains, testnets, and sidechains
- **How well it works**: Fast blocks (seconds or even shorter), near-zero fuel-based security cost, and traceable identity; the price is a high degree of centralization (a few validators can collude) and it is unsuitable for permissionless public chains — the trust model is fundamentally "law and reputation" rather than cryptography
- **Sources**: Lefek "Proof of Authority" 2015 (concept); the Ethereum Clique (EIP-225) and OpenEthereum AuRa implementations; Gnosis Chain POSDAO documentation

## Basic Principles

1. **Admission authorization**: validators are designated through a governance process (on public chains and sidechains this usually requires staking plus a real identity or legal entity, i.e. the hybrid form of "Proof of Staked Authority").
2. **Rotating production**: a producer is selected by a fixed order or a random schedule (such as the AuRA algorithm); the producer signs the new block and broadcasts it.
3. **Handling misbehavior**: a validator that produces a double-spend block can be removed from the set; implementations with staking (such as BNB Chain's Parlia) also slash the stake.

## Characteristics

**Advantages**

- Fast block production (seconds or even sub-second), high throughput; validation cost is essentially zero.
- Validator identities are public and traceable, fitting compliance scenarios.
- It can run without a token (a pure consortium chain), and it also suits testnet / PoA chain faucet economics.

**Disadvantages**

- The highest level of centralization; security depends entirely on trust in the validator set and on admission governance.
- Unsuitable for permissionless public chains unless staking incentives are introduced (which degenerates into a PoSA/PoS hybrid).

## Representative Applications

- **Ethereum testnets Goerli/Sepolia, Polygon Edge chains**: AuRA/Clique-style PoA.
- **BNB Chain (formerly BSC)**: Parlia = PoA + staking (21 validators; see the BSC chapter outside [ledger models](/model/Models)).
- **Hyperledger Besu, xCube/Volta, POA Network**: enterprise-grade PoA implementations.
