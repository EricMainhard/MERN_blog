import './Post.css';
import { Link } from 'react-router-dom';

export function Post({post}){

    const PF = "http://localhost:3000/images/";

    return(
        <div className="post">
            { post.photo && (
            <div className="post__image">
                <img src={PF + post.photo}/>
            </div> )
            }
            <div className="post__info">
                {post.categories.map((cat)=>{
                    return (
                        <button className="post__category">{cat}</button>
                    )
                })}
                <em className="post__date">{new Date(post.createdAt).toLocaleString()}</em>
            </div>
            <div className="post__content">
                <h2>{post.title}</h2>
                <p>{post.description}</p>
                <Link to={`/posts/${post._id}`} className="link">
                    <button className='post__btn'>READ MORE</button>
                </Link>
            </div>
        </div>
    )
}