
import React, {useContext, useEffect, useState } from 'react';
import { SafeAreaView,View,Image, Text, TouchableOpacity, Button } from 'react-native';

import Container from '../../components/common/Container';
import styles from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GlobalContext} from '../../context/Provider';

const SideMenu = ({navigation}) => {
  
  const [fullName,setFullName]=useState("");
  const {authState : {isLoggedIn},}= useContext(GlobalContext);
 

  useEffect(()=>{
    if(!isLoggedIn) return 
      AsyncStorage.getItem('fullname', (err, result) => {
        setFullName(result);
     });
  },[isLoggedIn])

  
  const {
    authDispatch,
    authState: {error, loading},
  } = useContext(GlobalContext);

  console.log('isloggedin:=>' ,isLoggedIn);

    return ( (!isLoggedIn || !(
      AsyncStorage.getItem('token', (err, result) => {
       if(result) return true
       return false
     }))
      ) ?( 
       <SafeAreaView>
                  <Image
                source={require('../../assets/images/shoppinga.jpg')}
                style={styles.logoImage}
                  />
                  <View style= {{ top :50}}>
                        <View style={styles.btn}>
                            <Button    title="Log in" onPress= {() => navigation.navigate('LogIn')}>
                              </Button>
                        </View>
                        
                        <View style={styles.btn}>
                          
                              <Button title="Register" onPress= {() => navigation.navigate('Register')}>
                              </Button>
                        </View>

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
                    <View>
                     
                          <Text  style={styles.text}>Welcome {fullName}</Text>
                          
                    </View>


                    <View style = {{ marginTop :20}}>
                          <Button  title="Xem tài khoản" onPress= {() =>  {
                                  navigation.navigate('MyAccount')
                                  }} >

                          </Button>
                    </View>
                
                    
                    <View style = {{ marginTop :40}}>
                          <Button  title="Log out" onPress= {() =>  {
                                    AsyncStorage.removeItem('id');
                                    AsyncStorage.removeItem('fullname');
                                    AsyncStorage.removeItem('username');
                                    AsyncStorage.removeItem('token');
                                    AsyncStorage.removeItem('isLoggedIn');
                                    authDispatch({
                                      type: 'LoginFail',
                                    });
                                  navigation.navigate('Home')
                                  }} >

                          </Button>
                    </View>
                   
               </View>

  </SafeAreaView>
))
      
}

export default SideMenu;