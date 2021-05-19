import AsyncStorage from "@react-native-async-storage/async-storage";

const auth =(state,{type,payload}) => {
    switch (type) {
        case 'LoginSuccess':
          AsyncStorage.setItem("isLoggedIn",JSON.stringify(true));
          return {
            ...state,
            count: 0,
            data: payload,
            isLoggedIn: true,
          };
          case 'LoginFail':
          AsyncStorage.setItem("isLoggedIn",JSON.stringify(false));
          return {
            ...state,
            count: 0,
            data: payload,
            isLoggedIn: false,
          };
          case 'Review':
          return {
            ...state,
            count:1,
            data: payload,
            isLoggedIn: true,
          };
        default:
          return state;
      }
}
export default auth;