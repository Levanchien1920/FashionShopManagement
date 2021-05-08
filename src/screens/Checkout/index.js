
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import CheckoutComponent from '../../components/Checkout';
import axiosInstance from '../../helper/axiosInstance';
const Checkout = () => {
    
    const [productItem , setProductItem] = useState([])
    const [total, setTotal] = useState(0)
    const [id, setId] = useState('')
    useEffect(() => {
        let cart = JSON.parse(localStorage.getItem('cart'));
        let keys = [];
        for (var item in cart) {
            if(cart.hasOwnProperty(item)){
            keys.push(item)
            }
        }
        if (!cart) return; 

        axiosInstance.get('product')
        .then(response => {
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
            // console.log(productItem)
            for (var i = 0; i < productItem.length; i++) {
                total += productItem[i].price * productItem[i].qty;
            }

            setProductItem(productItem)
            setTotal(total)
        })

    }, []);

    const addBill = (e) => {
        e.preventDefault();
        let id = e.target.id.toString();
        let cart = JSON.parse(localStorage.getItem('cart'));
        let listItem = [];
        let keys = [];
        for (var item in cart) {
            if(cart.hasOwnProperty(item)){
              keys.push(item)
            }
        }
        for(var item in cart) {
            var element = {
                "id" : Number(item),
                "number" : cart[item],
                "price" : 100,
                "name" : "AO KI Zi"
            }
            // console.log(element)
            listItem.push(element);      
        }
    
 
        let flag = true
        
        const data = {
                // id_user: Number(id),
                // paid: true,
                id_user: 1,
                id_employee: 1,
                totalMoney: total,
                listProducts: listItem
            } 
        console.log(data)
        axiosInstance.post('invoice/', data)
        .then(response => {
           
            console.log(response.data)
            console.log("Đặt hàng thành công")      
            //navigate home
    
        })
        .catch(errors => {
              console.log(errors)
        })
    }

//   const renderProductCart = () => {
//     console.log(productItem)
//     // let {productItem} = this.state 
//     if(Array.isArray(productItem) && productItem.length > 0) {
//          productItem.map((product, index) =>          
//             <CartItemCheckout product={product} remove={this.removeFromCart} key={index} changeQty={this.changeQty} />
//         )
//      } 
//     }

    return (
        <CheckoutComponent />
    );
}

export default Checkout;