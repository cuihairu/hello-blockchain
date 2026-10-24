# P2PK transactions

P2PK (Pay-to-PubKey) is one of the simplest transaction types on the Bitcoin network. It pays directly to a public key rather than to a hash of one, which makes the script small but exposes the full public key the moment the output is created.

### P2PK basics

1. **Public key (PubKey)** — In Bitcoin every user holds a key pair: a private key that must stay secret, and a public key that may be published. The public key verifies signatures produced with the matching private key.
2. **Transaction output** — A P2PK output embeds a public key and states that the coins can only be spent by presenting a signature the key accepts.
3. **Unlocking script (ScriptSig)** — To spend coins sent to a P2PK output, the spender supplies a signature that matches the public key stored in the output. That signature is checked against the public key to confirm it is valid.

### The scripts

- **Locking script (ScriptPubKey)** — locks the output to one specific public key. A typical P2PK ScriptPubKey is:
  ```
  <PubKey> OP_CHECKSIG
  ```
  `<PubKey>` is the receiver's public key, and `OP_CHECKSIG` is the opcode that checks the signature supplied by the unlocking script.
- **Unlocking script (ScriptSig)** — unlocks the output by presenting a valid signature. A typical P2PK ScriptSig is:
  ```
  <Signature>
  ```
  `<Signature>` was produced with the sender's private key.

### How it runs

1. **Creating a P2PK transaction** — when the transaction is built, the sender puts the receiver's public key into the output's locking script.
2. **Spending a P2PK output** — to use the coins, the spender builds a transaction whose unlocking script supplies the signature generated with the corresponding private key.
3. **Verification** — the Bitcoin network executes the two scripts together. It takes the public key from the locking script, takes the signature from the unlocking script, and verifies the signature with that key. If the signature checks out, the transaction is accepted.

### A worked example

1. **Transaction creation**
   - Alice wants to send Bob 1 BTC.
   - Bob provides his public key.
   - Alice creates an output containing Bob's public key and the `OP_CHECKSIG` opcode.
2. **Spending the transaction**
   - Bob wants to spend the 1 BTC he received.
   - Bob builds a new transaction and supplies a signature (made with his private key) as the unlocking script.
   - The Bitcoin network checks the signature against the public key from the original transaction. If it matches, Bob's transaction is valid.

### Trade-offs

- **Advantages**
  - Simple and direct.
  - Binds the transaction output to one specific public key.
- **Drawbacks**
  - Weaker privacy, because the public key is exposed before the coins are spent.
  - Larger transactions than newer approaches such as P2PKH, which stores only the hash of the public key and thereby reduces exposure while improving both privacy and security.

P2PK was common in early Bitcoin transactions. It has since been largely replaced by P2PKH and more advanced script patterns that offer better security and privacy.
