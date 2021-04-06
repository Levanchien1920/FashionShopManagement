import React , {useState , useEffect} from 'react'
import axios from 'axios'
export default function Review() {
    const [ListReview , setListReview] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:9090/api/v1/review').then((response)=> {
                setListReview(response.data.content);
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
                                        <li className="breadcrumb-item active" aria-current="page">Review</li>
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
                                        <h4 class="card-title">List Review</h4>
                                </div>
                                <div class="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                                <th scope="col">Id</th>
                                                <th scope="col">Star</th>
                                                <th scope="col">Content</th>                                                
                                                <th scope="col">Name</th>
                                                <th scope="col">Email</th>
                                                <th scope="col">Product</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ListReview.map((Review) => (
                                                <tr>
                                                    <th scope="row">{Review.id}</th>
                                                    <td>{Review.number_Of_Star}</td>
                                                    <td>{Review.content}</td>
                                                    <td>{Review.name_User}</td>
                                                    <td>{Review.email}</td>
                                                    <td>{Review.name_Product}</td>
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
