
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../helper/axiosInstance';
import { ScrollView, StyleSheet, TouchableOpacity,Text, View,TextInput,Button } from 'react-native';
import styles from './styles';
import {useNavigation, useRoute} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const PostDetail = () => {
    const {navigate} =useNavigation();
    const route = useRoute();
    const [post, setpost] = useState({});
    useEffect(() => {
        const id=route.params.id;
        axiosInstance.get(`/client/post/${id}`).then((response)=> {
            setpost(response.data);
        }).catch((error) =>{
        });
    }, [])
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
<View>
     
                <View >
                <Text>id:{post.name}</Text> 
                <Text>name:{post.name}</Text> 
                <Text>content:{post.content}</Text> 
                <Text>link:{post.link}</Text> 
                 </View>

        </View>
  <View style={styles.seeMoreContainer}>
    <Text style={styles.seeMoreText}>Welcome to app_shopping </Text>
</View>
</View> 

</View>


    );
}

export default PostDetail;