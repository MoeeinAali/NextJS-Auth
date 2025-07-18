import {cookies} from "next/headers";
import {decryptSession} from "@/app/utils/session";

export async function GET() {
    const cookieStore = await cookies()
    const encryptedSession = JSON.parse(cookieStore.get("uranus-session")?.value)
    const session = await decryptSession(encryptedSession)
    return Response.json(session)
}