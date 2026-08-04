import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useAuth } from "../auth/AuthContext";
import type { Book } from "../types";

interface LibraryContextValue {
  savedBooks: Book[];
  isSaved: (bookId: string) => boolean;
  toggleBook: (book: Book) => void;
  removeBook: (bookId: string) => void;
}

type StoredLibraries = Record<string, Book[]>;

const LIBRARIES_KEY = "summarist:libraries";
const LibraryContext = createContext<LibraryContextValue | null>(null);

function readLibraries(): StoredLibraries {
  try {
    const value = localStorage.getItem(LIBRARIES_KEY);
    return value ? (JSON.parse(value) as StoredLibraries) : {};
  } catch {
    return {};
  }
}

export function LibraryProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [savedBooks, setSavedBooks] = useState<Book[]>([]);
  const libraryId = user?.email.toLowerCase() ?? null;

  useEffect(() => {
    setSavedBooks(libraryId ? (readLibraries()[libraryId] ?? []) : []);
  }, [libraryId]);

  const save = useCallback(
    (nextBooks: Book[]) => {
      if (!libraryId) return;
      const libraries = readLibraries();
      libraries[libraryId] = nextBooks;
      localStorage.setItem(LIBRARIES_KEY, JSON.stringify(libraries));
      setSavedBooks(nextBooks);
    },
    [libraryId],
  );

  const removeBook = useCallback(
    (bookId: string) => save(savedBooks.filter((book) => book.id !== bookId)),
    [save, savedBooks],
  );

  const toggleBook = useCallback(
    (book: Book) => {
      const alreadySaved = savedBooks.some((savedBook) => savedBook.id === book.id);
      save(alreadySaved ? savedBooks.filter((savedBook) => savedBook.id !== book.id) : [...savedBooks, book]);
    },
    [save, savedBooks],
  );

  const value = useMemo<LibraryContextValue>(
    () => ({
      savedBooks,
      isSaved: (bookId) => savedBooks.some((book) => book.id === bookId),
      toggleBook,
      removeBook,
    }),
    [removeBook, savedBooks, toggleBook],
  );

  return <LibraryContext.Provider value={value}>{children}</LibraryContext.Provider>;
}

export function useLibrary() {
  const context = useContext(LibraryContext);
  if (!context) throw new Error("useLibrary must be used inside LibraryProvider");
  return context;
}
