const auth =(state,{type,payload}) => {
    switch (type) {
        case 'LoginSuccess':
          return {
            ...state,
            loading: false,
            data: payload,
            isLoggedIn: true,
          };
          case 'LoginFail':
          return {
            ...state,
            loading: false,
            data: payload,
            isLoggedIn: false,
          };
    
        default:
          return state;
      }
}
export default auth;