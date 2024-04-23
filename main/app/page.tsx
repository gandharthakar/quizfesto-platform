import Link from "next/link";

export default function Home() {
	return (
		<>
			<section className="flex justify-center items-center min-h-screen relative overflow-hidden px-[20px] py-[50px]">
				<div className="w-[800px] h-[800px] absolute left-[10%] top-[-20%] bg-theme-color-1 blur-[70px] opacity-[0.1] z-[1] rounded-full"></div>
				<div className="w-[400px] h-[400px] absolute right-[10%] bottom-0 bg-theme-color-2 blur-[70px] opacity-[0.2] z-[1] rounded-full hidden md:block"></div>

				<div className="max-w-[1000px] w-full z-[3]">
					<div className="text-center pb-[20px] md:pb-[20px]">
						<h1 className="font-noto_sans text-zinc-900 font-bold text-[28px] md:text-[48px] leading-[38px] md:leading-[58px]">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem, dicta.
						</h1>
					</div>
					<div className="text-center pb-[20px] md:pb-[20px] max-w-[600px] mx-auto">
						<h2 className="font-ubuntu text-zinc-500 font-normal text-[16px] md:text-[18px]">
							Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde, dicta recusandae? Doloribus magni illum velit omnis accusamus
						</h2>
					</div>
					<div className="text-center">
						<Link href="#" title="Sign Up Today" className="transition-all delay-100 inline-block bg-theme-color-1 text-white hover:bg-theme-color-1-hover-dark font-medium text-[16px] md:text-[18px] py-[13px] md:py-[15px] px-[25px] md:px-[35px] rounded-full">
							Sign Up Today
						</Link>
					</div>
				</div>
			</section>
		</>
	);
}