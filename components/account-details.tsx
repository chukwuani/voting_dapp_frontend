"use client";

import { useEffect, useTransition } from "react";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { profileSchema } from "@/lib/validation";
import axios from "axios";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface Props {
	firstname: string;
	lastname: string;
	email: string;
}

type Inputs = z.infer<typeof profileSchema>;

const AccountDetails = ({ firstname, lastname, email }: Props) => {
	const router = useRouter();

	const {
		register,
		handleSubmit,
		formState: { isDirty },
		reset,
	} = useForm<Inputs>({
		resolver: zodResolver(profileSchema),
		mode: "onChange",
		reValidateMode: "onChange",
		defaultValues: {
			firstname,
			lastname,
		},
	});

	const [isLoading, startTransition] = useTransition();

	const handleUpdate = (form: Inputs) => {
		startTransition(async () => {
			try {
				const { data } = await axios({
					method: "PATCH",
					url: `${process.env.NEXT_PUBLIC_BACKEND_API}/user/update-profile`,
					data: {
						firstname: form.firstname,
						lastname: form.lastname,
					},
					withCredentials: true,
				});

				router.refresh();

				toast.success("Profile Updated", {
					description: "Your profile details have been successfully updated.",
				});
			} catch (error: any) {
				toast.error("Update Failed", {
					description: "There was an error updating your profile. Please try again.",
				});
			}
		});
	};

	useEffect(() => {
		reset({
			firstname,
			lastname,
		});
	}, [firstname, lastname, reset]);

	return (
		<form
			onSubmit={handleSubmit(handleUpdate)}
			className="grid gap-6">
			<div className="grid gap-3">
				<Label htmlFor="firstname">First Name</Label>
				<Input
					id="firstname"
					type="text"
					className="w-full"
					{...register("firstname")}
					defaultValue={firstname}
				/>
			</div>

			<div className="grid gap-3">
				<Label htmlFor="lastname">Last Name</Label>
				<Input
					id="lastname"
					type="text"
					className="w-full"
					{...register("lastname")}
					defaultValue={lastname}
				/>
			</div>

			<div className="grid gap-3">
				<p className="text-card-foreground text-sm font-medium leading-none tracking-tight">
					Email Address
				</p>

				<section className="flex max-sm:flex-wrap items-center gap-3">
					<p className="text-sm text-muted-foreground">{email}</p>

					<Badge>Verified</Badge>
				</section>
			</div>

			<section className="flex gap-3 justify-end mt-2">
				<Button
					type="button"
					onClick={() => reset({ firstname, lastname })}
					disabled={!isDirty || isLoading}
					variant="ghost">
					Cancel
				</Button>

				<Button
					type="submit"
					disabled={!isDirty || isLoading}>
					Confirm
				</Button>
			</section>
		</form>
	);
};
export default AccountDetails;
