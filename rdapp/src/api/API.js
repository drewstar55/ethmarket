import * as Web3 from 'web3';

import { getMarketInstance as marketContract, getStoreInstance as storeContract } from '../Util';

const obj = {
    checkAccess: async function (username) {
        try {
            let access = await (await marketContract()).checkAccess(username);
            return {
                success: true,
                data: access
            };
        } catch (error) {
            return {
                success: false,
                data: error
            }
        }
    },

    checkBalance: async function (username) {
        try {
            var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
            let balance = await web3.eth.getBalance(username);
            return {
                success: true,
                data: web3.utils.fromWei(balance, 'ether')
            };
        }
        catch (error) {
            return {
                success: false,
                data: error
            }
        }
    },

    createAdminUser: async function (accnt, superAdmin) {
        try {
            let info = await (await marketContract()).createAdminUser(accnt, { from: superAdmin });
            return {
                success: true,
                data: info
            };
        } catch (error) {
            return {
                success: false,
                data: error
            }
        }
    },

    getAdmins: async function () {
        try {
            let info = await (await marketContract()).getAdminUsers();
            return {
                success: true,
                data: info
            };
        } catch (error) {
            return {
                success: false,
                data: error
            }
        }
    },

    createStoreOwner: async function (storeOwnerAcc, adminAcc) {
        try {
            let info = await (await marketContract()).createStoreOwner(storeOwnerAcc, { from: adminAcc });
            return {
                success: true,
                data: info
            };
        } catch (error) {
            return {
                success: false,
                data: error
            }
        }
    },

    createStore: async function (name, desc, storeOwnerAcc) {
        try {
            let info = await (await marketContract()).createStoreFront(name, desc, { from: storeOwnerAcc });
            return {
                success: true,
                data: info
            };
        } catch (error) {
            return {
                success: false,
                data: error
            }
        }
    },

    getStores: async function getStores(storeOwnerAcc) {
        try {
            let info = await (await marketContract()).getStores(storeOwnerAcc);
            return {
                success: true,
                data: info
            };
        } catch (error) {
            return {
                success: false,
                data: error
            }
        }
    },

    getAllStores: async function () {
        try {
            let info = await (await marketContract()).getStores('');
            return {
                success: true,
                data: info
            };
        } catch (error) {
            return {
                success: false,
                data: error
            }
        }
    },

    getStoreDetails: async function (storeId) {
        try {
            let currentStore = await (await storeContract()).at(storeId);
            let info = await currentStore.getStoreDetails();
            return {
                success: true,
                data: info
            };
        } catch (error) {
            return {
                success: false,
                data: error
            }
        }
    },

    getStoreBalance: async function (storeId) {
        try {
            let currentStore = await (await storeContract()).at(storeId);
            let info = await currentStore.getBalanceOfStore();
            return {
                success: true,
                data: info
            };
        } catch (error) {
            return {
                success: false,
                data: error
            }
        }
    },

    getAllStoreOwners: async function () {
        try {
            let info = await (await marketContract()).getStoreOwners();
            return {
                success: true,
                data: info
            };
        } catch (error) {
            return {
                success: false,
                data: error
            }
        }
    },

    addProductToStore: async function (name, desc, price, qty, user, store) {
        try {
            let currentStore = await (await storeContract()).at(store);
            let info = await currentStore.addProductToTheStore(name, desc, price, qty, { from: user });
            return {
                success: true,
                data: info
            };
        } catch (error) {
            return {
                success: false,
                data: error
            }
        }
    },

    getProducts: async function (storeId) {
        try {
            let currentStore = await (await storeContract()).at(storeId);
            let info = await currentStore.getProducts(false);
            return {
                success: true,
                data: info
            };
        } catch (error) {
            return {
                success: false,
                data: error
            }
        }
    },

    getProductDetails: async function (storeId, productId) {
        try {
            let currentStore = await (await storeContract()).at(storeId);
            let productDetails = await currentStore.getProductDetails(productId);
            return {
                success: true,
                data: productDetails
            };
        }
        catch (error) {
            return {
                success: false,
                data: error
            }
        }
    },

    buyProduct: async function (store, productId, user, qty) {
        try {
            let currentStore = await (await storeContract()).at(store);
            let productDetails = await currentStore.getProductDetails(productId);
            let info = await currentStore.buyProductFromStore(productId, qty, { from: user, gas: 2200000, value: qty * productDetails[2].toNumber() });
            return {
                success: true,
                data: info
            };
        } catch (error) {
            return {
                success: false,
                data: error
            }
        }
    },

    updateProduct: async function (store, productId, user, qty, price) {
        try {
            let currentStore = await (await storeContract()).at(store);
            let productDetails = await currentStore.getProductDetails(productId);
            let info = await currentStore.updateProduct(
                productId,
                productDetails[0],
                productDetails[1],
                price,
                qty,
                { from: user, gas: 2200000 });
            return {
                success: true,
                data: info
            };
        } catch (error) {
            return {
                success: false,
                data: error
            }
        }
    },

    removeProduct: async function (store, productId, user) {
        try {
            let currentStore = await (await storeContract()).at(store);
            let info = await currentStore.removeProduct(
                productId,
                { from: user, gas: 2200000 });
            return {
                success: true,
                data: info
            };
        } catch (error) {
            return {
                success: false,
                data: error
            }
        }
    },

    reactivateProduct: async function (store, productId, user) {
        try {
            let currentStore = await (await storeContract()).at(store);
            let info = await currentStore.reActivateProduct(
                productId,
                { from: user, gas: 2200000 });
            return {
                success: true,
                data: info
            };
        } catch (error) {
            return {
                success: false,
                data: error
            }
        }
    },

    withdrawfund: async function (store, user, amt) {
        try {
            let currentStore = await (await storeContract()).at(store);
            let info = await currentStore.withdrawFund(
                amt,
                { from: user });
            return {
                success: true,
                data: info
            };
        } catch (error) {
            return {
                success: false,
                data: error
            }
        }
    }
}
export default obj;