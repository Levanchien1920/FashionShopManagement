
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import ComponentHeader from '../../components/ComponentHeader';
import UpdateAccountComponent from '../../components/UpdateAccount';
import {useNavigation } from '@react-navigation/native';
import axios from 'axios';
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
        //   console.log(register);
      
        //   axios.post("http://localhost:9090/api/v1/customer", register).then((response)=> {
        //     navigate('LogIn');
            
        // }).catch((error) =>{
        //     console.log(error);
        //     console.log("fail");
        //     navigate('Register');
        // });


        axios.patch(`http://localhost:9090/api/v1/customer/${localStorage.id}`, userUpdate).then((response)=> {
            // alert(response.data.message);
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