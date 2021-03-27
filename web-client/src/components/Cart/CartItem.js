import React, { Component } from 'react';
// import { Link } from "@reach/router";
import NumberFormat from 'react-number-format';
import config from '../Config/Config';

class CartItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            quantity: 1, 
            totalPrice:0
        }
        this.handleChangeQty = this.handleChangeQty.bind(this)
        this.addQty = this.addQty.bind(this)
        this.removeQty = this.removeQty.bind(this)
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
    
    addQty(e) {
        e.preventDefault();
        const { product } = this.props;
        let {quantity} = this.state
       
        this.setState({
            quantity: parseInt(quantity) + 1,
            totalPrice: product.price * (parseInt(quantity) + 1) 
        })
        this.props.changeQty(product, parseInt(quantity) + 1)
    }

    removeQty(e) {
        e.preventDefault();
        const { product } = this.props;
        let {quantity} = this.state
        if(quantity > 0) {
            this.setState({
                quantity: parseInt(quantity) - 1,
                totalPrice: product.price * (parseInt(quantity) - 1) 
            })
            this.props.changeQty(product, parseInt(quantity) - 1)
        }
           
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
                        <button className="btn-minus" onClick={this.removeQty}><i className="fa fa-minus" ></i></button>
                        <input type="text" onChange={this.handleChangeQty} value={this.state.quantity}></input>
                        <button className="btn-plus" onClick={this.addQty}><i className="fa fa-plus"></i></button>
                    </div>
                </td>
                <td><NumberFormat value={this.state.totalPrice} displayType={'text'} thousandSeparator={true} prefix={'VND'}/></td>
                <td><button onClick={() => this.props.remove(product)}><i className="fa fa-trash"></i></button></td>
            </tr>
        )
    }
}
export default CartItem