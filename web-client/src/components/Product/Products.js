import Api from '../Config/Api';
import React, {useEffect, useState} from 'react'
import Card from './Card';
import {Link} from 'react-router-dom'
function Products(props) {
    const [listProduct , setlistProduct] = useState([]);
    const [listCategory, setlistCategory] = useState([]);
    const [listBrand, setlistBrand] = useState([]);
    const [filter , setfilter] = useState({
        check  : props.location.state.check, 
        id  : props.location.state.id,
        search : ""
    });
    const [pageIndex, setpageIndex] = useState(0)
    const [totalPage, settotalPage] = useState(0)
    const [searchInput, setsearchInput] = useState("");
    useEffect(() => {
        console.log(filter)
        async function get() {
            switch (filter.check) {
                case 0:
                    Api.get('client/product').then((response)=> {
                        setlistProduct(response.data.content);
                        setpageIndex(response.data.pageIndex)
                        settotalPage(response.data.totalPage)
                    }).catch((error) =>{
                    });
                    break;
                case 1:
                    Api.get(`client/category/relateProduct/${filter.id}`).then((response)=> {
                        setlistProduct(response.data.content);
                        setpageIndex(response.data.pageIndex)
                        settotalPage(response.data.totalPage)
                    }).catch((error) =>{
                    });
                    break;
                case 2:
                    Api.get(`client/brand/relateProduct/${filter.id}`).then((response)=> {
                        setlistProduct(response.data.content);
                        setpageIndex(response.data.pageIndex)
                        settotalPage(response.data.totalPage)
                    }).catch((error) =>{
                    });
                    break;
                case 7:
                    console.log(pageIndex)
                    let id = pageIndex-1;
                    Api.get(`client/product?page=${id}`).then((response)=> {
                        setlistProduct(response.data.content);
                        setpageIndex(response.data.pageIndex)
                        settotalPage(response.data.totalPage)
                    }).catch((error) =>{
                    });
                    break;
                case 8 :
                    let id8 = pageIndex+1;
                    Api.get(`client/product?page=${id8}`).then((response)=> {
                        setlistProduct(response.data.content);
                        setpageIndex(response.data.pageIndex)
                        settotalPage(response.data.totalPage)
                    }).catch((error) =>{
                    });
                    break;
                case 9 :
                    Api.get(`client/product?search=${searchInput}`).then((response)=> {
                        setlistProduct(response.data.content);
                        console.log(response.data.content)
                    }).catch((error) =>{
                    });
                    break;
                default:
                    break;
            }
         }
        get()
       // console.log(pageIndex)
    }, [filter]);
    useEffect(() => {
        async function getCategoryAndBrand() {
            Api.get('client/category/all').then((response)=> {
                setlistCategory(response.data);
            }).catch((error) =>{
            });
            Api.get('client/brand/all').then((response)=> {
                setlistBrand(response.data);
            }).catch((error) =>{
            });
        }
        getCategoryAndBrand();
    }, []);
    function SortName (c) {
        switch (c) {
            case 3:
                listProduct.sort((a, b) => (a.name > b.name) ? 1 : -1);
                break;
            case 4:
                listProduct.sort((a, b) => (a.name < b.name) ? 1 : -1);
                break;
            case 5:
                listProduct.sort((a, b) => (a.price > b.price) ? 1 : -1);
                break;
            default:
                listProduct.sort((a, b) => (a.price < b.price) ? 1 : -1);
                break;
        }
        // để chạy lại useEfect
        setfilter({
            ...filter, check : c
        });
    }
    function buttonPrev(c) {
        setfilter({
            ...filter, check : c
        });
    }
    function buttonNext(c) {
        setfilter({
            ...filter, check : c
        });
    }
    function search(c) {
        setfilter({
            ...filter, check : c , search : searchInput
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
                                                <input type="input"  onChange={e => setsearchInput(e.target.value)}value={searchInput}></input>
                                                <button><i class="fa fa-search" onClick={search.bind(this,9)}></i></button>
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
                                    <li class="page-item">
                                        <button class="page-link"  disabled={pageIndex === 0 } onClick={buttonPrev.bind(this,7)}>Prev</button>
                                    </li>
                                    <li class="page-item">
                                        <button class="page-link" disabled={pageIndex === totalPage-1} onClick={buttonNext.bind(this,8)}>Next</button>
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
                            <a href="a">Lorem ipsum</a>
                            <a href="b">Vivamus</a>
                            <a href="c">Phasellus</a>
                            <a href="d">pulvinar</a>
                            <a href="e">Curabitur</a>
                            <a href="f">Fusce</a>
                            <a href="g">Sem quis</a>
                            <a href="h">Mollis metus</a>
                            <a href="i">Sit amet</a>
                            <a href="k">Vel posuere</a>
                            <a href="l">orci luctus</a>
                            <a href="m">Nam lorem</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Products
