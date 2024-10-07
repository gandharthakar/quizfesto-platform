'use client';

import { getCookie } from "cookies-next";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
// import { RootState } from "../redux-service/store";
// import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { set_auth_user_id, unset_auth_user_id } from "../redux-service/slices/user-area/authUserReducer";

interface Props {
    children: React.ReactNode
    // any props that come into the component
}

interface JWTDec {
    is_auth_user: string,
    exp: number,
    iat: number
}

function CheckAuthUser({ children }:Props) {

    const dispatch = useDispatch();
    // const UserID = useSelector((state: RootState) => state.auth_user_id);

    useEffect(() => {
        let authid = getCookie('is_auth_user');
        let user_id: JWTDec = {
            is_auth_user: '',
            exp: 0,
            iat: 0
        };
        if(authid) {
            user_id = jwtDecode(authid);
            dispatch(set_auth_user_id(user_id.is_auth_user))
        } else {
            dispatch(unset_auth_user_id());
        }
    });

    return (
        <>{children}</>
    )
}

export default CheckAuthUser;