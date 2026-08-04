import type { Book, BookStatus } from "./types";

const API_ROOT = "https://us-central1-summaristt.cloudfunctions.net";

async function getJson<T>(path: string, signal?: AbortSignal): Promise<T> {
  const response = await fetch(`${API_ROOT}/${path}`, { signal });
  if (!response.ok) throw new Error("We couldn't load the books. Please try again.");
  return response.json() as Promise<T>;
}

export function getBooks(status: BookStatus, signal?: AbortSignal) {
  return getJson<Book | Book[]>(`getBooks?status=${status}`, signal).then((result) =>
    Array.isArray(result) ? result : [result],
  );
}

export function getBook(id: string, signal?: AbortSignal) {
  return getJson<Book>(`getBook?id=${encodeURIComponent(id)}`, signal);
}

export function searchBooks(search: string, signal?: AbortSignal) {
  return getJson<Book[]>(
    `getBooksByAuthorOrTitle?search=${encodeURIComponent(search)}`,
    signal,
  );
}

export function formatTime(seconds: number) {
  if (!Number.isFinite(seconds) || seconds < 0) return "0:00";
  const minutes = Math.floor(seconds / 60);
  return `${minutes}:${Math.floor(seconds % 60).toString().padStart(2, "0")}`;
}

export function bookDuration(book: Pick<Book, "id">) {
  const offset = [...book.id].reduce((sum, char) => sum + char.charCodeAt(0), 0) % 36;
  return `04:${String(20 + offset).padStart(2, "0")}`;
}
