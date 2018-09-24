import API from '../api/API.js';
import { success, error } from 'react-notification-system-redux';

export function getAdminData() {
    return async (dispatch, getState) => {
        let response = await API.getAdmins();
        if (response.success) {
            dispatch({ type: 'GET_ADMIN_DATA', data: response.data });
        } else {
            console.log(response.data);
        }
    }
}

export function saveAdminData(data) {
    return async (dispatch, getState) => {
        let response = await API.createAdminUser(data.newAdmin, getState().login.loginDetails.username);
        if (response.success) {
            setTimeout(() => {
                dispatch(getAdminData());
                dispatch(success({
                    title: 'Success',
                    message: 'Admin Created Successfully',
                    position: 'tc',
                    autoDismiss: 2
                }));
            }, 5000);

        } else {
            console.log(response.data);
            dispatch(error({
                title: 'Error',
                message: 'Something went wrong when creating Admin',
                position: 'tc',
                autoDismiss: 2
            }));
        }
    }
}
