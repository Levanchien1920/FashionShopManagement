
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../helper/axiosInstance';
import { ScrollView, StyleSheet, TouchableOpacity,Text, View,TextInput } from 'react-native';
import styles from './styles';
import ComponentHeader from '../../components/ComponentHeader';
import {useNavigation, useRoute} from '@react-navigation/native';
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
        <ComponentHeader />
      <View style={styles.bodyContainer}>
     <ScrollView horizontal={true}>
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
     </ScrollView>
     <View style={styles.seeMoreContainer}>
       <Text style={styles.seeMoreText}>Welcome to app_shopping </Text>
     </View>
   </View> 
     
     </View>
    );
}

export default Post;