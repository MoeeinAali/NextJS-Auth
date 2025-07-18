import {cookies} from "next/headers";
import {decryptSession} from "@/app/utils/session";

export async function GET() {
    try {
        const cookieStore = await cookies();
        const cookieValue = cookieStore.get("uranus-session")?.value;

        if (!cookieValue) {
            return new Response("Session not found", {status: 401});
        }

        const encryptedSession = JSON.parse(cookieValue);
        const session = await decryptSession(encryptedSession);

        return Response.json(session);
    } catch (e) {
        console.error("Session decryption error:", e);

        return new Response("Invalid session or decryption failed", {
            status: 401,
        });
    }
}
