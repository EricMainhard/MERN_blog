import { Write } from "../../components/Write/Write"
import { AuthRoute } from '../../components/AuthRoute';
import { useContext } from "react";
import { Context } from "../../context/Context";

export function WritePage(){

    const {user} = useContext(Context);

    return(
        <AuthRoute user={user}>
            <Write/>
        </AuthRoute>
    )
}