import React from 'react';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import { LOGIN, REGISTER } from '../constants/routeNames';
import Login from '../screens/Login';
import Register from '../screens/Register';
import Home from '../screens/Home';
import HomeNavigator from './HomeNavigator';



const AuthNavigator = () => {

  
    const AuthStack =createStackNavigator();
    return (
      
        
        <AuthStack.Navigator screenOptions= {{headerShown:false}}>
          {/* <HomeNavigator /> */}
          {/* <AuthStack.Screen name={'MainBf'} component= {MainBf}></AuthStack.Screen> */}
          <AuthStack.Screen name={LOGIN} component= {Login}></AuthStack.Screen>
          <AuthStack.Screen name={REGISTER} component= {Register}></AuthStack.Screen>
          <AuthStack.Screen name={'Home'} component= {Home}></AuthStack.Screen>
        </AuthStack.Navigator>
    );
}

export default AuthNavigator;