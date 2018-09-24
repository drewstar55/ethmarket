let initialState = {
		loginDetails: {},
		forgotPassword: {}
}
export default function login( state=initialState , action) {
  
  switch (action.type) {
    case 'SAVE_LOGIN_DETAILS' :
        return {...state, loginDetails: action.data } ;
    // case 'GET_FORGOT_PASSWORD' :
    //     return { ...state, forgotPassword : action.data };
    case 'UPDATE_USER_DETAILS' : 
        return {...state, loginDetails: action.data } ;
    default:
      return state;
  }

}