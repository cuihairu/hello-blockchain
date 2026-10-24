# Arweave

## Whitepaper and Specifications

"Arweave: A Protocol for Economically Sustainable Information Access" (the Yellow Paper, Sam Williams, first edition 2018-06, [arweave.org/whitepaper](https://www.arweave.org/whitepaper)) and the Lightpaper in 2023; mainnet launched in 2018-06 (consensus has been SPoRA since 2022-03, with continued tuning throughout 2023 in version 2.6).

## What Problem It Solves

"The internet's amnesia" — links rot, platforms shut down, and the data evaporates with them. Arweave turns "permanent storage" into an economic model through one-time prepayment plus a storage fund, with the consensus mechanism itself put in the service of that goal.

## Technical Contributions

- **blockweave + SPoRA**: producing a block requires random access to historical data (proof of access), with a VDF limiting the rate; see [SPoRA](/consensus/SPORA) for the mechanics.
- **Endowment fund**: a one-time payment prepays roughly 200 years of storage at today's prices, and the fund pays miners replication fees over time.
- **Permaweb and the gateway layer**: content-addressed permanent web pages; gateways provide indexing and querying (ArQL) — a complete worked example for the [Storage Layer](/layers/Storage) of "commit on-chain, retrieve off-chain."
- **SmartWeave's lazy evaluation**: contract execution is outsourced to users, so the consensus layer does not bear execution (in contrast to the determinism requirements of the [Compute Layer](/layers/Compute)).
- **AO (2024)**: an adjacent computing-layer narrative that hangs computing processes off the weave.

## Limitations and Public Incidents

- The permanence guarantee relies on the macro assumption that storage costs decline monotonically; the risk of the fund pool running dry is backstopped by a redenomination safety valve.
- The gateway layer is centralized (arweave.net dominates alone); SmartWeave execution is placed entirely in the trust of the client.
- Public incidents: no public record found.
