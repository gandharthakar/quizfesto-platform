import Link from "next/link";
import { dump_cats_homepage } from "./constant/datafaker";
import { CiUser } from "react-icons/ci";
import { BsCompass } from "react-icons/bs";
import { MdOutlineSportsScore } from "react-icons/md";
import Image from "next/image";
import HomeTestimonialsSection from "./components/homeTestimonialsSection";

export default function Home() {
	return (
		<>
			<section className="flex justify-center items-center min-h-screen relative overflow-hidden px-[20px] py-[100px] bg-white dark:bg-zinc-950">
				<div className="w-[800px] h-[800px] absolute left-[10%] top-[-20%] bg-theme-color-1 blur-[70px] opacity-[0.1] dark:opacity-[0.2] z-[1] rounded-full"></div>
				<div className="w-[400px] h-[400px] absolute right-[10%] bottom-0 bg-theme-color-2 blur-[70px] opacity-[0.2] z-[1] rounded-full hidden md:block"></div>

				<div className="max-w-[1000px] w-full z-[3]">
					<div className="text-center pb-[20px] md:pb-[20px]">
						<h1 className="font-noto_sans text-zinc-900 font-bold text-[28px] md:text-[48px] leading-[38px] md:leading-[58px] dark:text-zinc-200">
							Register & participate in various quizzes and win exciting prizes with QuizFesto.
						</h1>
					</div>
					<div className="text-center pb-[20px] md:pb-[20px] max-w-[600px] mx-auto">
						<h2 className="font-ubuntu text-zinc-500 font-normal text-[16px] md:text-[18px] dark:text-zinc-400">
							QuizeFesto is the online platform where you can participate on many quizzes created by our team and win excited prizes.
						</h2>
					</div>
					<div className="text-center">
						<Link href="#" title="Sign Up Today" className="transition-all delay-100 inline-block bg-theme-color-1 text-white hover:bg-theme-color-1-hover-dark font-medium text-[16px] md:text-[18px] py-[13px] md:py-[15px] px-[25px] md:px-[35px] rounded-full">
							Sign Up Today
						</Link>
					</div>
				</div>
			</section>

			<section className="transition-all delay-75 bg-white px-[15px] py-[50px] md:py-[100px] dark:bg-zinc-950">
				<div className="site-container">
					<div className="pb-[25px] md:pb-[35px]">
						<h2 className="transition-all delay-75 font-noto_sans text-[25px] md:text-[30px] text-zinc-800 font-semibold dark:text-zinc-200">
							Top Categories
						</h2>
					</div>

					<div className="relative block">
						<ul className="flex flex-wrap gap-x-[10px] gap-y-[10px] md:gap-x-[20px] md:gap-y-[15px]">
							{
								dump_cats_homepage.map((item) => (
									<li key={item.id}>
										<Link 
											href={item.slug} 
											title={item.name} 
											className="inline-block transition-all delay-75 font-ubuntu text-[16px] md:text-[20px] bg-zinc-100 border-[2px] border-solid border-zinc-600 px-[25px] py-[10px] md:py-[10px] rounded-full hover:bg-white hover:border-theme-color-2 hover:text-theme-color-2 dark:hover:text-theme-color-2 dark:bg-zinc-800 hover:dark:bg-zinc-950 dark:text-zinc-300"
										>
											{item.name}
										</Link>
									</li>
								))
							}
						</ul>
					</div>
				</div>
			</section>

			<section className="transition-all delay-75 bg-zinc-200 px-[15px] py-[50px] md:py-[100px] dark:bg-zinc-900">
				<div className="site-container">
					<div className="pb-[25px] md:pb-[50px]">
						<div className="pb-[10px] text-center">
							<h3 className="transition-all delay-75 font-noto_sans text-[25px] md:text-[30px] text-zinc-800 font-semibold dark:text-zinc-200">
								How It Works
							</h3>
						</div>
						<div className="max-w-[500px] mx-auto text-center">
							<p className="transition-all delay-75 font-noto_sans text-[16px] md:text-[18px] text-zinc-800 font-normal dark:text-zinc-300">
								Below is the 3-step small guide where you can read and participate in many quizzes.
							</p>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 cmq-1:grid-cols-3 gap-y-[15px] gap-x-[20px]">
						<div className="transition-all delay-75 border-[2px] py-[25px] px-[15px] md:px-[25px] border-solid hover:bg-white hover:border-theme-color-1 dark:bg-zinc-900 dark:border-zinc-900 dark:hover:border-theme-color-1 dark:hover:bg-zinc-950">
							<div className="pb-[20px]">
								<CiUser size={50} className="transition-all delay-75 text-theme-color-1 dark:text-zinc-200" />
							</div>
							<div className="pb-[5px]">
								<h5 className="transition-all delay-75 font-noto_sans text-[18px] md:text-[22px] text-zinc-800 font-bold dark:text-zinc-200">
									Register Yourself
								</h5>
							</div>
							<div>
								<p className="transition-all delay-75 font-noto_sans text-[16px] md:text-[18px] text-zinc-800 dark:text-zinc-400">
									First of all you must register yourself and then login using your username & password.
								</p>
							</div>
						</div>
						<div className="transition-all delay-75 border-[2px] py-[25px] px-[15px] md:px-[25px] border-solid hover:bg-white hover:border-theme-color-1 dark:bg-zinc-900 dark:border-zinc-900 dark:hover:border-theme-color-1 dark:hover:bg-zinc-950">
							<div className="pb-[20px]">
								<BsCompass size={50} className="transition-all delay-75 text-theme-color-1 dark:text-zinc-200" />
							</div>
							<div className="pb-[5px]">
								<h5 className="transition-all delay-75 font-noto_sans text-[18px] md:text-[22px] text-zinc-800 font-bold dark:text-zinc-200">
									Explore Quizzes
								</h5>
							</div>
							<div>
								<p className="transition-all delay-75 font-noto_sans text-[16px] md:text-[18px] text-zinc-800 dark:text-zinc-400">
									You can find or explore quizzes by navigating yourself from top menu item called "All Quizzes".
								</p>
							</div>
						</div>
						<div className="transition-all delay-75 border-[2px] py-[25px] px-[15px] md:px-[25px] border-solid hover:bg-white hover:border-theme-color-1 dark:bg-zinc-900 dark:border-zinc-900 dark:hover:border-theme-color-1 dark:hover:bg-zinc-950">
							<div className="pb-[20px]">
								<MdOutlineSportsScore size={50} className="transition-all delay-75 text-theme-color-1 dark:text-zinc-200" />
							</div>
							<div className="pb-[5px]">
								<h5 className="transition-all delay-75 font-noto_sans text-[18px] md:text-[22px] text-zinc-800 font-bold dark:text-zinc-200">
									Score More
								</h5>
							</div>
							<div>
								<p className="transition-all delay-75 font-noto_sans text-[16px] md:text-[18px] text-zinc-800 dark:text-zinc-400">
									By Participating many quizzes you can achieve more scores to win excited prizes.
								</p>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="transition-all delay-75 bg-white px-[15px] py-[50px] md:py-[100px] dark:bg-zinc-950">
				<div className="site-container">
					<div className="pb-[25px] md:pb-[50px]">
						<div className="pb-[10px] text-center">
							<h3 className="transition-all delay-75 font-noto_sans text-[25px] md:text-[30px] text-zinc-800 font-semibold dark:text-zinc-200">
								Win Exciting Prizes
							</h3>
						</div>
						<div className="max-w-[500px] mx-auto text-center">
							<p className="transition-all delay-75 font-noto_sans text-[16px] md:text-[18px] text-zinc-800 font-normal dark:text-zinc-300">
								Every month we declare 3 winners for 1st, 2nd and 3rd prizes. Winners will get their respective prizes.
							</p>
						</div>
					</div>

					<div className="flex flex-col gap-y-[20px]">
						<div className="transition-all delay-75 relative w-full border-[2px] border-solid bg-zinc-100 flex flex-col items-start md:items-center md:flex-row gap-y-[15px] gap-x-[30px] dark:bg-zinc-900 hover:border-theme-color-2 dark:border-zinc-700 dark:hover:border-theme-color-2">
							{/* Prize Logo */}
							<Image src="/images/winner-prizes/logos/prize-logo-1.png" width={150} height={138} className="w-[150px] h-[138px] absolute right-0 top-[50%] translate-y-[-50%] z-[2] hidden md:block opacity-[0.8] md:opacity-[1]" alt="prize" />
							
							{/* Price Image */}
							<Image src="/images/winner-prizes/winprz-1.jpg" width={250} height={179} className="w-full max-w-none md:max-w-[250px] h-auto relative z-[5]" alt="prize" />
							<div className="pr-[15px] pl-[15px] md:pl-0 md:pr-[180px] pb-[15px] md:pb-[0px]">
								<div className="pb-[0px]">
									<h6 className="transition-all delay-75 font-ubuntu text-[20px] md:text-[25px] text-zinc-800 dark:text-zinc-200">
										<b>1<sup>st</sup></b> : Winner Prize
									</h6>
								</div>
								<div>
									<p className="transition-all delay-75 font-noto_sans text-[16px] md:text-[18px] dark:text-zinc-400">
										Score 10000 and 1<sup>st</sup> winner will get exclusive headphones from the brand called boat.
									</p>
								</div>
							</div>
						</div>
						<div className="transition-all delay-75 relative w-full border-[2px] border-solid bg-zinc-100 flex flex-col items-start md:items-center md:flex-row gap-y-[15px] gap-x-[30px] dark:bg-zinc-900 hover:border-theme-color-2 dark:border-zinc-700 dark:hover:border-theme-color-2">
							{/* Prize Logo */}
							<Image src="/images/winner-prizes/logos/prize-logo-2.png" width={150} height={138} className="w-[150px] h-[138px] absolute right-0 top-[50%] translate-y-[-50%] z-[2] hidden md:block opacity-[0.8] md:opacity-[1]" alt="prize" />
							
							{/* Price Image */}
							<Image src="/images/winner-prizes/winprz-2.jpg" width={250} height={179} className="w-full max-w-none md:max-w-[250px] h-auto relative z-[5]" alt="prize" />
							<div className="pr-[15px] pl-[15px] md:pl-0 md:pr-[180px] pb-[15px] md:pb-[0px]">
								<div className="pb-[0px]">
									<h6 className="transition-all delay-75 font-ubuntu text-[20px] md:text-[25px] text-zinc-800 dark:text-zinc-200">
										<b>2<sup>nd</sup></b> : Winner Prize
									</h6>
								</div>
								<div>
									<p className="transition-all delay-75 font-noto_sans text-[16px] md:text-[18px] dark:text-zinc-400">
										Score 8000 and 2<sup>nd</sup> winner will get shopping voucher issued by amazon company.
									</p>
								</div>
							</div>
						</div>
						<div className="transition-all delay-75 relative w-full border-[2px] border-solid bg-zinc-100 flex flex-col items-start md:items-center md:flex-row gap-y-[15px] gap-x-[30px] dark:bg-zinc-900 hover:border-theme-color-2 dark:border-zinc-700 dark:hover:border-theme-color-2">
							{/* Prize Logo */}
							<Image src="/images/winner-prizes/logos/prize-logo-3.png" width={150} height={138} className="w-[150px] h-[138px] absolute right-0 top-[50%] translate-y-[-50%] z-[2] hidden md:block opacity-[0.8] md:opacity-[1]" alt="prize" />
							
							{/* Price Image */}
							<Image src="/images/winner-prizes/winprz-3.jpg" width={250} height={179} className="w-full max-w-none md:max-w-[250px] h-auto relative z-[5]" alt="prize" />
							<div className="pr-[15px] pl-[15px] md:pl-0 md:pr-[180px] pb-[15px] md:pb-[0px]">
								<div className="pb-[0px]">
									<h6 className="transition-all delay-75 font-ubuntu text-[20px] md:text-[25px] text-zinc-800 dark:text-zinc-200">
										<b>3<sup>rd</sup></b> : Winner Prize
									</h6>
								</div>
								<div>
									<p className="transition-all delay-75 font-noto_sans text-[16px] md:text-[18px] dark:text-zinc-400">
										Score 6000 and 3<sup>rd</sup> winner will get paytm cashback upto rupees 500.
									</p>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className="transition-all delay-75 bg-zinc-100 px-[15px] py-[50px] md:py-[100px] dark:bg-zinc-800">
				<div className="site-container">
					<HomeTestimonialsSection />
				</div>
			</section>
		</>
	);
}