import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import { CONTACT_DETAIL, CONTACT_LIST ,CREATE_CONTACT} from '../constants/routeNames';
import Home from '../screens/Home';
import { StyleSheet, Text, View } from 'react-native';
import Products from '../screens/Products';
import ProductDetail from '../screens/ProductDetail';
import Cart from '../screens/Cart';
import Checkout from '../screens/Checkout';
import MorePages from '../screens/MorePages';
import MyAccount from '../screens/MyAccount';



const HomeNavigator = () => {
    const HomeStack =createStackNavigator();
    return (
        <HomeStack.Navigator initialRouterName={CONTACT_LIST}>
          <HomeStack.Screen name={'Home'} component= {Home} ></HomeStack.Screen>
          <HomeStack.Screen name={'Products'} component= {Products}></HomeStack.Screen>
          <HomeStack.Screen name={'ProductDetail'} component= {ProductDetail}></HomeStack.Screen>
          <HomeStack.Screen name={'Cart'} component= {Cart}></HomeStack.Screen>
          <HomeStack.Screen name={'Checkout'} component= {Checkout}></HomeStack.Screen>
          <HomeStack.Screen name={'MorePages'} component= {MorePages}></HomeStack.Screen>
          <HomeStack.Screen name={'MyAccount'} component= {MyAccount}></HomeStack.Screen>
        </HomeStack.Navigator>

    );
}

export default HomeNavigator;