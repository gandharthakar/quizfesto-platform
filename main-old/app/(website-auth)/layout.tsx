import type { Metadata } from "next";
import "../globals.css";
import RedProv from "../redux-service/reduxProvider";
import CheckAuthUser from "@/app/lib/checkAuthUser";

export const metadata: Metadata = {
	title: "QuizFesto - Login / Register",
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
				<RedProv>
					<CheckAuthUser>
						{children}
					</CheckAuthUser>
				</RedProv>
			</body>
		</html>
	);
}