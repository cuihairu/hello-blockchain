# Finney Attack

The Finney Attack is an attack method against blockchains, particularly the Bitcoin network, described by Bitcoin pioneer Hal Finney. This attack requires the following conditions:

1. **The attacker controls a mining pool**: The attacker needs to have enough hash power to be able to find a block.
2. **The merchant accepts unconfirmed transactions**: The merchant needs to accept the transaction before it is confirmed. For example, the merchant provides goods or services immediately after receiving a transaction, without waiting for the transaction to be confirmed on the blockchain.

### Attack Steps

1. **The attacker generates a transaction**: The attacker generates a payment transaction A to themselves, but does not broadcast this transaction to the network. At this point, transaction A remains under the attacker's control.
2. **The miner mines a block**: Building on transaction A, the attacker continues mining. When the attacker successfully mines a block, they include transaction A in this block, but do not immediately broadcast the block.
3. **Generate and send another transaction**: The attacker generates another transaction B, which is a payment to the merchant, and broadcasts it to the Bitcoin network. At this point, the merchant can choose to provide goods or services upon seeing transaction B.
4. **Broadcast the block containing transaction A**: After the merchant provides goods or services, the attacker immediately broadcasts the previously mined block containing transaction A. At this point, transaction A is added to the blockchain, and transaction B is considered an invalid double spend because it uses the same input.

### Conditions for Attack Success

- **The attacker must have a certain amount of hash power**: Although the attacker does not need to control most of the network's hash power like in a 51% attack, they still need a certain amount of hash power to ensure they can find a block.
- **The merchant accepts unconfirmed transactions**: If the merchant always waits for a transaction to be confirmed, the Finney Attack cannot succeed.

### Defensive Measures

1. **Waiting for transaction confirmation**: The simplest and most effective defensive measure is to wait for the transaction to be confirmed by the blockchain network (usually at least 6 confirmations), especially for large transactions.
2. **Reducing the handling of unconfirmed transactions**: The merchant can choose to reduce or avoid providing goods or services immediately upon receiving an unconfirmed transaction.
3. **Increasing monitoring mechanisms**: The merchant can use blockchain monitoring tools to stay informed about unconfirmed transactions and double spend transactions appearing in the network.

### Example

The following is a simple Bitcoin transaction example used to illustrate the concept of the Finney Attack (not actual code):

```python
# Assume we have a function for creating transactions
def create_transaction(sender, recipient, amount):
    # Generate a new transaction
    transaction = {
        'sender': sender,
        'recipient': recipient,
        'amount': amount,
        'timestamp': time.time(),
        'hash': generate_hash(sender, recipient, amount)
    }
    return transaction

# Generate transaction A (the attacker themselves)
transaction_A = create_transaction('attacker', 'attacker', 10)

# The attacker starts mining until a block containing transaction A is found
block = mine_block(transaction_A)

# Generate transaction B (payment to the merchant)
transaction_B = create_transaction('attacker', 'merchant', 10)

# Broadcast transaction B to the network
broadcast_transaction(transaction_B)

# The merchant sees transaction B and provides goods or services

# The attacker immediately broadcasts the block containing transaction A
broadcast_block(block)
```

The example above illustrates the basic principles of the Finney Attack, but please note that the actual implementation of the attack is more complex. Merchants should take appropriate defensive measures to protect themselves from the effects of such attacks.
