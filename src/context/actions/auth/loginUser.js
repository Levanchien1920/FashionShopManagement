 import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

export default ({password,  username}) => (dispatch) => {

const a= {
    "username": username,
    "password": password
}

  axios.post("http://localhost:9090/api/v1/auth/loginCustomer", a).then((response)=> {
            
      
            const {token, info} = response.data;

            AsyncStorage.setItem("token", token);

            AsyncStorage.setItem("id", info.id);

            AsyncStorage.setItem("username", info.username);

            AsyncStorage.setItem("fullname", info.fullName);

            dispatch({
                        type: 'LoginSuccess',
                      });
            
        }).catch((error) =>{
            // setErrorMessage(error.response.data.message);
            console.log(error);
        });
//   axiosInstance
//     .post('auth/login', {
//         'username': username,
//         'password': password,
//     })
//     .then((res) => {
//       AsyncStorage.setItem('token', res.data.token);
//       AsyncStorage.setItem('user', JSON.stringify(res.data.user));
//       dispatch({
//         type: LOGIN_SUCCESS,
//         payload: res.data,
//       });
//     })
//     .catch((err) => {
//       dispatch({
//         type: LOGIN_FAIL,
//         payload: err.response
//           ? err.response.data
//           : {error: 'Something went wrong, try agin'},
//       });
//     });
 
};
