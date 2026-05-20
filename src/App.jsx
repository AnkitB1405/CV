import { useEffect, useMemo, useState } from 'react';
import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import ProjectsPage from './components/ProjectsPage';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';
import BackToTop from './components/BackToTop';
import { seo } from './data/siteData';
import { scrollToHashTarget } from './utils/navigation';

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
    <div className="min-h-screen bg-bg text-slate-100">
      <ScrollProgress />
      <Navbar route={route} />
      {route === 'projects' ? <ProjectsPage /> : <HomePage />}
      <Footer />
      <BackToTop />
    </div>
  );
};

export default App;
