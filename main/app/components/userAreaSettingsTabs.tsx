'use client';

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";

export default function UserAreaSettingsTabs() {

    const pathName = usePathname();
    const params = useParams();
    const user_id = params?.user_id[0];

    return (
        <>
            <ul className="user-area-set-nav flex flex-wrap flex-row lg:flex-col">
                <li>
                    <Link
                        href={`/user/settings/1`}
                        title="General"
                        className={`${pathName === '/user/settings/'+user_id ? 'active' : ''}`}
                    >
                        General
                    </Link>
                </li>
                <li>
                    <Link
                        href={`/user/settings/password/1`}
                        title="Password"
                        className={`${pathName === '/user/settings/password/'+user_id ? 'active' : ''}`}
                    >
                        Password
                    </Link>
                </li>
                <li>
                    <Link
                        href={`/user/settings/phone/1`}
                        title="Phone"
                        className={`${pathName === '/user/settings/phone/'+user_id ? 'active' : ''}`}
                    >
                        Phone
                    </Link>
                </li>
                <li>
                    <Link
                        href={`/user/settings/profle-photo/1`}
                        title="Profile Photo"
                        className={`${pathName === '/user/settings/profle-photo/'+user_id ? 'active' : ''}`}
                    >
                        Profile Photo
                    </Link>
                </li>
            </ul>
        </>
    )
}