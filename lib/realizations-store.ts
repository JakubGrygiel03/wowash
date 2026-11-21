import "server-only";

import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";

import { realizations as seed, type Realization, type RealizationPhoto } from "@/lib/realizations";
import { isServiceId } from "@/lib/services";

const filePath = path.join(process.cwd(), "data", "realizations.json");

function photo(value: unknown): RealizationPhoto | null {
  if (!value || typeof value !== "object") return null;
  const row = value as { src?: unknown; alt?: unknown };
  if (typeof row.src !== "string" || !row.src.startsWith("/realizacje/")) return null;
  return { src: row.src, alt: typeof row.alt === "string" ? row.alt : "" };
}

function entry(value: unknown): Realization | null {
  if (!value || typeof value !== "object") return null;
  const row = value as Partial<Realization> & { gallery?: unknown };
  if (typeof row.id !== "string" || typeof row.title !== "string") return null;
  const gallery = Array.isArray(row.gallery) ? row.gallery.map(photo).filter((item) => item !== null) : [];
  const image = typeof row.image === "string" && row.image.startsWith("/realizacje/") ? row.image : "";
  return {
    id: row.id,
    title: row.title,
    place: typeof row.place === "string" ? row.place : "",
    description: typeof row.description === "string" ? row.description : "",
    serviceId: typeof row.serviceId === "string" && isServiceId(row.serviceId) ? row.serviceId : "",
    image,
    imageAlt: typeof row.imageAlt === "string" ? row.imageAlt : row.title,
    gallery,
    placeholder: !image,
    exampleSlot: false,
  };
}

export async function readRealizations(): Promise<Realization[]> {
  try {
    const raw = await readFile(filePath, "utf8");
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) return [...seed];
    return parsed.map(entry).filter((item): item is Realization => item !== null);
  } catch {
    return [...seed];
  }
}

export async function writeRealizations(items: Realization[]) {
  await mkdir(path.dirname(filePath), { recursive: true });
  await writeFile(filePath, `${JSON.stringify(items, null, 2)}\n`, "utf8");
}
