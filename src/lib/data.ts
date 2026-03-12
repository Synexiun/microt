import { kv } from "@vercel/kv";

// Each "file" becomes a KV key, e.g. "appointments.json" -> key "appointments"
function toKey(filename: string): string {
  return filename.replace(".json", "");
}

export async function readJsonFile<T>(filename: string): Promise<T[]> {
  try {
    const data = await kv.get<T[]>(toKey(filename));
    return data ?? [];
  } catch {
    return [];
  }
}

export async function writeJsonFile<T>(
  filename: string,
  data: T[]
): Promise<void> {
  await kv.set(toKey(filename), data);
}

export async function appendToJsonFile<T>(
  filename: string,
  item: T
): Promise<T> {
  const data = await readJsonFile<T>(filename);
  data.push(item);
  await writeJsonFile(filename, data);
  return item;
}

export async function updateInJsonFile<T extends { id: string }>(
  filename: string,
  id: string,
  updates: Partial<T>
): Promise<T | null> {
  const data = await readJsonFile<T>(filename);
  const index = data.findIndex((item) => item.id === id);
  if (index === -1) return null;
  data[index] = { ...data[index], ...updates };
  await writeJsonFile(filename, data);
  return data[index];
}

export async function deleteFromJsonFile(
  filename: string,
  id: string
): Promise<boolean> {
  const data = await readJsonFile<{ id: string }>(filename);
  const filtered = data.filter((item) => item.id !== id);
  if (filtered.length === data.length) return false;
  await writeJsonFile(filename, filtered);
  return true;
}
