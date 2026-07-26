import { useEffect, useRef, useState } from 'react';
import { FaBars, FaXmark } from 'react-icons/fa6';
import { smoothScrollTo } from '../utils/smoothScroll';

const sections = [
  { id: 'about', label: 'About' },
  { id: 'education', label: 'Education' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'projects', label: 'Projects' },
  { id: 'ctf-activity', label: 'CTF' },
  { id: 'awards', label: 'Certificates' },
  { id: 'contact', label: 'Contact' }
];

const N = sections.length;
const R = 124; // arc radius (px) when expanded
const STEP = 19; // degrees between neighbouring items on the arc
const BASE_X = 61; // x offset of the focused item (arc's rightmost point)
const GAP = 23; // vertical spacing (px) between dots when collapsed
const WHEEL_SENS = 0.0035; // lower = slower wheel roll

// Velocity scrub: cursor distance from the dial's center drives auto-scroll speed.
const HALF = 231; // ~half the expanded rail height (px)
const DEAD = 20; // neutral zone around center where nothing scrolls (px)
const MAX_SPEED = 12.0; // items/sec at the far edge

const IndexRail = () => {
  const [active, setActive] = useState('about');
  const [expanded, setExpanded] = useState(false);
  const [focus, setFocus] = useState(0); // fractional index of the focused (centered) item
  const [sheetOpen, setSheetOpen] = useState(false);
  const navRef = useRef(null);
  const offsetRef = useRef(0); // cursor offset from the dial's center, in px

  const activeIndex = Math.max(0, sections.findIndex((section) => section.id === active));

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

  // While collapsed, keep the dial centered on the active section so it opens there.
  useEffect(() => {
    if (!expanded) {
      setFocus(activeIndex);
      offsetRef.current = 0;
    }
  }, [activeIndex, expanded]);

  const trackPointer = (clientY) => {
    const rect = navRef.current?.getBoundingClientRect();
    if (rect) {
      offsetRef.current = clientY - (rect.top + rect.height / 2);
    }
  };

  // Auto-scroll loop: the further the cursor sits from center, the faster items roll
  // through the fixed focus point. Dead zone in the middle lets you settle on an item.
  useEffect(() => {
    if (!expanded) {
      return undefined;
    }
    let raf;
    let last = performance.now();
    const tick = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      const off = offsetRef.current;
      const mag = Math.abs(off) - DEAD;
      if (mag > 0) {
        const norm = Math.min(1, mag / (HALF - DEAD));
        const velocity = Math.sign(off) * norm * MAX_SPEED;
        setFocus((f) => Math.min(N - 1, Math.max(0, f + velocity * dt)));
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [expanded]);

  // Wheel rolls items through the same fixed focus point (slow, fractional).
  useEffect(() => {
    const el = navRef.current;
    if (!el) {
      return undefined;
    }
    const onWheel = (event) => {
      if (!expanded) {
        return;
      }
      event.preventDefault();
      setFocus((current) => Math.min(N - 1, Math.max(0, current + event.deltaY * WHEEL_SENS)));
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, [expanded]);

  const go = (id) => {
    smoothScrollTo(`#${id}`);
    setExpanded(false);
    setSheetOpen(false);
  };

  const centered = Math.round(focus);

  return (
    <>
      {/* Desktop rail — a compact dot column that fans into a camera-style dial on hover. */}
      <nav
        ref={navRef}
        aria-label="Section navigation"
        onMouseEnter={(event) => {
          setExpanded(true);
          trackPointer(event.clientY);
        }}
        onMouseLeave={() => {
          setExpanded(false);
          offsetRef.current = 0;
        }}
        onMouseMove={(event) => {
          if (expanded) {
            trackPointer(event.clientY);
          }
        }}
        data-lenis-prevent
        className={`fixed left-2 top-1/2 z-30 hidden -translate-y-1/2 lg:block ${
          expanded ? 'h-[462px] w-[248px]' : 'h-[220px] w-16'
        } transition-[width,height] duration-500 ease-out`}
      >
        {/* Semicircular disk backdrop */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute left-0 top-1/2 -translate-y-1/2 rounded-r-full border border-line bg-surface/70 backdrop-blur transition-all duration-500 ease-out ${
            expanded ? 'h-[420px] w-[198px] opacity-100' : 'h-[200px] w-10 opacity-0'
          }`}
        />

        {/* Fixed focus marker at the dial's center — the item ringed here is selected. */}
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute top-1/2 h-6 w-6 -translate-y-1/2 rounded-pill border border-ember/50 transition-opacity duration-500 ${
            expanded ? 'opacity-70' : 'opacity-0'
          }`}
          style={{ left: `${BASE_X - 8}px` }}
        />

        {sections.map(({ id, label }, i) => {
          const dist = i - focus;
          const theta = (dist * STEP * Math.PI) / 180;
          const x = expanded ? Math.max(6, BASE_X - R * (1 - Math.cos(theta))) : 4;
          const y = expanded ? R * Math.sin(theta) : (i - (N - 1) / 2) * GAP;
          const away = Math.abs(dist);
          const scale = expanded ? Math.max(0.6, 1 - away * 0.12) : 0.9;
          const opacity = expanded ? Math.max(0, 1 - away * 0.26) : 1;
          const isCentered = expanded && i === centered;
          const isActive = active === id;
          const lit = isCentered || (!expanded && isActive);
          return (
            <button
              key={id}
              type="button"
              onClick={() => go(id)}
              aria-current={isActive ? 'true' : undefined}
              style={{
                transform: `translate(${x}px, calc(${y}px - 50%)) scale(${scale})`,
                transformOrigin: 'left center',
                opacity,
                pointerEvents: opacity < 0.08 ? 'none' : undefined
              }}
              className="absolute left-0 top-1/2 flex items-center gap-3 rounded-pill py-1.5 pl-1 text-left transition-[transform,opacity] duration-500 ease-out will-change-transform focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember motion-reduce:transition-none"
            >
              <span
                aria-hidden="true"
                className={`h-2.5 w-2.5 shrink-0 rounded-pill transition-all duration-300 ${
                  lit
                    ? 'scale-110 bg-gradient-to-b from-emberBright to-ember shadow-ember'
                    : isActive
                      ? 'border border-ember/60 bg-ember/40'
                      : 'border border-ember/40 bg-transparent'
                }`}
              />
              <span
                className={`overflow-hidden whitespace-nowrap font-mono text-xs uppercase tracking-[0.14em] transition-all duration-300 ${
                  expanded ? 'max-w-[130px] opacity-100' : 'max-w-0 opacity-0'
                } ${isCentered ? 'text-emberBright' : 'text-muted'}`}
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
          className="fixed bottom-5 left-5 z-40 inline-flex h-12 w-12 items-center justify-center rounded-pill border border-ember/50 bg-gradient-to-b from-emberBright to-ember text-[#111A2B] shadow-gloss transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
        >
          {sheetOpen ? <FaXmark aria-hidden="true" /> : <FaBars aria-hidden="true" />}
        </button>
      </div>
    </>
  );
};

export default IndexRail;
