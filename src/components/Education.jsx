import Reveal from './Reveal';
import { education } from '../data/siteData';

const Education = () => {
  return (
    <section id="education" className="section-shell">
      <Reveal>
        <div className="border-t border-line pt-10">
          <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">Education</p>
          <h2
            className="mt-5 font-display text-4xl font-bold leading-[1.05] text-ink md:text-5xl"
            style={{ letterSpacing: '-0.02em', textWrap: 'balance' }}
          >
            {education.university}
          </h2>
          <p className="mt-5 max-w-2xl text-lg leading-[1.6] text-muted">{education.degree}</p>
          <p className="mt-6 inline-flex font-mono text-sm text-emberBright">{education.duration}</p>
        </div>
      </Reveal>
    </section>
  );
};

export default Education;
