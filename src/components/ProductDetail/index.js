import React, {useContext, useEffect, useState} from 'react';
import { StyleSheet, Text, View,TextInput, TouchableOpacity,ScrollView ,Image, Button} from 'react-native';
import styles from './styles';
import {useNavigation, useRoute} from '@react-navigation/native';
import axiosInstance from '../../helper/axiosInstance';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GlobalContext} from '../../context/Provider';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const ProductDetailComponent = () => {
    const route = useRoute();
    const [id, setId] = useState("");
    const [number, onChangeNumber] = React.useState(0);
    const [textInputValue, setTextInputValue] = React.useState('');
    const [color , setcolor] =useState([]);
    const [listProduct , setlistProduct] = useState([]);
    const [star , setstar] = useState(0);
    const [Product , setProduct] = useState([]);
    const [listCategory, setlistCategory] = useState([]);
    const [listBrand, setlistBrand] = useState([]);
    const {authState : {isLoggedIn},}= useContext(GlobalContext);
    const [filter , setfilter] = useState({
        check  : 0, 
        id  : 0,
        size : ""
    });

    const [OutputReview, setOutputReview] = useState({
        id_user : 1,
        id_product : 1,
        content : "",
        number_of_star : 5
    })
    const [colorSizeM , setcolorSizeM] = useState("")
    const [colorSizeL , setcolorSizeL] = useState("");
    const [colorSizeXL , setcolorSizeXL] = useState("")
    const [colorSizeXXL , setcolorSizeXXL] = useState("")
    const [brandRelated, setbrandRelated] = useState([]);
    const [cateRelated, setcateRelated] = useState([])
    const [quantity, setquantity] = useState(1);
    const {navigate} =useNavigation();


    useEffect(()=>{
        if(!isLoggedIn) return 
          AsyncStorage.getItem('id', (err, result) => {
            setId(result);
         });
      },[isLoggedIn])


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

    function submitReview() {
       
            
        if (isLoggedIn == true) {
            axiosInstance.post(`/client/review`, OutputReview).then((response)=> {
                console.log("review success");
            }).catch((error) =>{
                console.log(error);
            });
        } else {
            console.log("moi ban dang nhap");
        }
        
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




          <View>
            <ScrollView>
                <View style={styles.sectionContainer}>
            <ScrollView horizontal={true}  >
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
                                value={number.toString()}
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

                   <Button  title="Add to cart" onPress= {() => {
                              AsyncStorage.getItem('cart').then((res)=> {
                            if(res!=null) {
                            const cart=JSON.parse(res);
                            let id = Product.id.toString();
                            cart[id] = (cart[id] ? cart[id]: 0);
                            let qty = cart[id] + parseInt(quantity);
                            cart[id] = qty;
                            AsyncStorage.setItem('cart', JSON.stringify(cart));
                            }
                            if(res==null) {
                                const cart={};
                                let id = product.id.toString();
                                cart[id] = (cart[id] ? cart[id]: 0);
                                let qty = cart[id] + parseInt(quantity);
                                cart[id] = qty;
                                AsyncStorage.setItem('cart', JSON.stringify(cart));
                                }
                            }
                        )}} >
                     </Button>
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
                onChangeText={e => setOutputReview({...OutputReview ,content : e, id_user : id , id_product : Product.id})} 
                value={OutputReview.content}
                placeholder="Insert your review!"
                />

            <Button  title="Submit"  onPress={submitReview}></Button>

                </View>
                
            </View>
            </ScrollView>
            
        </View>
</View>
        
    );
}

export default ProductDetailComponent;