import React from 'react';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import { LOGIN, REGISTER } from '../constants/routeNames';
import Login from '../screens/Login';
import Register from '../screens/Register';
import MainBf from '../screens/MainBf';
import Home from '../screens/Home';



const AuthNavigator = (setIsLogIned) => {
  console.log(setIsLogIned);
  
    const AuthStack =createStackNavigator();
    return (
      
        
        <AuthStack.Navigator screenOptions= {{headerShown:false}}>
          {/* <AuthStack.Screen name={'MainBf'} component= {MainBf}></AuthStack.Screen> */}
          <AuthStack.Screen name={LOGIN} component= {Login}></AuthStack.Screen>
          <AuthStack.Screen name={REGISTER} component= {Register}></AuthStack.Screen>
          <AuthStack.Screen name={'Home'} component= {Home}></AuthStack.Screen>
        </AuthStack.Navigator>
    );
}

export default AuthNavigator;