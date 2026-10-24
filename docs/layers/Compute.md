# Compute Layer

The compute layer turns a blockchain into a "world computer": it executes state transitions that the whole network agrees on, on a deterministic state machine. It does not itself decide "which state is correct" — it guarantees that "given the same input, every honest node computes the same output"; finality of state comes from the [Settlement Layer](/layers/Settlement) below it.

## Definition

Compute layer = virtual machine + gas metering + execution semantics. Each of the three pieces owns one thing:

- **Virtual machine**: defines the instruction set and the state transition rules. The EVM is stack-based bytecode, Move is resource-oriented bytecode, WASM is general-purpose bytecode, and Bitcoin Script is a restricted stack-based script.
- **Gas metering**: turns "infinite loops" into "paid, finite steps". Every instruction is priced, paid for before execution, and everything reverts once gas runs out. Gas is the compute layer's engineering answer to the halting problem.
- **Execution semantics**: determinism — the same input must yield the same output. No floating point, no randomness sources, no syscalls, no platform-dependent behavior. Any node replaying the same transaction must reach the same result, otherwise consensus breaks.

Above the compute layer sit contracts and dApps; below it are the [Storage Layer](/layers/Storage) (state reads and writes) and the [Settlement Layer](/layers/Settlement) (which packs execution results into blocks).

## Problems It Solves

1. **How to get mutually distrusting nodes to agree on one computation result**: through deterministic execution plus re-execution verification. Every node independently replays the transaction and only accepts if the result matches. The price is slowness — every node has to compute everything.
2. **How to meter computational resources**: gas prices computation, storage and bandwidth uniformly, so an "infinite loop" stops from gas exhaustion before it can happen.
3. **How to verify that computation is correct**: three routes — re-execution (the default), validity proofs (ZK: the prover computes once, the verifier checks once), and fraud proofs (optimistic execution with a challenge period to correct mistakes).
4. **How to upgrade**: proxy patterns (logic separated from storage), upgradeable contracts, governance. Upgrading is a problem unique to the compute layer — immutability and maintainability are in natural conflict.

## Existing Systems

| Route | Systems | Traits |
| --- | --- | --- |
| EVM stack bytecode | Ethereum, BSC, Polygon, Avalanche C-Chain | Largest ecosystem; mature gas model; most reentrancy and overflow incidents |
| TVM, EVM-compatible | TRON | Bytecode-level compatible with the EVM, yet its consensus is DPoS — the virtual machine and consensus are two independent dimensions |
| Move, resource-oriented | Aptos, Sui, Starcoin | Resources as assets, type system prevents reentrancy; Sui's object model supports parallelism |
| WASM general bytecode | Polkadot (ink!), Near, Cosmos (CosmWasm) | Multi-language; startup and compile costs higher than the EVM |
| Restricted scripting | Bitcoin Script, Cardano Plutus | Not Turing-complete; expressiveness traded for predictability and auditability |
| Parallel execution | Solana Sealevel, Aptos Block-STM, Sui | Explicitly declared read/write sets; non-conflicting transactions run in parallel |
| UTXO + computation | Fuel | Parallel execution and its own VM on the UTXO model |
| Actor model | Internet Computer | Message-driven + chain-key cryptography; contracts are stateful actors |

## Open-Source List

- [go-ethereum](https://github.com/ethereum/go-ethereum): the EVM reference implementation, the geth client
- [revm](https://github.com/bluealloy/revm): an EVM written in Rust, used as the execution layer by Reth and others
- [solana](https://github.com/solana-labs/solana): the Solana validator client (Sealevel parallel execution)
- [aptos-core](https://github.com/aptos-labs/aptos-core): the Aptos node and Move VM
- [CosmWasm](https://github.com/CosmWasm/cosmwasm): the WASM contract framework of the Cosmos ecosystem
- [ink!](https://github.com/use-ink/ink): the WASM contract language of Polkadot
- [wasmer](https://github.com/wasmerio/wasmer) / [wasmtime](https://github.com/bytecodealliance/wasmtime): WASM runtimes
- [fuel-core](https://github.com/FuelLabs/fuel-core): the Fuel node and UTXO parallel execution
- [dfinity/ic](https://github.com/dfinity/ic): the Internet Computer replica implementation

## Failure Modes

- **Reentrancy**: The DAO (2016) had about $60 million drained through recursive calls, directly triggering Ethereum's hard fork. Defenses are the checks-effects-interactions ordering and reentrancy locks.
- **Integer overflow/underflow**: before Solidity 0.8 these were unchecked by default; a single `a - b` could mint an astronomical token supply.
- **Predictable randomness**: `block.timestamp` and `blockhash` are visible to and manipulable by miners/validators; use them as a randomness source and you get predicted and front-run.
- **Gas exhaustion DoS**: unbounded loops or element-by-element operations over a large array — one transaction can drain a block's gas.
- **Storage collisions and proxy upgrade bugs**: `delegatecall` shares the storage context; a storage layout mismatch between the logic contract and the proxy destroys assets outright.
- **Oracle manipulation**: a flash loan borrows enormous funds within one transaction to move a single oracle price (bZx, Harvest and similar cases); the contract "correctly executed wrong data".
- **MEV and front-running**: ordering rights are extracted by searchers and ordinary transactions get sandwiched. This is the compute layer's structural risk in "who executes first".
- **Broken determinism**: floating-point arithmetic, uninitialized storage pointers, platform-dependent behavior — all of these make different nodes compute different results; that is a consensus-level incident, not just a bug.
- **Upgrade governance attacks**: stolen multisigs, maliciously passed governance proposals, bypassed timelocks — an upgradeable contract's "maintainable" surface is an attack surface.

Compute-layer failures almost all follow one pattern: **the contract logic was correct, but the inputs, the ordering or the upgrade rights were manipulated**. When reading a compute-layer case, ask first "who controls the inputs, who controls the ordering, who controls the upgrades".

## Design Points

- Execution must be deterministic: the same input yields the same output across the network — floating point, syscalls and randomness sources never enter the instruction set.
- The engineering answer to the halting problem is metering: price every execution step in gas and cut off when payment runs out; do not try to "detect" infinite loops.
- Pick semantics by tier: Turing completeness buys expressiveness, restricted scripts buy predictability — choose per business need; you do not have to go Turing-complete everywhere.
- The upgradeable surface is the attack surface: proxies, timelocks and multisigs are operationally necessary and the largest source of vulnerabilities; design the permission model before the features.
- External facts go through oracles: consensus only guarantees that on-chain state is consistent, not that "off-chain is true" — the trust of the data's source layer has to be designed separately.
