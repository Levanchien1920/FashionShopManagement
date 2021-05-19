
import React, { useState,useEffect } from 'react';
import {useNavigation } from '@react-navigation/native';
import styles from './styles';
import {Image, Text, View, Button,Alert} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';


const Card = (props) => {
    const [test,setTest] =useState(false)
  useEffect(()=>{
      if(test) {
          Alert.alert(`Add to cart success!`)
      }
      setTest(false)
  }
    ,[test])
    const {product} = props;
    const [quantity, setquantity] = useState(1);
    const [star,setStar]=useState(1);
    useEffect(() => {
       setStar(product.numberOfStar);

},[])
    const {navigate} =useNavigation();
    return (
       <View>
           <View style={{width:100,height:50}}>
           <Text style={{color:'blue',fontSize:16,textAlign:'center'}}>{product.name}</Text> 
           </View>

             <Stars
                        default={star}
                        spacing={8}
                        count={5}
                        starSize={50} 
                        disabled={true}
                        fullStar={<Icon name={'star'} style={[styles.myStarStyle]}/>}
                        emptyStar={<Icon name={'star-outline'} style={[styles.myStarStyle, styles.myEmptyStarStyle]}/>}
                        halfStar={<Icon name={'star-half'} style={[styles.myStarStyle]}/>}
                    />

             <Image  source={{ uri: product.link }}
                style={{width: 100, height: 100}}/>
            <Text style={{color:'blue',fontSize:16,textAlign:'center'}}>{product.price}$</Text>
            <Button color='orange' title="Add to cart" onPress= {() => {
                         setTest(true)
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