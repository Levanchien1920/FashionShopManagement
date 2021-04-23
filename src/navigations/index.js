import React, {useContext ,useState} from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import HomeNavigator from './HomeNavigator';
import DrawerNavigator from './DrawerNavigator';
import CustomButton from '../components/common/CustomButton';
import {GlobalContext} from '../context/Provider';
const AppNavContainer = () => {

    return (
        <NavigationContainer>
          <DrawerNavigator /> 
        </NavigationContainer>
    );
}

export default AppNavContainer;