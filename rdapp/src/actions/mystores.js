import { getAccountBalance } from './login';
import API from '../api/API.js';
import { success, error } from 'react-notification-system-redux';
import * as Web3 from 'web3';
import { getProducts } from './stores';

var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));

export function getMyStoreData() {
    return async (dispatch, getState) => {
        let username = getState().login.loginDetails.username;
        let response = await API.getStores(username);
        if (response.success) {
            let newArr = await response.data.map(async item => {
                let response = await API.getStoreDetails(item);
                response.data.push(item);
                return response.data
            });
            Promise.all(newArr).then(data => dispatch({ type: 'GET_MY_STORE_DATA', data: data }));
        } else {
            console.log(response.data);
        }
    }
}

export function saveMyStore(data) {
    return async (dispatch, getState) => {
        let user = getState().login.loginDetails.username;
        let response = await API.createStore(data.newMyStore, data.description, user);
        if (response.success) {
            setTimeout(() => {
                dispatch(getMyStoreData());
                dispatch(success({
                    title: 'Success',
                    message: 'Store created Successfully',
                    position: 'tc',
                    autoDismiss: 2
                }));
            }, 5000);
        } else {
            console.log(response.data);
            dispatch(error({
                title: 'Error',
                message: 'Something went wrong when creating the Store.',
                position: 'tc',
                autoDismiss: 2
            }));
        }
    }
}

export function updateStoreBalance(data) {
    return async (dispatch, getState) => {
        let weiBalance = web3.utils.toWei(data.balance, 'ether');
        let response = await API.withdrawfund(data.selectedStore,
            getState().login.loginDetails.username,
            weiBalance);
        if (response.success) {
            setTimeout(() => {
                dispatch(getSelectedStoreDetails(data.selectedStore));
                dispatch(getAccountBalance());
                dispatch(success({
                    title: 'Success',
                    message: 'Balance withdrawl Successful',
                    position: 'tc',
                    autoDismiss: 2
                }));
            }, 5000);
        } else {
            console.log(response.data);
            dispatch(error({
                title: 'Error',
                message: 'Something went wrong during transaction',
                position: 'tc',
                autoDismiss: 2
            }));
        }
    }
}

export function addProduct(data) {
    return async (dispatch, getState) => {
        let convPrice = web3.utils.toWei(data.price, 'ether');
        let response = await API.addProductToStore(data.name,
            data.desc,
            convPrice,
            data.qty,
            getState().login.loginDetails.username,
            data.currentStore
        );
        if (response.success) {
            setTimeout(() => {
                dispatch(getMyStoreData());
                dispatch(getProducts(data.currentStore));
                dispatch(success({
                    title: 'Success',
                    message: 'Product added Successfully',
                    position: 'tc',
                    autoDismiss: 2
                }));
            }, 5000);
        } else {
            console.log(response.data);
            dispatch(error({
                title: 'Error',
                message: 'Something went wrong when adding the Product.',
                position: 'tc',
                autoDismiss: 2
            }));
        }
    }
}

export function getSelectedStoreDetails(store) {
    return async (dispatch, getState) => {
        let storeDetailsres = await API.getStoreDetails(store);
        let storeBalance = await API.getStoreBalance(store);
        let balance = storeBalance.data.toNumber().toString();
        let storeBal = web3.utils.fromWei(balance, 'ether');
        storeDetailsres.data.push(store);
        storeDetailsres.data.push(storeBal);
        dispatch({ type: 'GET_SELECTED_STORE_DETAILS', data: storeDetailsres.data })
    }
}

export function removeSelectedMyStore() {
    return async (dispatch, getState) => {
        dispatch({ type: 'GET_SELECTED_STORE_DETAILS', data: [] })
    }
}

export function removeMyStores() {
    return async (dispatch, getState) => {
        dispatch({ type: 'GET_MY_STORE_DATA', data: [] })
    }
}