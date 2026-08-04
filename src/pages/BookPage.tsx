import {
  Bookmark,
  BookmarkCheck,
  BookOpen,
  Clock3,
  Headphones,
  Lightbulb,
  Mic2,
  Star,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import { bookDuration, getBook } from "../api";
import { Skeleton } from "../components/Skeleton";
import { useLibrary } from "../library/LibraryContext";
import type { Book } from "../types";

export function BookPage() {
  const { id = "" } = useParams();
  const navigate = useNavigate();
  const { user, openAuth } = useAuth();
  const { isSaved, toggleBook } = useLibrary();
  const [book, setBook] = useState<Book | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();
    setBook(null);
    setError("");
    getBook(id, controller.signal)
      .then(setBook)
      .catch((reason: unknown) => {
        if (reason instanceof DOMException && reason.name === "AbortError") return;
        setError("This book could not be found.");
      });
    return () => controller.abort();
  }, [id]);

  const openBook = () => {
    if (!book) return;
    if (!user) {
      openAuth("login");
      return;
    }
    if (book.subscriptionRequired && user.plan === "basic") {
      navigate("/choose-plan");
      return;
    }
    navigate(`/player/${book.id}`);
  };

  const toggleLibrary = () => {
    if (!user) {
      openAuth("login");
      return;
    }
    if (book) toggleBook(book);
  };

  if (error) return <div className="page-error">{error}</div>;
  if (!book) {
    return (
      <div className="content-page book-detail-loading">
        <Skeleton className="skeleton-line skeleton-line--title" />
        <Skeleton className="detail-skeleton" />
      </div>
    );
  }

  const saved = isSaved(book.id);

  return (
    <article className="content-page book-detail-page">
      <div className="book-detail-hero">
        <div className="book-detail-copy">
          <h1>{book.title}{book.subscriptionRequired && " (Premium)"}</h1>
          <h2>{book.author}</h2>
          <p className="book-detail-subtitle">{book.subTitle}</p>
          <div className="detail-meta-grid">
            <span><Star size={18} fill="currentColor" />{book.averageRating.toFixed(1)} ({book.totalRating} ratings)</span>
            <span><Clock3 size={18} />{bookDuration(book)}</span>
            <span><Mic2 size={18} />{book.type}</span>
            <span><Lightbulb size={18} />{book.keyIdeas} Key ideas</span>
          </div>
          <div className="detail-actions">
            <button className="dark-button" onClick={openBook}><BookOpen size={18} />Read</button>
            <button className="dark-button" onClick={openBook}><Headphones size={18} />Listen</button>
          </div>
          <button className={`library-action ${saved ? "saved" : ""}`} onClick={toggleLibrary} aria-pressed={saved}>
            {saved ? <BookmarkCheck size={18} /> : <Bookmark size={18} />}
            {saved ? "Saved in My Library" : "Add title to My Library"}
          </button>
        </div>
        <figure className="book-detail-cover"><img src={book.imageLink} alt={`Cover of ${book.title}`} /></figure>
      </div>

      <section className="book-info-section">
        <h2>What’s it about?</h2>
        <div className="tag-list">{book.tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
        <p>{book.bookDescription}</p>
      </section>
      <section className="book-info-section">
        <h2>About the author</h2>
        <p>{book.authorDescription}</p>
      </section>
    </article>
  );
}
