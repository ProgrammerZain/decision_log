import type { 
  NavItem, 
  FooterSection, 
  DecisionCard, 
  TestimonialCompany, 
  IntegrationPlugin, 
  FeatureBlock 
} from '../types';

export const NAV_ITEMS: NavItem[] = [
  { label: 'Features', href: '#features' },
  { label: 'Integrations', href: '#integrations' },
];

export const FOOTER_SECTIONS: FooterSection[] = [
  {
    title: 'Product',
    links: [
      { label: 'Features', href: '#features' },
      { label: 'Integrations', href: '#integrations' },
      { label: 'Roadmap', href: '#' },
      { label: 'Changelog', href: '#' },
      { label: 'Security', href: '#' }
    ]
  },
  {
    title: 'Integrations',
    links: [
      { label: 'Slack App', href: '#' },
      { label: 'Jira Plugin', href: '#' },
      { label: 'Notion Sync', href: '#' },
      { label: 'GitHub Actions', href: '#' },
      { label: 'MS Teams Bot', href: '#' }
    ]
  },
  {
    title: 'Resources',
    links: [
      { label: 'Documentation', href: '#' },
      { label: 'Decision Templates', href: '#' },
      { label: 'API Reference', href: '#' },
      { label: 'Community Forum', href: '#' },
      { label: 'Blog', href: '#' }
    ]
  },
  {
    title: 'Company',
    links: [
      { label: 'About Us', href: '#' },
      { label: 'Careers', href: '#' },
      { label: 'Customers', href: '#' },
      { label: 'Privacy Policy', href: '#' },
      { label: 'Terms of Service', href: '#' }
    ]
  }
];

export const TESTIMONIAL_COMPANIES: TestimonialCompany[] = [
  { id: '1', name: 'Stripe', logoType: 'stripe' },
  { id: '2', name: 'GitHub', logoType: 'github' },
  { id: '3', name: 'Slack', logoType: 'slack' },
  { id: '4', name: 'Notion', logoType: 'notion' },
  { id: '5', name: 'Linear', logoType: 'linear' },
  { id: '6', name: 'Framer', logoType: 'framer' }
];

export const HERO_DECISION_CARDS: DecisionCard[] = [
  {
    id: 'dec-01',
    title: 'Adopt Tailwind CSS v4 for Landing Page Redesign',
    category: 'Architecture',
    status: 'Approved',
    date: '2 hours ago',
    authorName: 'Sarah Jenkins',
    authorRole: 'Lead Frontend Dev',
    impact: 'High'
  },
  {
    id: 'dec-02',
    title: 'Migrate Primary Database from DynamoDB to PostgreSQL',
    category: 'Infrastructure',
    status: 'Under Review',
    date: '4 hours ago',
    authorName: 'Alex Rivera',
    authorRole: 'Infrastructure Lead',
    impact: 'High'
  },
  {
    id: 'dec-03',
    title: 'Enable Single Sign-On (SSO) for Enterprise Clients',
    category: 'Security',
    status: 'Approved',
    date: 'Yesterday',
    authorName: 'Elena Rostova',
    authorRole: 'Security Engineer',
    impact: 'Medium'
  },
  {
    id: 'dec-04',
    title: 'Redesign Landing Page Layout & Visual Assets',
    category: 'Product Design',
    status: 'Proposed',
    date: '2 days ago',
    authorName: 'Jordan Vance',
    authorRole: 'Principal Designer',
    impact: 'Low'
  },
  {
    id: 'dec-05',
    title: 'Deprecate Legacy v1 API Endpoints by Q4',
    category: 'API Platform',
    status: 'Approved',
    date: '3 days ago',
    authorName: 'Marcus Cole',
    authorRole: 'Backend Architect',
    impact: 'High'
  },
  {
    id: 'dec-06',
    title: 'Shift to AWS Fargate for Serverless Container Hosting',
    category: 'Infrastructure',
    status: 'Rejected',
    date: '4 days ago',
    authorName: 'Alex Rivera',
    authorRole: 'Infrastructure Lead',
    impact: 'High'
  }
];

