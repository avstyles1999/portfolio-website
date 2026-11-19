# Portfolio Website — Design Spec

**Date:** 2026-11-19
**Owner:** Anmol Verma

## Purpose & Goals

A professional personal portfolio site for Anmol Verma, Team Lead Software Development (5+ years experience, real-time/safety-critical transportation systems, fintech, AI-driven automation).

Primary goals, in priority order:
1. **Job search** — optimized to be credible to both Engineering Lead/Manager hiring managers and Senior/Staff IC interviewers. The site presents both leadership evidence (team of 4-5, sprint ownership, mentoring) and deep technical evidence (real-time systems, routing algorithms, protocol implementation) without favoring one track — let the viewer draw their own conclusion.
2. **Personal brand** — a clean, credible presence findable via LinkedIn/GitHub/resume links.
3. **Freelance/consulting leads** — secondary; the Contact section and case studies should read as usable by a prospective client, but no dedicated services/pricing content is being built now.

Domain emphasis (real-time systems vs. AI automation vs. fintech) is not predetermined — Anmol will weight individual case studies by how he writes them, rather than the design favoring one domain.

## Site Map

```
/                           → Homepage (single scroll)
  ├─ Hero
  ├─ About
  ├─ Experience Timeline (professional roles only)
  ├─ Education & Achievements
  ├─ Featured Projects grid (6 cards)
  ├─ Skills
  └─ Contact

/projects/[slug]            → Case study pages (6 total), see "Case Studies" below

/resume.pdf                 → Static asset, served as-is, linked from Hero "Download Resume"
```

No blog, no CMS, no backend, no database, no contact form. Content is authored directly in the codebase as typed data (see Technical Architecture) and the site is fully statically generated.

## Homepage Sections

**Hero**
Full-width, generous whitespace, text/type-driven (no stock imagery or illustration). Name large, role subtitle ("Team Lead, Software Development — Real-time & Safety-Critical Systems"), one-line value proposition tying together real-time systems + leadership + AI-driven automation. Two CTAs: "View Projects" (scrolls to project grid) and "Download Resume" (links to `/resume.pdf`).

**About**
3-4 sentences, first person, rewritten from the resume summary (not copy-pasted resume prose) establishing the throughline across Cellprop, Goldman Sachs, and the project work. Ends with one single humanizing sentence about interests outside of work (e.g. "Outside of work, I ..." — exact wording to be supplied by Anmol during content-writing). No dedicated hobbies/interests section.

**Experience Timeline**
Vertical, reverse-chronological, **professional roles only** (education lives in its own section below):
- Team Lead Software Development, Cellprop Private Limited (04/2024–Present)
- Software Development Engineer, Cellprop Private Limited (05/2023–03/2024)
- Analyst, Goldman Sachs (07/2021–02/2023)

Each entry: title, company, dates, 2-3 condensed highlight bullets. This is intentionally more concise than the full resume bullet list — full technical depth lives in the case studies, not here.

**Education & Achievements**
Compact section, separate from Experience:
- B.E. in Information Technology, Jadavpur University (07/2017–06/2021), Kolkata
- Achievement highlights: Olympiad medals, strong global rank in TCS CodeVita, and any other competitive/academic highlights Anmol wants to include.
- Specific details (which Olympiad, year, exact CodeVita rank/year) to be gathered from Anmol during content-writing — the design reserves a compact slot for a short bulleted list here, styled consistently with the Experience entries but visually lighter-weight (no full timeline treatment).

**Featured Projects Grid**
6 cards, responsive grid (1 column mobile → 2 → 3 columns as viewport widens). Each card: project name, one-line description, 3-4 tech tags, one standout metric, "Read case study →" link to `/projects/[slug]`.

Display order:
1. PRT Network Simulator
2. Real-time Routing & Vehicle Control Engine
3. AI Accountant Finance Platform
4. Network Operating System (NOS)
5. Diagnostic Watchdog & Monitoring Systems
6. Goldman Sachs TCA Analytics Platform

**Skills**
Grouped exactly per resume categories (Programming Languages, Databases, AI Tools & Low-Code, Web Technologies, Frameworks & Tools), rendered as tag/pill lists — no progress bars or star ratings.

**Contact**
Simple centered section: heading + email (mailto link), LinkedIn, GitHub as icon-text links. No contact form, no backend required.

## Case Studies

Six case studies, each its own page at `/projects/[slug]`:

