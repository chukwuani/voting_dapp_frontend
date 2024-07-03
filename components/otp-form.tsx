"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";

import axios from "axios";
import { toast } from "sonner";

import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";

const OtpForm = ({ email }: { email: string }) => {
	const router = useRouter();

	const [code, setCode] = useState("");
	const [isLoading, startTransition] = useTransition();

	const handleVerifyEmail = () => {
		if (!email || !code) {
			return toast.error("Request Failed", {
				description: "An error occurred! Please try again",
			});
		}

		startTransition(async () => {
			try {
				const { data } = await axios({
					method: "post",
					url: `${process.env.NEXT_PUBLIC_ABSOLUTE_URL}/auth/verify-email`,
					data: {
						email,
						otp_code: code,
					},
					withCredentials: true,
				});

				console.log(data);

				toast.success("Verification success", {
					description: "Your account has been verified. Welcome",
				});

				router.push("/settings");
			} catch (error: any) {
				if (error?.response?.data?.message === "login") {
					toast.error("Account already exist", {
						description: "Account already exist! Login to gain access.",
					});

					router.push("/login");
				}

				toast.error("Verification failed", {
					description: error?.response?.data?.message ?? error.message,
				});
			}
		});
	};

	return (
		<>
			<InputOTP
				value={code}
				onChange={(val) => setCode(val)}
				maxLength={6}>
				<InputOTPGroup>
					<InputOTPSlot index={0} />
					<InputOTPSlot index={1} />
				</InputOTPGroup>

				<InputOTPSeparator />

				<InputOTPGroup>
					<InputOTPSlot index={2} />
					<InputOTPSlot index={3} />
				</InputOTPGroup>

				<InputOTPSeparator />

				<InputOTPGroup>
					<InputOTPSlot index={4} />
					<InputOTPSlot index={5} />
				</InputOTPGroup>
			</InputOTP>

			<Button
				disabled={isLoading}
				onClick={handleVerifyEmail}
				className="w-full mt-4"
				type="submit">
				Confirm
			</Button>
		</>
	);
};
export default OtpForm;
