import mongoose, { Schema, type Model } from "mongoose";

const str = { type: String, default: "" };
const strList = { type: [String], default: [] };

const ProfileSchema = new Schema(
  {
    name: str,
    title: str,
    status: str,
    location: str,
    shortLocation: str,
    stackLabel: str,
    lead: str,
    aboutHeading: str,
    aboutBody: str,
    principles: { type: [{ title: str, description: str, _id: false }], default: [] },
    email: str,
    socials: { type: [{ name: str, url: str, _id: false }], default: [] },
    resumeUrl: str,
    timezone: { type: String, default: "Asia/Kolkata" },
    tzLabel: { type: String, default: "IST" },
  },
  { timestamps: true },
);

const ProjectSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    shortTitle: str,
    year: str,
    role: str,
    stack: strList,
    summary: str,
    overview: str,
    features: strList,
    liveUrl: str,
    codeUrl: str,
    coverImage: str,
    gallery: strList,
    order: { type: Number, default: 0 },
    published: { type: Boolean, default: true },
  },
  { timestamps: true },
);

const SkillGroupSchema = new Schema({ name: str, items: strList, order: { type: Number, default: 0 } }, { timestamps: true });

const ExperienceSchema = new Schema(
  { period: str, title: str, description: str, tags: strList, order: { type: Number, default: 0 } },
  { timestamps: true },
);

const PostSchema = new Schema(
  {
    slug: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    excerpt: str,
    content: str,
    tag: str,
    coverImage: str,
    published: { type: Boolean, default: false },
    publishedAt: { type: Date, default: null },
  },
  { timestamps: true },
);

const MessageSchema = new Schema(
  { name: str, email: str, message: str, read: { type: Boolean, default: false } },
  { timestamps: true },
);

function getModel(name: string, schema: Schema): Model<any> {
  return (mongoose.models[name] as Model<any>) ?? mongoose.model(name, schema);
}

export const ProfileModel = getModel("Profile", ProfileSchema);
export const ProjectModel = getModel("Project", ProjectSchema);
export const SkillGroupModel = getModel("SkillGroup", SkillGroupSchema);
export const ExperienceModel = getModel("Experience", ExperienceSchema);
export const PostModel = getModel("Post", PostSchema);
export const MessageModel = getModel("Message", MessageSchema);
