import { BookOpen } from "lucide-react";

export function LibraryPage() {
  return (
    <div className="content-page library-page">
      <h1>My Library</h1>
      <div className="empty-library">
        <BookOpen size={56} />
        <h2>Your saved books will appear here</h2>
        <p>Saving and finished-book collections are not part of the required internship scope.</p>
      </div>
    </div>
  );
}
