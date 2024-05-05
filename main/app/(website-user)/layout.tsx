import type { Metadata } from "next";
import "../globals.css";
import RedProv from "../redux-service/reduxProvider";
import UserAreaTopHeader from "../components/userAreaTopHeader";
import UserAreaNavBar from "../components/userAreaNavBar";

export const metadata: Metadata = {
	title: "QuizFesto - User Area",
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
					<div className="flex overflow-hidden">
						<UserAreaNavBar />
						<div className="transition-all delay-75 bg-zinc-100 min-h-screen flex-1 dark:bg-zinc-900">
							<UserAreaTopHeader />
							<div className="px-[15px]">
								{children}
							</div>
						</div>
					</div>
				</RedProv>
			</body>
		</html>
	);
}