# Merkle Tree

The Merkle tree (also known as a hash tree) was proposed by Ralph Merkle in 1979. It is a binary hash tree constructed bottom-up: leaf nodes are hashes of data, internal nodes are hashes of their two children's hashes, and the tree root (Merkle root) uniquely summarizes all leaf data. Blockchains use Merkle trees to organize transactions within a block, compressing the "entire set of transactions" into 32 bytes in the block header.

## Structure

```
              Root = H(H01 + H23)
             /                    \
      H01 = H(H0 + H1)        H23 = H(H2 + H3)
       /          \              /          \
  H0=H(tx1)   H1=H(tx2)   H2=H(tx3)   H3=H(tx4)
```

- **Leaf Nodes**: Compute the hash of each transaction (in Bitcoin, double SHA-256 is applied to the transaction header).
- **Internal Nodes**: Concatenate the hashes of the left and right children, then hash the result; if the number of nodes at a level is odd, the last node is paired with itself (Bitcoin's approach).
- **Root Node**: The single node at the top level, i.e., the Merkle root, which is written into the block header.

## Why Blockchains Need Merkle Trees

1. **Integrity Aggregation**: The block header only needs a 32-byte Merkle root; tampering with any transaction changes the root value, allowing full nodes to quickly verify block contents.
2. **Light Client Verification (SPV)**: Light clients only store block headers. To verify whether a transaction is in a block, there is no need to download all transactions — only a **Merkle path** (the sibling hashes from the transaction to the root, approximately $log_2(N)$ of them) is needed to recompute the root and compare it with the block header. For a block with ten thousand transactions, a proof requires only about 14 hashes.
3. **Fast Comparison and Synchronization**: If two trees have the same root, the transaction sets are considered consistent — this is the prerequisite for efficient synchronization between nodes.

## Code Example

```python
import hashlib


def dhash(data: bytes) -> bytes:
    """Bitcoin-style double SHA-256"""
    return hashlib.sha256(hashlib.sha256(data).digest()).digest()


def merkle_root(txids: list[bytes]) -> bytes:
    """txids: list of transaction hashes (little-endian byte order); returns the Merkle root"""
    if not txids:
        raise ValueError("no transactions")
    level = txids[:]
    while len(level) > 1:
        if len(level) % 2 == 1:          # odd number of nodes: duplicate the last one to pair
            level.append(level[-1])
        level = [dhash(level[i] + level[i + 1]) for i in range(0, len(level), 2)]
    return level[0]


def merkle_path(txids: list[bytes], index: int) -> list[bytes]:
    """Return the Merkle path (list of sibling hashes) for the transaction at index"""
    path, level, i = [], txids[:], index
    while len(level) > 1:
        if len(level) % 2 == 1:
            level.append(level[-1])
        sibling = i ^ 1                   # the paired sibling
        path.append(level[sibling])
        level = [dhash(level[j] + level[j + 1]) for j in range(0, len(level), 2)]
        i //= 2
    return path


if __name__ == "__main__":
    txs = [dhash(f"tx{i}".encode()) for i in range(5)]
    root = merkle_root(txs)
    proof = merkle_path(txs, 2)

    # Recompute the root from the path, verifying transaction 2
    idx, h = 2, txs[2]
    for sibling in proof:
        h = dhash(h + sibling) if idx % 2 == 0 else dhash(sibling + h)
        idx //= 2
    print("root  :", root.hex())
    print("rehash:", h.hex(), "| valid:", h == root)
    print("proof :", [x.hex()[:12] for x in proof])
```

> The demonstration simplifies pairing order; a real implementation (such as Bitcoin Core) determines concatenation order during path recomputation based on the original index's left/right position — when `i` is even the current node is on the left, otherwise on the right.

## Variants

- **Merkle Patricia Trie**: Ethereum's state tree, in key-value pair form, supporting single-key proofs and incremental updates, used for world state and storage.
- **Merkle Mountain Range (MMR)**: Supports append-only scenarios (such as Portal/Bytom, Grin), without needing to know the total number of leaves in advance.
- **Merkle DAG**: The directed acyclic version used by IPFS/Posy, where children can be shared by multiple parents.

## Summary

The Merkle tree compresses "trusting all data" into "trusting a single root hash," serving as the common foundation for blockchains to achieve lightweight verification, cross-node synchronization, and various types of proofs (SPV, state proofs, cross-chain proofs).
