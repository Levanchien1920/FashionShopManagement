import React from 'react'
import {Link} from 'react-router-dom'
function Card(props) {
    const {product} = props;
    return (
        <div className="col-lg-3">
            <div className="product-item">
                    <div class="product-title">
                        <Link to={`/productdetail/${product.id}`}>
                            <a href="/productdetail">{product.name}</a>
                        </Link>
                        <div className="ratting">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                        </div>
                    </div>
                    <div className="product-image">
                        <a href="product-detail.html">
                            <img src="https://salt.tikicdn.com/cache/w1200/ts/product/2a/e9/3e/804bc04cced14d7cbe1c7762b2055c97.jpg" alt={product.name_Image}></img>
                        </a>
                        <div className="product-action">
                            <a href="a"><i className="fa fa-cart-plus"></i></a>
                            <a href="a"><i className="fa fa-heart"></i></a>
                            <a href="a"><i className="fa fa-search"></i></a>
                        </div>
                    </div>
                    <div className="product-price">
                        <h3><span>$</span>{product.price}</h3>
                        <a className="btn" href="a"><i className="fa fa-shopping-cart"></i>Buy Now</a>
                    </div>
               
            </div>
        </div>
    )
}

export default Card;
