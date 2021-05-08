import React , {useState , useEffect, useContext} from 'react'
import {LoginContext} from '../Context/LoginContext'
import axios from 'axios'
import { Link ,useHistory } from 'react-router-dom';
import Pagination from '../Pagination/index'
export default function Products() {
    const history =useHistory();
    const [ListProduct , setListProduct] = useState([]);
    const check = useContext(LoginContext);
    const [pagination, setPagination] = useState({
        page: 0,
        limit: 5,
        totalPages: 1
    })

    const [filters, setFilters] = useState({
        id : 0,
        page: 0,
        post_edit_id: 0
    })
    var token = {
        headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`} 
    }
    useEffect(() => {
        async function getData () {
            let token = {
                headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`} 
            }
            check.checklogin();
            axios.get(`http://localhost:9090/api/v1/product?page=${pagination.page}`,token).then((response)=> {
                setListProduct(response.data.content);
                setPagination({
                    page: response.data.pageIndex,
                    totalPages: response.data.totalPage
                })
                console.log(response.data);
            }).catch((error) =>{
            });
        }
        getData();     
    }, [filters])
    function handlePageChange(newPage) {
        setFilters({
            page: newPage
        })
        console.log(filters)
        console.log('New page: ', newPage)
    }
    function deleteproduct (id) {
        let token = {
            headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`} 
        }
        axios.delete(`http://localhost:9090/api/v1/product/${id}`,token).then((response)=> {
            setFilters({...filters , id :id });
        }).catch((error) =>{
        });
    }
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
                            <h4 className="page-title">Product</h4>
                        </div>
                        <div className="col-7 align-self-center">
                            <div className="d-flex align-items-center justify-content-end">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <Link to="/">Home</Link>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">Product</li>
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
                                        <h4 className="card-title">List Product <button className="btn1 btn btn-success" onClick ={ e=> {history.push("/newproduct")}}>New</button></h4>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                            <th scope="col">Id</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Number</th>
                                            <th scope="col">Size</th>
                                            <th scope="col">Image</th>
                                            <th scope="col">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ListProduct.map((product) => (
                                                <tr>
                                                    <th scope="row">{product.id}</th>
                                                    <td>{product.name}</td>
                                                    <td>{product.number}</td>
                                                    <td>{product.name_Size}</td>
                                                    <td><a href={product.link} target="_blank">click in here</a></td>
                                                    <td><button className="btn btn-success" onClick ={ e=> {history.push(`/product/${product.id}`)}}>View</button> 
                                                    <button className="btn btn-info" onClick ={ e=> {history.push(`/editproduct/${product.id}`)}}>Edit</button>
                                                    <button className="btn btn-danger" onClick = {deleteproduct.bind(this, product.id)}>Delete</button></td>

                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <Pagination
                                pagination={pagination}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
            )}
        </>
    )
}
