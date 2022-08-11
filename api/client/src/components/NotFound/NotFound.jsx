import { Link } from 'react-router-dom';

export function NotFound(){
    return(
        <div className="notfound">
            NOT FOUND
            <Link to="/">
                HOME
            </Link>
        </div>
    )
}