| Slug | Project |
|---|---|
| `prt-network-simulator` | PRT Network Simulator (Next.js/React/TypeScript) |
| `realtime-routing-engine` | Real-time Routing & Vehicle Control Engine (Python, CBTC/APM) |
| `ai-accountant-platform` | AI Accountant Finance Platform (Zoho Creator/Deluge) |
| `network-operating-system` | Network Operating System (Node.js/Express/MongoDB) |
| `diagnostic-watchdog` | Diagnostic Watchdog & Monitoring Systems |
| `goldman-tca-platform` | Goldman Sachs TCA Analytics Platform (React/Flask/KDB+) |

**Confidentiality constraint:** The Cellprop-owned projects (PRT Simulator, Routing Engine, AI Accountant, NOS, Diagnostic Watchdog) and the Goldman Sachs project are all employer-owned work under likely confidentiality. All case studies are **text-only — no screenshots, UI mockups, architecture diagrams, or code snippets**. No real client names, site plans, or proprietary implementation details. Content is limited to problem description, approach/reasoning at a conceptual level, and metrics already present on the resume (which Anmol has presumably already cleared for public use by including them there).

**Per-project template** (consistent across all 6):
1. **Header** — project name, one-line description, tech stack tags, back-link to homepage
2. **Overview** — 2-3 sentences: what it is, who used it, why it mattered
3. **Problem** — the challenge that existed before/without this work
4. **Approach** — technical decisions and reasoning; this is where depth lives (architecture choices, trade-offs, why), described in prose/labeled subsections rather than diagrams or code
5. **Impact** — concrete metrics, visually emphasized (e.g. bolded/pull-quote style, tabular numerals), pulled from resume bullets
6. **Tech Stack** — full tag list of technologies used
7. Footer nav — "← Back to projects" plus previous/next case study links

Visual engagement on these text-only pages comes from typography and layout (metric callouts, labeled subsections, generous spacing) rather than imagery.

## Visual Design System

**Color palette** — minimal light theme, single accent:
- Background: off-white/white (`#FAFAFA` / `#FFFFFF`)
- Primary text: near-black (`#1A1A1A`)
- Secondary/muted text: gray (`#6B7280`)
- Accent: deep emerald green (`#047857`, darker variant `#065F46` for hover/emphasis) — chosen over a generic "tech blue" to subtly reflect Anmol's EV/mobility industry background without literal go-green branding (no leaf icons, no sustainability-marketing tone)
- Borders/dividers: light gray (`#E5E7EB`)
- Contrast between text/background/accent must meet WCAG AA at minimum (verify during implementation)

**Typography**
- Single sans-serif family throughout (e.g. Inter or General Sans) for headings and body — no serif (serif reads as editorial/blog, not engineering)
- Metrics and case-study stats use tabular/monospace numerals so they read as data

**Spacing & feel**
- Generous vertical rhythm between homepage sections (large padding on desktop, scaled down on mobile)
- Max content width ~1100-1200px, centered; case study body text kept to a comfortable ~65-75 character line length
- Flat design — subtle borders/dividers rather than drop-shadow cards
- Minimal animation: scroll fade-ins acceptable, no parallax/particle effects

## Responsive Design

Mobile-first requirement across the entire site, not a bolt-on:
- Hero/About/Timeline/Education stack to single column on small screens
- Project grid: 1 column (mobile) → 2 (tablet) → 3 (desktop)
- Navigation collapses to a simple stacked or hamburger pattern on small screens
- Touch-friendly tap targets, readable type scale at all breakpoints
- Verified on both common mobile and desktop viewport sizes during implementation

## Technical Architecture

**Stack:** Next.js (App Router) + TypeScript + Tailwind CSS, fully statically generated — no server runtime, no database, no CMS, no backend API.

**Content structure:** Case studies and experience/skills data live in typed data files (e.g. `content/projects.ts`, `content/experience.ts`) conforming to shared TypeScript types. Homepage sections and case study pages both read from these same files — single source of truth, no content duplication.

**SEO & metadata:** Per-page `<title>` and meta description (homepage + each case study), Open Graph tags for link previews, semantic HTML (heading hierarchy, `<nav>`, `<main>`, `<article>`).

**Performance & accessibility:** Static generation for near-instant loads, no client-side data fetching required for content, keyboard navigability, WCAG AA color contrast.

**Resume:** Existing `Anmol-Verma-CV.pdf` served as a static asset at `/resume.pdf`; "Download Resume" links directly to it. No regeneration/conversion.

**Deployment:** Vercel for initial build and preview (zero-config fit for Next.js, free tier). Anmol will evaluate other hosting options after the site is built before finalizing where it lives long-term; this is a post-build decision, not a blocker for implementation.

## Explicitly Out of Scope (for this spec)

- Blog/writing section
- Contact form / form backend
- CMS or admin interface
- Dedicated hobbies/interests section
- Screenshots, diagrams, or code snippets in case studies
- Final hosting/domain decision (deferred until after build)
