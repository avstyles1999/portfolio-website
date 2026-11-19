# Portfolio Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build Anmol Verma's static personal portfolio site — a single-scroll homepage plus 6 dedicated project case-study pages — per `docs/superpowers/specs/2026-11-19-portfolio-website-design.md`.

**Architecture:** Next.js (App Router) + TypeScript + Tailwind CSS, fully statically generated. Content (experience, education, skills, project case studies) lives in typed data files under `content/`, consumed by both the homepage and the `/projects/[slug]` dynamic route. No backend, no CMS, no database.

**Tech Stack:** Next.js 15, React 19, TypeScript, Tailwind CSS 3, Vitest + React Testing Library for component/unit tests, Node 22 / npm (already installed on this machine).

## Global Constraints

- Static export — no server runtime, no API routes, no database.
- Single accent color: deep emerald green `#047857` (hover/emphasis `#065F46`). Background `#FAFAFA`/`#FFFFFF`, primary text `#1A1A1A`, muted text `#6B7280`, borders `#E5E7EB`.
- Single sans-serif font family (Inter) for headings and body. No serif anywhere.
- Mobile-first responsive design: every component must work at mobile width before desktop refinements are added.
- No screenshots, diagrams, or code snippets on case study pages — text only.
- No contact form, no blog, no CMS.
- WCAG AA color contrast on all text/background pairs.

---

## Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `postcss.config.js`, `.eslintrc.json`, `vitest.config.ts`
- Create: `app/layout.tsx`, `app/globals.css`, `app/page.tsx`
- Create: `vitest.setup.ts`

**Interfaces:**
- Produces: Tailwind theme tokens `brand.bg` (#FAFAFA), `brand.surface` (#FFFFFF), `brand.text` (#1A1A1A), `brand.muted` (#6B7280), `brand.border` (#E5E7EB), `brand.accent` (#047857), `brand.accentDark` (#065F46), used by every later component.
- Produces: root layout exporting `metadata` object consumed implicitly by all pages.

- [ ] **Step 1: Initialize Next.js app**

```bash
npx create-next-app@latest . --typescript --tailwind --eslint --app --src-dir=false --import-alias "@/*" --use-npm --no-turbopack
```
Answer prompts to keep existing `docs/` and CV file in place (do not overwrite them).

- [ ] **Step 2: Configure Tailwind theme tokens**

Edit `tailwind.config.ts`:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          bg: "#FAFAFA",
          surface: "#FFFFFF",
          text: "#1A1A1A",
          muted: "#6B7280",
          border: "#E5E7EB",
          accent: "#047857",
          accentDark: "#065F46",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "ui-sans-serif", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
```

- [ ] **Step 3: Set up Inter font and base layout**

Edit `app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Anmol Verma — Software Engineering Lead",
  description:
    "Portfolio of Anmol Verma, Team Lead Software Development — real-time, safety-critical systems and AI-driven automation.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-brand-bg text-brand-text antialiased`}>
        {children}
      </body>
    </html>
  );
}
```

- [ ] **Step 4: Install test tooling**

```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom jsdom @vitejs/plugin-react
```

Create `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    globals: true,
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, ".") },
  },
});
```

Create `vitest.setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
```

Add to `package.json` scripts: `"test": "vitest run"`.

- [ ] **Step 5: Write a smoke test for the root layout font/color setup**

Create `app/__tests__/page.smoke.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "../page";

describe("Homepage scaffold", () => {
  it("renders without crashing", () => {
    render(<Page />);
    expect(document.body).toBeInTheDocument();
  });
});
```

Replace `app/page.tsx` with a minimal placeholder returning `<main>Portfolio</main>` for now (later tasks replace this).

- [ ] **Step 6: Run the test and the build to verify scaffold works**

```bash
npm run test
npm run build
```
Expected: test passes, build succeeds with no TypeScript/ESLint errors.

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js app with Tailwind brand theme and Vitest"
```

---

## Task 2: Shared Content Types + Experience/Education/Skills Data

**Files:**
- Create: `content/types.ts`
- Create: `content/experience.ts`
- Create: `content/education.ts`
- Create: `content/skills.ts`
- Test: `content/__tests__/experience.test.ts`, `content/__tests__/education.test.ts`, `content/__tests__/skills.test.ts`

**Interfaces:**
- Produces types: `ExperienceEntry { title: string; company: string; dates: string; highlights: string[] }`, `Achievement { title: string; detail: string }`, `EducationInfo { degree: string; institution: string; dates: string; location: string; achievements: Achievement[] }`, `SkillGroup { category: string; items: string[] }`.
- Produces data: `experience: ExperienceEntry[]` (3 entries), `education: EducationInfo`, `skills: SkillGroup[]` (5 groups) — consumed by Task 4/5 components.

- [ ] **Step 1: Write failing tests for data shape**

Create `content/__tests__/experience.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { experience } from "../experience";

describe("experience data", () => {
  it("has exactly 3 professional roles in reverse-chronological order", () => {
    expect(experience).toHaveLength(3);
    expect(experience[0].company).toBe("Cellprop Private Limited");
    expect(experience[0].title).toBe("Team Lead Software Development");
    expect(experience[2].company).toBe("Goldman Sachs");
  });

  it("every entry has at least 2 highlights", () => {
    experience.forEach((entry) => {
      expect(entry.highlights.length).toBeGreaterThanOrEqual(2);
    });
  });
});
```

Create `content/__tests__/education.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { education } from "../education";

describe("education data", () => {
  it("has the correct degree and 3 achievements", () => {
    expect(education.degree).toBe("B.E. in Information Technology");
    expect(education.institution).toBe("Jadavpur University");
    expect(education.achievements).toHaveLength(3);
  });
});
```

