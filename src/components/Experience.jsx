import SectionTitle from './SectionTitle';
import { experiences } from '../data/siteData';

const Experience = () => {
  return (
    <section id="experience" className="section-shell">
      <SectionTitle
        eyebrow="Experience"
        title="Professional and academic timeline"
        description="A path shaped by product-focused engineering, collaboration, and continuous improvement."
      />
      <div className="relative pl-6 md:pl-10">
        <div className="absolute left-2 top-2 h-[calc(100%-12px)] w-px bg-gradient-to-b from-cyan to-transparent md:left-3" />
        <div className="space-y-6">
          {experiences.map((exp) => (
            <article
              key={`${exp.title}-${exp.period}`}
              className="relative rounded-2xl border border-white/10 bg-panel/80 p-5"
            >
              <span className="absolute -left-[1.45rem] top-6 h-3 w-3 rounded-full border border-cyan/80 bg-bg md:-left-[2.15rem]" />
              <p className="text-xs uppercase tracking-[0.2em] text-cyan">{exp.period}</p>
              <h3 className="mt-2 font-display text-xl text-white">{exp.title}</h3>
              <p className="mt-1 text-sm text-electric">{exp.organization}</p>
              <p className="mt-3 text-sm leading-6 text-slate-300">{exp.details}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
