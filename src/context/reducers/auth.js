import AsyncStorage from "@react-native-async-storage/async-storage";

const auth =(state,{type,payload}) => {
    switch (type) {
        case 'LoginSuccess':
          AsyncStorage.setItem("isLoggedIn",JSON.stringify(true));
          return {
            ...state,
            loading: false,
            data: payload,
            isLoggedIn: true,
          };
          case 'LoginFail':
          AsyncStorage.setItem("isLoggedIn",JSON.stringify(false));
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