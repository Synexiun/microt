import { put, list } from "@vercel/blob";

// Store JSON data as Blob files at predictable paths
// Uses private access to match the store configuration

export async function readJsonFile<T>(filename: string): Promise<T[]> {
  try {
    const { blobs } = await list({ prefix: `data/${filename}` });
    if (blobs.length === 0) return [];
    // Private blobs require the token as a Bearer header
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    const response = await fetch(blobs[0].url, {
      headers: token ? { authorization: `Bearer ${token}` } : {},
      cache: "no-store",
    });
    if (!response.ok) return [];
    return (await response.json()) as T[];
  } catch {
    return [];
  }
}

// Returns null when the blob file does not exist (vs [] when it exists but is empty).
// Use this where seeding should only happen on first-ever write, not after all items are deleted.
export async function readJsonFileOrNull<T>(filename: string): Promise<T[] | null> {
  try {
    const { blobs } = await list({ prefix: `data/${filename}` });
    if (blobs.length === 0) return null; // file doesn't exist yet
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    const response = await fetch(blobs[0].url, {
      headers: token ? { authorization: `Bearer ${token}` } : {},
      cache: "no-store",
    });
    if (!response.ok) return null;
    return (await response.json()) as T[];
  } catch {
    return null;
  }
}

export async function writeJsonFile<T>(
  filename: string,
  data: T[]
): Promise<void> {
  await put(`data/${filename}`, JSON.stringify(data), {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
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

export async function readJsonObject<T>(filename: string): Promise<T | null> {
  try {
    const { blobs } = await list({ prefix: `data/${filename}` });
    if (blobs.length === 0) return null;
    const token = process.env.BLOB_READ_WRITE_TOKEN;
    const response = await fetch(blobs[0].url, {
      headers: token ? { authorization: `Bearer ${token}` } : {},
      cache: "no-store",
    });
    if (!response.ok) return null;
    return (await response.json()) as T;
  } catch {
    return null;
  }
}

export async function writeJsonObject<T>(
  filename: string,
  data: T
): Promise<void> {
  await put(`data/${filename}`, JSON.stringify(data), {
    access: "private",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}
