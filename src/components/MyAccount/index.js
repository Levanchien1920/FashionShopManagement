
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View,TextInput, TouchableOpacity } from 'react-native';
import {useNavigation } from '@react-navigation/native';
import ComponentHeader from '../ComponentHeader';
import axiosInstance from '../../helper/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
const MyAccountComponent = () => {
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

       
      
        axiosInstance.get(`/client/user/${ AsyncStorage.getItem('id', (err, result) => {
            return result
          })}`,
            {
            headers: {
              'Authorization': `Bearer ${ AsyncStorage.getItem('token', (err, result) => {
                return result
              })}`
            } 
            }).then((response)=> {
                setaccount(response.data);
            }).catch((error) =>{
            });
    }, [])
    return (
        <View>
                  <View style={{marginTop:'20%'}}></View>

                  <ComponentHeader />
                  <View>    
                                   <Text>Name : {account.fullname}</Text>
                                    <Text>UserName : {account.username}</Text>
                                    <Text>Email : {account.email}</Text>
                                    <Text>Mobile: {account.phoneNumber}</Text>
                                    <Text>Address : {account.address}</Text>
                                    <TouchableOpacity onPress={() => navigate("UpdateAccount")}><Text>Update profile</Text></TouchableOpacity>
                  </View>

        </View>
 


    );
}

export default MyAccountComponent;