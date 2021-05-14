
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../helper/axiosInstance';
import { Text, View,TextInput,Button } from 'react-native';
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


            <View style={styles.bodyContainer}>
                <View>
                     

                      <View>
                            <Text style= {{color:'blue',fontSize:16}}>Tiêu đề:</Text> 
                            <Text>{post.title}</Text>
                      </View>
                      <View>
                         <Text style= {{color:'blue',fontSize:16}} >Nội dung:</Text> 
                         <Text>{post.content}</Text>
                      </View>

                     
                      
                 </View>

          </View>
       

 

</View>


    );
}

export default PostDetail;