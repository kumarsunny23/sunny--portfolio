// ─── Portfolio Data ───────────────────────────────────────────
// Edit this file to update all content across the portfolio

export const personalInfo = {
  name: "Sunny Kumar",
  role: "Software Engineer | MERN & Java",
  tagline: "I build scalable web apps with modern tech.",
  location: "Hajipur, Bihar, India",
  email: "sunnykrhjp378@gmail.com",
  github: "https://github.com/kumarsunny23",
  linkedin: "https://www.linkedin.com/in/sunny-kumar-b576492b9/",
  twitter: "https://twitter.com/sunnykumar",
  leetcode: "https://leetcode.com/u/kumarsunny23/",
  resumeUrl: "/Sunny_Kumar_Resume.pdf",
  avatarInitials: "SK",
};

export const typingRoles = [
  "Software Engineer",
  "Full Stack MERN Developer",
  "Java Developer",
  "React.js Expert",
  "Node.js Backend Engineer",
  "DSA with Java",
  "Problem Solver",
];

export const aboutStats = [
  { label: "Experience", value: "Fresher", suffix: "" },
  { label: "Projects Completed", value: "8+", suffix: "" },
  { label: "GitHub Commits", value: "300+", suffix: "" },
  { label: "Happy Clients", value: "3+", suffix: "" },
];

export const aboutDescription = `Hi! I'm Sunny Kumar, a passionate Full Stack MERN Developer & Java Developer from Hajipur, Bihar.
I specialize in building robust, scalable web applications using MongoDB, Express.js, React.js, and Node.js.
I love turning complex problems into elegant, user-friendly solutions.
When I'm not coding, I'm practicing DSA, exploring new technologies, or mentoring fellow developers.`;

// ─── Skills ──────────────────────────────────────────────────
export const skillCategories = [
  {
    title: "Frontend",
    icon: "🎨",
    color: "from-purple-500 to-pink-500",
    skills: [
      { name: "React.js", level: 90 },
      { name: "JavaScript (ES6+)", level: 88 },
      { name: "HTML5 / CSS3", level: 92 },
      { name: "Tailwind CSS", level: 85 },
      { name: "Next.js", level: 75 },
      { name: "TypeScript", level: 70 },
    ],
  },
  {
    title: "Backend",
    icon: "⚙️",
    color: "from-cyan-500 to-blue-500",
    skills: [
      { name: "Node.js", level: 88 },
      { name: "Express.js", level: 87 },
      { name: "REST APIs", level: 90 },
      { name: "GraphQL", level: 65 },
      { name: "Socket.io", level: 78 },
      { name: "JWT / Auth", level: 85 },
    ],
  },
  {
    title: "Database",
    icon: "🗄️",
    color: "from-green-500 to-emerald-500",
    skills: [
      { name: "MongoDB", level: 88 },
      { name: "Mongoose ODM", level: 87 },
      { name: "MySQL", level: 72 },
      { name: "PostgreSQL", level: 65 },
      { name: "Redis", level: 60 },
      { name: "Firebase", level: 70 },
    ],
  },
  {
    title: "Tools & DevOps",
    icon: "🔧",
    color: "from-orange-500 to-red-500",
    skills: [
      { name: "Git & GitHub", level: 90 },
      { name: "Docker", level: 65 },
      { name: "AWS (EC2, S3)", level: 60 },
      { name: "Postman", level: 88 },
      { name: "VS Code", level: 95 },
      { name: "Linux CLI", level: 75 },
    ],
  },
];

