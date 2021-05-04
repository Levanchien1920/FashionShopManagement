import React, { useState } from 'react'
import { Link } from 'react-router-dom'
function EditCategory(props) {
    const [newvalue, setnewvalue] = useState({
        category : ""
    });

    console.log(props.match);

    const save =  (e) =>{
        console.log(newvalue);
    }
    return (
        <div className="page-wrapper">
        <div className="page-breadcrumb">
            <div className="row">
                <div className="col-5 align-self-center">
                    <h4 className="page-title">Edit Category</h4>
                </div>
                <div className="col-7 align-self-center">
                    <div className="d-flex align-items-center justify-content-end">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to="/">Home</Link>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">New Category</li>
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
                        <h4 className="card-title">Edit</h4>
                        <form className="form-horizontal m-t-30">
                            <div className="form-group">
                                <label>Name Category <span className="help"> e.g. "Luis Vutton"</span></label>
                                <input type="text" className="form-control" value=""
                                onChange={e => setnewvalue({...newvalue ,category : e.target.value})} value={newvalue.category}/>
                            </div>
                            <div className="form-group">
                                <button type="button" name="example-email" className="btn btn-success" onClick={save}>Save </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    )
}

export default  EditCategory