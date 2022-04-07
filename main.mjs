import Chain from "./Chain.mjs";
import Wallet from "./Wallet.mjs";

(function() {
    const satoshi = new Wallet();
    const bob = new Wallet();
    const alice = new Wallet();

    satoshi.sendMoney(53, bob.publicKey);
    bob.sendMoney(100, alice.publicKey);
    alice.sendMoney(10, satoshi.publicKey);

    console.log(Chain.instance)
})()