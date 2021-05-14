
import React, { useCallback} from 'react';
import { ScrollView, Linking, TouchableOpacity,Text, View,TextInput,Button ,Alert} from 'react-native';
import styles from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
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
    return (
        <View>
                    <View>
                        <View style={styles.headerContainer}>
                                <View style={styles.inputContainer}>
                                    <FontAwesome name="search" size={24} color="#969696" />
                                    <TextInput style={styles.inputText} />
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
        </View>
    );
}

export default Contact;