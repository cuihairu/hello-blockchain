# RPCA

RPCA (Ripple Protocol Consensus Algorithm) is the consensus algorithm of the XRP Ledger, published by Schwartz, Youngs and Britto in 2014 (two years after the mainnet started — the ledger had been running since 2012). It does not belong to the BFT three-phase voting family: validators converge repeatedly on a **candidate transaction set** over several rounds of "subrounds", and a transaction set endorsed by 80% of validators becomes final.

## Four Key Points

- **Which layer**: [Settlement layer](/layers/Settlement) — UNL-style voting consensus, with no BFT three phases, no staking, and no computing power
- **What it solves**: Reach agreement on a transaction set quickly between known validators (the UNL, Unique Node List) — no mining, no staking, second-scale deterministic blocks
- **How well it works**: 3-5 second final accounts, near-zero energy use, very low fees, and the XRP Ledger mainnet has run since 2012; the cost is that security rests entirely on the health of UNL configuration — if operators' UNLs do not overlap, consensus forks, and the default UNL has long been dominated by Ripple and the XRP Ledger Foundation, so centralization disputes keep recurring
- **Sources**: Schwartz, Youngs, Britto "The Ripple Protocol Consensus Algorithm" 2014 (mainnet already running since 2012)

## Core Mechanisms

- **UNL (Unique Node List)**: every node maintains its own list of validators it trusts. Consensus runs only between UNL members.
- **Multi-round convergence of the candidate transaction set**: in each round (subround) nodes broadcast the transaction candidate set they received, and progressively drop discrepant transactions according to the majority view inside the UNL, until after a few rounds the set converges.
- **80% threshold**: a transaction entering a final ledger needs the endorsement of 80% of UNL validators. Malicious nodes must exceed 20% to obstruct it, and exceed 40% to double-spend.
- **Final ledger**: a finalized ledger cannot be rolled back (no confirmation-count wait), which is fundamentally different from the probabilistic finality of PoW.

## Differences from Related Protocols

| Protocol | Relation | Key difference |
| --- | --- | --- |
| [PBFT](/consensus/PBFT) | Same class (permissioned voting) | PBFT does three-phase voting per proposal, RPCA converges a transaction set over many rounds |
| [FBA](/consensus/FBA) | Close relative | FBA (Stellar SCP) generalizes the UNL into node-chosen arbitration slices; RPCA relies on a fixed UNL list |
| [PoA](/consensus/POA) | Contrast | PoA produces on identity rotation, while RPCA must also vote and converge on transaction content |
| [Tendermint](/consensus/Tendermint) | Contrast | Tendermint uses stake-weighted voting, RPCA uses unweighted UNL voting |

## Failure Modes

- **UNL configuration is the security**: groups of nodes with non-overlapping UNLs each finalize their own ledger, forking into two facts. A 2021 academic study (Grace, Angel et al.) found that the UNLs actually running on XRPL are highly overlapping and recommended by a few entities, so partition resistance is overestimated.
- **No punishment mechanism**: malicious validators are not slashed — being removed from the list is the only tool, and economically nothing is lost.
- **The centralized governance reality**: the default UNL is provided by Ripple and the XRPL Foundation, and improvement proposals (dUNL and similar) have progressed slowly for years.
- **The boundary of the 80% threshold**: 20%~40% malicious nodes inside the UNL can obstruct consensus (liveness failure) without triggering a double-spend penalty, so DoS-style blocking is easier than stealing the ledger.

RPCA is the flagship of the "efficiency first, trust narrowed" route: **reduce an open problem to a list problem, performance immediately takes off, and the price is retelling the decentralization story**. Its divergence from Stellar (fixed UNL → self-chosen slices) is itself an interesting protocol evolution experiment.