Create `content/__tests__/skills.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { skills } from "../skills";

describe("skills data", () => {
  it("has the 5 resume skill categories", () => {
    const categories = skills.map((g) => g.category);
    expect(categories).toEqual([
      "Programming Languages",
      "Databases",
      "AI Tools & Low-Code",
      "Web Technologies",
      "Frameworks & Tools",
    ]);
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm run test
```
Expected: FAIL — modules `../experience`, `../education`, `../skills` not found.

- [ ] **Step 3: Write `content/types.ts`**

```ts
export interface ExperienceEntry {
  title: string;
  company: string;
  dates: string;
  highlights: string[];
}

export interface Achievement {
  title: string;
  detail: string;
}

export interface EducationInfo {
  degree: string;
  institution: string;
  dates: string;
  location: string;
  achievements: Achievement[];
}

export interface SkillGroup {
  category: string;
  items: string[];
}
```

- [ ] **Step 4: Write `content/experience.ts`**

```ts
import type { ExperienceEntry } from "./types";

export const experience: ExperienceEntry[] = [
  {
    title: "Team Lead Software Development",
    company: "Cellprop Private Limited",
    dates: "04/2024 – Present",
    highlights: [
      "Lead a cross-functional team of 4-5 engineers delivering production-grade, safety-critical transportation software; own sprint planning, code reviews, and CI pipelines.",
      "Lead development of an AI Accountant finance platform on Zoho Creator, owning the bank reconciliation module end to end.",
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
      "Developed a full-stack TCA analytics platform (React + Flask + KDB+) used by 50+ internal users for post-trade analysis.",
      "Enhanced wheel-order detection logic, improving classification accuracy by 20-30% and reducing false positives.",
    ],
  },
];
```

- [ ] **Step 5: Write `content/education.ts`**

```ts
import type { EducationInfo } from "./types";

export const education: EducationInfo = {
  degree: "B.E. in Information Technology",
  institution: "Jadavpur University",
  dates: "07/2017 – 06/2021",
  location: "Kolkata",
  achievements: [
    {
      title: "AIR 42, TCS CodeVita 2020 (Round 1)",
      detail: "All India Rank 42 in Round 1 of TCS CodeVita, a global coding competition.",
    },
    {
      title: "Gold Medal, SOF International Mathematics Olympiad 2016-17 (Level 1)",
      detail: "Science Olympiad Foundation IMO, Level 1.",
    },
    {
      title: "Gold Medal, SOF National Science Olympiad 2016-17 (Level 1)",
      detail: "Science Olympiad Foundation NSO, Level 1.",
    },
  ],
};
```

(Bronze in IMO Level 2 2016-17 is intentionally omitted to keep the list to the 3 strongest results — flag to Anmol in the task summary; easy to add as a 4th entry if he wants all four medals shown.)

- [ ] **Step 6: Write `content/skills.ts`**

```ts
import type { SkillGroup } from "./types";

export const skills: SkillGroup[] = [
  { category: "Programming Languages", items: ["C", "C++", "Python", "JavaScript", "TypeScript", "Q"] },
  { category: "Databases", items: ["MongoDB", "SQL", "KDB+"] },
  { category: "AI Tools & Low-Code", items: ["Claude Code", "Codex", "Zoho Creator", "Deluge"] },
  {
    category: "Web Technologies",
    items: ["HTML5", "CSS", "React.js", "Node.js", "Express.js", "Next.js", "MUI", "Zustand", "React Flow", "Web Workers", "WebSockets", "REST APIs"],
  },
  { category: "Frameworks & Tools", items: ["AWS", "Git", "GitHub Actions", "Vitest", "Flask", "MQTT", "Linux", "Systemd", "Redis"] },
];
```

- [ ] **Step 7: Run tests to verify they pass**

```bash
npm run test
```
Expected: PASS (all 3 new test files).

- [ ] **Step 8: Commit**

```bash
git add content/
git commit -m "feat: add experience, education, and skills content data"
```

---

## Task 3: Project Case Study Content Data

**Files:**
- Modify: `content/types.ts` (add `Project` type)
- Create: `content/projects.ts`
- Test: `content/__tests__/projects.test.ts`

**Interfaces:**
- Produces type: `Project { slug: string; title: string; oneLiner: string; techStack: string[]; standoutMetric: string; overview: string; problem: string; approach: string; impact: string[]; order: number }`.
- Produces data: `projects: Project[]` (6 entries, ordered per spec) — consumed by Task 5 (grid) and Task 6 (case study pages).

- [ ] **Step 1: Write failing test for project data**

Create `content/__tests__/projects.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { projects } from "../projects";

describe("projects data", () => {
  it("has exactly 6 projects with unique slugs in spec order", () => {
    expect(projects).toHaveLength(6);
    const slugs = projects.map((p) => p.slug);
    expect(slugs).toEqual([
      "prt-network-simulator",
      "realtime-routing-engine",
      "ai-accountant-platform",
      "network-operating-system",
      "diagnostic-watchdog",
      "goldman-tca-platform",
    ]);
    expect(new Set(slugs).size).toBe(6);
  });

  it("every project has non-empty problem, approach, and at least one impact metric", () => {
    projects.forEach((p) => {
      expect(p.problem.length).toBeGreaterThan(0);
      expect(p.approach.length).toBeGreaterThan(0);
      expect(p.impact.length).toBeGreaterThan(0);
    });
  });

  it("network-operating-system lists Node.js/Express/MongoDB in its tech stack", () => {
    const nos = projects.find((p) => p.slug === "network-operating-system")!;
    expect(nos.techStack).toEqual(expect.arrayContaining(["Node.js", "Express", "MongoDB"]));
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm run test
```
Expected: FAIL — `../projects` not found.

