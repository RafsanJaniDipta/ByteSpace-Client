#!/usr/bin/env node
/**
 * Generates data/courses.json — 50 course entries modeled on the ByteSpace
 * Figma design (Search Page, Course Details, Course Lessons, Course Reviews,
 * Creator Profile).
 *
 * Run:  node scripts/generate-courses.mjs
 * Out:  data/courses.json
 */
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// ---------- deterministic RNG ----------
function mulberry32(seed) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = mulberry32(20260930);
const pick = (arr) => arr[Math.floor(rand() * arr.length)];
const rint = (min, max) => min + Math.floor(rand() * (max - min + 1));

// ---------- design-informed pools ----------
const categories = [
  "Web Development",
  "Mobile App Development",
  "Data Science",
  "Machine Learning",
  "UI/UX Design",
  "Graphic Design",
  "Digital Marketing",
  "Business",
  "Photography",
  "Music",
  "Personal Development",
  "Programming Languages",
];

// Creators — a few names are taken from the Figma board (Creator Profile frame).
const creators = [
  { name: "Rasedul Ridowan Islam", title: "Full-Stack Engineer & Educator", bio: "Full-stack engineer with 8+ years shipping production apps. Teaches React, Node.js and system design to over 120,000 students." },
  { name: "Jannatul Fardousi Ila", title: "UI/UX Designer & Design Mentor", bio: "Product designer passionate about accessible interfaces. Former lead designer at two startups; now teaches Figma and design systems." },
  { name: "Arafa Veno", title: "Data Scientist", bio: "Data scientist and Kaggle expert. Specializes in Python, machine learning and real-world analytics projects." },
  { name: "Md. Tanvir Ahmed", title: "Flutter & Mobile Developer", bio: "Mobile developer building cross-platform apps with Flutter for 6 years. Focused on clean architecture and delightful UX." },
  { name: "Nusrat Jahan", title: "Digital Marketing Strategist", bio: "Growth marketer who scaled brands to 7 figures through SEO, paid ads and content funnels." },
  { name: "Sabbir Hossain", title: "Photographer & Educator", bio: "Commercial photographer teaching lighting, composition and post-processing with Lightroom and Photoshop." },
  { name: "Farhana Yasmin", title: "Business & Finance Coach", bio: "MBA and finance coach helping entrepreneurs build profitable, sustainable businesses." },
  { name: "Rezaul Karim", title: "Backend Engineer", bio: "Backend developer specializing in Node.js, databases and cloud architecture on AWS and GCP." },
  { name: "Shamim Reza", title: "Music Producer", bio: "Producer and audio engineer teaching music production, mixing and mastering with modern DAWs." },
  { name: "Alex Morgan", title: "Machine Learning Engineer", bio: "ML engineer at a tech firm; teaches deep learning with PyTorch and production ML pipelines." },
  { name: "Lin Chen", title: "Frontend Engineer", bio: "Frontend specialist in TypeScript and modern frameworks; loves teaching performance and DX." },
  { name: "Maria Santos", title: "Graphic Designer", bio: "Brand designer with 10 years of experience in logos, identity systems and visual storytelling." },
  { name: "Omar Faruk", title: "DevOps & Cloud Architect", bio: "Cloud architect guiding teams on CI/CD, containerization and infrastructure-as-code." },
  { name: "Israt Jahan", title: "Product Manager", bio: "Product leader teaching discovery, roadmapping and agile delivery for software teams." },
];

const thumbColors = [
  "#0B3CFF", "#7C3AED", "#DB2777", "#EA580C", "#059669", "#0891B2",
  "#4338CA", "#C026D3", "#16A34A", "#DC2626", "#2563EB", "#9333EA",
];

const firstName = (c) => c.name.split(" ")[0];
const lastName = (c) => c.name.split(" ").slice(-1)[0];

