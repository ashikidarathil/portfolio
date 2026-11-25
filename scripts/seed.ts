// Copies the content from the old React site into MongoDB.
// Usage: npm run seed            (only fills empty collections)
//        npm run seed -- --reset (wipes portfolio content first; messages are kept)
import mongoose from "mongoose";
import { ExperienceModel, PostModel, ProfileModel, ProjectModel, SkillGroupModel } from "../src/lib/models";

try {
  process.loadEnvFile(".env.local");
} catch {}

const profile = {
  name: "Muhammed Ashik",
  title: "Junior Full Stack Developer",
  status: "Open to junior roles",
  location: "Madavoor, Kozhikode, Kerala, India",
  shortLocation: "Kozhikode, IN",
  stackLabel: "MERN + Next.js",
  lead: "Junior full stack developer. I started from zero and learned by shipping real projects: a salon booking platform, an e-commerce store and a marketplace.",
  aboutHeading: "I like knowing how things work underneath: the API, the schema and the request that ties them together.",
  aboutBody:
    "I'm a self-taught developer from Kozhikode. I learn by building real applications end to end, from database design and REST APIs to the React screens people use. Right now I'm focused on improving my skills and building scalable applications.",
  principles: [
    { title: "Continuous learner", description: "Started from zero. Learning full stack one real project at a time." },
    { title: "Project builder", description: "I build real apps like e-commerce and booking systems to see how things work in real life." },
    { title: "Problem solver", description: "I break bugs and coding challenges into small, simple steps." },
    { title: "Growing developer", description: "Improving every day on the way to becoming a professional full stack developer." },
  ],
  email: "ashikidarathil@gmail.com",
  socials: [
    { name: "GitHub", url: "https://github.com/ashikidarathil/" },
    { name: "LinkedIn", url: "https://www.linkedin.com/in/muhammed-ashik-41706a211/" },
    { name: "Instagram", url: "https://www.instagram.com/ashikdotme/" },
  ],
  resumeUrl: "",
  timezone: "Asia/Kolkata",
  tzLabel: "IST",
};

const projects = [
  {
    slug: "salon-booking-system",
    title: "Salon Booking System",
    shortTitle: "Salon Booking",
    year: "2025",
    role: "Full stack, solo",
    stack: ["React", "Redux", "Node.js", "Express", "MongoDB", "Redis", "Docker", "Tailwind CSS"],
    summary: "A full stack salon booking platform with three roles (admin, user, stylist), each with its own dashboard.",
    overview:
      "Customers book a stylist and a time slot, stylists manage their day, and the salon owner controls services, stylists and slots from an admin panel. I designed the database, built the REST API and wrote the React front end.",
    features: [
      "Three roles with separate dashboards: admin, user and stylist",
      "OTP verification on sign-up",
      "JWT login with protected routes per role",
      "Complete booking management",
      "Admin control of services, stylists and slots",
      "Dockerised for a consistent setup",
    ],
    liveUrl: "https://salonbook.online/",
    codeUrl: "https://github.com/ashikidarathil/salonbook",
    order: 0,
  },
  {
    slug: "jordan-express",
    title: "Jordan Express E-commerce",
    shortTitle: "Jordan Express",
    year: "2025",
    role: "Full stack, solo",
    stack: ["Node.js", "Express", "MongoDB", "EJS"],
    summary: "My first full stack project: an e-commerce store with listings, accounts, a cart and orders.",
    overview:
      "This is where I learned how a browser, a server and a database talk to each other. Pages are rendered on the server with EJS, and the data lives in MongoDB.",
    features: ["Product listing", "User authentication", "Cart system", "Basic order management", "Server-rendered pages with EJS"],
    liveUrl: "https://jordanexpress.online/",
    codeUrl: "https://github.com/ashikidarathil/Jordan_Express",
    order: 1,
  },
  {
    slug: "olx-clone",
    title: "OLX Clone",
    shortTitle: "OLX Clone",
    year: "2025",
    role: "Front end + Firebase",
    stack: ["React", "Firebase", "Tailwind CSS"],
    summary: "A marketplace app with real-time listings, category filters and Firebase auth.",
    overview:
      "A modern marketplace built with React, Firebase and Tailwind CSS. Firebase handles authentication and the real-time listings database.",
    features: ["User authentication", "Product listings with a real-time database", "Category-based filtering", "Fully responsive UI"],
    liveUrl: "https://olx-clone-nu-six.vercel.app/",
    codeUrl: "https://github.com/ashikidarathil/olx_clone",
    order: 2,
  },
];

