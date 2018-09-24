const initialState = { storeList: [], selectedMyStoreDetails:[] }
export default function store(state = initialState, action) {

    switch (action.type) {

        case 'GET_MY_STORE_DATA':
            return { ...state, storeList: action.data };

        case 'GET_SELECTED_STORE_DETAILS':
            return {
                ...state,
                selectedMyStoreDetails:action.data
            }
        default:
            return state;
    }

}