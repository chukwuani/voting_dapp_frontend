import { Metadata } from "next";

import ConnectWallet from "@/components/connect-wallet";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import VoteForm from "@/components/vote-form";

export const metadata: Metadata = {
	title: "Home",
	description: "Generated by create next app",
};

const DashboardPage = () => {
	return (
		<>
			<header className="w-full pt-3 px-3 flex items-center justify-end">
				<ConnectWallet />
			</header>

			<section className="max-w-[600px] px-[6vw] py-[6vw] sm:px-0 m-auto flex flex-col gap-3">
				<Card>
					<CardHeader>
						<CardTitle>DefiBoysDAO: Empower Your Voice</CardTitle>
						<CardDescription>
							Secure, transparent blockchain voting for your DAO. Cast votes, track proposals, and
							shape your community&apos;s future with ease.
						</CardDescription>
					</CardHeader>

					<VoteForm />
				</Card>
			</section>
		</>
	);
};

export default DashboardPage;
