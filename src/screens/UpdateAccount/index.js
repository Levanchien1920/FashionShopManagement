
import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View ,Alert} from 'react-native';
import AsyncStorage from "@react-native-async-storage/async-storage";
import UpdateAccountComponent from '../../components/UpdateAccount';
import {useNavigation } from '@react-navigation/native';
import axiosInstance from '../../helper/axiosInstance';
import {GlobalContext} from '../../context/Provider';
const UpdateAccount = () => {
    const [form, setForm] = useState({});
    const {navigate} = useNavigation();
    const [test,setTest] =useState(false)
    const [success,setSuccess] =useState(false)
    useEffect(()=>{
        if(test) {
            Alert.alert(`Update account is failed,please try again!!`)
        }
        setTest(false)
    }
      ,[test])

      useEffect(()=>{
        if(success) {
            Alert.alert(`Update account success`)
        }
        setSuccess(false)
    }
      ,[success])

    const [errors, setErrors] = useState({});
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

          if ((form.username && form.password && form.fullname && form.address && form.email && form.phonenumber) ) {
            const userUpdate= {
              "username": form.username,
              "password": form.password,
              "fullName": form.fullname,
              "address": form.address,
              "email": form.email,
              "phoneNumber": form.phonenumber

          }
          console.log(userUpdate);

            AsyncStorage.getItem('id')
            .then((value) => {
              console.log("value:"+value);
                axiosInstance.patch(`/client/user/${value}`, userUpdate).then((response)=> {
                  setSuccess(true)
                   navigate('MyAccount');
                   
                }).catch((error) =>{
                  setTest(true);
                    console.log("loi roi");
                });     
            });
      }
    }
  
    return (
        <View>
       <UpdateAccountComponent  
        onSubmit={onSubmit}
        errors={errors}
        error={error}
         onChange={onChange}/>
        </View>
        
    );
}

export default UpdateAccount;