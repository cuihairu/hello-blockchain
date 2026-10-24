# Snowball

Snowball is the family of **leaderless, sub-sampled, probabilistic** consensus protocols proposed in the 2018 whitepaper by Team Rocket (the pseudonym used before the Avalanche team formed), and the core component of Avalanche consensus. It is entirely different from classic BFT network-wide broadcast voting: each round asks only a few randomly chosen nodes, and after repetition the bias converges.

## Four Key Points

- **Which layer**: [Settlement layer](/layers/Settlement) — a family of probabilistic consensus protocols: leaderless, sub-sampled, bias converging
- **What it solves**: Replace network-wide broadcast voting — each round asks only a few random nodes, and after repeated queries individual preferences converge to network-wide agreement, with communication volume decoupled from node count
- **How well it works**: Low communication complexity, fast confirmation, no leader election needed; the cost is that finality is probabilistic (a 1/2 safety threshold, an exception to BFT), parameters (sample size k, threshold) are sensitive to the safety boundary, and the quality of random sampling affects convergence. Public incidents: inscriptions traffic in February 2023 caused Avalanche mainnet block production to stall for days (nodes needed coordinated restarts), exposing liveness and parameter fragility under heavy load
- **Sources**: Team Rocket "Scalable and Probabilistic Leaderless BFT Consensus through Metastability" 2018 (the Snowball/Avalanche family whitepaper)

## Evolution of the Protocol Family

1. **Slush**: after receiving a transaction a node starts a query, sampling $k$ nodes at random to ask for their colour, and if a majority gives another colour it changes its own; repeat for $m$ rounds. Stateless, a biased random walk.
2. **Snowflake**: adds a "consecutive counter" on top of Slush — accept only after the majority is consistent for $\beta$ consecutive samples, resisting transient disturbance.
3. **Snowball**: adds a "confidence accumulator" — each sample's majority colour gains confidence and the other colour is zeroed; once confidence reaches $\beta$ it locks (accept). Parameters $(k, \alpha, \beta)$ = (sample size, majority threshold, counting threshold).
4. **Snowman**: wraps Snowball into a chain (block-ordering) consensus, and is the block production engine of the Avalanche platform.

## Properties

- **Probabilistic safety**: the probability that an honest node is "flipped" into accepting a conflicting transaction falls exponentially with $\beta$ — the same shape as PoW's probabilistic finality, but without needing hash power.
- **No leader**: there is no proposer/leader role, and the degree of natural sybil resistance depends on validator admission (Avalanche mainnet uses stake-weighted voting).
- **Small communication volume**: each round communicates with only $k$ nodes ($k \approx 20$), messages do not explode with $n$, and tens of thousands of nodes are usable.
- **Parallelism**: different transactions reach consensus independently and concurrently; only conflicting transactions are mutually exclusive, giving natural high concurrency.

## Comparison with Classic BFT

Deterministic BFT gives the guarantee of "absolutely irreversible + finite rounds"; Snowball gives "parameterized probability + convergence over unbounded rounds", in exchange for lower communication cost and better horizontal scaling. Avalanche mainnet measures second-scale finality, and the theoretical ceiling depends on parameters and network quality.
