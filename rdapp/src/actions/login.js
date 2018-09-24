import API from '../api/API.js';
import { error } from 'react-notification-system-redux';

export function loginUserRequest(username, pushItem) {
	return async (dispatch, getState) => {
		let response = await API.checkAccess(username);
		if (response.success) {
			let userrole = response.data;
			var userRoute = [];
			userrole.map((item, index) => { if (item) { return userRoute.push(index + 1) } return null });
			var userRoutes,addr;
			switch (userRoute[0]) {
				case 1:
					userRoutes = [0, 1, 3];
					addr = '/admin';
					break;
				case 2:
					userRoutes = userRoute[1] ? [1, 2, 3] : [1, 3];
					addr = '/storeowners'
					break;
				case 3:
					userRoutes = [2, 3];
					addr = '/mystores'
					break;
				default:
					userRoutes = [3];
					addr = '/stores'
			}
			dispatch({
				type: 'SAVE_LOGIN_DETAILS', data: {
					username: username,
					userRoute: userRoutes,
					balance: 0,
					success: true
				}
			});
			pushItem(addr);
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

export function getAccountBalance() {
	return async (dispatch, getState) => {
		let response = await API.checkBalance(getState().login.loginDetails.username);
		if (response.success) {
			var newDetails = { ...getState().login.loginDetails, balance: response.data };
			dispatch({ type: 'UPDATE_USER_DETAILS', data: newDetails });
		} else {
			console.log(response.data);
		}
	}
}