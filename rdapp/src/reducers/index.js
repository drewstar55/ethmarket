import { combineReducers } from 'redux';
import login from './login';
import admin from './admin';
import storeowner from './storeowner.js';
import stores from './stores.js';
import mystores from './mystores.js'
import {reducer as notifications} from 'react-notification-system-redux';
const reducers = combineReducers(
    {
        admin,
        login,
        storeowner,
        stores,
        mystores,
        notifications
    });

export default reducers;