import './Posts.css';
import { Post } from '../Post/Post';
import { Link } from 'react-router-dom';

export function Posts({posts}){
    return(
        <div className='posts'>
            { posts.length > 0 ? 
                (
                    posts.map((post)=>{
                        return <Post key={post._id} post={post}/>
                    }
                )) : 
                (
                    <>
                        <h1> No posts </h1>
                        <Link to="/write">
                            <h2> Why don't create one ? </h2>
                        </Link>
                    </>
                )
            }
        </div>
    )
}