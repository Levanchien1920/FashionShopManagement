
import React, { useState ,useEffect} from 'react';
import { StyleSheet,Image, Text, View,TextInput, TouchableOpacity,StatusBar,ScrollView ,Dimensions} from 'react-native';
import Container from '../common/Container';
import Input from '../common/Input';
import CustomButtom from '../common/CustomButton';
import styles from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation } from '@react-navigation/native';
import ComponentHeader from '../ComponentHeader/index';
import axios from 'axios';




const ProductItem = ({image, name, price}) => (
  <View style={styles.itemContainer}>
    <Image  source={{ uri: {image} }}
   style={{width: 100, height: 200, borderWidth: 1}} />
    <Text style={styles.itemName} numberOfLines={2}>
      {name}
    </Text>
    <Text style={styles.itemPrice}>{price}</Text>

  </View>
);

const ProductComponent = () => {

  const [listProduct , setlistProduct] = useState([]);
  const [listCategory, setlistCategory] = useState([]);
  const [listBrand, setlistBrand] = useState([]);
  const [filter , setfilter] = useState({
      check  : 0, 
      id  : 0,
  });


  useEffect(() => {
    if (filter.check === 0) {
        axios.get('http://localhost:9090/api/v1/product').then((response)=> {
            setlistProduct(response.data.content);
        }).catch((error) =>{
        });
    }
    if (filter.check === 1){
            axios.get(`http://localhost:9090/api/v1/client/category/${filter.id}`).then((response)=> {
                setlistProduct(response.data.content);
            }).catch((error) =>{
            });
        }
    if (filter.check === 2){
            axios.get(`http://localhost:9090/api/v1/client/brand/${filter.id}`).then((response)=> {
                setlistProduct(response.data.content);
            }).catch((error) =>{
            });
        }
    if (filter.check === 3){
            listProduct.sort((a, b) => (a.name > b.name) ? 1 : -1);
        }
    if (filter.check === 4){
            listProduct.sort((a, b) => (a.name < b.name) ? 1 : -1);
        }
    if (filter.check === 5){
            listProduct.sort((a, b) => (a.price > b.price) ? 1 : -1);
        }
    if (filter.check === 6){
            listProduct.sort((a, b) => (a.price < b.price) ? 1 : -1);
        }
   
}, [filter]);


useEffect(() => {
  axios.get('http://localhost:9090/api/v1/category').then((response)=> {
      setlistCategory(response.data.content);
  }).catch((error) =>{
  });
  axios.get('http://localhost:9090/api/v1/brand').then((response)=> {
      setlistBrand(response.data.content);
  }).catch((error) =>{
  });
}, []);

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
  
   {/*  */}
  
   {/*  */}

   <ScrollView horizontal={true}>
     <View style={styles.listItemContainer}>
     {listProduct.map((e, index) => (
            <View key={index.toString()}>
               <ProductItem
                name={e.name}
                image={e.image1}
                price={e.price}
              />

           <TouchableOpacity onPress= {() => {navigate('ProductDetail', {
            id: e.id ,
          })}}>
             <Text >Chi tiết</Text>
         </TouchableOpacity>

         </View>
       ))}
     </View>


     
   </ScrollView>

   
   <ScrollView horizontal={true}>
     <View style={styles.listItemContainer}>
     {listCategory.map((e, index) => (
            <View key={index.toString()}>
               <ProductItem
                name={e.name}
                image={e.image1}
                price={e.price}
              />

           <TouchableOpacity onPress= {() => (setfilter({check : 1 ,id: e.id }))}>
             <Text >Chi tiết</Text>
         </TouchableOpacity>

         </View>
       ))}
     </View>


     
   </ScrollView>

   <ScrollView horizontal={true}>

   <View style={styles.listItemContainer}>
     {listBrand.map((e, index) => (
            <View key={index.toString()}>
               <ProductItem
                name={e.name}
                image={e.image1}
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

export default ProductComponent;