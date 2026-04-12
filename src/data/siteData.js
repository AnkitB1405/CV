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
  resumeUrl: '/Ankit_Bembalgi.pdf'
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
    title: 'Homelab Infrastructure',
    detailTitle: 'Homelab Infrastructure & Self-Hosted Services',
    status: 'in-progress',
    statusLabel: 'In Progress',
    cardDescription:
      'Self-hosted infrastructure lab built for Docker Compose workloads, Samba-backed storage, secure Tailscale access, and isolated cybersecurity testing on a resource-conscious Linux setup. Used to run practical services like Immich and Heimdall while supporting hands-on Linux administration, networking, and lab-based security experimentation.',
    description:
      'A continuously evolving homelab used to practice infrastructure engineering, self-hosting, container operations, and security experimentation through real services that support both daily use and controlled testing.',
    technologies: ['Docker', 'Portainer', 'Tailscale', 'Samba', 'Immich'],
    detailSections: [
      {
        heading: 'Overview',
        paragraphs: [
          'This homelab serves as a practical environment for building and operating self-hosted services while strengthening hands-on experience in Linux administration, networking, and infrastructure design.',
          'It is used both as a personal platform for storage and service hosting and as a controlled sandbox for testing operational changes, new tools, and security-focused workflows without affecting primary systems.'
        ]
      },
      {
        heading: 'Infrastructure & Networking',
        paragraphs: [
          'The environment is organized around a Linux-based host with virtualized and containerized workloads separated by purpose. Virtual machines and lab services are maintained alongside day-to-day self-hosted applications so each part of the environment can be managed with clearer operational boundaries.',
          'Remote administration is handled through a Tailscale mesh VPN for secure remote access, allowing SSH and internal web interfaces to remain reachable from trusted devices without directly exposing management services to the public internet.'
        ]
      },
      {
        heading: 'Containerization & Service Management',
        paragraphs: [
          'Applications are deployed using Docker Compose deployment files that define multi-service stacks, restart policies, persistent volumes, and environment-specific configuration. This makes the homelab easier to reproduce, maintain, and recover after changes.',
          'Portainer is used as an operational management layer for stack deployment, container monitoring, log inspection, and lifecycle administration, making it easier to track service state during iterative testing and upgrades.'
        ]
      },
      {
        heading: 'Self-Hosted Cloud & Media',
        paragraphs: [
          'The lab includes Heimdall for service discovery and dashboard access, along with Immich as a self-hosted photo management platform deployed with PostgreSQL and Redis. Persistent volumes and container data management are used to preserve media libraries, application state, and database data across restarts and updates.',
          'A Samba network-attached storage (NAS) configuration provides centralized file sharing across local devices, giving the environment practical utility beyond experimentation while reinforcing storage and permission management concepts.'
        ]
      },
      {
        heading: 'Cybersecurity Lab',
        paragraphs: [
          'A virtualized vulnerable environment based on Metasploitable is maintained for vulnerability testing, exploitation practice, and safe reproduction of common attack paths in an isolated setting.',
          'This separation allows offensive security practice to remain contained while the rest of the homelab continues to operate as a stable self-hosted environment.'
        ]
      },
      {
        heading: 'System Administration & DevOps',
        paragraphs: [
          'Operating the lab involves routine service troubleshooting, Compose updates, volume mapping, storage planning, network validation, and basic backup awareness. These tasks make the homelab a practical platform for learning repeatable operations rather than only one-time setup work.',
          'Because the host runs under hardware constraints, services are selected and tuned with attention to memory usage, storage footprint, and overall system overhead. That resource-aware approach has been especially useful for learning practical DevOps tradeoffs in a realistic environment.'
        ]
      },
      {
        heading: 'Key Skills & Technologies',
        bullets: [
          'Docker Compose deployment and multi-service container lifecycle management',
          'Portainer-based stack administration, monitoring, and troubleshooting',
          'Tailscale mesh VPN for secure remote access to internal services',
          'Samba network-attached storage (NAS) configuration for centralized file sharing',
          'Self-hosted photo management platform (Immich) with PostgreSQL and Redis',
          'Persistent volumes and container data management for stateful workloads',
          'Virtualized vulnerable environment (Metasploitable) for cybersecurity practice',
          'Linux systems administration, service maintenance, and resource optimization'
        ]
      },
      {
        heading: 'Summary',
        paragraphs: [
          'Overall, the homelab functions as both a personal infrastructure platform and a technical learning environment, combining self-hosting, networking, storage, and cybersecurity experimentation in one hands-on system.'
        ]
      }
    ],
    media: {
      architecture: {
        src: '/images/homelab-architecture.svg',
        alt: 'Architecture diagram showing Tailscale-secured remote access to a Linux homelab with Docker services, NAS storage, and an isolated cybersecurity lab.',
        caption: 'High-level architecture of the homelab, showing the remote access path, service layer, storage layer, and isolated security lab components.'
      },
      placeholders: [
        {
          title: 'Portainer Dashboard Screenshot',
          description: 'Reserved space for a future screenshot of Portainer stack and container management.'
        },
        {
          title: 'Tailscale Access Screenshot',
          description: 'Reserved space for a future screenshot showing secure remote connectivity into the homelab.'
        }
      ]
    },
    github: ''
  },
  {
    slug: 'active-cyber-deception',
    title: 'Active Cyber Deception',
    status: 'in-progress',
    statusLabel: 'In Progress',
    cardDescription:
      'Cyber deception environment designed to attract hostile interaction, capture attacker telemetry from honeypot activity, and feed security events into a Wazuh-based monitoring and analysis workflow. Built to study reconnaissance, intrusion attempts, and adversary behavior through controlled exposure and centralized log visibility.',
    description:
      'An in-progress security project focused on using controlled deception infrastructure to observe attacker behavior, generate actionable telemetry, and study how adversarial activity can be surfaced through centralized monitoring.',
    technologies: ['Honeypots', 'Wazuh', 'Telemetry', 'Detection Engineering', 'SOC Analysis'],
    detailSections: [
      {
        heading: 'Overview',
        paragraphs: [
          'Active Cyber Deception explores how exposed decoy systems can be used to study attacker behavior in a controlled environment while improving visibility into common reconnaissance and exploitation patterns.',
          'The project is designed to combine deception, telemetry collection, and security analysis into a practical lab workflow that mirrors core defensive operations concepts.'
        ]
      },
      {
        heading: 'Deception Infrastructure',
        paragraphs: [
          'The environment uses honeypot-style services and intentionally observable surfaces to attract opportunistic scans, authentication attempts, and malicious interaction while remaining isolated from normal workloads.',
          'This controlled setup makes it possible to collect high-signal activity from hostile traffic without introducing unnecessary risk into other systems.'
        ]
      },
      {
        heading: 'Telemetry & Detection',
        paragraphs: [
          'Security events generated by the deception layer are forwarded into a Wazuh-based visibility stack for log analysis, event review, and alert-oriented monitoring.',
          'The focus is on understanding how raw attacker interactions can be transformed into structured telemetry that supports investigation and detection engineering.'
        ]
      },
      {
        heading: 'Threat Analysis Workflow',
        paragraphs: [
          'Collected activity is reviewed for scanning behavior, repeated source patterns, credential attack attempts, and common probing techniques seen against exposed services.',
          'This analysis-first approach helps build familiarity with attacker tradecraft while also highlighting which events are worth escalating into stronger detections or enriched alerting logic.'
        ]
      },
      {
        heading: 'Operational Engineering',
        paragraphs: [
          'Building the project requires attention to safe exposure boundaries, log routing, service tuning, and noise reduction so the resulting telemetry remains useful rather than overwhelming.',
          'Because the project is still in progress, the current emphasis is on refining the deception surface and improving the quality of the signals sent to the monitoring layer.'
        ]
      },
      {
        heading: 'Key Skills & Technologies',
        bullets: [
          'Honeypot and deception-environment design',
          'Wazuh-based log analysis and alert visibility',
          'Telemetry collection from adversarial interaction',
          'Threat activity review and attacker behavior analysis',
          'Security monitoring workflow design in a controlled lab environment'
        ]
      },
      {
        heading: 'Summary',
        paragraphs: [
          'This project ties together deception, event collection, and security analysis to create a practical environment for understanding how attackers behave and how defenders can capture that behavior in useful telemetry.'
        ]
      }
    ],
    github: 'https://github.com/AnkitB1405/Cowrie-Setup'
  },
  {
    slug: 'telemetry-collection-system',
    title: 'Telemetry Collection System',
    cardDescription:
      'Distributed telemetry pipeline for collecting endpoint data over UDP and TLS, measuring delivery reliability, and building toward centralized observability, transport analysis, and future dashboard visibility. Focused on lightweight client-server collection, secure transport design, and understanding how telemetry systems behave under real network conditions.',
    description:
      'A systems project centered on understanding telemetry collection end to end, from lightweight data generation on distributed clients to secure transport, aggregation, and analysis on the server side.',
    technologies: ['Client-Server', 'UDP', 'TLS', 'Telemetry Analysis', 'Observability'],
    detailSections: [
      {
        heading: 'Overview',
        paragraphs: [
          'The Telemetry Collection System is focused on building a distributed pipeline that captures system and network data from multiple clients and routes it to a central service for analysis.',
          'The project is intended to strengthen practical understanding of observability workflows, network-aware system design, and the tradeoffs involved in moving telemetry at scale.'
        ]
      },
      {
        heading: 'Collection Architecture',
        paragraphs: [
          'The design follows a client-server architecture where lightweight endpoint components generate telemetry and forward it to a central collector for aggregation and inspection.',
          'This structure provides a clean foundation for expanding from basic transport and parsing into richer telemetry processing and dashboard-driven visibility.'
        ]
      },
      {
        heading: 'Transport & Security',
        paragraphs: [
          'UDP is used to explore low-overhead telemetry transport and the engineering tradeoffs that come with connectionless communication. TLS support is being incorporated to understand how secure transport affects deployment complexity and trust boundaries.',
          'Working through these protocol choices has been useful for comparing efficiency, reliability, and operational safety in a distributed telemetry pipeline.'
        ]
      },
      {
        heading: 'Analytics & Reliability',
        paragraphs: [
          'The system includes packet loss monitoring and telemetry analysis to evaluate how effectively data is moving from clients to the collector under varying network conditions.',
          'That focus on delivery behavior helps connect raw transport mechanics with higher-level observability concerns such as data completeness, confidence, and monitoring quality.'
        ]
      },
      {
        heading: 'Engineering Focus',
        paragraphs: [
          'The project is being built incrementally, with emphasis on transport handling, secure communication, central processing, and future visualization layers.',
          'This staged approach makes it easier to validate each part of the telemetry path while keeping the architecture open for later expansion into dashboards and richer analytics.'
        ]
      },
      {
        heading: 'Key Skills & Technologies',
        bullets: [
          'Client-server telemetry architecture design',
          'UDP-based ingestion and transport tradeoff analysis',
          'TLS-enabled secure communication for distributed systems',
          'Packet loss monitoring and telemetry reliability evaluation',
          'Centralized observability workflow design'
        ]
      },
      {
        heading: 'Summary',
        paragraphs: [
          'Overall, this project is a hands-on study of how telemetry systems are built, secured, and evaluated, with a strong focus on transport behavior, centralized analysis, and observability-oriented engineering.'
        ]
      }
    ],
    github: 'https://github.com/AnkitB1405/Telemetry-Collection-System'
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
