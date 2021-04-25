
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import RegisterComponent from '../../components/Signup';
import {useNavigation } from '@react-navigation/native';
import {useFocusEffect} from '@react-navigation/native';
import {GlobalContext} from '../../context/Provider';
import {useContext} from 'react';
import axios from 'axios';

const Register = () => {
    
    const [form, setForm] = useState({});
    const {navigate} = useNavigation();
    const [errors, setErrors] = useState({});
    const {
      authDispatch,
      authState: {error, loading, data},
    } = useContext(GlobalContext);
  
  
    const onChange = ({name, value}) => {
      setForm({...form, [name]: value});
    }

    const onSubmit = () => {
      
          const register= {
            "username": form.username,
            "password": form.password,
            "fullname": form.fullname,
            "address": form.address,
            "email": form.email,
            "phone_number": form.phonenumber
        }
        console.log(register);
    
        axios.post("http://localhost:9090/api/v1/customer", register).then((response)=> {
          navigate('LogIn');
          
      }).catch((error) =>{
          // setErrorMessage(error.response.data.message);
          console.log(error);
          console.log("fail");
      });
    }

    
  
    return (
        <RegisterComponent
      onSubmit={onSubmit}
      onChange={onChange}
      form={form}
      errors={errors}
      error={error}
      loading={loading}
    />
    );
    }
export default Register;