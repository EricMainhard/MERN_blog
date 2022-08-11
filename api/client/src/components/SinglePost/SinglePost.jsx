import './SinglePost.css';
import { useLocation } from 'react-router-dom';
import { axiosInstance } from "../../config";
import { useEffect, useState, useContext } from 'react';
import { Context } from '../../context/Context';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CheckIcon from '@mui/icons-material/Check';


export function SinglePost(){

    const { pathname } = useLocation();
    const path = pathname.split('/')[2];
    const [post, setPost] = useState({});
    const PF = "http://localhost:3000/images/";
    const {user} = useContext(Context);
    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [editMode, setEditMode] = useState(false);

    const handleDelete = async () => {
        try{
            await axiosInstance.delete("/posts/" + path, {
                data: {
                    username: user.username
                }
            });
            location.replace("/");
        } catch(err){
            console.log(err);
        }
    }

    const handleEdit = () => {
        setEditMode(true)
    }

    const handleUpdate = async () => {
        try{
            await axiosInstance.put("/posts/" + path, {
                username: user.username,
                title,
                description: desc
            });
            setEditMode(false);
            location.reload();
        } catch(err){
            console.log(err);
        }
    }

    useEffect(()=>{
        const fetchPost = async () => {
            const res = await axiosInstance.get('/posts/' + path);
            setPost(res.data);
            setTitle(res.data.title);
            setDesc(res.data.description);
        }
        fetchPost();
    },[pathname])

    
    return(
        <div className='singlePost'>
            {post.photo && (
                <figure className='singlePost__figure'>
                    <img className='singlePost__image' src={PF + post.photo}/>
                </figure>
            )}
            { editMode ? (
                    <input type="text" className='singlePost__titleInput' value={title} 
                    autoFocus={true} onChange={(e)=>{setTitle(e.target.value)}}/>
                ) : (
                    <h2 className='singlePost__title'>
                        {post.title}
                    </h2>
                )
            } 
            { editMode ? (
                    <textarea value={desc} className='singlePost__descInput' onChange={(e)=>{setDesc(e.target.value)}}/>
                ) : (
                    <p className='singlePost__desc'>
                        {post.description}
                    </p>
                )
            } 
            <p className='singlePost__username'>
                {post.username}
            </p>
            {post.categories && post.categories.map((cat)=>{
                return (
                    <button className='singlePost__category'>
                        {cat}
                    </button>
                )
            })}                    

            {user?.username == post.username && (
                <div className='singlePost__controls'>
                    <span onClick={handleDelete}><DeleteIcon/></span>
                    <span onClick={handleEdit}><EditIcon/></span>
                </div>
            )}

            {editMode && (
                <button className='singlePost__editBtn' onClick={handleUpdate}>
                    UPDATE <CheckIcon/>
                </button>
            )}
        </div>
    )
}