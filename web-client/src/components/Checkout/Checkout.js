import React, {Component } from 'react';
import { Link } from "react-router-dom";
import API from '../Config/Api';
import NumberFormat from 'react-number-format';
import CartItemCheckout from './CartItemCheckout'
// import Header from '../Header';
// import Footer from '../Footer';
class Checkout extends Component {
    constructor(props) {
        super(props)
        this.state = {
            productItem:[],
            total: 0,
            id: '',
        //     first_name : '',
        //     last_name : '',
        //     email : '',
        //     password: '',
        //     address : '',
        //     phone: '',
        //     mgsSuccess:'',
        //     formErrors: {},
        //     data:'',
        // //    userData: JSON.parse(localStorage["appState"]),
        // //    isLoggedIn: JSON.parse(localStorage["appState"]).isLoggedIn
        }
        this.addBill = this.addBill.bind(this)

  }
  componentDidMount () {
    //console.log(this.state.userData)
    // if (!this.state.isLoggedIn){
    //     let appState = {
	// 		    user: {}
    //     };
    //   console.log(this.state.isLoggedIn)
    // // reset state in context
    
    // // this.context.loginContext(false)
    
	// 	// save app state with user date in local storage
    // // localStorage["appState"] = JSON.stringify(appState);
    // // this.setState(appState);
    // // this.props.history.push('/login')

    // } else {
    //     let {userData} = this.state
    //     // console.log(userData.user.auth)
    //     this.setState({
    //         id: userData.user.auth.id, 
    //         first_name: userData.user.auth.first_name,  
    //         last_name: userData.user.auth.last_name,  
    //         email: userData.user.auth.email,
    //         phone: userData.user.auth.customer.phone,
    //         address: userData.user.auth.customer.address,
    //     })
    // }
    //----------------------------------------------------
    let cart = JSON.parse(localStorage.getItem('cart'));
    let keys = [];
    for (var item in cart) {
        if(cart.hasOwnProperty(item)){
          keys.push(item)
        }
      }
    if (!cart) return; 

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

  addBill(e){
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

    // console.log(id, this.state.total, keys)
    let flag = true
    let errorSubmit = this.state.formErrors;
    const data = {
            // id_user: Number(id),
            // paid: true,
            id_user: 1,
            id_employee: 1,
            totalMoney: this.state.total,
            // price: this.state.total+"",
            // price_off: this.state.total+"",  
            // ship_price: 1,
            listProducts: listItem
        } 
    console.log(data)
    API.post('invoice/', data)
    .then(response => {
        console.log(response.data)
        alert("Đặt hàng thành công")
        window.localStorage.removeItem("cart");
        this.props.history.push('/home')

    })
    .catch(errors => {
          console.log(errors)
    })
  }

  renderProductCart(){
      
    let {productItem} = this.state 
    if(Array.isArray(productItem) && productItem.length > 0) {
        return productItem.map((product, index) =>          
            <CartItemCheckout product={product} remove={this.removeFromCart} key={index} changeQty={this.changeQty} />
        )
     } 
    }

  render(){
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
                                <div className="cart-summary">
                                    <div className="cart-content">
                                        <h1>Customer Information</h1>
                                        <p><b>Address:</b> <span>K97/72 Nguyen Luong Bang - Hoa Khanh </span></p>
                                        <p><b>Phone:</b> <span>0979897500</span></p>
                                        <p><b>Email:</b> <span>vietthanhqt123@gmail.com</span></p>
                                        <h1>Order Information</h1>
                                        <p>Sub Total<span><NumberFormat value={this.state.total} displayType={'text'} thousandSeparator={true} prefix={'VND'} /></span></p>
                                        <p>Shipping Cost<span></span></p>
                                        <h2>Grand Total<span><NumberFormat value={this.state.total} displayType={'text'} thousandSeparator={true} prefix={'VND'} /></span></h2>
                                    </div>

                                    <div className="cart-btn ">
                                        {/* <button>Update Cart</button> */}
                                        <button><Link to="/checkout" id = {this.state.id} style={{color: "black"}} onClick={this.addBill}>Checkout</Link></button>
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

export default Checkout;
