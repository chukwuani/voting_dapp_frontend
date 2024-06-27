"use client";

import { useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import axios from "axios";
import { toast } from "sonner";

const ForgotPasswordForm = () => {
	const [email, setEmail] = useState("");

	const [isLoading, startTransition] = useTransition();

	const handleForgotPassword = () => {
		startTransition(async () => {
			try {
				const result = await axios({
					method: "post",
					url: `${process.env.NEXT_PUBLIC_BACKEND_API}/auth/forgot-password`,
					data: {
						email,
					},
				});

				toast.success("Check your email", {
					description: "Good news! We've sent a password reset link",
				});
			} catch (error: any) {
				toast.error("Request Failed", {
					description: "We encountered an issue while trying to send the password reset email",
				});
			}
		});
	};

	return (
		<>
			<div className="grid gap-2">
				<Label htmlFor="email">Email</Label>
				<Input
					value={email}
					onChange={(e) => setEmail(e.target.value)}
					id="email"
					type="email"
					placeholder="m@example.com"
					required
				/>
			</div>

			<Button
				disabled={isLoading}
				onClick={handleForgotPassword}
				type="submit"
				className="w-full">
				Get magic link
			</Button>
		</>
	);
};
export default ForgotPasswordForm;
