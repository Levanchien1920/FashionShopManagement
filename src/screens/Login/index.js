
import {useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {useContext} from 'react';
import LoginComponent from '../../components/Login';
import loginUser from '../../context/actions/auth/loginUser';
import {GlobalContext} from '../../context/Provider';
const Login = () => {

  
  const [form, setForm] = useState({});
  const {params} = useRoute();

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
      console.log("name:"+form.username);
      console.log("pass:"+form.password);
      loginUser(form)(authDispatch);
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