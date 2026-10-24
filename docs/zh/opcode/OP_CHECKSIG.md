# OP_CHECKSIG

`OP_CHECKSIG` 是比特币 Script 中最核心的操作码之一：它从栈中取出公钥与签名，验证签名对当前交易（的指定部分）是否有效，并把布尔结果压回栈中。所有的标准支付方式——P2PK、P2PKH、P2SH、P2WPKH、P2TR——最终都建立在这个操作码之上。

## 执行语义

锁定脚本和解锁脚本拼接后，栈顶状态为（自底向上）：

```
<signature> <pubkey> OP_CHECKSIG
```

执行时：

1. 弹出栈顶 `pubkey` 与 `signature`。
2. 从当前交易的副本中**移除解锁脚本**（避免签名验证自身），并按签名哈希类型（sighash type）选取交易序列化范围，计算其双重 SHA-256 摘要（sighash）。
3. 用 `pubkey` 对 sighash 做 ECDSA（Taproot 下为 Schnorr）验证。
4. 有效则压入 `1`（真），否则压入 `0`（假）并使脚本失败——**验证失败即交易无效**，这与 `OP_EQUAL` 之类的可继续执行的假值不同。

## Sighash 类型

签名末尾的单字节声明了"这笔签名认可交易的哪些部分"：

| 类型 | 认可范围 |
| --- | --- |
| `SIGHASH_ALL`（默认） | 全部输入与全部输出 |
| `SIGHASH_NONE` | 全部输入，不承诺任何输出（可任意改收款方） |
| `SIGHASH_SINGLE` | 全部输入，仅承诺同序号的那个输出 |
| `ANYONECANPAY` 修饰位 | 只承诺当前输入，其他输入可由他人追加（常用于众筹凑款） |

## 在 P2PK 与 P2PKH 中的使用

```
P2PK  锁定:  <pubkey> OP_CHECKSIG
      解锁:  <signature>

P2PKH 锁定:  OP_DUP OP_HASH160 <pubKeyHash> OP_EQUALVERIFY OP_CHECKSIG
      解锁:  <signature> <pubkey>
```

P2PKH 中 `OP_CHECKSIG` 之前先用哈希比对确认公钥正确，公钥只在花费时才披露——这正是 P2PKH 相比 P2PK 更省空间、更保护公钥隐私的原因。

## 与 SegWit / Taproot

- **SegWit（BIP 141/143）**：见证脚本中的 `OP_CHECKSIG` 改用 BIP 143 定义的新摘要算法，把见证数据排除在 txid 之外，修复交易延展性。
- **Taproot（BIP 340/341/342）**：引入 64 字节的 Schnorr 签名与新的 `TapSighash` 摘要；`OP_CHECKSIG` 在 Tapscript 语义下验证 Schnorr 签名，支持密钥聚合与更灵活的脚本承诺。

## 注意事项

- `OP_CHECKSIG` 不是"比较两个字符串"，它验证的是**当前交易本身的签名**，所以脚本无法直接在链上做任意消息签名验证（这正是 Elements/Liquid 引入 `OP_CHECKSIGFROMSTACK` 等操作码要解决的问题）。
- BIP 66 之后，传给它的签名必须是严格 DER 编码，否则脚本立即失败。
- 签名中的 sighash 字节不参与 ECDSA 计算本体，但参与摘要构造。
