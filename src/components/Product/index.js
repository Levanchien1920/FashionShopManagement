
import React from 'react';
import { StyleSheet, Text, View,TextInput, TouchableOpacity } from 'react-native';
import Container from '../common/Container';
import Input from '../common/Input';
import CustomButtom from '../common/CustomButton';
import styles from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation } from '@react-navigation/native';
const ProductComponent = () => {
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
            
          



     

       <View style={styles.seeMoreContainer}>
        <Text style={styles.seeMoreText}>XEM THÊM 636 SẢN PHẨM </Text>
      </View>

 
      
        </View>

        </View>
    );
}

export default ProductComponent;