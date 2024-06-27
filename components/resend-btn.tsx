"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";

import { toast } from "sonner";
import axios from "axios";

import { Button } from "./ui/button";

const ResendBtn = ({ email }: { email: string }) => {
	const router = useRouter();
	const [isLoading, startTransition] = useTransition();

	const handleResendEmail = () => {
		if (!email) {
			return toast.error("Request Failed", {
				description: "An error occurred! Please try again",
			});
		}

		startTransition(async () => {
			try {
				const result = await axios({
					method: "post",
					url: `${process.env.NEXT_PUBLIC_BACKEND_API}/auth/resend-verification`,
					data: {
						email,
					},
					withCredentials: true,
				});

				toast.success("Check your email", {
					description: "Check your email. We sent you a 6-digit verification code.",
				});
			} catch (error: any) {
				if (error?.response?.data?.message === "login") {
					toast.error("Account already exist", {
						description: "Account already exist! Login to gain access.",
					});

					router.push("/login");
				}

				toast.error("Request failed", {
					description: error?.response?.data?.message ?? error.message,
				});
			}
		});
	};

	return (
		<Button
			disabled={isLoading}
			onClick={handleResendEmail}
			className="p-0"
			variant="link">
			Resend
		</Button>
	);
};
export default ResendBtn;
