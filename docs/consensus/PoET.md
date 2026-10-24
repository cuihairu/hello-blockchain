# PoET

Proof of Elapsed Time (PoET) was proposed by Intel in 2016 (adopted by Hyperledger Sawtooth): each candidate node draws a random "waiting time" by lottery, and **whoever waits longer produces the block**, with the fairness of that waiting guaranteed by a trusted execution environment (TEE).

## Four Key Points

- **Which layer**: [Settlement layer](/layers/Settlement) — a TEE lottery decides the order of production; note that security is anchored in a trusted execution environment, not in pure cryptographic consensus
- **What it solves**: Draw "who produces" fairly in a permissioned network — each candidate node draws a random waiting time, whoever waits longer produces the block, and the fairness of the waiting is guaranteed by the TEE
- **How well it works**: The draw is fair, energy use is very low, and latency in a permissioned chain is stable; the cost is that security depends entirely on Intel SGX, which has been broken by side channels many times since 2017 — "how long you waited" can be forged, so it is only suitable as a teaching example and for restricted deployments
- **Sources**: Intel "Proof of Elapsed Time" 2016; Hyperledger Sawtooth documentation

## Basic Principles

1. After joining, a node requests a "draw" from its local SGX enclave: the enclave generates a random waiting time $t$ and starts timing.
2. When the timer expires, the node claims victory; the enclave attaches a **signed timing proof** (README/attestation), and other nodes accept its block after verifying the proof.
3. SGX hardware guarantees that "it really waited $t$" and that $t$ is uniformly random — equivalent to "implementing a lottery ticket with trusted hardware".

## Characteristics

**Advantages**

- Very low energy use: no hash race, only waiting and light proving.
- Fair "draw" semantics for admission, intuitive and simple to implement, suitable for consortium chains.

**Disadvantages and controversies**

- **The root of trust is Intel**: security rests on the assumption that the CPU vendor's TEE cannot be broken — since 2017 SGX has been broken by side-channel attacks several times (Foreshadow, Plundervolt, ÆPIC Leak), so a waiting proof can in theory be forged.
- The degree of decentralization is tied to "whether all participating nodes bought the same vendor's CPU".
- Hyperledger Sawtooth is no longer actively maintained, and PoET is now mostly a teaching example.

## Related Comparisons

PoET and [PoT](/consensus/POT) (Proof of Time) both take "time" as their core resource, but PoT uses a verifiable delay function (VDF) to prove elapsed time in an **open network** without trusting hardware; combined with [PoSpace](/consensus/PoSpace) (Chia) it forms a complete consensus of "storage draw + time ordering".
