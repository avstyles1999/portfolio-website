import { education } from "@/content/education";
import Section from "./Section";

const CARD = "rounded-xl border border-brand-border bg-brand-bg p-6 sm:p-8";

export default function EducationAchievements() {
  return (
    <Section id="education" eyebrow="Foundations" title="Education & Achievements" tone="surface">
      <div className="grid gap-6 md:grid-cols-2">
        <div data-card className={CARD}>
          <p className="text-xs font-semibold uppercase tracking-wide text-brand-muted">Education</p>
          <h3 className="mt-3 font-semibold text-lg">{education.degree}</h3>
          <p className="mt-1 text-brand-accentDark font-medium">{education.institution}</p>
          <p className="mt-0.5 text-sm text-brand-muted">
            {education.location} · {education.dates}
          </p>
        </div>
        <div data-card className={CARD}>
          <h3 className="text-xs font-semibold uppercase tracking-wide text-brand-muted">Achievements</h3>
          <ul className="mt-3 space-y-4">
            {education.achievements.map((a) => (
              <li key={a.title} className="flex gap-3">
                <span aria-hidden className="text-brand-accent">
                  ★
                </span>
                <div>
                  <p className="font-medium text-sm sm:text-base">{a.title}</p>
                  <p className="text-sm text-brand-muted">{a.detail}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
