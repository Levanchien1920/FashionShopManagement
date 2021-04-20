import React, { Component } from 'react';
// import { Link } from "@reach/router";
import NumberFormat from 'react-number-format';
import config from '../Config/Config';

class CartItemCheckout extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 1, 
            totalPrice:0
        }
        this.handleChangeQty = this.handleChangeQty.bind(this)

    }

    componentDidMount(){
        const { product } = this.props;
        
        this.setState({
            quantity: product.qty,
            totalPrice: product.price * product.qty
        })
    }

    
    handleChangeQty(e) {
        const { product } = this.props;
        this.props.changeQty(this.props.product, e.target.value)
        this.setState({
            quantity: e.target.value,
            totalPrice: product.price * e.target.value
        })
    }
    

    render(){
        const { product } = this.props;
        // let image = JSON.parse(product.image)

        return (
            <tr>
                <td>
                    <div className="img">
                        <a href="#"><img src={product.link} alt="Image"></img></a>
                        <p>{product.name}</p>
                    </div>
                </td>
                <td><NumberFormat value={product.price} displayType={'text'} thousandSeparator={true} prefix={'VND'} /></td>
                <td>
                    <div className="qty">                       
                        <input type="text" onChange={this.handleChangeQty} value={this.state.quantity}></input>                       
                    </div>
                </td>
                <td><NumberFormat value={this.state.totalPrice} displayType={'text'} thousandSeparator={true} prefix={'VND'}/></td>
                
            </tr>
        )
    }
}
export default CartItemCheckout