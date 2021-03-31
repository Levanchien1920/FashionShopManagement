import axios from 'axios';
import React, { useEffect , useState } from 'react'
import { useHistory } from 'react-router';

function ProductDetail() {
    const history=useHistory();
    const [listProduct , setlistProduct] = useState([]);
    const [listCategory, setlistCategory] = useState([]);
    const [listBrand, setlistBrand] = useState([]);
    const [filter , setfilter] = useState({
        check  : 0, 
        id  : 0,
    });
    useEffect(() => {
        if (filter.check === 1){
                axios.get(`http://localhost:9090/api/v1/client/category/${filter.id}`).then((response)=> {
                    setlistProduct(response.data.content);
                }).catch((error) =>{
                });
            }
        if (filter.check === 2){
                axios.get(`http://localhost:9090/api/v1/client/brand/${filter.id}`).then((response)=> {
                    setlistProduct(response.data.content);
                }).catch((error) =>{
                });
            }
        
        axios.get('http://localhost:9090/api/v1/category').then((response)=> {
            setlistCategory(response.data.content);
        }).catch((error) =>{
        });
        axios.get('http://localhost:9090/api/v1/brand').then((response)=> {
            setlistBrand(response.data.content);
        }).catch((error) =>{
        });
        console.log(filter);
    }, [filter]);
    useEffect(() => {
        const id = history.location.pathname.split("/")[2];
        // axios.get('http://localhost:9090/api/v1/product').then((response)=> {
        //     setlistProduct(response.data.content);
        // }).catch((error) =>{
        // });
    }, [])
    return (
        <div className="product-detail">
            <div className="container-fluid">
                <div className="row">
                    { (filter.check === 0) ? (
                        <div className="col-lg-8">
                        <div className="product-detail-top">
                            <div className="row align-items-center">
                                <div className="col-md-5">
                                    <div className="product-slider-single-nav normal-slider">
                                        <div className="slider-nav-img"><img src="img/product-1.jpg" alt="Product Image"></img></div>
                                     
                                    </div>
                                </div>
                                <div className="col-md-7">
                                    <div className="product-content">
                                        <div className="title"><h2>Product Name</h2></div>
                                        <div className="ratting">
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                            <i className="fa fa-star"></i>
                                        </div>
                                        <div className="price">
                                            <h4>Price:</h4>
                                            <p>$99 <span>$149</span></p>
                                        </div>
                                        <div className="quantity">
                                            <h4>Quantity:</h4>
                                            <div className="qty">
                                                <button className="btn-minus"><i className="fa fa-minus"></i></button>
                                                <input type="text" value="1"></input>
                                                <button className="btn-plus"><i className="fa fa-plus"></i></button>
                                            </div>
                                        </div>
                                        <div className="p-size">
                                            <h4>Size:</h4>
                                            <div className="btn-group btn-group-sm">
                                                <button type="button" className="btn">S</button>
                                                <button type="button" className="btn">M</button>
                                                <button type="button" className="btn">L</button>
                                                <button type="button" className="btn">XL</button>
                                            </div> 
                                        </div>
                                        <div className="p-color">
                                            <h4>Color:</h4>
                                            <div className="btn-group btn-group-sm">
                                                <button type="button" className="btn">White</button>
                                                <button type="button" className="btn">Black</button>
                                                <button type="button" className="btn">Blue</button>
                                            </div> 
                                        </div>
                                        <div className="action">
                                            <a className="btn" href="#"><i className="fa fa-shopping-cart"></i>Add to Cart</a>
                                            <a className="btn" href="#"><i className="fa fa-shopping-bag"></i>Buy Now</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="row product-detail-bottom">
                            <div className="col-lg-12">
                                <ul className="nav nav-pills nav-justified">
                                    <li className="nav-item">
                                        <a className="nav-link active" data-toggle="pill" href="#description">Description</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" data-toggle="pill" href="#specification">Specification</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="nav-link" data-toggle="pill" href="#reviews">Reviews (1)</a>
                                    </li>
                                </ul>

                                <div className="tab-content">
                                    <div id="description" className="container tab-pane active">
                                        <h4>Product description</h4>
                                        <p>
                                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. In condimentum quam ac mi viverra dictum. In efficitur ipsum diam, at dignissim lorem tempor in. Vivamus tempor hendrerit finibus. Nulla tristique viverra nisl, sit amet bibendum ante suscipit non. Praesent in faucibus tellus, sed gravida lacus. Vivamus eu diam eros. Aliquam et sapien eget arcu rhoncus scelerisque. Suspendisse sit amet neque neque. Praesent suscipit et magna eu iaculis. Donec arcu libero, commodo ac est a, malesuada finibus dolor. Aenean in ex eu velit semper fermentum. In leo dui, aliquet sit amet eleifend sit amet, varius in turpis. Maecenas fermentum ut ligula at consectetur. Nullam et tortor leo. 
                                        </p>
                                    </div>
                                    <div id="specification" className="container tab-pane fade">
                                        <h4>Product specification</h4>
                                        <ul>
                                            <li>Lorem ipsum dolor sit amet</li>
                                            <li>Lorem ipsum dolor sit amet</li>
                                            <li>Lorem ipsum dolor sit amet</li>
                                            <li>Lorem ipsum dolor sit amet</li>
                                            <li>Lorem ipsum dolor sit amet</li>
                                        </ul>
                                    </div>
                                    <div id="reviews" className="container tab-pane fade">
                                        <div className="reviews-submitted">
                                            <div className="reviewer">Phasellus Gravida - <span>01 Jan 2020</span></div>
                                            <div className="ratting">
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                            </div>
                                            <p>
                                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.
                                            </p>
                                        </div>
                                        <div className="reviews-submit">
                                            <h4>Give your Review:</h4>
                                            <div className="ratting">
                                                <i className="far fa-star"></i>
                                                <i className="far fa-star"></i>
                                                <i className="far fa-star"></i>
                                                <i className="far fa-star"></i>
                                                <i className="far fa-star"></i>
                                            </div>
                                            <div className="row form">
                                                <div className="col-sm-6">
                                                    <input type="text" placeholder="Name"></input>
                                                </div>
                                                <div className="col-sm-6">
                                                    <input type="email" placeholder="Email"></input>
                                                </div>
                                                <div className="col-sm-12">
                                                    <textarea placeholder="Review"></textarea>
                                                </div>
                                                <div className="col-sm-12">
                                                    <button>Submit</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="product">
                            <div className="section-header">
                                <h1>Related Products</h1>
                            </div>

                            <div className="row align-items-center product-slider product-slider-3">
                                <div className="col-lg-3">
                                    <div className="product-item">
                                        <div className="product-title">
                                            <a href="#">Product Name</a>
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
                                                <img src="img/product-10.jpg" alt="Product Image"></img>
                                            </a>
                                            <div className="product-action">
                                                <a href="#"><i className="fa fa-cart-plus"></i></a>
                                                <a href="#"><i className="fa fa-heart"></i></a>
                                                <a href="#"><i className="fa fa-search"></i></a>
                                            </div>
                                        </div>
                                        <div className="product-price">
                                            <h3><span>$</span>99</h3>
                                            <a className="btn" href=""><i className="fa fa-shopping-cart"></i>Buy Now</a>
                                        </div>
                                    </div>
                                </div>
                              
                               
        
                                <div className="col-lg-3">
                                    <div className="product-item">
                                        <div className="product-title">
                                            <a href="#">Product Name</a>
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
                                                <img src="img/product-2.jpg" alt="Product Image"></img>
                                            </a>
                                            <div className="product-action">
                                                <a href="#"><i className="fa fa-cart-plus"></i></a>
                                                <a href="#"><i className="fa fa-heart"></i></a>
                                                <a href="#"><i className="fa fa-search"></i></a>
                                            </div>
                                        </div>
                                        <div className="product-price">
                                            <h3><span>$</span>99</h3>
                                            <a className="btn" href=""><i className="fa fa-shopping-cart"></i>Buy Now</a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    ):(
                        <div></div>
                    )}
        
                    <div className="col-lg-4 sidebar">
                        <div className="sidebar-widget category">
                            <h2 className="title">Category</h2>
                            <nav className="navbar bg-light">
                                <ul class="navbar-nav">
                                    {listCategory.map((category) => (
                                        <li class="nav-item">
                                        <button class="nav-link" onClick={() => (setfilter({check : 1 ,id: category.id }))}>{category.name}</button>
                                    </li>
                                    ))} 
                                </ul>
                            </nav>
                        </div>
                        
                        <div className="sidebar-widget widget-slider">
                            <div className="sidebar-slider normal-slider">
                                <div className="product-item">
                                    <div className="product-title">
                                        <a href="#">Product Name</a>
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
                                            <img src="img/product-7.jpg" alt="Product Image"></img>
                                        </a>
                                        <div className="product-action">
                                            <a href="#"><i className="fa fa-cart-plus"></i></a>
                                            <a href="#"><i className="fa fa-heart"></i></a>
                                            <a href="#"><i className="fa fa-search"></i></a>
                                        </div>
                                    </div>
                                    <div className="product-price">
                                        <h3><span>$</span>99</h3>
                                        <a className="btn" href=""><i className="fa fa-shopping-cart"></i>Buy Now</a>
                                    </div>
                                </div>
                              
                            </div>
                        </div>
                        
                        <div className="sidebar-widget brands">
                            <h2 className="title">Brands</h2>
                            <ul>
                                {listBrand.map((brand) => (
                                    <li class="nav-item">
                                        <button class="nav-link" onClick={() => (setfilter({check : 2 ,id: brand.id }))}>{brand.name}</button>
                                    </li>
                                ))} 
                            </ul>
                        </div>
                        
                        <div className="sidebar-widget tag">
                            <h2 className="title">Tags Cloud</h2>
                            <a href="#">Lorem ipsum</a>
                            <a href="#">Vivamus</a>
                            <a href="#">Phasellus</a>
                            <a href="#">pulvinar</a>
                            <a href="#">Curabitur</a>
                            <a href="#">Fusce</a>
                            <a href="#">Sem quis</a>
                            <a href="#">Mollis metus</a>
                            <a href="#">Sit amet</a>
                            <a href="#">Vel posuere</a>
                            <a href="#">orci luctus</a>
                            <a href="#">Nam lorem</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProductDetail
