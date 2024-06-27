"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import ViewPassword from "@/components/view-password";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import axios from "axios";
import { toast } from "sonner";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { signupSchema } from "@/lib/validation";

type Inputs = z.infer<typeof signupSchema>;

const SignupForm = () => {
	const router = useRouter();

	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, startTransition] = useTransition();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>({
		resolver: zodResolver(signupSchema),
		mode: "onChange",
		reValidateMode: "onChange",
		defaultValues: {
			firstname: "",
			lastname: "",
			email: "",
			password: "",
		},
	});

	const handleSignup = (data: Inputs) => {
		startTransition(async () => {
			try {
				const result = await axios({
					method: "post",
					url: `${process.env.NEXT_PUBLIC_BACKEND_API}/auth/signup`,
					data: {
						firstname: data.firstname,
						lastname: data.lastname,
						email: data.email,
						password: data.password,
					},
					withCredentials: true,
				});

				toast.success("Check your email", {
					description: "Check your email. We sent you a 6-digit verification code.",
				});

				router.push(`/signup/verify-email?email=${data.email}`);
			} catch (error: any) {
				if (error?.response?.data?.message === "login") {
					toast.error("Account already exist", {
						description: "Account already exist! Login to gain access.",
					});

					router.push("/login");
				} else if (error?.response?.data?.message === "verify_email") {
					toast.error("Account already exist", {
						description:
							"Account already exist! But is unverified. Check your email. We sent you a 6-digit verification code.",
					});

					router.push(`/signup/verify-email?email=${data.email}`);
				} else {
					toast.error("Signup Failed!", {
						description: error?.response?.data?.message ?? error.message,
					});
				}
			}
		});
	};

	return (
		<form
			className="grid gap-4"
			onSubmit={handleSubmit(handleSignup)}>
			<div className="grid grid-cols-2 gap-4">
				<div className="grid gap-2">
					<Label htmlFor="first-name">First name</Label>
					<Input
						{...register("firstname", { required: true })}
						type="text"
						id="first-name"
						placeholder="John"
						required
					/>
				</div>

				<div className="grid gap-2">
					<Label htmlFor="last-name">Last name</Label>
					<Input
						{...register("lastname", { required: true })}
						type="text"
						id="last-name"
						placeholder="Doe"
						required
					/>
				</div>
			</div>

			<div className="grid gap-2">
				<Label htmlFor="email">Email</Label>
				<Input
					{...register("email", { required: true })}
					type="email"
					id="email"
					placeholder="m@example.com"
					required
				/>
			</div>

			<div className="grid gap-2">
				<Label htmlFor="password">Password</Label>

				<section className="flex items-center relative">
					<Input
						className="pr-8"
						{...register("password", { required: true })}
						type={showPassword ? "text" : "password"}
						id="password"
						required
					/>

					<ViewPassword
						showPassword={showPassword}
						setShowPassword={setShowPassword}
					/>
				</section>
			</div>

			<Button
				disabled={isLoading}
				type="submit"
				className="w-full">
				Create an account
			</Button>
		</form>
	);
};
export default SignupForm;
