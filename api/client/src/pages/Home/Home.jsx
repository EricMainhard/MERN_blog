import { Posts } from '../../components/Posts/Posts';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { Slider } from '../../components/Slider/Slider';
import './Home.css';
import { useState, useEffect } from 'react';
import { axiosInstance } from "../../config";

export function Home(){
    const [posts, setPosts] = useState([]);

    useEffect(()=>{
        const fetchPosts = async () => {
            let res = await axiosInstance.get("/posts");
            setPosts(res.data);
        }
        fetchPosts();

    }, []);

    return(
        <>
            <Slider/>
            <section className='home'>
                <Posts posts={posts}/>
                <Sidebar/>
            </section>
        </>
    )
}

