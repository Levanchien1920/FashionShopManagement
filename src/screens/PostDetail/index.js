
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../helper/axiosInstance';
import { Text, View,TextInput,Button,Image,TouchableOpacity} from 'react-native';
import styles from './styles';
import {useNavigation, useRoute} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Icon1 from '../../components/common/Icon';
import Swiper from 'react-native-swiper'
const PostDetail = () => {
    const {navigate} =useNavigation();
    const route = useRoute();
    const [post, setpost] = useState({});
   
    useEffect(() => {
        const id=route.params.id;
        axiosInstance.get(`/client/post/${id}`).then((response)=> {
            setpost((response.data)[0]);
         
           
        }).catch((error) =>{
        });
    }, [])
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

            <View style={styles.bodyContainer}>
                <View>
                      <View>
                            <Text style= {{color:'blue',fontSize:16}}>Tiêu đề:</Text> 
                            <Text>{post.title}</Text>
                      </View>
                      <View style={{marginLeft:'30%'}}>
                                 <Image
                                  source={{ uri: post.linkImage}}
                                  style={{ width: 100, height: 100, borderWidth: 1 }}
                                />
                              </View>
                              <View>
                         <Text style= {{color:'blue',fontSize:16,marginTop:10}} >Nội dung:</Text> 
                         <Text>{post.content}</Text>
                      </View>
                     
                      
                 </View>

          </View>


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
                              <Icon1 type="ant" style={{padding: 10}} size={30} color="green" name="notification" />
                            
                              </TouchableOpacity>
                    </View>
                    <View style = {styles.btn5}>

                           <TouchableOpacity
                              onPress= {() => {navigate('Cart')}}>
                              <Icon1 type="fa5" style={{padding: 10}} size={30} color="green" name="shopping-cart" />
                              </TouchableOpacity>
                    </View>
                  </View>
       

 

</View>


    );
}

export default PostDetail;