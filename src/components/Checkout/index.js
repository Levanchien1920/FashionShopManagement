
import React from 'react';
import { StyleSheet, Text, View,TextInput, TouchableOpacity } from 'react-native';
import Container from '../common/Container';
import Input from '../common/Input';
import CustomButtom from '../common/CustomButton';
import styles from './styles';
import {useNavigation } from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const CheckoutComponent = () => {
    const {navigate} =useNavigation();
    return (
        <View>
        <View style={styles.screenContainer}>
       
        <View  style = {styles.createSection}>
            <TouchableOpacity onPress= {() => {navigate('Home')}}>
               <Text  style = {styles.linkBtn}>Home</Text>
           </TouchableOpacity>
           <TouchableOpacity onPress= {() => {navigate('Products')}}>
               <Text  style = {styles.linkBtn}>Products</Text>
           </TouchableOpacity>
           
           <TouchableOpacity onPress= {() => {navigate('ProductDetail')}}>
               <Text  style = {styles.linkBtn}>ProductDetail</Text>
           </TouchableOpacity>
           
           <TouchableOpacity onPress= {() => {navigate('Cart')}}>
               <Text  style = {styles.linkBtn}>Cart</Text>
           </TouchableOpacity>
           
           <TouchableOpacity onPress= {() => {navigate('Checkout')}}>
               <Text  style = {styles.linkBtn}>Checkout</Text>
           </TouchableOpacity>

           
           <TouchableOpacity onPress= {() => {navigate('MyAccount')}}>
               <Text  style = {styles.linkBtn}>Myaccount</Text>
           </TouchableOpacity>
           
          <TouchableOpacity onPress= {() => {navigate('MorePages')}}>
              <Text  style = {styles.linkBtn}>MorePages</Text>
          </TouchableOpacity>

       </View>
        {/*  */}
      {/*  */}
      <View style={styles.headerContainer}>
        <View style={styles.inputContainer}>
          <FontAwesome name="search" size={24} color="#969696" />
          <TextInput style={styles.inputText} />
        </View>
        {/*  */}
        <View style={styles.cartContainer}>
          <FontAwesome name="shopping-cart" size={24} color="#fff" />
        </View>
      </View>
            

       <View style={styles.bodyContainer}>
       <Container>



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


</Container>
      </View>
      
        </View>

        </View>
    );
}

export default CheckoutComponent;