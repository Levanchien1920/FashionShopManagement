import axios from 'axios';
import React, { useState } from 'react'
import {useHistory} from 'react-router-dom'
export default function EditBrand() {
        const [message , setmessage] = useState("");
        const [newvalue, setnewvalue] = useState({
            name : ""
        });
        const history = useHistory()
        const savebrand =  (e) =>{
            let token = {
                headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`} 
            }
            let id = window.location.pathname.split('/')
            if( newvalue.brand === "" ) {
                setmessage("You have not entered enough");
            }else {
                    axios.patch(`http://localhost:9090/api/v1/brand/${id[id.length-1]}`, newvalue , token).then((response)=> {
                        alert(response.data.message);
                        history.push('/brands')
                    }).catch((error) =>{
                        alert(error.response.data.message);
                        console.log(error.response)
                    });
            }
        }
        return (
            <div className="page-wrapper">
                <div className="page-breadcrumb">
                    <div className="row">
                        <div className="col-5 align-self-center">
                            <h4 className="page-title">New Brand</h4>
                        </div>
                        <div className="col-7 align-self-center">
                            <div className="d-flex align-items-center justify-content-end">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <a href="#">Home</a>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">New Brand</li>
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
                                <h4 className="card-title">New</h4>
                                <form className="form-horizontal m-t-30">
                                    <div className="form-group">
                                        <label>Name Brand <span className="help"> e.g. "Gucci"</span></label>
                                        <input type="text" className="form-control" 
                                        onChange={e => setnewvalue({...newvalue ,name : e.target.value})} value={newvalue.brand}></input>
                                    </div>
                                    <div className="form-group">
                                        <button type="button" name="example-email" className="btn" onClick={savebrand}>Save </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )

}