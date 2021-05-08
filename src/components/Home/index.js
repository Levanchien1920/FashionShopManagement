
import React, { useEffect, useState ,useContext} from 'react';
import {Image, Text, View, TouchableOpacity,ScrollView,Button,TextInput} from 'react-native';
import styles from './styles';
import {useNavigation } from '@react-navigation/native';
import axiosInstance from '../../helper/axiosInstance';
import ComponentHeader from '../ComponentHeader';
import Card from '../../screens/Card';
import {GlobalContext} from '../../context/Provider';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
const HomeComponent = () => {
  const [listProductBest , setlistProductBest] = useState([]);
  const [listProductNew , setlistProductNew] = useState([]);
  const [listBestReview , setlistBestReview] = useState([]);
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

  },[])

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
                        <Button  title= "Home" onPress= {() => {navigate('Home')}}>
                        </Button>
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
                  <ScrollView horizontal={true}>
                        <View style = {{flexDirection:'column'}}>
                          <Text style={styles.textIndex}>Best Selling</Text>
                          <View style={styles.listItemContainer}>
                            {listProductBest.map((product,index) => (
                              <View  key={index}>
                                      <Card product={product}></Card>
                                       <TouchableOpacity onPress= {() => {
                                         navigate('ProductDetail', {
                                            id: product.id ,
                                          })}}>
                                         <Text style={styles.text} >Chi tiết</Text>
                                        </TouchableOpacity>
                               </View> ))}
                          </View>
                       </View>
                    </ScrollView>

                    <View style={styles.listItemContainer}>
                            {listProductNew.map((product,index) => (
                              <View  key={index}>
                            <Card product={product}></Card>
                                      <TouchableOpacity onPress= {() => {navigate('ProductDetail', {
                                        id: product.id ,
                                      })}}>
                                        <Text  style={styles.text} >Chi tiết</Text>
                                    </TouchableOpacity>
                            </View>
                            ))}  
                      </View>
                    <View style={styles.listItemContainer}>
                      {listBestReview.map((review,index) => (
                        <View key= {index}>
                          <Text>content:{review.content}</Text> 
                          <Text>name product:{review.name_Product}</Text> 
                          <Text>name user:{review.name_User}</Text> 
                        </View>
                      ))}  
                      </View>

                    <View style={styles.seeMoreContainer}>
                      <Text style={styles.seeMoreText}>Welcome to app_shopping </Text>
                    </View>
            </ScrollView> 
        </View>

    );

    //////////////////


//     ((!isLoggedIn) ? (
//        <View>

      
//       <View style={styles.screenContainer}>
            
//               <View style={styles.headerContainer}>
//                       <View style={styles.inputContainer}>
//                           <FontAwesome name="search" size={24} color="#969696" />
//                           <TextInput style={styles.inputText} />
//                       </View>
                    
//                       <View style={styles.cartContainer}>
//                             <FontAwesome name="shopping-cart" size={24} color="#fff" />
//                       </View>
//               </View>
//               <View  style = {styles.createSection}>
//                     <TouchableOpacity onPress= {() => {navigate('Home')}}>
//                         <Text  style = {styles.linkBtn}>Home</Text>
//                     </TouchableOpacity>
//                     <Button title= "Product" onPress= {() => {navigate('Products')}}>
//                         {/* <Text  style = {styles.linkBtn}>Products</Text> */}
//                     </Button>
//                     <TouchableOpacity onPress= {() => {navigate('Contact')}}>
//                         <Text  style = {styles.linkBtn}>Contact</Text>
//                     </TouchableOpacity>

//                     <TouchableOpacity onPress= {() => {navigate('Post')}}>
//                         <Text  style = {styles.linkBtn}>Post</Text>
//                     </TouchableOpacity>

//                     <TouchableOpacity onPress= {() => {navigate('Cart')}}>
//                         <Text  style = {styles.linkBtn}>Cart</Text>
//                     </TouchableOpacity>

//               </View>




//           </View>




//           <ScrollView style={styles.bodyContainer}>
//                   <ScrollView horizontal={true}>
//                         <View style = {{flexDirection:'column'}}>
//                           <Text style={styles.textIndex}>Best Selling</Text>
//                           <View style={styles.listItemContainer}>
//                             {listProductBest.map((product,index) => (
//                               <View  key={index}>
//                                       <Card product={product}></Card>
//                                        <TouchableOpacity onPress= {() => {
//                                          navigate('ProductDetail', {
//                                             id: product.id ,
//                                           })}}>
//                                            <Text style={styles.text} >Chi tiết</Text>
//                                         </TouchableOpacity>
//                                </View> ))}
//                           </View>
//                        </View>
//                     </ScrollView>

