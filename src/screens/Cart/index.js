import React, { useContext, useEffect, useState } from "react";
import {Text,View,TextInput,Image,Button,ScrollView,Alert,TouchableOpacity} from "react-native";
import axiosInstance from "../../helper/axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import {GlobalContext} from '../../context/Provider';
import Icon1 from '../../components/common/Icon';
import Swiper from 'react-native-swiper'
const Cart = () => {
  const { navigate } = useNavigation();
  const [productItem, setProductItem] = useState([]);
  const [total, setTotal] = useState(0);
  const [quantity,setQuantity]= useState([]);
  const [totalPrice,setTotalPrice]=useState([]);
  const [test,setTest] =useState(false)
  const [empty,setEmpty] =useState(false)
  const {authState : {isLoggedIn},}= useContext(GlobalContext);
  const [text,setText] =useState(0)
  console.log(isLoggedIn);
  useEffect(()=>{
    if(test) {
        Alert.alert(`Checkout is failed,please log in!`)
    }
    setTest(false);
    }
  ,[test])

  useEffect(()=>{
    if(empty) {
        Alert.alert(`Cart is empty!`)
    }
    setEmpty(false);
    }
  ,[empty])

  useEffect(() => {

    let keys = [];
    AsyncStorage.getItem("cart").then((res) => {
      if (res != null) {
        const cart = JSON.parse(res);
        for (var item in cart) {
          if (cart.hasOwnProperty(item)) {
            keys.push(item);
            console.log(item);
          }
        }
        axiosInstance
          .get("client/product")
          .then((response) => {
            console.log(response.data.content);
            let total = 0;
            let listProduct = response.data.content;
            let productItem = [];
            let arrTotalPrice=[];
            let arrQuantity=[];

            listProduct.forEach(function (element) {
              keys.forEach(function (key) {
                if (key == element.id) {
                  element.qty = cart[key];
                  var dem = 0;
                  productItem.forEach(function (product) {
                    if (product.id == element.id) {
                      dem++;
                      return false;
                    }
                  });
                  if (dem == 0) {
                    productItem.push(element);
                    arrQuantity.push(element.qty);
                    arrTotalPrice.push(element.qty*element.price);
                  } 
                }
              });
            });
            console.log("productItem");
            console.log(productItem);
            for (var i = 0; i < productItem.length; i++) {
              total += productItem[i].price * productItem[i].qty;
            }
            setProductItem(productItem);
            setQuantity(arrQuantity);
            setTotalPrice(arrTotalPrice);
            setTotal(total);
          })
          .catch(function (error) {
            console.log(error);
          });
      }
    });
  }, []);
 

  const removeFromCart = (product) => {
    setProductItem(productItem.filter((item) => item.id !== product.id));
    AsyncStorage.getItem("cart").then((res) => {
      if (res != null) {
        const cart = JSON.parse(res);
        delete cart[product.id.toString()];
        AsyncStorage.setItem("cart", JSON.stringify(cart));
        setTotal(total - product.qty * product.price);
      }
    });
  };

const addQty = (product,index) => {
    const temp1=[...quantity];
    temp1[index]=parseInt(quantity[index])+1;
    setQuantity(temp1)
    const temp2=[...totalPrice];
    temp2[index]= product.price * temp1[index];
    setTotalPrice(temp2)
    console.log(quantity[index]);
    changeQty(product,parseInt(quantity[index]) + 1)
  };

 

  const removeQty = (product,index) => {
    if(quantity[index]>0) {
      const temp1=[...quantity];
      temp1[index]=parseInt(quantity[index])-1;
      setQuantity(temp1)
      const temp2=[...totalPrice];
      temp2[index]= product.price * temp1[index];
      setTotalPrice(temp2)
      console.log(totalPrice);
    }
    changeQty(product,parseInt(quantity[index]) - 1)
  };

  const changeQty = (product, qty) => {
    AsyncStorage.getItem("cart").then((res) => {
        const cart = JSON.parse(res);
        let total=0;
        for (var i = 0; i < productItem.length; i++) {
          if(productItem[i].id === product.id) {
              productItem[i].qty = qty
              cart[product.id] = qty; 
          }
          total += productItem[i].price * productItem[i].qty;
      }
      AsyncStorage.setItem("cart", JSON.stringify(cart));
      setTotal(total)
    });


  }

  return (
    <View>
      <View>
        <View style={styles.headerContainer}>
                      
                     <Swiper style={styles.wrapper} showsButtons={true} autoplay={true}>
                              <View style={styles.slide1}>
                              <Image  
                                 source={require('../../assets/images/b1.jpg')}
                                    style={{height: 100}}/>
                              </View>
                              <View style={styles.slide2}>
                              <Image  
                                 source={require('../../assets/images/b2.jpg')}
                                    style={{height: 100}}/>
                              </View>
                              <View style={styles.slide3}>
                              <Image  
                                 source={require('../../assets/images/b3.jpg')}
                                    style={{height: 100}}/>
                              </View>
                      </Swiper>
   
        </View>

       
      </View>

      <ScrollView style={styles.bodyContainer} >
        <ScrollView>
          {Array.isArray(productItem) && productItem.length > 0 ? (
            productItem.map((product, index) => (
              <View
                style={{
                  flexDirection: "row",
                  borderBottomWidth: 1,
                  borderBottomColor:'yellow',
                  justifyContent: "space-between",
                  width: 340,
                  margin: 10,
                }}
                key={index}
              >
                <View style={{ width: "30%", textAlign: "center" }}>
                  <View style={{ flexDirection: "column" }}>
                    <Text style={styles.textList}>{product.name}</Text>
                    <Image
                      source={{ uri: product.link}}
                      style={{ width: 100, height: 100, borderWidth: 1 }}
                    />
                    <Text style={styles.textList}>{product.price}$</Text>
                  </View>
                </View>
                <View style={{ width: "40%", flexDirection: "column" }}>
                 
                  <View style={{ flexDirection: "row", width: "40%", marginTop:20, marginBottom:10 ,marginLeft:20}}>
                    <View style={styles.button}>
                      <Button
                        title="+" color="orange"
                        onPress={() => {
                         addQty(product,index)
                        }}
                      ></Button>
                     </View>

                    <View style={{ left: 5, top: "60%" }}>
                      <TextInput
                        style={{ textAlign: "center" }}
                       keyboardType={"numeric"}
                        borderWidth={2}
                        value={quantity[index]+""}
                        onChangeText= {text => { 
                          if( isNaN(parseInt(text))) {
                           text=0
                          }
                          const temp=[...quantity];
                          temp[index]=parseInt(text);
                          setQuantity(temp) ;

                          changeQty(product,temp[index])
                          
                          const temp2=[...totalPrice];
                          temp2[index]= product.price * temp[index];
                          setTotalPrice(temp2)
                          
                        
                        }}
                        
                         
                      />
                    </View>
                    <View style={styles.button}>
                      <Button
                        title="-" color="orange"
                        onPress={() => {
                         removeQty(product,index)
                        }}
                      ></Button>
                    </View>
                  </View>

                  <Text style={styles.textList1}>Total:{totalPrice[index]}$</Text>
                </View>

                <View style={{ width: "16%" }}>
                  <View style={{ top: "40%" }}>
                    <Button
                      title="Xóa"
                      onPress={() => {
                        removeFromCart(product);
                      }}
                    ></Button>
                  </View>
                </View>
              </View>

            )
            )
            
          ) : (
            <View></View>
          )}
        </ScrollView>


            <View style={{marginTop:10}}>

                      <View>
                        <Text style={{color:'blue',fontSize:16,textAlign:'center'}}>Total all product:{total}</Text>
                      </View>
                      <View>
                          <Button color="chocolate"  title="Checkout" onPress={() => { 
                            if(isLoggedIn===false) {
                            setTest(true);
                           }else {
                            if(productItem.length===0) {
                              setEmpty(true)
                            }else {
                              navigate("Checkout")
                            }
                            
                          }
                           }}>
                        
                        </Button>
                      </View>
              </View>
      </ScrollView>


      <View  style = {styles.createSection}>
                <View style = {styles.btn1}>   
                            <TouchableOpacity
                              onPress= {() => {navigate('Home')}}>
                              <Icon1 type="fa5" style={{padding: 10}} size={30} color="green" name="home" />
                            
                              </TouchableOpacity>
                              
                   </View>
                   <View style = {styles.btn2}>
                        <TouchableOpacity
                              onPress= {() => {navigate('Product')}}>
                              <Icon1 type="ionicon" style={{padding: 10}} size={30} color="green" name="shirt" />
                            
                         </TouchableOpacity>

              

                   </View>
                    <View style = {styles.btn3}> 
                         <TouchableOpacity
                              onPress= {() => {navigate('Contact')}}>
                              <Icon1 type="material" style={{padding: 10}} size={35} color="green" name="contact-phone" />
                            
                              </TouchableOpacity>
                   
                    </View> 
                    <View style = {styles.btn4} >
                  

                   <TouchableOpacity
                              onPress= {() => {navigate('Post')}}>
                              <Icon1 type="ant" style={{padding: 10}} size={30} color="green" name="notification" />
                            
                              </TouchableOpacity>
                    </View>
                    <View style = {styles.btn5}>

                           <TouchableOpacity
                              onPress= {() => {navigate('Cart')}}>
                              <Icon1 type="fa5" style={{padding: 10}} size={30} color="green" name="shopping-cart" />
                              </TouchableOpacity>
                    </View>
                  </View>

     
    </View>
  );
};

export default Cart;
