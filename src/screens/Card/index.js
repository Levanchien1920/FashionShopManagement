import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import styles from "./styles";
import {
  Image,
  Text,
  View,
  Button,
  Alert,
  TouchableOpacity,
  TouchableHighlight,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Stars from "react-native-stars";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { GlobalContext } from "../../context/Provider";
import Icon1 from "../../components/common/Icon";

const Card = (props) => {
  const {
    authState: { isLoggedIn },
  } = useContext(GlobalContext);
  const [test, setTest] = useState(false);

  const {
    authDispatch,
    authState: { check },
  } = useContext(GlobalContext);

  useEffect(() => {
    if (test) {
      Alert.alert(`Add to cart success!`);
    }
    setTest(false);
  }, [test]);

  const [logIn, setLogIn] = useState(false);
  useEffect(() => {
    if (logIn) {
      Alert.alert(`Buy now is failed,please log in!`);
    }
    setLogIn(false);
  }, [logIn]);
  const { product } = props;
  const [quantity, setquantity] = useState(1);
  const [star, setStar] = useState(1);
  useEffect(() => {
    setStar(product.numberOfStar);
  }, []);
  const { navigate } = useNavigation();
  return (
    <View style={{ flexDirection: "row" }}>
      <View style={{ width: 120, borderColor: "red" }}>
        <View style={{ marginRight: 20 }}>
          <Stars
            default={star}
            spacing={8}
            count={5}
            starSize={50}
            disabled={true}
            fullStar={<Icon name={"star"} style={[styles.myStarStyle]} />}
            emptyStar={
              <Icon
                name={"star-outline"}
                style={[styles.myStarStyle, styles.myEmptyStarStyle]}
              />
            }
            halfStar={<Icon name={"star-half"} style={[styles.myStarStyle]} />}
          />
        </View>
        <View style={{ marginTop: 10, width: 100, height: 100 }}>
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor="red"
            onPress={() => {
              navigate("ProductDetail", {
                id: product.id,
              });
            }}
          >
            <Image
              source={{ uri: product.link }}
              style={{ width: 100, height: 100 }}
            />
          </TouchableHighlight>
        </View>
        <View style={{ width: 100 }}>
          <Text style={{ color: "blue", fontSize: 18, textAlign: "center" }}>
            {product.price}$
          </Text>
        </View>
      </View>

      <View style={{ width: 100 }}>
        <View style={{ width: 100 }}>
          <Text style={{ color: "blue", fontSize: 18, textAlign: "center" }}>
            {product.name}
          </Text>
        </View>

        <View style={{ paddingTop: 30, flexDirection: "row" }}>
          <View>
            <TouchableOpacity
              onPress={() => {
                setTest(true);
                AsyncStorage.getItem("number").then((value) => {
                  AsyncStorage.setItem("number", parseInt(value) + 1 + "");
                  if (check) {
                    authDispatch({
                      type: "false",
                    });
                  } else {
                    authDispatch({
                      type: "true",
                    });
                  }
                });

                AsyncStorage.getItem("cart").then((res) => {
                  if (res != null) {
                    const cart = JSON.parse(res);
                    let id = product.id.toString();
                    cart[id] = cart[id] ? cart[id] : 0;
                    let qty = cart[id] + parseInt(quantity);
                    cart[id] = qty;
                    AsyncStorage.setItem("cart", JSON.stringify(cart));
                  }
                  if (res == null) {
                    const cart = {};
                    let id = product.id.toString();
                    cart[id] = cart[id] ? cart[id] : 0;
                    let qty = cart[id] + parseInt(quantity);
                    cart[id] = qty;
                    AsyncStorage.setItem("cart", JSON.stringify(cart));
                  }
                });
              }}
            >
              <Icon1
                type="fa5"
                style={{ padding: 10 }}
                size={30}
                color="green"
                name="cart-plus"
              />
            </TouchableOpacity>
          </View>

          <View style={{ marginTop: 10, width: 40, height: 40, left: 10 }}>
            <TouchableHighlight
              activeOpacity={0.6}
              underlayColor="red"
              onPress={() => {
                if (isLoggedIn === false) {
                  setLogIn(true);
                } else {
                  navigate("BuyNow", {
                    id: product.id,
                  });
                }
              }}
            >
              <Image
                source={require("../../assets/images/buynow1.jpg")}
                style={{ width: 40, height: 40 }}
              />
            </TouchableHighlight>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Card;
