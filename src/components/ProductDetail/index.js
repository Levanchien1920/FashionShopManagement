import React, {useEffect, useState} from 'react';
import { StyleSheet, Text, View,TextInput, TouchableOpacity,ScrollView ,Image, Button} from 'react-native';
import styles from './styles';
import {useNavigation, useRoute} from '@react-navigation/native';
import ComponentHeader from '../ComponentHeader';
import axiosInstance from '../../helper/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
                axiosInstance.get(`/client/category/${filter.id}`).then((response)=> {
                    setlistProduct(response.data.content);
                }).catch((error) =>{
                });
            }
        if (filter.check === 2){
            axiosInstance.get(`/client/brand/${filter.id}`).then((response)=> {
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
        axiosInstance.get(`/client/product/${id}`).then((response)=> {
            setProduct(response.data);
            setcolorSizeM(response.data.m);
            setcolorSizeL(response.data.l);
            setcolorSizeXL(response.data.xl);
            setcolorSizeXXL(response.data.xxl);
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

   <ScrollView horizontal={true} style={styles.scrollViewContainer} >
       <Image  source={{ uri: Product.link }}
                 style={{width: 100, height: 200, borderWidth: 1}} />
     
     <View style={styles.listItemContainer}>
            <View>
                <Text>Name:{Product.name}</Text>
                <Text>Price:{Product.price}</Text>
                <Text>brandName:{Product.brandName}</Text>
                <View style={{ flexDirection: 'row',}} >
                <Button  title="+" onPress= {() => { onChangeNumber(number+1)} }>    
                         </Button>
                 <TextInput
                    style={{ textAlign:'center',}}
                    value={number}
                 />
                 <Button   title="-" onPress= {() => { if(number>0) {
                     onChangeNumber(number-1)} } }>
                 </Button>
                 </View>
                <View style={{ flexDirection: 'row',}}>
                <Button  title="M"  onPress={()=> {setfilter({...filter , check : 0 , size : "m" })}}></Button>
                <Button  title="L"  onPress={() => {setfilter({...filter , check : 0 , size : "l" })}}></Button>
                <Button  title="XL"  onPress={() => {setfilter({...filter , check : 0 , size : "xl" })}}></Button>
                <Button  title="XXL"  onPress={() => {setfilter({...filter , check : 0 , size : "xxl" })}}></Button>
                </View>
                
                <View>
                   
                    {color.map((color) => (                       
                    <Button title={color} ></Button>
                     ))}
                </View>

            <TouchableOpacity onPress= {() => {} }>
             <Text >Add to card</Text>
         </TouchableOpacity>
            </View>
         </View>

           
   
   </ScrollView>



   <View>
             <Text style={{ textAlign:'center',}}>Description</Text>
             <Text style={{ textAlign:'center',}}>{Product.des}</Text>
    </View>

    < View>
    <Text style={{ textAlign:'center',}}>Review</Text>
    <TextInput
     style={{ 
    	height: 40, 
    	borderColor: 'gray', 
    	borderWidth: 1,
    
    }}
	multiline={true}
    numberOfLines={10}
    onChangeText={text => setTextInputValue(text)}
    value={textInputValue}
    placeholder="Insert your review!"
    />

<Button  title="Submit"  onClick={e => {
    const review ={
        'id': AsyncStorage.getItem('id'),
        'content':textInputValue,
        'name_Product':Product.name,
        'email':"",
        'name_User':AsyncStorage.getItem('username'),
        "number_Of_Star": 3

    }

    axiosInstance.get(`/client/review`,review).then((response)=> {
        console.log("success");
    }).catch((error) =>{
        console.log("error");
    });
}}></Button>

    </View>
    
 </View>
   </ScrollView>
   
     </View>
     </View>
        
    );
}

export default ProductDetailComponent;