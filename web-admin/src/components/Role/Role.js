import React , {useState , useEffect} from 'react'
import axios from 'axios'
<<<<<<< HEAD
import { Link, Route, useHistory } from 'react-router-dom';
import API from '../Config/Api'
export default function Role() {
    const history = useHistory();
    const [ListRole , setListRole] = useState([]);
    const [runuseEff, setrunuseEff] = useState(1)
    useEffect(() => {
        let token = {
            headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`} 
        }
        API.get('role',token).then((response)=> {
                setListRole(response.data.content);
                console.log(response.data);
            }).catch((error) =>{
            });
    }, [runuseEff])

    function deleteRole (id) {
        let token = {
            headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`} 
        }
        API.delete(`admin/user/${id}`,token).then((response)=> {
            alert(response.data.message)
            setrunuseEff(id)
        }).catch((error) =>{
            alert(error.data)
        });
    }
    return (
            <div className="page-wrapper">
                <div className="page-breadcrumb">=
=======
import { Link, useHistory } from 'react-router-dom';
export default function Role() {
    const [ListRole , setListRole] = useState([]);
    const history = useHistory();
    const [filter, setfilter] = useState(0)
    useEffect(() => {
        
        let token =  {headers: {
              'Authorization': `Bearer ${localStorage.getItem("token")}`
            } 
        }
        function getData() {
            axios.get('http://localhost:9090/api/v1/role', token).then((response)=> {
                    setListRole(response.data.content);
                }).catch((error) =>{
                });
            }
        getData()
    }, [filter])

    return (
            <div className="page-wrapper">
                <div className="page-breadcrumb">
>>>>>>> 14ce30daeb3c9c3e21f3a95144e5268c67db3adf
                    <div className="row">
                        <div className="col-5 align-self-center">
                            <h4 className="page-title">Role</h4>
                        </div>
                        <div className="col-7 align-self-center">
                            <div className="d-flex align-items-center justify-content-end">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <Link to="/">Home</Link>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">Role</li>
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
<<<<<<< HEAD
                                <div className="card-body">
                                        <h4 className="card-title">List Role <button className="btn1 btn btn-success" onClick ={e => {history.push("/newemployee")}}>New</button></h4>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                            <th scope="col">Id</th>                                            
                                            <th scope="col">Name</th>
                                            <th scope="col">Role</th>
                                            <th scope="col">Actions</th>
=======
                                <div class="table-responsive">
                                    <table className="table table-hover">
                                        <thead>
                                            <tr>
                                            <th scope="col">Id</th>
                                            <th scope="col">Name</th>
                                            <th scope="col">Action</th>
>>>>>>> 14ce30daeb3c9c3e21f3a95144e5268c67db3adf
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ListRole.map((Role) => (
                                                <tr>
                                                    <th scope="row">{Role.id}</th>
                                                    <td>{Role.name}</td>
<<<<<<< HEAD
                                                    <td>{(Role.id == 1) ? "Admin" : ((Role.id == 2) ? "Employee" : ((Role.id == 3) ? "Customer" : ""))}</td>
                                                    <td><button className="btn btn-info" onClick ={ e=> {history.push(`/edit-role/${Role.id}`)}}>Edit</button> <button
                                                     className="btn btn-danger" onClick = {deleteRole.bind(this,Role.id)}>Delete</button></td>
                                                </tr>
=======
                                                    <td><button className="btn btn-success" onClick ={ e=> {history.push(`/userofrole/${Role.id}`)}}>View</button></td>
                                              </tr>
>>>>>>> 14ce30daeb3c9c3e21f3a95144e5268c67db3adf
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
<<<<<<< HEAD
}
=======
}
>>>>>>> 14ce30daeb3c9c3e21f3a95144e5268c67db3adf
