import type { Metadata } from "next";
import "../globals.css";
import RedProv from "../redux-service/reduxProvider";

export const metadata: Metadata = {
	title: "QuizFesto - Quiz Playground.",
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
					{children}
				</RedProv>
			</body>
		</html>
	);
}