
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../helper/axiosInstance';
import { ScrollView, StyleSheet, TouchableOpacity,Text, View,TextInput,Button } from 'react-native';
import styles from './styles';
import {useNavigation, useRoute} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const Post = () => {
    const [post, setpost] = useState([]);
    useEffect(() => {
        axiosInstance.get('/client/post').then((response)=> {
            setpost(response.data.content);
        }).catch((error) =>{
        });
    }, [])
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
                                <Button title= "Home" onPress= {() => {navigate('Home')}}>
                                </Button>
                                <Button title= "Product" onPress= {() => {navigate('Products')}}></Button>
                                <Button  title= "Contact" onPress= {() => {navigate('Contact')}}></Button>
                                <Button  title= "Post" onPress= {() => {navigate('Post')}}></Button>
                                <Button title= "Cart" onPress= {() => {navigate('Cart')}}>
              
                                </Button>
                       </View>
              </View>
          

              
    
      

      <View style={styles.bodyContainer}>
            <View >
              <View style={styles.listItemContainer}>
                {post.map((p) => (
                  <View key={p.id}> 
                      <Text>name:{p.name}</Text> 
                      <Text>content:{p.content}</Text> 
                  <TouchableOpacity onPress= {() => {navigate('PostDetail', {
                    id: p.id ,
                    })}}>
                    <Text >Chi tiết</Text>
                </TouchableOpacity>
                  </View>
                ))}
              </View>
            </View>
            <View style={styles.seeMoreContainer}>
              <Text style={styles.seeMoreText}>Welcome to app_shopping </Text>
     </View>
   </View> 
     
     </View>


    );
}

export default Post;