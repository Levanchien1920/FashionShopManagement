import React , {useState , useEffect} from 'react'
import axios from 'axios'
export default function Products() {
    const [ListProduct , setListProduct] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:9090/api/v1/product').then((response)=> {
                console.log(ListProduct);
                setListProduct(response.data.content);
                console.log(response.data.content);
                console.log(ListProduct);
            }).catch((error) =>{
            });
    }, [])
    return (
            <div className="page-wrapper">
                <div className="page-breadcrumb">
                    <div className="row">
                        <div className="col-5 align-self-center">
                            <h4 className="page-title">Dashboard</h4>
                        </div>
                        <div className="col-7 align-self-center">
                            <div className="d-flex align-items-center justify-content-end">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <a href="a">Home</a>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">Dashboard</li>
                                    </ol>
                                </nav>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="container-fluid">
                    <div class="row">
                        <div class="col-12">
                            <div class="card">
                                <div class="card-body">
                                        <h4 class="card-title">List Product</h4>
                                </div>
                                <div class="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                            <th scope="col">Id</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Numeber</th>
                                            <th scope="col">Description</th>
                                            <th scope="col">Price</th>
                                            <th scope="col">Brand</th>
                                            <th scope="col">Gender</th>
                                            <th scope="col">Category</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        
                                            {ListProduct.map((product) => (
                                                <tr>
                                                    <th scope="row">{product.id}</th>
                                                    <td>{product.name}</td>
                                                    <td>{product.number}</td>
                                                    <td>{product.des}</td>
                                                    <td>{product.price}</td>
                                                    <td>{product.name_Brand}</td>
                                                    <td>{product.name_Gender}</td>
                                                    <td>{product.name_Category}</td>
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
