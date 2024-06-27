"use client";

import { useState, useTransition } from "react";

import { UseFormRegister, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import axios from "axios";

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import ViewPassword from "@/components/view-password";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

import { updatePasswordSchema } from "@/lib/validation";

type UpdatePassword = {
	id: "oldPassword" | "newPassword" | "confirmPassword";
	label: string;
};

const passwordInputs: UpdatePassword[] = [
	{
		id: "oldPassword",
		label: "Current Password",
	},
	{
		id: "newPassword",
		label: "New Password",
	},
	{
		id: "confirmPassword",
		label: "Confirm Password",
	},
];

interface PasswordInputProps extends UpdatePassword {
	register: UseFormRegister<{ oldPassword: string; newPassword: string; confirmPassword: string }>;
}

type Inputs = z.infer<typeof updatePasswordSchema>;

const ManagePasswordForm = () => {
	const { register, handleSubmit, watch, reset } = useForm<Inputs>({
		resolver: zodResolver(updatePasswordSchema),
		mode: "onChange",
		reValidateMode: "onChange",
		defaultValues: {
			oldPassword: "",
			newPassword: "",
			confirmPassword: "",
		},
	});

	const [isLoading, startTransition] = useTransition();

	const oldPassword = watch("oldPassword", "");
	const newPassword = watch("newPassword", "");
	const confirmPassword = watch("confirmPassword", "");

	const isFormValid =
		oldPassword.length >= 8 &&
		newPassword.length >= 8 &&
		confirmPassword.length >= 8 &&
		newPassword === confirmPassword;

	const handlePasswordUpdate = (form: Inputs) => {
		startTransition(async () => {
			try {
				const { data } = await axios({
					method: "PATCH",
					url: `${process.env.NEXT_PUBLIC_BACKEND_API}/user/change-password`,
					data: {
						oldPassword: form.oldPassword,
						newPassword: form.newPassword,
					},
					withCredentials: true,
				});

				toast.success("Password Changed", {
					description: "Your password has been successfully changed.",
				});

				reset({
					oldPassword: "",
					newPassword: "",
					confirmPassword: "",
				});
			} catch (error: any) {
				toast.error("Update Failed", {
					description: "There was an error changing your password. Please try again.",
				});
			}
		});
	};

	return (
		<Dialog
			onOpenChange={() =>
				reset({
					oldPassword: "",
					newPassword: "",
					confirmPassword: "",
				})
			}>
			<DialogTrigger asChild>
				<Button variant="secondary">Manage password</Button>
			</DialogTrigger>

			<DialogContent className="max-w-[300px] rounded-lg sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Change password</DialogTitle>
					<DialogDescription>
						Make changes to your password here. Click confirm when you&apos;re done.
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleSubmit(handlePasswordUpdate)}>
					<div className="grid gap-4 py-4">
						{passwordInputs.map((item, index) => (
							<PasswordInput
								key={index}
								id={item.id}
								label={item.label}
								register={register}
							/>
						))}
					</div>

					<DialogFooter>
						<DialogClose asChild>
							<Button
								type="button"
								variant="ghost">
								Cancel
							</Button>
						</DialogClose>

						<Button
							disabled={!isFormValid || isLoading}
							type="submit">
							Confirm
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};

const PasswordInput = ({ id, label, register }: PasswordInputProps) => {
	const [showPassword, setShowPassword] = useState(false);

	return (
		<div className="grid gap-4">
			<Label htmlFor={id}>{label}</Label>

			<section className="flex items-center relative">
				<Input
					{...register(id)}
					className="pr-8"
					id={id}
					type={showPassword ? "text" : "password"}
					autoComplete="password"
					required
				/>

				<ViewPassword
					showPassword={showPassword}
					setShowPassword={setShowPassword}
				/>
			</section>
		</div>
	);
};
export default ManagePasswordForm;
