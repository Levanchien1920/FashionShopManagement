
import React, { useEffect, useState } from 'react';
import { StyleSheet,Image, Text, View,TextInput, TouchableOpacity,StatusBar,ScrollView ,Dimensions} from 'react-native';
import Container from '../common/Container';
import Input from '../common/Input';
import CustomButtom from '../common/CustomButton';
import styles from './styles';
import {useNavigation } from '@react-navigation/native';
import axios from 'axios';


import FontAwesome from 'react-native-vector-icons/FontAwesome';

import ComponentHeader from '../ComponentHeader';

const section_banner = require('../../assets/images/section_banner.png');


const ProductItem = ({image, name, price}) => (
  
  
  <View style={styles.itemContainer}>

  <Image  source={{ uri: {image} }}
   style={{width: 100, height: 200, borderWidth: 10}}
  //  style={styles.itemImage}
  />
   
    <Text style={styles.itemName} numberOfLines={2}>
      {name}
    </Text>
    <Text style={styles.itemPrice}>{price}</Text>
    
  </View>
);



const HomeComponent = () => {
  const [listProductNP , setlistProductNP] = useState([]);
  useEffect(() => {
           axios.get('http://localhost:9090/api/v1/product').then((response)=> {
               setlistProductNP(response.data.content);
          }).catch((error) =>{
          })
  },[])

  console.log(listProductNP);

  const {navigate} =useNavigation();
    return (
        <View>
         <ComponentHeader />
       <View style={styles.bodyContainer}>
        <ScrollView>
        <View style={styles.sectionContainer}>
      {/*  */}
      <Text style={styles.sectionTitle}>Clothers</Text>
      {/*  */}
      <Image source={section_banner} style={styles.sectionImage} />
      {/*  */}
     
      {/*  */}
      <ScrollView horizontal={true}>
        <View style={styles.listItemContainer}>
          {listProductNP.map((e, index) => (
            <View key={index.toString()}>
               <ProductItem
                name={e.name}
                image={e.link}
                price={e.price}
              />

              <TouchableOpacity onPress= {() => {navigate('ProductDetail')}}>
                <Text >Chi tiết</Text>
            </TouchableOpacity>

            </View>
          ))}
        </View>
      </ScrollView>
      {/*  */}
      <View style={styles.seeMoreContainer}>
        <Text style={styles.seeMoreText}>XEM THÊM 636 SẢN PHẨM </Text>
      </View>
    </View>
        </ScrollView>
      </View>
      
        </View>



    );
}



export default HomeComponent;