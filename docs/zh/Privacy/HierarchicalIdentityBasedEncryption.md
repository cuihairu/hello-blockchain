# 层级身份加密（HIBE）

层级身份加密（Hierarchical Identity-Based Encryption, HIBE）是一种基于身份的加密机制的扩展，允许基于层级结构的身份进行加密和解密。在 HIBE 中，根密钥生成中心（Root PKG）只需签发一次层级主密钥，各级实体即可自行派生下一级子密钥，无需根中心参与。这种"一次初始化、逐级授权"的结构在分布式系统和联盟区块链的密钥管理中具有很高的灵活性和安全性。

## HIBE 介绍

HIBE 的主要优点包括：

1. **灵活的密钥管理**：通过层级结构，可以根据需要生成不同层级的子密钥，从而简化密钥管理。
2. **减少信任中心的负担**：每个子密钥生成者可以自己生成下一级的密钥，而不需要根 PKG 的参与。
3. **高效的密钥分发**：在层级结构中，密钥分发更加高效，因为每个节点可以管理自己子节点的密钥。
4. **身份即公钥**：加密时只需知道接收者的层级身份字符串（如 `org/department/alice`），无需事先交换证书。

## 基本原理

经典 HIBE 方案（如 Gentry–Silverberg、BBG）基于双线性对（Pairing）构造：身份被组织成向量 $(ID_1, ID_2, \dots, ID_t)$，子密钥由父密钥与身份分量共同计算得出，密码学上保证了"没有父密钥就无法派生子密钥"。其工作流程可以概括为：

1. **系统初始化**：根 PKG 生成主公钥和主密钥。
2. **层级密钥派生**：一级实体用主密钥为自己的身份分量生成私钥；二级实体再由一级实体的私钥派生，以此类推。
3. **加密**：发送方使用接收方的层级身份和主公钥进行加密。
4. **解密**：接收方使用自己的层级私钥解密。

## 教学演示：层级密钥派生 + 加密

完整的双线性对实现超出本文范围。下面的演示用 **HKDF 链式派生**模拟层级密钥结构——子密钥由"父密钥材料 + 身份分量"经 KDF 派生（不等于父密钥，也无需根中心参与），数据加密使用 AES-GCM。它体现 HIBE 的"层级授权"形态，但不具备真实 HIBE 基于身份的加密语义（加密仍需拿到派生出的对称密钥的封装）。

### 安装依赖

```bash
pip install cryptography
```

### Python 实现

```python
import os
import hashlib
import hmac
from cryptography.hazmat.primitives.ciphers.aead import AESGCM


def hkdf_chain(parent_secret: bytes, identity: str, length: int = 32) -> bytes:
    """由父密钥材料与身份分量派生子密钥（HKDF-Extract + Expand 简化版）"""
    prk = hmac.new(parent_secret, identity.encode(), hashlib.sha256).digest()
    okm = hmac.new(prk, b"hibe-key-derivation" + b"\x01", hashlib.sha256).digest()
    return okm[:length]


class PKG:
    """根密钥生成中心：只初始化一次主密钥"""

    def __init__(self):
        self.master_secret = os.urandom(32)

    def derive_key(self, identity_path: list[str]) -> bytes:
        """沿身份链逐级派生对称密钥，如 ["org", "dept", "alice"]"""
        key = self.master_secret
        for component in identity_path:
            key = hkdf_chain(key, component)
        return key


class User:
    """层级中的实体：持有自己层级的密钥材料，可自行派生子密钥"""

    def __init__(self, identity_path: list[str], key_material: bytes):
        self.identity_path = identity_path
        self.key_material = key_material

    def derive_child(self, sub_identity: str) -> "User":
        return User(self.identity_path + [sub_identity],
                    hkdf_chain(self.key_material, sub_identity))

    def encrypt(self, plaintext: bytes, child: "User") -> bytes:
        aes = AESGCM(child.key_material)
        nonce = os.urandom(12)
        return nonce + aes.encrypt(nonce, plaintext, "/".join(child.identity_path).encode())

    def decrypt(self, ciphertext: bytes) -> bytes:
        aes = AESGCM(self.key_material)
        nonce, body = ciphertext[:12], ciphertext[12:]
        aad = "/".join(self.identity_path).encode()
        return aes.decrypt(nonce, body, aad)


# 根 PKG 初始化（只需一次）
pkg = PKG()

# 一级实体 org 从主密钥获得密钥材料
org = User(["org"], pkg.derive_key(["org"]))

# org 自行派生二级实体 dept、dept 再派生 alice —— 根中心不再参与
alice = org.derive_child("dept").derive_child("alice")

# 用 alice 的层级身份加密：只有沿同一路径派生出的密钥能解密
plaintext = b"Hello, hierarchical key management!"
ciphertext = org.encrypt(plaintext, alice)
print("Decrypted:", alice.decrypt(ciphertext).decode())

# 冒充路径无法解密：密钥材料不同，GCM 校验将失败
mallory = User(["org", "dept2", "alice"], pkg.derive_key(["org", "dept2", "alice"]))
try:
    mallory.decrypt(ciphertext)
except Exception:
    print("Different identity path cannot decrypt (expected).")
```

