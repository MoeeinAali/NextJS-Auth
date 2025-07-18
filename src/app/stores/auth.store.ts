import {UserSession} from "@/app/_types/auth.types";
import {create} from "zustand/react";

type AuthStatus = "loading" | "authenticated" | "unauthenticated";

interface SessionState {
    status: AuthStatus;
    session: UserSession | null;
    clearSession: () => void;
    updateSession: () => void;
}

const fetchSessionFromAPI = async () => {
    try {
        const response = await fetch("/api/auth/session");
        if (response.ok) {
            const data: UserSession = await response.json();
            if (data) {
                return {session: data, status: "authenticated" as AuthStatus};
            }
        }
    } catch (e) {
        console.log(e);
    }

    return {session: null, status: "unauthenticated" as AuthStatus};
};

export const useSessionStore = create<SessionState>((set) => ({
    session: null,
    status: "loading" as AuthStatus,
    clearSession: () => {
        set({session: null, status: "unauthenticated"});
    },
    updateSession: async () => {
        const {session, status} = await fetchSessionFromAPI();
        set({session: session, status: status});
    },
}));

if (typeof window !== "undefined") {
    useSessionStore.getState().updateSession();
}
