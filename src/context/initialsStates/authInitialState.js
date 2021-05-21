import AsyncStorage from "@react-native-async-storage/async-storage";

export default {
    // isLoggedIn: false ||  AsyncStorage.getItem('isLoggedIn', (err, result) => {
    //   if(err) return
    //   return result
    // }),
    isLoggedIn:false,
    data: {},
    error: null,
    loading: false,
  };
