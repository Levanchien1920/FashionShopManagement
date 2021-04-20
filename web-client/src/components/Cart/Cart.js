import React, { Component } from 'react';
import { Link } from "react-router-dom";
import API from '../Config/Api';
import NumberFormat from 'react-number-format';
import CartItem from './CartItem'
import Header from '../Header';
import Footer from '../Footer';
import axios from 'axios';
class Cart extends Component {
    constructor(props) {
		super(props)
		this.state = {
           
            productItem:[],
            total: 0
		}
	}
	
	componentDidMount() {
        let cart = JSON.parse(localStorage.getItem('cart'));
        let keys = [];
        for (var item in cart) {
            if(cart.hasOwnProperty(item)){
              keys.push(item)
            }
          }
        if (!cart) return; 
        // axios.get('http://localhost:9090/api/v1/product').then((response)=> {
        //     // setlistProduct(response.data.content);
        //     console.log(response.data.content)
        // }).catch((error) =>{
        // });
        API.get('product')
        .then(response => {
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
            console.log(productItem)
            for (var i = 0; i < productItem.length; i++) {
                total += productItem[i].price * productItem[i].qty;
            }

            this.setState({
                productItem,
                total
            })

            // console.log(productItem);
        })
        .catch(function (error) {
          console.log(error)
        }) 
    }

    removeFromCart = (product) => {
        let productItem = this.state.productItem.filter((item) => item.id !== product.id);
        let cart = JSON.parse(localStorage.getItem('cart')); //get cart form localStorage and convert to array
        delete cart[product.id.toString()]; //delete item in cart with id delete
        localStorage.setItem('cart', JSON.stringify(cart)); //convert cart to json and save to localStorage
        let total = this.state.total - (product.qty * product.price) 
        this.setState({productItem, total});
    }

    changeQty = (product, qty) => {
        let cart = JSON.parse(localStorage.getItem('cart')); //get cart form localStorage and convert to array
        let {productItem} = this.state  
        let total = 0;
        // console.log(product.item.id)
        for (var i = 0; i < productItem.length; i++) {

            if(productItem[i].id === product.id) {
                productItem[i].qty = qty
                cart[product.id] = qty;  //and set qty to cart
            }
            total += productItem[i].price * productItem[i].qty;
        }
        localStorage.setItem('cart', JSON.stringify(cart)); //convert cart to json and save to localStorage
        this.setState({total});
    }

   
    renderProductCart(){
      
        let {productItem} = this.state
        // console.log("heello", productItem)   
        if(Array.isArray(productItem) && productItem.length > 0) {
            return productItem.map((product, index) => 
                
                <CartItem product={product} remove={this.removeFromCart} key={index} changeQty={this.changeQty} />
            )
        }
        
    }

    onVisible = () => {
        if (localStorage.getItem("appState") === null) {
            
        }else{
            return (
                <button type="button" className="btn btn-warning btn-sm" ><Link to="/checkout" style={{color: "white"}}><i className="fa fa-credit-card"> Thanh toán</i></Link></button>
            )
        }
    }
    render () {
        return (
            
            <div>
                <div className="breadcrumb-wrap">
                    <div className="container-fluid">
                        <ul className="breadcrumb">
                            <li className="breadcrumb-item"><a href="#">Home</a></li>
                            <li className="breadcrumb-item"><a href="#">Products</a></li>
                            <li className="breadcrumb-item active">Cart</li>
                        </ul>
                    </div>
                </div>
            
            <div className="cart-page">
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="cart-page-inner">
                                <div className="table-responsive">
                                    <table className="table table-bordered">
                                        <thead className="thead-dark">
                                            <tr>
                                                <th>Product</th>
                                                <th>Price</th>
                                                <th>Quantity</th>
                                                <th>Total</th>
                                                <th>Remove</th>
                                            </tr>
                                        </thead>
                                        <tbody className="align-middle">
                                            {this.renderProductCart()}
                                      
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4">
                            <div className="cart-page-inner">
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="coupon">
                                            <input type="text" placeholder="Coupon Code"></input>
                                            <button>Apply Code</button>
                                        </div>
                                    </div>
                                    <div className="col-md-12">
                                        <div className="cart-summary">
                                            <div className="cart-content">
                                                <h1>Cart Summary</h1>
                                                <p>Sub Total<span><NumberFormat value={this.state.total} displayType={'text'} thousandSeparator={true} prefix={'VND'} /></span></p>
                                                <p>Shipping Cost<span></span></p>
                                                <h2>Grand Total<span><NumberFormat value={this.state.total} displayType={'text'} thousandSeparator={true} prefix={'VND'} /></span></h2>
                                            </div>
                                            <div className="cart-btn">
                                                <button>Update Cart</button>
                                                <button><Link to="/checkout" style={{color: "white"}}>Checkout</Link></button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
   
        )
    }
}
export default Cart