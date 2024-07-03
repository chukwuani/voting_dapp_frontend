export type User = {
	id: string;
	firstname: string;
	lastname: string;
	email: string;
	role: string;
	isEmailVerified: boolean;
	createdAt: Date;
	imageUrl: string;
};

export type searchParams = {
	searchParams: { [key: string]: string | string[] | undefined };
};
