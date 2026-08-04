import { BookOpen, LogIn, Trash2 } from "lucide-react";
import { useAuth } from "../auth/AuthContext";
import { BookCard } from "../components/BookCard";
import { useLibrary } from "../library/LibraryContext";

export function LibraryPage() {
  const { user, openAuth } = useAuth();
  const { savedBooks, removeBook } = useLibrary();

  return (
    <div className="content-page library-page">
      <h1>My Library</h1>
      {!user ? (
        <div className="empty-library">
          <LogIn size={56} />
          <h2>Log in to see your saved titles</h2>
          <p>Your personal library is available on every device where you use this browser account.</p>
          <button className="primary-button library-login" onClick={() => openAuth("login")}>Login</button>
        </div>
      ) : savedBooks.length === 0 ? (
        <div className="empty-library">
          <BookOpen size={56} />
          <h2>Your saved books will appear here</h2>
          <p>Open any title and select “Add title to My Library” to build your collection.</p>
        </div>
      ) : (
        <section className="library-section">
          <h2>Saved Books</h2>
          <p>{savedBooks.length} {savedBooks.length === 1 ? "title" : "titles"}</p>
          <div className="library-grid">
            {savedBooks.map((book) => (
              <div className="library-card-wrap" key={book.id}>
                <BookCard book={book} />
                <button className="remove-library-button" onClick={() => removeBook(book.id)} aria-label={`Remove ${book.title} from My Library`}>
                  <Trash2 size={16} />Remove
                </button>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
