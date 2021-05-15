import React , {useState , useEffect, useContext} from 'react'
import API from '../Config/Api'
import Pagination from '../Pagination/index'
import { Link , useHistory } from 'react-router-dom';
import queryString from 'query-string'
import {LoginContext} from '../Context/LoginContext'
const tableStyle = {
    // border: 1px solid black,
    // table-layout: fixed,
    // width: '200px',
}

const thStyle = {
//   border: '1px solid black',
  width: '400px',
  overflow: 'hidden'
}

const titleStyle = {
    width: '200px',
    overflow: 'hidden'
}

function Post() {
    const history = useHistory();
    const [ListPost , setListPost] = useState([]);
    const check = useContext(LoginContext);
    const [pagination, setPagination] = useState({
        page: 0,
        limit: 5,
        totalPages: 1
    })

    const [filters, setFilters] = useState({
        page: 0,
        post_edit_id: 0
    })

    var token = {
        headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`} 
    }

    useEffect(() => {
        // const paramsString = queryString.stringify(filters)
        // const requestUrl = `post?${paramsString}`
        // API.get(requestUrl).then((response)=> {
        //         setListPost(response.data.content);
        //         setPagination({
        //             page: response.data.pageIndex,
        //             totalPages: response.data.totalPage
        //         })
        //     }).catch((error) =>{
        //     });

        async function getData () {
            let token = {
                headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`} 
            }
            check.checklogin();
            const paramsString = queryString.stringify(filters)
            const requestUrl = `post?${paramsString}`
            API.get(requestUrl,token).then((response)=> {
                setListPost(response.data.content);
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

    const deletePost = (e) => {
        e.preventDefault()
        let id = e.target.id.toString()
        // console.log(id)
   
        API.delete('post/' + id)
        .then(response => {
            setFilters({...filters, post_edit_id: id})
            console.log(response.data)
            // alert("Xóa category thành công")
            // window.localStorage.removeItem("cart")
            // history.push('/home') 
        })
        .catch(errors => {
              console.log(errors)
        })
    }
    
    return (
            <div className="page-wrapper">
                <div className="page-breadcrumb">
                    <div className="row">
                        <div className="col-5 align-self-center">
                            <h4 className="page-title">Post</h4>
                        </div>
                        <div className="col-7 align-self-center">
                            <div className="d-flex align-items-center justify-content-end">
                                <nav aria-label="breadcrumb">
                                    <ol className="breadcrumb">
                                        <li className="breadcrumb-item">
                                            <Link to="/">Home</Link>
                                        </li>
                                        <li className="breadcrumb-item active" aria-current="page">Post</li>
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
                                        <h4 className="card-title">List Post <button className="btn1 btn btn-success" onClick ={ e=> {history.push("/add-post")}} >New</button></h4>
                                </div>
                                <div className="table-responsive">
                                    <table className="table table-hover" style = {tableStyle}>
                                        <thead>
                                            <tr>
                                                <th scope="col">Id</th>
                                                <th scope="col">Name</th>
                                                <th scope="col" style = {titleStyle}>Title</th>
                                                <th scope="col" style = {thStyle}>Content</th>
                                                {/* <th scope="col">Detail</th> */}
                                                <th scope="col">Action</th>
                                        
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {ListPost.map((Post) => (
                                                <tr key={Post.id}>
                                                    <th scope="row">{Post.id}</th>
                                                    <td>{Post.name}</td>
                                                    <td>{Post.title}</td>
                                                    {/* <td></td> */}
                                                    <td>{Post.content}</td>
                                                    {/* <td ><a href={Post.link} target="_blank">click in here</a></td> */}
                                                    <td><button className="btn btn-success">View</button> <button className="btn btn-info" onClick ={ e => {history.push(`/edit-post/${Post.id}`)}}>Edit</button> <button className="btn btn-danger" id = {Post.id} onClick={deletePost}>Delete</button></td>
                                                    
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    <Pagination
                                        pagination={pagination}
                                        onPageChange={handlePageChange}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Post