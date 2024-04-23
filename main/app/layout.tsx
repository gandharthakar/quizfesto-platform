import type { Metadata } from "next";
import "./globals.css";
import Header from './components/header';

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
		<html lang="en">
			<body className="">
				<Header />
				{children}
			</body>
		</html>
	);
}