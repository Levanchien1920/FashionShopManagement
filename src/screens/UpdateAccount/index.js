
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ComponentHeader from '../../components/ComponentHeader';
import UpdateAccountComponent from '../../components/UpdateAccount';
import {useNavigation } from '@react-navigation/native';
import axiosInstance from '../../helper/axiosInstance';
const UpdateAccount = () => {
    const [form, setForm] = useState({});
    const {navigate} = useNavigation();

    const onChange = ({name, value}) => {
        setForm({...form, [name]: value});
      }
      const onSubmit = () => {
            const userUpdate= {
              "username": form.username,
              "password": form.password,
              "fullname": form.fullname,
              "address": form.address,
              "email": form.email,
              "phoneNumber": form.phonenumber
          }

        axiosInstance.post(`/client/user/${localStorage.id}`, userUpdate).then((response)=> {
            navigate('MyAccount');
        }).catch((error) =>{
            console.log(error);
        });     
      }
  
    return (
        <View>
            <ComponentHeader />
       <UpdateAccountComponent  
        onSubmit={onSubmit}
         onChange={onChange}/>
        </View>
        
    );
}

export default UpdateAccount;