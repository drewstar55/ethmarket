
// import mockData from '../mockdata/admin.json';

const initialState = { adminData:[] }
export default function admin(state = initialState, action) {
  
  switch (action.type) {

    case 'GET_ADMIN_DATA' :
        return {...state, adminData: action.data};

    default:
      return state;
  }

}
