import { useLocation, Navigate } from 'react-router-dom';

export function AuthRoute({user, children}){

    const location = useLocation();

    if (!user){
        return <Navigate to="/login" state={{ from: location}} replace/>
    }
    return(
        children
    )
}