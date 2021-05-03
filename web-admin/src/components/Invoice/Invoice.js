import React , {useState , useEffect} from 'react'
import axios from 'axios'
import { Link, useHistory } from 'react-router-dom';
import Api from '../Config/Api';
export default function Invoice() {
    const history = useHistory();
    const [ListInvoice , setListInvoice] = useState([]);

    useEffect(() => {
        Api.get('invoice/ByEmployee').then((response)=> {
                setListInvoice(response.data.content);
            }).catch((error) =>{
            });
    }, [])

    return (

            <div className="page-wrapper">
                <div className="page-breadcrumb">
                    <div className="row">
                        <div className="col-5 align-self-center">
                            <h4 className="page-title">Invoice</h4>
                        </div>
                        <div className="col-7 align-self-center">
                            <div className="d-flex align-items-center justify-content-end">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <Link to="/">Home</Link>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">Employee</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                        <h4 className="card-title">List Employee <button className="btn1 btn btn-success" onClick ={e => {history.push("/add-invoice")}}>New</button></h4>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                            <th scope="col">Id</th>                                            
                                            <th scope="col">Employee</th>
                                            <th scope="col">List Product</th>
                                            <th scope="col">Status</th>
                                            <th scope="col">Total Money</th>
                                            <th scope="col">Action</th>

                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ListInvoice.map((Invoice) => (
                                                <tr>
                                                
                                                    <th scope="row">{Invoice.id}</th>
                                                    <td>{Invoice.fullName_Employee}</td>
                                                    <td>{Invoice.name_Product}</td>
                                                    <td>{Invoice.is_paid}</td>
                                                    <td>{Invoice.number_Product}</td>
                                                    <td><button className="btn btn-success" onClick ={e => {history.push("/view-invoice")}}>View</button></td>

                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}
