import Image from "next/image";
import React from "react";

interface Props {
	showPassword: boolean;
	setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
}

const ViewPassword = ({ showPassword, setShowPassword }: Props) => {
	return (
		<button
			type="button"
			title={showPassword ? "Hide password" : "Show password"}
			className="absolute right-2"
			onClick={() => {
				setShowPassword(!showPassword);
			}}>
			<p className="uppercase text-muted-foreground text-[11px] font-semibold tracking-wider">
				{showPassword ? "Hide" : "Show"}
			</p>

			{/* <Image
				className=" opacity-50"
				src={showPassword ? "/view.svg" : "/view-off.svg"}
				alt={showPassword ? "Hide password" : "Show password"}
				title={showPassword ? "Hide password" : "Show password"}
				width={20}
				height={20}
			/> */}
		</button>
	);
};

export default ViewPassword;