### Go 实现

```go
package main

import (
	"crypto/aes"
	"crypto/cipher"
	"crypto/hmac"
	"crypto/rand"
	"crypto/sha256"
	"fmt"
	"strings"
)

// hkdfChain 由父密钥材料与身份分量派生子密钥
func hkdfChain(parentSecret []byte, identity string) []byte {
	mac := hmac.New(sha256.New, parentSecret)
	mac.Write([]byte(identity))
	prk := mac.Sum(nil)

	out := hmac.New(sha256.New, prk)
	out.Write([]byte("hibe-key-derivation\x01"))
	return out.Sum(nil)[:32]
}

// User 表示层级中的一个实体
type User struct {
	path        []string
	keyMaterial []byte
}

func newUser(path []string, material []byte) *User {
	return &User{path: path, keyMaterial: material}
}

// DeriveChild 由当前实体派生子实体（无需根 PKG 参与）
func (u *User) DeriveChild(subIdentity string) *User {
	childPath := append(append([]string{}, u.path...), subIdentity)
	return newUser(childPath, hkdfChain(u.keyMaterial, subIdentity))
}

// Encrypt 用子实体的派生密钥加密，身份路径作为 AAD 绑定
func (u *User) Encrypt(plaintext []byte, child *User) ([]byte, error) {
	block, err := aes.NewCipher(child.keyMaterial)
	if err != nil {
		return nil, err
	}
	gcm, err := cipher.NewGCM(block)
	if err != nil {
		return nil, err
	}
	nonce := make([]byte, gcm.NonceSize())
	if _, err := rand.Read(nonce); err != nil {
		return nil, err
	}
	aad := []byte(strings.Join(child.path, "/"))
	return gcm.Seal(nonce, nonce, plaintext, aad), nil
}

// Decrypt 用自己的派生密钥解密
func (u *User) Decrypt(ciphertext []byte) ([]byte, error) {
	block, err := aes.NewCipher(u.keyMaterial)
	if err != nil {
		return nil, err
	}
	gcm, err := cipher.NewGCM(block)
	if err != nil {
		return nil, err
	}
	ns := gcm.NonceSize()
	nonce, body := ciphertext[:ns], ciphertext[ns:]
	return gcm.Open(nil, nonce, body, []byte(strings.Join(u.path, "/")))
}

func main() {
	// 根密钥生成中心：只生成一次主密钥
	master := make([]byte, 32)
	if _, err := rand.Read(master); err != nil {
		panic(err)
	}

	// 一级实体，之后逐级自行派生
	org := newUser([]string{"org"}, hkdfChain(master, "org"))
	alice := org.DeriveChild("dept").DeriveChild("alice")

	plaintext := []byte("Hello, hierarchical key management!")
	ciphertext, err := org.Encrypt(plaintext, alice)
	if err != nil {
		panic(err)
	}

	decrypted, err := alice.Decrypt(ciphertext)
	if err != nil {
		panic(err)
	}
	fmt.Println("Decrypted:", string(decrypted))
}
```

### 解释

1. **PKG / 主密钥**：根中心只初始化一次主密钥材料，之后不再参与子密钥分发。
2. **hkdf_chain**：子密钥 = HKDF(父密钥材料, 身份分量)，体现"层级授权、逐级派生"；不同身份路径派生出完全不同的密钥。
3. **AAD 绑定身份**：加密时将身份路径作为附加认证数据，防止用其他路径的密文张冠李戴。
4. **真实 HIBE 的差异**：真实的 HIBE（Gentry–Silverberg、BBG 等）基于双线性对，支持"用层级身份字符串直接加密"，而本演示需要在加密前拿到按同一路径派生的对称密钥封装；它与门限撤销、前向安全等 HIBE 特性也不可混同。在区块链场景中，这类层级派生常用于 HD 钱包（BIP 32）与联盟链的分级权限管理。
