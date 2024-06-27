import { Metadata } from "next";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

import ResetPasswordForm from "@/components/reset-form";
import { searchParams } from "@/types";

export const metadata: Metadata = {
	title: "Password Reset",
	description: "Generated by create next app",
};

const ResetPassword = ({ searchParams }: searchParams) => {
	const resetToken = searchParams.token;

	return (
		<section className="h-screen flex items-center justify-center">
			<Card className="mx-auto max-w-sm z-10">
				<CardHeader>
					<CardTitle className="text-2xl">Password Reset</CardTitle>
					<CardDescription>
						Enter a new secure password to reset the old one and get back into your account
					</CardDescription>
				</CardHeader>

				<CardContent>
					<div className="grid gap-4">
						<ResetPasswordForm resetToken={`${resetToken}`} />
					</div>
				</CardContent>
			</Card>
		</section>
	);
};
export default ResetPassword;
