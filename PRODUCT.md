# Product

## Register

brand

## Users

Technical peers and evaluators who land here to gauge Ankit quickly: security club members and CTF teammates, recruiters and hiring managers scanning for cybersecurity/infrastructure aptitude, and fellow students or homelab hobbyists following the work. They arrive skeptical and short on time, often from a GitHub or LinkedIn link, frequently on mobile. The job to be done: understand *who this person is and what they can actually do* within seconds, then dig into a project or two if intrigued. Success is the visitor leaving with a concrete, credible impression of hands-on capability — not a list of buzzwords.

## Product Purpose

A personal portfolio for Ankit Bembalgi (CS student at PES University, cybersecurity & AI) that showcases real work — homelab infrastructure, cyber-deception/honeypot telemetry, a distributed telemetry collection system — alongside CTF activity, skills, and background. It exists to convert a cold link into an interested reader and, ideally, an opportunity (internship, collaboration, club/CTF connection). Success looks like: the work reads as genuinely hands-on and self-driven, the site itself demonstrates craft (the medium proving the message), and a visitor can go from landing to a project detail page without friction.

## Brand Personality

Experimental and bold, sharp, systems-minded. Voice is confident and specific — it shows the build rather than claiming the title. The site should feel like it was made by someone who breaks and rebuilds systems for fun: willing to take a visual risk, unafraid of strangeness, but always in control. Emotional goal: intrigue and credibility. A visitor should think "how was this made?" and "this person clearly *does* the work," not "nice template."

## Anti-references

- **Generic dev-portfolio template.** The cookie-cutter "Hi, I'm X / My Skills / My Projects" React starter every bootcamp grad ships. Same hero, same skill-bar grid, same three identical project cards. This is the primary thing to avoid.
- **Corporate / enterprise stiffness.** SaaS-cream backgrounds, stock office photos, LinkedIn-headshot blandness, safe-and-invisible layouts. This site should read as a practitioner's, not an HR brochure.
- **Cluttered / busy.** Too much competing for attention, weak hierarchy, no breathing room. Bold does not mean noisy — one dominant idea per fold, deliberate pacing.

## Design Principles

- **Show the build, don't claim the title.** Prefer concrete artifacts — architecture diagrams, real screenshots, telemetry, project internals — over adjective lists. Evidence over assertion.
- **The medium is the proof.** The site's own craft is a work sample. If it looks generated or templated, it undercuts the message; polish and intentional detail are part of the argument.
- **Bold, not noisy.** Take real visual and motion risks, but keep one dominant idea per section and strong hierarchy. Strangeness in service of clarity, never clutter.
- **Respect the skeptical, time-poor reader.** Land the who/what/why fast, make the path to a project detail frictionless, and hold up on mobile.
- **Preserve the committed identity.** The dark-neon system (near-black navy, cyan/electric-blue/mint, Space Grotesk + Manrope, glow + float/pulse motion) is already shipping and is the brand — evolve and sharpen it rather than restyling from scratch.

## Accessibility & Inclusion

Target WCAG 2.1 AA baseline. Given the dark theme and neon accents, the live risk is contrast: verify body text hits ≥4.5:1 and large/bold text ≥3:1 against the dark and panel backgrounds (muted blue-gray body text on dark navy is the likely offender), and ensure neon accents used as text or meaningful UI clear the same bars. Full keyboard operability and visible focus states on all interactive elements (nav, project cards/links, contact tiles, back-to-top). A `prefers-reduced-motion` alternative for the float, pulse-glow, and scroll-reveal animations is a strong recommendation even though motion handling wasn't set as a hard requirement.
