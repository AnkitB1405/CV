import SectionTitle from './SectionTitle';
import Reveal from './Reveal';
import { skills } from '../data/siteData';

const skillSections = [
  { title: 'Programming Languages', items: skills.programmingLanguages },
  { title: 'Web Technologies', items: skills.webTechnologies },
  { title: 'Systems & Infrastructure', items: skills.systemsAndInfrastructure },
  { title: 'Developer Tools', items: skills.developerTools }
];

const Skills = () => {
  return (
    <section id="skills" className="section-shell">
      <Reveal>
        <SectionTitle
          eyebrow="Skills"
          title="Technical toolkit"
          description="A practical mix of programming, web fundamentals, Linux-oriented infrastructure work, and everyday developer tooling."
        />
      </Reveal>

      <div className="grid gap-5 md:grid-cols-2">
        {skillSections.map((section, index) => (
          <Reveal key={section.title} as="article" delay={index * 90}>
            <div className="rounded-2xl border border-white/10 bg-panel/75 p-6 transition duration-300 hover:-translate-y-1 hover:border-electric/60 hover:shadow-neon">
              <h3 className="mb-4 font-display text-xl text-white">{section.title}</h3>
              <ul className="flex flex-wrap gap-2">
                {section.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-full border border-cyan/30 bg-cyan/10 px-3 py-1 text-sm text-cyan"
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
