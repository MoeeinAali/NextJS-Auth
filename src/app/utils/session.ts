import { UserSession } from "@/app/_types/auth.types";
import { CompactEncrypt, compactDecrypt } from "jose";
import { cookies } from "next/headers";

const BASE64_JWT_SECRET = process.env.BASE64_JWT_SECRET;
const JWT_SECRET_KEY = Uint8Array.from(
  Buffer.from(BASE64_JWT_SECRET, "base64"),
);

export async function decryptSession(jwe: string): Promise<UserSession> {
  const { plaintext } = await compactDecrypt(jwe, JWT_SECRET_KEY);
  const json = new TextDecoder().decode(plaintext);
  return JSON.parse(json) as UserSession;
}

export async function encryptSession(session: UserSession): Promise<string> {
  const encoder = new TextEncoder();
  return new CompactEncrypt(encoder.encode(JSON.stringify(session)))
    .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
    .encrypt(JWT_SECRET_KEY);
}

export async function getSession(): Promise<UserSession | null> {
  const cookieStore = await cookies();

  try {
    const sessionCookie = cookieStore.get("uranus-session")?.value;
    if (sessionCookie) {
      return decryptSession(JSON.parse(sessionCookie));
    }
  } catch {}
  return null;
}