// course topic templates per category (title etc.)
const topics = {
  "Web Development": {
    t: (i) => [
      "The Complete Web Developer Course: Build 20 Projects",
      "React + TypeScript: The Practical Guide",
      "Node.js, Express & MongoDB: Full-Stack JavaScript",
      "Next.js 15 & App Router: Production-Grade Apps",
      "Modern CSS & Tailwind: Design Beautiful Interfaces",
      "JavaScript: The Advanced Concepts",
      "Full-Stack Web Development with MERN",
      "REST APIs with Laravel & Vue.js",
      "HTML, CSS & JavaScript: Beginner to Pro",
      "Angular 18: The Complete Guide",
      "Django & Python: Build Real-World Web Apps",
      "Web Security: OWASP Top 10 in Practice",
      "Web Performance & SEO Fundamentals",
      "Microservices with Node.js & Docker",
    ][i % 14],
    desc: (c) => `Master ${c.id === "W1" ? "front-end and back-end" : "modern web"} development with hands-on projects, real-world workflows and best practices used by professional teams.`,
  },
  "Mobile App Development": {
    t: (i) => [
      "Flutter & Dart: Complete Mobile App Development",
      "React Native: Build Cross-Platform Apps",
      "iOS Development with Swift & SwiftUI",
      "Android Development with Kotlin: The Guide",
      "Flutter Advanced: Animations & State Management",
      "Build a Ride-Sharing App with React Native",
      "Kotlin Multiplatform from Zero to Hero",
      "Mobile UI Design for Developers",
    ][i % 8],
    desc: (c) => `Learn to design, build and ship polished mobile apps for ${pick(["iOS", "Android", "both platforms"])} with modern tools and clean architecture.`,
  },
  "Data Science": {
    t: (i) => [
      "Python for Data Science and Machine Learning Bootcamp",
      "Data Analysis with Pandas & NumPy",
      "Complete SQL & Databases for Data Science",
      "Data Visualization with Matplotlib & Seaborn",
      "Statistics for Data Scientists",
      "Excel to Python: Data Analytics Path",
      "Data Storytelling & Dashboards with Tableau",
      "Kaggle Competitions: Winning Approaches",
    ][i % 8],
    desc: (c) => `Go from zero to job-ready data analyst: collect, clean, explore and visualize data using the same stack used in industry.`,
  },
  "Machine Learning": {
    t: (i) => [
      "Machine Learning A-Z: Hands-On Python & R",
      "Deep Learning with PyTorch & TensorFlow",
      "Natural Language Processing with Python",
      "Computer Vision: From Zero to CNN Mastery",
      "Complete Guide to Large Language Models",
      "MLOps: Deploy Models to Production",
      "Scikit-Learn for Machine Learning",
      "Generative AI with Diffusion Models",
    ][i % 8],
    desc: (c) => `Build intelligent systems with machine learning and deep learning — from math fundamentals to deploying models in production.`,
  },
  "UI/UX Design": {
    t: (i) => [
      "Figma: UI/UX Design from Scratch",
      "UX Research: Methods & Practices",
      "Design Systems with Figma & Tokens",
      "Interaction Design & Prototyping",
      "Mobile App Design: Wireframe to Prototype",
      "Accessibility in Design: Inclusive Products",
    ][i % 6],
    desc: (c) => `Design products people love — covering research, wireframing, prototyping, design systems and delivering developer-ready specs.`,
  },
  "Graphic Design": {
    t: (i) => [
      "Adobe Photoshop: The Complete Course",
      "Logo Design Masterclass: Illustrator & Photoshop",
      "Canva for Beginners: Graphics Without Design Skills",
      "Brand Identity Design From Scratch",
      "Motion Graphics with After Effects",
      "Typography: The Art of Beautiful Type",
    ][i % 6],
    desc: (c) => `Unlock your creative potential with professional design workflows, critique-driven assignments and a portfolio you can share.`,
  },
  "Digital Marketing": {
    t: (i) => [
      "Digital Marketing Masterclass: SEO, Ads & Social",
      "SEO 2026: Rank #1 on Google",
      "Facebook & Instagram Ads: Complete Playbook",
      "Google Ads & Analytics Certification Prep",
      "Email Marketing & Sales Funnels",
      "Content Marketing That Converts",
    ][i % 6],
    desc: (c) => `Grow any business online with proven strategies for search, social, paid media and conversion optimization.`,
  },
  "Business": {
    t: (i) => [
      "Entrepreneurship: Start a Business That Lasts",
      "Financial Accounting for Startups",
      "Business Analytics with Excel & Power BI",
      "Project Management with Agile & Scrum",
    ][i % 4],
    desc: (c) => `Practical, no-fluff training to launch, manage and scale a business — from finance basics to agile execution.`,
  },
  "Photography": {
    t: (i) => [
      "Photography Masterclass: Light & Composition",
      "Portrait Photography: From Setup to Edit",
      "Lightroom & Photoshop: Complete Editing",
    ][i % 3],
    desc: (c) => `Take stunning photos with any camera — master exposure, composition, lighting and professional editing workflows.`,
  },
  "Music": {
    t: (i) => [
      "Music Production with Ableton Live",
      "Mixing & Mastering: Professional Sound",
    ][i % 2],
    desc: (c) => `Produce, mix and master tracks that sound radio-ready, with project files and step-by-step walkthroughs.`,
  },
  "Personal Development": {
    t: (i) => [
      "Productivity & Focus: The Complete System",
    ][i % 1],
    desc: (c) => `Build life-changing habits, beat procrastination and design a personal system for deep, consistent focus.`,
  },
  "Programming Languages": {
    t: (i) => [
      "Python 3: The Complete Masterclass",
    ][i % 1],
    desc: (c) => `Learn Python from absolute beginner to advanced — with exercises, quizzes and capstone projects.`,
  },
};

