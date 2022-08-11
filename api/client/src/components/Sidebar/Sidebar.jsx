import './Sidebar.css';
import { Newsletter } from '../Newsletter/Newsletter';
import { Category } from '../Category/Category';
import { useState } from 'react';
import { useEffect } from 'react';
import { axiosInstance } from "../../config";

export function Sidebar(){

    const [cats, setCats] = useState([]);

    useEffect(()=>{

        const getCats = async () => {
            const res = await axiosInstance.get("/cats");
            setCats(res.data);
        }

        getCats();
    },[])

    return(
        <div className='sidebar'>
            <div className="sidebar-block">
                <h2 className="sidebar-block__title">About Us</h2>
                <p className="sidebar-block__text">Lorem ipsum dolor sit amet consectetur adipisicing elit. Ratione, nihil!</p>
                <img className="sidebar-block__image" src="/about_us.jpg"/>
            </div>
            <Newsletter/>
            <div className="sidebar-block">
                <h2 className="sidebar-block__title">Categories</h2>
                {cats.map((cat)=>{
                    return (
                        <Category cat={cat.name} key={cat._id}/>
                    )
                })}
            </div>
        </div>
    )
}
