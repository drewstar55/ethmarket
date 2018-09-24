// import mockData from '../mockdata/stores.json';

const initialState = { storeData: [], selectedStoreProducts: [] }
export default function store(state = initialState, action) {

    switch (action.type) {

        case 'GET_STORE_DATA':
            return { ...state, storeData: action.data };

        case 'GET_STORE_PRODUCT':
            return {
                ...state,
                selectedStoreProducts: action.data
            };

        case 'REMOVE_SELECTED_STORE':
            return {
                ...state,
                selectedStoreProducts: action.data
            };
        default:
            return state;
    }

}