const levels = ["Beginner", "Intermediate", "Advanced", "All levels"];

const learnSnippets = {
  "Web Development": ["Build responsive, production-ready websites", "Master modern JavaScript & TypeScript", "Ship full-stack apps with REST & GraphQL", "Deploy and scale apps on cloud platforms", "Follow professional git & CI/CD workflows"],
  "Mobile App Development": ["Build native-quality apps with one codebase", "Master state management & navigation", "Publish apps to the App Store & Play Store", "Integrate APIs, auth and payments", "Optimize performance for real devices"],
  "Data Science": ["Clean and wrangle messy real-world data", "Analyze data with Pandas & SQL", "Build interactive dashboards", "Communicate insights with compelling visuals", "Automate data pipelines"],
  "Machine Learning": ["Understand ML math & core algorithms", "Train models with scikit-learn & PyTorch", "Work with CNNs, RNNs and Transformers", "Deploy models with MLOps practices", "Tackle NLP & computer vision problems"],
  "UI/UX Design": ["Conduct user research & usability tests", "Prototype high-fidelity interfaces in Figma", "Build scalable design systems", "Design accessible, inclusive products", "Hand off specs developers love"],
  "Graphic Design": ["Design logos & complete brand identities", "Retouch photos like a professional", "Craft layouts with strong typography", "Create motion graphics & animations", "Package files for print & web"],
  "Digital Marketing": ["Rank pages with on-page & off-page SEO", "Run profitable paid ad campaigns", "Grow audiences on social media", "Build email funnels that convert", "Measure everything with analytics"],
  "Business": ["Validate business ideas fast", "Read & manage financial statements", "Run agile projects and teams", "Analyze data to drive decisions"],
  "Photography": ["Master exposure triangle & composition", "Use natural and artificial light", "Edit with Lightroom & Photoshop", "Build a professional portfolio"],
  "Music": ["Set up a complete production workflow", "Mixing & mastering with industry standards", "Make beats and tracks from scratch"],
  "Personal Development": ["Design your ideal routine", "Overcome procrastination for good", "Focus deeply for hours", "Track habits that stick"],
  "Programming Languages": ["Write clean, idiomatic Python", "Automate everyday tasks", "Understand OOP & design patterns", "Prepare for coding interviews"],
};

const requirements = [
  "No prior experience needed — we start from the basics.",
  "A computer with any modern browser is required.",
  "A desire to learn and practice every day.",
];

const reviewNames = [
  ["Ahmed", "Rafi"], ["Sadia", "Islam"], ["Tanvir", "Hossain"], ["Fariha", "Khan"],
  ["Rakib", "Hasan"], ["Nusrat", "Akter"], ["Mehedi", "Islam"], ["Tahmina", "Ahmed"],
  ["Shakil", "Ahmed"], ["Mim", "Khatun"], ["Arif", "Chowdhury"], ["Sumaiya", "Rahman"],
  ["Imran", "Hossain"], ["Labiba", "Noor"], ["Farhan", "Siddiqui"], ["Anika", "Tabassum"],
  ["Zisan", "Ahmed"], ["Mou", "Moni"], ["Nabil", "Karim"], ["Safwan", "Mahmud"],
  ["Nadia", "Rahman"], ["Ovi", "Das"], ["Sarmin", "Sultana"], ["Raisul", "Islam"],
];

