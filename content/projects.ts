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
    standoutMetric: "Led the platform end to end; 90+ Deluge functions in the reconciliation pipeline",
    order: 3,
    overview:
      "An AI-driven finance automation platform built on Zoho Creator that automates core accounting workflows: purchase invoice processing, sales invoice creation, bank statement ingestion and reconciliation, and monthly statement generation. I lead the project, personally built the entire bank statement ingestion and reconciliation pipeline, and implemented parts of the purchase invoice processing pipeline.",
    problem:
      "Accounting teams spend much of their time on repetitive, error-prone work: keying in purchase invoices, raising sales invoices, matching bank transactions to invoices, catching duplicates, and compiling monthly statements. Done by hand, this work is slow, inconsistent, and hard to audit when something needs to be traced back.",
    approach:
      "As project lead, I set the platform's direction and coordinated delivery across its finance workflows. Hands-on, I built the bank statement ingestion and reconciliation pipeline end to end: 90+ Deluge functions covering statement ingestion, a multi-signal scoring engine for bank-to-invoice matching, payment allocation, duplicate-invoice detection, and multi-bank statement de-duplication, integrated with Zoho WorkDrive and Creator REST APIs. A centralized audit-event trail records every automated decision, so a CA-facing review view can verify or override matches with full context. I also implemented parts of the purchase invoice processing pipeline. Day-to-day development uses AI coding tools (Claude Code, Codex) with Git-mirrored source, agent instruction files, and task templates, keeping AI-assisted changes reviewable and governed rather than opaque.",
    impact: [
      "Automates major finance workflows: purchase invoices, sales invoices, bank reconciliation, and monthly statements.",
      "90+ Deluge functions in production covering bank statement ingestion, matching, de-duplication, and audit trail.",
      "Automated multi-signal scoring reduces manual bank-to-invoice matching effort.",
      "Governed AI-assisted development workflow (Git-mirrored source, agent instructions, task templates) used in day-to-day delivery.",
    ],
  },
  {
    slug: "network-operating-system",
    title: "Network Operating System",
    oneLiner: "The central brain of the PRT network: serving ride requests, dispatching pods, and running fleet operations.",
    techStack: ["Node.js", "Express", "MongoDB"],
    standoutMetric: "Near-zero hazardous incidents across simulations and trials",
    order: 4,
    overview:
      "The Network Operating System (NOS) is the brain of the entire PRT network. Built on Node.js, Express, and MongoDB, it takes in concurrent passenger ride requests, chooses the best pod to serve each one, processes live vehicle telemetry, and manages fleet operations like charging and maintenance.",
    problem:
      "A PRT network serves many passengers at once with a shared fleet of autonomous pods. Every request has to be matched to the right pod quickly, while the system keeps an up-to-date picture of where every vehicle is and what state it is in, and keeps the fleet charged and maintained without taking too many pods out of service or creating safety risks.",
    approach:
      "The NOS handles many user requests at once and, for each one, picks the best pod to serve it based on the current state of the fleet. A telemetry layer ingests live vehicle data so dispatch decisions always reflect where each pod is and what condition it is in. MongoDB stores vehicle and network state, and an Express-based API layer coordinates communication between vehicles, operator tools, and the rest of the system. Zone-based traffic partitioning keeps coordination local and reduces contention between zones. Charging and maintenance scheduling are automated so pods cycle out of service without manual coordination, with safety constraints built into the automation rather than bolted on afterward.",
    impact: [
      "Serves concurrent passenger requests and dispatches the best available pod to each one.",
      "Reduced routing conflicts by 30-40% and improved throughput via zone-based partitioning.",
      "Automated charging and maintenance scheduling contributed to near-zero hazardous incidents across simulations and trials.",
    ],
  },
  {
    slug: "diagnostic-watchdog",
    title: "Diagnostic Watchdog & Monitoring Systems",
    oneLiner: "A multi-component health monitoring system covering vehicles, control software, and UIs.",
    techStack: ["Python", "Node.js", "React", "Systemd", "Linux"],
    standoutMetric: "50-60% reduction in mean time to detection",
    order: 5,
    overview:
      "A multi-component health monitoring and watchdog system covering the Network Operating System, vehicles, and operator/user-facing UIs, built to catch problems before they became incidents, with a dashboard where the team can view alerts and errors.",
    problem:
      "In a safety-critical, distributed vehicle system, failures in any one component (a vehicle, the NOS, or a UI) can go unnoticed until they cascade into a larger incident, and manual log review is too slow to catch issues in time to act.",
    approach:
      "Designed a diagnostic and watchdog service in Python that performs automated log parsing across NOS, vehicle, and UI components, with alerting and remediation workflows wired directly into the detection pipeline so that known failure patterns trigger automated recovery actions rather than waiting on a human responder. A Node.js backend serves the collected alerts and errors to a React dashboard, giving the team one place to see system health across all components.",
    impact: [
      "Reduced mean time to detection (MTTD) by 50-60%.",
      "Reduced overall system downtime by ~50-60% through automated alerting and remediation.",
      "Enabled automated alerts and recovery actions across NOS, vehicles, and UIs.",
      "React dashboard gives a single view of alerts and errors across all monitored components.",
    ],
  },
  {
    slug: "goldman-tca-platform",
    title: "TCA Analytics Platform",
    oneLiner: "A full-stack transaction cost analysis platform used by 20+ internal analysts for post-trade analysis.",
    techStack: ["React", "Flask", "KDB+"],
    standoutMetric: "20+ internal users, millions of trade records processed daily",
    order: 6,
    overview:
      "A full-stack Transaction Cost Analysis (TCA) platform built with React, Flask, and KDB+, used by more than 20 internal users at Goldman Sachs for post-trade analysis.",
    problem:
      "Post-trade analysts needed fast, accurate transaction cost metrics over millions of trade records per day, including correctly classifying complex order types like wheel orders, under tight regulatory and client reporting deadlines.",
    approach:
      "Built the platform end to end: a Flask backend querying KDB+ (a column-store time-series database used heavily in trading infrastructure for its query performance over large tick/trade datasets) to keep analytics queries fast even over millions of daily trade records, and a React frontend surfacing TCA metrics to analysts. Improved the wheel-order detection logic specifically to reduce misclassification, which had been generating false positives in cost analysis.",
    impact: [
      "Adopted by 20+ internal users for day-to-day post-trade analysis.",
      "Processed millions of trade records daily with low-latency query performance.",
      "Improved wheel-order classification accuracy by 20-30%, reducing false positives.",
    ],
  },
];
