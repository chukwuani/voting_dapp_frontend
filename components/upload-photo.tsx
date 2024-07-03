"use client";

import { Dispatch, SetStateAction, useEffect, useState, useTransition } from "react";

import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { FileUploader } from "./file-uploader";
import { Button } from "./ui/button";

import axios from "axios";
import { toast } from "sonner";

import { User } from "@/types";

interface FileWithPreview extends File {
	preview: string;
}

const UploadPhoto = ({ user }: { user: User }) => {
	const [preview, setPreview] = useState<FileWithPreview>();
	const firstname = user.firstname;
	const lastname = user.lastname;

	return (
		<div className="flex items-center gap-4">
			<Avatar className="size-[50px]">
				<AvatarImage
					className="object-cover"
					src={preview?.preview ?? user.imageUrl ?? "/placeholder.png"}
					alt="Avatar"
				/>
				<AvatarFallback>
					{firstname[0]}
					{lastname[0]}
				</AvatarFallback>
			</Avatar>

			<div className="grid gap-1">
				<p className="text-sm font-medium leading-none">Profile photo</p>

				<DialogUploader setPreview={setPreview} />
			</div>
		</div>
	);
};

function DialogUploader({
	setPreview,
}: {
	setPreview: Dispatch<SetStateAction<FileWithPreview | undefined>>;
}) {
	const [files, setFiles] = useState<File[]>([]);
	const [isLoading, startTransition] = useTransition();

	const uploadFiles = () => {
		const form = new FormData();
		form.append("photo", files[0]);

		console.log(files);

		const previewFiles = files.map((file) =>
			Object.assign(file, {
				preview: URL.createObjectURL(file),
			})
		);

		startTransition(async () => {
			try {
				const result = await axios.post(
					`${process.env.NEXT_PUBLIC_ABSOLUTE_URL}/user/profile-photo`,
					form,
					{ withCredentials: true }
				);

				if (result) {
					toast.success("Upload Successful", {
						description: "Your profile photo has been uploaded successfully.",
					});

					setPreview(previewFiles[0]);

					setFiles([]);
				}
			} catch (error) {
				console.log(error);

				toast.error("Upload Failed", {
					description: "An error occurred during the upload process. Please try again.",
				});
			}
		});
	};

	return (
		<Dialog>
			<DialogTrigger asChild>
				<button className="text-sm text-muted-foreground">Upload photo</button>
			</DialogTrigger>

			<DialogContent className="sm:max-w-xl max-w-[330px] rounded-lg">
				<DialogHeader>
					<DialogTitle>Upload photo</DialogTitle>
					<DialogDescription>Drag and drop your file here or click to browse.</DialogDescription>
				</DialogHeader>

				<FileUploader
					maxSize={8 * 1024 * 1024}
					onValueChange={setFiles}
				/>

				<section className="flex gap-3 justify-end mt-2">
					<Button
						onClick={uploadFiles}
						disabled={isLoading || files.length <= 0}>
						Confirm
					</Button>
				</section>
			</DialogContent>
		</Dialog>
	);
}

export default UploadPhoto;
