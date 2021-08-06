import React, { useEffect, useState } from "react";
import { Text, View, TouchableOpacity, Button } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axiosInstance from "../../helper/axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {GlobalContext} from '../../context/Provider';
import {useContext} from 'react';

const MyAccountComponent = () => {
  const { navigate } = useNavigation();
  const [account, setaccount] = useState({
    "id": 0,
    "username": "",
    "password": "",
    "fullname": "",
    "address": "",
    "email": "",
    "phoneNumber": "",

  });

  const {
    authState: {isLoad},
  } = useContext(GlobalContext);


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
  }, [isLoad]);
  return (
    <View style={{ backgroundColor: "pink", height: "100%" }}>
      <View style={{ marginTop: "20%" }}>
        <Text style={{ fontSize: 30, color: "red", textAlign: "center" }}>
          Thông tin cá nhân
        </Text>
      </View>
      <View
        style={{
          marginTop: "20%",
          marginLeft: "30%",
          marginRight: "30%",
          borderBottomWidth: 1,
        }}
      >
        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: "blue", fontSize: 16 }}>Full name: </Text>
          <Text>{account.fullName}</Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: "blue", fontSize: 16 }}>User name: </Text>
          <Text>{account.username}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: "blue", fontSize: 16 }}>Email: </Text>
          <Text>{account.email}</Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: "blue", fontSize: 16 }}>Phone number: </Text>
          <Text>{account.phoneNumber}</Text>
        </View>

        <View style={{ flexDirection: "row" }}>
          <Text style={{ color: "blue", fontSize: 16 }}>Address: </Text>
          <Text>{account.address}</Text>
        </View>
      </View>
      <View style={{ margin: "20%" }}>
        <Button
          title="Update account"
          onPress={() => navigate("UpdateAccount")}
        ></Button>
      </View>
      <View style={{ left: "10%" }}>
        <TouchableOpacity onPress={() => navigate("Home")}>
          <Text style={{ fontSize: 20, color: "red" }}>Trở về trang chủ</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MyAccountComponent;
