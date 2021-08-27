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
          case 'reload_true':
          return {
            ...state,
            data: payload,
            isLoad:true
          };
          case 'reload_false':
          return {
            ...state,
            data: payload,
            isLoad:false
          };
          case 'true':
            return {
              ...state,
              count:1,
              data: payload,
              check:true,
            };
            case 'false':
              return {
                ...state,
                count:1,
                data: payload,
                check:false,
              };
        default:
          return state;
      }
}
export default auth;