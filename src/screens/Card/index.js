
import React, { useState } from 'react';
import {useNavigation } from '@react-navigation/native';
import styles from './styles';
import {Image, Text, View, TouchableOpacity,ScrollView} from 'react-native';

const Card = (props) => {
    const {product} = props;
    const [quantity, setquantity] = useState(1);
    const {navigate} =useNavigation();
    return (
       <View>
             <Text>name:{product.name}</Text> 
             <Image  source={{ uri: product.link }}
            style={{width: 100, height: 200, borderWidth: 1}}/>
            <Text>price:{product.price}</Text>
            <TouchableOpacity  onPress= {() => {
                             let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {};
                             let id = product.id.toString();
                             cart[id] = (cart[id] ? cart[id]: 0);
                             let qty = cart[id] + parseInt(quantity);
                             cart[id] = qty;
                             localStorage.setItem('cart', JSON.stringify(cart));
            }}> 
                     <Text style={styles.text} >Add to card</Text>
                      </TouchableOpacity>
         </View>


    );
}

export default Card;