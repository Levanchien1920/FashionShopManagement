import axios from 'axios';
import React, {useEffect, useState} from 'react'
import Card from './Card';
import {Link} from 'react-router-dom'
function Products() {
    const [listProduct , setlistProduct] = useState([]);
    const [listCategory, setlistCategory] = useState([]);
    const [listBrand, setlistBrand] = useState([]);
    const [filter , setfilter] = useState({
        check  : 0, 
        id  : 0,
    });
    useEffect(() => {
        if (filter.check === 0) {
            axios.get('http://localhost:9090/api/v1/product').then((response)=> {
                setlistProduct(response.data.content);
            }).catch((error) =>{
            });
        }
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
        if (filter.check === 3){
                listProduct.sort((a, b) => (a.name > b.name) ? 1 : -1);
            }
        if (filter.check === 4){
                listProduct.sort((a, b) => (a.name < b.name) ? 1 : -1);
            }
        if (filter.check === 5){
                listProduct.sort((a, b) => (a.price > b.price) ? 1 : -1);
            }
        if (filter.check === 6){
                listProduct.sort((a, b) => (a.price < b.price) ? 1 : -1);
            }
       
    }, [filter]);
    useEffect(() => {
        axios.get('http://localhost:9090/api/v1/category').then((response)=> {
            setlistCategory(response.data.content);
        }).catch((error) =>{
        });
        axios.get('http://localhost:9090/api/v1/brand').then((response)=> {
            setlistBrand(response.data.content);
        }).catch((error) =>{
        });
    }, []);
    function SortName (c) {
        setfilter({
            ...filter, check : c
        });
    }
    return (
        <div>
            <div class="breadcrumb-wrap">
                <div class="container-fluid">
                    <ul class="breadcrumb">
                        <Link to="/"  class="breadcrumb-item">Home</Link>
                        <Link to="/products"  class="breadcrumb-item">Products</Link>
                        <li class="breadcrumb-item active">Product List</li>
                    </ul>
                </div>
            </div>
        <div class="product-view">
            <div class="container-fluid">
                <div class="row">
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
                                                        <button onClick={SortName.bind(this,3)}>Name (A-Z)</button>
                                                        <button onClick={SortName.bind(this,4)}>Name (Z-A)</button>
                                                        <button onClick={SortName.bind(this,5)}>Price (Low to High)</button>                                                        
                                                        <button onClick={SortName.bind(this,6)}>Price (High to low)</button>
                                                    </div>
                                                   
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-md-4">
                                            <div class="product-price-range">
                                                <div class="dropdown">
                                                <div className="dropdown-toggle">Product price range</div>
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
                    
                    <div class="col-lg-4 sidebar">
                        <div class="sidebar-widget category">
                            <h2 class="title">Category</h2>
                            <nav class="navbar bg-light">
                                <ul class="navbar-nav">
                                {listCategory.map((category) => (
                                     <li class="nav-item">
                                     <button class="nav-link" onClick={() => (setfilter({check : 1 ,id: category.id }))}>{category.name}</button>
                                 </li>
                                ))} 
                                </ul>
                            </nav>
                        </div>
                        
                        <div class="sidebar-widget brands">
                            <h2 class="title">Brands</h2>
                            <ul>
                                {listBrand.map((brand) => (
                                    <li class="nav-item">
                                        <button class="nav-link" onClick={() => (setfilter({check : 2 ,id: brand.id }))}>{brand.name}</button>
                                    </li>
                                ))} 
                            </ul>
                        </div>
                        
                        <div class="sidebar-widget tag">
                            <h2 class="title">Tags Cloud</h2>
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
        </div>
    )
}

export default Products
