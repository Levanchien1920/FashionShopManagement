import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router';

export default function PostDetail() {
    const [post, setpost] = useState({});
    const history=useHistory();
    useEffect(() => {
        const id = history.location.pathname.split("/")[2];
        axios.get(`http://localhost:9090/api/v1/post/${id}`).then((response)=> {
            setpost(response.data);
        }).catch((error) =>{
        });
    }, [])
    return (
        <div>
            {post.name}
        </div>
    )
}
