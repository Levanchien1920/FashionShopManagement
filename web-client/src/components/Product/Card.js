import React, {useState , useContext } from 'react'
import {Link} from 'react-router-dom'
function Card(props) {
    const {product} = props;
    console.log(product);
    const [quantity, setquantity] = useState(1);
    const addToCart = (e) => {
        console.log(e.target)
        let cart = localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : {};
        let id = e.target.id.toString();
        
        cart[id] = (cart[id] ? cart[id]: 0);
        
        let qty = cart[id] + parseInt(quantity);
        cart[id] = qty
        localStorage.setItem('cart', JSON.stringify(cart));
      }
    return (
        <div className="Product">
            <div className="product-item">
                    <div class="product-title">
                        <Link to={`/productdetail/${product.id}`}>
                           {product.name}
                        </Link>
                        <div className="ratting">
                            <i className={product.number_of_star >=1 ?"fa fa-star": product.number_of_star >= 0.5 ? 'fa fa-star-half-o':'fa fa-star-o'}></i>
                            <i className={product.number_of_star >=2 ?"fa fa-star": product.number_of_star >= 1.5 ? 'fa fa-star-half-o':'fa fa-star-o'}></i>
                            <i className={product.number_of_star >=3 ?"fa fa-star": product.number_of_star >= 2.5 ? 'fa fa-star-half-o':'fa fa-star-o'}></i>
                            <i className={product.number_of_star >=4 ?"fa fa-star": product.number_of_star >= 3.5 ? 'fa fa-star-half-o':'fa fa-star-o'}></i>
                            <i className={product.number_of_star >=5 ?"fa fa-star": product.number_of_star >= 4.5 ? 'fa fa-star-half-o':'fa fa-star-o'}></i>
                        </div>
                    </div>
                    <div className="product-image">
                        <a href="product-detail.html">
                            <img src={product.link} alt={product.name_Image}></img>
                        </a>
                        <div className="product-action">
                            <a ><i id={product.id} onClick={addToCart} className="fa fa-cart-plus"></i></a>
                            <a href="a"><i className="fa fa-heart"></i></a>
                            <a href="a"><i className="fa fa-search"></i></a>
                        </div>
                    </div>
                    <div className="product-price">
                        <h3><span><h3>$</h3></span>{product.price}</h3>
                        <a className="btn" href="/cart"><i className="fa fa-shopping-cart"></i>Buy Now</a>
                    </div>
                    
            </div>
        </div>
    )
}

export default Card;
