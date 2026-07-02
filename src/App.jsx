import { useEffect, useMemo, useState } from 'react';
import Lenis from 'lenis';
import Navbar from './components/Navbar';
import IndexRail from './components/IndexRail';
import HomePage from './components/HomePage';
import ProjectsPage from './components/ProjectsPage';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import { seo } from './data/siteData';
import { scrollToHashTarget } from './utils/navigation';
import { setLenis } from './utils/smoothScroll';

const resolveRoute = () => {
  const params = new URLSearchParams(window.location.search);
  const redirectedPath = params.get('redirect');

  if (redirectedPath) {
    window.history.replaceState({}, '', redirectedPath);
  }

  const path = window.location.pathname.replace(/\/+$/, '') || '/';
  return path === '/projects' ? 'projects' : 'home';
};

const App = () => {
  const [route, setRoute] = useState(resolveRoute);

  // Momentum smooth-scroll — the cinematic signature. Disabled under reduced-motion.
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const lenis = new Lenis({ duration: 1.1, smoothWheel: true });
    setLenis(lenis);

    let frame;
    const raf = (time) => {
      lenis.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(frame);
      setLenis(null);
      lenis.destroy();
    };
  }, []);

  useEffect(() => {
    const handleLocationChange = () => {
      setRoute(resolveRoute());
      window.requestAnimationFrame(() => {
        window.requestAnimationFrame(() => {
          const hash = window.location.hash;

          if (hash && scrollToHashTarget(hash)) {
            return;
          }

          window.scrollTo({ top: 0, behavior: 'smooth' });
        });
      });
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('codex:navigate', handleLocationChange);
    handleLocationChange();

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('codex:navigate', handleLocationChange);
    };
  }, []);

  const metadata = useMemo(() => (route === 'projects' ? seo.projects : seo.home), [route]);

  useEffect(() => {
    document.title = metadata.title;

    const descriptionTag = document.querySelector('meta[name="description"]');
    if (descriptionTag) {
      descriptionTag.setAttribute('content', metadata.description);
    }
  }, [metadata]);

  return (
    <div className="min-h-screen bg-bg font-body text-ink">
      <div className="grain" aria-hidden="true" />
      <ScrollProgress />
      <Navbar route={route} />
      {route === 'projects' ? (
        <ProjectsPage />
      ) : (
        <>
          <IndexRail />
          <HomePage />
        </>
      )}
      <Footer />
      <BackToTop />
    </div>
  );
};

export default App;
