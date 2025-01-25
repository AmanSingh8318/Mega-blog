import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import '../../src/App.css';
import appwriteService from "../appwrite/config";
import { Container, PostCard, Signup } from '../component/index';
function Home() {
    const [posts, setPosts] = useState([])
    const [loading,setLoading]=useState(true);
    const user = useSelector((state) => state.auth.userData||{});

     console.log("user is",user);
     
    useEffect(() => {
        appwriteService.getPosts().then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
            setLoading(false)
        })
    }, [])
    if (loading) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                {/* <img src={SS} alt="img"  className='mx-auto mt-4'/> */}

                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <div className="loader">

                                </div> {/* Loader circle */}
                        </div>
                    </div>
                </Container>
            </div>
        );
    }
       
    if (posts && posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="">
                               {/* Please Lo
                               gin to read The posts .... */}
                                { !user? (
                                    <Signup />
                                ):(
                                    // <p> <img src={SS} alt="" /></p>
                                    null
                                )  }
                              
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    }
    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap'>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default Home