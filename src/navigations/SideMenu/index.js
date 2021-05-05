
import React, {useContext, useEffect, useState } from 'react';
import { SafeAreaView,View,Image, Text, TouchableOpacity } from 'react-native';

import Container from '../../components/common/Container';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GlobalContext} from '../../context/Provider';

const SideMenu = ({navigation}) => {

  const {authState : {isLoggedIn},}= useContext(GlobalContext);

  const {
    authDispatch,
    authState: {error, loading},
  } = useContext(GlobalContext);

  console.log('isloggedin:=>' ,isLoggedIn);


    return ( (!isLoggedIn) ?(  <SafeAreaView>
      
      <View>
          <Text>Welcome to shopping app</Text>

          <Image
        source={require('../../assets/images/shoppinga.jpg')}
        style={styles.logoImage}
      />
     
          <TouchableOpacity onPress= {() => navigation.navigate('LogIn')}>
            
            <Text>Log in</Text>
          
          </TouchableOpacity>

          <TouchableOpacity onPress= {() => navigation.navigate('Register')}>
            
            <Text>Register</Text>
          
          </TouchableOpacity>

    
      </View>

    </SafeAreaView>
  ):(  <SafeAreaView>
    <View>
      <Container>
      <Image
        source={require('../../assets/images/avt.jpg')}
        style={styles.logoImage}
      />
      </Container>
    </View>
             <View>

                    {/* <Text>Hello:{AsyncStorage.getItem("username")}</Text> 
                    <Text>Name:{AsyncStorage.getItem("fullname")}</Text>  */}

        <TouchableOpacity onPress= {() =>  {
            AsyncStorage.clear();
            authDispatch({
              type: 'LoginFail',
            });
          navigation.navigate('Home')
          
          }}>
          
          <Text>Log out</Text>
         
         
          
        </TouchableOpacity>
    </View>

  </SafeAreaView>
))
      
}

export default SideMenu;