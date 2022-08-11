import { useState } from 'react';
import { axiosInstance } from "../../config";
import './Register.css';

export function Register(){

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(false);

    const handleSubmit = async (e) => {
        setError(false);
        e.preventDefault();
        try{
            const res = await axiosInstance.post("/auth/register", {
                username,
                email,
                password
            })
        } catch(err){
            setError(true);
        }
    }

    return(
        <div className="register">
            <h1 className="register__title">REGISTER</h1>
            <form className="register__form" onSubmit={handleSubmit}>
                <label className="register__label">Username:</label>
                <input className="register__input" name='username' type="text" onChange={(e)=>setUsername(e.target.value)}/>
                <label className="register__label">Email:</label>
                <input className="register__input" name='email' type="email" onChange={(e)=>setEmail(e.target.value)}/>
                <label className="register__label">Password:</label>
                <input className="register__input" name='password' type="password" onChange={(e)=>setPassword(e.target.value)}/>
                <button className="register__submit" type='submit'>Register</button>
                {error && <span style={{color: "tomato", fontSize: "16px"}}>Something went wrong!</span>}
            </form>
        </div>
    )
}