// app/data.ts — Portfolio content: stack, projects, milestones, and navigation

export type StackRow = {
  area: string;
  purpose: string;
  tools: { name: string; note: string }[];
};

export const stack: StackRow[] = [
  {
    area: "Frontend",
    purpose: "Responsive web interfaces and how people move through them.",
    tools: [
      { name: "Next.js", note: "Web framework" },
      { name: "Tailwind CSS", note: "Styling" },
    ],
  },
  {
    area: "Mobile",
    purpose: "Apps that work the same across phones and platforms.",
    tools: [
      { name: "Flutter", note: "Cross-platform" },
      { name: "React Native", note: "Native mobile" },
    ],
  },
  {
    area: "Backend & data",
    purpose: "App services and storage behind the features.",
    tools: [
      { name: "Firebase", note: "App platform" },
      { name: "SQLite", note: "Local database" },
    ],
  },
  {
    area: "Languages",
    purpose: "Application logic, and code that runs close to the hardware.",
    tools: [
      { name: "C++", note: "Systems & firmware" },
      { name: "Python", note: "Scripting" },
    ],
  },
  {
    area: "Hardware & IoT",
    purpose: "Connecting software to microcontrollers and physical prototypes.",
    tools: [
      { name: "Arduino", note: "Microcontrollers" },
      { name: "Prototyping", note: "Circuits & builds" },
    ],
  },
  {
    area: "Workflow",
    purpose: "Keeping changes organized and easy to track.",
    tools: [{ name: "Git", note: "Version control" }],
  },
];

export type Project = {
  number: string;
  slug: string;
  title: string;
  year: string;
  category: string;
  desc: string;
  fullDesc: string;
  problem: string;
  approach: string;
  contributions: string[];
  features: string[];
  outcome: string;
  tags: string[];
  video?: string;
  images?: string[];
  imageLabels?: string[];
  thumbnail?: string;
  liveUrl?: string;
  repositoryUrl?: string;
};

