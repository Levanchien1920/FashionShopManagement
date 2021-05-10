
import React, { useState ,useEffect, useContext} from 'react';
import { StyleSheet,Image, Text, View,TextInput, TouchableOpacity,ScrollView ,Dimensions,FlatList,Button} from 'react-native';
import styles from './styles';
import {useNavigation } from '@react-navigation/native';
import RNPickerSelect from "react-native-picker-select";
import axiosInstance from '../../helper/axiosInstance';
import Card from '../../screens/Card';
import {GlobalContext} from '../../context/Provider';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Input from '../common/Input';

const ProductComponent = () => {
  const [searchInput, setSearchInput] = React.useState('');
  const {authState : {isLoggedIn},}= useContext(GlobalContext);
  const [listProduct , setlistProduct] = useState([]);
  const [listCategory, setlistCategory] = useState([]);
  const [listBrand, setlistBrand] = useState([]);
  const [filter , setfilter] = useState({
      check  : 0, 
      id  : 0,
      search : "",
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

        if (filter.check === 3) {
          axiosInstance.get(`client/product?search=${searchInput}`).then((response)=> {
              setlistProduct(response.data.content);
              console.log(response.data.content)
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
function search(c) {
  setfilter({
      ...filter, check : c , search : searchInput
  });
}

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

 <View style= {{height:'100%',width:'100%'}}>
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

              <View style= {{flexDirection:'row'}}>
                      <View style= {{width:"70%"}}>
                      <TextInput
                          style={{ 
                              height: 40, 
                              borderColor: 'yellow', 
                              borderWidth: 1,
                          }}
                          onChangeText={text => setSearchInput(text)}
                          placeholder="Search"
                          />
                      </View>
                          
                      <View style={{left:'15%'}}>
                              <Button title="Search"  onPress= {()=> {
                                setfilter({
                                  ...filter, check : 3 , search : searchInput
                              });
                              }}>

                              </Button>
                      </View>

             </View>
       
          <View style={{top:20,backgroundColor:'red',height:50}}>
            <RNPickerSelect 
             placeholder={{
              value: 3,
              label:"select"
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
        
    <ScrollView horizontal={true} style= {{marginTop:30}} >
        
        <View style={{width:250}}>
                      <View style={styles.listItemContainer}>
                            {listProduct.map((product,index) => (
                              <View style={{marginLeft:10,marginTop:5}} key={index}>
                                        <Card product={product}></Card>

                                        <TouchableOpacity onPress= {() => {
                                           navigate('ProductDetail', {
                                            id: product.id ,
                                          })}}>
                                         <Text style={styles.text} >Chi tiết</Text>
                               </TouchableOpacity>
                              </View>
                            ))}  

                            
                      </View>
      </View>

       <View style={{width:70}}>
              <View>
                      <Text style={{color:'red',fontSize:18}}>Category</Text>
                      {listCategory.map((category,index) => (
                        <View key={index}>
                          <TouchableOpacity  onPress={() => (setfilter({check : 1 ,id: category.id }))}>
                          <View style={{marginTop:20}}>
                            <Text style= {{borderBottomWidth:1,fontSize:15}}>{category.name}</Text>
                            </View>
                        </TouchableOpacity>
                        </View>
                            ))} 
              </View>
                <View style={{top:20}}>
                      <Text style={{color:'red',fontSize:18}}>Brand</Text>
                      {listBrand.map((brand,index) => (
                        <View key={index}>
                              <TouchableOpacity  onPress={() => (setfilter({check : 2 ,id: brand.id }))}>
                                  <View style={{marginTop:20}}>
                                  <Text style= {{borderBottomWidth:1,fontSize:15}} >{brand.name}</Text>
                                  </View>
                                   
                              </TouchableOpacity>
                        </View>
                            ))} 
                  </View>

            </View>
      </ScrollView>
   </ScrollView>
</View>
    );
}

export default ProductComponent;