// src/lib/cookies.client.ts
import { parseCookies } from "nookies";

export function getClientCookies() {
  return parseCookies();
}
