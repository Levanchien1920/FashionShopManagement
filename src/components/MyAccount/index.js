
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View,TextInput, TouchableOpacity } from 'react-native';

import {useNavigation } from '@react-navigation/native';
import ComponentHeader from '../ComponentHeader';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
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
        axios.get(`http://localhost:9090/api/v1/client/user/${localStorage.getItem("id")}`,
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
        <View>
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