export const INTEGRATIONS: IntegrationPlugin[] = [
  {
    id: 'int-slack',
    name: 'Slack Integration',
    description: 'Capture decision-making context right inside Slack threads and push finalized logs instantly to your channel.',
    iconName: 'slack',
    badge: 'Popular'
  },
  {
    id: 'int-jira',
    name: 'Jira Software',
    description: 'Link technical decision records (ADRs) directly to Jira epic cards or backlog tasks to keep developers aligned.',
    iconName: 'jira'
  },
  {
    id: 'int-notion',
    name: 'Notion Database Sync',
    description: 'Auto-sync active decision cards to team wikis, project directories, and workspace databases automatically.',
    iconName: 'notion'
  },
  {
    id: 'int-github',
    name: 'GitHub Action',
    description: 'Enforce ADR creation inside PRs. Auto-archive decisions in Markdown directly inside your codebase repositories.',
    iconName: 'github',
    badge: 'Developer Choice'
  },
  {
    id: 'int-linear',
    name: 'Linear Tooling',
    description: 'Map decisions directly to cycles, issues, and project milestones inside Linear without leaving your editor.',
    iconName: 'linear'
  },
  {
    id: 'int-teams',
    name: 'Microsoft Teams',
    description: 'Deliver weekly digests and alert stakeholders of crucial system and architectural decisions directly.',
    iconName: 'teams'
  }
];

export const FEATURE_BLOCKS: FeatureBlock[] = [
  {
    id: 'feat-collaborate',
    tag: 'Consensus Building',
    title: 'Collaborate and vote without alignment meetings',
    description: 'Gather feedback asynchronously. Allow teammates to upvote, suggest alternatives, and flag blockers without scheduling yet another Zoom call. Reach agreement on complex engineering or product issues 3x faster.',
    benefits: [
      'Interactive thread-level comment resolution',
      'One-click stakeholder voting on proposals',
      'Built-in support for RFC & ADR template standards'
    ],
    mockType: 'collaboration'
  },
  {
    id: 'feat-audit',
    tag: 'Historical Records',
    title: 'Maintain an immutable timeline of your decisions',
    description: 'Never guess why a system was designed a certain way. Every decision in Decision Log has a full audit log detailing who proposed it, who was consulted, who approved it, and what alternatives were rejected.',
    benefits: [
      'Full revision history with git-like diff comparisons',
      'Export logs to Markdown, PDF, or JSON anytime',
      'Automated slack summary alerts for new hires onboarding'
    ],
    mockType: 'audit-log'
  },
  {
    id: 'feat-analytics',
    tag: 'Analytics & Insights',
    title: 'Understand project velocity and decision patterns',
    description: 'Keep a pulse on your architectural health. Detect bottlenecks, analyze proposal-to-approval times, and identify which product teams are making decisions vs which ones are waiting in gridlock.',
    benefits: [
      'Visual bottlenecks and pending-review reports',
      'Categorized reports (Architecture vs Product vs Ops)',
      'Quarterly velocity insights and team metrics'
    ],
    mockType: 'analytics'
  }
];

export const BOT_RESPONSES: Record<string, string> = {
  pricing: 'Decision Log starts completely free! The **Pro** plan is **$8 per user/month** (billed annually), which includes custom fields, unlimited integrations, and advanced analytics. Enterprise custom packages are also available.',
  free: 'Yes! The service is **100% free for 1 month** for all new users, and we do **not require any credit card information** to start the trial.',
  slack: 'Our Slack integration allows you to capture decisions inside Slack threads. Just use `/decision` to log context or push approved decisions straight to channels.',
  jira: 'You can link decision items directly to Jira issues. When a decision status changes, the corresponding Jira ticket will be updated with details automatically.',
  notion: 'With our Notion Sync, approved decisions are automatically updated inside your team workspace databases to ensure documentation is never stale.',
  github: 'Our GitHub Action ensures ADR (Architecture Decision Record) formatting rules are met in your pull requests before merging, keeping markdown records in sync with code.',
  integrations: 'We support Slack, Jira, GitHub, Notion, Linear, Microsoft Teams, and custom Webhooks. You can set them up with just a few clicks in the app settings!',
  how: 'Decision Log acts as a centralized dashboard where teams write, discuss, and log major decisions. It helps prevent "documentation drift" by integrating into tools your team already uses.',
  work: 'Decision Log helps engineering and product teams document *why* a choice was made, avoiding recurring arguments and speed bottlenecks. Try the demo by clicking "Try Demo" in the navigation bar!'
};

export const CHATBOT_DEFAULT_RESPONSE = "That's a great question! Decision Log is designed to streamline team alignment, document historical rationale, and eliminate useless meetings. Feel free to ask about 'pricing', 'trial', 'Slack', 'Jira', 'GitHub', or how it works!";
