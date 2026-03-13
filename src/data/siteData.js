// Centralized content model for easy portfolio updates without touching UI components.
export const profile = {
  name: 'Ankit Bembalgi',
  role: 'Cybersecurity & AI Enthusiast',
  location: 'India',
  tagline:
    'Cybersecurity and AI enthusiast exploring systems through CTF challenges, homelab experimentation, and practical hands-on learning. I enjoy building, breaking, and understanding systems at a deeper level.',
  aboutParagraphs: [
    'I am a Computer Science student at PES University with a strong interest in cybersecurity, systems engineering, and artificial intelligence.',
    'Much of my learning comes from experimentation. I maintain an active homelab environment where I deploy self-hosted services, experiment with containers and automation tools, and test new technologies in a controlled environment.',
    'I enjoy solving Capture The Flag (CTF) challenges which allow me to explore vulnerabilities, reverse engineering problems, and real-world security concepts.',
    'I am also a member of LAYER8, the official cybersecurity club of PES University.'
  ],
  expertise: [
    'Offensive Security & CTF Challenges',
    'Homelab Infrastructure Engineering',
    'Linux Systems & Automation',
    'Local AI & Self-Hosted Tools'
  ],
  email: 'ankitbembalgi@gmail.com',
  github: 'https://github.com/AnkitB1405',
  linkedin: 'https://www.linkedin.com/in/ankit-bembalgi-b65b55297/',
  resumeUrl: '/resume.pdf'
};

export const education = {
  university: 'PES University EC Campus',
  degree:
    'B.Tech in Computer Science and Engineering (Artificial Intelligence and Machine Learning)',
  duration: '2024 - 2028'
};

export const skills = {
  programmingLanguages: ['Python', 'C', 'JavaScript', 'Bash / Shell'],
  webTechnologies: ['HTML5', 'JavaScript'],
  systemsAndInfrastructure: ['Linux', 'Docker', 'Networking', 'Self-hosted services', 'Containerization'],
  developerTools: ['Git', 'VS Code', 'Docker']
};

export const projects = [
  {
    slug: 'homelab-infrastructure',
    title: 'HomeLab',
    detailTitle: 'Homelab Infrastructure',
    description:
      'Personal homelab environment for experimenting with self-hosted services, virtualization, containers, and practical infrastructure workflows in a controlled sandbox.',
    problem:
      'I wanted a space where I could safely experiment with systems, networking configurations, and deployment workflows without affecting my main environment.',
    keyFeatures: [
      'Virtualized infrastructure using Proxmox.',
      'Containerized applications for experimentation and self-hosted services.',
      'Workflow automation using n8n.',
      'Environment for testing locally hosted AI models.'
    ],
    technologies: ['Proxmox', 'Docker', 'Linux', 'Self-hosted services'],
    learned: [
      'Container orchestration fundamentals.',
      'Infrastructure organization.',
      'Service isolation and system stability.',
      'Experimentation with self-hosted tools.'
    ],
    github: ''
  },
  {
    slug: 'telemetry-collection-system',
    title: 'Telemetry Collection System',
    status: 'in-progress',
    statusLabel: 'In Progress',
    description:
      'Distributed telemetry platform for collecting client-side system data, analyzing network behavior, and building toward centralized observability.',
    problem:
      'I wanted to understand how telemetry pipelines work end to end, from lightweight collection on distributed clients to secure transport and centralized analysis.',
    keyFeatures: [
      'Client-server architecture for collecting telemetry from multiple endpoints.',
      'UDP-based ingestion pipeline for lightweight data transfer.',
      'TLS support for encrypted telemetry exchange.',
      'Packet loss monitoring and telemetry analysis for network visibility.',
      'Dashboard-oriented design for future visualization.'
    ],
    technologies: ['Client-Server Architecture', 'UDP', 'TLS', 'Telemetry Analysis', 'Dashboard'],
    learned: [
      'Tradeoffs between transport efficiency and reliability.',
      'How secure channels affect distributed system design.',
      'Telemetry aggregation patterns for monitoring workflows.',
      'Incremental development of observability-focused systems.'
    ],
    github: ''
  },
  {
    slug: 'active-cyber-deception',
    title: 'Active Cyber Deception',
    status: 'in-progress',
    statusLabel: 'In Progress',
    description:
      'Honeypot-driven security project focused on capturing attacker activity, surfacing adversary behavior, and feeding analysis into a Wazuh-based visibility layer.',
    problem:
      'I wanted to explore how deception systems can be used to observe attacker behavior safely while producing useful telemetry for analysis and alerting.',
    keyFeatures: [
      'Honeypot services designed to attract and log malicious interactions.',
      'Attack telemetry collection from adversary activity.',
      'Wazuh integration for visualization, analysis, and alerting.',
      'Security-focused environment for identifying vulnerabilities and attack paths.'
    ],
    technologies: ['Cybersecurity', 'Honeypot', 'Wazuh SIEM', 'Telemetry Analysis'],
    learned: [
      'How deceptive infrastructure can improve security visibility.',
      'Methods for analyzing attacker behavior using telemetry.',
      'Practical considerations when integrating a SIEM into a lab setup.',
      'How to design safer environments for adversarial experimentation.'
    ],
    github: ''
  }
];

export const experiments = [
  {
    title: 'CTF Writeups',
    description:
      'Structured notes and future walkthroughs covering web, reverse engineering, binary, and forensics challenges.'
  },
  {
    title: 'Homelab Experiments',
    description:
      'Short logs of infrastructure changes, service deployments, networking tests, and self-hosted tooling experiments.'
  },
  {
    title: 'Security Notes',
    description:
      'A growing knowledge base for concepts, tooling, vulnerabilities, and lessons from hands-on security practice.'
  }
];

export const experiences = [
  {
    period: '2024 - Present',
    title: 'Member',
    organization: 'LAYER8, PES University',
    details:
      'Participating in cybersecurity-focused activities, collaborative learning sessions, and practical security exploration with peers.'
  },
  {
    period: '2024 - Present',
    title: 'CTF Learner',
    organization: 'Independent Practice',
    details:
      'Regularly solving Capture The Flag challenges to strengthen practical skills in system security, analysis, and problem solving.'
  },
  {
    period: '2024 - Present',
    title: 'Homelab Practitioner',
    organization: 'Personal Lab Environment',
    details:
      'Building and maintaining self-hosted environments for networking experiments, containerized services, and workflow automation.'
  }
];

export const awards = [
  {
    title: 'Python (Basic)',
    organization: 'HackerRank',
    year: '2024',
    earnedOn: '24 Dec 2024',
    credentialId: '9899F4144171',
    description: 'Passed the HackerRank skill certification test for Python (Basic).',
    imageUrl: '/download.png'
  }
];

export const seo = {
  home: {
    title: 'Ankit Bembalgi | Cybersecurity & AI Enthusiast',
    description:
      'Portfolio website of Ankit Bembalgi showcasing projects, homelab experiments, cybersecurity interests, and technical work.'
  },
  projects: {
    title: 'Projects | Ankit Bembalgi',
    description:
      'Detailed project breakdowns covering homelab infrastructure, telemetry systems, cybersecurity experimentation, and technical exploration.'
  }
};
