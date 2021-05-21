
import React, { useState,useEffect,useContext } from 'react';
import {useNavigation } from '@react-navigation/native';
import styles from './styles';
import {Image, Text, View, Button,Alert,TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Stars from 'react-native-stars';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {GlobalContext} from '../../context/Provider';

const Card = (props) => {
    const {authState : {isLoggedIn},}= useContext(GlobalContext);
    const [test,setTest] =useState(false)
  useEffect(()=>{
      if(test) {
          Alert.alert(`Add to cart success!`)
      }
      setTest(false)
  }
    ,[test])

    const [logIn,setLogIn] =useState(false)
    useEffect(()=>{
        if(logIn) {
            Alert.alert(`Buy now is failed,please log in!`)
        }
        setLogIn(false)
    }
      ,[logIn])
    const {product} = props;
    const [quantity, setquantity] = useState(1);
    const [star,setStar]=useState(1);
    useEffect(() => {
       setStar(product.numberOfStar);

},[])
    const {navigate} =useNavigation();
    return (
       <View style={{flexDirection:'row'}}>
            <View style={{width:120}}>
                            <View style={{marginRight:20}}>
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
                            </View>
                            <View style={{marginTop:10}}>
                                <Image  source={{ uri: product.link }}
                                    style={{width: 100, height: 100}}/>
                            </View>
            </View>

            <View style={{width:100}}>

                
                        <View style={{width:100}}>
                                <Text style={{color:'blue',fontSize:16,textAlign:'center'}}>{product.name}</Text> 
                    </View>
                        <Text style={{color:'blue',fontSize:16,textAlign:'center'}}>{product.price}$</Text>
                            <View>
                                
                        
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
                            <View style={{marginTop:5}}>
                                <Button title="Buy now" color="red" onPress= {() => {
                                    if(isLoggedIn===false) {
                                        setLogIn(true);
                                    }else {
                                        navigate('BuyNow', {
                                            id: product.id ,
                                        })
                                    }
                                            }}></Button>

                            </View>
                            <View style={{marginTop:5}}>
                            
                            <TouchableOpacity onPress= {() => {
                                            navigate('ProductDetail', {
                                                id: product.id ,
                                            })}}>
                                            <Text style={styles.text}>Xem chi tiết</Text>
                                        </TouchableOpacity>

                        </View>
          
             


            </View>
                                    </View>


    );
}

export default Card;