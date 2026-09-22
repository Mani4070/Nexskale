export type ServiceDetail = {
  headline: string;
  bestFor: string;
  deliverables: [string, string][];
  process: [string, string][];
  technologies: string[];
  faq: [string, string][];
};

export const serviceDetails: Record<string, ServiceDetail> = {
  web: {
    headline: "Web experiences built for business.",
    bestFor:
      "Businesses replacing a legacy website, launching a customer portal or bringing an operational workflow online.",
    deliverables: [
      [
        "Responsive application",
        "Interfaces for desktop, tablet and mobile, with keyboard navigation and accessible interaction patterns.",
      ],
      [
        "Connected systems",
        "APIs and integrations for your CRM, payments, content management and existing business systems.",
      ],
      [
        "Performance foundations",
        "Rendering, asset delivery, technical SEO and measurement configured around your application’s needs.",
      ],
      [
        "Launch and handover",
        "Tested releases, deployment configuration, source code and documentation your team can use.",
      ],
    ],
    process: [
      [
        "Define",
        "Map user journeys, integrations and measurable acceptance criteria.",
      ],
      [
        "Design",
        "Validate the information architecture and key workflows with prototypes.",
      ],
      [
        "Build",
        "Deliver working increments with code reviews and functional testing.",
      ],
      [
        "Release",
        "Validate performance, accessibility and production readiness before handover.",
      ],
    ],
    technologies: ["React", "Next.js", "TypeScript", "Node.js", "PostgreSQL"],
    faq: [
      [
        "Can you modernize our existing application?",
        "Yes. We first review the codebase and business constraints, then recommend an incremental upgrade or a rebuild with a migration plan.",
      ],
      [
        "Can our team update the content?",
        "We can integrate a content management system with editing roles, previews and publishing workflows as part of the agreed scope.",
      ],
    ],
  },
  mobile: {
    headline: "Your business. In your customers’ hands.",
    bestFor:
      "Customer-facing products, field teams and businesses that need an iOS and Android experience beyond a mobile website.",
    deliverables: [
      [
        "iOS and Android apps",
        "A native or cross-platform approach selected around device requirements, performance and long-term maintenance.",
      ],
      [
        "Connected workflows",
        "Authentication, API integration, notifications and device capabilities scoped to your product.",
      ],
      [
        "Resilient experiences",
        "Loading, failure and connectivity states designed explicitly, with offline workflows where needed.",
      ],
      [
        "Store readiness",
        "Device testing, release builds, store submission support and a documented update process.",
      ],
    ],
    process: [
      [
        "Plan",
        "Define supported devices, user journeys and platform requirements.",
      ],
      [
        "Prototype",
        "Test navigation and core interactions before development.",
      ],
      [
        "Develop",
        "Build the application and integrations, validating on real devices.",
      ],
      [
        "Launch",
        "Prepare listings, address review feedback and establish release monitoring.",
      ],
    ],
    technologies: ["React Native", "Flutter", "Swift", "Kotlin", "Firebase"],
    faq: [
      [
        "Should we choose native or cross-platform?",
        "We assess device integrations, interface expectations, budget and team. Cross-platform shares more code; native may better suit specialized device features.",
      ],
      [
        "Do you help with app store submissions?",
        "Yes. We help prepare releases and submission materials. Store accounts remain under your ownership, and approval timing is controlled by the stores.",
      ],
    ],
  },
  ai: {
    headline: "Practical AI. Measurable business value.",
    bestFor:
      "Teams managing high volumes of documents, repeated support questions or manual steps across disconnected tools.",
    deliverables: [
      [
        "Knowledge assistants",
        "Question-answering over approved sources, with source references and access-aware retrieval.",
      ],
      [
        "Workflow automation",
        "Integrations that classify, route and draft information, with approval steps for consequential actions.",
      ],
      [
        "Document processing",
        "Extraction and validation pipelines for business documents, including handling for uncertain results.",
      ],
      [
        "Evaluation and monitoring",
        "Representative test cases, quality checks, usage visibility and an ongoing improvement plan.",
      ],
    ],
    process: [
      [
        "Assess",
        "Choose a bounded use case and agree on data access, risks and success measures.",
      ],
      [
        "Validate",
        "Prototype with representative data and compare against a baseline.",
      ],
      [
        "Integrate",
        "Connect approved tools, permissions and human review workflows.",
      ],
      [
        "Evaluate",
        "Test failure cases, monitor costs and refine quality with real feedback.",
      ],
    ],
    technologies: [
      "Python",
      "Model APIs",
      "RAG",
      "Vector databases",
      "Workflow integrations",
    ],
    faq: [
      [
        "Do we need to train our own model?",
        "Often an integration or retrieval system is enough. We evaluate existing models first and recommend customization only when the use case and data justify it.",
      ],
      [
        "How do you handle inaccurate answers?",
        "We use evaluation datasets, source grounding, constrained actions and human review where appropriate. We define fallback behavior because model outputs can be incorrect.",
      ],
    ],
  },
  saas: {
    headline: "From product vision to a scalable platform.",
    bestFor:
      "New SaaS ventures and established businesses launching a subscription product or modernizing an existing platform.",
    deliverables: [
      [
        "Focused MVP",
        "An agreed release scope built around the core customer problem, with a prioritized product backlog.",
      ],
      [
        "Tenant and access model",
        "Organization workspaces, permissions and data boundaries appropriate to your customers.",
      ],
      [
        "Subscriptions and billing",
        "Plan selection, payment integration and subscription lifecycle handling, including failure states.",
      ],
      [
        "Product operations",
        "Administration tools, analytics events, onboarding flows and deployment documentation.",
      ],
    ],
    process: [
      [
        "Discover",
        "Validate the customer problem and define the smallest useful release.",
      ],
      ["Architect", "Plan tenancy, permissions, billing and the data model."],
      [
        "Deliver",
        "Build in short iterations with regular product reviews and testing.",
      ],
      [
        "Evolve",
        "Launch, review usage and prioritize improvements from customer feedback.",
      ],
    ],
    technologies: [
      "React",
      "TypeScript",
      "PostgreSQL",
      "Stripe",
      "Cloud platforms",
    ],
    faq: [
      [
        "Can we start with an MVP?",
        "Yes. We define a coherent first release that tests the product’s central value, with deliberate choices about what can wait.",
      ],
      [
        "Who owns the source code?",
        "Ownership, repository access and handover are established in the project agreement. We plan for your team to operate and extend the platform.",
      ],
    ],
  },
  cloud: {
    headline: "Infrastructure your team can depend on.",
    bestFor:
      "Teams dealing with manual deployments, growing infrastructure costs, inconsistent environments or a planned cloud migration.",
    deliverables: [
      [
        "Cloud architecture",
        "A documented design covering networking, identity, storage and application workloads.",
      ],
      [
        "Delivery pipelines",
        "Automated build, test and deployment workflows with environment controls and rollback procedures.",
      ],
      [
        "Infrastructure as code",
        "Versioned infrastructure definitions and configuration practices that make changes reviewable.",
      ],
      [
        "Operational readiness",
        "Monitoring, alerts, backup and recovery procedures, and runbooks for your operations team.",
      ],
    ],
    process: [
      [
        "Audit",
        "Review current infrastructure, delivery processes, costs and risks.",
      ],
      [
        "Plan",
        "Agree on architecture, migration stages and recovery requirements.",
      ],
      [
        "Implement",
        "Test environments and pipelines, migrating in controlled stages.",
      ],
      [
        "Operate",
        "Validate alerts and recovery procedures and hand over runbooks.",
      ],
    ],
    technologies: ["AWS", "Google Cloud", "Docker", "Terraform", "CI/CD"],
    faq: [
      [
        "Can you work with our cloud provider?",
        "We begin with your current environment and constraints. A provider migration is recommended only when it supports the agreed business and technical goals.",
      ],
      [
        "Will migration require downtime?",
        "We assess this during planning. Where practical, we use staged cutovers and rollback plans; any expected interruption is agreed before migration.",
      ],
    ],
  },
  design: {
    headline: "Clarity for users. Confidence for your business.",
    bestFor:
      "Businesses launching a digital product, simplifying a difficult workflow or bringing consistency to fragmented interfaces.",
    deliverables: [
      [
        "Research and journeys",
        "Stakeholder interviews, user insights and journey maps to make priorities explicit.",
      ],
      [
        "Wireframes and prototypes",
        "Information architecture and interactive flows to test ideas before development.",
      ],
      [
        "Interface design",
        "Responsive screens with loading, empty, error and success states.",
      ],
      [
        "Design system and handover",
        "Reusable components, typography, spacing and interaction specifications for consistent implementation.",
      ],
    ],
    process: [
      [
        "Understand",
        "Study users, business goals and friction in the current experience.",
      ],
      [
        "Structure",
        "Map information architecture and explore core flows in wireframes.",
      ],
      [
        "Validate",
        "Test prototypes and refine the design from observed feedback.",
      ],
      [
        "Handover",
        "Document components and support engineering with implementation reviews.",
      ],
    ],
    technologies: [
      "Figma",
      "Interactive prototypes",
      "Design systems",
      "Usability testing",
    ],
    faq: [
      [
        "Can you redesign part of a product?",
        "Yes. We can focus on a journey such as onboarding, checkout or a dashboard, while respecting the wider product’s design system.",
      ],
      [
        "Is development included?",
        "Design can be standalone or part of a complete build. The proposal clearly separates design deliverables from engineering scope.",
      ],
    ],
  },
};
