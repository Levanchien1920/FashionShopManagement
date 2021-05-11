import React, { useContext, useEffect, useState } from "react";
import {Text,View,TextInput,Image,Button,ScrollView,Alert} from "react-native";
import axiosInstance from "../../helper/axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
import {GlobalContext} from '../../context/Provider';
const Checkout = () => {

  const [productItem, setProductItem] = useState([]);
  const [total, setTotal] = useState(0);

  const {navigate} =useNavigation();
  const [ account, setaccount] = useState({
          "id": 0,
          "username": "",
          "password": "",
          "fullname": "",
          "address": "",
          "email": "",
          "phoneNumber": "",
  })

  const [test,setTest] =useState(false)
  const [fail,setFail] =useState(false)
  const {authState : {isLoggedIn},}= useContext(GlobalContext);
  console.log(isLoggedIn);
  useEffect(()=>{
    if(test) {
        Alert.alert(`Order success!`)
    }
    setTest(false);
    }
  ,[test])

  useEffect(()=>{
    if(fail) {
        Alert.alert(`Order is failed!`)
    }
    setFail(false);
    }
  ,[fail])
  useEffect(() => {   
    AsyncStorage.getItem('token')
    .then((res) => {
        AsyncStorage.getItem('id')
        .then((value) => {
          axiosInstance.get(`/client/user/${value}`,
          {
          headers: {
            'Authorization': `Bearer ${res}`
          } 
          }).then((response)=> {
              setaccount(response.data);
          }).catch((error) =>{
          });
        })

    })
  }, [])
 
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
            setTotal(total);
          })
          .catch(function(error) {
            console.log(error);
          });
      }
    });
  }, []);

  const addBill = () => {
    AsyncStorage.getItem("cart").then((res) => {
      let cart = JSON.parse(res);
      let listItem = [];
      let keys = [];
       for (var item in cart) {
        if(cart.hasOwnProperty(item)){
          keys.push(item)
        }
        }

    for(var item in cart) {
        var element = {
            "id" : Number(item),
            "number" : cart[item],
        }
        console.log(element)
        listItem.push(element);      
    }


 
    const data = {
            "id_user": account.id,
            "id_employee": 1,
            "totalMoney": total,
            "listProducts": listItem
        } 
 


   
 AsyncStorage.getItem('token')
  .then((res) => {
    axiosInstance.post('client/invoice', data, {
      headers: {
        'Authorization': `Bearer ${res}`
      } 
      })
    .then(response => {
        console.log(response.data)
        AsyncStorage.removeItem("cart");
        setTest(true);
      
    })
    .catch(errors => {
          console.log(errors)
        setFail(true);
    })
  })
})
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

        <View style={styles.createSection}>
          <View style={styles.btn1}>
            <Button
              title="Home"
              onPress={() => {
                navigate("Home");
              }}
            >
              {" "}
            </Button>
          </View>
          <View style={styles.btn2}>
            <Button
              title="Product"
              onPress={() => {
                navigate("Products");
              }}
            ></Button>
          </View>
          <View style={styles.btn3}>
            <Button
              title="Contact"
              onPress={() => {
                navigate("Contact");
              }}
            ></Button>
          </View>
          <View style={styles.btn4}>
            <Button
              title="Post"
              onPress={() => {
                navigate("Post");
              }}
            ></Button>
          </View>
          <View style={styles.btn5}>
            <Button
              title="Cart"
              onPress={() => {
                navigate("Cart");
              }}
            ></Button>
          </View>
        </View>
      </View>

      <ScrollView style={styles.bodyContainer} >
      <View>
                  <View style={{marginTop:'5%'}}>
                    <Text style= {{fontSize:18,color:'red',textAlign:'center'}}>Thông tin khách hàng</Text>
                  </View>
                  <View style={{marginTop:'5%',marginLeft:'30%',marginRight:'30%'}}> 

                               <View style= {{flexDirection:'row'}}>
                                    <Text style= {{color:'blue',fontSize:16}}>Họ tên:  </Text> 
                                    <Text>{account.fullName}</Text>
                              </View>
                              <View style= {{flexDirection:'row'}}>
                                <Text style= {{color:'blue',fontSize:16}} >Địa chỉ:  </Text> 
                                <Text>{account.address}</Text>
                              </View>

                              <View style= {{flexDirection:'row'}}>
                                <Text style= {{color:'blue',fontSize:16}} >Email:  </Text> 
                                <Text>{account.email}</Text>
                              </View>

                              <View style= {{flexDirection:'row'}}>
                                <Text style= {{color:'blue',fontSize:16}} >Phone number:  </Text> 
                                <Text>{account.phoneNumber}</Text>
                              </View>

                              
                  </View>

                  <View style={{marginTop:'7%'}}>
                    <Text style= {{fontSize:18,color:'red',textAlign:'center'}}>Thông tin đơn hàng</Text>
                  </View>
                 

        </View>

        <ScrollView>
          {Array.isArray(productItem) && productItem.length > 0 ? (
            productItem.map((product, index) => (
              <View
                style={{
                  flexDirection: "row",
                  borderBottomWidth: 1,
                  justifyContent: "space-between",
                  width: 340,
                  margin: 10,
                }}
                key={index}
              >
                <View style={{ width: "40%", textAlign: "center" }}>
                      <View style={{ flexDirection: "column" }}>
                        <Text style={styles.textList}>{product.name}</Text>
                        <Image
                          source={{uri: product.link}}
                          style={{width: 100,height: 100,borderWidth: 1 }}
                        />
                        <Text style={styles.textList}>{product.price}VDN</Text>
                      </View>
                </View>

                <View style= {{width: "30%",flexDirection:'row',top:'40%'}}>
                      <Text style={{color:'blue',fontSize:16,textAlign:'center'}}>Số lượng: </Text>
                      <Text>{product.qty}</Text>

                </View>
                
                <View style= {{width: "30%",flexDirection:'row',top:'40%'}}>
                      <Text style={{color:'blue',fontSize:16,textAlign:'center'}}>Giá tiền: </Text>
                      <Text>{product.qty*product.price}</Text>
                </View>
              </View>
            )
            )
            
          ) : (
            <View></View>
          )}
        </ScrollView>

              <View style={{marginTop:5}}>
                      <View>
                      <Text style={{color:'blue',fontSize:16,textAlign:'center'}}>Total all product:{total}</Text>
                      </View>
                      <View>
                          <Button color="chocolate"  title="Order" onPress={addBill}>
                        </Button>
                      </View>

               </View>

  
      </ScrollView>

    
    </View>
  );
};

export default Checkout;
