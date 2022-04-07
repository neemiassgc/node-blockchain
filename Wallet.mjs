import * as crypt from 'crypto';
import Chain from './Chain.mjs';
import Transaction from './Transaction.mjs';

class Wallet {

    constructor() {
        const keyPair = crypt.generateKeyPairSync('rsa', {
            modulusLength: 2048,
            privateKeyEncoding: {
                type: 'pkcs8',
                format: 'pem',
            },
            publicKeyEncoding: {
                type: 'spki',
                format: 'pem'
            },
        })

        this.privateKey = keyPair.privateKey;
        this.publicKey = keyPair.publicKey;
    }

    sendMoney(amount, payeePublicKey) {
        const transaction = new Transaction(amount, this.publicKey, payeePublicKey);

        const sign = crypt.createSign('SHA256');
        sign.update(transaction.toString()).end();

        const signature = sign.sign(this.privateKey);
        
        Chain.instance.addBlock(transaction, this.publicKey, signature);

    }
}

export default Wallet