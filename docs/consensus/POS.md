# PoS

Proof of Stake (PoS) replaces "computing-power competition" with "economic staking": validators lock a certain amount of native tokens as collateral and are selected to produce blocks or to vote according to stake weight; the stake of an offender can be slashed, while honest participants earn newly minted tokens and fee rewards.

## Four Key Points

- **Which layer**: [Settlement layer](/layers/Settlement) — actors are chosen by stake weight; finality is often combined with BFT voting (Ethereum's Gasper: LMD-GHOST for production + Casper FFG for finalization)
- **What it solves**: Use economic staking instead of computing-power competition to resist sybils, make "an offender loses its collateral" the security mechanism, and bring down energy consumption
- **How well it works**: After the Ethereum Merge energy use dropped by about 99.95%, confirmations are faster, and slashing is quantifiable; the cost is that Nothing-at-Stake has to be constrained by slashing rules, long-range attacks have to be backstopped by weak subjectivity, and staking tends to concentrate in large institutions
- **Sources**: QuantumMechanic (Bitcointalk forum post) 2011; King and Nadal "The PPCoin White Paper" 2012-08-19; Kiayias et al. "Ouroboros" CRYPTO 2017; Buterin and Griffith "Casper the Friendly Finality Gadget" 2017

## Basic Principles

1. **Staking admission**: a node submits a stake transaction to lock funds (Ethereum, for example, requires 32 ETH per validator).
2. **Validator selection**: the protocol selects the proposer and attestators each round by weight and randomness (such as VRF, or RANDAO + VDF); weight is usually proportional to the amount staked.
3. **Production and voting**: the proposer packs the block, the remaining validators sign and vote on it, and once the threshold is reached (usually 2/3) it is confirmed.
4. **Rewards and penalties**: producing and voting earn rewards; double-signing, prolonged offline, and surround voting trigger slashing.

## Comparison with PoW

| Dimension | PoW | PoS |
| --- | --- | --- |
| Sybil resistance cost | Electricity + hardware | Opportunity cost of locked tokens |
| Energy consumption | Very high | Very low (about 99.95% lower after the Ethereum Merge) |
| Attack cost | Electricity bills | Token devaluation risk + slashing |
| Finality | Probabilistic | Deterministic in most implementations (BFT voting) |
| Centralization risk | Mining pools/ASICs | The rich get richer, exchange-custodied staking |

## Key Design Challenges

1. **Nothing-at-Stake**: a PoW fork requires splitting computing power, but in PoS copying a signature costs nothing — a validator can vote on every fork at once. The fix: slashing rules that punish double-signing on conflicting blocks.
2. **Long Range Attack**: old keys of early validators can rebuild an alternate chain from the genesis block. The fix: checkpoints, weak subjectivity (a new node must sync from a recent trusted state).
3. **Cold-start token distribution**: the initial allocation of PoS depends on a genesis allocation or migration from PoW / an airdrop, and fairness is often disputed.

## Representative Implementations

- **Ethereum**: Gasper (Casper FFG + LMD GHOST); the beacon chain manages 32 ETH per validator, slashing, and the exit queue.
- **Cardano**: the Ouroboros paper series, epoch slotting + VRF leader selection.
- **Cosmos ecosystem**: staking layered on top of Tendermint BFT (bonded POS).
