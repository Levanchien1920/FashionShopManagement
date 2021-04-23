
import {useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {useContext} from 'react';
import LoginComponent from '../../components/Login';
import loginUser from '../../context/actions/auth/loginUser';
import {GlobalContext} from '../../context/Provider';
import {useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';

const Login = () => {

  const [form, setForm] = useState({});
  const {params} = useRoute();
  const {navigate} =useNavigation();
  React.useEffect(() => {
    if (params?.data) {
      setForm({...form, username: params.data.username});
    }
  }, [params]);

  const {
    authDispatch,
    authState: {error, loading},
  } = useContext(GlobalContext);

  const onSubmit = () => {
    if (form.username && form.password) {
      const login= {
        "username": form.username,
        "password": form.password
    }

    axios.post("http://localhost:9090/api/v1/auth/loginCustomer", login).then((response)=> {
            
      const {token, info} = response.data;

      AsyncStorage.setItem("token", token);

      AsyncStorage.setItem("id", info.id);

      AsyncStorage.setItem("username", info.username);

      AsyncStorage.setItem("fullname", info.fullName);

      authDispatch({
                  type: 'LoginSuccess',
                });

       navigate('Home');
      
  }).catch((error) =>{
      // setErrorMessage(error.response.data.message);
      console.log(error);
  });

     
    }
  };

 

  const onChange = ({name, value}) => {
    setForm({...form, [name]: value});
  };

  return (
    <LoginComponent
      onSubmit={onSubmit}
      onChange={onChange}
      form={form}
      error={error}
      loading={loading}
    />
  );
}

export default Login;