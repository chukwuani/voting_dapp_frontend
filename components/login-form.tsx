"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import ViewPassword from "@/components/view-password";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import axios from "axios";
import { toast } from "sonner";

import { z } from "zod";
import { loginSchema } from "@/lib/validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type Inputs = z.infer<typeof loginSchema>;

const LoginForm = () => {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<Inputs>({
		resolver: zodResolver(loginSchema),
		mode: "onChange",
		reValidateMode: "onChange",
		defaultValues: {
			email: "",
			password: "",
		},
	});

	const [showPassword, setShowPassword] = useState(false);
	const [isLoading, startTransition] = useTransition();

	const handleLogin = (form: Inputs) => {
		startTransition(async () => {
			try {
				const { data } = await axios({
					method: "POST",
					url: `${process.env.NEXT_PUBLIC_BACKEND_API}/auth/login`,
					data: {
						email: form.email,
						password: form.password,
					},
					withCredentials: true,
				});

				toast.success("Welcome Back!", {
					description: "You've successfully logged in. Let's get started!",
				});

				router.push("/settings");
			} catch (error: any) {
				if (error?.response?.data?.message === "verify_email") {
					toast.error("Account already exist", {
						description:
							"Account already exist! But is unverified. Check your email. We sent you a 6-digit verification code.",
					});

					router.push(`/signup/verify-email?email=${form.email}`);
				}

				toast.error("Login Failed!", {
					description: error?.response?.data?.message ?? error.message,
				});
			}
		});
	};

	return (
		<form
			onSubmit={handleSubmit(handleLogin)}
			className="grid gap-4">
			<div className="grid gap-2">
				<Label htmlFor="email">Email</Label>
				<Input
					{...register("email", { required: true })}
					id="email"
					type="email"
					placeholder="m@example.com"
					required
				/>
			</div>

			<div className="grid gap-2">
				<div className="flex items-center">
					<Label htmlFor="password">Password</Label>
					<Link
						href="/forgot-password"
						className="ml-auto inline-block text-sm underline">
						Forgot your password?
					</Link>
				</div>

				<section className="flex items-center relative">
					<Input
						{...register("password", { required: true })}
						className="pr-8"
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

			<Button
				disabled={isLoading}
				type="submit"
				className="w-full">
				Login
			</Button>
		</form>
	);
};
export default LoginForm;
