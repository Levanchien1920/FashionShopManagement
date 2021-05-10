import React, {useContext, useEffect, useState} from 'react';
import { StyleSheet,Alert,Text, View,TextInput, TouchableOpacity,ScrollView ,Image, Button} from 'react-native';
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
        number_of_star : 2
    })
    const [colorSizeM , setcolorSizeM] = useState("")
    const [colorSizeL , setcolorSizeL] = useState("");
    const [colorSizeXL , setcolorSizeXL] = useState("")
    const [colorSizeXXL , setcolorSizeXXL] = useState("")
    const [brandRelated, setbrandRelated] = useState([]);
    const [cateRelated, setcateRelated] = useState([])
    const [quantity, setquantity] = useState(1);
    const {navigate} =useNavigation();

    const [test,setTest] =useState(false)
    useEffect(()=>{
        if(test) {
            Alert.alert(`Review is failed,Please log in or fill out my review`)
        }
        setTest(false)
    }
      ,[test])


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
       
        if (isLoggedIn == true && OutputReview.content!=="") {
            axiosInstance.post(`/client/review`, OutputReview).then((response)=> {
                console.log("review success");
            }).catch((error) =>{
                console.log(error);
            });
        } else {
            setTest(true)
            console.log("moi ban dang nhap");
        }
        
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

          <ScrollView style={{backgroundColor:'pink',height:'100%',marginTop:'5%'}}>
            <ScrollView>
              
            <ScrollView horizontal={true} style= {{flexDirection:'row',height:250, marginTop:"5%", borderBottomWidth: 1}}  >
                <View style= {{top:5}}>  
                    <Image  source={{ uri: Product.link }}
                            style={{width: 110, height: 245}} />
                </View>
                <View style={styles.listItemContainer}>
                        <View>
                            <View style={{flexDirection:'row'}}>
                                    <Text style={styles.textTitle}>Name: </Text>
                                    <Text>{Product.name}</Text>
                            </View>

                            <View style={{flexDirection:'row'}}>
                                    <Text style={styles.textTitle}>Price: </Text>
                                    <Text>{Product.price}</Text>
                            </View>
                           

                            <View style={{flexDirection:'row'}}>
                                    <Text style={styles.textTitle}>Brand: </Text>
                                    <Text>{Product.brandName}</Text>
                            </View>

                            <View style={{ flexDirection: 'row',left:20}} >
                                    <View style= {{width:40,height:40}}>
                                        <Button color='orange'  title="+" onPress= {() => { onChangeNumber(number+1)}}>    
                                        </Button>
                                    </View>
                                   <View style= {{width:40,height:40}}>
                                        <TextInput
                                                style={{ textAlign:'center',}}
                                                value={number.toString()}
                                            />
                                   </View>

                                   <View style= {{width:40,height:40}}> 
                                        <Button  color='orange'  title="-" onPress= {() => { if(number>0) {
                                                onChangeNumber(number-1)} } }>
                                            </Button>

                                   </View>
                                    
                                  
                            </View>

                     <View style={{ flexDirection: 'row',top:5}}>
                                <View style= {{width:40,height:40}}>
                                <Button  title="M"  onPress={()=> {setfilter({...filter , check : 0 , size : "m" })}}></Button>
                                </View>
                           
                                <View  style= {{left:5,width:40,height:40}}>
                                        <Button  title="L"  onPress={() => {setfilter({...filter , check : 0 , size : "l" })}}></Button>
                                </View>
                           
                                <View style= {{left:10,width:40,height:40}}>
                                    <Button  title="XL"  onPress={() => {setfilter({...filter , check : 0 , size : "xl" })}}></Button>
                                </View>
                           
                                <View style= {{left:15,width:40,height:40}}>
                                <Button  title="XXL"  onPress={() => {setfilter({...filter , check : 0 , size : "xxl" })}}></Button>
                                </View>
                           
                            </View>

                            <View style= {{left:20,width:100,height:40,top:10}}>
                                {color.map((color) => (                       
                                <Button title={color} ></Button>
                                ))}
                            </View>

                <View style= {{left:20,width:100,height:40,top:10}}>
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
                    </View>
            </ScrollView>

            <View>

                 <View>
                        <Text style={{textAlign:'center',fontSize:16,color:'blue'}}>Description</Text>
                        <Text style={{ textAlign:'center',top:5}}>{Product.des}</Text>
                </View>

                <View style={{top:10}}>
                <Text style={{ textAlign:'center',fontSize:16,color:'blue'}}>Review</Text>
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
            
        </ScrollView>
</View>
        
    );
}

export default ProductDetailComponent;