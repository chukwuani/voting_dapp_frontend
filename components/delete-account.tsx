"use client";

import { useTransition } from "react";
import { useRouter } from "next/navigation";

import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "./ui/dialog";
import { Button } from "./ui/button";
import { Label } from "./ui/label";
import { Input } from "./ui/input";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { deletionSchema } from "@/lib/validation";
import { z } from "zod";
import { toast } from "sonner";
import axios from "axios";

type Input = z.infer<typeof deletionSchema>;

const DeleteAccountForm = () => {
	const router = useRouter();

	const { register, handleSubmit, watch, reset } = useForm<Input>({
		resolver: zodResolver(deletionSchema),
		mode: "onChange",
		reValidateMode: "onChange",
		defaultValues: {
			confirmation: "",
		},
	});

	const [isLoading, startTransition] = useTransition();

	const handleDelete = (form: Input) => {
		startTransition(async () => {
			try {
				await axios({
					method: "DELETE",
					url: `${process.env.NEXT_PUBLIC_ABSOLUTE_URL}/user/delete-account`,
					withCredentials: true,
				});

				toast.success("Account Deleted", {
					description: "Your account has been successfully deleted. Goodbye!",
				});

				router.push("/signup");
			} catch (error: any) {
				toast.error("Deletion Failed", {
					description: "There was an error deleting your account. Please try again.",
				});
			}
		});
	};

	const confirmationValue = watch("confirmation", "");

	return (
		<Dialog onOpenChange={() => reset({ confirmation: "" })}>
			<DialogTrigger asChild>
				<Button
					className="text-xs"
					variant="destructive">
					DELETE ACCOUNT
				</Button>
			</DialogTrigger>

			<DialogContent className="max-w-[300px] rounded-lg sm:max-w-[425px]">
				<DialogHeader>
					<DialogTitle>Delete account</DialogTitle>
					<DialogDescription>
						Are you sure you want to delete your account? This action is permanent and irreversible.
					</DialogDescription>

					<DialogDescription>
						Type <b>Delete account</b> below to continue.
					</DialogDescription>
				</DialogHeader>

				<form onSubmit={handleSubmit(handleDelete)}>
					<div className="grid gap-4 py-4">
						<div className="grid gap-3">
							<Label htmlFor="confirmation">Confirmation</Label>
							<Input
								{...register("confirmation")}
								id="confirmation"
								type="text"
								placeholder="Delete account"
								required
								autoComplete="off"
							/>
						</div>
					</div>

					<DialogFooter>
						<DialogClose asChild>
							<Button
								disabled={isLoading}
								type="button"
								variant="ghost">
								Cancel
							</Button>
						</DialogClose>

						<Button
							disabled={confirmationValue !== "Delete account" || isLoading}
							className="text-xs"
							variant="destructive"
							type="submit">
							DELETE ACCOUNT
						</Button>
					</DialogFooter>
				</form>
			</DialogContent>
		</Dialog>
	);
};
export default DeleteAccountForm;
