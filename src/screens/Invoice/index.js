import React, { useContext, useEffect, useState } from "react";
import {Text,View,TextInput,Image,Button,ScrollView,Alert} from "react-native";
import axiosInstance from "../../helper/axiosInstance";
import AsyncStorage from "@react-native-async-storage/async-storage";
import styles from "./styles";
import { useNavigation } from "@react-navigation/native";
import {GlobalContext} from '../../context/Provider';
const Invoice = () => {
  const {navigate} =useNavigation();
  const {authState : {isLoggedIn},}= useContext(GlobalContext);
  console.log(isLoggedIn);
  const [invoice,setInvoice] = useState([]);
  useEffect(() => {   
    AsyncStorage.getItem('token')
    .then((res) => {
        AsyncStorage.getItem('id')
        .then((value) => {
          axiosInstance.get(`/client/invoice/${value}`,
          {
          headers: {
            'Authorization': `Bearer ${res}`
          } 
          }).then((response)=> {
              setInvoice(response.data.content);
              console.log(invoice);
          }).catch((error) =>{
          });
        })
    })
  }, [])
  return (
    <View>
    <View style={{marginTop:'15%'}}>
      <Text style= {{fontSize:30,color:'red',textAlign:'center'}}>Thông tin hóa đơn</Text>
    </View>
    <ScrollView style={styles.bodyContainer}>
    <ScrollView style={{marginTop:'10%',marginLeft:'10%',marginRight:'10%'}}> 
          { Array.isArray(invoice) && invoice.length > 0  ? (
          invoice.map((invoice,index) => (
            <View key={index} style={{marginTop:20, borderBottomWidth:1,borderColor:"yellow"}}>
                 <View style= {{flexDirection:'row',top:5}}>
                      <Text style= {{color:'blue',fontSize:16}}>Full name:</Text> 
                      <Text>{invoice.name_Customer}</Text>
                </View>
                <View style= {{flexDirection:'row'}}>
                      <Text style= {{color:'blue',fontSize:16}}>Tên sản phẩm:</Text> 
                      <Text>{invoice.name_Product}</Text>
                </View>
                <View style= {{flexDirection:'row'}}>
                  <Text style= {{color:'blue',fontSize:16}}>Giá tiền:</Text> 
                    <Text>{invoice.price}</Text>
                </View>
                <View style= {{flexDirection:'row'}}>
                  <Text style= {{color:'blue',fontSize:16}}>Tổng tiền:</Text> 
                  <Text>{invoice.total_Money}</Text>
                </View>
                <View style= {{flexDirection:'row'}}>
                  <Text style= {{color:'blue',fontSize:16}}>Số lượng sản phẩm:</Text> 
                  <Text>{invoice.number_Product}</Text>
                </View>
                </View>
               ))): (
                 <View>
                   <Text style={{textAlign:'center',fontSize:18,color:'blue'}}>Bạn chưa có hóa đơn</Text>
                 </View>
               )} 
    </ScrollView>
    </ScrollView>
</View>

  );

  }
export default Invoice;
