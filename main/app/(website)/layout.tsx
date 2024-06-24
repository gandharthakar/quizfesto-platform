import type { Metadata } from "next";
import "../globals.css";
import Header from '../components/header';
import RedProv from "../redux-service/reduxProvider";
import Footer from "../components/footer";
import CheckAuthUser from "../lib/checkAuthUser";
import GoogleAuthSessionProvider from "../lib/googleAuthSessionProvider";

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
							<Header />
								{children}
							<Footer />
						</CheckAuthUser>
					</RedProv>
				</GoogleAuthSessionProvider>
			</body>
		</html>
	);
}