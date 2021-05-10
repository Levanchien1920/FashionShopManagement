import React, { useEffect, useState } from "react";
import CartComponent from "../../components/Cart";
import {Text,View,TextInput,Image,Button,ScrollView,} from "react-native";
import axiosInstance from "../../helper/axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";
const Cart = () => {
  const { navigate } = useNavigation();
  const [productItem, setProductItem] = useState([]);
  const [total, setTotal] = useState(0);
  const [number, onChangeNumber] = React.useState(0);
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
                  if (dem == 0) productItem.push(element);
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
            console.log("total:" + total);
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
        // let total = this.state.total - (product.qty * product.price)
        setTotal(total - product.qty * product.price);
      }
    });

    // this.setState({productItem, total});
  };

  // const changeQty = (product, qty) => {
  //     let cart = JSON.parse(localStorage.getItem('cart')); //get cart form localStorage and convert to array
  //     // let {productItem} = this.state
  //     setProductItem(productItem)
  //     let total = 0;
  //     // console.log(product.item.id)
  //     for (var i = 0; i < productItem.length; i++) {

  //         if(productItem[i].id === product.id) {
  //             productItem[i].qty = qty
  //             cart[product.id] = qty;  //and set qty to cart
  //         }
  //         total += productItem[i].price * productItem[i].qty;
  //     }
  //     localStorage.setItem('cart', JSON.stringify(cart)); //convert cart to json and save to localStorage
  //     // this.setState({total});
  //     setTotal(total)
  // }

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
                      source={{ uri: product.link }}
                      style={{ width: 70, height: 100, borderWidth: 1 }}
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
                          product.qty = product.qty + 1;
                        }}
                      ></Button>
                    </View>

                    <View style={{ left: 5, top: "60%" }}>
                      <TextInput
                        style={{ textAlign: "center" }}
                        value={product.qty}
                        borderWidth={2}
                      />
                    </View>
                    <View style={styles.button}>
                      <Button
                        title="-"
                        onPress={() => {
                          if (number > 0) {
                            {
                              product.qty = product.qty - 1;
                            }
                          }
                        }}
                      ></Button>
                    </View>
                  </View>

                  <Text style={styles.textList1}>Total: {total[index]} VDN</Text>
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
            ))
          ) : (
            <View></View>
          )}
        </ScrollView>
      </ScrollView>

      <View>
        <Button color="chocolate"  title="Checkout" onPress={() => {}}>
           
        </Button>
      </View>
    </View>
  );
};

export default Cart;
