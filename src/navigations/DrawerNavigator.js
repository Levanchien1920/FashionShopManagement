import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import HomeNavigator from './HomeNavigator';
import SideMenu from './SideMenu';
import Login from '../screens/Login';
import Register from '../screens/Register';

const getDrawerContent= navigation => {
  return <SideMenu  navigation= {navigation} />
}
const DrawerNavigator = () => {
    const Drawer = createDrawerNavigator();
    return (
        <Drawer.Navigator drawerType="slide" drawerContent= {( {navigation}) =>getDrawerContent(navigation)}>
          <Drawer.Screen name={"Home"} component= {HomeNavigator} ></Drawer.Screen>
          <Drawer.Screen name={'LogIn'} component= {Login}></Drawer.Screen>
          <Drawer.Screen name={'Register'} component= {Register}></Drawer.Screen>


        </Drawer.Navigator>

    );
};

export default DrawerNavigator;