
import React, { useEffect, useState ,useContext} from 'react';
import {Image, Text, View, TouchableOpacity,ScrollView,Button,TextInput,SafeAreaView} from 'react-native';
import styles from './styles';
import {useNavigation } from '@react-navigation/native';
import axiosInstance from '../../helper/axiosInstance';
import Card from '../../screens/Card';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {GlobalContext} from '../../context/Provider';
const HomeComponent = () => {
  const [listProductBest , setlistProductBest] = useState([]);
  const [listProductNew , setlistProductNew] = useState([]);
  const [listBestReview , setlistBestReview] = useState([]);
  const {authState : {count},}= useContext(GlobalContext);
  useEffect(() => {
           axiosInstance.get('/client/product/best').then((response)=> {
               setlistProductBest(response.data.content);
          }).catch((error) =>{
          })
          axiosInstance.get('/client/product/new').then((response)=> {
            setlistProductNew(response.data.content);
       }).catch((error) =>{
       })

       axiosInstance.get('/client/review/good').then((response)=> {
        setlistBestReview(response.data.content);
         }).catch((error) =>{
       })

  },[count])

  const {navigate} =useNavigation();
    return (
        <View >
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
                        <View >
                          <Text style={styles.textIndex}>Best Selling</Text>
                          <View style={styles.listItemContainer}>
                            {listProductBest.map((product,index) => (
                              <View style={{marginLeft:32}} key={index}>
                                      <Card product={product}></Card>
                                      <Button title="Buy now" color="red" onPress= {() => {
                                         navigate('BuyNow', {
                                            id: product.id ,
                                          })}}></Button>
                                       <TouchableOpacity onPress= {() => {
                                         navigate('ProductDetail', {
                                            id: product.id ,
                                          })}}>
                                         <Text style={styles.text} >Chi tiết</Text>
                                        </TouchableOpacity>
                               </View> ))}
                          </View>
                       </View>

                       <View >
                             <Text style={styles.textIndex}>New product</Text>
                            <View style={styles.listItemContainer}>
                                    {listProductNew.map((product,index) => (
                                      <View style={{marginLeft:30}} key={index}>
                                    <Card product={product}></Card>

                                    <Button title="Buy now" color="red" onPress= {() => {
                                         navigate('BuyNow', {
                                            id: product.id ,
                                          })}}></Button>
                                              <TouchableOpacity onPress= {() => {navigate('ProductDetail', {
                                                id: product.id,
                                              })}}>
                                                <Text  style={styles.text} >Chi tiết</Text>
                                            </TouchableOpacity>
                                    </View>
                                    ))}  
                              </View>
                      </View>

                   <View style = {{flexDirection:'column'}}>
                      <Text style={styles.textIndex}>Review</Text>
                       <View style={styles.listItemContainer}>
                      {listBestReview.map((review,index) => (
                        <View key= {index} style= {{flexDirection:'column'}}>

                          <View style= {{flexDirection:'row'}}>
                            
                              <View style= {{flexDirection:'column'}}>
                                    <Image
                                          source={require('../../assets/images/avt.jpg')}
                                          style={styles.logoImage}
                                      />
                                  <Text style={{color:'blue',fontSize:16}}>{review.name_User}</Text> 
                                  
                              </View>
                              
                              <View style= {{flexDirection:'column',margin:10}}>
                                    <View style={{flexDirection:'row'}}>
                                           <Text style={{color:'blue',fontSize:16}}>Tên sản phẩm: </Text>
                                             <Text>:{review.name_Product}</Text> 
                                    </View>
                                    <View style={{flexDirection:'row'}}>
                                           <Text style={{color:'blue',fontSize:16}}>Nội dung: </Text>
                                             <Text>:{review.content}</Text> 
                                    </View>
                              </View>
                          </View>
                         
                        </View>

                        
                      ))}  
                      </View>
                      <View style= {{paddingTop:50}}></View>
                  </View>

                  
            </ScrollView> 
      </View>
    );
 
}

export default HomeComponent;