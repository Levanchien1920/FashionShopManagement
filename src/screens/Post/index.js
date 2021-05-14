
import React, { useEffect, useState } from 'react';
import axiosInstance from '../../helper/axiosInstance';
import { ScrollView,  TouchableOpacity,Text, View,TextInput,Button,Image } from 'react-native';
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
              <ScrollView style={styles.listItemContainer}>
                {post.map((p) => (
                  <View key={p.id} style= {{borderColor:'yellow',borderBottomWidth:1,margin:8,width:350}}> 

                    <View style={{flexDirection:'row'}}>
                      <View style= {{width:230}}>
                            <Text style= {{color:'blue',fontSize:16}}>Tên sản phẩm:</Text> 
                            <Text>{p.name}</Text>
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
     
     </View>


    );
}

export default Post;