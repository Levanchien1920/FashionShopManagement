import React, {useContext } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import HomeNavigator from './HomeNavigator';
import DrawerNavigator from './DrawerNavigator';
import CustomButton from '../components/common/CustomButton';
import {GlobalContext} from '../context/Provider';
const AppNavContainer = () => {
 
  const {authState : {isLoggedIn},}= useContext(GlobalContext);
  console.log('isloggedin:=>' ,isLoggedIn);
    return (
        <NavigationContainer>
          {isLoggedIn ? <DrawerNavigator /> : <AuthNavigator />}
          {/* <AuthNavigator></AuthNavigator> */}
          {/* <HomeNavigator></HomeNavigator> */}
        </NavigationContainer>
    );
}

export default AppNavContainer;