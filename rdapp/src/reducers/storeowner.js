// import mockData from '../mockdata/storeowner.json';

const initialState = { storeData:[] }
export default function storeowner(state = initialState, action) {
  
  switch (action.type) {

    case 'GET_STORE_OWNER_DATA' :
        return {...state, storeData: action.data};

    default:
      return state;
  }

}
