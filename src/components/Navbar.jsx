import { FaArrowDown, FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa6';
import { profile } from '../data/siteData';
import { navigateTo } from '../utils/navigation';

const socialLinks = [
  { label: 'GitHub', href: profile.github, icon: FaGithub },
  { label: 'LinkedIn', href: profile.linkedin, icon: FaLinkedin },
  { label: 'Email', href: `mailto:${profile.email}`, icon: FaEnvelope }
];

const Navbar = () => {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/80 backdrop-blur-xl">
      <nav className="mx-auto flex w-[min(1180px,92%)] items-center justify-between gap-4 py-4">
        <a
          href="/"
          onClick={(event) => {
            event.preventDefault();
            navigateTo('/');
          }}
          className="shrink-0 font-display text-lg font-bold tracking-tight text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          AB<span className="text-ember">.</span>
        </a>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={profile.resumeUrl}
            download
            className="inline-flex items-center gap-2 rounded-pill border border-ember/45 bg-ember/10 px-4 py-2 text-sm font-semibold text-emberBright transition hover:-translate-y-0.5 hover:border-ember/70 hover:bg-ember/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
          >
            Résumé
            <FaArrowDown aria-hidden="true" className="text-xs" />
          </a>

          {socialLinks.map(({ label, href, icon: Icon }) => (
            <a
              key={label}
              href={href}
              target={href.startsWith('mailto:') ? undefined : '_blank'}
              rel={href.startsWith('mailto:') ? undefined : 'noreferrer'}
              aria-label={label}
              className="inline-flex h-10 w-10 items-center justify-center rounded-pill border border-line bg-surface text-muted transition hover:-translate-y-0.5 hover:border-ember/60 hover:text-emberBright focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ember"
            >
              <Icon aria-hidden="true" />
            </a>
          ))}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