const reviewComments = [
  "One of the best courses I have taken. The instructor explains everything clearly and the projects are incredibly practical. Highly recommended!",
  "Clear, structured and full of real-world examples. I landed a job within two months of finishing this course.",
  "The pacing is perfect for beginners. Homework and quizzes really helped the concepts stick.",
  "Great value for money. The course goes beyond the basics and covers advanced topics too.",
  "The instructor is an excellent communicator. Every module felt fresh and engaging.",
  "I loved the hands-on projects. You learn by building, which makes all the difference.",
  "Solid content, well organized, and the downloadable resources are super useful.",
  "A fantastic introduction. I now feel confident to start my own projects.",
  "The Q&A support is outstanding — questions get answered within hours.",
  "This course exceeded my expectations. Worth every penny.",
  "Very detailed and up to date. It reflects how teams actually work in the industry.",
  "Perfect for career switchers. The career tips at the end were a brilliant bonus.",
];

const reviewTitles = [
  "Excellent and practical", "Exceeded my expectations", "Highly recommended",
  "Clear and engaging", "Best investment in learning", "A game changer for me",
];

const creatorIds = creators.map((c) => c.name);

// ---------- build courses ----------
const courses = [];
let idx = 0;
for (const [cat, spec] of Object.entries(topics)) {
  const count = { "Web Development": 14, "Mobile App Development": 8, "Data Science": 7, "Machine Learning": 5, "UI/UX Design": 4, "Graphic Design": 3, "Digital Marketing": 3, "Business": 2, "Photography": 1, "Music": 1, "Programming Languages": 1, "Personal Development": 1 }[cat];
  for (let k = 0; k < count; k++) {
    idx += 1;
    const id = `C-${String(idx).padStart(3, "0")}`;
    const slugBase = spec.t(k)
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "")
      .slice(0, 52);
    const title = spec.t(k);
    const creator = pick(creators);
    const rating = (4 + Math.round(rand() * 9) / 10); // 4.0 - 4.9
    const ratingCount = rint(120, 9800);
    const students = rint(700, 320000);
    const price = [15.99, 19.99, 24.99, 29.99, 34.99, 44.99, 49.99, 54.99, 64.99, 79.99, 89.99, 99.99][rint(0, 11)];
    const discount = pick([20, 30, 40, 50, 60, 70]);
    const originalPrice = Math.round((price / (1 - discount / 100)) * 100) / 100;
    const bestseller = rand() < 0.22;
    const isNew = rand() < 0.12;
    const recentlyUpdated = rand() < 0.3;
    const updatedAt = `2026-${String(rint(1, 9)).padStart(2, "0")}`;

    const sections = rint(4, 7);
    const curriculum = [];
    let lessonNo = 0;
    const sectionNames = pick([
      ["Getting Started", "Building the Foundation", "Core Concepts", "Advanced Techniques", "Real-World Projects", "Performance & Deployment"],
      ["Introduction", "Setup & Tooling", "Fundamentals", "Hands-On Practice", "Mastering Advanced Topics", "Final Project & Review"],
      ["Start Here", "The Essentials", "Intermediate Topics", "Pro Tips & Tricks", "Capstone Project", "Bonus Content"],
    ]);
    for (let s = 0; s < sections; s++) {
      const lessonCount = rint(4, 8);
      const lessons = [];
      for (let l = 0; l < lessonCount; l++) {
        lessonNo += 1;
        lessons.push({
          id: `${id}-L${String(lessonNo).padStart(3, "0")}`,
          order: lessonNo,
          title: `${sectionNames[Math.min(s, sectionNames.length - 1)]} — Lesson ${l + 1}${l === 0 ? " (Intro)" : l === lessonCount - 1 ? " (Quiz/Project)" : ""}`,
          durationMinutes: rint(4, 22),
          preview: l === 0 || rand() < 0.15,
          completed: false,
        });
      }
      curriculum.push({
        id: `${id}-S${s + 1}`,
        title: `Section ${s + 1}: ${sectionNames[Math.min(s, sectionNames.length - 1)]}`,
        lessonCount: lessons.length,
        durationMinutes: lessons.reduce((a, b) => a + b.durationMinutes, 0),
        lessons,
      });
    }
    const totalDurationMinutes = curriculum.reduce((a, s) => a + s.durationMinutes, 0);

    const reviews = [];
    const numReviews = rint(3, 5);
    for (let rIdx = 0; rIdx < numReviews; rIdx++) {
      const [f, l] = pick(reviewNames);
      reviews.push({
        id: `${id}-R${rIdx + 1}`,
        user: { name: `${f} ${l}`, avatarColor: pick(["#0B3CFF", "#7C3AED", "#DB2777", "#059669", "#EA580C", "#0891B2"]), initials: `${f[0]}${l[0]}` },
        rating: pick([5, 5, 5, 4, 4, 3]),
        date: `2026-${String(rint(1, 9)).padStart(2, "0")}-${String(rint(1, 28)).padStart(2, "0")}`,
        title: pick(reviewTitles),
        comment: pick(reviewComments),
        helpfulCount: rint(0, 640),
        verified: rand() < 0.85,
      });
    }
    // sort reviews newest first
    reviews.sort((a, b) => (a.date < b.date ? 1 : -1));

    courses.push({
      id,
      slug: `${slugBase}-${id.slice(2)}`,
      title,
      shortDescription: spec.desc(cat),
      description:
        spec.desc(cat) +
        " " +
        `This course was designed to take you from fundamentals to job-ready skills through ${lessonNo} focused lessons, hands-on projects and downloadable resources. By the end, you will have a portfolio-worthy build and the confidence to apply these skills in the real world.`,
      category: cat,
      tags: [cat, pick(["Hands-On", "Project-Based", "Career", "Certificate", "Trending"]), pick(["Practical", "Complete", "For Beginners", "Advanced"])],
      level: levels[rint(0, 3)],
      language: pick(["English", "English", "English", "Bangla (বাংলা)"]),
      isBestseller: bestseller,
      isNew,
      recentlyUpdated,
      updatedAt,
      totalLessons: lessonNo,
      durationHours: Math.round((totalDurationMinutes / 60) * 10) / 10,
      durationMinutes: totalDurationMinutes,
      certificate: true,
      rating,
      ratingCount,
      studentsCount: students,
      price: { amount: price, currency: "USD", originalAmount: originalPrice, discountPercent: discount },
      thumbnail: {
        type: "gradient",
        colors: [pick(thumbColors), pick(thumbColors)],
        emoji: pick(["🚀", "💻", "📱", "📊", "🎨", "📈", "📸", "🎵", "🧠", "⚙️", "☁️", "🔐"]),
        label: title.slice(0, 2).toUpperCase(),
      },
      whatYouWillLearn: learnSnippets[cat],
      requirements,
      curriculum,
      reviews,
      creator: {
        name: creator.name,
        title: creator.title,
        avatarColor: pick(["#0B3CFF", "#7C3AED", "#DB2777", "#059669", "#EA580C", "#0891B2"]),
        initials: `${firstName(creator)[0]}${lastName(creator)[0]}`,
        verified: true,
        bio: creator.bio,
        stats: {
          totalStudents: rint(40000, 320000),
          totalCourses: rint(2, 14),
          totalReviews: rint(900, 26000),
          avgRating: (4.4 + Math.round(rand() * 5) / 10),
        },
      },
    });
  }
}

const out = {
  meta: {
    source: "ByteSpace Figma design (file 26TBgRjmpuxudcErJsHUfy)",
    generatedFor: "Search Page / Course Details / Course Lessons / Course Reviews / Creator Profile",
    count: courses.length,
    generatedAt: "2026-09-30",
    design: {
      platformName: "ByteSpace",
      navigation: ["Home", "Courses", "Creators"],
      heroHeadline: "Get Access to Hundreds Courses Available",
      heroSubheadline: "Unlock your creativity, gain valuable knowledge, and grow your business with our wide range of courses.",
      searchPlaceholder: "Course, Topic, Creator",
      searchButton: "Search",
    },
  },
  categories,
  levels,
  courses,
};

const target = join(root, "data", "courses.json");
mkdirSync(dirname(target), { recursive: true });
writeFileSync(target, JSON.stringify(out, null, 2), "utf8");
console.log(`Wrote ${courses.length} courses to data/courses.json (${(Buffer.byteLength(JSON.stringify(out)) / 1024 / 1024).toFixed(2)} MB)`);