- [ ] **Step 3: Add `Project` type to `content/types.ts`**

```ts
export interface Project {
  slug: string;
  title: string;
  oneLiner: string;
  techStack: string[];
  standoutMetric: string;
  overview: string;
  problem: string;
  approach: string;
  impact: string[];
  order: number;
}
```

- [ ] **Step 4: Write `content/projects.ts` with all 6 case studies**

```ts
import type { Project } from "./types";

export const projects: Project[] = [
  {
    slug: "prt-network-simulator",
    title: "PRT Network Simulator",
    oneLiner: "A browser-based simulator for designing and dispatching a Personalized Rapid Transit network.",
    techStack: ["Next.js", "React", "TypeScript", "Web Workers"],
    standoutMetric: "Deterministic simulation across 1–50x speeds",
    order: 1,
    overview:
      "A browser-based PRT (Personalized Rapid Transit) network simulator, co-built with a teammate and used directly in client pitches and for internal fleet and layout sizing. Teams draw track networks over real site plans, load an origin-destination demand matrix, and simulate pod dispatch end to end.",
    problem:
      "Pitching a PRT deployment to a prospective client, or sizing a fleet for a new site layout, required a way to show how a proposed track network and pod fleet would actually perform — without building physical infrastructure first. The tool needed to run fast enough to iterate live in a client meeting, and reliably enough that two runs of the same scenario gave the same answer.",
    approach:
      "Built a track designer supporting stations, sub-ports, junctions, and capacitor docks, with curved tracks, reference-image tracing, and scale/north calibration so track lengths and curve-limited speeds map to real-world metres. On top of that sits a rules engine enforcing berth exclusivity, time-based headway, opposite-direction mutual exclusion, and shortest-path routing with a deadlock safeguard, where the dispatcher prioritizes passenger wait time over empty pod repositioning moves. A scenario builder lets users define passenger demand via an origin-destination matrix (with CSV import), per-port pod fleet size, cruise speed, pod capacity, headway, and dwell time. To make the simulation trustworthy for comparing scenarios, the whole engine runs on a fixed-step tick with a seeded PRNG, making results fully deterministic regardless of playback speed. Batched ticks were moved into a Web Worker to remove frame jumps and UI freezes under high demand.",
    impact: [
      "Used directly in client pitches and internal fleet/layout sizing decisions.",
      "Fully deterministic across 1–50x playback speeds, enabling reliable scenario comparison.",
      "Post-trip analytics (avg/max/p80/p90 wait and transfer times, per-pod distance, CSV export) give quantifiable answers to 'how would this layout perform?'",
    ],
  },
  {
    slug: "realtime-routing-engine",
    title: "Real-time Routing & Vehicle Control Engine",
    oneLiner: "A constraint-aware routing engine and protocol implementation powering real-time PRT vehicle control.",
    techStack: ["Python", "CBTC", "APM"],
    standoutMetric: "Sub-200-300ms control latency across 100+ concurrent vehicles",
    order: 2,
    overview:
      "An end-to-end Python routing engine handling path computation for 100+ concurrent vehicles in a PRT network, alongside core CBTC (Communications-Based Train Control) and APM (Automated People Mover) protocol features for real-time vehicle control.",
    problem:
      "A fleet of autonomous PRT vehicles sharing a track network needs routes that avoid collisions and minimize conflicts and idle time, recomputed continuously as vehicle positions and demand change — all while meeting the strict latency requirements of safety-critical transit control.",
    approach:
      "Designed a constraint-aware routing engine that evaluates all feasible paths in real time using distance, ETA, traffic density, and blockages, enforcing strict route adherence to prevent collisions. Implemented core CBTC and APM protocol features to drive real-time vehicle control within a 200-300ms latency budget, which required careful attention to computational cost per routing decision at scale (100+ concurrent vehicles).",
    impact: [
      "Reduced route conflicts and idle time by 30-40%.",
      "Real-time vehicle control latency held under 200-300ms.",
      "Handles 100+ concurrent vehicle path computations.",
    ],
  },
  {
    slug: "ai-accountant-platform",
    title: "AI Accountant Finance Platform",
    oneLiner: "A Zoho Creator finance automation platform automating bank reconciliation for accounting teams.",
    techStack: ["Zoho Creator", "Deluge", "Zoho WorkDrive API", "Zoho Creator REST API"],
    standoutMetric: "90+ Deluge functions powering automated reconciliation",
    order: 3,
    overview:
      "An AI-driven finance automation platform built on Zoho Creator, where I own the bank and reconciliation module: bank statement ingestion, transaction matching, payment allocation, and a CA-facing review view.",
    problem:
      "Manual bank reconciliation — matching bank transactions to invoices, catching duplicate invoices, and reconciling across multiple bank statements — is slow and error-prone for accounting teams, and lacks a clear audit trail when something needs to be traced back.",
    approach:
      "Built 90+ Deluge functions including a multi-signal scoring engine for bank-to-invoice matching, duplicate-invoice detection, and multi-bank statement de-duplication, all integrated with Zoho WorkDrive and Creator REST APIs. A centralized audit-event trail records every automated decision so a CA-facing review view can verify or override matches with full context. Day-to-day development on this platform uses AI coding tools (Claude Code, Codex) with Git-mirrored source, agent instruction files, and task templates, keeping AI-assisted changes reviewable and governed rather than opaque.",
    impact: [
      "90+ Deluge functions in production covering matching, de-duplication, and audit trail.",
      "Automated multi-signal scoring reduces manual bank-to-invoice matching effort.",
      "Governed AI-assisted development workflow (Git-mirrored source, agent instructions, task templates) used in day-to-day delivery.",
    ],
  },
  {
    slug: "network-operating-system",
    title: "Network Operating System",
    oneLiner: "A distributed network operating system coordinating real-time vehicle communication, routing, and automation.",
    techStack: ["Node.js", "Express", "MongoDB"],
    standoutMetric: "30-40% fewer routing conflicts via zone-based partitioning",
    order: 4,
    overview:
      "A distributed network operating system (NOS), built on Node.js, Express, and MongoDB, that manages real-time vehicle communication, routing, and automation across a PRT fleet.",
    problem:
      "Coordinating many vehicles across a shared track network in real time creates contention: vehicles can conflict over the same track segments, and routine fleet operations like maintenance and charging need to be scheduled without creating safety incidents or unplanned downtime.",
    approach:
      "Implemented zone-based traffic partitioning to localize routing decisions and reduce cross-zone contention, backed by MongoDB for persistence of vehicle and network state and an Express-based API layer coordinating communication between vehicles and the rest of the system. Automated maintenance scheduling and vehicle charging so these routine operations run without manual coordination, with safety constraints built into the automation rather than bolted on afterward.",
    impact: [
      "Reduced routing conflicts by 30-40% and improved throughput via zone-based partitioning.",
      "Automated maintenance scheduling and charging contributed to near-zero hazardous incidents across simulations and trials.",
    ],
  },
  {
    slug: "diagnostic-watchdog",
    title: "Diagnostic Watchdog & Monitoring Systems",
    oneLiner: "A multi-component health monitoring system covering vehicles, control software, and UIs.",
    techStack: ["Python", "Systemd", "Linux"],
    standoutMetric: "50-60% reduction in mean time to detection",
    order: 5,
    overview:
      "A multi-component health monitoring and watchdog system covering the Network Operating System, vehicles, and operator/user-facing UIs, built to catch problems before they became incidents.",
    problem:
      "In a safety-critical, distributed vehicle system, failures in any one component (a vehicle, the NOS, or a UI) can go unnoticed until they cascade into a larger incident, and manual log review is too slow to catch issues in time to act.",
    approach:
      "Designed a diagnostic and watchdog service in Python that performs automated log parsing across NOS, vehicle, and UI components, with alerting and remediation workflows wired directly into the detection pipeline so that known failure patterns trigger automated recovery actions rather than waiting on a human responder.",
    impact: [
      "Reduced mean time to detection (MTTD) by 50-60%.",
      "Reduced overall system downtime by ~50-60% through automated alerting and remediation.",
      "Enabled automated alerts and recovery actions across NOS, vehicles, and UIs.",
    ],
  },
  {
    slug: "goldman-tca-platform",
    title: "Goldman Sachs TCA Analytics Platform",
    oneLiner: "A full-stack transaction cost analysis platform used by 50+ internal analysts for post-trade analysis.",
    techStack: ["React", "Flask", "KDB+"],
    standoutMetric: "50+ internal users, millions of trade records processed daily",
    order: 6,
    overview:
      "A full-stack Transaction Cost Analysis (TCA) platform built with React, Flask, and KDB+, used by more than 50 internal users at Goldman Sachs for post-trade analysis.",
    problem:
      "Post-trade analysts needed fast, accurate transaction cost metrics over millions of trade records per day, including correctly classifying complex order types like wheel orders, under tight regulatory and client reporting deadlines.",
    approach:
      "Built the platform end to end: a Flask backend querying KDB+ (a column-store time-series database used heavily in trading infrastructure for its query performance over large tick/trade datasets) to keep analytics queries fast even over millions of daily trade records, and a React frontend surfacing TCA metrics to analysts. Improved the wheel-order detection logic specifically to reduce misclassification, which had been generating false positives in cost analysis.",
    impact: [
      "Adopted by 50+ internal users for day-to-day post-trade analysis.",
      "Processed millions of trade records daily with low-latency query performance.",
      "Improved wheel-order classification accuracy by 20-30%, reducing false positives.",
    ],
  },
];
```

