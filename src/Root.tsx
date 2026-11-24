import { Suspense, lazy } from 'react';
import App from './App';

// Minimal routing without a router dependency: /gallery is a separate page (opened in a new tab
// from the landing) and lives in its own chunk, so the landing never downloads it.
const GalleryPage = lazy(() => import('./features/gallery/GalleryPage'));

export default function Root() {
  const isGalleryRoute = /^\/gallery\/?$/.test(window.location.pathname);
  if (!isGalleryRoute) return <App />;
  return (
    <Suspense fallback={<div className="min-h-screen bg-black" />}>
      <GalleryPage />
    </Suspense>
  );
}
