import Link from "next/link";

export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-center">
			<div className="flex flex-wrap items-center justify-center gap-3 text-center lg:w-full lg:max-w-5xl lg:text-left">
				<Link
					href="/login"
					className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 max-w-[250px]">
					<h2 className="mb-3 text-2xl font-semibold">
						Login{" "}
						<span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
							-&gt;
						</span>
					</h2>

					<p className="m-0 max-w-[30ch] text-sm opacity-50">
						Find in-depth information about Next.js features and API.
					</p>
				</Link>

				<Link
					href="/signup"
					className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 max-w-[250px]">
					<h2 className="mb-3 text-2xl font-semibold">
						Signup{" "}
						<span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
							-&gt;
						</span>
					</h2>
					<p className="m-0 max-w-[30ch] text-sm opacity-50">
						Learn about Next.js in an interactive course with&nbsp;quizzes!
					</p>
				</Link>

				<Link
					href="/settings"
					className="group rounded-lg border border-transparent px-5 py-4 transition-colors hover:border-gray-300 hover:bg-gray-100 hover:dark:border-neutral-700 hover:dark:bg-neutral-800/30 max-w-[250px]">
					<h2 className="mb-3 text-2xl font-semibold">
						Settings{" "}
						<span className="inline-block transition-transform group-hover:translate-x-1 motion-reduce:transform-none">
							-&gt;
						</span>
					</h2>
					<p className="m-0 max-w-[30ch] text-sm opacity-50">
						Explore starter templates for Next.js.
					</p>
				</Link>
			</div>
		</main>
	);
}
