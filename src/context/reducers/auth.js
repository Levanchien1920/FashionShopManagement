const auth =(state,{type,payload}) => {
    switch (type) {
        case 'start':
        case REGISTER_LOADING:
          return {
            ...state,
            loading: true,
          };
    
        case REGISTER_SUCCESS:
          return {
            ...state,
            loading: false,
            data: payload,
          };
    
        case 'LoginSuccess':
          return {
            ...state,
            loading: false,
            data: payload,
            isLoggedIn: true,
          };
    
        case LOGOUT_USER:
          return {
            ...state,
            loading: false,
            data: null,
            isLoggedIn: false,
          };
    
        case REGISTER_FAIL:
        case LOGIN_FAIL:
          return {
            ...state,
            loading: false,
            error: payload,
          };
    
        case CLEAR_AUTH_STATE:
          return {
            ...state,
            loading: false,
            data: null,
            error: null,
          };
    
        default:
          return state;
      }
}