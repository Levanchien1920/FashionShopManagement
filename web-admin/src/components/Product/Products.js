import React , {useState , useEffect, useContext} from 'react'
import {LoginContext} from '../Context/LoginContext'
import {useHistory } from 'react-router-dom';
import Pagination from '../Pagination/index'
import Api from '../Config/Api';
import { success } from '../Helper/Notification';
export default function Products() {
    const history =useHistory();
    const [ListProduct , setListProduct] = useState([]);
    const check = useContext(LoginContext);
    const [searchValue, setsearchValue] = useState("")
    const [filters, setFilters] = useState({
        page: 0,
        id : 0
    })
    var count = 0
    const [pagination, setPagination] = useState({
        page: 0,
        limit: 5,
        totalPages: 1
    })
    var token = {
        headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`} 
    }
    useEffect(() => {
        async function getData () {
            check.checklogin();
            Api.get('product?page='+filters.page, token).then((response)=> {
                setListProduct(response.data.content);
                setPagination({
                    page: response.data.pageIndex,
                    totalPages: response.data.totalPage
                })
            }).catch((error) =>{
            }); 
        }
        getData();     
    }, [filters])
    function handlePageChange(newPage) {
        setFilters({ ...filters ,
            page: newPage
        })
    }
    function deleteproduct (id) {
        Api.delete('product/'+id, token).then((response)=> {
            setFilters({...filters , id :id });
            success('Deleted category');
        }).catch((error) =>{

        }); 
    }
    function search (){
        if (searchValue !== "")
        Api.get('product?search='+searchValue, token).then((response)=> {
            console.log(response.data)
            setListProduct(response.data.content);
        }).catch((error) =>{
        }); 
        
    }
    return (
        <>
            {(check.IsLogin === false ) ? (
                <div className="page-wrapper">
                    <h3 style={{textAlign : "center"}}>You need login</h3>
                </div>
            ) : (
            <div className="page-wrapper">
                <div className="page-breadcrumb">
                        <div className="col-5 align-self-center">
                            <h4 className="page-title">Product</h4>
                        </div>
                </div>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-12">
                            <div className="card">
                                <div className="card-body">
                                        <h4 className="card-title">List Product </h4>
                                            <input placeholder="search" onChange={e =>{ setsearchValue(e.target.value)}}
                                            value={searchValue}  className="input-search"></input>
                                            <button onClick={search}className="btn-search "><i  className="fa fa-search" aria-hidden="true"></i></button>
                                        <button className="btn1 btn btn-success" onClick ={ e=> {history.push("/newproduct")}}>New</button>
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
                                                <tr key= {count++}>
                                                    <th scope="row">{product.id}</th>
                                                    <td>{product.name}</td>
                                                    <td>{product.number}</td>
                                                    <td>{product.name_Size}</td>
                                                    <td><a href={product.link} target="_blank">click in here</a></td>
                                                    <td><button className="btn btn-success" onClick ={ e=> {history.push(`/product/${product.id}`)}}>View</button> <button 
                                                    className="btn btn-info" onClick ={ e=> {history.push(`/editproduct/${product.id}`)}}>Edit</button> <button 
                                                    className="btn btn-danger" onClick = {deleteproduct.bind(this, product.id)}>Delete</button></td>

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