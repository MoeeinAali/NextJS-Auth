import { UserSession } from "@/app/_types/auth.types";
import { CompactEncrypt, jwtDecrypt } from "jose";

const BASE64_JWT_SECRET = process.env.BASE64_JWT_SECRET;
const JWT_SECRET_KEY = Uint8Array.from(
  Buffer.from(BASE64_JWT_SECRET, "base64"),
);

export async function encryptSession(session: UserSession): Promise<string> {
  return new CompactEncrypt(new TextEncoder().encode(JSON.stringify(session)))
    .setProtectedHeader({ alg: "dir", enc: "A256GCM" })
    .encrypt(JWT_SECRET_KEY);
}

export async function decryptSession(jwe: string): Promise<UserSession> {
  const { payload } = await jwtDecrypt(jwe, JWT_SECRET_KEY);
  return payload as unknown as UserSession;
}
