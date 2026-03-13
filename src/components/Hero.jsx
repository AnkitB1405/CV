import { profile } from '../data/siteData';

const Hero = () => {
  return (
    <section id="home" className="relative overflow-hidden pt-20 md:pt-24">
      <div className="absolute left-1/2 top-0 -z-10 h-[460px] w-[460px] -translate-x-1/2 rounded-full bg-cyan/20 blur-[120px]" />
      <div className="mx-auto grid w-[min(1100px,92%)] gap-10 pb-24 md:grid-cols-[1.2fr_0.8fr] md:pb-28">
        <div>
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
        </div>

        <div className="animate-float">
          <div className="rounded-3xl border border-cyan/30 bg-panel/90 p-6 shadow-card">
            <p className="text-sm uppercase tracking-[0.2em] text-slate-400">Core Focus</p>
            <ul className="mt-5 space-y-3">
              {profile.heroHighlights.map((item) => (
                <li
                  key={item}
                  className="rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200"
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
