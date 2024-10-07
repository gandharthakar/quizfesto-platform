import type { Metadata } from "next";
import "@/app/globals.css";
import RedProv from "@/app/redux-service/reduxProvider";
import CheckAuthUser from "@/app/lib/checkAuthUser";
import GoogleAuthSessionProvider from "@/app/lib/googleAuthSessionProvider";

export const metadata: Metadata = {
	title: "QuizFesto",
	description: "QuizeFesto is the online platform where you can participate on many quizzes created by our team and win excited prizes.",
	keywords: ["NextJS", "Quiz App"],
};

type Children = {
	children: React.ReactNode;
}

export default function RootLayout({ children, }: Readonly<Children>) {
	return (
		<html lang="en" className="">
			<body className="">
				<GoogleAuthSessionProvider>
					<RedProv>
						<CheckAuthUser>
							{children}
						</CheckAuthUser>
					</RedProv>
				</GoogleAuthSessionProvider>
			</body>
		</html>
	);
}