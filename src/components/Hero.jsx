import { useEffect, useRef } from 'react';
import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa6';
import { profile } from '../data/siteData';
import Reveal from './Reveal';
import { smoothScrollTo } from '../utils/smoothScroll';
import profileImage from '../../profilepic.jpeg';

const socialLinks = [
  { label: 'GitHub', href: profile.github, icon: FaGithub },
  { label: 'LinkedIn', href: profile.linkedin, icon: FaLinkedin },
  { label: 'Email', href: `mailto:${profile.email}`, icon: FaEnvelope }
];

const Hero = () => {
  const heroRef = useRef(null);
  const lightRef = useRef(null);
  const imageRef = useRef(null);

  useEffect(() => {
    const hero = heroRef.current;
    const light = lightRef.current;
    const image = imageRef.current;

    const noMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const noHover = window.matchMedia('(hover: none)').matches;

    if (noMotion || noHover || !hero) {
      return undefined;
    }

    const onMove = (event) => {
      const rect = hero.getBoundingClientRect();
      if (light) {
        light.style.left = `${event.clientX - rect.left}px`;
        light.style.top = `${event.clientY - rect.top}px`;
        light.style.opacity = '1';
      }
    };

    const onLeave = () => {
      if (light) {
        light.style.opacity = '0';
      }
    };

    const onScroll = () => {
      if (image) {
        image.style.transform = `translateY(${Math.min(window.scrollY * 0.06, 60)}px)`;
      }
    };

    hero.addEventListener('mousemove', onMove);
    hero.addEventListener('mouseleave', onLeave);
    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      hero.removeEventListener('mousemove', onMove);
      hero.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <section id="home" ref={heroRef} className="relative overflow-hidden">
      {/* Cursor-following ember light — hero only, hidden until first move. */}
      <div
        ref={lightRef}
        aria-hidden="true"
        className="pointer-events-none absolute h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 blur-3xl transition-opacity duration-500"
        style={{ background: 'radial-gradient(circle, rgba(45,212,191,0.22), transparent 70%)' }}
      />

      <div className="mx-auto grid w-[min(1180px,92%)] items-center gap-12 pb-[clamp(4rem,10vw,7rem)] pt-24 lg:grid-cols-[1.15fr_0.85fr] lg:pt-28">
        <Reveal className="order-2 lg:order-1">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.24em] text-muted">
              {profile.location} — {profile.role}
            </p>
            <h1
              className="mt-5 font-display font-extrabold leading-[0.98] text-ink"
              style={{ fontSize: 'clamp(2.75rem, 7vw, 5.5rem)', letterSpacing: '-0.03em', textWrap: 'balance' }}
            >
              {profile.name}
            </h1>
            <p className="mt-6 max-w-[60ch] text-lg leading-[1.6] text-muted">{profile.tagline}</p>

            <div className="mt-9 flex flex-wrap gap-4">
              <button
                type="button"
                onClick={() => smoothScrollTo('#projects')}
                className="rounded-pill px-6 py-3 text-sm font-semibold text-[#0C1817] shadow-gloss transition hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
                style={{ background: 'linear-gradient(180deg, #2DD4BF 0%, #14B8A6 48%, #0D9488 100%)' }}
              >
                View Projects
              </button>
              <a
                href={profile.resumeUrl}
                download
                className="rounded-pill border border-line bg-surface px-6 py-3 text-sm font-semibold text-ink transition hover:-translate-y-0.5 hover:border-ember/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
              >
                Download Résumé
              </a>
            </div>

            <div className="mt-8 flex flex-wrap gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={href.startsWith('mailto:') ? undefined : 'noreferrer'}
                  aria-label={label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-pill border border-line bg-surface text-muted transition hover:-translate-y-1 hover:border-ember/60 hover:text-emberBright hover:shadow-ember focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
                >
                  <Icon aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </Reveal>

        <Reveal delay={120} className="order-1 lg:order-2">
          <div className="group relative mx-auto w-full max-w-[24rem]">
            <div
              aria-hidden="true"
              className="absolute -inset-6 -z-10 rounded-[2rem] opacity-70 blur-3xl transition-all duration-500 group-hover:-inset-8 group-hover:opacity-100"
              style={{ background: 'radial-gradient(circle at 50% 40%, rgba(20,184,166,0.42), transparent 70%)' }}
            />
            <div
              ref={imageRef}
              className="overflow-hidden rounded-[1.75rem] border border-ember/25 bg-surface shadow-card transition-[border-color,box-shadow] duration-500 group-hover:border-ember/60 group-hover:shadow-ember"
            >
              <img
                src={profileImage}
                alt={`${profile.name} portrait`}
                className="h-full w-full object-cover object-[50%_22%]"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Hero;
