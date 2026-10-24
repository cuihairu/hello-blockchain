# Hyperledger Besu / Quorum

Besu is an Ethereum execution client written in Java (Apache 2.0) with a dual form — "mainnet-compatible + private network": on the public side it runs the [Ethereum](/chains/Ethereum) mainnet (paired with a consensus client); on the private side it is a consortium-chain engine, using [QBFT](/consensus/QBFT)-class BFT consensus, PoA permissioning and private transactions. It inherited the consortium-chain mantle of J.P. Morgan's Quorum (GoQuorum): after Quorum stopped evolving as a standalone project, its privacy and permissioning capabilities live on in Besu's private-network stack. For institutions that want to reuse the Ethereum toolchain (EVM, Solidity, the [DApp development stack](/dapp/Dapp)) without permissionless openness, Besu is one of the default choices.

## The Four Essentials

- **Which layer**: [Settlement](/layers/Settlement) — block production and finality inside a private network (QBFT voting)
- **What it solves**: institutions want an EVM-compatible consortium chain — a contract ecosystem from the same root as Ethereum, but with node admission, transaction privacy and governance under their control
- **How well it solves it**: EVM equivalence (Solidity contracts and mainstream tooling work as-is), QBFT deterministic finality, private transactions (transaction content is visible only to participants and the privacy manager), account-level permissioning (on-chain permissioning); the price is a dependency on the Tessera privacy manager component, BFT node count constrained by O(n²) communication just as with [PBFT](/consensus/PBFT), and the dual form on one stack enlarging the operational configuration surface
- **Source**: [besu-eth/besu repository](https://github.com/besu-eth/besu) (official README: Mainnet compatible, Ethereum client written in Java), [Besu private-network docs · PoA](https://docs.besu-eth.org/private-networks/concepts/poa/), [· privacy](https://docs.besu-eth.org/private-networks/concepts/privacy/), [· permissioning](https://docs.besu-eth.org/private-networks/concepts/permissioning/), [· QBFT configuration](https://docs.besu-eth.org/private-networks/how-to/configure/consensus/qbft/)

## Core Mechanisms

- **EVM equivalence**: contracts on the private network use the same Solidity and EVM bytecode as those on the public network — developer skills, contract auditing tools and the [DApp frontend stack](/dapp/Dapp) are all reused. This is Besu's biggest difference from the chaincode model of [Fabric](/consortium/Fabric): the ledger model is Ethereum's [account model](/model/Account), not a KVDB world state.
- **QBFT consensus**: the default BFT consensus for private networks (the evolution of IBFT 2.0) — a fixed validator set (permissioned), with block production and voting reaching agreement in three phases, and deterministic finality once a 2/3 majority has signed. For consensus details, see the [QBFT deep dive](/consensus/QBFT).
- **PoA permissioning**: validators are managed by a governance account/vote (the validator-contract pattern), so validators can be added or removed and consensus parameters switched — "the chain governs itself on-chain."
- **Private transactions**: private-for transactions encrypt the payload and hand it to a separate privacy manager (Tessera); only the hash and privacy-group information remain on-chain. Participants retrieve the plaintext from the privacy manager with their keys. All the chain reveals globally is "a private transaction took place."
- **Account permissioning**: on-chain permissioning uses smart contracts to maintain two lists — a node-admission list and an account-permission list — with a local DNS allowlist layered on top. Permission rules are enforced at both the connection layer and the transaction layer.
- **Dual form, one stack**: the same binary can join the mainnet (as an execution client, paired with a consensus client such as Teku) or form a private network; the difference is configuration and the choice of consensus.

## How It Differs from Other Consortium Chains

| Dimension | Besu | [Fabric](/consortium/Fabric) | [FISCO BCOS](/consortium/FiscoBcos) | [Corda](/consortium/Corda) |
| --- | --- | --- | --- | --- |
| Contract ecosystem | EVM / Solidity (same root as Ethereum) | Go / Java chaincode | Solidity / Go / Java | Java / JVM contracts |
| Ledger model | Account model | KVDB world state | Shared ledger within a group | UTXO (state + contract) |
| Consensus | QBFT (BFT) | Raft (not BFT) | PBFT (BFT) | Notary |
| Privacy | Privacy manager (Tessera) + privacy groups | Channels + private data collections | Group isolation + SM national cryptography | Peer-to-peer sharing, no global ledger |
| Admission | On-chain permissioning lists | MSP + CA | Membership certificates | Network map + membership policy |

## Failure Modes

- **Privacy-manager dependency**: the plaintext of private transactions lives on the Tessera side — if the Tessera cluster fails, private transactions become unavailable, and its key management becomes a new single point of security failure; "the chain is up but the privacy layer is down" is a common incident shape in consortium operations.
- **Validator concentration**: the QBFT validator set is small and under governance control — if the governance account (multisig) is compromised, consensus is taken over, and the strength of governance-key management determines the chain's security ceiling.
- **BFT communication overhead**: node count is constrained by O(n²) voting communication, with a few dozen nodes a typical ceiling — compared with the group-sharding route of [FISCO BCOS](/consortium/FiscoBcos) there is no answer for parallel scale-out.
- **Privacy versus observability**: audit nodes cannot see the content of private transactions, so regulatory audit either joins the privacy group or relies on participants exporting data — the same "structural privacy versus global observability" trade-off as [Corda](/consortium/Corda).
- **Major mainnet-level incidents**: no public record found.