//                     <View style={styles.listItemContainer}>
//                             {listProductNew.map((product,index) => (
//                               <View  key={index}>
//                             <Card product={product}></Card>
//                                       <TouchableOpacity onPress= {() => {navigate('ProductDetail', {
//                                         id: product.id ,
//                                       })}}>
//                                         <Text  style={styles.text} >Chi tiết</Text>
//                                     </TouchableOpacity>
//                             </View>
//                             ))}  
//                       </View>
//                     <View style={styles.listItemContainer}>
//                       {listBestReview.map((review,index) => (
//                         <View key= {index}>
//                           <Text>content:{review.content}</Text> 
//                           <Text>name product:{review.name_Product}</Text> 
//                           <Text>name user:{review.name_User}</Text> 
//                         </View>
//                       ))}  
//                       </View>

//                     <View style={styles.seeMoreContainer}>
//                       <Text style={styles.seeMoreText}>Welcome to app_shopping </Text>
//                     </View>
//             </ScrollView> 
              
              
//      </View>

   
// ) : (<View>
//        <View style={styles.screenContainer}>
            
//             <View style={styles.headerContainer}>
//                     <View style={styles.inputContainer}>
//                         <FontAwesome name="search" size={24} color="#969696" />
//                         <TextInput style={styles.inputText} />
//                     </View>
                  
//                     <View style={styles.cartContainer}>
//                           <FontAwesome name="shopping-cart" size={24} color="#fff" />
//                     </View>
//             </View>
//             <View  style = {styles.createSection}>
//                   <TouchableOpacity onPress= {() => {navigate('Home')}}>
//                       <Text  style = {styles.linkBtn}>Home</Text>
//                   </TouchableOpacity>
//                   <Button title= "Product" onPress= {() => {navigate('Products')}}>
//                       {/* <Text  style = {styles.linkBtn}>Products</Text> */}
//                   </Button>

//                   <TouchableOpacity onPress= {() => {navigate('MyAccount')}}>
//                         <Text  style = {styles.linkBtn}>Myaccount</Text>
//                  </TouchableOpacity>    
//                   <TouchableOpacity onPress= {() => {navigate('Contact')}}>
//                       <Text  style = {styles.linkBtn}>Contact</Text>
//                   </TouchableOpacity>

//                   <TouchableOpacity onPress= {() => {navigate('Post')}}>
//                       <Text  style = {styles.linkBtn}>Post</Text>
//                   </TouchableOpacity>

//                   <TouchableOpacity onPress= {() => {navigate('Cart')}}>
//                       <Text  style = {styles.linkBtn}>Cart</Text>
//                   </TouchableOpacity>

//             </View>




//         </View>

//         <ScrollView style={styles.bodyContainer}>
//                   <ScrollView horizontal={true}>
//                         <View style = {{flexDirection:'column'}}>
//                           <Text style={styles.textIndex}>Best Selling</Text>
//                           <View style={styles.listItemContainer}>
//                             {listProductBest.map((product,index) => (
//                               <View  key={index}>
//                                       <Card product={product}></Card>
//                                        <TouchableOpacity onPress= {() => {
//                                          navigate('ProductDetail', {
//                                             id: product.id ,
//                                           })}}>
//                                            <Text style={styles.text} >Chi tiết</Text>
//                                         </TouchableOpacity>
//                                </View> ))}
//                           </View>
//                        </View>
//                     </ScrollView>

//                     <View style={styles.listItemContainer}>
//                             {listProductNew.map((product,index) => (
//                               <View  key={index}>
//                             <Card product={product}></Card>
//                                       <TouchableOpacity onPress= {() => {navigate('ProductDetail', {
//                                         id: product.id ,
//                                       })}}>
//                                         <Text  style={styles.text} >Chi tiết</Text>
//                                     </TouchableOpacity>
//                             </View>
//                             ))}  
//                       </View>
//                     <View style={styles.listItemContainer}>
//                       {listBestReview.map((review,index) => (
//                         <View key= {index}>
//                           <Text>content:{review.content}</Text> 
//                           <Text>name product:{review.name_Product}</Text> 
//                           <Text>name user:{review.name_User}</Text> 
//                         </View>
//                       ))}  
//                       </View>

//                     <View style={styles.seeMoreContainer}>
//                       <Text style={styles.seeMoreText}>Welcome to app_shopping </Text>
//                     </View>
//             </ScrollView> 







// </View>))
}

export default HomeComponent;