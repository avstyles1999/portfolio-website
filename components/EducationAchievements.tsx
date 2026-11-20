import { education } from "@/content/education";
import Section from "./Section";

export default function EducationAchievements() {
  return (
    <Section id="education" eyebrow="Foundations" title="Education & Achievements" tone="surface">
      <div className="max-w-3xl rounded-xl border border-brand-border bg-brand-bg p-6 sm:p-8">
        <h3 className="font-semibold text-lg">{education.degree}</h3>
        <p className="mt-0.5 text-sm text-brand-muted">
          {education.institution}, {education.location} · {education.dates}
        </p>
        <ul className="mt-5 space-y-3 text-sm sm:text-base">
          {education.achievements.map((a) => (
            <li key={a.title} className="flex gap-3">
              <span aria-hidden className="text-brand-accent">
                ★
              </span>
              <span>{a.title}</span>
            </li>
          ))}
        </ul>
      </div>
    </Section>
  );
}
