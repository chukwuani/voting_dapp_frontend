"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ViewPassword from "@/components/view-password";

import { toast } from "sonner";
import axios from "axios";

const ResetPasswordForm = ({ resetToken }: { resetToken: string }) => {
	const [password, setPassword] = useState("");
	const [passwordConfirm, setPasswordConfirm] = useState("");

	const [showPassword, setShowPassword] = useState(false);
	const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

	const router = useRouter();

	const [isLoading, startTransition] = useTransition();

	const handleResetPassword = () => {
		if (!resetToken) {
			return toast.error("Request Failed", {
				description: "An error occurred! Please try again",
			});
		}

		startTransition(async () => {
			try {
				const result = await axios({
					method: "patch",
					url: `${process.env.NEXT_PUBLIC_BACKEND_API}/auth/reset-password`,
					data: {
						resetToken,
						password,
					},
					withCredentials: true,
				});

				toast.success("Password Reset", {
					description:
						"Your password reset was successful! Please log in with your new credentials.",
				});

				router.push("/login");
			} catch (error: any) {
				toast.error("Request Failed", {
					description: "We're sorry, but there was an error resetting your password.",
				});
			}
		});
	};

	return (
		<>
			<div className="grid gap-2">
				<Label htmlFor="password">New password</Label>

				<section className="flex items-center relative">
					<Input
						className="pr-8"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
						id="password"
						type={showPassword ? "text" : "password"}
						required
					/>

					<ViewPassword
						showPassword={showPassword}
						setShowPassword={setShowPassword}
					/>
				</section>
			</div>

			<div className="grid gap-2">
				<Label htmlFor="password">Confirm password</Label>

				<section className="flex items-center relative">
					<Input
						className="pr-8"
						value={passwordConfirm}
						onChange={(e) => setPasswordConfirm(e.target.value)}
						id="password"
						type={showPasswordConfirm ? "text" : "password"}
						required
					/>

					<ViewPassword
						showPassword={showPasswordConfirm}
						setShowPassword={setShowPasswordConfirm}
					/>
				</section>
			</div>

			<Button
				disabled={isLoading}
				onClick={handleResetPassword}
				type="submit"
				className="w-full">
				Reset Password
			</Button>
		</>
	);
};
export default ResetPasswordForm;
