import * as crypt from 'crypto';

class Block {

    nounce = Math.round(Math.random() * 999999999)

    constructor(prevHash, Transaction) {
        this.prevHash = prevHash;
        this.transaction = Transaction;
        this.timestamp = Date.now();
    }

    hash() {
        const string = JSON.stringify(this);
        const hashing = crypt.createHash('sha256');
        hashing.update(string).end();
        return hashing.digest('hex');
    }
}

export default Block;