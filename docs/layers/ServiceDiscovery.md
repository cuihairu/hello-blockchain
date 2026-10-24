# Service Discovery

The service discovery layer maps human-readable names to on-chain addresses and content, modeling DNS resolution, authorization and TTL but proving ownership cryptographically. It answers one question — **who owns this name now, and what does it point to**.

## Definition

Service discovery layer = naming system + resolution records + ownership proof.

- **Naming system**: swaps an address like `0x4a8b...` for `alice.eth`. Models DNS domain names, but the name itself is an on-chain asset.
- **Resolution records**: record types model DNS's A/AAAA/CNAME/TXT. On-chain they are key-value pairs such as address, text and contenthash.
- **Ownership proof**: a name is a token or an on-chain record; transferring it changes ownership, with no centralized registry involved. Models DNSSEC signature verification, but by a more direct route — on-chain state is itself the proof.

Above the service discovery layer sit users and dApps; below it are the [Settlement Layer](/layers/Settlement) (a record only becomes immutable once settled) and the [Storage Layer](/layers/Storage) (where the content a contenthash points to lives).

## Problems It Solves

1. **Address readability**: a long `0x` address is unreadable and unmemorable. Names make transactions recognizable to both people and applications.
2. **Verifiable ownership**: in DNS, domain ownership is decided by the registry and disputes run through processes like UDRP. On-chain name ownership is state; a transfer takes effect immediately and anyone can verify it.
3. **Censorship-resistant resolution**: DNS records can be removed by the registry or a root zone holder. Once an on-chain record is settled, no single party can delete it (though a browser gateway can still censor it — see failure modes).
4. **Multi-chain naming**: one name can point to different assets on different chains (mainnet ETH address, BSC address, content hash), which needs cross-chain resolution.
5. **Content addressing**: a name can resolve to a content hash, letting a user point at data directly instead of a URL.

## Existing Systems

| System | Which part of DNS it models | Traits |
| --- | --- | --- |
| ENS (Ethereum Name Service) | DNS root zone + resolvers | `.eth`, rich record types, cross-chain resolution, governance and governance proposals; ENSIP-10 and DNSSEC integration |
| SNS (Solana Name Service) | Domain name + records | `.sol`, aligned with Solana's account model |
| Unstoppable Domains | Registry | Suffixes like `.crypto` and `.nft`, pay once and hold forever |
| Handshake | Decentralized root zone | TLD auctions, the decentralized counterpart of the DNS root zone |
| Space ID | Domain name | `.bnb`, aligned with BNB Chain |
| ICNS (Internet Computer Name Service) | Domain name | Naming within the IC domain |
| DID (decentralized identifier) | Identifier | `did:ethr` and friends; an identity layer rather than a naming layer, frequently paired with service discovery |

## Open-Source List

- [ens-contracts](https://github.com/ensdomains/ens-contracts): ENS contracts and registration logic
- [offchain-resolver](https://github.com/ensdomains/offchain-resolver): the ENS off-chain resolver, backing ccip-read cross-chain resolution
- [unstoppable-domains](https://github.com/unstoppable-domains): Unstoppable Domains clients and contracts
- [hnsd](https://github.com/handshake-org/hnsd): Handshake node and TLD auctions
- [sid](https://github.com/Space-ID): Space ID clients and contracts
- [icns](https://github.com/dfinity/ic): the ICNS implementation on the Internet Computer

## Failure Modes

- **Squatting and domain sniping**: bots front-run the moment a registration window opens, and popular names get squatted or resold at a premium. Same root as the [Compute Layer](/layers/Compute)'s MEV problem — who controls the ordering.
- **Sniping expired renewals**: once an ENS name's annual fee lapses it becomes registerable; a holder who forgets to renew loses the name. Models DNS expiry, but the on-chain version has no grace period and no registry to fall back on.
- **Resolver hijacking**: a malicious resolver returns a wrong address, or a browser extension swaps the resolution result. The on-chain record is correct but the resolution step was hijacked.
- **ccip-read trust chain**: cross-chain resolution depends on gateway or oracle signature forwarding. What a resolver receives is "secondhand reporting"; the trust chain is one hop longer than the on-chain record.
- **Browser-layer DNS hijacking persists**: `.eth` names must resolve through a gateway, which can be blocked, hijacked or censored. The on-chain record is untamperable but the address the user sees is wrong.
- **Trademark disputes and governance attacks**: if the ENS root multisig or governance proposals are hijacked, the rules of the entire naming system can change. Models ICANN governance for DNS, but the attack surface shifts from a policy body to contract multisigs and governance proposals.
- **Phishing and homoglyphs**: Unicode homoglyphs and lookalike spellings (`1` and `l`, `0` and `O`) make users believe they typed the right name. On-chain name systems have no built-in defense; it must come from checkers and user education.
- **Record type abuse**: putting private keys, key fingerprints or other sensitive data into publicly resolvable records — on-chain records stay visible forever.

Service discovery failures almost all follow one pattern: **the on-chain record never changed, but the resolution step was swapped by someone**. When reading a service discovery case, ask first "which layer holds the record, which route does resolution take, and who on that route can intercept it".

## A Table Against DNS

| DNS | Service discovery | Difference |
| --- | --- | --- |
| Domain name | On-chain names like `.eth` | Ownership is state; a transfer takes effect immediately |
| Registry | On-chain registration contracts + governance | No centralized body; rules set by governance |
| Resolver | Contract resolvers + gateways | Resolution can be hijacked; one more hop than DNS |
| DNSSEC | On-chain state is itself the proof | No signature chain needed, but chain state must be verified |
| TTL | None (records take effect immediately) | No cache expiry window, but no buffer either |
| Root zone (IANA) | On-chain root contract / Handshake root | A decentralized root zone, but still a single contract |

## Design Points

- The name is the asset, the resolver is the single point: on-chain registration guarantees ownership, while resolution (gateways, DNS, wallets) is the main battlefield for hijacking, and every hop needs to be verifiable.
- Model DNS by splitting its three layers apart: registration (ownership), resolution (mapping), root (governance) — swapping the single point from an institution to a contract does not make it disappear.
- Defend against homoglyphs at the registration layer: Unicode lookalike checks, confirmation flows, allow lists — every remedy after the fact comes too late.
- Cross-chain/off-chain resolution lengthens the trust chain: each hop of ccip-read-style signature forwarding adds one more swappable point; the verification anchor must terminate on-chain.
