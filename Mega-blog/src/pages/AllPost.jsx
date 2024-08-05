import React, { useEffect, useState } from 'react'
import service from '../appwrite/config'
import { Container, PostCard } from '../component'

function AllPost() {
    const [post,setpost]=useState()
    useEffect(()=>{
        service.getPosts([]).then((post)=>{
            if (post) {
                setpost(post.documents)
            }
        }).catch((post)=>{
            console.error(post)
            setpost([])
        })
    },[])
   
  return (
    <div className='w-full py-8'>
      <Container>
        <div className='flex flex-wrap'>
        {post.map((post)=>{
            <div id={post.$id} className='p-2 w-1/4'>
                <PostCard post={post}/>  // postCard component will be imported here  // postCard component will be created in separate file // postCard component will be used here in AllPost component  // AllPost component will be used in App.js file  // AllPost component will be used in Home.js file  // AllPost component will be used in About.js file  // AllPost component will be used in Contact.js file  // AllPost component will be used in Blog.js file  // AllPost component will be used in SinglePost.js file  // AllPost component will be used in BlogPost.js file  // AllPost component will be used in BlogPostList.js file  // AllPost component will be used in BlogPostForm.js file  // AllPost component will be used in BlogPostUpdate.js file  // AllPost component will be used in BlogPostDelete.js file  // AllPost component will be used
            </div>
        })}
        </div>
      </Container>
    </div>
  )
}

export default AllPost
