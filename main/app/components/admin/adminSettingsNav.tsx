'use client';

import Link from "next/link";
import { usePathname } from "next/navigation";
import { getCookie } from "cookies-next";
import { jwtDecode } from "jwt-decode";
import { useEffect, useState } from "react";

interface JWTDec {
    is_admin_user: string,
    exp: number,
    iat: number
}

function AdminSettingsNav() {

    const pathName = usePathname();
    const [auid, setAuid] = useState<string>("");

    useEffect(()=> {

        const gtco = getCookie("is_admin_user");
        let admin_id: JWTDec = {
            is_admin_user: '',
            exp: 0,
            iat: 0
        };
        if(gtco) {
            admin_id = jwtDecode(gtco);
            setAuid(admin_id.is_admin_user);
        }

        //eslint-disable-next-line
    }, []);

    return (
        <ul className="admin-settings-nav">
            <li>
                <Link
                    href={`/admin/settings/${auid}`}
                    title="General"
                    className={`nav-item ${pathName === `/admin/settings/${auid}` ? 'active' : ''}`}
                >
                    General
                </Link>
            </li>
            <li>
                <Link
                    href={`/admin/settings/password/${auid}`}
                    title="Password"
                    className={`nav-item ${pathName === `/admin/settings/password/${auid}` ? 'active' : ''}`}
                >
                    Password
                </Link>
            </li>
        </ul>
    )
}

export default AdminSettingsNav;