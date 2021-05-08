
import React, { useState ,useEffect, useContext} from 'react';
import { StyleSheet,Image, Text, View,TextInput, TouchableOpacity,ScrollView ,Dimensions,FlatList,Button} from 'react-native';
import styles from './styles';
import {useNavigation } from '@react-navigation/native';
import ComponentHeader from '../ComponentHeader/index';
import RNPickerSelect from "react-native-picker-select";
import axiosInstance from '../../helper/axiosInstance';
import Card from '../../screens/Card';
import {GlobalContext} from '../../context/Provider';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ProductComponent = () => {
  const {authState : {isLoggedIn},}= useContext(GlobalContext);
  const [listProduct , setlistProduct] = useState([]);
  const [listCategory, setlistCategory] = useState([]);
  const [listBrand, setlistBrand] = useState([]);
  const [filter , setfilter] = useState({
      check  : 0, 
      id  : 0,
  });


  useEffect(() => {
    if (filter.check === 0) {
      axiosInstance.get('/client/product').then((response)=> {
            setlistProduct(response.data.content);
        }).catch((error) =>{
        });
    }
    if (filter.check === 1){
      axiosInstance.get(`/client/category/relateProduct/${filter.id}`).then((response)=> {
                setlistProduct(response.data.content);
            }).catch((error) =>{
            });
        }
    if (filter.check === 2){
      axiosInstance.get(`/client/brand/relateProduct/${filter.id}`).then((response)=> {
                setlistProduct(response.data.content);
            }).catch((error) =>{
            });
        }
}, [filter]);


useEffect(() => {
  axiosInstance.get('/client/category').then((response)=> {
      setlistCategory(response.data.content);
  }).catch((error) =>{
  });
  axiosInstance.get('/client/brand').then((response)=> {
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
    <ScrollView horizontal={true} >

        <View>

        <View style={styles.container} >
          <View>
            <Text>Sorting</Text>
            <RNPickerSelect 
             placeholder={{
              value: 3,
            }}
              items={[
               { label: "Name (A-Z)", value: 3 },
               { label: "Name (Z-A)", value: 4 },
               { label: "Price (Low to High)", value: 5 },
               { label: "Price (High to low)", value: 6 },
                     ]} 
                onValueChange={(value) =>  { 
                         SortName(Number(value));
                        }
               }
            />

        </View>
        </View>
        <View style={styles.listItemContainer}>
              {listProduct.map((product,index) => (
                <View key={index}>
                          <Card product={product}></Card>
                </View>
               ))}  
        </View>
      </View>

          <View style={styles.scrollViewContainer}>
              <View>
                      <Text>Category</Text>
                      {listCategory.map((category,index) => (
                        <View key={index}>
                          <TouchableOpacity  onPress={() => (setfilter({check : 1 ,id: category.id }))}>
                            <Text >{category.name}</Text>
                        </TouchableOpacity>
                        </View>
                            ))} 
                </View>
                <View>
                      <Text>Brand</Text>
                      {listBrand.map((brand,index) => (
                        <View key={index}>
                              <TouchableOpacity  onPress={() => (setfilter({check : 2 ,id: brand.id }))}>
                                    <Text >{brand.name}</Text>
                              </TouchableOpacity>
                        </View>
                            ))} 
                  </View>

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