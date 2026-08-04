import { LoaderCircle, Search, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { searchBooks } from "../api";
import type { Book } from "../types";

export function SearchBar() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const requestId = useRef(0);

  useEffect(() => {
    const normalized = query.trim();
    if (!normalized) {
      setResults([]);
      setLoading(false);
      setError("");
      return;
    }
    setLoading(true);
    setError("");
    const controller = new AbortController();
    const currentRequest = ++requestId.current;
    const timeout = window.setTimeout(() => {
      searchBooks(normalized, controller.signal)
        .then((books) => {
          if (requestId.current === currentRequest) setResults(books);
        })
        .catch((reason: unknown) => {
          if (reason instanceof DOMException && reason.name === "AbortError") return;
          if (requestId.current === currentRequest) setError("No books could be loaded.");
        })
        .finally(() => {
          if (requestId.current === currentRequest) setLoading(false);
        });
    }, 300);

    return () => {
      window.clearTimeout(timeout);
      controller.abort();
    };
  }, [query]);

  const chooseBook = (book: Book) => {
    setQuery("");
    navigate(`/book/${book.id}`);
  };

  const open = Boolean(query.trim());

  return (
    <div className="search-wrap">
      <div className="search-input-wrap">
        <input
          aria-label="Search for books"
          placeholder="Search for books"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
        {query ? (
          <button aria-label="Clear search" onClick={() => setQuery("")}><X size={20} /></button>
        ) : (
          <Search size={22} aria-hidden="true" />
        )}
      </div>
      {open && (
        <div className="search-results" role="listbox" aria-label="Book search results">
          {loading && <div className="search-message"><LoaderCircle className="spin" size={22} />Searching...</div>}
          {!loading && error && <div className="search-message">{error}</div>}
          {!loading && !error && results.length === 0 && (
            <div className="search-message">No books found for “{query.trim()}”.</div>
          )}
          {!loading && results.slice(0, 8).map((book) => (
            <button className="search-result" key={book.id} onClick={() => chooseBook(book)} role="option">
              <img src={book.imageLink} alt="" />
              <span><strong>{book.title}</strong><small>{book.author}</small></span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
