import * as Web3 from 'web3';
import * as TruffleContract from 'truffle-contract';

let marketPlaceJson = require('./assets/MarketPlace.json');
let storeJson = require('./assets/Store.json');

var web3Provider;

var marketInstance;

(function(){
    if (typeof window.web3 !== 'undefined') {
        web3Provider = window.web3.currentProvider;
        window.web3 = new Web3(web3Provider);
      } else {
        web3Provider = new Web3.providers.HttpProvider("http://localhost:8545");
        window.web3 = new Web3(web3Provider);
      }
}());

async function marketContract() {
    let contract = TruffleContract(marketPlaceJson);
    contract.setProvider(web3Provider);
    if (typeof contract.currentProvider.sendAsync !== "function") {
        contract.currentProvider.sendAsync = function () {
            return contract.currentProvider.send.apply(
                contract.currentProvider, arguments
            );
        };
    }
    marketInstance = await contract.deployed();
    return marketInstance;
}

export async function getContract() {
    let contract = TruffleContract(marketPlaceJson);
    contract.setProvider(web3Provider);
    if (typeof contract.currentProvider.sendAsync !== "function") {
        contract.currentProvider.sendAsync = function () {
            return contract.currentProvider.send.apply(
                contract.currentProvider, arguments
            );
        };
    }

    return contract;
}

export async function getStoreInstance() {
    let contract = TruffleContract(storeJson);
    contract.setProvider(web3Provider);
    return contract;
}

export async function getMarketInstance() {
    if (marketInstance) {
        return marketInstance;
    }
    else {
        await marketContract();
        return marketInstance;
    }
}
