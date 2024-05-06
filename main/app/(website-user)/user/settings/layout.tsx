import UserAreaSettingsTabs from "@/app/components/userAreaSettingsTabs";
import "@/app/globals.css";
import RedProv from "@/app/redux-service/reduxProvider";

type Children = {
	children: React.ReactNode;
}

export default function RootLayout({ children, }: Readonly<Children>) {
	return (
		<div>
            <RedProv>
                <div className="py-[25px]">
                    <UserAreaSettingsTabs />
                    {children}
                </div>
            </RedProv>
        </div>
	);
}