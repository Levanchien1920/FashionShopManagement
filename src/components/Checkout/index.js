
import React from 'react';
import { StyleSheet, Text, View,TextInput, TouchableOpacity } from 'react-native';
import Container from '../common/Container';
import Input from '../common/Input';
import CustomButtom from '../common/CustomButton';
import styles from './styles';
import {useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ComponentHeader from '../ComponentHeader';
const CheckoutComponent = () => {
    const {navigate} =useNavigation();
    return (
       

<View style= {styles.form}>

<Input
lable="Fullname"
iconPosition= "left"
placeholder="Enter full name"
onChangeText= {(value) =>  {
    onChange({name:"fullname",value});
}}

/>   
<Input
lable="Email"
placeholder="Enter email"
iconPosition= "left"
onChangeText= {(value) =>  {
    onChange({name:"email",value});
}}

/>


<Input
lable="Address"
placeholder="Enter address"
iconPosition= "left"
onChangeText= {(value) =>  {
    onChange({name:"address",value});
}}

/>


 <Input
lable="PhoneNumber"
iconPosition= "left"
placeholder="Enter PhoneNumber"
onChangeText= {(value) =>  {
    onChange({name:"phonenumber",value});
}}

/>
<Input
lable="Username"
placeholder="Enter username"
iconPosition= "left"

onChangeText= {(value) =>  {
    onChange({name:"username",value});
}}

/>

 <Input
lable="Password"
iconPosition= "left"
secureTextEntry={true}
placeholder="Enter password"

onChangeText= {(value) =>  {
    onChange({name:"password",value});
}}

/>  
<Input
lable="Retype Password"
iconPosition= "left"
secureTextEntry={true}
placeholder="Retype Password"

onChangeText= {(value) =>  {
    onChange({name:"retypepassword",value});
}}

/>  

<CustomButtom  title="Submit"  secondary />


</View>



     
    );
}

export default CheckoutComponent;