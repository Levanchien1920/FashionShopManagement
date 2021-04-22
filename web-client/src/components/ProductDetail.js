import axios from 'axios';
import React, { useEffect , useState } from 'react'
import { useHistory } from 'react-router';
import Card from './Card';

function ProductDetail() {
    const history=useHistory();
    const [color , setcolor] =useState([]);
    const [listProduct , setlistProduct] = useState([]);
    const [star , setstar] = useState(0);
    const [Product , setProduct] = useState([]);
    const [listCategory, setlistCategory] = useState([]);
    const [listBrand, setlistBrand] = useState([]);
    const [filter , setfilter] = useState({
        check  : 0, 
        id  : 0,
        size : ""
    });
    const [colorSizeM , setcolorSizeM] = useState("")
    const [colorSizeL , setcolorSizeL] = useState("");
    const [colorSizeXL , setcolorSizeXL] = useState("")
    const [colorSizeXXL , setcolorSizeXXL] = useState("")

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
        axios.get(`http://localhost:9090/api/v1/product/${id}`).then((response)=> {
            setProduct(response.data);
            setcolorSizeM(response.data.m);
            setcolorSizeL(response.data.l);
            setcolorSizeXL(response.data.xl);
            setcolorSizeXXL(response.data.xxl);
        }).catch((error) =>{
        });
        axios.get('http://localhost:9090/api/v1/category').then((response)=> {
            setlistCategory(response.data.content);
        }).catch((error) =>{
        });
        axios.get('http://localhost:9090/api/v1/brand').then((response)=> {
            setlistBrand(response.data.content);
        }).catch((error) =>{
        });
    }, []);
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
                console.log("no");
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
                                            <i className={Product.number_of_star >=1 ?"fa fa-star": Product.number_of_star >= 0.5 ? 'fa fa-star-half':'fa fa-star-o'}></i>
                                            <i className={Product.number_of_star >=2 ?"fa fa-star": Product.number_of_star >= 1.5 ? 'fa fa-star-half':'fa fa-star-o'}></i>
                                            <i className={Product.number_of_star >=3 ?"fa fa-star": Product.number_of_star >= 2.5 ? 'fa fa-star-half':'fa fa-star-o'}></i>
                                            <i className={Product.number_of_star >=4 ?"fa fa-star": Product.number_of_star >= 3.5 ? 'fa fa-star-half':'fa fa-star-o'}></i>
                                            <i className={Product.number_of_star >=5 ?"fa fa-star": Product.number_of_star >= 4.5 ? 'fa fa-star-half':'fa fa-star-o'}></i>
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
                                            <a className="btn" href="#"><i className="fa fa-shopping-cart"></i>Add to Cart</a>
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
                                        <h3>Reviews (1)</h3>
                                    </li>
                                </ul>
                                <div id="reviews" className="container tab-pane active">
                                        <div className="reviews-submitted">
                                            <div className="reviewer">Phasellus Gravida - <span>01 Jan 2020</span></div>
                                            <div className="ratting">
                                                <i className={Product.number_of_star >=1 ?"fa fa-star": Product.number_of_star >= 0.5 ? 'fa fa-star-half':'fa fa-star-o'}></i>
                                                <i className={Product.number_of_star >=2 ?"fa fa-star": Product.number_of_star >= 1.5 ? 'fa fa-star-half':'fa fa-star-o'}></i>
                                                <i className={Product.number_of_star >=3 ?"fa fa-star": Product.number_of_star >= 2.5 ? 'fa fa-star-half':'fa fa-star-o'}></i>
                                                <i className={Product.number_of_star >=4 ?"fa fa-star": Product.number_of_star >= 3.5 ? 'fa fa-star-half':'fa fa-star-o'}></i>
                                                <i className={Product.number_of_star >=5 ?"fa fa-star": Product.number_of_star >= 4.5 ? 'fa fa-star-half':'fa fa-star-o'}></i>
                                            </div>
                                            <p>
                                                Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam.
                                            </p>
                                        </div>
                                        <div className="reviews-submit">
                                            <h4>Give your Review:</h4>
                                            <div className="ratting">
                                                <button className={star >=1 ? "fa fa-star" : "far fa-star"} onClick={ e => {setstar(1)}}></button>
                                                <button className={star >=2 ? "fa fa-star" : "far fa-star"} onClick={ e => {setstar(2)}}></button>
                                                <button className={star >=3 ? "fa fa-star" : "far fa-star"} onClick={ e => {setstar(3)}}></button>
                                                <button className={star >=4 ? "fa fa-star" : "far fa-star"} onClick={ e => {setstar(4)}}></button>
                                                <button className={star >=5 ? "fa fa-star" : "far fa-star"} onClick={ e => {setstar(5)}}></button>
                                            </div>
                                        </div>
                                        <div className="row form">
                                                <label>Name : </label>
                                                <input type="text" placeholder="Name" className="col-sm-12"></input>
                                                <label>Email : </label>
                                                <input type="email" placeholder="Email" className="col-sm-12"></input>
                                                <label>Review :</label>
                                                <textarea placeholder="Review" className="col-sm-12"></textarea>
                                               
                                                        <button className="submit">Submit</button>
                                               
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
