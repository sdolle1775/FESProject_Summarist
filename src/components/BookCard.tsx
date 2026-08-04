import { Clock3, Star } from "lucide-react";
import { Link } from "react-router-dom";
import { bookDuration } from "../api";
import type { Book } from "../types";

export function BookCard({ book }: { book: Book }) {
  return (
    <Link className="book-card" to={`/book/${book.id}`} aria-label={`${book.title} by ${book.author}`}>
      <div className="book-cover-wrap">
        {book.subscriptionRequired && <span className="premium-pill">Premium</span>}
        <img className="book-cover" src={book.imageLink} alt={`Cover of ${book.title}`} />
      </div>
      <h3>{book.title}</h3>
      <p className="book-author">{book.author}</p>
      <p className="book-subtitle">{book.subTitle}</p>
      <div className="book-meta">
        <span><Clock3 size={15} />{bookDuration(book)}</span>
        <span><Star size={15} />{book.averageRating.toFixed(1)}</span>
      </div>
    </Link>
  );
}
