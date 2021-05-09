
import React, { useEffect, useState } from 'react';
import { Text, View,TextInput, TouchableOpacity } from 'react-native';
import Container from '../common/Container';
import Input from '../common/Input';
import CustomButtom from '../common/CustomButton';
import styles from './styles';
import {useNavigation } from '@react-navigation/native';
import axiosInstance from '../../helper/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
const UpdateAccountComponent = ({
    onSubmit,
    onChange,
    form,
    loading,
    error,
    errors,

  }) => {
    const {navigate} =useNavigation();

    const [ account, setaccount] = useState({
        "id": 0,
        "username": "",
        "password": "",
        "fullname": "",
        "address": "",
        "email": "",
        "phoneNumber": "",
})

AsyncStorage.getItem('id')
.then((value) => {
  const data = JSON.parse(value);
  console.log("data"+data);
});

useEffect(() => {   
    AsyncStorage.getItem('token')
        .then((res) => {
            AsyncStorage.getItem('id')
            .then((value) => {
              axiosInstance.get(`/client/user/${value}`,
              {
              headers: {
                'Authorization': `Bearer ${res}`
              } 
              }).then((response)=> {
                  setaccount(response.data);
              }).catch((error) =>{
              });
            })
        })
}, [])

    return (
        <Container>
            <View>
                <Text style={styles.title}>Update Account </Text>
                <Text style={styles.subTitle}>---------------</Text>
            </View>
         <View style= {styles.form}>
         <Input
            lable="Fullname"
            iconPosition= "left"
            placeholder={account.fullName}
            onChangeText= {(value) =>  { 
                onChange({name:"fullname",value});
            }}
            error={errors.fullname}
            
           />  
            <Input
            lable="Email"
            placeholder={account.email}
            iconPosition= "left"
            onChangeText= {(value) =>  {
                onChange({name:"email",value});
            }}
            error={errors.email}
            
           />

            <Input
            lable="Address"
            placeholder={account.address}
            iconPosition= "left"
            onChangeText= {(value) =>  {
                onChange({name:"address",value});
            }}
            error={errors.address}
            
           />

            
             <Input
            lable="PhoneNumber"
            iconPosition= "left"
            placeholder={account.phoneNumber}
            // value={account.phoneNumber}
            onChangeText= {(value) =>  {
                onChange({name:"phonenumber",value});
            }}
            error={errors.phonenumber}
         
           />
           <Input
            lable="Username"
            placeholder={account.username}
            iconPosition= "left"
            // value={account.usename}
            onChangeText= {(value) =>  {
                onChange({name:"username",value});
            }}
            error={errors.username}
          

            
           />

             <Input
            lable="Password"
            iconPosition= "left"
            secureTextEntry={true}
            // value={account.password}
            placeholder="Enter password"
            onChangeText= {(value) =>  {
                onChange({name:"password",value});
            }}
            error={errors.password}
           />  
           
           
            
        <CustomButtom onPress={onSubmit} title="Save change"  secondary />

        {/* <View  style = {styles.createSection}>
            <Text  style = {styles.infoText}> You already have account ? </Text>
            <TouchableOpacity onPress= {() => {navigate('LogIn')}}>
                <Text  style = {styles.linkBtn}>Login</Text>
            </TouchableOpacity>
        </View> */}
         </View>
       
        
        </Container>
    );
}

export default UpdateAccountComponent;