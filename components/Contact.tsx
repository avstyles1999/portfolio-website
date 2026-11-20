import type { ReactNode } from "react";
import Section from "./Section";

const LINK =
  "inline-flex items-center gap-2 rounded-md border border-brand-accent bg-brand-surface px-5 py-2.5 font-medium text-brand-accent hover:bg-brand-accent hover:text-white transition";

const MailIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="4" width="20" height="16" rx="2" />
    <path d="m22 7-10 6L2 7" />
  </svg>
);

const LinkedInIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 1 1 0-4.125 2.062 2.062 0 0 1 0 4.125zM7.119 20.452H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

const GitHubIcon = () => (
  <svg aria-hidden="true" viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor">
    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
  </svg>
);

const links: { href: string; label: string; icon: ReactNode }[] = [
  { href: "mailto:avstyles1999@gmail.com", label: "Email", icon: <MailIcon /> },
  { href: "https://linkedin.com/in/anmol-verma-966955170", label: "LinkedIn", icon: <LinkedInIcon /> },
  { href: "https://github.com/avstyles1999", label: "GitHub", icon: <GitHubIcon /> },
];

export default function Contact() {
  return (
    <Section id="contact" eyebrow="Get in touch" title="Let's talk" tone="accent">
      <p className="text-base sm:text-lg text-brand-muted">
        Open to conversations about real-time systems, engineering leadership, and automation — or just
        engineering and tech in general.
      </p>
      <div className="mt-6 flex flex-wrap gap-4">
        {links.map((l) => (
          <a key={l.label} href={l.href} className={LINK}>
            {l.icon}
            {l.label}
          </a>
        ))}
      </div>
    </Section>
  );
}
