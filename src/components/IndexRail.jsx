import { useEffect, useRef, useState } from 'react';
import { FaBars, FaXmark } from 'react-icons/fa6';
import { smoothScrollTo } from '../utils/smoothScroll';

const sections = [
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'ctf-activity', label: 'CTF' },
  { id: 'awards', label: 'Certificates' },
  { id: 'contact', label: 'Contact' }
];

const IndexRail = () => {
  const [active, setActive] = useState('about');
  const [sheetOpen, setSheetOpen] = useState(false);
  const activeRef = useRef(active);
  activeRef.current = active;

  // Scroll-spy: mark the section crossing the viewport's middle band as active.
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const hit = entries.find((entry) => entry.isIntersecting);
        if (hit) {
          setActive(hit.target.id);
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: 0 }
    );

    sections.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    });

    return () => observer.disconnect();
  }, []);

  const go = (id) => {
    smoothScrollTo(`#${id}`);
    setSheetOpen(false);
  };

  return (
    <>
      {/* Desktop rail — slim dots that expand to labels on hover; active label always shown. */}
      <nav
        aria-label="Section navigation"
        className="group/rail fixed left-4 top-1/2 z-30 hidden -translate-y-1/2 flex-col gap-1 rounded-xl2 border border-transparent px-3 py-4 transition-colors duration-300 hover:border-line hover:bg-surface/80 hover:backdrop-blur lg:flex"
      >
        {sections.map(({ id, label }) => {
          const isActive = active === id;
          return (
            <button
              key={id}
              type="button"
              onClick={() => go(id)}
              aria-current={isActive ? 'true' : undefined}
              className="flex items-center gap-3 rounded-pill py-1.5 pr-1 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
            >
              <span
                aria-hidden="true"
                className={`h-2.5 w-2.5 shrink-0 rounded-pill transition-all duration-300 ${
                  isActive
                    ? 'bg-gradient-to-b from-emberBright to-ember shadow-ember'
                    : 'border border-ember/40 bg-transparent group-hover/rail:bg-ember/25'
                }`}
              />
              <span
                className={`whitespace-nowrap font-mono text-xs uppercase tracking-[0.14em] transition-all duration-300 ${
                  isActive
                    ? 'text-emberBright opacity-100'
                    : 'text-muted opacity-0 -translate-x-2 group-hover/rail:translate-x-0 group-hover/rail:opacity-100'
                }`}
              >
                {label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Mobile sections sheet */}
      <div className="lg:hidden">
        {sheetOpen ? (
          <div className="fixed bottom-20 left-5 z-40 w-52 rounded-xl2 border border-line bg-surface/95 p-2 shadow-card backdrop-blur">
            {sections.map(({ id, label }) => (
              <button
                key={id}
                type="button"
                onClick={() => go(id)}
                className={`block w-full rounded-pill px-4 py-2 text-left font-mono text-xs uppercase tracking-[0.14em] transition ${
                  active === id ? 'bg-ember/15 text-emberBright' : 'text-muted hover:text-ink'
                }`}
              >
                {label}
              </button>
            ))}
          </div>
        ) : null}

        <button
          type="button"
          onClick={() => setSheetOpen((open) => !open)}
          aria-expanded={sheetOpen}
          aria-label="Jump to section"
          className="fixed bottom-5 left-5 z-40 inline-flex h-12 w-12 items-center justify-center rounded-pill border border-ember/50 bg-gradient-to-b from-emberBright to-ember text-[#0C1817] shadow-gloss transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
        >
          {sheetOpen ? <FaXmark aria-hidden="true" /> : <FaBars aria-hidden="true" />}
        </button>
      </div>
    </>
  );
};

export default IndexRail;
