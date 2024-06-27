import { User } from "@/types";
import axios from "axios";
import { create } from "zustand";
import { useShallow } from "zustand/react/shallow";

type SelectorFn<TStore, TResult> = (state: TStore) => TResult;

type Session = {
	isFirstMount: boolean;
	loading: boolean;
	user: User | null;
	actions: {
		clearSession: () => void;
		updateUser: (data: User) => void;
		getSession: (isInitialLoad?: boolean) => Promise<void>;
	};
};

const initialState = {
	loading: true,
	user: null,
	isFirstMount: false,
};

export const useInitSession = create<Session>()((set) => ({
	...initialState,

	actions: {
		getSession: async () => {
			const { data } = await axios({
				method: "GET",
				url: `${process.env.NEXT_PUBLIC_BACKEND_API}/auth/me`,
				withCredentials: true,
			});

			set({
				...(data?.user && { user: data.user }),
				loading: false,
			});
		},

		updateUser: (data) => set({ user: data }),

		clearSession: () => {
			set((state) => ({
				...initialState,
				loading: false,
				isFirstMount: state.isFirstMount,
			}));

			const currentPageUrl = window.location.pathname;

			if (currentPageUrl !== "/login" && currentPageUrl !== "/signup") {
				window.location.replace("/login");
			}
		},
	} satisfies Session["actions"],
}));

export const useSession = <TResult>(selector: SelectorFn<Session, TResult>) => {
	const state = useInitSession(useShallow(selector));

	return state;
};
