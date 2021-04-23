
import React, {useContext, useState } from 'react';
import { SafeAreaView,View,Image, Text, TouchableOpacity } from 'react-native';

import Container from '../../components/common/Container';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GlobalContext} from '../../context/Provider';


const SideMenu = ({navigation}) => {
  const [check,setCheck]=useState(true);

  const {authState : {isLoggedIn},}= useContext(GlobalContext);
  

  console.log('isloggedin:=>' ,isLoggedIn);
  const {
    authDispatch,
    authState: {error, loading},
  } = useContext(GlobalContext);
  

    return ( (!isLoggedIn) ?(  <SafeAreaView>
      <View>
        <Container>
        <Image
          source={require('../../assets/images/avt.jpg')}
          style={styles.logoImage}
        />
        </Container>
      </View>
      <View>
          <Text>Hello Le Van Cuong</Text>
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
        <Text>Hello Le Van Cuong</Text>
        <TouchableOpacity onPress= {() =>  {
            AsyncStorage.clear();
            authDispatch({
              type: 'LoginFail',
            });
          navigation.navigate('LogIn')
          
          }}>
          
        
          <Text>Log out</Text>
         
         
          
        </TouchableOpacity>
    </View>

  </SafeAreaView>
))
      
}

export default SideMenu;