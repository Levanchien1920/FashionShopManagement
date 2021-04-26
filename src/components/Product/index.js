
import React from 'react';
import { StyleSheet,Image, Text, View,TextInput, TouchableOpacity,StatusBar,ScrollView ,Dimensions} from 'react-native';
import Container from '../common/Container';
import Input from '../common/Input';
import CustomButtom from '../common/CustomButton';
import styles from './styles';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {useNavigation } from '@react-navigation/native';
import ComponentHeader from '../ComponentHeader/index';

const ProductItem = ({image, name, price}) => (
  <View style={styles.itemContainer}>
    <Image source={image} style={styles.itemImage} />
    <Text style={styles.itemName} numberOfLines={2}>
      {name}
    </Text>
    <Text style={styles.itemPrice}>{price}</Text>

  </View>
);

const ProductComponent = () => {
    const {navigate} =useNavigation();
    return (
      <View>
      <ComponentHeader />
    <View style={styles.bodyContainer}>
     <ScrollView>
     <View style={styles.sectionContainer}>
   {/*  */}
   <Text style={styles.sectionTitle}>Clothers</Text>
   {/*  */}
   <Image source={section_banner} style={styles.sectionImage} />
   {/*  */}
  
   {/*  */}
   <ScrollView horizontal={true}>
     <View style={styles.listItemContainer}>
       {listProductNP.map((e, index) => (
         <View key={index.toString()}>
            <ProductItem
             name={e.name}
             image={e.link}
             price={e.price}
           />

           <TouchableOpacity onPress= {() => {navigate('ProductDetail')}}>
             <Text >Chi tiết</Text>
         </TouchableOpacity>

         </View>
       ))}
     </View>
   </ScrollView>
   {/*  */}
   <View style={styles.seeMoreContainer}>
     <Text style={styles.seeMoreText}>XEM THÊM 636 SẢN PHẨM </Text>
   </View>
 </View>
     </ScrollView>
   </View>
   
     </View>
      

    );
}

export default ProductComponent;