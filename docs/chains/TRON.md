# TRON

TRON is a public chain founded in 2017 with mainnet launch on 2018-05-31: DPoS consensus rotates block production among 27 Super Representatives (SRs), the TVM is bytecode-compatible with the EVM, and it is best known as the settlement rail carrying a large volume of TRC-20 USDT.

## Whitepaper and Specifications

The TRON whitepaper of 2017-12 has been revised several times and its sourcing is disputed — the authoritative specification is [developers.tron.network](https://developers.tron.network) and GitHub ([tronprotocol/java-tron](https://github.com/tronprotocol/java-tron)); mainnet launched on 2018-05-31.

## What Problem It Solves

High throughput plus zero-fee content distribution and transfers — the actual landing point later became the largest carrier network for USDT.

## Technical Achievements and Contributions

- **DPoS with 27 Super Representatives**: 3-second blocks — see [DPoS](/consensus/DPOS).
- **Zero-fee transfers**: a bandwidth/energy staking model (contrast EOS's resource model).
- **A TVM that is bytecode-compatible with the EVM**: Ethereum contracts migrate almost as-is.
- **The home base of TRC-20 USDT**: a single chain carries the market's largest share of USDT settlement.

## Limitations and Public Incidents

- Super Representatives are concentrated, the founding team's influence is large, and the whitepaper's academic quality has been repeatedly criticized.
- Public incidents: no network-wide outages found in the public record (USDT freezes for law enforcement are issuer actions, not chain failures).

## Supplementary Notes
### Fundamental Principles and Technical Characteristics

1. **DPoS consensus**:
   - TRX holders vote to elect 27 Super Representatives who take turns producing blocks, with two further tiers — SR Partner and SR Candidate — sharing the rewards; the vote tally cycle is 6 hours.
   - The 27 active SRs form a committee that can call votes on on-chain parameters — see [DPoS](/consensus/DPOS).

2. **The TVM virtual machine**:
   - The TRON Virtual Machine is **bytecode-compatible** with the EVM, so Ethereum Solidity contracts and Truffle projects can migrate at low cost. Address encoding, the fee unit, and some precompiled opcodes differ, and the official documentation provides a TVM versus EVM comparison.
   - The smart contract language remains Solidity — see the [account model](/model/Account); TRON and Ethereum are both account-model chains.

3. **The resource model**:
   - Transfers and contract execution consume two kinds of resources, Bandwidth and Energy: you either stake TRX to obtain resources or burn TRX to pay directly, and there is a daily allowance of free bandwidth.

### Ecosystem and Development

- **The USDT rail**: TRC-20 USDT is the most important asset on TRON; with low fees and fast confirmation it became the mainstream choice for high-frequency settlement — see [Tether](/chains/Tether).
- **BitTorrent**: TRON acquired BitTorrent in 2018 and later launched the BTT token.
- **Client**: the core client java-tron is maintained by TRON DAO and open-sourced at [tronprotocol/java-tron](https://github.com/tronprotocol/java-tron).

### Application Scenarios

- **Stablecoin settlement**: small, high-frequency transfers and cross-border settlement, where TRC-20 USDT holds the dominant share.
- **dApps and games**: built on EVM compatibility to carry over Ethereum-family applications.

### Summary

TRON trades decentralization for low fees and fast confirmation via DPoS, uses EVM compatibility to lower migration costs, and then secured its ecosystem niche with the stablecoin rail. Its trade-offs are in the same family as [EOS](/chains/EOS): sacrificing some decentralization for throughput — see the DPoS thread in the [consensus algorithm evolution timeline](/consensus-timeline).
