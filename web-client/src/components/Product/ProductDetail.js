import axios from 'axios';
import React, { useContext, useEffect , useState } from 'react'
import { useHistory } from 'react-router';
import Card from './Card';
import Carousel from 'react-elastic-carousel';
import {LoginContext} from '../../context/LoginContext'
const breakPoints = [
    { width: 1, itemsToShow: 1 },
    { width: 550, itemsToShow: 2, itemsToScroll: 2 },
    { width: 768, itemsToShow: 3 },
    { width: 1600, itemsToShow: 4 }
  ];
function ProductDetail() {
    const Login = useContext(LoginContext);
    const history=useHistory();
    const [color , setcolor] =useState([]);
    const [listProduct , setlistProduct] = useState([]);
    const [Product , setProduct] = useState([]);
    const [listCategory, setlistCategory] = useState([]);
    const [listBrand, setlistBrand] = useState([]);
    const [filter , setfilter] = useState({
        check  : 0, 
        id  : 0,
        size : "",
        review : ""
    });
    const [colorSizeM , setcolorSizeM] = useState("")
    const [colorSizeL , setcolorSizeL] = useState("");
    const [colorSizeXL , setcolorSizeXL] = useState("")
    const [colorSizeXXL , setcolorSizeXXL] = useState("")
    const [brandRelated, setbrandRelated] = useState([]);
    // const [cateRelated, setcateRelated] = useState([])
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

    const [cateRelated, setcateRelated] = useState([]);
    const [review, setreview] = useState([]);
    const [OutputReview, setOutputReview] = useState({
        id_user : 0,
        id_product : 0,
        content : "",
        number_of_star : 0
    })
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
        if (filter.check === 0){
                colorinsize(filter.size);
            }
    }, [filter]);
    useEffect(() => {
        const id = history.location.pathname.split("/")[2];
        axios.get(`http://localhost:9090/api/v1/client/product/${id}`).then((response)=> {
            setProduct(response.data);
            setcolorSizeM(response.data.m);
            setcolorSizeL(response.data.l);
            setcolorSizeXL(response.data.xl);
            setcolorSizeXXL(response.data.xxl);
            axios.get(`http://localhost:9090/api/v1/client/brand/relateProduct/${response.data.id_brand}`).then((response)=> {
                setbrandRelated(response.data.content);
            }).catch((error) =>{
            });
            axios.get(`http://localhost:9090/api/v1/client/category/relateProduct/${response.data.id_cate}`).then((response)=> {
                setcateRelated(response.data.content);
            }).catch((error) =>{
            });
        }).catch((error) =>{
        });
        axios.get(`http://localhost:9090/api/v1/client/review/${id}`).then((response)=> {
                setreview(response.data.content);
            }).catch((error) =>{
            });
        axios.get('http://localhost:9090/api/v1/client/category').then((response)=> {
            setlistCategory(response.data.content);
        }).catch((error) =>{
        });
        axios.get('http://localhost:9090/api/v1/client/brand').then((response)=> {
            setlistBrand(response.data.content);
        }).catch((error) =>{
        });
    }, [filter.review]);
    const colorinsize = (size) => {
        switch(size) {
            case "m":
                let colorofsizem = colorSizeM.split(" ");
                colorofsizem.pop();
                setcolor(colorofsizem);
              break;
            case "l":
                let colorofsizel = colorSizeL.split(" ");
                colorofsizel.pop();
                setcolor(colorofsizel);
              break;
            case "xl":
                let colorofsizexl = colorSizeXL.split(" ");
                colorofsizexl.pop();
                setcolor(colorofsizexl);
                break;
            case "xxl":
                let colorofsizexxl = colorSizeXXL.split(" ");
                colorofsizexxl.pop();
                setcolor(colorofsizexxl);
              break;
            default:
        }
    }
    function submitReview() { 
        if (Login.IsLogin === true) {
            axios.post(`http://localhost:9090/api/v1/client/review`, OutputReview).then((response)=> {
                alert(response.data.message);
                setfilter({...filter , review : OutputReview.content})
            }).catch((error) =>{
                console.log(error);
            });
        } else {
            history.push("/login")
        }
        
    }
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
                                            <div className="slider-nav-img"><img src={Product.link} alt={Product.iamgeName}></img></div>
                                        
                                        </div>
                                    </div>
                                    <div className="col-md-7">
                                        <div className="product-content">
                                            <div className="title"><h2>{Product.name}</h2></div>
                                            <div className="ratting">
                                                <i className={Product.number_Of_Star >=1 ?"fa fa-star": Product.number_Of_Star >= 0.5 ? 'fa fa-star-half':'fa fa-star-o'}></i>
                                                <i className={Product.number_Of_Star >=2 ?"fa fa-star": Product.number_Of_Star >= 1.5 ? 'fa fa-star-half':'fa fa-star-o'}></i>
                                                <i className={Product.number_Of_Star >=3 ?"fa fa-star": Product.number_Of_Star >= 2.5 ? 'fa fa-star-half':'fa fa-star-o'}></i>
                                                <i className={Product.number_Of_Star >=4 ?"fa fa-star": Product.number_Of_Star >= 3.5 ? 'fa fa-star-half':'fa fa-star-o'}></i>
                                                <i className={Product.number_Of_Star >=5 ?"fa fa-star": Product.number_Of_Star >= 4.5 ? 'fa fa-star-half':'fa fa-star-o'}></i>
                                            </div>
                                            <div className="price">
                                                <h4>Price:</h4>
                                                <p>{Product.price} <span>$149</span></p>
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
                                                    <button type="button" className="btn" 
                                                    onClick={e => {setfilter({...filter , check : 0 , size : "m" })}}>M</button>
                                                    <button type="button" className="btn" 
                                                    onClick={e => {setfilter({...filter , check : 0 , size : "l" })}}>L</button>
                                                    <button type="button" className="btn"
                                                    onClick={e => {setfilter({...filter , check : 0 , size : "xl" })}}>XL</button>
                                                    <button type="button" className="btn" 
                                                    onClick={e => {setfilter({...filter , check : 0 , size : "xxl" })}}>XXL</button>
                                                </div> 
                                            </div>
                                            <div className="p-color">
                                                <h4>Color:</h4>
                                                <div className="btn-group btn-group-sm">
                                                    {color.map((color) => (
                                                    
                                                            <button type="button" className="btn">{color}</button>
                                                        
                                                    ))}
                                                </div> 
                                            </div>
                                            <div className="action">
                                                <a className="btn" id={Product.id} onClick={addToCart}><i className="fa fa-shopping-cart" ></i>Add to Cart</a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        
                            <div className="row product-detail-bottom">
                                <div className="col-lg-12">
                                    <ul className="nav nav-pills nav-justified">
                                        <li className="nav-item">
                                            <h3>Description</h3>
                                        </li>
                                    </ul>
                                    <div className="tab-content">
                                        <div id="description" className="container tab-pane active">
                                            <p>
                                                {Product.des} 
                                            </p>
                                        </div>
                                    </div>
                                    <ul className="nav nav-pills nav-justified">
                                        <li className="nav-item">
                                            <h3>Reviews ({review.length})</h3>
                                        </li>
                                    </ul>
                                    <div id="reviews" className="container tab-pane active">
                                            {review.map((review) => (
                                                <div className="reviews-submitted">
                                                <div className="reviewer">{review.name_User}</div>
                                                <div className="ratting">
                                                <i className={review.number_Of_Star >=1 ?"fa fa-star": review.number_Of_Star >= 0.5 ? 'fa fa-star-half':'fa fa-star-o'}></i>
                                                    <i className={review.number_Of_Star >=2 ?"fa fa-star": review.number_Of_Star >= 1.5 ? 'fa fa-star-half':'fa fa-star-o'}></i>
                                                    <i className={review.number_Of_Star >=3 ?"fa fa-star": review.number_Of_Star >= 2.5 ? 'fa fa-star-half':'fa fa-star-o'}></i>
                                                    <i className={review.number_Of_Star >=4 ?"fa fa-star": review.number_Of_Star >= 3.5 ? 'fa fa-star-half':'fa fa-star-o'}></i>
                                                    <i className={review.number_Of_Star >=5 ?"fa fa-star": review.number_Of_Star >= 4.5 ? 'fa fa-star-half':'fa fa-star-o'}></i>
                                                </div>
                                                <p>
                                                    {review.content}
                                                </p>
                                            </div>
                                            ))}
                                            <div className="reviews-submit">
                                                <h4>Give your Review:</h4>
                                                <div className="ratting">
                                                    <button className={OutputReview.number_of_star >=1 ? "fa fa-star" : "far fa-star"} onClick={ e => {setOutputReview({...OutputReview , number_of_star : 1})}}></button>
                                                    <button className={OutputReview.number_of_star >=2 ? "fa fa-star" : "far fa-star"} onClick={ e => {setOutputReview({...OutputReview , number_of_star : 2})}}></button>
                                                    <button className={OutputReview.number_of_star >=3 ? "fa fa-star" : "far fa-star"} onClick={ e => {setOutputReview({...OutputReview , number_of_star : 3})}}></button>
                                                    <button className={OutputReview.number_of_star >=4 ? "fa fa-star" : "far fa-star"} onClick={ e => {setOutputReview({...OutputReview , number_of_star : 4})}}></button>
                                                    <button className={OutputReview.number_of_star >=5 ? "fa fa-star" : "far fa-star"} onClick={ e => {setOutputReview({...OutputReview , number_of_star : 5})}}></button>
                                                </div>
                                            </div>
                                            <div className="row form">
                                                    <label>Review :</label>
                                                    <textarea placeholder="Review" className="col-sm-12" 
                                                    onChange={e => setOutputReview({...OutputReview ,content : e.target.value, id_user : localStorage.getItem("id") , id_product : Product.id})} value={OutputReview.content}></textarea>
                                                    <button className="submit" onClick={submitReview}>Submit</button>
                                                
                                            </div>
                                        </div>
                                </div>
                            </div>
                            
                            <div className="featured-product product">
                                <div className="section-header">
                                    <h1>Related Products (brand)</h1>
                                </div>
                                <div class="row align-items-center product-slider product-slider-4">
                                    <Carousel breakPoints={breakPoints}>
                                        {brandRelated.map((product) => (
                                                <Card product={product} key={product.id}></Card>
                                        ))}
                                    </Carousel>
                                </div>
                            </div>
                    </div>
                    ):(
                                    <div class="col-lg-8">
                                        <div class="row">
                                            <div class="col-md-12">
                                                <div class="product-view-top">
                                                    <div class="row">
                                                        <div class="col-md-4">
                                                            <div class="product-search">
                                                                <input type="email" value="Search"></input>
                                                                <button><i class="fa fa-search"></i></button>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-4">
                                                            <div class="product-short">
                                                                <div class="dropdown">
                                                                    <button className="dropdown-toggle">Product short by</button>
                                                                        <div className="dropdown-content">
                                                                        </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="col-md-4">
                                                            <div class="product-price-range">
                                                                <div class="dropdown">
                                                                <button className="dropdown-toggle">Product price range</button>
                                                                    <div class="dropdown-content">
                                                                        <button>$0 to $50</button>
                                                                        <button>$51 to $100</button>
                                                                        <button>$101 to $150</button>
                                                                        <button>$151 to $200</button>
                                                                        <button>$201 to $250</button>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            {listProduct.map((product) => (
                                                <Card product={product}></Card>
                                            ))} 
                                        </div>
                                        
                                        <div class="col-md-12">
                                            <nav aria-label="Page navigation example">
                                                <ul class="pagination justify-content-center">
                                                    <li class="page-item disabled">
                                                        <a class="page-link" href="#" tabindex="-1">Previous</a>
                                                    </li>
                                                    <li class="page-item active"><a class="page-link" href="#">1</a></li>
                                                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                                                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                                                    <li class="page-item">
                                                        <a class="page-link" href="#">Next</a>
                                                    </li>
                                                </ul>
                                            </nav>
                                    </div>
                                </div>         
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
                        <div class="sidebar-widget widget-slider">
                            <div class="sidebar-slider normal-slider">
                                <h2 className="title">Related Products (Category)</h2>
                                <Carousel breakPoints={breakPoints}>
                                    {cateRelated.map((product) => (
                                            <Card product={product} key={product.id}></Card>
                                    ))}
                                </Carousel>
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
