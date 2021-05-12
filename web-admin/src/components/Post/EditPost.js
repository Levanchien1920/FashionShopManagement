import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import React , {useState , useEffect, useContext} from 'react'
import {LoginContext} from '../Context/LoginContext'
import {useHistory} from 'react-router-dom'
import API from '../Config/Api';
export default function EditPost(props) {
    const token = {
        headers: {'Authorization': `Bearer ${localStorage.getItem("token")}`} 
    }
    const history = useHistory();
    const [post, setPost] = useState({
        // title : "",
        // content : "",
        // id_image : 0
    });
    const check = useContext(LoginContext);
    const idPost = props.match.params.id
    useEffect(() => {
            check.checklogin();
          
            API.get('post/' + idPost, token).then((response)=> {
                let temp = response.data
                console.log(response.data)
                setPost({...post,
                    title: temp.title,
                    content: temp.content,
                    id_image: temp.id_image
                });

                console.log(post)
            }).catch((error) =>{
    
            });

    }, []);

    const editPost =  (e) =>{
        e.preventDefault();  
        console.log(post)
        const data = {
            name : "hello",
            content: post.content,
            id_image: 1,
            title: post.title
        }
        console.log(data)
        
        API.patch('post/' + idPost, data, token).then((response) => {
            console.log(response.data)
            history.push('/posts')  
        }).catch((error) => {

        });
        // console.log(category);
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
                    <h4 className="page-title">Edit Post</h4>
                </div>
                <div className="col-7 align-self-center">
                    <div className="d-flex align-items-center justify-content-end">
                        <nav aria-label="breadcrumb">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <a href="#">Home</a>
                                </li>
                                <li className="breadcrumb-item active" aria-current="page">Edit Post</li>
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
                                <label htmlFor="title">Title</label>
                                <input type="text" className="form-control" value={post.title} id="title" name="title"
                                    onChange={e => setPost({...post ,title : e.target.value})}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="content">Content</label>
                                <CKEditor
                                    
                                    editor={ ClassicEditor }
                                    data={post.content}
                                    onReady={ editor => {
                                        // console.log( 'Editor is ready to use!', editor );
                                    } }
                                    onChange={ ( event, editor ) => {
                                        let data = editor.getData();
                                        setPost({...post , content : data});
                                    } }
                                />
                            </div>
  
                            <div className="form-group">
                                <button type="button" name="example-email" className="btn btn-info" onClick={editPost}>Save </button>
                               
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