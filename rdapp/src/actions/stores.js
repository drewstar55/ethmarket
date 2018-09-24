
import API from '../api/API.js';
import { getAccountBalance } from './login';
import { success, error } from 'react-notification-system-redux';
import * as Web3 from 'web3';

var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'));

export function getStoreData() {
    return async (dispatch, getState) => {
        let username = getState().login.loginDetails.username.toLowerCase();
        let response = await API.getAllStores();
        if (response.success) {
            let stores = response.data.map(async (item) => {
                let response = await API.getStoreDetails(item);
                response.data.push(item);
                return response.data;
            })
            Promise.all(stores).then(data => dispatch({ type: 'GET_STORE_DATA', data: data.filter(item => item[0] !== username) }))
        } else {
            console.log(response.data);
        }
    }
}


export function getProducts(store) {
    return async (dispatch, getState) => {
        let response = await API.getProducts(store);
        if (response.success) {
            let products = await response.data.map(async item => {
                let response = await API.getProductDetails(store, item.toNumber());
                let price = (response.data[2]).toNumber().toString();
                response.data[2] = await web3.utils.fromWei(price, 'ether');
                response.data.push(item.toNumber());
                return response.data.map(item => typeof (item) === "object" ? item.toNumber() : item)
            });
            Promise.all(products).then(data => dispatch({ type: 'GET_STORE_PRODUCT', data: data }));
        } else {
            console.log(response.data);
        }
    }
}

export function buyProduct(data) {
    return async (dispatch, getState) => {
        let response = await API.buyProduct(data.selectedStore, data.productId, getState().login.loginDetails.username, data.quantity);
        if (response.success) {
            setTimeout(() => {
                dispatch(getProducts(data.selectedStore))
                dispatch(getAccountBalance());
                dispatch(success({
                    title: 'Success',
                    message: `${data.quantity} product purchase completed. `,
                    position: 'tc',
                    autoDismiss: 2
                }));
            }, 5000);
        } else {
            console.log(response.data);
            dispatch(error({
                title: 'Error',
                message: `${response.data.message}`,
                position: 'tc',
                autoDismiss: 2
            }));
        }
    }
}

export function removeSelectedStore() {
    return (dispatch, getState) => {
        dispatch({ type: 'REMOVE_SELECTED_STORE', data: [] })
    }
}

export function removeStores() {
    return (dispatch, getState) => {
        dispatch({ type: 'GET_STORE_DATA', data: [] })
    }
}