const skillGroups = [
  { name: "Frontend", order: 0, items: ["React", "TypeScript", "Next.js", "Tailwind CSS", "Framer Motion"] },
  { name: "Backend", order: 1, items: ["Node.js", "Express.js", "MongoDB", "PostgreSQL"] },
  { name: "Tools", order: 2, items: ["Git", "Docker", "Figma"] },
];

const experience = [
  {
    order: 0,
    period: "2025 – Present",
    title: "Full Stack Developer",
    description:
      "Learned full stack development from scratch and built a salon booking system on the MERN stack. Implemented OTP-based authentication, a JWT login system, complete database design and REST APIs.",
    tags: ["MongoDB", "Express.js", "React", "Node.js", "Redux", "Tailwind CSS", "Redis", "Docker"],
  },
  {
    order: 1,
    period: "2025",
    title: "First full stack project: E-commerce website",
    description:
      "Built my first full stack e-commerce site with Node.js, Express, MongoDB and EJS: product listing, user authentication and a basic order flow. It taught me how the front end and back end connect.",
    tags: ["Node.js", "Express", "MongoDB", "EJS"],
  },
  {
    order: 2,
    period: "2025",
    title: "Backend development practice",
    description:
      "Learned backend fundamentals by building APIs, handling authentication and working with databases. Structured projects with service, repository and controller layers.",
    tags: ["Node.js", "Express", "MongoDB", "REST API"],
  },
  {
    order: 3,
    period: "2024",
    title: "Programming fundamentals",
    description: "Learned variables, functions, loops and problem solving. Built small practice programs to understand logic.",
    tags: ["JavaScript basics", "Logic building"],
  },
];

// Saved as a DRAFT so nothing invented goes live. Edit or delete it in the admin.
const examplePost = {
  slug: "how-i-built-otp-login-with-redis",
  title: "How I built OTP login with Redis",
  tag: "Backend",
  excerpt: "A short, safe OTP flow for sign-up using Express and Redis key expiry.",
  published: false,
  content: `My salon booking app needed phone verification at sign-up. This draft shows how Markdown works in the editor. Rewrite it in your own words before publishing.

## Why Redis for OTP codes

An OTP only needs to live for a few minutes. Redis can store a key with an expiry time, so old codes clean themselves up.

\`\`\`js
const code = crypto.randomInt(100000, 999999).toString();
await redis.set(\`otp:\${phone}\`, code, { EX: 300 });
\`\`\`

> Make the happy path short and the failure path safe.

## Limiting attempts

A second key counts wrong attempts. After five, the code is deleted and the user requests a new one.
`,
};

async function main() {
  const uri = process.env.MONGODB_URI;
  if (!uri) throw new Error("MONGODB_URI is missing. Add it to .env.local first.");
  await mongoose.connect(uri);
  const reset = process.argv.includes("--reset");

  if (reset) {
    await Promise.all([
      ProfileModel.deleteMany({}),
      ProjectModel.deleteMany({}),
      SkillGroupModel.deleteMany({}),
      ExperienceModel.deleteMany({}),
      PostModel.deleteMany({}),
    ]);
    console.log("Cleared portfolio content (messages kept).");
  }

  const fill = async (label: string, model: typeof ProjectModel, docs: object[]) => {
    if (await model.estimatedDocumentCount()) return console.log(`· ${label}: already has data, skipped`);
    await model.insertMany(docs);
    console.log(`✓ ${label}: added ${docs.length}`);
  };

  await fill("Profile", ProfileModel, [profile]);
  await fill("Projects", ProjectModel, projects);
  await fill("Skills", SkillGroupModel, skillGroups);
  await fill("Experience", ExperienceModel, experience);
  await fill("Blog (1 draft)", PostModel, [examplePost]);

  await mongoose.disconnect();
  console.log("Done.");
}

main().catch(async (err) => {
  console.error(err);
  await mongoose.disconnect();
  process.exit(1);
});
