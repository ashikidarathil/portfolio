// ============================================================
// PERSONAL DATA — Edit everything here to personalise
// ============================================================

export const navLinks = [
  { id: "hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export const personalInfo = {
  name: "Muhammed Ashik",
  title: "Junior Full Stack Developer",
  subtitles: [
    "MERN Stack Developer",
    "Building Real World Projects",
    "Node.js & React Learner",
  ],
  bio: `I am a self-taught full stack developer who started learning from scratch. 
  I have built real-world projects like a salon booking platform and an e-commerce website. 
  I enjoy understanding how systems work, especially backend and frontend development, APIs, and database design. 
  Currently focused on improving my skills and building scalable applications.`,
  location: "Madavoor,Kozhikode,Kerala,India",
  email: "ashikidarathil@gmail.com",
  resumeLink: "#",
};

export const socialLinks = [
  {
    name: "GitHub",
    url: "https://github.com/ashikidarathil/",
    icon: "FaGithub",
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/in/muhammed-ashik-41706a211/",
    icon: "FaLinkedin",
  },
  {
    name: "Instagram",
    url: "https://www.instagram.com/ashikdotme/",
    icon: "FaInstagram",
  },
];

// ── About Cards ──────────────────────────────────────────────
export const aboutCards = [
  {
    id: "learning",
    icon: "FaGraduationCap",
    title: "Continuous Learner",
    description:
      "Started from zero and continuously learning full stack development by building real-world projects step by step.",
  },
  {
    id: "builder",
    icon: "FaTools",
    title: "Project Builder",
    description:
      "I focus on building real applications like e-commerce and salon booking systems to understand how things work in real life.",
  },
  {
    id: "problem",
    icon: "FaLightbulb",
    title: "Problem Solver",
    description:
      "I enjoy solving coding challenges and fixing bugs by breaking problems into simple steps.",
  },
  {
    id: "growth",
    icon: "FaRocket",
    title: "Growing Developer",
    description:
      "Passionate about improving my skills every day and becoming a professional full stack developer.",
  },
];

// ── Skills ───────────────────────────────────────────────────
export const skillCategories = ["All", "Frontend", "Backend", "Tools"];

export const skills = [
  // Frontend
  { name: "React", level: 95, category: "Frontend", color: "#61DAFB" },
  { name: "TypeScript", level: 88, category: "Frontend", color: "#3178C6" },
  { name: "Next.js", level: 85, category: "Frontend", color: "#ffffff" },
  { name: "Tailwind CSS", level: 92, category: "Frontend", color: "#38BDF8" },
  { name: "Framer Motion", level: 80, category: "Frontend", color: "#FF0055" },
  // Backend
  { name: "Node.js", level: 85, category: "Backend", color: "#68A063" },
  { name: "Express.js", level: 82, category: "Backend", color: "#cccccc" },
  { name: "MongoDB", level: 90, category: "Backend", color: "#47A248" },
  { name: "PostgreSQL", level: 80, category: "Backend", color: "#4169E1" },

  // 3D
  // { name: "Three.js",      level: 75, category: "3D / Creative", color: "#915EFF" },
  // { name: "React Three Fiber", level: 72, category: "3D / Creative", color: "#00d4ff" },
  // { name: "Blender",       level: 60, category: "3D / Creative", color: "" },
  // Tools
  { name: "Git", level: 90, category: "Tools", color: "#F05032" },
  { name: "Docker", level: 72, category: "Tools", color: "#2496ED" },
  { name: "Figma", level: 80, category: "Tools", color: "#F24E1E" },
];

// ── Experience ───────────────────────────────────────────────
export const experiences = [
  {
    title: "Full Stack Developer",
    period: "2025 – Present",
    description:
      "Learned full stack development from scratch and successfully built a salon booking system using the MERN stack. Implemented OTP-based authentication, JWT login system, complete database design, and REST API development for real-world usage.",
    tags: [
      "MongoDB",
      "Express.js",
      "React",
      "Node.js",
      "Redux",
      "Tailwind CSS",
      "Redis",
      "Docker",
    ],
    color: "#915EFF",
  },
  {
    title: "First Full Stack Project – E-commerce Website",
    period: "2025",
    description:
      "Built my first full stack e-commerce website using Node.js, Express, MongoDB, and EJS. Implemented product listing, user authentication, and basic order flow. This project helped me understand how frontend and backend connect in a real application.",
    tags: ["Node.js", "Express", "MongoDB", "EJS"],
    color: "#00d4ff",
  },
  {
    title: "Backend Development Practice",
    period: "2025",
    description:
      "Learned backend fundamentals by building APIs, handling authentication, and working with databases. Practiced structuring projects using service, repository, and controller patterns.",
    tags: ["Node.js", "Express", "MongoDB", "REST API"],
    color: "#ff6bff",
  },
  {
    title: "Programming Fundamentals",
    period: "2024",
    description:
      "Learned basic programming concepts such as variables, functions, loops, and problem solving. Built small practice programs to understand logic.",
    tags: ["JavaScript Basics", "Logic Building"],
    color: "#ffd700",
  },
];

// ── Projects ─────────────────────────────────────────────────
export const projects = [
  {
    id: "proj1",
    title: "Salon Booking System",
    description:
      "Advanced full stack salon booking platform built using MERN stack. Features three user roles (Admin, User, Stylist) with dedicated dashboards, complete booking management system, OTP authentication, JWT-based login, and full admin control panel for managing services, stylists, and slots.",
    tags: ["React", "Node.js", "MongoDB", "Express"],
    github: "https://github.com/ashikidarathil/salon-booking-backend",
    live: "https://salonbook.online/",
    gradient: "from-pink-600 to-rose-600",
    emoji: "/saloon_favicon.png",
  },
  {
    id: "proj2",
    title: "Jordan Express E-commerce",
    description:
      "E-commerce website built using Node.js, Express, MongoDB, and EJS. Features include product listing, user authentication, cart system, and basic order management.",
    tags: ["Node.js", "Express", "MongoDB", "EJS"],
    github: "https://github.com/ashikidarathil/Jordan_Express",
    live: "https://jordanexpress.online/",
    gradient: "from-orange-600 to-amber-600",
    emoji: "/jordan_favicon.png",
  },
  // {
  //   id: "proj3",
  //   title: "Frontend Practice Projects",
  //   description:
  //     "Built multiple small projects while learning frontend basics, including responsive layouts and UI components using HTML, CSS, and JavaScript.",
  //   tags: ["HTML", "CSS", "JavaScript"],
  //   github: "#",
  //   live: "#",
  //   gradient: "from-green-600 to-emerald-600",
  //   emoji: "💻",
  // },
];

// ── Contact Info ─────────────────────────────────────────────
export const contactInfo = [
  {
    icon: "FaMapMarkerAlt",
    label: "Location",
    value: "Madavoor,Kozhikode,Kerala,India",
  },
  { icon: "FaEnvelope", label: "Email", value: "ashikidarathil@gmail.com" },
  { icon: "FaPhoneAlt", label: "Phone", value: "+91 7012 964 450" },
];
