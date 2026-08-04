export function Skeleton({ className = "" }: { className?: string }) {
  return <div className={`skeleton ${className}`} aria-hidden="true" />;
}

export function BookGridSkeleton({ count = 5 }: { count?: number }) {
  return (
    <div className="book-row" aria-label="Loading books">
      {Array.from({ length: count }, (_, index) => (
        <div className="book-card book-card--skeleton" key={index}>
          <Skeleton className="skeleton-cover" />
          <Skeleton className="skeleton-line skeleton-line--title" />
          <Skeleton className="skeleton-line" />
          <Skeleton className="skeleton-line skeleton-line--short" />
        </div>
      ))}
    </div>
  );
}
