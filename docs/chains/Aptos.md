# Aptos

## Whitepaper and Specifications

The Aptos whitepaper (2022-06, Aptos Labs: Mo Shaikh and Avery Ching, core members of the Diem/Novi team); for node specifications and the treatment of AptosBFT, see [github.com/aptos-labs/aptos-core](https://github.com/aptos-labs/aptos-core) and [aptos.dev](https://aptos.dev); mainnet launched on 2022-10-17.

## What Problem It Solves

Diem died in the womb, but its BFT ([DiemBFT](/consensus/DiemBFT)) and the Move language (see the [Compute Layer](/layers/Compute)) were mature assets — Aptos carried that stack into a permissionless public chain, directly answering the question of "high throughput plus a safe upgrade mechanism."

## Technical Contributions

- **AptosBFT**: a HotStuff derivative in the DiemBFT/Jolteon family (see [HotStuff](/consensus/HotStuff)), with sub-second deterministic finality.
- **Block-STM parallel execution**: software transactional memory built on optimistic concurrency plus conflict retry, tearing out the bottleneck of the EVM's serial execution.
- **Move's resource type system**: assets modeled as linear resources, preventing copying and reentrancy.
- **Keyless accounts and upgrade governance**: passkey/ZK login; an on-chain governance-driven upgrade process notorious for treating "the upgrade itself as an attack surface" (see [Smart Contract Vulnerabilities](/hacking/SmartContractVulnerabilities)).

## Limitations and Public Incidents

- A persistent order-of-magnitude gap between the officially announced TPS and actual mainnet throughput, along with marketing controversies.
- Ecosystem size and TVL lag behind the narrative.
- Public incidents: on 2023-10-19 mainnet stalled for about 5 hours (a configuration disagreement among validators after an upgrade kept consensus from advancing) — a real-world case study in the fragility of the upgrade process.
