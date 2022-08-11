import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { useState, useContext } from 'react';
import './Login.css';
import { axiosInstance } from "../../config";
import { Context } from '../../context/Context';

export function Login(){
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const {user, isFetching, error, dispatch} = useContext(Context);

    let navigate = useNavigate();
    let location = useLocation();
    let from = location.state ? location.state.from.pathname : "/";

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        dispatch({type: "LOGIN_START"});
        try{
            const res = await axiosInstance.post("/auth/login", {
                username,
                password
            })
            dispatch({ type: "LOGIN_SUCCESS", payload: res.data });
            navigate(from, { replace: true });
        } catch(err){
            dispatch({ type: "LOGIN_FAILURE" });
        }
    }

    return(
        <div className="login">
            <h1 className='login__title'>LOG IN</h1>
            <form className="login__form" onSubmit={handleLoginSubmit}>
                <label className='login__label'>Username:</label>
                <input className='login__input' name='username' type="text" onChange={(e)=>{setUsername(e.target.value)}}/>
                <label className='login__label'>Password:</label>
                <input className='login__input' name='password' type="password" onChange={(e)=>{setPassword(e.target.value)}}/>
                <button className='login__submit' type="submit" disabled={isFetching}>Log in</button>
                {error && <span style={{color: "tomato", fontSize: "16px"}}>Something went wrong!</span>}
            </form>
        </div>
    )
}