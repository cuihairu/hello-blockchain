# Homomorphic Encryption

Homomorphic Encryption is a cryptographic technique that allows specific computational operations to be performed directly on encrypted data without first decrypting the data. The result of the operation remains encrypted; when decrypted, it yields the same result as if the operation had been performed directly on unencrypted data. Homomorphic encryption has broad applications in privacy protection and secure computation, particularly in the fields of cloud computing and data sharing.

### Types of Homomorphic Encryption

Homomorphic encryption can be divided into the following types:

1. **Partially Homomorphic Encryption (PHE)**:
   - Allows one specific type of operation (addition or multiplication) to be performed on ciphertexts, but does not allow mixing the two operations.
   - Typical algorithms: RSA, ElGamal.

2. **Fully Homomorphic Encryption (FHE)**:
   - Allows arbitrarily complex operations to be performed on ciphertexts, including any combination of addition and multiplication.
   - Typical algorithms: Gentry's fully homomorphic encryption scheme, the BGV scheme.

3. **Somewhat Homomorphic Encryption (SWHE)**:
   - Allows a limited number of addition and multiplication operations to be performed on ciphertexts; once a certain count is exceeded, re-encryption is required.
   - It sits between PHE and FHE, and is typically used as an intermediate step toward implementing FHE.

### Applications of Homomorphic Encryption

Homomorphic encryption is significant in many applications that need to protect data privacy:

1. **Cloud Computing**:
   - Users can upload encrypted data to the cloud and perform computation on the encrypted data in the cloud, avoiding data leakage during transmission and storage.
   - For example, a user can run queries and statistical computations on an encrypted database.

2. **Data Sharing**:
   - A data owner can share encrypted data with a third party and allow the third party to operate on the data without leaking the data contents.
   - For example, medical data sharing and analysis that protects patient privacy.

3. **Privacy-Preserving Machine Learning**:
   - Train machine learning models on encrypted data, protecting data privacy and confidentiality.
   - For example, use homomorphic encryption technology to perform model training and prediction on encrypted user data.

### Example Code for Homomorphic Encryption

The following is a simplified Go example showing the basic concepts of partially homomorphic encryption:

```go
package main

import (
	"crypto/rand"
	"fmt"
	"math/big"
)

// Encryption key pair struct
type KeyPair struct {
	PublicKey  *big.Int
	PrivateKey *big.Int
	N          *big.Int
}

// Generate a key pair
func generateKeyPair(bitSize int) (*KeyPair, error) {
	p, err := rand.Prime(rand.Reader, bitSize)
	if err != nil {
		return nil, err
	}

	q, err := rand.Prime(rand.Reader, bitSize)
	if err != nil {
		return nil, err
	}

	n := new(big.Int).Mul(p, q)
	phi := new(big.Int).Mul(new(big.Int).Sub(p, big.NewInt(1)), new(big.Int).Sub(q, big.NewInt(1)))

	e := big.NewInt(65537)
	d := new(big.Int).ModInverse(e, phi)
	if d == nil {
		return nil, fmt.Errorf("no modular inverse for e")
	}

	return &KeyPair{
		PublicKey:  e,
		PrivateKey: d,
		N:          n,
	}, nil
}

// Encrypt
func encrypt(plainText *big.Int, publicKey *big.Int, n *big.Int) *big.Int {
	return new(big.Int).Exp(plainText, publicKey, n)
}

// Decrypt
func decrypt(cipherText *big.Int, privateKey *big.Int, n *big.Int) *big.Int {
	return new(big.Int).Exp(cipherText, privateKey, n)
}

// Homomorphic multiplication: multiply ciphertexts, and after decryption obtain the product of the plaintexts
func homomorphicMultiply(cipherText1 *big.Int, cipherText2 *big.Int, n *big.Int) *big.Int {
	return new(big.Int).Mod(new(big.Int).Mul(cipherText1, cipherText2), n)
}

func main() {
	keyPair, err := generateKeyPair(1024)
	if err != nil {
		fmt.Println("Error generating key pair:", err)
		return
	}

	plainText1 := big.NewInt(10)
	plainText2 := big.NewInt(20)

	cipherText1 := encrypt(plainText1, keyPair.PublicKey, keyPair.N)
	cipherText2 := encrypt(plainText2, keyPair.PublicKey, keyPair.N)

	fmt.Println("Encrypted Text 1:", cipherText1)
	fmt.Println("Encrypted Text 2:", cipherText2)

	// Homomorphic multiplication: Enc(m1) * Enc(m2) = Enc(m1 * m2)
	cipherTextProduct := homomorphicMultiply(cipherText1, cipherText2, keyPair.N)
	fmt.Println("Homomorphic Encrypted Product:", cipherTextProduct)

	// Decrypt
	decryptedProduct := decrypt(cipherTextProduct, keyPair.PrivateKey, keyPair.N)
	fmt.Println("Decrypted Product:", decryptedProduct)
}
```

In this example, we demonstrate partially homomorphic encryption based on textbook RSA: RSA has multiplicative homomorphism, that is, $Enc(m_1) \cdot Enc(m_2) \bmod n = Enc(m_1 \cdot m_2 \bmod n)$, so multiplying ciphertexts and then decrypting yields the product of the plaintexts (10 × 20 = 200). This example is a teaching demonstration and uses no padding (textbook RSA); production environments should use secure padding such as OAEP, or a dedicated homomorphic encryption scheme.

### Summary

Homomorphic encryption is a powerful cryptographic technique that can perform computational operations on encrypted data while protecting data privacy. Whether partially homomorphic or fully homomorphic, it has demonstrated enormous potential and application prospects in cloud computing, data sharing, and privacy-protecting applications. As homomorphic encryption technology continues to develop and improve, its value in practical applications will be further realized.
