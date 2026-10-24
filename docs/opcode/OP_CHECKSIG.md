# OP_CHECKSIG

`OP_CHECKSIG` is one of the most core opcodes in Bitcoin Script: it pops the public key and signature from the stack, verifies whether the signature is valid for the current transaction (or a specified part of it), and pushes the boolean result back onto the stack. All standard payment methods — P2PK, P2PKH, P2SH, P2WPKH, P2TR — ultimately build on top of this opcode.

## Execution Semantics

After the locking script and unlocking script are concatenated, the stack state is (bottom to top):

```
<signature> <pubkey> OP_CHECKSIG
```

During execution:

1. Pop the top-of-stack `pubkey` and `signature`.
2. **Remove the unlocking script** from a copy of the current transaction (to avoid signing over itself), and select the transaction serialization scope according to the sighash type, computing its double SHA-256 digest (sighash).
3. Verify the sighash against the `pubkey` using ECDSA (Schnorr under Taproot).
4. If valid, push `1` (true); otherwise push `0` (false) and fail the script — **verification failure makes the transaction invalid**, unlike a false value from `OP_EQUAL` which can continue executing.

## Sighash Types

The single byte at the end of the signature declares "which parts of the transaction this signature commits to":

| Type | Scope |
| --- | --- |
| `SIGHASH_ALL` (default) | All inputs and all outputs |
| `SIGHASH_NONE` | All inputs, but makes no commitment to any outputs (payee can be changed arbitrarily) |
| `SIGHASH_SINGLE` | All inputs, but commits only to the output at the same index |
| `ANYONECANPAY` modifier | Commits only to the current input; other inputs can be appended by others (commonly used for crowdfunded payments) |

## Usage in P2PK and P2PKH

```
P2PK  locking:  <pubkey> OP_CHECKSIG
       unlocking:  <signature>

P2PKH locking:  OP_DUP OP_HASH160 <pubKeyHash> OP_EQUALVERIFY OP_CHECKSIG
       unlocking:  <signature> <pubkey>
```

In P2PKH, before `OP_CHECKSIG` the hash comparison first confirms the public key is correct, so the public key is only disclosed when the output is spent — this is precisely why P2PKH is more space-efficient than P2PK and better protects public key privacy.

## With SegWit / Taproot

- **SegWit (BIP 141/143)**: The `OP_CHECKSIG` in witness scripts uses a new digest algorithm defined by BIP 143, excluding witness data from the txid and fixing transaction malleability.
- **Taproot (BIP 340/341/342)**: Introduces 64-byte Schnorr signatures and a new `TapSighash` digest; `OP_CHECKSIG` verifies Schnorr signatures under Tapscript semantics, supporting key aggregation and more flexible script commitments.

## Caveats

- `OP_CHECKSIG` does not "compare two strings" — it verifies **a signature over the current transaction itself**, so scripts cannot directly perform arbitrary message signature verification on-chain (this is precisely the problem that opcodes like `OP_CHECKSIGFROMSTACK`, introduced by Elements/Liquid, aim to solve).
- After BIP 66, the signature passed to it must be strictly DER-encoded, or the script fails immediately.
- The sighash byte in the signature does not participate in the ECDSA computation proper, but does participate in digest construction.
