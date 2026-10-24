# Selfish Mining Attack

A Selfish Mining Attack is an attack method against Proof of Work (PoW) blockchain systems, first proposed by Eyal and Sirer in 2013. This attack exploits the differences in block propagation delays among miners, and by secretly keeping newly mined blocks, increases their relative gains.

### Basic Principles of the Selfish Mining Attack

1. **Secret mining**: After mining a new block, the selfish miner does not immediately broadcast this block to the network, but instead continues mining secretly, attempting to mine more blocks.
2. **Forking the chain**: When the selfish miner mines a second block, they have two options: continue to keep it secret, or broadcast part or all of the secret chain to the network, thereby creating a fork in the chain.
3. **Competing on propagation**: When an honest miner mines a new block and broadcasts it, the selfish miner decides whether to broadcast their secret chain based on the length of their secret chain and the state of network propagation, in order to gain an advantage in the competition between chains.
4. **Replacing the honest chain**: If the selfish miner's secret chain is accepted by other miners and becomes the longest chain, the selfish miner's blocks are accepted and the honest miners' blocks are discarded.

### Strategies of Selfish Mining

The strategies of the selfish miner depend on the length of the secret chain and the situation of honest miners mining new blocks on the network. The following are several typical strategies:

1. **When ahead by 1 block**: If the selfish miner's secret chain is only ahead by one block, the selfish miner continues secret mining. If an honest miner mines a new block, the selfish miner immediately broadcasts their secret block, creating a competition between chains.
2. **When ahead by 2 blocks**: If the selfish miner's secret chain is ahead by two blocks, the selfish miner can choose to continue secret mining, or immediately broadcast one of the blocks, thereby putting themselves in a favorable position.
3. **Choice during competition**: When an honest miner mines a new block and broadcasts it, if the length of the selfish miner's secret chain is sufficient to compete with the honest chain, the selfish miner immediately broadcasts their chain, hoping to replace the honest chain.

### Impact of Selfish Mining

- **Reduced network efficiency**: A selfish mining attack may reduce the overall efficiency of the blockchain network, because the efforts of honest miners may be discarded, leading to wasted resources.
- **Block propagation delays**: Selfish miners deliberately delay the propagation of blocks, which may increase block propagation delays on the network, thereby affecting the synchronization of the entire network.
- **Unfair incentives**: A selfish mining attack leads to unfair incentive mechanisms; selfish miners can obtain higher rewards than their actual hash power ratio through this strategy, thereby weakening the degree of decentralization of the network.

### Defensive Measures

1. **Improving the block propagation protocol**: By improving the block propagation protocol to reduce block propagation delays, the likelihood of selfish mining attacks can be reduced.
2. **Penalty strategies**: Introduce penalty mechanisms for dishonest behavior to increase the cost of selfish mining, so that it no longer has an economic advantage.
3. **Improving the consensus mechanism**: Explore and introduce more complex and sound consensus mechanisms, such as Proof of Stake (PoS) or other hybrid consensus mechanisms, to reduce the effectiveness of selfish mining attacks.

### Example

The following is a simplified example of a selfish mining attack illustrating the basic strategy of a selfish miner (not actual code):

```python
import hashlib
import time

class Blockchain:
    def __init__(self):
        self.chain = [self.create_genesis_block()]
        self.pending_blocks = []

    def create_genesis_block(self):
        return Block(0, "0", time.time(), "Genesis Block", "0")

    def get_latest_block(self):
        return self.chain[-1]

    def add_block(self, new_block):
        new_block.previous_hash = self.get_latest_block().hash
        new_block.hash = new_block.calculate_hash()
        self.chain.append(new_block)

    def add_pending_block(self, block):
        self.pending_blocks.append(block)

    def resolve_conflicts(self):
        # Simplified conflict resolution strategy: choose the longest chain
        if len(self.pending_blocks) > len(self.chain):
            self.chain = self.pending_blocks

class Block:
    def __init__(self, index, previous_hash, timestamp, data, hash):
        self.index = index
        self.previous_hash = previous_hash
        self.timestamp = timestamp
        self.data = data
        self.hash = hash

    def calculate_hash(self):
        return hashlib.sha256((str(self.index) + self.previous_hash + str(self.timestamp) + self.data).encode()).hexdigest()

# Create the blockchain
blockchain = Blockchain()

# Mining behavior of the selfish miner and the honest miner
def mine_blocks(blockchain, miner_type):
    if miner_type == "selfish":
        secret_chain = [blockchain.get_latest_block()]
        while True:
            new_block = Block(len(secret_chain), secret_chain[-1].hash, time.time(), "Selfish Block", "")
            new_block.hash = new_block.calculate_hash()
            secret_chain.append(new_block)
            if len(secret_chain) > len(blockchain.chain) + 1:
                blockchain.add_pending_block(secret_chain[-1])
    else:
        while True:
            new_block = Block(len(blockchain.chain), blockchain.get_latest_block().hash, time.time(), "Honest Block", "")
            new_block.hash = new_block.calculate_hash()
            blockchain.add_block(new_block)
            break

# The honest miner mines
mine_blocks(blockchain, "honest")

# The selfish miner mines
mine_blocks(blockchain, "selfish")

# Resolve conflicts by choosing the longest chain
blockchain.resolve_conflicts()

print("Blockchain is now:")
for block in blockchain.chain:
    print(f"Block {block.index}: {block.data}")
```

This example demonstrates how the selfish miner increases their relative gains by mining secretly and publishing blocks at an appropriate time. A real selfish mining attack is more complex, but the example provides a basic framework for understanding.
