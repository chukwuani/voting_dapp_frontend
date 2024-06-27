"use client";

import { useRouter } from "next/navigation";
import { Button } from "./ui/button";

const BackBtn = () => {
	const router = useRouter();

	return (
		<Button
			onClick={router.back}
			variant="ghost"
			type="submit"
			className="w-full">
			Go Back
		</Button>
	);
};
export default BackBtn;
