import SectionTitle from './SectionTitle';
import { skills } from '../data/siteData';

const skillSections = [
  { title: 'Programming Languages', items: skills.programmingLanguages },
  { title: 'Web Technologies', items: skills.webTechnologies },
  { title: 'Tools and Technologies', items: skills.toolsAndTechnologies },
  { title: 'Other Technical Interests / Experience', items: skills.otherTechnicalInterests }
];

const Skills = () => {
  return (
    <section id="skills" className="section-shell">
      <SectionTitle
        eyebrow="Skills"
        title="Technical skill set"
        description="Grouped by languages, web foundations, tools, and practical systems interests."
      />
      <div className="grid gap-5 md:grid-cols-2">
        {skillSections.map((section) => (
          <article
            key={section.title}
            className="rounded-2xl border border-white/10 bg-panel/75 p-6 transition duration-300 hover:border-electric/60"
          >
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
          </article>
        ))}
      </div>
    </section>
  );
};

export default Skills;
