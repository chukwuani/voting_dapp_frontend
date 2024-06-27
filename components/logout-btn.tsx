"use client";

import axios from "axios";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { useRouter } from "next/navigation";
import { LogOutIcon } from "lucide-react";
import { toast } from "sonner";

const LogoutBtn = () => {
	const router = useRouter();

	const handleLogout = async () => {
		try {
			await axios({
				method: "GET",
				url: `${process.env.NEXT_PUBLIC_BACKEND_API}/auth/logout`,
				withCredentials: true,
			});

			router.push("/login");
		} catch (error: any) {
			toast.error("Request Failed", {
				description: "There was an error while logging out. Please try again.",
			});
		}
	};

	return (
		<Popover>
			<PopoverTrigger className="w-fit absolute right-6 ">
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg">
					<path
						d="M12 13.5C12.8284 13.5 13.5 12.8284 13.5 12C13.5 11.1716 12.8284 10.5 12 10.5C11.1716 10.5 10.5 11.1716 10.5 12C10.5 12.8284 11.1716 13.5 12 13.5Z"
						fill="black"
					/>
					<path
						d="M6 13.5C6.82843 13.5 7.5 12.8284 7.5 12C7.5 11.1716 6.82843 10.5 6 10.5C5.17157 10.5 4.5 11.1716 4.5 12C4.5 12.8284 5.17157 13.5 6 13.5Z"
						fill="black"
					/>
					<path
						d="M18 13.5C18.8284 13.5 19.5 12.8284 19.5 12C19.5 11.1716 18.8284 10.5 18 10.5C17.1716 10.5 16.5 11.1716 16.5 12C16.5 12.8284 17.1716 13.5 18 13.5Z"
						fill="black"
					/>
				</svg>
			</PopoverTrigger>

			<PopoverContent className="rounded-[100px] text-sm text-destructive w-auto py-2">
				<button
					className="flex items-center justify-center gap-3"
					onClick={() => void handleLogout()}>
					<LogOutIcon className="size-4" />
					Log out
				</button>
			</PopoverContent>
		</Popover>
	);
};
export default LogoutBtn;
