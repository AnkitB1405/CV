import SectionTitle from './SectionTitle';
import { education } from '../data/siteData';

const Education = () => {
  return (
    <section id="education" className="section-shell">
      <SectionTitle
        eyebrow="Education"
        title="Academic Background"
        description="Current degree program and university details."
      />

      <article className="rounded-2xl border border-white/10 bg-panel/80 p-6">
        <h3 className="font-display text-2xl text-white">{education.university}</h3>
        <p className="mt-3 text-slate-200">{education.degree}</p>
        <p className="mt-4 inline-flex rounded-full border border-cyan/40 bg-cyan/10 px-3 py-1 text-sm text-cyan">
          {education.duration}
        </p>
      </article>
    </section>
  );
};

export default Education;
