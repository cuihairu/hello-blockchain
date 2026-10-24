# QBFT

QBFT (Quorum Byzantine Fault Tolerant, also known as Istanbul BFT) is the permissioned-chain BFT consensus of the Ethereum client ecosystem: the default consensus of Quorum and the BFT mode of the Clique engine in Hyperledger Besu. It trims [PBFT](/consensus/PBFT)-style three-phase voting down to a permissioned network of "known identities, few nodes", with one goal: low latency.

## Four Key Points

- **Which layer**: [Settlement layer](/layers/Settlement) — a BFT variant for permissioned chains, with node identities pre-authorized
- **What it solves**: Trim BFT down to a permissioned network — few nodes, known identities, accountable, so the sybil-resistance cost of an open network can be dropped and communication and voting pushed straight to minimum latency
- **How well it works**: Stable latency at the scale of dozens of nodes, a mature ecosystem (Quorum, Besu Clique BFT mode, Geth's QBFT engine); the cost is heavy reliance on permissioned identity, a node count ceiling set by BFT communication complexity, and divergent parameters and implementations across clients
- **Sources**: Consensys "Istanbul BFT Consensus Algorithm" specification 2019; Hyperledger Besu Clique documentation

## Core Mechanisms

- **Pre-authorized validators**: the right to produce blocks is decided by a validator list in a contract or configuration; there is no contest over "who is eligible".
- **Three-phase voting**: votes are cast in the commit phase; the 1/3 threshold must be reached to enter the next round, and 2/3 must be reached for final confirmation.
- **Production order**: validators propose in turn, and a misbehaving or offline validator is skipped by the next one (skip block) — no dynamic reshuffling is needed.
- **No difficulty, no work**: there is no [PoW](/consensus/POW)-style hash race and no [PoS](/consensus/POS)-style economic stake — security comes from identity and legal accountability.

## Differences from Related Protocols

| Protocol | Relation | Key difference |
| --- | --- | --- |
| [PBFT](/consensus/PBFT) | Theoretical source of QBFT | PBFT is a general three-phase scheme; QBFT is a trimmed version for permissioned networks |
| [Tendermint](/consensus/Tendermint) | Same class (three-phase BFT) | Tendermint uses stake-weighted voting, QBFT uses a fixed validator list |
| [MaxBFT](/consensus/MaxBFT) | Same class (permissioned-chain BFT) | MaxBFT is HotStuff engineered, QBFT is PBFT engineered; the message patterns differ |
| [PoA](/consensus/POA) | Neighbouring | PoA produces on identity alone, while QBFT adds a voting confirmation on top of it |

## Failure Modes

- **Node count ceiling**: BFT communication complexity is still the bottleneck, and QBFT's measured throughput drops noticeably once nodes reach the hundreds.
- **Changing the validator list is a governance action**: joining and leaving validators must go through a contract or configuration process, so the list itself becomes a single point.
- **Implementation divergence**: the QBFT parameters of Besu, Geth and Quorum (timeouts, timeout multipliers, skip thresholds) are not fully consistent, so cross-client migration must be aligned case by case.
- **Identity as a security assumption**: once the permissioned network's "identity is trustworthy" assumption fails (internal malice, key leakage), QBFT offers no remedy at the economic or cryptographic level.

The value of QBFT is that it is **the BFT baseline inside a permissioned network** — when node identities are known, the node count is in the tens, and latency requirements are strict, QBFT is the choice with the least engineering cost.