export const projects: Project[] = [
  {
    number: "01",
    slug: "glass-board",
    title: "Interactive Glass Board",
    year: "2026",
    category: "Hardware · Interaction",
    desc: "A custom hardware and software experience for interactive displays, built to move beyond traditional mesh setups.",
    fullDesc:
      "This project explores a new way of interacting with displays. By bypassing traditional mesh setups, the Interactive Glass Board offers a more direct, responsive, and tactile interaction model. I handled the C++ firmware development and the UI/UX design for the interface.",
    problem: "Traditional mesh-based display setups can make direct, tactile interaction harder to achieve.",
    approach: "Explore a more direct and responsive interaction model by bringing custom hardware and interface design together.",
    contributions: ["C++ firmware development", "UI/UX design for the interface"],
    features: ["Interactive display experience", "Hardware and software integration", "Responsive, tactile interaction model"],
    outcome: "Designed to move beyond traditional mesh setups and offer a more direct, responsive way to interact with a display.",
    tags: ["Hardware", "C++", "UI/UX"],
  },
  {
    number: "02",
    slug: "classroom-studio",
    title: "ClassRoom Studio",
    year: "2026",
    category: "Web app · Education",
    desc: "An offline-first seating chart, attendance tracker, group maker, and gradebook for teachers, with cloud sync.",
    fullDesc:
      "ClassRoom Studio lets teachers lay out their actual classroom, seat students by dragging, take attendance by tapping chairs or with a quick roll call list, generate groups based on where students sit, and enter grades directly on the seating chart. It works on phones, tablets, and laptops. Everything is saved on the device first and synced to the cloud in the background, so it keeps working without an internet connection.",
    problem:
      "Teachers juggle seating charts, attendance sheets, grouping, and gradebooks across separate tools that don't reflect how the classroom is actually arranged.",
    approach:
      "Make the seating chart the center of the app, so attendance, groups, and grades all happen on the same visual layout of the room, offline-first with Supabase cloud sync.",
    contributions: [
      "Drag-and-drop room editor with presets, snapping, undo/redo, and a locked room during class",
      "Responsive phone layout with a bottom tab bar, bottom sheets, a one-tap roll call list, and tap-to-seat",
      "Seat-proximity grouping using size-capped k-means on chair positions, plus lock-together / keep-apart rules",
      "Weighted gradebook with multiple grading scales (DepEd K–12, college 1.00–5.00, GPA, and more) and a seating-chart heat map",
      "Offline-first sync with Supabase Auth and Postgres Row Level Security, with conflict handling that never silently discards data",
    ],
    features: [
      "Drag-and-drop seating chart",
      "Roll call and tap-to-mark attendance with CSV export",
      "Works on phones, tablets, and laptops",
      "Random, proximity, and even-split groups",
      "Gradebook with heat map",
      "Random picker and countdown timer",
      "Google sign-in and guest mode",
      "Dark mode and JSON backup",
    ],
    outcome: "A working app teachers can try instantly in guest mode with sample data, backed by 52 passing Vitest tests.",
    tags: ["Next.js", "React", "TypeScript", "Supabase", "Tailwind CSS", "Zustand"],
    images: [
      "/classroom-studio/layout.png",
      "/classroom-studio/attendance.png",
      "/classroom-studio/groups.png",
      "/classroom-studio/grades.png",
      "/classroom-studio/phone-rollcall.png",
      "/classroom-studio/phone-gradebook.png",
    ],
    imageLabels: ["Room layout", "Attendance", "Groups", "Grades", "Roll call on a phone", "Gradebook on a phone"],
    thumbnail: "/classroom-studio/layout.png",
    liveUrl: "https://classroom-studio-jade.vercel.app",
    repositoryUrl: "https://github.com/josh12343467/classroom-studio",
  },
  {
    number: "03",
    slug: "smart-home",
    title: "Smart Home Prototype",
    year: "2026",
    category: "IoT · Connected systems",
    desc: "An IoT smart home system powered by Arduino, featuring a custom mobile app with touch and voice command controls.",
    fullDesc:
      "This Smart Home Prototype is an IoT automation system built around Arduino microcontrollers. I developed a companion mobile application that serves as the central hub for monitoring and controlling home appliances. Users can manually operate devices through simple button clicks within the app, or use integrated voice commands for hands-free control. The project bridges custom hardware circuitry with mobile software.",
    problem: "A connected home needs a clear way to monitor appliances and control them without interacting with each device separately.",
    approach: "Pair an Arduino-based smart home prototype with a companion mobile app that acts as a central control interface.",
    contributions: ["Development of the companion mobile application", "Touch/button-based appliance controls", "Voice-command control experience"],
    features: ["Appliance monitoring and control", "Manual in-app controls", "Hands-free voice commands", "Arduino-based IoT hardware"],
    outcome: "Brings the hardware prototype and mobile interface together, with both manual and voice-based ways to control appliances.",
    tags: ["IoT", "Arduino", "Flutter", "Voice Control", "C++"],
    video: "/cirvia_vid.mp4",
    images: ["/cirvia_app.jpg"],
    imageLabels: ["Companion app"],
    thumbnail: "/cirvia_poster.png",
  },
];

export const milestones = [
  {
    date: "Sep 2026",
    title: "1st Place, Best Poster — MIRC 2026",
    type: "Research award",
    desc: "Awarded 1st Place for Best Poster Presentation at the Manila International Research Conference.",
  },
  {
    date: "Aug 2026",
    title: "TOPCIT Examination",
    type: "Certification",
    desc: "Completed the Test of Practical Competency in IT (TOPCIT).",
  },
];

export const navItems = [
  { label: "About", id: "about" },
  { label: "Stack", id: "stack" },
  { label: "Work", id: "work" },
  { label: "Milestones", id: "milestones" },
  { label: "Contact", id: "contact" },
];

export const links = {
  email: "https://mail.google.com/mail/?view=cm&fs=1&to=joshbuiza2@gmail.com",
  cv: "https://mail.google.com/mail/?view=cm&fs=1&to=joshbuiza2@gmail.com&su=Resume%20Request",
  github: "https://github.com/josh12343467",
  linkedin: "https://www.linkedin.com/in/joshua-buiza-b20563364/",
};
