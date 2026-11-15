export interface Profile {
  name: string;
  title: string;
  status: string;
  location: string;
  shortLocation: string;
  stackLabel: string;
  lead: string;
  aboutHeading: string;
  aboutBody: string;
  principles: { title: string; description: string }[];
  email: string;
  socials: { name: string; url: string }[];
  resumeUrl: string;
  timezone: string;
  tzLabel: string;
}

export interface Project {
  _id: string;
  slug: string;
  title: string;
  shortTitle: string;
  year: string;
  role: string;
  stack: string[];
  summary: string;
  overview: string;
  features: string[];
  liveUrl: string;
  codeUrl: string;
  coverImage: string;
  gallery: string[];
  order: number;
  published: boolean;
}

export interface SkillGroup {
  _id: string;
  name: string;
  items: string[];
  order: number;
}

export interface Experience {
  _id: string;
  period: string;
  title: string;
  description: string;
  tags: string[];
  order: number;
}

export interface Post {
  _id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  tag: string;
  coverImage: string;
  published: boolean;
  publishedAt: string | null;
  createdAt: string;
}

export interface Message {
  _id: string;
  name: string;
  email: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export type FormState = { error?: string; ok?: string };