- [ ] **Step 5: Run tests to verify they pass**

```bash
npm run test
```
Expected: PASS (all project data tests).

- [ ] **Step 6: Commit**

```bash
git add content/
git commit -m "feat: add 6 project case study content entries"
```

---

## Task 4: Homepage Hero, About, Experience, Education Components

**Files:**
- Create: `components/Hero.tsx`, `components/About.tsx`, `components/ExperienceTimeline.tsx`, `components/EducationAchievements.tsx`
- Test: `components/__tests__/Hero.test.tsx`, `components/__tests__/About.test.tsx`, `components/__tests__/ExperienceTimeline.test.tsx`, `components/__tests__/EducationAchievements.test.tsx`

**Interfaces:**
- Consumes: `experience` from `content/experience.ts`, `education` from `content/education.ts` (Task 2).
- Produces: `<Hero />`, `<About />`, `<ExperienceTimeline />`, `<EducationAchievements />` — each a zero-prop component, consumed by `app/page.tsx` in Task 5.

- [ ] **Step 1: Write failing tests**

Create `components/__tests__/Hero.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Hero from "../Hero";

describe("Hero", () => {
  it("renders name, role, and both CTAs", () => {
    render(<Hero />);
    expect(screen.getByText(/Anmol Verma/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /view projects/i })).toHaveAttribute("href", "#projects");
    expect(screen.getByRole("link", { name: /download resume/i })).toHaveAttribute("href", "/resume.pdf");
  });
});
```

