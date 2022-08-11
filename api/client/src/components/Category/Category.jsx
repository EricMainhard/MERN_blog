import './Category.css';
import { Link } from 'react-router-dom';

export function Category({cat}){
    
    const categoryStyle = {
        background: "url(/design.jpg)",
        position: "relative",
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        height: "15rem",
        width: "25rem"
    } 

    return(
        <div className='category' style={categoryStyle}>
            <div className="category__label">
                <Link to={`/cats?name=${cat.toLowerCase()}`} className="link">
                    <h3>
                        {cat}
                    </h3>
                </Link>
            </div>
        </div>
    )
}