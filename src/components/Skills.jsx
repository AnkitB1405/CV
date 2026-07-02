import SectionTitle from './SectionTitle';
import Reveal from './Reveal';
import { skills } from '../data/siteData';

const skillSections = [
  { title: 'Programming', items: skills.programmingLanguages },
  { title: 'Web', items: skills.webTechnologies },
  { title: 'Systems', items: skills.systemsAndInfrastructure },
  { title: 'Tools', items: skills.developerTools }
];

const Skills = () => {
  return (
    <section id="skills" className="section-shell">
      <Reveal>
        <SectionTitle
          title="Technical toolkit"
          description="A practical mix of programming, web fundamentals, Linux-oriented infrastructure work, and everyday developer tooling."
        />
      </Reveal>

      <div className="flex flex-col">
        {skillSections.map((section, index) => (
          <Reveal key={section.title} delay={index * 70}>
            <div className="flex flex-col gap-3 border-t border-line py-6 md:flex-row md:items-baseline md:gap-10">
              <h3 className="font-mono text-sm uppercase tracking-[0.16em] text-emberBright md:w-40 md:shrink-0">
                {section.title}
              </h3>
              <ul className="flex flex-wrap gap-2">
                {section.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-pill border border-line bg-surface px-3 py-1.5 text-sm text-ink transition hover:-translate-y-0.5 hover:border-ember/55 hover:text-emberBright"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
};

export default Skills;
