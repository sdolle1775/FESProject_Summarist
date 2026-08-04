import { CirclePlay } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { bookDuration, getBooks } from "../api";
import { BookCard } from "../components/BookCard";
import { BookGridSkeleton, Skeleton } from "../components/Skeleton";
import type { Book } from "../types";

interface BooksState {
  selected: Book | null;
  recommended: Book[];
  suggested: Book[];
}

export function ForYouPage() {
  const [books, setBooks] = useState<BooksState>({ selected: null, recommended: [], suggested: [] });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    Promise.all([
      getBooks("selected", controller.signal),
      getBooks("recommended", controller.signal),
      getBooks("suggested", controller.signal),
    ])
      .then(([selected, recommended, suggested]) => {
        setBooks({ selected: selected[0] ?? null, recommended, suggested });
      })
      .catch((reason: unknown) => {
        if (reason instanceof DOMException && reason.name === "AbortError") return;
        setError("We couldn't load your recommendations. Please refresh the page.");
      })
      .finally(() => setLoading(false));
    return () => controller.abort();
  }, []);

  if (error) return <div className="page-error">{error}</div>;

  return (
    <div className="content-page for-you-page">
      <section className="book-section selected-section">
        <div className="section-label">Selected just for you</div>
        {loading ? (
          <Skeleton className="selected-skeleton" />
        ) : books.selected && (
          <Link className="selected-book" to={`/book/${books.selected.id}`}>
            <div className="selected-subtitle">{books.selected.subTitle}</div>
            <img src={books.selected.imageLink} alt={`Cover of ${books.selected.title}`} />
            <div className="selected-details">
              <h2>{books.selected.title}</h2>
              <p>{books.selected.author}</p>
              <span><CirclePlay fill="currentColor" />{bookDuration(books.selected)}</span>
            </div>
          </Link>
        )}
      </section>

      <section className="book-section">
        <div className="section-label">Recommended For You</div>
        <p className="section-subtitle">We think you’ll like these</p>
        {loading ? <BookGridSkeleton /> : (
          <div className="book-row">{books.recommended.map((book) => <BookCard book={book} key={book.id} />)}</div>
        )}
      </section>

      <section className="book-section">
        <div className="section-label">Suggested Books</div>
        <p className="section-subtitle">Browse those books</p>
        {loading ? <BookGridSkeleton /> : (
          <div className="book-row">{books.suggested.map((book) => <BookCard book={book} key={book.id} />)}</div>
        )}
      </section>
    </div>
  );
}
