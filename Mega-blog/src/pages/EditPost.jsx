import { Container } from 'postcss';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import service from '../appwrite/config';
import { Postform } from '../component';

function EditPost() {
    const [post,setpost]=useState(null);
    const slug=useParams();
    const navigate=useNavigate();
    useEffect(()=>{

          if (slug) {
            service.updatePost(slug).then((post)=>{
                if (post) {
                    setpost(post)
                }
                else {
                    alert("sorry post is not found")
                }
  
            })

            
          }else {
            navigate("/")
          }
    },[])
    return post ? <div className='py-8'>
            <Container>
                <Postform post={post}/>
            </Container>
    </div>:null
}

export default EditPost
