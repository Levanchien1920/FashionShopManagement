
import React, { useEffect, useState } from 'react';
import {Image, Text, View, TouchableOpacity,ScrollView} from 'react-native';
import styles from './styles';
import {useNavigation } from '@react-navigation/native';
import axiosInstance from '../../helper/axiosInstance';
import ComponentHeader from '../ComponentHeader';
import Card from '../../screens/Card';

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
         <ComponentHeader />
       
       <View style={styles.bodyContainer}>
   
      <ScrollView horizontal={true}>
        <View style={styles.listItemContainer}>
        {listProductBest.map((product) => (
          <View>

                    <Card product={product} key={product.id}></Card>

                      <TouchableOpacity onPress= {() => {navigate('ProductDetail', {
                          id: product.id ,
                        })}}>
                          <Text >Chi tiết</Text>
                      </TouchableOpacity>
          </View>
               
               ))}
        </View>

    
      </ScrollView>

      <View style={styles.listItemContainer}>
        
              {listProductNew.map((product) => (
                <View>

            
               <Card product={product} key={product.id}></Card>

                        <TouchableOpacity onPress= {() => {navigate('ProductDetail', {
                          id: product.id ,
                        })}}>
                          <Text >Chi tiết</Text>
                      </TouchableOpacity>
              
               </View>
                  
               ))}  
     
        </View>

        
      <View style={styles.listItemContainer}>
        
        {listBestReview.map((review) => (
          <View key= {review.id}>
             <Text>content:{review.content}</Text> 
             <Text>name product:{review.name_Product}</Text> 
             <Text>name user:{review.name_User}</Text> 
          </View>
         ))}  

  </View>
      {/*  */}
      <View style={styles.seeMoreContainer}>
        <Text style={styles.seeMoreText}>Welcome to app_shopping </Text>
      </View>
    </View> 
      </View>

    );
}

export default HomeComponent;