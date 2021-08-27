import React, { useContext, useEffect, useState } from "react";
import {
  Text,
  View,
  TextInput,
  Image,
  Button,
  ScrollView,
  Alert,
  TouchableOpacity,
} from "react-native";
import axiosInstance from "../../helper/axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import { useNavigation, useRoute } from "@react-navigation/native";
import { GlobalContext } from "../../context/Provider";
import Icon1 from "../../components/common/Icon";
import Swiper from "react-native-swiper";
const BuyNow = () => {
  const route = useRoute();
  const [productItem, setProductItem] = useState([]);
  const [total, setTotal] = useState(0);

  const { navigate } = useNavigation();
  const [account, setaccount] = useState({
    id: 0,
    username: "",
    password: "",
    fullname: "",
    address: "",
    email: "",
    phoneNumber: "",
  });

  const [test, setTest] = useState(false);
  const [fail, setFail] = useState(false);
  const {
    authState: { isLoggedIn },
  } = useContext(GlobalContext);

  const [cartCount, setCartCount] = useState("0");
  const {
    authState: { check },
  } = useContext(GlobalContext);
  useEffect(() => {
    AsyncStorage.getItem("number").then((value) => {
      setCartCount(value);
    });
  }, [check]);

  useEffect(() => {
    if (test) {
      Alert.alert(`Order success!`);
    }
    setTest(false);
  }, [test]);

  useEffect(() => {
    if (fail) {
      Alert.alert(`Order is failed!`);
    }
    setFail(false);
  }, [fail]);
  useEffect(() => {
    AsyncStorage.getItem("token").then((res) => {
      AsyncStorage.getItem("id").then((value) => {
        axiosInstance
          .get(`/client/user/${value}`, {
            headers: {
              Authorization: `Bearer ${res}`,
            },
          })
          .then((response) => {
            setaccount(response.data);
          })
          .catch((error) => {});
      });
    });
  }, []);

  useEffect(() => {
    const id = route.params.id;
    axiosInstance
      .get(`client/product/${id}`)
      .then((response) => {
        setProductItem(response.data);
        setTotal(response.data.price);
      })
      .catch(function (error) {});
  }, []);

  const addBill = () => {
    const id = route.params.id;
    const listItem = [];
    const element = {
      id: Number(id),
      number: 1,
    };
    listItem.push(element);

    const data = {
      id_user: account.id,
      id_employee: 1,
      totalMoney: total,
      listProducts: listItem,
    };

    AsyncStorage.getItem("token").then((res) => {
      axiosInstance
        .post("client/invoice", data, {
          headers: {
            Authorization: `Bearer ${res}`,
          },
        })
        .then((response) => {
          AsyncStorage.removeItem("cart");
          setTest(true);
          navigate("Invoice");
        })
        .catch((errors) => {
          setFail(true);
        });
    });
  };
  return (
    <View>
      <View>
        <View style={styles.headerContainer}>
          <Swiper style={styles.wrapper} showsButtons={true} autoplay={true}>
            <View style={styles.slide1}>
              <Image
                source={require("../../assets/images/b1.jpg")}
                style={{ height: 100 }}
              />
            </View>
            <View style={styles.slide2}>
              <Image
                source={require("../../assets/images/b2.jpg")}
                style={{ height: 100 }}
              />
            </View>
            <View style={styles.slide3}>
              <Image
                source={require("../../assets/images/b3.jpg")}
                style={{ height: 100 }}
              />
            </View>
          </Swiper>
        </View>
      </View>

      <ScrollView style={styles.bodyContainer}>
        <View>
          <View style={{ marginTop: "5%" }}>
            <Text style={{ fontSize: 18, color: "red", textAlign: "center" }}>
              Thông tin khách hàng
            </Text>
          </View>
          <View
            style={{ marginTop: "5%", marginLeft: "30%", marginRight: "30%" }}
          >
            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: "blue", fontSize: 16 }}>Họ tên: </Text>
              <Text>{account.fullName}</Text>
            </View>
            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: "blue", fontSize: 16 }}>Địa chỉ: </Text>
              <Text>{account.address}</Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: "blue", fontSize: 16 }}>Email: </Text>
              <Text>{account.email}</Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Text style={{ color: "blue", fontSize: 16 }}>
                Phone number:{" "}
              </Text>
              <Text>{account.phoneNumber}</Text>
            </View>
          </View>

          <View style={{ marginTop: "7%" }}>
            <Text style={{ fontSize: 18, color: "red", textAlign: "center" }}>
              Thông tin đơn hàng
            </Text>
          </View>
        </View>

        <ScrollView>
          <View
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "row",
              borderBottomWidth: 1,
              justifyContent: "space-between",
            }}
          >
            <View style={{ width: "30%", textAlign: "center" }}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Text style={styles.textList}>{productItem.name}</Text>
                <Image
                  source={{ uri: productItem.link }}
                  style={{ width: 100, height: 100, borderWidth: 1 }}
                />
                <Text style={styles.textList}>{productItem.price}VDN</Text>
              </View>
            </View>

            <View style={{ width: "30%", flexDirection: "row", top: "40%" }}>
              <Text
                style={{ color: "blue", fontSize: 16, textAlign: "center" }}
              >
                Số lượng:{" "}
              </Text>
              <Text>1</Text>
            </View>

            <View style={{ width: "40%", flexDirection: "row", top: "40%" }}>
              <Text
                style={{ color: "blue", fontSize: 16, textAlign: "center" }}
              >
                Giá tiền:{" "}
              </Text>
              <Text>{productItem.price}</Text>
            </View>
          </View>
        </ScrollView>

        <View style={{ marginTop: 5 }}>
          <View>
            <Text style={{ color: "blue", fontSize: 16, textAlign: "center" }}>
              Total all product:{total}
            </Text>
          </View>
          <View>
            <Button color="chocolate" title="Order" onPress={addBill}></Button>
          </View>
        </View>
      </ScrollView>

      <View style={styles.createSection}>
        <View style={styles.btn1}>
          <TouchableOpacity
            onPress={() => {
              navigate("Home");
            }}
          >
            <Icon1
              type="fa5"
              style={{ padding: 10 }}
              size={30}
              color="green"
              name="home"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.btn2}>
          <TouchableOpacity
            onPress={() => {
              navigate("Product");
            }}
          >
            <Icon1
              type="ionicon"
              style={{ padding: 10 }}
              size={30}
              color="green"
              name="shirt"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.btn3}>
          <TouchableOpacity
            onPress={() => {
              navigate("Contact");
            }}
          >
            <Icon1
              type="material"
              style={{ padding: 10 }}
              size={35}
              color="green"
              name="contact-phone"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.btn4}>
          <TouchableOpacity
            onPress={() => {
              navigate("Post");
            }}
          >
            <Icon1
              type="ant"
              style={{ padding: 10 }}
              size={30}
              color="green"
              name="notification"
            />
          </TouchableOpacity>
        </View>
        <View style={styles.btn5}>
          <TouchableOpacity
            onPress={() => {
              navigate("Cart");
            }}
          >
            <Icon1
              type="fa5"
              style={{ padding: 10 }}
              size={30}
              color="green"
              name="shopping-cart"
              containerStyle={{ marginHorizontal: 15, position: "relative" }}
            />
            {cartCount > 0 ? (
              <View
                style={{
                  position: "absolute",
                  backgroundColor: "red",
                  width: 16,
                  height: 16,
                  borderRadius: 15 / 2,
                  right: 10,
                  top: +10,
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#FFFFFF",
                    fontSize: 8,
                  }}
                >
                  {cartCount}
                </Text>
              </View>
            ) : null}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default BuyNow;
