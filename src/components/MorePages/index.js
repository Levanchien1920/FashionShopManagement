
import React from 'react';
import { StyleSheet, Text, View,TextInput, TouchableOpacity } from 'react-native';
import Container from '../common/Container';
import Input from '../common/Input';
import CustomButtom from '../common/CustomButton';
import styles from './styles';
import {useNavigation } from '@react-navigation/native';
const MorePagesComponent = () => {
    const {navigate} =useNavigation();
    return (
        <Container>

            
        <View  style = {styles.createSection}>
           
            
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
         
       
        
        </Container>
    );
}

export default MorePagesComponent;