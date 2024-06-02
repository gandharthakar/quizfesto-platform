'use client';

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

function AdminSettingsNav() {

    const pathName = usePathname();
    const params = useParams();
    const user_id = params?.userid[0];

    return (
        <ul className="admin-settings-nav">
            <li>
                <Link
                    href={`/admin/settings/${user_id}`}
                    title="General"
                    className={`nav-item ${pathName === `/admin/settings/${user_id}` ? 'active' : ''}`}
                >
                    General
                </Link>
            </li>
            <li>
                <Link
                    href={`/admin/settings/password/${user_id}`}
                    title="Password"
                    className={`nav-item ${pathName === `/admin/settings/password/${user_id}` ? 'active' : ''}`}
                >
                    Password
                </Link>
            </li>
        </ul>
    )
}

export default AdminSettingsNav;