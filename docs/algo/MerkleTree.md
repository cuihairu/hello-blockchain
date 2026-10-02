# Merkle 树

Merkle 树（默克尔树，Hash Tree）由 Ralph Merkle 于 1979 年提出，是一种自底向上构建的二叉哈希树：叶子节点是数据的哈希，中间节点是其两个子节点哈希的再哈希，树根（Merkle Root）唯一概括了全部叶子数据。区块链用 Merkle 树组织区块内的交易，使"整块交易集合"被压缩为区块头中的 32 字节。

## 结构

```
              Root = H(H01 + H23)
             /                    \
      H01 = H(H0 + H1)        H23 = H(H2 + H3)
       /          \              /          \
  H0=H(tx1)   H1=H(tx2)   H2=H(tx3)   H3=H(tx4)
```

- **叶子节点**：对每笔交易计算哈希（比特币中对交易头做双重 SHA-256）。
- **中间节点**：将左右子节点的哈希拼接后再哈希；若某层节点数为奇数，末尾节点与自己配对（比特币的做法）。
- **根节点**：唯一一层节点，即 Merkle Root，写入区块头。

## 为什么区块链需要 Merkle 树

1. **完整性聚合**：区块头只需 32 字节的 Merkle Root，任何一笔交易被篡改都会导致根值变化，全节点由此快速校验区块内容。
2. **轻节点验证（SPV）**：轻客户端只保存区块头。要验证某笔交易是否在区块中，无需下载全部交易，只需一条 **Merkle 路径**（该交易到根沿途的兄弟哈希，约 $log_2(N)$ 个），即可重算出根值与区块头比对。一万个交易的区块，证明只需约 14 个哈希。
3. **快速比对与同步**：两棵树的根相同即认为交易集合一致，这是节点间高效同步的前提。

## 代码示例

```python
import hashlib


def dhash(data: bytes) -> bytes:
    """比特币风格双重 SHA-256"""
    return hashlib.sha256(hashlib.sha256(data).digest()).digest()


def merkle_root(txids: list[bytes]) -> bytes:
    """txids: 交易哈希（小端字节序）列表，返回 Merkle 根"""
    if not txids:
        raise ValueError("no transactions")
    level = txids[:]
    while len(level) > 1:
        if len(level) % 2 == 1:          # 奇数个节点：复制末尾配对
            level.append(level[-1])
        level = [dhash(level[i] + level[i + 1]) for i in range(0, len(level), 2)]
    return level[0]


def merkle_path(txids: list[bytes], index: int) -> list[bytes]:
    """返回第 index 笔交易的 Merkle 路径（兄弟哈希列表）"""
    path, level, i = [], txids[:], index
    while len(level) > 1:
        if len(level) % 2 == 1:
            level.append(level[-1])
        sibling = i ^ 1                   # 配对伙伴
        path.append(level[sibling])
        level = [dhash(level[j] + level[j + 1]) for j in range(0, len(level), 2)]
        i //= 2
    return path


if __name__ == "__main__":
    txs = [dhash(f"tx{i}".encode()) for i in range(5)]
    root = merkle_root(txs)
    proof = merkle_path(txs, 2)

    # 用路径重算根，验证第 2 笔交易
    idx, h = 2, txs[2]
    for sibling in proof:
        h = dhash(h + sibling) if idx % 2 == 0 else dhash(sibling + h)
        idx //= 2
    print("root  :", root.hex())
    print("rehash:", h.hex(), "| valid:", h == root)
    print("proof :", [x.hex()[:12] for x in proof])
```

> 演示中为保持配对顺序做了简化；真实实现（如 Bitcoin Core）在重算路径时按原始索引的左右位置决定拼接顺序，`i` 为偶数时当前节点在左，否则在右。

## 变体

- **Merkle Patricia Trie**：以太坊状态树，键值对形式，支持单键证明与增量更新，用于世界状态与存储。
- **Merkle Mountain Range（MMR）**：支持追加式场景（如 Portal/Bytom、Grin），无需预知叶子总数。
- **Merkle DAG**：IPFS/Posy 使用的有向无环版本，子节点可被多个父节点共享。

## 小结

Merkle 树把"信任全部数据"压缩为"信任一个根哈希"，是区块链实现轻量验证、跨节点同步与各类证明（SPV、状态证明、跨链证明）的公共底座。
