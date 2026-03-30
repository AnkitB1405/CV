import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa6';
import { profile } from '../data/siteData';
import Reveal from './Reveal';
import profileImage from '../../profilepic.jpeg';

const socialLinks = [
  { label: 'GitHub', href: profile.github, icon: FaGithub },
  { label: 'LinkedIn', href: profile.linkedin, icon: FaLinkedin },
  { label: 'Email', href: `mailto:${profile.email}`, icon: FaEnvelope }
];

const Hero = () => {
  return (
    <section id="home" className="relative overflow-hidden pt-20 md:pt-24">
      <div className="absolute left-1/2 top-0 -z-10 h-[460px] w-[460px] -translate-x-1/2 rounded-full bg-cyan/20 blur-[120px]" />
      <div className="mx-auto grid w-[min(1120px,92%)] gap-12 pb-24 lg:grid-cols-[minmax(0,1.08fr)_minmax(340px,0.72fr)] lg:items-center md:pb-28">
        <Reveal>
          <div className="mx-auto w-full max-w-[42rem] lg:mx-0">
            <p className="mb-4 inline-flex rounded-full border border-electric/50 bg-electric/10 px-4 py-1 text-xs uppercase tracking-[0.22em] text-electric">
              {profile.location}
            </p>
            <h1 className="font-display text-4xl font-bold leading-tight text-white md:text-6xl">
              {profile.name}
            </h1>
            <h2 className="mt-4 text-xl font-semibold text-cyan md:text-2xl">{profile.role}</h2>
            <p className="mt-6 max-w-2xl text-base text-slate-300 md:text-lg">{profile.tagline}</p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="#projects"
                className="rounded-full bg-cyan px-6 py-3 text-sm font-semibold text-slate-900 transition hover:-translate-y-0.5 hover:shadow-neon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
              >
                View Projects
              </a>
              <a
                href={profile.resumeUrl}
                className="rounded-full border border-cyan/50 bg-white/5 px-6 py-3 text-sm font-semibold text-cyan transition hover:-translate-y-0.5 hover:bg-cyan/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
                download
              >
                Download Resume
              </a>
            </div>

            <div className="mt-6 flex flex-wrap gap-3">
              {socialLinks.map(({ label, href, icon: Icon }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('mailto:') ? undefined : '_blank'}
                  rel={href.startsWith('mailto:') ? undefined : 'noreferrer'}
                  aria-label={label}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 transition duration-300 hover:-translate-y-1 hover:border-cyan/60 hover:text-cyan hover:shadow-neon focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan"
                >
                  <Icon aria-hidden="true" />
                </a>
              ))}
            </div>

            <div className="mt-10 rounded-[2rem] border border-cyan/20 bg-panel/75 p-5 shadow-card">
              <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Core Focus</p>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {profile.expertise.map((item) => (
                  <li
                    key={item}
                    className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 transition duration-300 hover:-translate-y-1 hover:border-cyan/45 hover:shadow-neon"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Reveal>

        <Reveal delay={110} className="animate-float">
          <div className="relative flex justify-center lg:justify-center">
            <div className="relative h-72 w-72 rounded-full border border-cyan/35 bg-gradient-to-br from-cyan/20 via-electric/15 to-transparent p-2 shadow-neon md:h-80 md:w-80 xl:h-[21.5rem] xl:w-[21.5rem]">
              <div
                className="absolute -inset-5 -z-10 rounded-full bg-cyan/15 blur-3xl"
                aria-hidden="true"
              />
              <div
                className="absolute inset-2 rounded-full border border-white/10"
                aria-hidden="true"
              />
              <img
                src={profileImage}
                alt={`${profile.name} portrait`}
                className="h-full w-full rounded-full object-cover object-[center_22%] scale-110"
              />
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
};

export default Hero;
