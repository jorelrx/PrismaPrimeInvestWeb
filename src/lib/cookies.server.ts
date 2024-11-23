// src/lib/cookies.server.ts
import { cookies } from "next/headers";

export async function getServerCookies() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;
  return { token };
}
