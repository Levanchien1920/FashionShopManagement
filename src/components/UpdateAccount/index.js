
import React, { useEffect, useState } from 'react';
import { Text, View,TextInput, TouchableOpacity } from 'react-native';
import Container from '../common/Container';
import Input from '../common/Input';
import CustomButtom from '../common/CustomButton';
import styles from './styles';
import {useNavigation } from '@react-navigation/native';
import axiosInstance from '../../helper/axiosInstance';
const UpdateAccountComponent = ({
    onSubmit,
    onChange,
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

useEffect(() => {   
    axiosInstance.get(`/client/user/${localStorage.getItem("id")}`,
        {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem("token")}`
        } 
        }).then((response)=> {
            setaccount(response.data);
        }).catch((error) =>{
        });
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
            placeholder="Enter full name"
            value={account.fullname}
            onChangeText= {(value) =>  {
                onChange({name:"fullname",value});
            }}
      
           />  

      
            <Input
            lable="Email"
            placeholder="Enter email"
            iconPosition= "left"
            value={account.email}
            onChangeText= {(value) =>  {
                onChange({name:"email",value});
            }}
            
           />

            <Input
            lable="Address"
            placeholder="Enter address"
            iconPosition= "left"
            value={account.address}
            onChangeText= {(value) =>  {
                onChange({name:"address",value});
            }}
            
           />

            
             <Input
            lable="PhoneNumber"
            iconPosition= "left"
            placeholder="Enter PhoneNumber"
            value={account.phoneNumber}
            onChangeText= {(value) =>  {
                onChange({name:"phonenumber",value});
            }}
         
           />
           <Input
            lable="Username"
            placeholder="Enter username"
            iconPosition= "left"
            value={account.usename}
            onChangeText= {(value) =>  {
                onChange({name:"username",value});
            }}
          

            
           />

             <Input
            lable="Password"
            iconPosition= "left"
            secureTextEntry={true}
            value={account.password}
            placeholder="Enter password"
            onChangeText= {(value) =>  {
                onChange({name:"password",value});
            }}
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