import { dbConnect } from "./db";
import { ExperienceModel, MessageModel, PostModel, ProfileModel, ProjectModel, SkillGroupModel } from "./models";
import type { Experience, Message, Post, Profile, Project, SkillGroup } from "./types";

const plain = <T>(x: unknown): T => JSON.parse(JSON.stringify(x));

export const DEFAULT_PROFILE: Profile = {
  name: "Your Name",
  title: "Developer",
  status: "",
  location: "",
  shortLocation: "",
  stackLabel: "",
  lead: "",
  aboutHeading: "",
  aboutBody: "",
  principles: [],
  email: "",
  socials: [],
  resumeUrl: "",
  timezone: "Asia/Kolkata",
  tzLabel: "IST",
};

export async function getProfile(): Promise<Profile> {
  await dbConnect();
  const doc = await ProfileModel.findOne().lean();
  return { ...DEFAULT_PROFILE, ...(doc ? plain<Partial<Profile>>(doc) : {}) };
}

export async function getProjects(opts: { all?: boolean } = {}): Promise<Project[]> {
  await dbConnect();
  const docs = await ProjectModel.find(opts.all ? {} : { published: true }).sort({ order: 1, createdAt: 1 }).lean();
  return plain(docs);
}

export async function getProjectBySlug(slug: string): Promise<Project | null> {
  await dbConnect();
  return plain(await ProjectModel.findOne({ slug, published: true }).lean());
}

export async function getProjectById(id: string): Promise<Project | null> {
  await dbConnect();
  return plain(await ProjectModel.findById(id).lean());
}

export async function getSkillGroups(): Promise<SkillGroup[]> {
  await dbConnect();
  return plain(await SkillGroupModel.find().sort({ order: 1, createdAt: 1 }).lean());
}

export async function getExperience(): Promise<Experience[]> {
  await dbConnect();
  return plain(await ExperienceModel.find().sort({ order: 1, createdAt: 1 }).lean());
}

export async function getPosts(opts: { all?: boolean } = {}): Promise<Post[]> {
  await dbConnect();
  const docs = await PostModel.find(opts.all ? {} : { published: true })
    .sort(opts.all ? { createdAt: -1 } : { publishedAt: -1 })
    .lean();
  return plain(docs);
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  await dbConnect();
  return plain(await PostModel.findOne({ slug, published: true }).lean());
}

export async function getPostById(id: string): Promise<Post | null> {
  await dbConnect();
  return plain(await PostModel.findById(id).lean());
}

export async function getMessages(): Promise<Message[]> {
  await dbConnect();
  return plain(await MessageModel.find().sort({ createdAt: -1 }).lean());
}

export async function getCounts() {
  await dbConnect();
  const [projects, published, drafts, unread, messages] = await Promise.all([
    ProjectModel.countDocuments(),
    PostModel.countDocuments({ published: true }),
    PostModel.countDocuments({ published: false }),
    MessageModel.countDocuments({ read: false }),
    MessageModel.countDocuments(),
  ]);
  return { projects, published, drafts, unread, messages };
}
