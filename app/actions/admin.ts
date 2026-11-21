"use server";

import { randomBytes } from "crypto";
import { mkdir, writeFile } from "fs/promises";
import path from "path";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import {
  adminPassword,
  clearAdminSession,
  isAdmin,
  passwordsMatch,
  setAdminSession,
} from "@/lib/admin-session";
import { readRealizations, writeRealizations } from "@/lib/realizations-store";
import type { Realization, RealizationPhoto } from "@/lib/realizations";
import { isServiceId } from "@/lib/services";

const MAX_BYTES = 8 * 1024 * 1024;
const MAX_PHOTOS = 8;

function text(formData: FormData, key: string, max: number) {
  return String(formData.get(key) ?? "").trim().slice(0, max);
}

function slug(value: string) {
  const base = value
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ł/g, "l")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")
    .slice(0, 40);
  return base || `realizacja-${Date.now()}`;
}

function extension(file: File) {
  const fromName = path.extname(file.name).toLowerCase();
  if ([".jpg", ".jpeg", ".png", ".webp"].includes(fromName)) return fromName === ".jpeg" ? ".jpg" : fromName;
  if (file.type === "image/png") return ".png";
  if (file.type === "image/webp") return ".webp";
  return ".jpg";
}

async function saveUpload(file: File, id: string): Promise<string> {
  const bytes = Buffer.from(await file.arrayBuffer());
  const name = `${id}-${randomBytes(4).toString("hex")}${extension(file)}`;
  const directory = path.join(process.cwd(), "public", "realizacje");
  await mkdir(directory, { recursive: true });
  await writeFile(path.join(directory, name), bytes);
  return `/realizacje/${name}`;
}

function refresh() {
  revalidatePath("/");
  revalidatePath("/admin");
}

async function guard() {
  if (!(await isAdmin())) redirect("/admin/logowanie");
}

export async function login(formData: FormData) {
  const password = text(formData, "password", 200);
  const expected = adminPassword();
  if (!expected) redirect("/admin/logowanie?blad=konfiguracja");
  if (!passwordsMatch(password, expected)) redirect("/admin/logowanie?blad=haslo");
  await setAdminSession();
  redirect("/admin");
}

export async function logout() {
  await clearAdminSession();
  redirect("/admin/logowanie");
}

export async function saveRealization(formData: FormData) {
  await guard();
  const items = await readRealizations();
  const requestedId = text(formData, "id", 60);
  const title = text(formData, "title", 120);
  const place = text(formData, "place", 80);
  const description = text(formData, "description", 800);
  const imageAlt = text(formData, "imageAlt", 180);
  const serviceValue = text(formData, "serviceId", 40);
  const serviceId = isServiceId(serviceValue) ? serviceValue : "";

  if (title.length < 2 || description.length < 2) {
    redirect("/admin?blad=pola");
  }

  const id = requestedId || slug(title);
  const current = items.find((item) => item.id === id);
  const removed = new Set(formData.getAll("remove").filter((value) => typeof value === "string"));
  const kept: RealizationPhoto[] = [];
  if (current?.image && !removed.has(current.image)) {
    kept.push({ src: current.image, alt: imageAlt || current.imageAlt });
  }
  for (const frame of current?.gallery ?? []) {
    if (!removed.has(frame.src)) kept.push(frame);
  }

  const uploads = formData
    .getAll("photos")
    .filter((value): value is File => value instanceof File && value.size > 0);

  if (kept.length + uploads.length > MAX_PHOTOS) redirect("/admin?blad=limit");
  if (uploads.some((file) => !file.type.startsWith("image/") || file.size > MAX_BYTES)) {
    redirect("/admin?blad=plik");
  }

  const added: RealizationPhoto[] = [];
  for (const file of uploads) {
    const src = await saveUpload(file, id);
    added.push({ src, alt: imageAlt || title });
  }

  const frames = [...kept, ...added];
  const [cover, ...gallery] = frames;
  const next: Realization = {
    id,
    title,
    place,
    description,
    serviceId,
    image: cover?.src ?? "",
    imageAlt: imageAlt || title,
    gallery,
    placeholder: !cover,
    exampleSlot: false,
  };

  const without = items.filter((item) => item.id !== id);
  try {
    await writeRealizations([...without, next]);
  } catch {
    redirect("/admin?blad=dysk");
  }
  refresh();
  redirect("/admin?zapis=1");
}

export async function deleteRealization(formData: FormData) {
  await guard();
  const id = text(formData, "id", 60);
  const items = await readRealizations();
  try {
    await writeRealizations(items.filter((item) => item.id !== id));
  } catch {
    redirect("/admin?blad=dysk");
  }
  refresh();
  redirect("/admin?zapis=1");
}
