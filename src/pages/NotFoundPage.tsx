import { Link } from "react-router-dom";

export function NotFoundPage() {
  return (
    <main className="not-found-page">
      <img src="/assets/logo.png" alt="Summarist" />
      <h1>Page not found</h1>
      <p>The page you’re looking for doesn’t exist.</p>
      <Link className="primary-button" to="/for-you">Browse books</Link>
    </main>
  );
}
