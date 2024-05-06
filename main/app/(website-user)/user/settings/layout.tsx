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
                    <div className="flex flex-col lg:flex-row gap-x-[25px]">
                        <UserAreaSettingsTabs />
                        <div className="w-full lg:flex-1">
                            {children}
                        </div>
                    </div>
                </div>
            </RedProv>
        </div>
	);
}