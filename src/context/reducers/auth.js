const auth =(state,{type,payload}) => {
    switch (type) {
        case 'LoginSuccess':
          return {
            ...state,
            loading: false,
            data: payload,
            isLoggedIn: true,
          };
    
        default:
          return state;
      }
}
export default auth;