# Lightning Network

## Whitepaper and Specifications

"The Bitcoin Lightning Network: Scalable Off-Chain Instant Payments," Joseph Poon and Thaddeus Dryja, 2016-01 ([lightning-network-paper.pdf](https://lightning.network/lightning-network-paper.pdf)); the protocol specification is the BOLT series ([github.com/lightning/bolts](https://github.com/lightning/bolts)) — this is not a chain, but a network of channels on top of the Bitcoin chain.

## What Problem It Solves

Bitcoin's ~7 TPS and minute-scale confirmations cannot carry high-frequency small payments — so transactions move into off-chain payment channels, with only the two channel-open and channel-close transactions settled on chain, and intermediate payments routed atomically via HTLCs.

## Technical Achievements and Contributions

- **Payment channels + HTLC**: two-party signed multisig plus hash time locks, balances updated off chain with on-chain adjudication as the backstop (for the ledger shape, see [UTXO](/model/UTXO)).
- **Source routing and gossip**: nodes gossip channel capacity, and the payer assembles an onion route hop by hop.
- **Watchtowers and BOLT 12**: penalty monitoring outsourced, with static Offers payment codes — the UX keeps catching up.
- **The de facto workhorse of Bitcoin scaling**: settlement finality falls back to L1 mining consensus (see [PoW](/consensus/POW)).

## Limitations and Public Incidents

- Routing liquidity is hard to manage (the inbound liquidity problem), receiving while offline is weak, and success rates drop for large payments.
- Security depends on channel participants monitoring for penalty windows, and the watchtower ecosystem is still early.
- Public incidents: no mainnet-scale loss of funds has occurred; in 2022-02 a joint disclosure across multiple implementations covered a fee-calculation flaw (CVE-2021-31876 and others), and 2021 research into channel-jamming and spam-transaction attacks all ended in bounties and fixes — see also [Lightning network attacks](/hacking/LightningNetworkAttack).
