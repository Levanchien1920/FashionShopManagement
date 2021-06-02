
import React, { useCallback, useContext,useState,useEffect} from 'react';
import { ScrollView, Linking, TouchableOpacity,Text, View,TextInput,Button ,Alert,Image} from 'react-native';
import styles from './styles';
import Icon1 from '../../components/common/Icon';
import Swiper from 'react-native-swiper'
import {GlobalContext} from '../../context/Provider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation, useRoute} from '@react-navigation/native';

const OpenURLButton = ({ url, children }) => {
    const handlePress = useCallback(async () => {
      const supported = await Linking.canOpenURL(url);
      if (supported) {
      
        await Linking.openURL(url);
      } else {
        Alert.alert(`Don't know how to open this URL: ${url}`);
      }
    }, [url]);
  
    return <TouchableOpacity onPress={handlePress}><Text style={{fontSize:16,color:'blue'}}>{children}</Text></TouchableOpacity>;
  };
const Contact = () => {
    const map = "https://www.google.com/maps/place/54+Nguy%E1%BB%85n+L%C6%B0%C6%A1ng+B%E1%BA%B1ng,+Ho%C3%A0+Kh%C3%A1nh+B%E1%BA%AFc,+Li%C3%AAn+Chi%E1%BB%83u,+%C4%90%C3%A0+N%E1%BA%B5ng+550000,+Vi%E1%BB%87t+Nam/@16.0738064,108.1477255,17z/data=!3m1!4b1!4m5!3m4!1s0x314218d68e8ccb03:0x64dc2cb3e38bbdaf!8m2!3d16.0738013!4d108.1499142";
    const face1 = "https://www.facebook.com/van.hoang.99er";
    const face2 = "https://www.facebook.com/van.hoang.99er";
    const {navigate} =useNavigation();
    const [cartCount,setCartCount] = useState("0");
    const {authState : {check},}= useContext(GlobalContext);
    useEffect(() =>{
     
          AsyncStorage.getItem('number')
          .then((value) => {
          setCartCount(value)
      }
      )
      
     } , [check]);
    return (
        <View>
                    <View>
                        <View style={styles.headerContainer}>
                        <Swiper style={styles.wrapper} showsButtons={true} autoplay={true}>
                              <View style={styles.slide1}>
                              <Image  
                                 source={require('../../assets/images/b1.jpg')}
                                    style={{height: 100}}/>
                              </View>
                              <View style={styles.slide2}>
                              <Image  
                                 source={require('../../assets/images/b2.jpg')}
                                    style={{height: 100}}/>
                              </View>
                              <View style={styles.slide3}>
                              <Image  
                                 source={require('../../assets/images/b3.jpg')}
                                    style={{height: 100}}/>
                              </View>
                      </Swiper>
                          
                        </View>

                       
              </View>


              <ScrollView style={styles.bodyContainer}>

                <View>
                    <View>
                      <Text style={{fontSize:20, color:'red'}}>Our office</Text>
                      <Text style={{fontSize:16}}>123 office , Los Angeles, CA, USA</Text>
                      <Text style={{fontSize:16}}>Office@gmail.com</Text>
                      <Text style={{fontSize:16}}>Telephone:0366525896</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                      <Text style={{fontSize:16}}>Facebook:   </Text>
                    <OpenURLButton url={face1}>Link</OpenURLButton>
                    </View>
                </View>

                <View style={{marginTop:'10%'}}>
                    <View>
                      <Text style={{fontSize:20,color:'red'}}>Our store</Text>
                      <Text style={{fontSize:16}}>123 office , Los Angeles, CA, USA</Text>
                      <Text style={{fontSize:16}}>Office@gmail.com</Text>
                      <Text style={{fontSize:16}}>Telephone:0366525896</Text>
                    </View>
                    <View style={{flexDirection:'row'}}>
                      <Text style={{fontSize:16}}>Facebook:   </Text>
                      <OpenURLButton url={face2}>Link</OpenURLButton>
                    </View>
                </View>
                <View style={{marginTop:'10%'}}>
                    <View style={{flexDirection:'row'}}>
                      <Text style={{fontSize:20,color:'red'}}>Google map:   </Text>
                      <OpenURLButton url={map}>Link</OpenURLButton>
                    </View>
                </View>
              </ScrollView>



              <View  style = {styles.createSection}>
                <View style = {styles.btn1}>   
                            <TouchableOpacity
                              onPress= {() => {navigate('Home')}}>
                              <Icon1 type="fa5" style={{padding: 10}} size={30} color="green" name="home" />
                            
                              </TouchableOpacity>
                              
                   </View>
                   <View style = {styles.btn2}>
                        <TouchableOpacity
                              onPress= {() => {navigate('Product')}}>
                              <Icon1 type="ionicon" style={{padding: 10}} size={30} color="green" name="shirt" />
                            
                         </TouchableOpacity>

              

                   </View>
                    <View style = {styles.btn3}> 
                         <TouchableOpacity
                              onPress= {() => {navigate('Contact')}}>
                              <Icon1 type="material" style={{padding: 10}} size={35} color="blue" name="contact-phone" />
                            
                              </TouchableOpacity>
                   
                    </View> 
                    <View style = {styles.btn4} >
                  

                   <TouchableOpacity
                              onPress= {() => {navigate('Post')}}>
                              <Icon1 type="ant" style={{padding: 10}} size={30} color="green" name="notification" />
                            
                              </TouchableOpacity>
                    </View>
                    <View style = {styles.btn5}>

                           <TouchableOpacity
                              onPress= {() => {navigate('Cart')}}>
                             
                             <Icon1 type="fa5" style={{padding: 10}} size={30} color="green" 
                             name="shopping-cart" containerStyle={{marginHorizontal: 15, position: 'relative',}} />
                            
                                   
                              {cartCount > 0 ? (
                  <View
                    style={{
                     
                      position: 'absolute',
                      backgroundColor: 'red',
                      width: 16,
                      height: 16,
                      borderRadius: 15 / 2,
                      right: 10,
                      top: +10,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Text
                      style={{
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: "#FFFFFF",
                        fontSize: 8,
                      }}>
                      {cartCount}
                    </Text>
                  </View>
                ) : null}
                              </TouchableOpacity>
                    </View>
                  </View>
        </View>
    );
}

export default Contact;