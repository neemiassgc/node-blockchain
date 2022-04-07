import * as crypt from 'crypto';
import Block from "./Block.mjs";
import Transaction from "./Transaction.mjs";

class Chain {

    static instance = new Chain();

    constructor() {
        this.blocks = [new Block(null, new Transaction(100, "Genesis", "Satoshi"))];
    }

    getLastBlock() {
        return this.blocks[this.blocks.length - 1]
    }

    addBlock(transaction, senderPublicKey, signature) {
        const verifier = crypt.createVerify('SHA256');
        verifier.update(transaction.toString());

        const isValid = verifier.verify(senderPublicKey, signature);

        if (isValid) {
            const newBlock = new Block(this.getLastBlock().hash(), transaction);
            this.mine(newBlock.nounce);
            this.blocks.push(newBlock);
        }
    }

    mine(nounce) {
        let solution = 1;
        console.log("Mining...");

        while (true) {
            const hash = crypt.createHash("md5");

            hash.update((nounce + solution).toString()).end();

            const attempt = hash.digest("hex")

            if (attempt.substring(0, 4) === "0000") {
                console.log(`Solved: ${solution}`)
                break
            }

            solution++;
        }
    }
}

export default Chain;