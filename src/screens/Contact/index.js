
import React, { useCallback, useEffect, useState } from 'react';
import { ScrollView, Linking, TouchableOpacity,Text, View,TextInput,Button ,Alert} from 'react-native';
import styles from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ComponentHeader from '../../components/ComponentHeader';
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
  
    return <TouchableOpacity onPress={handlePress}><Text>{children}</Text></TouchableOpacity>;
  };
const Contact = () => {

    const [test,setTest] =useState(false)
    const url = "https://www.google.com/maps/place/54+Nguy%E1%BB%85n+L%C6%B0%C6%A1ng+B%E1%BA%B1ng,+Ho%C3%A0+Kh%C3%A1nh+B%E1%BA%AFc,+Li%C3%AAn+Chi%E1%BB%83u,+%C4%90%C3%A0+N%E1%BA%B5ng+550000,+Vi%E1%BB%87t+Nam/@16.0738064,108.1477255,17z/data=!3m1!4b1!4m5!3m4!1s0x314218d68e8ccb03:0x64dc2cb3e38bbdaf!8m2!3d16.0738013!4d108.1499142";
    useEffect(()=>{
        if(test) {
            Alert.alert(`Don't know how to open this URL:`)
        }
       
    //     const supported = Linking.canOpenURL(url);
    //     if (supported) {
    //        Linking.openURL(url);
    //   }
    }
      ,[test])
    

    const supportedURL = "https://google.com";
    const {navigate} =useNavigation();
    return (
        <View>
                    <View>
                        <View style={styles.headerContainer}>
                                <View style={styles.inputContainer}>
                                    <FontAwesome name="search" size={24} color="#969696" />
                                    <TextInput style={styles.inputText} />
                                </View>
                                <View style={styles.cartContainer}>
                                      <FontAwesome name="shopping-cart" size={24} color="#fff" />
                                </View>
                        </View>

                        <View  style = {styles.createSection}>
                <View style = {styles.btn1}>   
                        <Button  title= "Home" onPress= {() => {navigate('Home')}}>  </Button>
                   </View>
                   <View style = {styles.btn2}>
                        <Button  title= "Product" onPress= {() => {navigate('Products')}}>
                        </Button>
                   </View>
                        
                    <View style = {styles.btn3}> 
                    <Button   title= "Contact" onPress= {() => {navigate('Contact')}}>
                    </Button>
                    </View> 

                    <View style = {styles.btn4} >
                    <Button  title= "Post" onPress= {() => {navigate('Post')}}>
                   </Button>
                    </View>
                    <View style = {styles.btn5}>
                    <Button  title= "Cart" onPress= {() => {navigate('Cart')}}>
                           </Button>
                    </View>
              </View>
              </View>


              <View>

              <OpenURLButton url={supportedURL}>Google</OpenURLButton>
              

            <Button title="aaaaaaa" onPress={()=>{
                setTest(true)
            }}></Button>
              </View>
        </View>
 
       
    );
}

export default Contact;