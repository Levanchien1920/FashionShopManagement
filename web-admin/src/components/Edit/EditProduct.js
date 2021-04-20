import axios from 'axios';
import React , {useState , useEffect, useContext} from 'react'
import {LoginContext} from '../Context/LoginContext'
export default function EditProduct() {
    const [listCategory, setlistCategory] = useState([]);
    const [listBrand, setlistBrand] = useState([]);
    const check = useContext(LoginContext);
    var array = window.location.pathname.split("/");
    useEffect(() => {
        check.checklogin();
        console.log(array[array.length -1]);
        axios.get(`http://localhost:9090/api/v1/product/${array[array.length -1]}`).then((response)=> {
            setlistCategory(response.data);
            console.log(response.data);
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
    return (
        <>
        {(check.IsLogin === false ) ? (
            <div className="page-wrapper">
                <h3 style={{textAlign : "center"}}>you need login</h3>
            </div>
        ) : (
        <div className="page-wrapper">
        <div className="page-breadcrumb">
            <div className="row">
                <div className="col-5 align-self-center">
                    <h4 className="page-title">New Product</h4>
                </div>
                <div className="col-7 align-self-center">
                    <div className="d-flex align-items-center justify-content-end">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <a href="#">Home</a>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">New Product</li>
                            </ol>
                        </nav>
                    </div>
                </div>
            </div>
        </div>
        <div className="container-fluid">
            <div className="row">
                <div className="col-12">
                    <div className="card card-body">
                        <form className="form-horizontal m-t-30">
                            <div className="form-group">
                                <label for="name">Name</label>
                                <input type="text" className="form-control" value="" id="name"/>
                            </div>
                            <div className="form-group">
                                <label for="number">Number</label>
                                <input type="text" className="form-control" value=""id="number"/>
                            </div>
                            <div className="form-group">
                                <label  for="price">Price</label>
                                <input type="text" className="form-control" value="" id="price"/>
                            </div>
                            <div className="form-group">
                                <label for="des">Description</label>
                                <textarea type="text" className="form-control" rows="5" value="" id="des"/>
                            </div>
                            <div className="form-group">
                                <label for="linkimage">Link Image</label>
                                <input type="text" className="form-control" value="" id="linkimage"/>
                            </div>
                            <div className="form-group">
                                <div className="row">
                                    <label className="idlabel" for="brand">Brand</label>
                                    <select className="col-md-3" id="brand">
                                        {listBrand.map((brand) => (
                                           <option value={brand.name}>{brand.name}</option>
                                        ))}
                                    </select>
                                    <label className="idlabel" for="category">Category</label>
                                    <select className="col-md-3" id="category">
                                        {listCategory.map((category) => (
                                           <option value={category.name}>{category.name}</option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className="form-group">
                                <label>Gender</label><br></br>
                                <input type="radio" id="male" value="Male" name="gender"/><label for="male" className="idlabel" >Male</label>
                                <input type="radio" id="female" value="Female" name="gender"/><label for="female"className="idlabel" >Female</label><br></br>
                            </div>
                            <div className="form-group">
                                <button type="button" name="example-email" className="btn">Save </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
     )}
     </>
    )
}
