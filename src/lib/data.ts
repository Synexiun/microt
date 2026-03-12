import fs from "fs/promises";
import path from "path";

function getDataPath(filename: string): string {
  return path.join(process.cwd(), "data", filename);
}

// Simple mutex: one pending write per file at a time
const locks = new Map<string, Promise<void>>();

function withLock<T>(filename: string, fn: () => Promise<T>): Promise<T> {
  const prev = locks.get(filename) ?? Promise.resolve();
  const next = prev
    .then(() => fn())
    .finally(() => {
      if (locks.get(filename) === next) {
        locks.delete(filename);
      }
    });
  // Store only the void part so the chain doesn't leak return values
  locks.set(
    filename,
    next.then(() => {})
  );
  return next;
}

async function ensureDataDir(): Promise<void> {
  const dir = path.join(process.cwd(), "data");
  try {
    await fs.access(dir);
  } catch {
    await fs.mkdir(dir, { recursive: true });
  }
}

export async function readJsonFile<T>(filename: string): Promise<T[]> {
  try {
    const filePath = getDataPath(filename);
    const raw = await fs.readFile(filePath, "utf-8");
    return JSON.parse(raw) as T[];
  } catch {
    return [];
  }
}

export async function writeJsonFile<T>(
  filename: string,
  data: T[]
): Promise<void> {
  await ensureDataDir();
  const filePath = getDataPath(filename);
  await fs.writeFile(filePath, JSON.stringify(data, null, 2), "utf-8");
}

export async function appendToJsonFile<T>(
  filename: string,
  item: T
): Promise<T> {
  return withLock(filename, async () => {
    const data = await readJsonFile<T>(filename);
    data.push(item);
    await writeJsonFile(filename, data);
    return item;
  });
}

export async function updateInJsonFile<T extends { id: string }>(
  filename: string,
  id: string,
  updates: Partial<T>
): Promise<T | null> {
  return withLock(filename, async () => {
    const data = await readJsonFile<T>(filename);
    const index = data.findIndex((item) => item.id === id);
    if (index === -1) return null;
    data[index] = { ...data[index], ...updates };
    await writeJsonFile(filename, data);
    return data[index];
  });
}

export async function deleteFromJsonFile(
  filename: string,
  id: string
): Promise<boolean> {
  return withLock(filename, async () => {
    const data = await readJsonFile<{ id: string }>(filename);
    const filtered = data.filter((item) => item.id !== id);
    if (filtered.length === data.length) return false;
    await writeJsonFile(filename, filtered);
    return true;
  });
}
