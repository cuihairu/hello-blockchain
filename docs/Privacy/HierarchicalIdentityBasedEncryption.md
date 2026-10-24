# Hierarchical Identity-Based Encryption (HIBE)

Hierarchical Identity-Based Encryption (HIBE) is an extension of identity-based encryption mechanisms that allows encryption and decryption based on a hierarchical identity structure. In HIBE, the root key generation center (Root PKG) only needs to issue a hierarchical master key once, after which each level of entity can derive the next level of sub-keys on its own, without the root center's involvement. This "initialize once, delegate level by level" structure offers high flexibility and security in key management for distributed systems and consortium blockchains.

## Introduction to HIBE

The main advantages of HIBE include:

1. **Flexible Key Management**: Through a hierarchical structure, sub-keys at different levels can be generated as needed, simplifying key management.
2. **Reduced Burden on Trust Centers**: Each sub-key generator can generate the next level of keys by itself, without the root PKG's involvement.
3. **Efficient Key Distribution**: In a hierarchical structure, key distribution is more efficient, because each node can manage the keys of its own child nodes.
4. **Identity as Public Key**: To encrypt, you only need to know the recipient's hierarchical identity string (such as `org/department/alice`); there is no need to exchange certificates in advance.

## Basic Principles

Classic HIBE schemes (such as Gentry–Silverberg and BBG) are built on bilinear pairings (Pairing): an identity is organized into a vector $(ID_1, ID_2, \dots, ID_t)$, a sub-key is computed jointly from the parent key and the identity components, and cryptography guarantees that "without the parent key, no sub-key can be derived." Its workflow can be summarized as follows:

1. **System Initialization**: The root PKG generates the master public key and the master secret key.
2. **Hierarchical Key Derivation**: A first-level entity uses the master secret key to generate a private key for its own identity component; a second-level entity is then derived from the first-level entity's private key, and so on.
3. **Encryption**: The sender encrypts using the recipient's hierarchical identity and the master public key.
4. **Decryption**: The recipient decrypts using their own hierarchical private key.

## Teaching Demo: Hierarchical Key Derivation + Encryption

A complete bilinear pairing implementation is beyond the scope of this article. The demo below uses **HKDF chained derivation** to simulate a hierarchical key structure — a sub-key is derived by a KDF from "parent key material + identity component" (it is not equal to the parent key, and the root center does not need to participate). Data encryption uses AES-GCM. It reflects the "hierarchical delegation" shape of HIBE, but it does not have the true identity-based encryption semantics of real HIBE (encryption still requires obtaining an encapsulation of the symmetric key derived along the same path).

### Install Dependencies

```bash
pip install cryptography
```

### Python Implementation

```python
import os
import hashlib
import hmac
from cryptography.hazmat.primitives.ciphers.aead import AESGCM


def hkdf_chain(parent_secret: bytes, identity: str, length: int = 32) -> bytes:
    """Derive a sub-key from parent key material and an identity component (simplified HKDF-Extract + Expand)"""
    prk = hmac.new(parent_secret, identity.encode(), hashlib.sha256).digest()
    okm = hmac.new(prk, b"hibe-key-derivation" + b"\x01", hashlib.sha256).digest()
    return okm[:length]


class PKG:
    """Root key generation center: initializes the master key only once"""

    def __init__(self):
        self.master_secret = os.urandom(32)

    def derive_key(self, identity_path: list[str]) -> bytes:
        """Derive a symmetric key level by level along the identity chain, e.g. ["org", "dept", "alice"]"""
        key = self.master_secret
        for component in identity_path:
            key = hkdf_chain(key, component)
        return key


class User:
    """An entity in the hierarchy: holds its own level of key material and can derive sub-keys on its own"""

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


# Root PKG initialization (only needs to happen once)
pkg = PKG()

# First-level entity org obtains key material from the master key
org = User(["org"], pkg.derive_key(["org"]))

# org derives second-level entity dept on its own, then dept derives alice — the root center no longer participates
alice = org.derive_child("dept").derive_child("alice")

# Encrypt with alice's hierarchical identity: only a key derived along the same path can decrypt
plaintext = b"Hello, hierarchical key management!"
ciphertext = org.encrypt(plaintext, alice)
print("Decrypted:", alice.decrypt(ciphertext).decode())

# Impersonating the path cannot decrypt: the key material differs, so GCM verification will fail
mallory = User(["org", "dept2", "alice"], pkg.derive_key(["org", "dept2", "alice"]))
try:
    mallory.decrypt(ciphertext)
except Exception:
    print("Different identity path cannot decrypt (expected).")
```

### Go Implementation

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

// hkdfChain derives a sub-key from parent key material and an identity component
func hkdfChain(parentSecret []byte, identity string) []byte {
	mac := hmac.New(sha256.New, parentSecret)
	mac.Write([]byte(identity))
	prk := mac.Sum(nil)

	out := hmac.New(sha256.New, prk)
	out.Write([]byte("hibe-key-derivation\x01"))
	return out.Sum(nil)[:32]
}

// User represents an entity in the hierarchy
type User struct {
	path        []string
	keyMaterial []byte
}

func newUser(path []string, material []byte) *User {
	return &User{path: path, keyMaterial: material}
}

// DeriveChild derives a child entity from the current entity (no root PKG involvement)
func (u *User) DeriveChild(subIdentity string) *User {
	childPath := append(append([]string{}, u.path...), subIdentity)
	return newUser(childPath, hkdfChain(u.keyMaterial, subIdentity))
}

// Encrypt encrypts with the child entity's derived key, binding the identity path as AAD
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

// Decrypt decrypts with the entity's own derived key
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
	// Root key generation center: generates the master key only once
	master := make([]byte, 32)
	if _, err := rand.Read(master); err != nil {
		panic(err)
	}

	// First-level entity, then derives level by level on its own
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

### Explanation

1. **PKG / Master Key**: The root center only initializes the master key material once, and does not participate in sub-key distribution thereafter.
2. **hkdf_chain**: sub-key = HKDF(parent key material, identity component), reflecting "hierarchical delegation, derive level by level"; different identity paths derive entirely different keys.
3. **Identity Bound via AAD**: At encryption time, the identity path is included as additional authenticated data, preventing ciphertexts from other paths from being passed off as one's own.
4. **Differences from Real HIBE**: Real HIBE (Gentry–Silverberg, BBG, etc.) is based on bilinear pairings and supports "encrypting directly with a hierarchical identity string," whereas this demo requires obtaining an encapsulation of the symmetric key derived along the same path before encryption; it should also not be conflated with HIBE properties such as threshold revocation and forward security. In blockchain scenarios, this kind of hierarchical derivation is commonly used in HD wallets (BIP 32) and in tiered permission management on consortium chains.
