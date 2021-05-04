import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Post() {
    const [post, setpost] = useState([]);
    useEffect(() => {
        axios.get('http://localhost:9090/api/v1/client/post').then((response)=> {
            setpost(response.data.content);
            console.log(response.data.content)
        }).catch((error) =>{
        });
    }, [])
    return (
        <div>
            <ul>
                {post.map( (post) => (
                    <Link to={`/postdetail/${post.id}`}>
                        <li>{post.name} <p>{post.content}</p></li>
                    </Link>
                ))}
            </ul>
        </div>
    )
}
