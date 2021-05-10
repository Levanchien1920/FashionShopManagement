
import React, { useState } from 'react';
import {useNavigation } from '@react-navigation/native';
import styles from './styles';
import {Image, Text, View, TouchableOpacity,ScrollView, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react/cjs/react.development';
const Card = (props) => {
    const {product} = props;
    const [quantity, setquantity] = useState(1);

    const {navigate} =useNavigation();
    return (
       <View>
             <Text style={{color:'blue',fontSize:16,textAlign:'center'}}>{product.name}</Text> 
             <Image  source={{ uri: product.link }}
                style={{width: 100, height: 100}}/>
            <Text style={{color:'blue',fontSize:16,textAlign:'center'}}>{product.price}$</Text>
            <Button color='orange' title="Add to cart" onPress= {() => {
                        AsyncStorage.getItem('cart').then((res)=> {
                            if(res!=null) {
                            const cart=JSON.parse(res);
                            let id = product.id.toString();
                            cart[id] = (cart[id] ? cart[id]: 0);
                            let qty = cart[id] + parseInt(quantity);
                            cart[id] = qty;
                            AsyncStorage.setItem('cart', JSON.stringify(cart));
                            }
                            if(res==null) {
                                const cart={};
                                let id = product.id.toString();
                                cart[id] = (cart[id] ? cart[id]: 0);
                                let qty = cart[id] + parseInt(quantity);
                                cart[id] = qty;
                                AsyncStorage.setItem('cart', JSON.stringify(cart));
                                }
                            }
                        )}} >
                     </Button>
         </View>


    );
}

export default Card;