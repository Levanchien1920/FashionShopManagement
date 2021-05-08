
import React, { useEffect, useState } from 'react';
import CartComponent from '../../components/Cart';
import { StyleSheet, Text, View,TextInput, TouchableOpacity ,Image,Button} from 'react-native';
import axiosInstance from '../../helper/axiosInstance';
import Card from '../Card';

const Cart = () => {
    const [productItem, setProductItem] = useState([]);
    const [total, setTotal] = useState(0);
    const [number, onChangeNumber] = React.useState(0);
	useEffect(() => {
        let cart = JSON.parse(localStorage.getItem('cart'));
      
        let keys = [];
        for (var item in cart) {
            if(cart.hasOwnProperty(item)){
              keys.push(item)
              console.log(item);
            }
          }
        if (!cart) return; 

        axiosInstance.get('client/product') .then(response => {
            console.log(response.data.content)
            let total = 0;
            let listProduct = response.data.content
            let productItem = []
           
            listProduct.forEach(function(element){
                keys.forEach(function(key){
                    if(key == element.id) {
                        element.qty = cart[key]
                        var dem = 0
                        productItem.forEach(function(product){
                            if(product.id == element.id){
                                dem++;
                                return false;      
                            } 
                        })  
                        if (dem == 0) productItem.push(element)                                                           
                    }
                })
            });
            console.log("productItem");
            console.log(productItem)
            for (var i = 0; i < productItem.length; i++) {
                total += productItem[i].price * productItem[i].qty;
            }

            setProductItem(productItem)
            setTotal(total)

        })
        .catch(function (error) {
          console.log(error)
        }) 
    }, []);
	

    const removeFromCart = (product) => {
       // let productItem = productItem.filter((item) => item.id !== product.id);
        setProductItem(productItem.filter((item) => item.id !== product.id));
        let cart = JSON.parse(localStorage.getItem('cart')); //get cart form localStorage and convert to array
        delete cart[product.id.toString()]; //delete item in cart with id delete
        localStorage.setItem('cart', JSON.stringify(cart)); //convert cart to json and save to localStorage
        // let total = this.state.total - (product.qty * product.price) 
        setTotal(total - (product.qty * product.price))
        // this.setState({productItem, total});
    }

    // const changeQty = (product, qty) => {
    //     let cart = JSON.parse(localStorage.getItem('cart')); //get cart form localStorage and convert to array
    //     // let {productItem} = this.state  
    //     setProductItem(productItem)
    //     let total = 0;
    //     // console.log(product.item.id)
    //     for (var i = 0; i < productItem.length; i++) {

    //         if(productItem[i].id === product.id) {
    //             productItem[i].qty = qty
    //             cart[product.id] = qty;  //and set qty to cart
    //         }
    //         total += productItem[i].price * productItem[i].qty;
    //     }
    //     localStorage.setItem('cart', JSON.stringify(cart)); //convert cart to json and save to localStorage
    //     // this.setState({total});
    //     setTotal(total)
    // }

    return (
        <View>
              <CartComponent />
              <View>
              {(Array.isArray(productItem) && productItem.length > 0) ? (

                        
                      productItem.map((product, index) =>  (     
                  
                      <View style= {{ flexDirection:'row',}}>
                            <Text>name:{product.name}</Text> 
                            <Image  source={{ uri: product.link }}
                             style={{width: 100, height: 200, borderWidth: 1}}/>
                            <Text>price:{product.price}</Text>
                            <Text>total:{total[index]}</Text>
                            <View style={{ flexDirection: 'row',}} >
                            <Button  title="+" onPress= {() => {product.qty = product.qty+1}}>    
                                    </Button>
                            <TextInput
                                style={{ textAlign:'center',}}
                                value={product.qty}
                            />
                            <Button   title="-" onPress= {() => { if(number>0) {
                              {product.qty = product.qty-1} }} }>
                            </Button>
                            </View>

                            <Button   title="Remove" onPress= {() => {  removeFromCart(product)} }>
                            </Button>
                            
                      </View>
  
                          )    )
                                        ) :(
                                           <View>

                                           </View>
               )}

              </View>

              <View>

              <Button   title="Checkout" onPress= {() => {  } }>
                            </Button>
              </View>
        </View>
    );
}

export default Cart;