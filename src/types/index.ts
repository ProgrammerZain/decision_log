export interface NavItem {
  label: string;
  href: string;
}

export interface FooterLink {
  label: string;
  href: string;
}

export interface FooterSection {
  title: string;
  links: FooterLink[];
}

export interface DecisionCard {
  id: string;
  title: string;
  category: string;
  status: 'Approved' | 'Rejected' | 'Under Review' | 'Proposed';
  date: string;
  authorName: string;
  authorRole: string;
  impact: 'High' | 'Medium' | 'Low';
}

export interface TestimonialCompany {
  id: string;
  name: string;
  logoType: 'stripe' | 'github' | 'slack' | 'notion' | 'linear' | 'framer';
}

export interface IntegrationPlugin {
  id: string;
  name: string;
  description: string;
  iconName: 'slack' | 'teams' | 'notion' | 'jira' | 'github' | 'linear';
  badge?: string;
}

export interface FeatureBlock {
  id: string;
  tag: string;
  title: string;
  description: string;
  benefits: string[];
  mockType: 'collaboration' | 'audit-log' | 'analytics';
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
}
