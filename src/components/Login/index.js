
import React from 'react';
import { StyleSheet, Text, View,TextInput, TouchableOpacity } from 'react-native';
import Container from '../../components/common/Container';
import Input from '../../components/common/Input';
import CustomButtom from '../../components/common/CustomButton';
import styles from './styles';
import {useNavigation } from '@react-navigation/native';
const LoginComponent = (  { error,
    form,
    onChange,
    loading,
    onSubmit}) => {
    const {navigate} =useNavigation();
    return (
        <Container>

            <View>
                <Text style={styles.title}>Welcome to app</Text>
                <Text style={styles.subTitle}>Please login here</Text>
            </View>

         <View style= {styles.form}>
            <Input
            lable="Username"
            placeholder="Enter username"
            iconPosition= "left"
            onChangeText={(value) => {
                onChange({name: 'username', value});
            }}
            
           />
        <Input
            lable="Password"
            iconPosition= "left"
            secureTextEntry={true}
            placeholder="Enter password"
            onChangeText={(value) => {
                onChange({name: 'password', value});
            }}
           />
        <CustomButtom title="Submit"  onPress={onSubmit} secondary />

        <View  style = {styles.createSection}>
            <Text  style = {styles.infoText}> You need a new account ? </Text>
            <TouchableOpacity onPress= {() => {navigate('Register')}}>
                <Text  style = {styles.linkBtn}>Register</Text>
            </TouchableOpacity>
        </View>
         </View>
       
        
        </Container>
    );
}

export default LoginComponent;