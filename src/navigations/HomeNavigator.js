import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import Home from '../screens/Home';
import Products from '../screens/Products';
import ProductDetail from '../screens/ProductDetail';
import Cart from '../screens/Cart';
import Checkout from '../screens/Checkout';
import UpdateAccount from '../screens/UpdateAccount';
import Contact from '../screens/Contact';
import Post from '../screens/Post';
import PostDetail from '../screens/PostDetail';


const HomeNavigator = () => {
    const HomeStack =createStackNavigator();
    return (
        <HomeStack.Navigator>
          <HomeStack.Screen name={'Home'} component= {Home} ></HomeStack.Screen>
          <HomeStack.Screen name={'Products'} component= {Products}></HomeStack.Screen>
          <HomeStack.Screen name={'ProductDetail'} component= {ProductDetail}></HomeStack.Screen>
          <HomeStack.Screen name={'Cart'} component= {Cart}></HomeStack.Screen>
          <HomeStack.Screen name={'Checkout'} component= {Checkout}></HomeStack.Screen>
          <HomeStack.Screen name={'UpdateAccount'} component= {UpdateAccount}></HomeStack.Screen>
          <HomeStack.Screen name={'Contact'} component= {Contact}></HomeStack.Screen>
          <HomeStack.Screen name={'Post'} component= {Post}></HomeStack.Screen>
          <HomeStack.Screen name={'PostDetail'} component= {PostDetail}></HomeStack.Screen>
        </HomeStack.Navigator>

    );
}

export default HomeNavigator;