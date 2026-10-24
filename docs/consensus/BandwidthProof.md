# Bandwidth Proof

Bandwidth proof refers to the class of mechanisms that "prove you genuinely contributed network bandwidth": a node shares its idle bandwidth with the network, and verifiers reward it according to how much it contributes. The representative project is **Grass** — a bandwidth-sharing network where users install a client to share idle bandwidth and earn Grass Points and GRASS tokens, while institutional buyers use that bandwidth to run online services ([grassfoundation.io](https://grassfoundation.io/), [grass.io](https://www.grass.io/)).

## The Four Essentials

- **Which layer**: [Settlement](/layers/Settlement) (the resource-proof family) — Grass is not a public chain and has no block-production consensus in the traditional sense; the verification and incentives for bandwidth contribution are classified into the settlement layer under the "resource for verification rights" logic
- **What it solves**: aggregating dispersed idle bandwidth into a measurable resource network and distributing rewards by contribution — the difficulty is how "bandwidth contribution" gets verified rather than merely asserted
- **How well it solves it**: official public material only gives the verification account of "validator-signed measurement + reputation + stake weighting" ([meshio research consolidation, 2026-10-13](/layers/Layers)); no public record was found for the concrete protocol or cryptographic construction of bandwidth proof; the whitepaper is not obtainable (see below)
- **Source**: [grassfoundation.io](https://grassfoundation.io/), [grass.io](https://www.grass.io/); the mechanism description follows the account of [meshio research consolidation (2026-10-13)](/layers/Layers)

## Known Mechanism (Official Public Material)

- **Sharing and rewards**: users install a mobile, desktop, or browser-extension client and authorize sharing of idle bandwidth; rewards come in two kinds — Uptime Points (online time and referrals) and Network Points (connections that actually handle traffic) ([grass.io](https://www.grass.io/)).
- **The GRASS token**: officially called the native token of the Grass Network, rewards can be issued in USDC; some jurisdictions do not participate ([grass.io](https://www.grass.io/)).
- **Verification account**: verification of bandwidth contribution relies on validator-signed measurement, reputation, and stake weighting rather than on-chain block-production consensus — this is in the same family as the "resource for bookkeeping rights" of [PoSpace](/consensus/PoSpace)/[PoC](/consensus/POC), but the verification happens in an off-chain service network ([meshio research consolidation](/layers/Layers)).
- **Privacy**: officially, user personal data is not visible to Grass or to anyone, and the sharing cap is set by the user's own device ([grass.io](https://www.grass.io/)).

## Whitepaper Not Obtainable

Grass's original technical whitepaper (grass.io/whitepaper) returns **404 and is not obtainable** — the mechanism description in this entry follows current official documentation and the meshio research account, and makes no claims about the whitepaper's content.

## Differences from Related Proofs

| Proof | Resource Proven | Verification Method | Representative |
| --- | --- | --- | --- |
| [PoW](/consensus/POW) | Computing power | Hash puzzles | [Bitcoin](/chains/Bitcoin) |
| [PoSpace](/consensus/PoSpace) | Disk space | Challenge-response + plots | Chia |
| [PoC](/consensus/POC) | Wireless coverage | Three-party probing + physical laws | Helium |
| Bandwidth proof | Idle bandwidth | Validator-signed measurement + reputation + stake (off-chain) | Grass |

## Failure Modes

- **Verification details are not public**: bandwidth measurement and anti-cheating constructions have no public protocol, so outsiders cannot audit them independently — the "strength of proof" can currently only be stated per the official account.
- **Sybil and proxy spoofing**: bandwidth contribution is inherently forgeable (proxy pools, fake traffic); reputation and stake weighting are the known defenses, but the concrete parameters are not public.
- **Major mainnet-level incidents**: no public records found.

Bandwidth proof extends the "resource for verification rights" line along the bandwidth dimension: from computing power and space, to coverage, and now to bandwidth — every time the resource changes, the verification method has to re-answer "was this resource actually contributed?" Grass has engineered that question, but the openness of the answer is currently the lowest of the resource-proof family.