// ─── Projects ─────────────────────────────────────────────────
export const projects = [
  {
    id: 1,
    title: "Video Vaani",
    description: "A real-time WebRTC video conferencing app with Google Auth, guest invite system, chat, and screen sharing. Built with the full MERN stack.",
    image: null,
    tech: ["React", "Node.js", "WebRTC", "Socket.io", "MongoDB", "JWT"],
    github: "https://github.com/kumarsunny23",
    live: "#",
    featured: true,
    color: "from-purple-600 to-cyan-600",
  },
  {
    id: 2,
    title: "E-Commerce Platform",
    description: "A full-featured e-commerce web app with product catalog, cart, payment integration (Razorpay), and admin dashboard.",
    image: null,
    tech: ["React", "Redux", "Node.js", "Express", "MongoDB", "Razorpay"],
    github: "https://github.com/kumarsunny23",
    live: "#",
    featured: true,
    color: "from-pink-600 to-orange-500",
  },
  {
    id: 3,
    title: "AI Video Clip Engine",
    description: "AI-powered tool that automatically extracts highlight clips from long videos using NLP and computer vision techniques.",
    image: null,
    tech: ["React", "Python", "FastAPI", "MongoDB", "OpenAI API"],
    github: "https://github.com/kumarsunny23",
    live: "#",
    featured: true,
    color: "from-cyan-500 to-blue-600",
  },
  {
    id: 4,
    title: "Task Management App",
    description: "Collaborative task manager with real-time updates, drag-and-drop Kanban board, team roles, and deadline notifications.",
    image: null,
    tech: ["React", "Node.js", "Socket.io", "MongoDB", "Tailwind"],
    github: "https://github.com/kumarsunny23",
    live: "#",
    featured: false,
    color: "from-green-500 to-teal-500",
  }
];

// ─── Education ────────────────────────────────────────────────
export const education = [
  {
    id: 1,
    degree: "Bachelor of Computer Application",
    field: "Computer Application",
    institution: "Patliputra University",
    location: "Patna, Bihar",
    year: "2023 – 2026",
    cgpa: "6.3 / 10",
    icon: "🎓",
  },
  {
    id: 2,
    degree: "Intermediate (12th Science)",
    field: "Physics, Chemistry, Mathematics",
    institution: "Bihar School Examination Board",
    location: "Hajipur, Bihar",
    year: "2021 – 2023",
    cgpa: "63.4%",
    icon: "📚",
  },
  {
    id: 3,
    degree: "Matriculation (10th)",
    field: "Science & Mathematics",
    institution: "Bihar School Examination Board",
    location: "Hajipur, Bihar",
    year: "2020 – 2021",
    cgpa: "75.6%",
    icon: "🏫",
  },
];

// ─── Certifications ───────────────────────────────────────────
export const certifications = [
  {
    id: 1,
    title: "Full Stack Web Development",
    issuer: "freeCodeCamp",
    year: "2023",
    icon: "🏆",
    color: "from-purple-500 to-violet-600",
    link: "#",
  },
  {
    id: 2,
    title: "React — The Complete Guide",
    issuer: "Udemy (Maximilian Schwarzmüller)",
    year: "2023",
    icon: "⚛️",
    color: "from-cyan-500 to-blue-600",
    link: "#",
  },
  {
    id: 3,
    title: "Node.js, Express & MongoDB Bootcamp",
    issuer: "Udemy (Jonas Schmedtmann)",
    year: "2022",
    icon: "🟢",
    color: "from-green-500 to-emerald-600",
    link: "#",
  },
  {
    id: 4,
    title: "JavaScript Algorithms & Data Structures",
    issuer: "freeCodeCamp",
    year: "2022",
    icon: "📜",
    color: "from-yellow-500 to-orange-500",
    link: "#",
  },
  {
    id: 5,
    title: "AWS Cloud Practitioner Essentials",
    issuer: "Amazon Web Services (AWS)",
    year: "2024",
    icon: "☁️",
    color: "from-orange-500 to-red-500",
    link: "#",
  },
  {
    id: 6,
    title: "MongoDB for JavaScript Developers",
    issuer: "MongoDB University",
    year: "2023",
    icon: "🍃",
    color: "from-green-400 to-teal-500",
    link: "#",
  },
];
