import { Metadata } from "next";
import { redirect } from "next/navigation";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import DeleteAccountForm from "@/components/delete-account";
import ManagePasswordForm from "@/components/manage-password";
import AccountDetails from "@/components/account-details";
import UploadPhoto from "@/components/upload-photo";
import LogoutBtn from "@/components/logout-btn";

import { getCurrentUser } from "@/lib/getCurrentUser";

export const metadata: Metadata = {
	title: "Settings",
	description: "Generated by create next app",
};

const DashboardPage = async () => {
	const user = await getCurrentUser();

	if (!user) {
		redirect("/login");
	}

	const { firstname, lastname, email, _id } = user;

	return (
		<section className="max-w-[600px] px-[6vw] py-[6vw] sm:px-0 m-auto flex flex-col gap-3">
			<Card>
				<CardHeader className="relative">
					<CardTitle>Account</CardTitle>
					<CardDescription>Manage your account information</CardDescription>

					<LogoutBtn />
				</CardHeader>

				<CardContent>
					<div className="grid gap-6">
						<UploadPhoto user={user} />

						<AccountDetails
							firstname={firstname}
							lastname={lastname}
							email={email}
						/>
					</div>
				</CardContent>
			</Card>

			<Card>
				<CardHeader>
					<CardTitle>Security</CardTitle>
					<CardDescription>Manage your security preferences</CardDescription>
				</CardHeader>

				<CardContent className="mt-5">
					<section className="flex max-sm:flex-wrap items-center justify-between gap-3">
						<section className="grid gap-2">
							<h2 className="text-primary text-lg font-semibold leading-none tracking-tight">
								Password
							</h2>
							<p className="text-sm text-muted-foreground">
								Change the password associated with your account.
							</p>
						</section>

						<ManagePasswordForm />
					</section>

					<section className="flex max-sm:flex-wrap items-center justify-between gap-3 mt-7">
						<section className="grid gap-2">
							<h2 className="text-primary text-lg font-semibold leading-none tracking-tight">
								Delete Account
							</h2>
							<p className="text-sm text-muted-foreground">
								Delete your account and all it&apos;s associated data.
							</p>
						</section>

						<DeleteAccountForm />
					</section>
				</CardContent>
			</Card>
		</section>
	);
};

export default DashboardPage;
