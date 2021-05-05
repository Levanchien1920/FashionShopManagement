import React, {useContext, useState} from 'react';
import styles from './styles';
import {useNavigation } from '@react-navigation/native';
import {Text, View,TextInput, TouchableOpacity } from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {GlobalContext} from '../../context/Provider';


const ComponentHeader = () => {

  const {authState : {isLoggedIn},}= useContext(GlobalContext);
    const {navigate} =useNavigation();
    return ((!isLoggedIn) ? (
        <View>
        <View style={styles.screenContainer}>
    
      <View style={styles.headerContainer}>
        <View style={styles.inputContainer}>
          <FontAwesome name="search" size={24} color="#969696" />
          <TextInput style={styles.inputText} />
        </View>
      
        <View style={styles.cartContainer}>
          <FontAwesome name="shopping-cart" size={24} color="#fff" />
        </View>
      </View>

      <View  style = {styles.createSection}>
            <TouchableOpacity onPress= {() => {navigate('Home')}}>
               <Text  style = {styles.linkBtn}>Home</Text>
           </TouchableOpacity>
           <TouchableOpacity onPress= {() => {navigate('Products')}}>
               <Text  style = {styles.linkBtn}>Products</Text>
           </TouchableOpacity>

           <TouchableOpacity onPress= {() => {navigate('Contact')}}>
               <Text  style = {styles.linkBtn}>Contact</Text>
           </TouchableOpacity>

           <TouchableOpacity onPress= {() => {navigate('Post')}}>
               <Text  style = {styles.linkBtn}>Post</Text>
           </TouchableOpacity>
       </View>
       <View style={styles.bodyContainer}>
       
      </View>
      
        </View>

        </View>
    ) : (<View>
    <View style={styles.screenContainer}>
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
  
  <View  style = {styles.createSection}>
        <TouchableOpacity onPress= {() => {navigate('Home')}}>
           <Text  style = {styles.linkBtn}>Home</Text>
       </TouchableOpacity>
       <TouchableOpacity onPress= {() => {navigate('Products')}}>
           <Text  style = {styles.linkBtn}>Products</Text>
       </TouchableOpacity>
       <TouchableOpacity onPress= {() => {navigate('MyAccount')}}>
           <Text  style = {styles.linkBtn}>Myaccount</Text>
       </TouchableOpacity>

       <TouchableOpacity onPress= {() => {navigate('Contact')}}>
               <Text  style = {styles.linkBtn}>Contact</Text>
           </TouchableOpacity>
           
       <TouchableOpacity onPress= {() => {navigate('Post')}}>
               <Text  style = {styles.linkBtn}>Post</Text>
           </TouchableOpacity>

   </View>
   <View style={styles.bodyContainer}>
   
  </View>
  
    </View>

    </View>))
    }


export default ComponentHeader;
