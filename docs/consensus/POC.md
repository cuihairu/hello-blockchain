# PoC

Proof of Capacity / Proof of Concept of Storage (PoC) is the early engineering form of PoSpace: miners pre-generate large numbers of "plot files" on disk, and the right to produce a block is decided by "whose disk happens to hold an answer close to the challenge value" — search capacity replaces computing power. Burstcoin (2014) was the pioneer, and Chia upgraded the idea into PoSpace+PoT (see [Chia](/chains/Chia)).

## Four Key Points

- **Which layer**: [Settlement layer](/layers/Settlement) — the right to produce blocks is allocated by disk capacity; search capacity replaces computing power
- **What it solves**: Replace computing-power competition with storage resources, lowering energy consumption and the barrier of specialized hardware — the right to produce is decided by "whose disk happens to hold an answer close to the challenge value"
- **How well it works**: Energy use is far lower than PoW and ordinary disks can participate; the cost is that plot files fill disks, the write volume of plotting grows with the network (Chia once triggered a solid-state drive buying rush), and capacity can be bought up leading to centralization
- **Sources**: Burstcoin whitepaper 2014 (pioneer); Chia whitepaper 2019 (upgraded into PoSpace+PoT)

## Basic Principles

Taking the Burstcoin/Shabal-POC scheme as an example:

1. **Plotting**: for each nonce a miner generates 8192 scoops (each scoop being 64 bytes of pseudorandom data), all of which are hashed into the plot file — this is one-time work that can be done offline.
2. **Production challenge**: each block issues a challenge (a generated signature hash); the miner finds the **matching scoop** across all of its plots and computes `deadline = H(scoop data) / capacity`, and the miner with the smallest deadline produces first.
3. **Waiting and submitting**: the deadline is also the number of seconds that must be waited; the miner broadcasts its signature and proof before the deadline, and the network verifies that the plot really contains that data.

## Characteristics

**Advantages**

- Far lower energy use than PoW: once plotting is done, mining only needs to read from disk and do light hashing.
- Participation on commodity hardware: an ordinary disk is enough, no ASIC required, and the initial degree of distribution is relatively high.

**Disadvantages**

- **Plot arms race**: disk capacity keeps growing, and the write volume of plotting is enormous (TB-scale plots wear out SSDs and consume power), so the "green" claim is discounted.
- **Reuse attack surface**: the same disk can plot for several chains that share the same algorithm at once, so security is diluted across forked chains.
- Timeliness depends on honest waiting (the deadline mechanism); a colluding group can produce early and disrupt it (this has happened in Burst's history).

## Relation to PoSpace

Chia's PoSpace replaces the Burst-style scoop scheme with a more rigorous "proof of space" structure (chialisp hash-table challenge-response, and a plotting penalty design that prevents plot copying), and introduces a verifiable delay function (PoT) to constrain the rhythm of production — it can be seen as the second generation of the PoC idea.