Create `components/__tests__/About.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import About from "../About";

describe("About", () => {
  it("mentions the mobility/finance throughline and the outside-of-work line", () => {
    render(<About />);
    expect(screen.getByText(/stock markets|chart patterns/i)).toBeInTheDocument();
    expect(screen.getByText(/cricket|football/i)).toBeInTheDocument();
  });
});
```

Create `components/__tests__/ExperienceTimeline.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ExperienceTimeline from "../ExperienceTimeline";

describe("ExperienceTimeline", () => {
  it("renders all 3 professional roles", () => {
    render(<ExperienceTimeline />);
    expect(screen.getByText("Team Lead Software Development")).toBeInTheDocument();
    expect(screen.getByText("Software Development Engineer")).toBeInTheDocument();
    expect(screen.getByText("Analyst")).toBeInTheDocument();
    expect(screen.getByText("Goldman Sachs")).toBeInTheDocument();
  });
});
```

Create `components/__tests__/EducationAchievements.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import EducationAchievements from "../EducationAchievements";

describe("EducationAchievements", () => {
  it("renders degree and all achievements", () => {
    render(<EducationAchievements />);
    expect(screen.getByText(/B.E. in Information Technology/)).toBeInTheDocument();
    expect(screen.getByText(/AIR 42/)).toBeInTheDocument();
    expect(screen.getByText(/International Mathematics Olympiad/)).toBeInTheDocument();
    expect(screen.getByText(/National Science Olympiad/)).toBeInTheDocument();
  });
});
```

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm run test
```
Expected: FAIL — components don't exist yet.

- [ ] **Step 3: Implement `components/Hero.tsx`**

```tsx
import Link from "next/link";

export default function Hero() {
  return (
    <section className="flex min-h-[80vh] flex-col justify-center px-6 sm:px-12 max-w-5xl mx-auto">
      <h1 className="text-4xl sm:text-6xl font-bold tracking-tight">Anmol Verma</h1>
      <p className="mt-3 text-lg sm:text-2xl text-brand-muted">
        Team Lead, Software Development — Real-time &amp; Safety-Critical Systems
      </p>
      <p className="mt-6 max-w-2xl text-base sm:text-lg">
        I build real-time, safety-critical systems for transportation — and lead the teams that ship them —
        alongside AI-driven finance automation.
      </p>
      <div className="mt-8 flex flex-wrap gap-4">
        <Link
          href="#projects"
          className="rounded-md bg-brand-accent px-5 py-3 text-white font-medium hover:bg-brand-accentDark transition-colors"
        >
          View Projects
        </Link>
        <Link
          href="/resume.pdf"
          className="rounded-md border border-brand-border px-5 py-3 font-medium hover:border-brand-accent transition-colors"
        >
          Download Resume
        </Link>
      </div>
    </section>
  );
}
```

- [ ] **Step 4: Implement `components/About.tsx`**

```tsx
export default function About() {
  return (
    <section className="px-6 sm:px-12 max-w-3xl mx-auto py-16">
      <h2 className="text-2xl font-bold mb-4">About</h2>
      <p className="text-base sm:text-lg leading-relaxed text-brand-text">
        I&apos;m a software engineer with 5+ years of experience delivering real-time, safety-critical systems
        across transportation and fintech — currently leading backend development for a Personalized Rapid
        Transit platform and building AI-driven finance automation on Zoho Creator. I care about systems that
        have to be right the first time, and about building the teams and processes that make that possible.
        Outside of work, I follow financial markets closely — studying chart patterns and company fundamentals
        for fun — and I&apos;m a die-hard cricket and football fan, supporting India and KKR in cricket, and
        Barcelona, Argentina, and Spain in football as a lifelong Messi fan.
      </p>
    </section>
  );
}
```

- [ ] **Step 5: Implement `components/ExperienceTimeline.tsx`**

```tsx
import { experience } from "@/content/experience";

