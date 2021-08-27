
import React, { useEffect, useState } from 'react';
import {Alert} from 'react-native';
import RegisterComponent from '../../components/Signup';
import {useNavigation } from '@react-navigation/native';
import {GlobalContext} from '../../context/Provider';
import {useContext} from 'react';
import axiosInstance from '../../helper/axiosInstance';

const Register = () => {
  const validator = require('validator');
    const [form, setForm] = useState({});
    const {navigate} = useNavigation();
    const [errors, setErrors] = useState({});
  
    const [reType,setRetype] =useState(false)
    const [test,setTest] =useState(false)
    useEffect(()=>{
      if(test) {
          Alert.alert(`Register is fail,please try again!`)
      }
      setTest(false)
      }
    ,[test])

     useEffect(()=>{
      if(reType) {
        Alert.alert(`Password and Retype password  is not equal!!`)
    }
      setRetype(false)
  }
    ,[reType])
    const {
      authDispatch,
      authState: {error, loading, data},
    } = useContext(GlobalContext);
  
  
    const onChange = ({name, value}) => {
      setForm({...form, [name]: value});
    }

    const onSubmit = () => {
      setErrors((prev) => {
        return {...prev, username: ''};
      });

      setErrors((prev) => {
        return {...prev, fullname: ''};
      });

      setErrors((prev) => {
        return {...prev, address: ''};
      });

      setErrors((prev) => {
        return {...prev, phonenumber: ''};
      });

      setErrors((prev) => {
        return {...prev, email: ''};
      });

      setErrors((prev) => {
        return {...prev, password: ''};
      });
      setErrors((prev) => {
        return {...prev, retypepassword: ''};
      });

      if (!form.username) {
        setErrors((prev) => {
          return {...prev, username: 'Please add a username'};
        });
      }
      if (!form.fullname) {
        setErrors((prev) => {
          return {...prev, fullname: 'Please add a full name'};
        });
      }
      if (!form.address) {
        setErrors((prev) => {
          return {...prev, address: 'Please add a address'};
        });
      }
      if (!form.email) {
        setErrors((prev) => {
          return {...prev, email: 'Please add a email'};
        });
      }else {
        if(!validator.isEmail(form.email)) {
          setErrors((prev) => {
            return {...prev, email: 'Email invalid'};
          });
        }
    }
      if (!form.password) {
        setErrors((prev) => {
          return {...prev, password: 'Please add a password'};
        });
      }

      if (!form.phonenumber) {
        setErrors((prev) => {
          return {...prev, phonenumber: 'Please add a phone number'};
        });
      }

      
      if (!form.retypepassword) {
        setErrors((prev) => {
          return {...prev, retypepassword: 'Please add a retype password'};
        });
      }
      if ((form.username && form.password && form.fullname && form.address && form.email && form.phonenumber&& form.retypepassword && validator.isEmail(form.email))) {

        if(form.password!==form.retypepassword) {
          console.log("nonoooo");
          setRetype(true);
        
        }else {

         const register= {
            "username": form.username,
            "password": form.password,
            "fullName": form.fullname,
            "address": form.address,
            "email": form.email,
            "phoneNumber": form.phonenumber,
            "id_role":3
             }

   
        // console.log(register);
    
        axiosInstance.post("/client/register/user", register).then((response)=> {
          navigate('LogIn');
      }).catch((error) =>{
        setTest(true);
          console.log("fail");
          navigate('Register');
      });
        }
    }

  }
    return (
        <RegisterComponent
      onSubmit={onSubmit}
      onChange={onChange}
      errors={errors}
     
    />
    );
    }
export default Register;