import "server-only";

import { createHash, timingSafeEqual } from "crypto";
import { cookies } from "next/headers";

const COOKIE = "wowash_admin";

export function adminPassword() {
  const fromEnv = process.env.ADMIN_PASSWORD?.trim();
  if (fromEnv) return fromEnv;
  if (process.env.NODE_ENV === "production") return "";
  return "wowash-podglad";
}

function digest(value: string) {
  return createHash("sha256").update(value).digest();
}

export function passwordsMatch(input: string, expected: string) {
  if (!expected) return false;
  const left = digest(input);
  const right = digest(expected);
  return timingSafeEqual(left, right);
}

function sessionValue(password: string) {
  return createHash("sha256").update(`wowash-admin:${password}`).digest("hex");
}

export async function isAdmin() {
  const password = adminPassword();
  if (!password) return false;
  const jar = await cookies();
  const value = jar.get(COOKIE)?.value ?? "";
  const expected = sessionValue(password);
  if (value.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(value), Buffer.from(expected));
}

export async function setAdminSession() {
  const password = adminPassword();
  if (!password) return;
  const jar = await cookies();
  jar.set(COOKIE, sessionValue(password), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24 * 14,
  });
}

export async function clearAdminSession() {
  const jar = await cookies();
  jar.delete(COOKIE);
}
