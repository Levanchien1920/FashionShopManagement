import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View,TextInput, TouchableOpacity,ScrollView ,Image, Button} from 'react-native';
import Container from '../common/Container';
import styles from './styles';
import {useNavigation, useRoute} from '@react-navigation/native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import ComponentHeader from '../ComponentHeader';
import axios from 'axios';


const ProductDetailComponent = () => {
    const route = useRoute();
    const [number, onChangeNumber] = React.useState(0);
    const [textInputValue, setTextInputValue] = React.useState('');

    const [color , setcolor] =useState([]);
    const [listProduct , setlistProduct] = useState([]);
    const [star , setstar] = useState(0);
    const [Product , setProduct] = useState([]);
    const [listCategory, setlistCategory] = useState([]);
    const [listBrand, setlistBrand] = useState([]);
    const [filter , setfilter] = useState({
        check  : 0, 
        id  : 0,
        size : ""
    });
    const [colorSizeM , setcolorSizeM] = useState("")
    const [colorSizeL , setcolorSizeL] = useState("");
    const [colorSizeXL , setcolorSizeXL] = useState("")
    const [colorSizeXXL , setcolorSizeXXL] = useState("")
    const [brandRelated, setbrandRelated] = useState([]);
    const [cateRelated, setcateRelated] = useState([])

    useEffect(() => {
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
        if (filter.check === 0){
                colorinsize(filter.size);
            }
    }, [filter]);


    useEffect(() => {
        const id=route.params.id;
        axios.get(`http://localhost:9090/api/v1/client/product/${id}`).then((response)=> {
            setProduct(response.data);
            setcolorSizeM(response.data.m);
            setcolorSizeL(response.data.l);
            setcolorSizeXL(response.data.xl);
            setcolorSizeXXL(response.data.xxl);
        }).catch((error) =>{
        });

        axios.get('http://localhost:9090/api/v1/client/category').then((response)=> {
            setlistCategory(response.data.content);
        }).catch((error) =>{
        });
        axios.get('http://localhost:9090/api/v1/client/brand').then((response)=> {
            setlistBrand(response.data.content);
        }).catch((error) =>{
        });
      
    }, []);

    const colorinsize = (size) => {
        switch(size) {
            case "m":
                let colorofsizem = colorSizeM.split(" ");
                colorofsizem.pop();
                setcolor(colorofsizem);
              break;
            case "l":
                let colorofsizel = colorSizeL.split(" ");
                colorofsizel.pop();
                setcolor(colorofsizel);
              break;
            case "xl":
                let colorofsizexl = colorSizeXL.split(" ");
                colorofsizexl.pop();
                setcolor(colorofsizexl);
                break;
            case "xxl":
                let colorofsizexxl = colorSizeXXL.split(" ");
                colorofsizexxl.pop();
                setcolor(colorofsizexxl);
              break;
            default:
                console.log("no");
        }
    }


    return (
        <View>
      <ComponentHeader />
    <View style={styles.bodyContainer}>
     <ScrollView>
     <View style={styles.sectionContainer}>

   <ScrollView horizontal={true}>
       
       <Image  source={{ uri: Product.link }}
                 style={{width: 100, height: 200, borderWidth: 1}} />
     
     <View style={styles.listItemContainer}>
            <View>
                <Text>Name:{Product.name}</Text>
                <Text>Price:{Product.price}</Text>
                <Text>brandName:{Product.brandName}</Text>
                <View >
                <Button  style={{ flex: 0.3 }} title="+" onPress= {() => { onChangeNumber(number+1)} }>    
                         </Button>

                 <TextInput
                    style={{ flex: 0.3 }}
                    value={number}
                   
                 />
                 <Button   style={{ flex: 0.4 }}  title="-" onPress= {() => { if(number>0) {
                     onChangeNumber(number-1)} } }>
                         
                 </Button>
                 </View>
                <View>
                <Button  title="M"  onClick={e => {setfilter({...filter , check : 0 , size : "m" })}}></Button>
                <Button  title="L"  onClick={e => {setfilter({...filter , check : 0 , size : "l" })}}></Button>
                <Button  title="XL"  onClick={e => {setfilter({...filter , check : 0 , size : "xl" })}}></Button>
                <Button  title="XXL"  onClick={e => {setfilter({...filter , check : 0 , size : "xxl" })}}></Button>
                </View>
                
                <View>
                    <Text>Color</Text>
                    
                    {color.map((color) => (
                                                    
                    <Button title={color} ></Button>
                     ))}
                

                </View>

            <TouchableOpacity onPress= {() => {} }>
             <Text >Add to card</Text>
         </TouchableOpacity>
            </View>

    
         </View>

            <View>
            <View>
            
            <Text>Category</Text>
 
            {listCategory.map((category) => (
              <View key={category.id}>
                <TouchableOpacity  onPress={() => (setfilter({check : 1 ,id: category.id }))}>
                 <Text >{category.name}</Text>
             </TouchableOpacity>
              </View>
                               
                  ))} 
            </View>
 
      
 
            <View>
             
             <Text>Brand</Text>
  
             {listBrand.map((brand) => (
               <View key={brand.id}>
            <TouchableOpacity  onPress={() => (setfilter({check : 2 ,id: brand.id }))}>
           <Text >{brand.name}</Text>
              </TouchableOpacity>
          
           
               </View>
                                
                   ))} 
             </View>
            </View>





     
   </ScrollView>



   <View>
             <Text>Description</Text>
             <Text>{Product.des}</Text>
    </View>

    < View>
    <Text>Review</Text>
    <TextInput
     style={{ 
    	height: 40, 
    	borderColor: 'gray', 
    	borderWidth: 1,
    	placeholderTextColor: 'gray',
    }}
	multiline={true}
    numberOfLines={10}
    onChangeText={text => setTextInputValue(text)}
    value={textInputValue}
    placeholder="Insert your review!"
    />
    </View>
    
 </View>
   </ScrollView>
   
     </View>
     </View>
        
    );
}

export default ProductDetailComponent;