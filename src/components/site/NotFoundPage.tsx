export function NotFoundPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="display text-6xl text-plum">404</h1>
        <p className="mt-4 text-muted-foreground">This page doesn't exist or has moved.</p>
        <a href="/" className="btn-primary mt-6 inline-flex">Back to AURALIQUE</a>
      </div>
    </main>
  );
}
