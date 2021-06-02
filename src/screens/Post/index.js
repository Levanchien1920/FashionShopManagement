
import React, { useEffect, useState,useContext } from 'react';
import axiosInstance from '../../helper/axiosInstance';
import { ScrollView,TouchableOpacity,Text, View,TextInput,Button,Image } from 'react-native';
import styles from './styles';
import {useNavigation, useRoute} from '@react-navigation/native';
import Icon1 from '../../components/common/Icon';
import Swiper from 'react-native-swiper'
import {GlobalContext} from '../../context/Provider';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Post = () => {
    const [post, setpost] = useState([]);
    useEffect(() => {
        axiosInstance.get('/client/post').then((response)=> {
            setpost(response.data.content);
        }).catch((error) =>{
        });
    }, [])

    const [cartCount,setCartCount] = useState("0");
    const {authState : {check},}= useContext(GlobalContext);
    useEffect(() =>{
     
          AsyncStorage.getItem('number')
          .then((value) => {
          setCartCount(value)
      }
      )
      
     } , [check]);

    const {navigate} =useNavigation();
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
              <ScrollView style={styles.listItemContainer}>
                {post.map((p) => (
                  <View key={p.id} style= {{borderColor:'yellow',borderBottomWidth:1,margin:8,width:"100%"}}> 

                    <View style={{flexDirection:'row'}}>
                      <View style= {{width:230}}>
                            <Text style= {{color:'blue',fontSize:16}}>Tiêu đề:</Text> 
                            <Text>{p.title}</Text>
                      </View>

                     
                              <View style={{marginLeft:10}}>
                                          <Image
                                  source={{ uri: p.link}}
                                  style={{ width: 100, height: 100, borderWidth: 1 }}
                                />
                              </View>
                      
                      </View>
                      <View style={{}}>
                         <Text style= {{color:'blue',fontSize:16}} >Nội dung:</Text> 
                         <Text>{p.content}</Text>
                      </View>
                      
                  <TouchableOpacity onPress= {() => {navigate('PostDetail', {
                    id: p.id ,
                    })}}>
                    <Text style= {{color:'red',fontSize:16,padding:5,left:250}}>Xem chi tiết</Text>
                </TouchableOpacity>
                    <View style= {{paddingTop:20}}></View>
                  </View>
                  
                ))}
              </ScrollView>
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
                              <Icon1 type="material" style={{padding: 10}} size={35} color="green" name="contact-phone" />
                            
                              </TouchableOpacity>
                   
                    </View> 
                    <View style = {styles.btn4} >
                  

                   <TouchableOpacity
                              onPress= {() => {navigate('Post')}}>
                              <Icon1 type="ant" style={{padding: 10}} size={30} color="blue" name="notification" />
                            
                              </TouchableOpacity>
                    </View>
                    <View style = {styles.btn5}>

                           <TouchableOpacity
                              onPress= {() => {navigate('Cart')}}>
                              <Icon1 type="fa5" style={{padding: 10}} size={30} color="green"
                               name="shopping-cart" 
                               containerStyle={{marginHorizontal: 15, position: 'relative',}}
                               />
                              
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

export default Post;