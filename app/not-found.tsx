export default function NotFound() {
  return (
    <div className="not-found">
      <div className="not-found__inner">
        <h1 className="not-found__title">Page not found</h1>
        <p className="not-found__message">
          The page you&apos;re looking for doesn&apos;t exist or may have been moved.
        </p>
        <a href="/" className="not-found__link">
          Go back home
        </a>
      </div>
    </div>
  );
}

