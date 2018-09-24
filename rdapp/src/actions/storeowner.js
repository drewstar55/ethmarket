import API from '../api/API.js';
import { success, error } from 'react-notification-system-redux';

export function getStoreOwnerData() {
    return async (dispatch, getState) => {
        let response = await API.getAllStoreOwners();
        if (response.success) {
            dispatch({ type: 'GET_STORE_OWNER_DATA', data: response.data });
        } else {
            console.log(response.data);
        }
    }
}

export function saveStoreOwner(data) {
    return async (dispatch, getState) => {
        let response = await API.createStoreOwner(data.newStoreOwner, getState().login.loginDetails.username);
        if (response.success) {
            setTimeout(() => {
                dispatch(getStoreOwnerData());
                dispatch(success({
                    title: 'Success',
                    message: 'Store Owner Created Successfully',
                    position: 'tc',
                    autoDismiss: 2
                }));
            }, 5000);
        } else {
            console.log(response.data);
            dispatch(error({
                title: 'Error',
                message: 'Something went wrong when creating Store Owner',
                position: 'tc',
                autoDismiss: 2
            }));
        }
    }
}

export function removeStoreOwners() {
    return async (dispatch, getState) => {
        dispatch({ type: 'GET_STORE_OWNER_DATA', data: [] });
    }
}