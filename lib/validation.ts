import * as z from "zod";

export const signupSchema = z.object({
	firstname: z
		.string({
			message: "Please enter a firstname",
		})
		.min(1),
	lastname: z
		.string({
			message: "Please enter a lastname",
		})
		.min(1),
	email: z.string().email({
		message: "Please enter a valid email address",
	}),
	password: z
		.string()
		.min(8, {
			message: "Password must be at least 8 characters long",
		})
		.max(100, {
			message: "Password must be at most 100 characters long",
		}),
});

export const loginSchema = z.object({
	email: z.string().email({
		message: "Please enter a valid email address",
	}),
	password: z
		.string()
		.min(8, {
			message: "Password must be at least 8 characters long",
		})
		.max(100, {
			message: "Password must be at most 100 characters long",
		}),
});

export const profileSchema = z.object({
	firstname: z
		.string({
			message: "Please enter a firstname",
		})
		.min(1),
	lastname: z
		.string({
			message: "Please enter a lastname",
		})
		.min(1),
});

export const deletionSchema = z.object({
	confirmation: z.string().refine((value) => value === "Delete account", {
		message: "The input must be exactly 'Delete account'",
	}),
});

export const updatePasswordSchema = z
	.object({
		oldPassword: z.string().min(8, "Password must be at least 8 characters long").max(100, {
			message: "Password must be at most 100 characters long",
		}),
		newPassword: z.string().min(8, "New password must be at least 8 characters long").max(100, {
			message: "New password must be at most 100 characters long",
		}),
		confirmPassword: z
			.string()
			.min(8, "Confirm password must be at least 8 characters long")
			.max(100, {
				message: "Confirm password must be at most 100 characters long",
			}),
	})
	.refine((data) => data.newPassword === data.confirmPassword, {
		message: "New password and confirm password must match",
		path: ["confirmPassword"],
	});

export const verifyEmailSchema = z.object({
	code: z
		.string()
		.min(6, {
			message: "Verification code must be 6 characters long",
		})
		.max(6),
});

export const checkEmailSchema = z.object({
	email: signupSchema.shape.email,
});

export const resetPasswordSchema = z
	.object({
		password: signupSchema.shape.password,
		confirmPassword: signupSchema.shape.password,
		code: verifyEmailSchema.shape.code,
	})
	.refine((data) => data.password === data.confirmPassword, {
		message: "Passwords do not match",
		path: ["confirmPassword"],
	});
