import SectionTitle from './SectionTitle';
import Reveal from './Reveal';
import { education } from '../data/siteData';

const Education = () => {
  return (
    <section id="education" className="section-shell">
      <Reveal>
        <SectionTitle
          eyebrow="Education"
          title="Academic background"
          description="Current degree program and university details."
        />
      </Reveal>

      <Reveal delay={80}>
        <article className="rounded-2xl border border-white/10 bg-panel/80 p-6">
          <h3 className="font-display text-2xl text-white">{education.university}</h3>
          <p className="mt-3 text-slate-200">{education.degree}</p>
          <p className="mt-4 inline-flex rounded-full border border-cyan/40 bg-cyan/10 px-3 py-1 text-sm text-cyan">
            {education.duration}
          </p>
        </article>
      </Reveal>
    </section>
  );
};

export default Education;
