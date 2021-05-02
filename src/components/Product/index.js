
import React, { useState ,useEffect} from 'react';
import { StyleSheet,Image, Text, View,TextInput, TouchableOpacity,StatusBar,ScrollView ,Dimensions,FlatList} from 'react-native';
import Container from '../common/Container';
import Input from '../common/Input';
import CustomButtom from '../common/CustomButton';
import styles from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation } from '@react-navigation/native';
import ComponentHeader from '../ComponentHeader/index';
import axios from 'axios';
import RNPickerSelect from "react-native-picker-select";




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
        axios.get('http://localhost:9090/api/v1/client/product').then((response)=> {
            setlistProduct(response.data.content);
        }).catch((error) =>{
        });
    }
    if (filter.check === 1){
            axios.get(`http://localhost:9090/api/v1/client/category/relateProduct/${filter.id}`).then((response)=> {
                setlistProduct(response.data.content);
            }).catch((error) =>{
            });
        }
    if (filter.check === 2){
            axios.get(`http://localhost:9090/api/v1/client/brand/relateProduct/${filter.id}`).then((response)=> {
                setlistProduct(response.data.content);
            }).catch((error) =>{
            });
        }
       
}, [filter]);


useEffect(() => {
  axios.get('http://localhost:9090/api/v1/client/category').then((response)=> {
      setlistCategory(response.data.content);
  }).catch((error) =>{
  });
  axios.get('http://localhost:9090/api/v1/client/brand').then((response)=> {
      setlistBrand(response.data.content);
  }).catch((error) =>{
  });
}, []);

  const {navigate} =useNavigation();

  function SortName (c) {
switch (c) {
  case 3: {
    listProduct.sort((a, b) => (a.name > b.name) ? 1 : -1);
    break;
  }
  case 4: {
    listProduct.sort((a, b) => (a.name < b.name) ? 1 : -1);
    break;
  }
  case 5: {
    listProduct.sort((a, b) => (a.price > b.price) ? 1 : -1);
    break;
  }
  case 6: {
    listProduct.sort((a, b) => (a.price < b.price) ? 1 : -1);
    break;
  }
}
      setfilter({
          ...filter, check : c
      });
 }
    
    return (
      <View>
      <ComponentHeader />

     

    <View style={styles.bodyContainer}>
    <ScrollView horizontal={true} >

        <View>

        <View style={styles.container} horizontal={true}>
            <Text>Sorting:</Text>
            <RNPickerSelect
              items={[
               { label: "Name (A-Z)", value: 3 },
               { label: "Name (Z-A)", value: 4 },
               { label: "Price (Low to High)", value: 5 },
               { label: "Price (High to low)", value: 6 },
             
           ]}
                onValueChange={(value) =>  { 
                 console.log(value);
               SortName(Number(value));

                }
               }
              
            />
        </View>
        <View style={styles.listItemContainer}>
          {listProduct.map((e, index) => (
            <View key={index.toString()}>
               <ProductItem
                name={e.name}
                image={e.link}
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
      </View>

       <View>
            
           <Text>Category</Text>

           {listCategory.map((category) => (
             <View>
               <TouchableOpacity  onPress={() => (setfilter({check : 1 ,id: category.id }))}>
                <Text >{category.name}</Text>
            </TouchableOpacity>
             </View>
                              
                 ))} 
           </View>

     

           <View>
            
            <Text>Brand</Text>
 
            {listBrand.map((brand) => (
              <View>
           <TouchableOpacity  onPress={() => (setfilter({check : 2 ,id: brand.id }))}>
          <Text >{brand.name}</Text>
             </TouchableOpacity>
         
          
              </View>
                               
                  ))} 
            </View>

     
     </ScrollView>
          <View style={styles.seeMoreContainer}>
               <Text style={styles.seeMoreText}>Welcome </Text>
           </View>
   </View>
   
     </View>
      

    );
}

export default ProductComponent;