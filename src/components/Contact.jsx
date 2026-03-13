import { FaEnvelope, FaGithub, FaLinkedin } from 'react-icons/fa6';
import SectionTitle from './SectionTitle';
import Reveal from './Reveal';
import { profile } from '../data/siteData';

const contactLinks = [
  {
    label: 'GitHub',
    href: profile.github,
    icon: FaGithub,
    external: true
  },
  {
    label: 'LinkedIn',
    href: profile.linkedin,
    icon: FaLinkedin,
    external: true
  },
  {
    label: 'Email',
    href: `mailto:${profile.email}`,
    icon: FaEnvelope
  }
];

const Contact = () => {
  return (
    <section id="contact" className="section-shell">
      <Reveal>
        <SectionTitle
          eyebrow="Contact"
          title="Let us connect"
          description="If you'd like to collaborate, discuss projects, or talk about cybersecurity, feel free to reach out."
        />
      </Reveal>

      <div className="grid gap-4 md:grid-cols-3">
        {contactLinks.map((item, index) => {
          const Icon = item.icon;

          return (
            <Reveal key={item.label} delay={index * 80}>
              <a
                href={item.href}
                target={item.external ? '_blank' : undefined}
                rel={item.external ? 'noreferrer' : undefined}
                className="contact-tile"
                aria-label={item.label}
              >
                <Icon aria-hidden="true" className="text-xl text-cyan" />
                <span>{item.label === 'Email' ? profile.email : item.label}</span>
              </a>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
};

export default Contact;
