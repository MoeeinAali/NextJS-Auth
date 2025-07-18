"use server";

import {SignInModel} from "@/app/(auth)/_types/auth.types";
import {headers, cookies} from "next/headers";
import {JWT, UserResponse, UserSession} from "@/app/_types/auth.types";
import {jwtDecode} from "jwt-decode";
import {decryptSession, encryptSession} from "@/app/utils/session";

export async function signinAction(model: SignInModel) {
    const headersList = await headers();
    const userAgent = headersList.get("userAgent");
    try {
        const response = await fetch(
            `${process.env.NEXT_PUBLIC_API}/api/identity/signin`,
            {
                method: "POST",
                body: JSON.stringify({...model, userAgent}),
                headers: {
                    "Content-Type": "application/json",
                },
            },
        );
        if (response.ok) {
            const user = await response.json();
            await setAuthCookieAction(user);
            return {
                isSuccess: true,
                response: user,
            };
        }
    } catch (e) {
        console.log(e);
    }
    return {
        isSuccess: false,
    };
}

export async function signOutAction() {
    const cookieStore = await cookies()
    const sessionCookie = cookieStore.get("uranus-session")?.value;
    if (!sessionCookie) {
        return null;
    }
    const session = await decryptSession(JSON.parse(sessionCookie));
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API}/api/identity/signout`, {
            method: "POST",
            body: JSON.stringify({sessionId: session.sessionId}),
            headers: {
                "Content-Type": "application/json",
            }
        })
        if (response.ok) {
            cookieStore.delete("uranus-session")
        }
        return {isSuccess: true};
    } catch (e) {
        console.log(e)
    }
    return {isSuccess: false};
}

export async function setAuthCookieAction(user: UserResponse) {
    const decoded = jwtDecode<JWT>(user.accessToken);
    const session: UserSession = {
        sessionId: user.sessionId,
        accessToken: user.accessToken,
        pic: decoded.pic,
        fullName: decoded.fullName,
        username: decoded.username,
        sessionExpiry: user.sessionExpiry * 1000,
        exp: decoded.exp * 1000,
    };
    const cookieStore = await cookies();

    const encryptedSession = await encryptSession(session);
    cookieStore.set("uranus-session", JSON.stringify(encryptedSession), {
        httpOnly: true,
        secure: true,
        sameSite: "strict",
        path: "/",
    });
}
