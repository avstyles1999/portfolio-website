import type { ExperienceEntry } from "./types";

export const experience: ExperienceEntry[] = [
  {
    title: "Team Lead Software Development",
    company: "Cellprop Private Limited",
    dates: "04/2024 – Present",
    highlights: [
      "Lead a cross-functional team of 4-5 engineers delivering production-grade, safety-critical transportation software; own sprint planning, code reviews, and CI pipelines.",
      "Built a safety-critical, constraint-aware routing engine in Python with core CBTC/APM protocol features, driving real-time control of 100+ concurrent PRT vehicles within a 200-300ms latency budget.",
      "Lead an AI Accountant finance automation platform on Zoho Creator; personally built the bank statement ingestion and reconciliation pipeline and parts of purchase invoice processing.",
      "Co-developed a browser-based PRT network simulator (Next.js/React/TypeScript) used directly in client pitches and fleet sizing.",
    ],
  },
  {
    title: "Software Development Engineer",
    company: "Cellprop Private Limited",
    dates: "05/2023 – 03/2024",
    highlights: [
      "Built the core backend control system for a PRT vehicle platform (Node.js & Express) managing real-time control flows for field tests.",
      "Designed a real-time operator monitoring dashboard in React with sub-second telemetry updates.",
      "Reduced infrastructure costs ~35-45% by migrating backend services from AWS EC2 to LightSail.",
    ],
  },
  {
    title: "Analyst",
    company: "Goldman Sachs",
    dates: "07/2021 – 02/2023",
    highlights: [
      "Developed a full-stack TCA analytics platform (React + Flask + KDB+) used by 20+ internal users for post-trade analysis.",
      "Enhanced wheel-order detection logic, improving classification accuracy by 20-30% and reducing false positives.",
    ],
  },
];
