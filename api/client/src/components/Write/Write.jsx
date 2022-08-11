import AddIcon from '@mui/icons-material/Add';
import { axiosInstance } from "../../config";
import { useContext } from 'react';
import { useState } from 'react';
import { Context } from '../../context/Context';
import './Write.css';

export function Write(){

    const { user } = useContext(Context);

    const [title, setTitle] = useState("");
    const [desc, setDesc] = useState("");
    const [file, setFile] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newPost = {
            title,
            description: desc,
            username: user.username,
            categories: []
        }
        if (file){
            const data = new FormData();
            const fileName = Date.now() + file.name;
            data.append("name", fileName);
            data.append("file", file);
            newPost.photo = fileName;
            try{
                await axiosInstance.post("/upload", data);
            }
            catch(err){
                console.log(err);
            }
        }
        try{
            const res = await axiosInstance.post("/posts", newPost);
            console.log(res);
            window.location.replace(`/posts/${res.data._id}`);
        } catch(err){
            console.log(err);
        }
    }

    return(
        <div className="write">
            {file && (
                <img src={URL.createObjectURL(file)} alt="" className="writeImg" />
            )}
            <form action="/" method="post" className="write__form" onSubmit={handleSubmit}>
                <div className="write__formGroup">
                    <label htmlFor="write__fileInput" className='write__fileLabel'>
                        <AddIcon/>
                    </label>
                    <input type="file" id="write__fileInput" onChange={(e)=>{
                        setFile(e.target.files[0]);
                    }}/>
                    <input type="text" placeholder="Title" id="write__titleInput" onChange={(e)=>{
                        setTitle(e.target.value);
                    }}/> 
                </div>
                <div className="write__formGroup">
                    <textarea className="write__textInput" name="description" placeholder='Description...' onChange={(e)=>{
                        setDesc(e.target.value);
                    }}></textarea>
                </div>
                <button className="write__submit" type='submit'>Publish</button>
            </form>
        </div>
    )
}