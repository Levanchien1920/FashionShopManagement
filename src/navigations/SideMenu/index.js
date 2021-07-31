import React, { useContext, useEffect, useState } from "react";
import { SafeAreaView, View, Image, Text, Button } from "react-native";
import Container from "../../components/common/Container";
import styles from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { GlobalContext } from "../../context/Provider";

const SideMenu = ({ navigation }) => {
  const [fullName, setFullName] = useState("");
  const {
    authState: { isLoggedIn },
  } = useContext(GlobalContext);
  useEffect(() => {
    if (!isLoggedIn) return;
    AsyncStorage.getItem("fullname", (err, result) => {
      setFullName(result);
    });
  }, [isLoggedIn]);

  const {
    authDispatch,
    authState: { error, loading },
  } = useContext(GlobalContext);

  return !isLoggedIn || fullName == null ? (
    <SafeAreaView>
      <Image
        source={require("../../assets/images/shoppinga.jpg")}
        style={styles.logoImage}
      />
      <View style={{ top: 50 }}>
        <View style={styles.btn}>
          <Button
            title="Log in"
            onPress={() => navigation.navigate("LogIn")}
          ></Button>
        </View>
        <View style={styles.btn}>
          <Button
            title="Register"
            onPress={() => navigation.navigate("Register")}
          ></Button>
        </View>
      </View>
    </SafeAreaView>
  ) : (
    <SafeAreaView>
      <View>
        <Container>
          <Image
            source={require("../../assets/images/avt.jpg")}
            style={styles.logoImage}
          />
        </Container>
      </View>

      <View>
        <View>
          <Text style={styles.text}>Welcome {fullName}</Text>
        </View>

        <View style={{ margin: 20 }}>
          <Button
            color="orange"
            title="Xem tài khoản"
            onPress={() => {
              navigation.navigate("MyAccount");
            }}
          ></Button>
        </View>

        <View style={{ margin: 20 }}>
          <Button
            color="orange"
            title="Xem hóa đơn"
            onPress={() => {
              navigation.navigate("Invoice");
            }}
          ></Button>
        </View>
        <View style={{ margin: 20 }}>
          <Button
            color="orange"
            title="Log out"
            onPress={() => {
              AsyncStorage.removeItem("id");
              AsyncStorage.removeItem("fullname");
              AsyncStorage.removeItem("username");
              AsyncStorage.removeItem("token");
              AsyncStorage.removeItem("isLoggedIn");
              authDispatch({
                type: "LoginFail",
              });
              navigation.navigate("Home");
            }}
          ></Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SideMenu;
