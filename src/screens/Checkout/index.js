import React, { useEffect, useState } from "react";
import {Text,View,TextInput,Image,Button,ScrollView,} from "react-native";
import axiosInstance from "../../helper/axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
const Checkout = () => {
  const { navigate } = useNavigation();
  const [productItem, setProductItem] = useState([]);
  const [total, setTotal] = useState(0);
  const [number, onChangeNumber] = React.useState(0);
  const [quantity,setQuantity]= useState([]);
  const [totalPrice,setTotalPrice]=useState([]);

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
    
            setTotal(total);
  

          })
          .catch(function (error) {
            console.log(error);
          });
      }
    });
  }, []);


  const addBill = (e) => {
    e.preventDefault();
    let id = e.target.id.toString();
    let cart = JSON.parse(localStorage.getItem('cart'));
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
            "price" : 100,
            "name" : "AO KI Zi"
        }
        // console.log(element)
        listItem.push(element);      
    }


    
    const data = {
            // id_user: Number(id),
            // paid: true,
            id_user: 1,
            id_employee: 1,
            totalMoney: total,
            listProducts: listItem
        } 
    console.log(data)
    API.post('invoice/', data)
    .then(response => {
       
        console.log(response.data)
        alert("Đặt hàng thành công")
        window.localStorage.removeItem("cart")
        history.push('/home')

    })
    .catch(errors => {
          console.log(errors)
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

      <ScrollView style={styles.bodyContainer} horizontal={true}>
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
                <View style={{ width: "30%", textAlign: "center" }}>
                  <View style={{ flexDirection: "column" }}>
                    <Text style={styles.textList}>{product.name}</Text>
                    <Image
                      source={{ uri: product.link}}
                      style={{ width: 100, height: 100, borderWidth: 1 }}
                    />
                    <Text style={styles.textList}>{product.price}VDN</Text>
                  </View>
                </View>
                <View style={{ width: "40%", flexDirection: "column" }}>
                 
                  <View style={{ flexDirection: "row", width: "40%", marginTop:30, marginBottom:10 }}>
                    <View style={styles.button}>
                      <Button
                        title="+"
                        onPress={() => {
                         addQty(product,index)
                        }}
                      ></Button>
                     </View>

                    <View style={{ left: 5, top: "60%" }}>
                      <TextInput
                        style={{ textAlign: "center" }}
                       
                        borderWidth={2}
                        
                        onChangeText= {e => handleChangeQty(e,product,index)}
                        value={quantity[index]+""}
                         
                      />
                    </View>
                    <View style={styles.button}>
                      <Button
                        title="-"
                        onPress={() => {
                         removeQty(product,index)
                        }}
                      ></Button>
                    </View>
                  </View>
                  <Text style={styles.textList1}>Total:{totalPrice[index]} VDN</Text>
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
      </ScrollView>

      <View>

            <View>
              <Text>Total all product:{total}</Text>
            </View>
            <View>
                <Button color="chocolate"  title="Checkout" onPress={() => {}}>
              
              </Button>
            </View>
       
      </View>
    </View>
  );
};

export default Checkout;
