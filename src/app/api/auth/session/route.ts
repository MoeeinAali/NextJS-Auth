import { cookies } from "next/headers";
import { decryptSession } from "@/app/utils/session";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const cookieStore = await cookies();
    const cookieValue = cookieStore.get("uranus-session")?.value;

    if (cookieValue) {
      const encryptedSession = JSON.parse(cookieValue);
      const session = await decryptSession(encryptedSession);
      return NextResponse.json(session);
    }
  } catch {}
  console.error("Session decryption error");
  return new NextResponse("Invalid session or decryption failed", {
    status: 400,
  });
}
