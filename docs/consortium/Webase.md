# WeBASE

WeBASE (WeBank Blockchain Application Software Extension) is the blockchain middleware platform open-sourced by WeBank, deployed between [FISCO BCOS](/consortium/FiscoBcos) and business systems: it wraps the raw blockchain operations — "connect to nodes, send transactions, manage contracts, manage private keys, query data" — into a web management platform and REST interfaces, so business developers unfamiliar with blockchain details can use the chain as if calling an ordinary backend service.

Its positioning corresponds to the public-chain world's combination of "node provider + block explorer + contract IDE + wallet backend", but serving permissioned-chain scenarios — there is no open wallet, and private-key management is custodial, run by the chain operator.

## The Four Essentials

- **Which layer**: the access surface between [service discovery](/layers/ServiceDiscovery) and the [compute layer](/layers/Compute) — the middleware takes no part in consensus; it turns business requests into on-chain transactions and on-chain events into data the business can query
- **What it solves**: a consortium chain's node interface is low-level RPC, and a business system connecting directly would have to handle signing, group routing, certificates and data export by itself; WeBASE concentrates these cross-cutting capabilities into a middleware layer
- **How well it solves it**: it provides the node front (a proxy connection), node management (aggregated APIs and operations), a web console (contract IDE, custodial keys, data overview, transaction audit), an independent signing service (key isolation) and data export (on-chain data into a database); the price is one more layer to deploy and operate, custodial private keys becoming a concentrated attack surface, and the platform itself being tied to the FISCO BCOS ecosystem
- **Source**: [WeBASE technical documentation](https://webase-web.readthedocs.io/en/latest/) (the official documentation lists the subsystems WeBASE-Front, WeBASE-Node-Manager, WeBASE-Web, WeBASE-Codegen-Monkey, WeBASE-Collect-Bee, WeBASE-Sign, WeBASE-Transaction)

## Core Mechanisms

- **WeBASE-Front (node front)**: a proxy service deployed on the node's own machine or the same network segment; it wraps the node's RPC and provides REST interfaces for transaction signing and sending, contract calls, and block and event queries. It is the mandatory gateway between the management platform and the chain.
- **WeBASE-Node-Manager (node management)**: aggregates multiple Fronts, uniformly managing nodes, groups, users and contracts; outward it provides a unified business API, inward it handles permissions and auditing. The backend of the console (WeBASE-Web) is exactly this.
- **WeBASE-Web (management console)**: the browser-based console. Modules listed in the official documentation: blockchain data overview, node management, contract management (online IDE compile and deploy), private-key management, system monitoring, transaction audit, account management.
- **WeBASE-Sign (signing service)**: an independently deployed signing service, so private keys never land in business systems — the business side sends the data to be signed to the Sign service, which signs it with a custodial key and returns the result. Private keys are isolated from the application systems, reducing the key-leak surface.
- **WeBASE-Transaction (transaction service)**: a transaction-orchestration service handling scenario-based signing and sending of concurrent transactions, wrapping "assemble the transaction → sign → send → get the receipt" into a single call.
- **WeBASE-Codegen-Monkey (code generation)**: generates Java code and data models from a contract ABI, letting Java business projects call contracts directly as objects.
- **WeBASE-Collect-Bee (data export)**: exports on-chain blocks, transactions and events into a relational database — consortium-chain auditing and reporting are usually done on the database side, not by querying the chain directly.

## Failure Modes

- **The concentrated risk of custodial keys**: key custody in WeBASE-Sign and the console turns "one key per person" into "the platform holds a batch of keys" — once the platform is compromised, keys leak in bulk. Production deployments must put the Sign service on a separate network and restrict access to least privilege.
- **The middleware as a single point**: all business traffic passes through Front/Manager, so their failure means business failure. The chain itself is still there, but the access layer needs high-availability deployment.
- **Audit depends on export completeness**: transaction auditing and reporting are based on the database copy exported by Collect-Bee, so a break in the export pipeline or a missed configuration lets the "database view" drift from the "on-chain facts" — a reconciliation mechanism with the chain as the source of truth cannot be skipped.
- **Ecosystem lock-in**: WeBASE targets FISCO BCOS-family nodes, so a cross-chain consortium (a mixed Fabric/Besu deployment) cannot reuse it; access-layer selection must be evaluated together with chain selection.
- **Major security incidents**: no public record found.
