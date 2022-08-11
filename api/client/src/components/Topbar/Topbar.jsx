import './Topbar.css';
import { Link } from 'react-router-dom';
import ArrowDropDownOutlinedIcon from '@mui/icons-material/ArrowDropDownOutlined';
import SearchIcon from '@mui/icons-material/Search';
import InstagramIcon from '@mui/icons-material/Instagram';
import PinterestIcon from '@mui/icons-material/Pinterest';
import TwitterIcon from '@mui/icons-material/Twitter';
import { useContext } from 'react';
import { Context } from '../../context/Context';
import { useEffect } from 'react';

export function Topbar(){

    const { user, dispatch } = useContext(Context);

    const handleLogout = () => {
        dispatch({ type: "LOGOUT" });
    }

    return(
        <div className="topbar">
            <div className="topbar__icons">
                <a href="#"><InstagramIcon/></a>
                <a href="#"><PinterestIcon/></a>
                <a href="#"><TwitterIcon/></a>
            </div>
            <ul className='topbar__list'>
                <li className='topbar__item drop-menu'>
                    <Link to="/">
                        Home <span><ArrowDropDownOutlinedIcon fontSize='small'/></span>
                    </Link>
                    <ul className='topbar__sublist'>
                        <li className='topbar__subitem'>
                            <Link to="#" aria-disabled={true} >Featured</Link>
                        </li>
                        <li className='topbar__subitem'>
                            <Link to="#">About</Link>
                        </li>
                        <li className='topbar__subitem'>
                            <Link to="#">Categories</Link>
                        </li>
                    </ul>
                </li>
                <li className='topbar__item'>
                    <Link to="/write">Write</Link>
                </li>
                <li className='topbar__item'>
                    <Link to="/contact">Contact</Link>
                </li>
                {user && (
                    <li className='topbar__item'>
                        <Link to="/login" onClick={handleLogout}>Logout</Link>
                    </li>
                )}
            </ul>
            <div className="topbar__search">
                <span>
                    <SearchIcon fontSize="large" />
                </span>
                { user ? 
                    <Link to="/profile">
                        <img src={user.profilePic || "/avatar.jpg"} className='topbar__avatar'/>
                    </Link> : 
                    <>
                        <Link to="/login" className="topbar__item link">Log in</Link>
                        <Link to="/register" className="topbar__item link">Register</Link>
                    </>
                }
            </div>
        </div>
    )
}