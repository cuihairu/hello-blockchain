# PoSpace

Proof of Space (PoSpace) requires a prover to spend storage resources to earn the right to record: the prover pre-builds a huge challenge-response data structure that can only be answered quickly by occupying disk, the network asks random questions, and whoever holds "the data closest to the answer" wins. It is the core component of the Chia blockchain and is used in pairs with [PoT](/consensus/POT).

## Four Key Points

- **Which layer**: [Settlement layer](/layers/Settlement) — the right to record is allocated by storage space, used in pairs with [PoT](/consensus/POT) (the Chia form)
- **What it solves**: Replace computing power with disk space — the prover pre-builds a challenge-response data structure that can only be answered quickly by occupying disk, anchoring the cost of misbehavior in storage
- **How well it works**: Energy use is orders of magnitude lower than PoW, and idle disks can be reused; the cost is that plotting concentrates (large farms buy up capacity), the write volume of the plotting process is a real environmental cost, and space can be bought and sold quickly
- **Sources**: Dziembowski et al. "Proofs of Space" CRYPTO 2015; Chia whitepaper 2019; official documentation [docs.chia.net/proof-of-space/](https://docs.chia.net/proof-of-space/), [chia-blockchain repository](https://github.com/Chia-Network/chia-blockchain)

## Basic Principles (Chia Implementation)

1. **Plotting**: a miner generates a chialisp hash proof table rooted in its own key (a plot file, commonly a 101 GiB k32), which contains large numbers of "quality strings" stored in a specific graph structure (based on RY Pie graphs).
2. **Challenge**: in each slot (about 18.75 seconds) the network publishes a challenge, and the miner queries 64 qualities in the plot, taking the smallest.
3. **Proof and filtering**: quality and difficulty together decide whether one is eligible to produce; the eligible party then creates a block and attaches the proof of space. The verifier can check the proof without any disk (it covers only a small fraction of the plot data).
4. **Anti-cheating**: a plot is bound to the miner's key, so copying a plot across machines does not raise the win rate (rewards point to the same key); replotting takes far longer than a slot, so a temporary "plot-on-demand and sell" is not viable.

## Characteristics

**Advantages**: energy use is orders of magnitude lower than PoW; disks are a commodity asset with a low entry barrier; the security argument has rigorous cryptographic backing (the formalization of PoSpace by Abusalah et al.).

**Disadvantages**: a storage arms race (a NAS short-term mining rush); the boundary between replotting attacks and "economically motivated repeated replotting" depends on PoT timing constraints; long-idle disk recovery and disturbance of the second-hand market.

## Relation to Similar Proofs

- [PoC](/consensus/POC) (Burstcoin) was the earlier engineering implementation, and PoSpace is its cryptographically strengthened version.
- Filecoin's PoRep/PoSt uses proofs of storage to **provide a storage service** (useful storage), while PoSpace treats storage only as a lottery ticket — the two have different motivations.

## Farmer Cost Structure

A "farmer" in PoSpace is a participant in plotting and mining; costs fall into three parts (per the official documentation):

- **Plotting**: a k32 plot is about 101.4 GiB, and plotting time ranges from about 5 minutes on a high-end machine to about 12 hours on a slow one; plotting is a write-heavy process and SSD wear is a real cost — this gave rise to a "plotting industry" (professional plotting services, plot-as-a-service), and large-capacity HDD farms and SSD plotting clusters have split into two ecosystems.
- **Farming**: each challenge needs only about 7-9 disk seeks (about 70-90 ms on a slow disk), and the plot filter rules out 511 of 512 plots — a single-disk farmer's day-to-day overhead is close to idle, but the latency of challenge response decides the chance to produce.
- **Proof of space-time overhead**: the VDF of PoT is computed serially by a timelord, and the farmer side only needs to verify, so overhead is concentrated on the [PoT](/consensus/POT) side.

**Known problems**: centralization of plotting (large farms buying up capacity), replotting attacks (temporary replotting to front-run, defended against by PoT timing constraints), second-hand disk markets disturbed by plotting demand, and growth in total network space diluting the yield of a single plot.
