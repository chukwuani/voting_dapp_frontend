import { User } from "@/types";
import axios from "axios";
import { cookies } from "next/headers";

export const getCurrentUser = async () => {
	try {
		const result = await axios({
			method: "get",
			url: `${process.env.NEXT_PUBLIC_ABSOLUTE_URL}/user/session`,
			withCredentials: true,
			headers: {
				Cookie: cookies().toString(),
			},
		});

		console.log(result);

		const user: User = result.data?.user;

		return user;
	} catch (error) {
		console.log(error);

		return null;
	}
};
