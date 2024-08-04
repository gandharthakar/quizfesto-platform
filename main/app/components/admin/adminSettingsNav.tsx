'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";

interface JWTDec {
    is_admin_user: string,
    exp: number,
    iat: number
}

function AdminSettingsNav() {

    const pathName = usePathname();
    const gtco = getCookie("is_admin_user");
    let AdminAuthUserID: string = '';

    let admin_id: JWTDec = {
        is_admin_user: '',
        exp: 0,
        iat: 0
    };
    if(gtco) {
        admin_id = jwtDecode(gtco);
        AdminAuthUserID = admin_id.is_admin_user;
    }

    return (
        <ul className="admin-settings-nav">
            <li>
                <Link
                    href={`/admin/settings/${AdminAuthUserID}`}
                    title="General"
                    className={`nav-item ${pathName === `/admin/settings/${AdminAuthUserID}` ? 'active' : ''}`}
                >
                    General
                </Link>
            </li>
            <li>
                <Link
                    href={`/admin/settings/password/${AdminAuthUserID}`}
                    title="Password"
                    className={`nav-item ${pathName === `/admin/settings/password/${AdminAuthUserID}` ? 'active' : ''}`}
                >
                    Password
                </Link>
            </li>
        </ul>
    )
}

export default AdminSettingsNav;