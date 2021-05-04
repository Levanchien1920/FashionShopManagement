import axios from 'axios';
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import React , {useState , useEffect, useContext} from 'react'
import {LoginContext} from '../Context/LoginContext'
export default function NewProduct() {
    const [listCategory, setlistCategory] = useState([]);
    const [listBrand, setlistBrand] = useState([]);
    const check = useContext(LoginContext);
    const [dataoutput, setdataoutput] = useState({
        id_cate: "0",
        id_brand: "0",
        id_gender : "0",
        name: "",
        iamgeName: "Áo hai dây & Áo ba lỗ",
        price: "",
        name_size : "L",
        number : "",
        id_image : "",
        id_color : "",
        des: "",
    })
    useEffect(() => {
        check.checklogin();
        axios.get('http://localhost:9090/api/v1/category',{
            headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                    } 
            }).then((response)=> {
            setlistCategory(response.data.content);
        }).catch((error) =>{
        });
        axios.get('http://localhost:9090/api/v1/brand',{
            headers: {
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                    } 
            }).then((response)=> {
            setlistBrand(response.data.content);
            console.log(response.data.content);
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
                                <input type="text" className="form-control" value={dataoutput.name} id="name"
                                 onChange={e => setdataoutput({...dataoutput ,name : e.target.value})}/>
                            </div>
                            <div className="form-group">
                                <label for="number">Number</label>
                                <input type="text" className="form-control"  value={dataoutput.number} id="number"
                                 onChange={e => setdataoutput({...dataoutput ,number : e.target.value})}/>
                            </div>
                            <div className="form-group">
                                <label  for="price">Price</label>
                                <input type="text" className="form-control" value={dataoutput.price} id="price"
                                 onChange={e => setdataoutput({...dataoutput ,price : e.target.value})}/>
                            </div>
                            <div className="form-group">
                                <label for="des">Description</label>
                                <CKEditor
                                    editor={ ClassicEditor }
                                    data=""
                                    onReady={ editor => {
                                        console.log( 'Editor is ready to use!', editor );
                                    } }
                                    onChange={ ( event, editor ) => {
                                        const data = editor.getData();
                                        console.log( { event, editor, data } );
                                    } }
                                />
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
                                <div className="row">
                                    <label className="idlabel" for="size">Size  :</label>
                                    <select className="col-md-3" id="size">
                                        <option value="M">M</option>
                                        <option value="L">L</option>
                                        <option value="XL">XL</option>
                                        <option value="XXL">XXL</option>
                                    </select>
                                    <label className="idlabel" for="Color">Color</label>
                                    <select className="col-md-3" id="Color">
                                        {listCategory.map((category) => (
                                           <option value={category.name}>{category.name}</option>
                                        ))}
                                    </select>
                                    <label className="idlabel" for="image">Image</label>
                                    <select className="col-md-3" id="image">
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
