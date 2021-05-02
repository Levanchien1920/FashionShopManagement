
import React, { useEffect, useState } from 'react';
import { StyleSheet,Image, Text, View,TextInput, TouchableOpacity,StatusBar,ScrollView} from 'react-native';
import styles from './styles';
import {useNavigation } from '@react-navigation/native';
import axios from 'axios';

import ComponentHeader from '../ComponentHeader';



// const ProductItem = ({image, name, price}) => (
  
  
//   <View style={styles.itemContainer}>

//   <Image  source={{ uri: {image} }}
//    style={{width: 100, height: 200, borderWidth: 1}}
//   />
   
//     <Text style={styles.itemName} numberOfLines={2}>
//       {name}
//     </Text>
//     <Text style={styles.itemPrice}>{price}</Text>
    
//   </View>
// );



const HomeComponent = () => {
  const [listProductNP , setlistProductNP] = useState([]);
  useEffect(() => {
           axios.get('http://localhost:9090/api/v1/client/product').then((response)=> {
               setlistProductNP(response.data.content);
          }).catch((error) =>{
          })
  },[])

  // console.log(listProductNP);

  const {navigate} =useNavigation();
  const [selectedValue, setSelectedValue] = useState("java");
    return (
        <View>
          
         <ComponentHeader />

         <View>
       <View style={styles.bodyContainer}>
        <ScrollView>
        <View style={styles.sectionContainer}>
      {/*  */}
      <Text style={styles.sectionTitle}>Clothers</Text>
   
      <ScrollView horizontal={true}>
        <View style={styles.listItemContainer}>
          {listProductNP.map((product) => (
            <View key={product.id}> 
               <Text>name:{product.name}</Text> 
               <Image  source={{ uri: product.link }}
               style={{width: 100, height: 200, borderWidth: 1}}/>
                <Text>price:{product.price}</Text>

            <TouchableOpacity onPress= {() => {navigate('ProductDetail', {
            id: product.id ,
          })}}>
             <Text >Chi tiết</Text>
         </TouchableOpacity>

            </View>
          ))}
        </View>
      </ScrollView>
      {/*  */}
      <View style={styles.seeMoreContainer}>
        <Text style={styles.seeMoreText}>Welcome to app_shopping </Text>
      </View>
    </View>
        </ScrollView>
      </View>

      </View>
      
        </View>



    );
}



export default HomeComponent;