export default function ExperienceTimeline() {
  return (
    <section className="px-6 sm:px-12 max-w-3xl mx-auto py-16">
      <h2 className="text-2xl font-bold mb-8">Experience</h2>
      <div className="space-y-10 border-l border-brand-border pl-6">
        {experience.map((entry) => (
          <div key={`${entry.company}-${entry.title}`}>
            <h3 className="font-semibold text-lg">{entry.title}</h3>
            <p className="text-brand-muted text-sm">
              {entry.company} · {entry.dates}
            </p>
            <ul className="mt-3 space-y-1 list-disc list-inside text-sm sm:text-base">
              {entry.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Implement `components/EducationAchievements.tsx`**

```tsx
import { education } from "@/content/education";

export default function EducationAchievements() {
  return (
    <section className="px-6 sm:px-12 max-w-3xl mx-auto py-16">
      <h2 className="text-2xl font-bold mb-6">Education &amp; Achievements</h2>
      <h3 className="font-semibold">{education.degree}</h3>
      <p className="text-brand-muted text-sm">
        {education.institution}, {education.location} · {education.dates}
      </p>
      <ul className="mt-4 space-y-2 list-disc list-inside text-sm sm:text-base">
        {education.achievements.map((a) => (
          <li key={a.title}>{a.title}</li>
        ))}
      </ul>
    </section>
  );
}
```

- [ ] **Step 7: Run tests to verify they pass**

```bash
npm run test
```
Expected: PASS for all 4 component test files.

- [ ] **Step 8: Commit**

```bash
git add components/
git commit -m "feat: add Hero, About, ExperienceTimeline, EducationAchievements components"
```

---

## Task 5: Projects Grid, Skills, Contact Components + Homepage Assembly

**Files:**
- Create: `components/ProjectCard.tsx`, `components/ProjectsGrid.tsx`, `components/Skills.tsx`, `components/Contact.tsx`
- Modify: `app/page.tsx`
- Test: `components/__tests__/ProjectsGrid.test.tsx`, `components/__tests__/Skills.test.tsx`, `components/__tests__/Contact.test.tsx`, `app/__tests__/page.test.tsx`

**Interfaces:**
- Consumes: `projects` from `content/projects.ts`, `skills` from `content/skills.ts` (both from Task 2/3); `Hero`, `About`, `ExperienceTimeline`, `EducationAchievements` (Task 4).
- Produces: fully assembled `app/page.tsx` homepage.

- [ ] **Step 1: Write failing tests**

Create `components/__tests__/ProjectsGrid.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import ProjectsGrid from "../ProjectsGrid";

describe("ProjectsGrid", () => {
  it("renders 6 project cards in spec order with links to case studies", () => {
    render(<ProjectsGrid />);
    const links = screen.getAllByRole("link", { name: /read case study/i });
    expect(links).toHaveLength(6);
    expect(links[0]).toHaveAttribute("href", "/projects/prt-network-simulator");
    expect(links[5]).toHaveAttribute("href", "/projects/goldman-tca-platform");
  });
});
```

Create `components/__tests__/Skills.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Skills from "../Skills";

describe("Skills", () => {
  it("renders all 5 skill categories", () => {
    render(<Skills />);
    expect(screen.getByText("Programming Languages")).toBeInTheDocument();
    expect(screen.getByText("Frameworks & Tools")).toBeInTheDocument();
  });
});
```

Create `components/__tests__/Contact.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Contact from "../Contact";

describe("Contact", () => {
  it("renders mailto, LinkedIn, and GitHub links", () => {
    render(<Contact />);
    expect(screen.getByRole("link", { name: /email/i })).toHaveAttribute("href", expect.stringContaining("mailto:"));
    expect(screen.getByRole("link", { name: /linkedin/i })).toHaveAttribute(
      "href",
      "https://linkedin.com/in/anmol-verma-966955170"
    );
    expect(screen.getByRole("link", { name: /github/i })).toHaveAttribute("href", "https://github.com/avstyles1999");
  });
});
```

Create `app/__tests__/page.test.tsx` (replaces the Task 1 smoke test):

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "../page";

describe("Homepage", () => {
  it("renders all homepage sections", () => {
    render(<Page />);
    expect(screen.getByText("Anmol Verma")).toBeInTheDocument();
    expect(screen.getByText("Experience")).toBeInTheDocument();
    expect(screen.getByText("Education & Achievements")).toBeInTheDocument();
    expect(screen.getAllByRole("link", { name: /read case study/i })).toHaveLength(6);
    expect(screen.getByText("Programming Languages")).toBeInTheDocument();
  });
});
```

Delete the old `app/__tests__/page.smoke.test.tsx` from Task 1 (superseded by this test).

- [ ] **Step 2: Run tests to verify they fail**

```bash
npm run test
```
Expected: FAIL — `ProjectsGrid`, `Skills`, `Contact` don't exist; `page.test.tsx` fails on missing sections.

- [ ] **Step 3: Implement `components/ProjectCard.tsx`**

```tsx
import Link from "next/link";
import type { Project } from "@/content/types";

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="border border-brand-border rounded-lg p-6 flex flex-col">
      <h3 className="font-semibold text-lg">{project.title}</h3>
      <p className="mt-2 text-sm text-brand-muted flex-1">{project.oneLiner}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.techStack.map((t) => (
          <span key={t} className="text-xs rounded-full border border-brand-border px-2 py-1">
            {t}
          </span>
        ))}
      </div>
      <p className="mt-4 text-sm font-medium text-brand-accentDark">{project.standoutMetric}</p>
      <Link href={`/projects/${project.slug}`} className="mt-4 text-brand-accent font-medium hover:underline">
        Read case study →
      </Link>
    </div>
  );
}
```

- [ ] **Step 4: Implement `components/ProjectsGrid.tsx`**

```tsx
import { projects } from "@/content/projects";
import ProjectCard from "./ProjectCard";

export default function ProjectsGrid() {
  const ordered = [...projects].sort((a, b) => a.order - b.order);
  return (
    <section id="projects" className="px-6 sm:px-12 max-w-5xl mx-auto py-16">
      <h2 className="text-2xl font-bold mb-8">Projects</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ordered.map((project) => (
          <ProjectCard key={project.slug} project={project} />
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 5: Implement `components/Skills.tsx`**

```tsx
import { skills } from "@/content/skills";

export default function Skills() {
  return (
    <section className="px-6 sm:px-12 max-w-3xl mx-auto py-16">
      <h2 className="text-2xl font-bold mb-8">Skills</h2>
      <div className="space-y-6">
        {skills.map((group) => (
          <div key={group.category}>
            <h3 className="font-semibold text-sm text-brand-muted uppercase tracking-wide">{group.category}</h3>
            <div className="mt-2 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span key={item} className="text-sm rounded-full border border-brand-border px-3 py-1">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
```

- [ ] **Step 6: Implement `components/Contact.tsx`**

```tsx
export default function Contact() {
  return (
    <section className="px-6 sm:px-12 max-w-3xl mx-auto py-16 text-center">
      <h2 className="text-2xl font-bold mb-4">Let&apos;s talk</h2>
      <div className="flex flex-wrap justify-center gap-6 text-brand-accent font-medium">
        <a href="mailto:avstyles1999@gmail.com" className="hover:underline">
          Email
        </a>
        <a href="https://linkedin.com/in/anmol-verma-966955170" className="hover:underline">
          LinkedIn
        </a>
        <a href="https://github.com/avstyles1999" className="hover:underline">
          GitHub
        </a>
      </div>
    </section>
  );
}
```

- [ ] **Step 7: Assemble `app/page.tsx`**

```tsx
import Hero from "@/components/Hero";
import About from "@/components/About";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import EducationAchievements from "@/components/EducationAchievements";
import ProjectsGrid from "@/components/ProjectsGrid";
import Skills from "@/components/Skills";
import Contact from "@/components/Contact";

export default function Page() {
  return (
    <main>
      <Hero />
      <About />
      <ExperienceTimeline />
      <EducationAchievements />
      <ProjectsGrid />
      <Skills />
      <Contact />
    </main>
  );
}
```

Delete `app/__tests__/page.smoke.test.tsx`.

- [ ] **Step 8: Run tests to verify they pass**

```bash
npm run test
```
Expected: PASS for all homepage-related tests.

- [ ] **Step 9: Commit**

```bash
git add -A
git commit -m "feat: assemble full homepage with projects grid, skills, and contact"
```

---

## Task 6: Case Study Dynamic Route (`/projects/[slug]`)

**Files:**
- Create: `app/projects/[slug]/page.tsx`
- Create: `components/CaseStudyNav.tsx`
- Test: `app/projects/__tests__/slug.test.tsx`

**Interfaces:**
- Consumes: `projects` from `content/projects.ts` (Task 3).
- Produces: static route generating one page per project slug, with `generateStaticParams` and `generateMetadata`.

- [ ] **Step 1: Write failing tests**

Create `app/projects/__tests__/slug.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import CaseStudyPage, { generateStaticParams } from "../[slug]/page";

describe("Case study page", () => {
  it("generateStaticParams returns all 6 slugs", async () => {
    const params = await generateStaticParams();
    expect(params).toHaveLength(6);
    expect(params.map((p) => p.slug)).toContain("prt-network-simulator");
  });

  it("renders problem, approach, and impact for a given project", async () => {
    const ui = await CaseStudyPage({ params: Promise.resolve({ slug: "prt-network-simulator" }) });
    render(ui);
    expect(screen.getByText("PRT Network Simulator")).toBeInTheDocument();
    expect(screen.getByText(/Problem/i)).toBeInTheDocument();
    expect(screen.getByText(/Approach/i)).toBeInTheDocument();
    expect(screen.getByText(/Impact/i)).toBeInTheDocument();
  });

  it("renders prev/next case study navigation in spec order", async () => {
    const ui = await CaseStudyPage({ params: Promise.resolve({ slug: "ai-accountant-platform" }) });
    render(ui);
    expect(screen.getByRole("link", { name: /realtime routing/i })).toHaveAttribute(
      "href",
      "/projects/realtime-routing-engine"
    );
    expect(screen.getByRole("link", { name: /network operating system/i })).toHaveAttribute(
      "href",
      "/projects/network-operating-system"
    );
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm run test
```
Expected: FAIL — `app/projects/[slug]/page.tsx` doesn't exist.

- [ ] **Step 3: Implement `components/CaseStudyNav.tsx`**

```tsx
import Link from "next/link";
import { projects } from "@/content/projects";

export default function CaseStudyNav({ currentOrder }: { currentOrder: number }) {
  const ordered = [...projects].sort((a, b) => a.order - b.order);
  const prev = ordered.find((p) => p.order === currentOrder - 1);
  const next = ordered.find((p) => p.order === currentOrder + 1);

  return (
    <nav className="flex justify-between border-t border-brand-border pt-6 mt-12 text-sm">
      <Link href="/#projects" className="text-brand-accent hover:underline">
        ← Back to projects
      </Link>
      <div className="flex gap-6">
        {prev && (
          <Link href={`/projects/${prev.slug}`} className="text-brand-accent hover:underline">
            {prev.title}
          </Link>
        )}
        {next && (
          <Link href={`/projects/${next.slug}`} className="text-brand-accent hover:underline">
            {next.title}
          </Link>
        )}
      </div>
    </nav>
  );
}
```

- [ ] **Step 4: Implement `app/projects/[slug]/page.tsx`**

```tsx
import { notFound } from "next/navigation";
import Link from "next/link";
import { projects } from "@/content/projects";
import CaseStudyNav from "@/components/CaseStudyNav";

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) return {};
  return {
    title: `${project.title} — Anmol Verma`,
    description: project.oneLiner,
    openGraph: { title: project.title, description: project.oneLiner },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug);
  if (!project) notFound();

  return (
    <main className="px-6 sm:px-12 max-w-3xl mx-auto py-16">
      <Link href="/#projects" className="text-sm text-brand-muted hover:underline">
        ← Projects
      </Link>
      <h1 className="text-3xl sm:text-4xl font-bold mt-4">{project.title}</h1>
      <p className="mt-2 text-brand-muted">{project.oneLiner}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {project.techStack.map((t) => (
          <span key={t} className="text-xs rounded-full border border-brand-border px-2 py-1">
            {t}
          </span>
        ))}
      </div>

      <section className="mt-10">
        <h2 className="text-xl font-semibold">Overview</h2>
        <p className="mt-2 leading-relaxed">{project.overview}</p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Problem</h2>
        <p className="mt-2 leading-relaxed">{project.problem}</p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Approach</h2>
        <p className="mt-2 leading-relaxed">{project.approach}</p>
      </section>

      <section className="mt-8">
        <h2 className="text-xl font-semibold">Impact</h2>
        <ul className="mt-2 space-y-1 list-disc list-inside font-medium text-brand-accentDark tabular-nums">
          {project.impact.map((i) => (
            <li key={i}>{i}</li>
          ))}
        </ul>
      </section>

      <CaseStudyNav currentOrder={project.order} />
    </main>
  );
}
```

- [ ] **Step 5: Run tests to verify they pass**

```bash
npm run test
```
Expected: PASS for all case study route tests.

- [ ] **Step 6: Commit**

```bash
git add app/projects/ components/CaseStudyNav.tsx
git commit -m "feat: add case study dynamic route with prev/next navigation"
```

---

## Task 7: Resume Asset + Site-Wide Header/Footer Nav

**Files:**
- Create: `public/resume.pdf` (copy of existing `Anmol-Verma-CV.pdf`)
- Create: `components/Header.tsx`, `components/Footer.tsx`
- Modify: `app/layout.tsx`
- Test: `components/__tests__/Header.test.tsx`

**Interfaces:**
- Produces: `<Header />`, `<Footer />` wrapping every page via `app/layout.tsx`.

- [ ] **Step 1: Copy resume into `public/`**

```bash
mkdir -p public
cp "Anmol-Verma-CV.pdf" public/resume.pdf
```

- [ ] **Step 2: Write failing test for Header**

Create `components/__tests__/Header.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Header from "../Header";

describe("Header", () => {
  it("renders a home link and a resume link", () => {
    render(<Header />);
    expect(screen.getByRole("link", { name: /anmol verma/i })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: /resume/i })).toHaveAttribute("href", "/resume.pdf");
  });
});
```

- [ ] **Step 3: Run test to verify it fails**

```bash
npm run test
```
Expected: FAIL — `Header` doesn't exist.

- [ ] **Step 4: Implement `components/Header.tsx`**

```tsx
import Link from "next/link";

export default function Header() {
  return (
    <header className="flex items-center justify-between px-6 sm:px-12 py-4 border-b border-brand-border">
      <Link href="/" className="font-semibold">
        Anmol Verma
      </Link>
      <nav className="flex gap-6 text-sm">
        <Link href="/#projects" className="hover:text-brand-accent">
          Projects
        </Link>
        <Link href="/resume.pdf" className="hover:text-brand-accent">
          Resume
        </Link>
      </nav>
    </header>
  );
}
```

(Nav is a 2-item flex row that wraps naturally on narrow screens — no hamburger menu needed given the minimal 2-link nav.)

- [ ] **Step 5: Implement `components/Footer.tsx`**

```tsx
export default function Footer() {
  return (
    <footer className="px-6 sm:px-12 py-8 border-t border-brand-border text-sm text-brand-muted text-center">
      © {new Date().getFullYear()} Anmol Verma
    </footer>
  );
}
```

- [ ] **Step 6: Wire Header/Footer into `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });

export const metadata: Metadata = {
  title: "Anmol Verma — Software Engineering Lead",
  description:
    "Portfolio of Anmol Verma, Team Lead Software Development — real-time, safety-critical systems and AI-driven automation.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans bg-brand-bg text-brand-text antialiased`}>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
```

- [ ] **Step 7: Run tests to verify they pass**

```bash
npm run test
```
Expected: PASS.

- [ ] **Step 8: Commit**

```bash
git add public/resume.pdf components/Header.tsx components/Footer.tsx app/layout.tsx
git commit -m "feat: add resume asset and site-wide header/footer navigation"
```

---

## Task 8: Final Build Verification

**Files:** none created; verification only.

- [ ] **Step 1: Run full test suite**

```bash
npm run test
```
Expected: all tests across all tasks PASS.

- [ ] **Step 2: Run lint**

```bash
npm run lint
```
Expected: no errors.

- [ ] **Step 3: Run production build**

```bash
npm run build
```
Expected: build succeeds, all 6 project slugs statically generated (visible in build output under `app/projects/[slug]`), homepage statically generated.

- [ ] **Step 4: Spot-check mobile viewport manually**

```bash
npm run start
```
Open `http://localhost:3000` in a browser, resize to ~375px width, verify: hero/about/timeline/grid stack to single column, no horizontal scroll, nav/footer readable, project card grid is 1 column.

- [ ] **Step 5: Commit any final fixes**

```bash
git add -A
git commit -m "chore: final build verification pass"
```

(Only commit if Steps 1-4 required code changes — if everything already passes, this step is a no-op.)

---

## Self-Review Notes

- **Spec coverage:** Site map (Task 1/6), homepage sections incl. corrected Education split (Task 4/5), 6 case studies with text-only content (Task 3/6), visual design system/colors/fonts (Task 1), responsive design (Tasks 1/5/8 verification), technical architecture/typed content/static export (Tasks 1-3, 6, 8), resume download (Task 7), contact links (Task 5) — all covered. Deployment (Vercel) is explicitly out of scope for this plan per spec ("deferred until after build").
- **Placeholder scan:** No TBD/TODO markers. Olympiad Bronze medal (Level 2) was deliberately left out of the 3-item achievement list for brevity — flagged inline in Task 2 rather than silently dropped; Anmol can add a 4th entry by editing `content/education.ts` directly.
- **Type consistency:** `Project`, `ExperienceEntry`, `EducationInfo`, `SkillGroup` defined once in `content/types.ts` (Tasks 2-3) and referenced identically in every component (Tasks 4-7).
