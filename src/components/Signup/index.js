
import React from 'react';
import { StyleSheet, Text, View,TextInput, TouchableOpacity } from 'react-native';
import Container from '../common/Container';
import Input from '../common/Input';
import CustomButtom from '../common/CustomButton';
import styles from './styles';
import {useNavigation } from '@react-navigation/native';
const RegisterComponent = ({onSubmit,onChange,form,errors}) => {
    const {navigate} =useNavigation();
    return (
        <Container>

            <View>
                <Text style={styles.title}>Welcome to apppppp </Text>
                <Text style={styles.subTitle}>Create a free account</Text>
            </View>

         <View style= {styles.form}>

         <Input
            lable="Fullname"
            iconPosition= "left"
            placeholder="Enter full name"
            onChangeText= {(value) =>  {
                onChange({name:"fullname",value});
            }}
            error={errors.fullname}
           />   
            <Input
            lable="Email"
            placeholder="Enter email"
            iconPosition= "left"
            onChangeText= {(value) =>  {
                onChange({name:"email",value});
            }}
            error={errors.email}
            
           />

            
             <Input
            lable="PhoneNumber"
            iconPosition= "left"
            placeholder="Enter PhoneNumber"
            onChangeText= {(value) =>  {
                onChange({name:"phonenumber",value});
            }}
            error={errors.phonenumber}
           />
           <Input
            lable="Username"
            placeholder="Enter username"
            iconPosition= "left"

            onChangeText= {(value) =>  {
                onChange({name:"username",value});
            }}
            error={errors.username}

            
           />

             <Input
            lable="Password"
            iconPosition= "left"
            secureTextEntry={true}
            placeholder="Enter password"
            
            onChangeText= {(value) =>  {
                onChange({name:"password",value});
            }}
            error={errors.password}
           />  
            <Input
            lable="Retype Password"
            iconPosition= "left"
            secureTextEntry={true}
            placeholder="Retype Password"

            onChangeText= {(value) =>  {
                onChange({name:"retypepassword",value});
            }}
            error={errors.retypepassword}
           />  
           
            
        <CustomButtom onPress={onSubmit} title="Submitttttttttttt"  secondary />

        <View  style = {styles.createSection}>
            <Text  style = {styles.infoText}> You already have account ? </Text>
            <TouchableOpacity onPress= {() => {navigate('Login')}}>
                <Text  style = {styles.linkBtn}>Login</Text>
            </TouchableOpacity>
        </View>
         </View>
       
        
        </Container>
    );
}

export default RegisterComponent;